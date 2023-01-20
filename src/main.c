/*
 * Copyright (c) 2014-2018 Cesanta Software Limited
 * All rights reserved
 *
 * Licensed under the Apache License, Version 2.0 (the ""License"");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an ""AS IS"" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "mgos.h"
#include "mgos_http_server.h"
#include "mgos_pwm.h"
#include "mgos_mqtt.h"
#include "mgos_wifi.h"
#include "mgos_rpc.h"
#include "mgos_ro_vars.h"
#include "mgos_sys_config.h"

// #include "VL53L1X_calibration.h"
// #include "VL53L1X_api.h"
#include "PCA9543A.h"
#include "KTD202X.h"
#include "buzzer.h"
#include "task.h"
#include "FreeRTOS.h"

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "vl53l5cx_api.h"
#include "vl53l5cx_plugin_motion_indicator.h"

/*********************************************************************
 * MACROS
 */
#define BUZZER 14
#define RST_BUTTON 25
#define ENABLE 1
#define DISABLE 0
/* GPIO pin configurations */
/* People counting  Algorithim */
#define NOBODY 0
#define SOMEONE 1
#define LEFT 1
#define RIGHT 0
#define STATIC_IP_RST_BUTTON 0
#define DWPC_SD 1
#define DWPC_DD 2
#define DWPC_DIAGNOSTIC 3
#define OBJ_ARRAY_SIZE 16
// #define CORNERINDEX 0 1 6 7 8 15 48 55 56 57 62 63
/*********************************************************************
 * GLOBAL VARIABLES
 */
uint8_t status = 0;
uint8_t dataReady;
// cat1
uint8_t zoneIn_C1 = 0;
uint8_t zoneOut_C1 = 0;
// czt 2
uint8_t zoneIn_C4 = 0;
uint8_t zoneOut_C4 = 0;

int8_t PeopleCount = 0;
// int8_t PeopleCount_in = 0;
// int8_t PeopleCount_out = 0;

int8_t PrevPeopleCount = 0;
uint8_t button_value = 0;

uint8_t inCount = 0;
uint8_t outCount = 0;

uint8_t inCount_c1 = 0;
uint8_t outCount_c1 = 0;
uint8_t inCount_c4 = 0;
uint8_t outCount_c4 = 0;

uint8_t inCountAggregation = 0;
uint8_t outCountAggregation = 0;

uint16_t DistanceArray[OBJ_ARRAY_SIZE];

uint8_t array_in[] = {1, 0, 1, 1, 0, 1};
uint8_t array_2in[] = {1, 0, 0, 1, 0, 0};
uint8_t array_3in[] = {0, 0, 1, 0, 0, 1};

uint8_t array_out[] = {0, 1, 1, 1, 1, 0};
uint8_t array_2out[] = {0, 1, 1, 0, 0, 0};
uint8_t array_3out[] = {0, 0, 0, 1, 1, 0};

// char arrayofdistance[100];
// char jsondata[400];
uint8_t prev_zoneInStatus_C1 = 1;
uint8_t prev_zoneOutStatus_C1 = 1;

uint8_t prev_zoneInStatus_C4 = 1;
uint8_t prev_zoneOutStatus_C4 = 1;

/*********************************************************************
 * VL53L5CX LOCAL VARIABLES
 */
static VL53L5CX_Configuration Dev;
static VL53L5CX_ResultsData Results;
static VL53L5CX_Motion_Configuration motion;
static uint8_t resolution, isAlive;

static uint8_t zone_pathtrack[] = {0, 0, 0, 0, 0, 0};
static uint8_t zone_pathtrack_2[] = {0, 0, 0, 0, 0, 0};
/*********************************************************************
 * VL53L5CX LOCAL FUNCTIONS
 */
uint8_t vl53l5x_Init();
void getMeanMinDistances(uint16_t *DistancePtr, uint8_t size);

static uint8_t white[] = {255, 255, 255};
static uint8_t red[] = {255, 0, 0};
static uint8_t green[] = {0, 255, 0};

/******* Timer variables *******/
mgos_timer_id periodicResetCountID = MGOS_INVALID_TIMER_ID;
mgos_timer_id wifiChangeTimerID = MGOS_INVALID_TIMER_ID;

/******* EPOCH time variables *******/
time_t maintime;
uint64_t epochTime;
/******* HTTP server, response variables *******/
struct mg_serve_http_opts http_opts = {.document_root = "."};
struct mg_connection *nc;
char *data = "{result:success}";
struct mgos_config_wifi_ap ap_cfg;
struct mgos_config_wifi_sta sta_cfg;
//  JSON message which is sent to web page
char *timeString = "{\"time\":%llu,\"incount\":%d,\"outcount\":%d,\"absloute\":%d}";

/******* MAC address variables *******/
const char *mac_string;
static uint8_t defaultColour[] = {0x34, 0xEF, 0xAB};

/******* Led and Buzzer variables *******/
char *ledColour = "white";
char *buzzState = "OFF";
/*********************************************************************
 * LOCAL FUNCTIONS
 */
// Web sockets connection and communication Function Prototypes
static void web_sockets_connection(void);
static void web_sockets_handler(struct mg_connection *nc, int ev, void *ev_data, void *user_data);
static void broadcast(void);
/******* VL53L1X functions *******/
// uint8_t vl53l1_init(void);
void ppl_count_task(void *arg);
void ppl_count_task_two(void *arg);

void mqtt_publish();
void ProcessPeopleCountingData(uint8_t zoneInStatus_C1, uint8_t zoneOutStatus_C1);
void ProcessPeopleCountingData_c4(uint8_t zoneInStatus_C1, uint8_t zoneOutStatus_C1);
// void dwpc();

// void ProcessPeopleCountingData(int16_t Distance, uint8_t zone);
uint8_t compareArray(uint8_t a[], uint8_t b[], uint8_t size);
uint8_t compareArray(uint8_t a[], uint8_t b[], uint8_t size);
/******* Aggregated data functions *******/
void aggregated_data(void *arg);
/******* periodic reset count data functions *******/
void periodicResetCount(void *arg);
void gpio_init();
/*Function to reset static ip parameters*/
void controller_static_ip_reset();

/******* RPC call back functions *******/
void resetSensorCount(struct mg_rpc_request_info *ri, void *cb_arg, struct mg_rpc_frame_info *fi, struct mg_str args);
void rebootSensor(struct mg_rpc_request_info *ri, void *cb_arg, struct mg_rpc_frame_info *fi, struct mg_str args);
void updateCredntials(struct mg_rpc_request_info *ri, void *cb_arg, struct mg_rpc_frame_info *fi, struct mg_str args);
void setColor(struct mg_rpc_request_info *ri, void *cb_arg, struct mg_rpc_frame_info *fi, struct mg_str args);

enum mgos_app_init_result mgos_app_init(void)
{
    uint8_t vlStatus;
    // i2cScanner();
    /* Read mac address of the device */
    mac_string = mgos_sys_ro_vars_get_mac_address();
    /* Set mac address as device ID */
    mgos_sys_config_set_device_id(mac_string);
    /* Creating char buffer to store mac*/
    char str[20];
    /* copy the mac string */
    sprintf(str, "/%s/rpc", mac_string);

    gpio_init();
    /*Checking the sensor mode for VL53L5x */
    selectMuxAndChannel(TOF_SENSOR_MUX, 2);
    vlStatus = vl53l5x_Init();
    if (vlStatus == EXIT_SUCCESS)
    {
        breathLeds(green);
        // mgos_msleep(100);
    }
    /* copy the mac string */
    sprintf(str, "/%s/rpc", mac_string);
    /* Set device mac as rpc mqtt sub topic */
    mgos_sys_config_set_rpc_mqtt_sub_topic(str);

    /* Set all leds to white colour initially when device is turned on or rebooted */
    /* Initilization LED blink */
    initLedDriver();
    breathLeds(defaultColour);
    /* Initilization Buzzer */
    buzzer_init(BUZZER);
    /* Buzzer functionality configuration check */
    buzzer_buzz(mgos_sys_config_get_dwpc_buzzer_frequency(), mgos_sys_config_get_dwpc_buzzer_delay(), 1000);

    // mgos_msleep(100);

    /* Variable to hold return status of created FREERTOS task*/
    BaseType_t xReturned;
    xReturned = xTaskCreate(ppl_count_task, "Peoplecounttask", 2600, NULL, 3, NULL);
    if (xReturned == pdPASS)
    {
#ifdef DEBUG
        // The task was created.
        printf("task was created\n");
#endif
    }

    /* Initilization web socket connection */
    web_sockets_connection();
    /* Registering RPC callback for resetting the sensor count*/
    mg_rpc_add_handler(mgos_rpc_get_global(), "resetCount", "{}", resetSensorCount, NULL);
    /* Registering RPC callback for rebooting the sensor */
    mg_rpc_add_handler(mgos_rpc_get_global(), "rebootSensor", "{}", rebootSensor, NULL);
    /* Registering RPC callback for validating the user credentials */
    mg_rpc_add_handler(mgos_rpc_get_global(), "updateCredentials", "{userName: %Q, auth: %Q}", updateCredntials, NULL);
    /* Registering RPC callback for setting the colour */
    mg_rpc_add_handler(mgos_rpc_get_global(), "setColour", "{hexCode: %Q}", setColor, NULL);

    /* Registering RPC callback for aggragation data interval*/
    if (mgos_sys_config_get_dwpc_function_mode() != DWPC_DIAGNOSTIC)
    {
        printf("Aggregated data triggerd\n");
        mgos_set_timer(mgos_sys_config_get_dwpc_interval() * 1000, MGOS_TIMER_REPEAT, aggregated_data, NULL);
    }
    return MGOS_APP_INIT_SUCCESS;
}

/*******************************************************************************
 * @fn     web_sockets_connection
 *
 *@brief   Register the http endpoint for web sockets
 *
 *@param   None
 *
 *@return  None
 */

static void web_sockets_connection(void)
{

    void *user_data = "";

    //  Get the server handle.
    if ((nc = mgos_get_sys_http_server()) == NULL)
    {
        puts("The value of nc is NULL");
    }
    //  Bind the event handler to the HTTP server.
    mgos_register_http_endpoint("/", web_sockets_handler, user_data);
}

/*******************************************************************************
 *@fn     web_sockets_handler
 *
 *@brief   Handles all the web sockets events
 *
 *@param   nc -> connection, ev -> event
 *
 *@return  None
 */
static void web_sockets_handler(struct mg_connection *nc, int ev, void *ev_data, void *user_data)
{
    struct http_message *hm = (struct http_message *)ev_data;
    switch (ev)
    {
    case MG_EV_HTTP_REQUEST:
    {
        mg_serve_http(nc, hm, http_opts);

        break;
    }
    case MG_EV_SEND:
    {
        break;
    }
    case MG_EV_WEBSOCKET_HANDSHAKE_DONE:
    {
        break;
    }
    case MG_EV_WEBSOCKET_FRAME:
    {
        break;
    }
    case MG_EV_CLOSE:
    {
        break;
    }
    case MG_EV_TIMER:
    {
        break;
    }
    }
}
/*******************************************************************************
 *@fn     broadcast
 *
 *@brief   broadcasts the data to webpage
 *
 *@param   nc -> connection, ev -> event
 *
 *@return  None
 */
static void broadcast(void)
{
    struct mg_mgr *mgr = mgos_get_mgr();

    for (struct mg_connection *c = mg_next(mgr, NULL); c != NULL;
         c = mg_next(mgr, c))
    {
        if (c->flags & MG_F_IS_WEBSOCKET)
        {
            // time_t epochTime = time(0);
            maintime = time(0);
            epochTime = (uint64_t)time(&maintime);
            epochTime = epochTime * 1000;
            mg_printf_websocket_frame(c, WEBSOCKET_OP_TEXT, timeString, epochTime, inCount, outCount, PeopleCount);
        }
    }
}

/*******************************************************************************
 * @fn      ppl_count_task
 *
 * @brief   initialize vl53l1x and runs the people counting algorithm
 *
 * @param   arg -> unused.
 *
 * @return  None.
 */
void ppl_count_task(void *arg)
{
    // const TickType_t xFrequency = 2 / portTICK_PERIOD_MS;
    const TickType_t xDelay = 10 / portTICK_PERIOD_MS;
    for (;;)
    {

        status |= vl53l5cx_check_data_ready(&Dev, &dataReady);
        if (dataReady)
        {

            status |= vl53l5cx_get_resolution(&Dev, &resolution);
            status |= vl53l5cx_get_ranging_data(&Dev, &Results);
            getMeanMinDistances(DistanceArray, OBJ_ARRAY_SIZE);
        }
        dataReady = 0;
        // Passing both zone status as a param to ProcessPeopleCountingData
        ProcessPeopleCountingData(zoneIn_C1, zoneOut_C1);
        ProcessPeopleCountingData_c4(zoneIn_C4, zoneOut_C4);

        if (inCount_c1 > 0 || inCount_c4 > 0)
        {
            if (inCount_c1 > 1 || inCount_c4 > 1)
            {
                PeopleCount += 2;
                inCount += 2;
                inCountAggregation += 2;
            }
            else
            {
                PeopleCount += 1;
                inCount += 1;
                inCountAggregation += 1;
            }
            // mgos_mqtt_pubf("/TestIn", 0, false, "{Peoplecount_in:%d}", PeopleCount_in);
            inCount_c1 = 0;
            inCount_c4 = 0;
        }
        if (outCount_c1 > 0 || outCount_c4 > 0)
        {
            if (outCount_c1 > 1 || outCount_c4 > 1)   // cheking for parallel Entry 
            {
                PeopleCount -= 2;
                outCount += 2;
                outCountAggregation += 2;
            }
            else
            {
                PeopleCount -= 1;
                outCount += 1;
                outCountAggregation += 1;
            }
            // mgos_mqtt_pubf("/TestOut", 0, false, "{Peoplecount_out:%d}", PeopleCount_out);
            outCount_c1 = 0;
            outCount_c4 = 0;
        }
        vTaskDelay(xDelay);

        if (PrevPeopleCount != PeopleCount)
        {
            if (PeopleCount < 0)
            {
                PeopleCount = 0;
                PrevPeopleCount = 0;
                inCount = 0;
                outCount = 0;
                // getDistance = 0;
                ledColour = "white";
                buzzState = "OFF";
                /* setting the leds to white color */
                if (mgos_sys_config_get_dwpc_function_mode() == DWPC_DIAGNOSTIC)
                {

                    if (mgos_mqtt_global_is_connected())
                    {
                        if (mgos_sys_config_get_dwpc_capacity() > 0)
                        {
                            mgos_mqtt_pubf(mgos_sys_config_get_diagnostic_topic(), 0, false, "{Data: NegativeCount, Incount: %d, Outcount: %d, Time: %llu, PktId: 32, DeviceType: 32, MAC: %Q, Peoplecount: %d, BuzzerState: %Q, LedColour: %Q}", inCount, outCount, epochTime, mac_string, PeopleCount, buzzState, ledColour);
                        }
                        else
                        {
                            mgos_mqtt_pubf(mgos_sys_config_get_diagnostic_topic(), 0, false, "{Data: NegativeCount, Incount: %d, Outcount: %d, Time: %llu, PktId: 32, DeviceType: 32, MAC: %Q, PeopleCount: %d}", inCount, outCount, epochTime, mac_string, PeopleCount);
                        }
                    }
                }
            }
            if (mgos_sys_config_get_dwpc_capacity() > 0)
            {
                if (periodicResetCountID != MGOS_INVALID_TIMER_ID)
                {
                    mgos_clear_timer(periodicResetCountID);
                }
                periodicResetCountID = mgos_set_timer(((mgos_sys_config_get_dwpc_periodic_reset() * 60) * 1000), 0, periodicResetCount, NULL);
                // check if PeopleCount > capacity
                if (mgos_sys_config_get_dwpc_function_mode() == DWPC_SD)
                {
                    if (PeopleCount > mgos_sys_config_get_dwpc_capacity())
                    {
                        // buzz the buzzer
                        buzzer_buzz(mgos_sys_config_get_dwpc_buzzer_frequency(), mgos_sys_config_get_dwpc_buzzer_delay(), mgos_sys_config_get_dwpc_buzzer_off_time());
                        buzzState = "ON";
                    }
                    else if (PeopleCount == mgos_sys_config_get_dwpc_capacity())
                    {

                        /* check if led is already blinking in red or set to red and blink */
                        /* turn off the buzzer */
                        buzzer_buzz(0, 0, 0);
                        // blink_led(500, 500, red_color);
                        breathLeds(red);
                        ledColour = "red";
                        buzzState = "OFF";
                    }
                    else
                    {
                        // turn off the buzzer
                        buzzer_buzz(0, 0, 0);
                        // stop blinking
                        breathLeds(white);
                        ledColour = "white";
                        buzzState = "OFF";
                    }
                }
                else
                {
                    // turn off the buzzer
                    buzzer_buzz(0, 0, 0);
                    // stop blinking
                    breathLeds(white);
                    ledColour = "white";
                    buzzState = "OFF";
                }
            }
#ifdef DEBUG
            printf("Peoplecount: %d\n", PeopleCount);
#endif

            if (mgos_sys_config_get_dwpc_function_mode() == DWPC_DIAGNOSTIC)
            {

                if (mgos_mqtt_global_is_connected())
                {

                    if (mgos_sys_config_get_dwpc_capacity() > 0)
                    {
                        mgos_mqtt_pubf(mgos_sys_config_get_diagnostic_topic(), 0, false, "{Data: PeopleCount, Incount: %d, Outcount: %d, Time: %llu, PktId: 32, DeviceType: 32, MAC: %Q, Peoplecount: %d, BuzzerState: %Q, LedColour: %Q}", inCount, outCount, epochTime, mac_string, PeopleCount, buzzState, ledColour);
                    }
                    else
                    {
                        mgos_mqtt_pubf(mgos_sys_config_get_diagnostic_topic(), 0, false, "{Data: PeopleCount, Incount: %d, Outcount: %d, Time: %llu, PktId: 32, DeviceType: 32, MAC: %Q, PeopleCount: %d}", inCount, outCount, epochTime, mac_string, PeopleCount);
                    }
                }
            }

            PrevPeopleCount = PeopleCount;
            // Process the recordered data to web page
            broadcast();
        }
    }
    (void)arg;
}
void ProcessPeopleCountingData(uint8_t zoneInStatus_C1, uint8_t zoneOutStatus_C1)
{
    static uint8_t pathtrack[] = {0, 0, 0, 0, 0, 0};
    uint8_t zonePathtrackCount_c1 = 0;

    if (zoneInStatus_C1 == 0 && zoneOutStatus_C1 == 0)
    {
        prev_zoneInStatus_C1 = zoneInStatus_C1;
        prev_zoneOutStatus_C1 = zoneOutStatus_C1;
        for (uint8_t i = sizeof(pathtrack) - 1; i >= 2; i--)
        {
            pathtrack[i] = pathtrack[i - 2];
        }
        pathtrack[1] = zoneOutStatus_C1;
        pathtrack[0] = zoneInStatus_C1;
    }
    else if (zoneInStatus_C1 == prev_zoneInStatus_C1 && zoneOutStatus_C1 == prev_zoneOutStatus_C1)
    {
        uint8_t flag = 1;
    }
    else
    {
        prev_zoneInStatus_C1 = zoneInStatus_C1;
        prev_zoneOutStatus_C1 = zoneOutStatus_C1;

        for (uint8_t i = sizeof(pathtrack) - 1; i >= 2; i--)
        {
            pathtrack[i] = pathtrack[i - 2];
        }
        pathtrack[1] = zoneOutStatus_C1;
        pathtrack[0] = zoneInStatus_C1;
    }
    // incount
    if (compareArray(array_in, pathtrack, sizeof(array_in)) == 0)
    {

        for (uint8_t i = 0; i < sizeof(zone_pathtrack); i++)
        {
            if (zone_pathtrack[i] >= 4)
            {
                zonePathtrackCount_c1++;
            }
        }
        if (zonePathtrackCount_c1 >= 2)
        {
            inCount_c1 += 2; // double count
            zonePathtrackCount_c1 = 0;
        }
        else
        {
            inCount_c1++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
    else if (compareArray(array_2in, pathtrack, sizeof(array_2in)) == 0)
    {
        for (uint8_t i = 0; i < sizeof(zone_pathtrack); i++)
        {
            if (zone_pathtrack[i] >= 4)
            {
                zonePathtrackCount_c1++;
            }
        }
        if (zonePathtrackCount_c1 >= 2)
        {
            inCount_c1 += 2; // double count
            zonePathtrackCount_c1 = 0;
        }
        else
        {
            inCount_c1++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
    else if (compareArray(array_3in, pathtrack, sizeof(array_3in)) == 0)
    {
        for (uint8_t i = 0; i < sizeof(zone_pathtrack); i++)
        {
            if (zone_pathtrack[i] >= 4)
            {
                zonePathtrackCount_c1++;
            }
        }
        if (zonePathtrackCount_c1 >= 2)
        {
            inCount_c1 += 2; // double count
            zonePathtrackCount_c1 = 0;
        }
        else
        {
            inCount_c1++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }

    // outcount
    if (compareArray(array_out, pathtrack, sizeof(array_out)) == 0)
    {
        for (uint8_t i = 0; i < sizeof(zone_pathtrack); i++)
        {
            if (zone_pathtrack[i] >= 4)
            {
                zonePathtrackCount_c1++;
            }
        }
        if (zonePathtrackCount_c1 >= 2)
        {
            outCount_c1 += 2; // double count
            zonePathtrackCount_c1 = 0;
        }
        else
        {
            outCount_c1++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
    else if (compareArray(array_2out, pathtrack, sizeof(array_2out)) == 0)
    {

        for (uint8_t i = 0; i < sizeof(zone_pathtrack); i++)
        {
            if (zone_pathtrack[i] >= 4)
            {
                zonePathtrackCount_c1++;
            }
        }
        if (zonePathtrackCount_c1 >= 2)
        {
            outCount_c1 += 2; // double count
            zonePathtrackCount_c1 = 0;
        }
        else
        {
            outCount_c1++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
    else if (compareArray(array_3out, pathtrack, sizeof(array_3out)) == 0)
    {

        for (uint8_t i = 0; i < sizeof(zone_pathtrack); i++)
        {
            if (zone_pathtrack[i] >= 4)
            {
                zonePathtrackCount_c1++;
            }
        }
        if (zonePathtrackCount_c1 >= 2)
        {
            outCount_c1 += 2; // double count
            zonePathtrackCount_c1 = 0;
        }
        else
        {
            outCount_c1++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
}

void ProcessPeopleCountingData_c4(uint8_t zoneInStatus_C4, uint8_t zoneOutStatus_C4)
{
    static uint8_t pathtrack[] = {0, 0, 0, 0, 0, 0};
    uint8_t zonePathtrackCount_c4 = 0;

    if (zoneInStatus_C4 == 0 && zoneOutStatus_C4 == 0)
    {
        prev_zoneInStatus_C4 = zoneInStatus_C4;
        prev_zoneOutStatus_C4 = zoneOutStatus_C4;
        for (uint8_t i = sizeof(pathtrack) - 1; i >= 2; i--)
        {
            pathtrack[i] = pathtrack[i - 2];
        }
        pathtrack[1] = zoneOutStatus_C4;
        pathtrack[0] = zoneInStatus_C4;
    }
    else if (zoneInStatus_C4 == prev_zoneInStatus_C4 && zoneOutStatus_C4 == prev_zoneOutStatus_C4)
    {
        uint8_t flag = 1;
    }
    else
    {
        prev_zoneInStatus_C4 = zoneInStatus_C4;
        prev_zoneOutStatus_C4 = zoneOutStatus_C4;

        for (uint8_t i = sizeof(pathtrack) - 1; i >= 2; i--)
        {
            pathtrack[i] = pathtrack[i - 2];
        }
        pathtrack[1] = zoneOutStatus_C4;
        pathtrack[0] = zoneInStatus_C4;
    }
    if (compareArray(array_in, pathtrack, sizeof(array_in)) == 0)
    {
        for (uint8_t i = 0; i < sizeof(zone_pathtrack_2); i++)
        {
            if (zone_pathtrack_2[i] >= 4)
            {
                zonePathtrackCount_c4++;
            }
        }
        if (zonePathtrackCount_c4 >= 2)
        {
            inCount_c4 += 2; // double count
            zonePathtrackCount_c4 = 0;
        }
        else
        {
            inCount_c4++; // single count
        }
        memset(pathtrack, 0, sizeof(pathtrack)); // clear the pathtrack
    }
    else if (compareArray(array_2in, pathtrack, sizeof(array_2in)) == 0)
    {
        for (uint8_t i = 0; i < sizeof(zone_pathtrack_2); i++)
        {
            if (zone_pathtrack_2[i] >= 4)
            {
                zonePathtrackCount_c4++;
            }
        }
        if (zonePathtrackCount_c4 >= 2)
        {
            inCount_c4 += 2; // double count
            zonePathtrackCount_c4 = 0;
        }
        else
        {
            inCount_c4++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
    else if (compareArray(array_3in, pathtrack, sizeof(array_3in)) == 0)
    {
        for (uint8_t i = 0; i < sizeof(zone_pathtrack_2); i++)
        {
            if (zone_pathtrack_2[i] >= 4)
            {
                zonePathtrackCount_c4++;
            }
        }
        if (zonePathtrackCount_c4 >= 2)
        {
            inCount_c4 += 2; // double count
            zonePathtrackCount_c4 = 0;
        }
        else
        {
            inCount_c4++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
    // coutcount
    if (compareArray(array_out, pathtrack, sizeof(array_out)) == 0)
    {
        for (uint8_t i = 0; i < sizeof(zone_pathtrack_2); i++)
        {
            if (zone_pathtrack_2[i] >= 4)
            {
                zonePathtrackCount_c4++;
            }
        }
        if (zonePathtrackCount_c4 >= 2)
        {
            outCount_c4 += 2; // double count
            zonePathtrackCount_c4 = 0;
        }
        else
        {
            outCount_c4++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
    else if (compareArray(array_2out, pathtrack, sizeof(array_2out)) == 0)
    {

        for (uint8_t i = 0; i < sizeof(zone_pathtrack_2); i++)
        {
            if (zone_pathtrack_2[i] >= 4)
            {
                zonePathtrackCount_c4++;
            }
        }
        if (zonePathtrackCount_c4 >= 2)
        {
            outCount_c4 += 2; // double count
            zonePathtrackCount_c4 = 0;
        }
        else
        {
            outCount_c4++; // single count
        };
        memset(pathtrack, 0, sizeof(pathtrack));
    }
    else if (compareArray(array_3out, pathtrack, sizeof(array_3out)) == 0)
    {

        for (uint8_t i = 0; i < sizeof(zone_pathtrack_2); i++)
        {
            if (zone_pathtrack_2[i] >= 4)
            {
                zonePathtrackCount_c4++;
            }
        }
        if (zonePathtrackCount_c4 >= 2)
        {
            outCount_c4 += 2; // double count
            zonePathtrackCount_c4 = 0;
        }
        else
        {
            outCount_c4++; // single count
        }

        memset(pathtrack, 0, sizeof(pathtrack));
    }
}

// function to compare array elements
uint8_t compareArray(uint8_t a[], uint8_t b[], uint8_t size)
{
    uint8_t i;
    for (i = 0; i < size; i++)
    {
        if ((a[i] != b[i]))
            return 1;
    }
    return 0;
}

/*******************************************************************************
 * @fn      aggregated_data
 *
 * @brief   The Data from the device is periodically published
 *
 * @param   arg -> unused.
 *
 * @return  None.
 */
void aggregated_data(void *arg)
{
    maintime = time(0);
    epochTime = (uint64_t)time(&maintime);
    epochTime = epochTime * 1000;
    if (mgos_sys_config_get_dwpc_capacity() > 0)
    {
        mgos_mqtt_pubf(mgos_sys_config_get_mqtt_pub(), 0, false, "{Data: AggregationCount, inCount: %d, outCount: %d, Time: %llu, PktId: 32, DeviceType: 32, MAC: %Q, BuzzerState: %Q, LedColour: %Q}", inCountAggregation, outCountAggregation, epochTime, mac_string, buzzState, ledColour);
    }
    else
    {
        mgos_mqtt_pubf(mgos_sys_config_get_mqtt_pub(), 0, false, "{Data:AggregationCount, inCount: %d, outCount: %d, Time: %llu, PktId: 32, DeviceType: 32, MAC: %Q}", inCountAggregation, outCountAggregation, epochTime, mac_string);
    }
    inCountAggregation = 0;
    outCountAggregation = 0;
#ifdef DEBUG
    printf("Aggregated data...!!\n");
    printf("Time:%llu\n",epochTime);
#endif
}
/*******************************************************************************
*@fn     periodicResetCount

*@brief   Resets the inCount, outCount, AbslouteCount values based on the timer interval set

*@param   None

*@return  None
*/
void periodicResetCount(void *arg)
{
    PrevPeopleCount = 0;
    inCount = 0;
    outCount= 0;
    PeopleCount = 0;
    ledColour = "white";
    buzzState = "OFF";
    // blink_led(0, 0, NULL);
    breathLeds(white);
    if (mgos_mqtt_global_is_connected())
    {
        maintime = time(0);
        epochTime = (uint64_t)time(&maintime);
        epochTime = epochTime * 1000;

        mgos_mqtt_pubf(mgos_sys_config_get_diagnostic_topic(), 0, false, "{Data: PeriodicReset, inCount: %d, outCount: %d, Time: %llu, PktId: 32, DeviceType: 32, MAC: %Q, Peoplecount: %d, BuzzerState: %Q, LedColour: %Q}", inCount, outCount, epochTime, mac_string, PeopleCount, buzzState, ledColour);
    }
    broadcast();
#ifdef DEBUG
    printf("Count is cleared by periodic reset...!!\n");
#endif
    mgos_clear_timer(periodicResetCountID);
}

/*******************************************************************************
 * @fn      gpio_init
 *
 * @brief   defines the GPIO pins and register the ISR and ISR callback function
 *
 * @param   None.
 *
 * @return  None.
 */
void gpio_init()
{
    /* Buzzer initialization as output */

    mgos_gpio_set_mode(BUZZER, MGOS_GPIO_MODE_INPUT);

    // /* Intailse gpio 0 as input to make controller factory reset */
    mgos_gpio_set_mode(RST_BUTTON, MGOS_GPIO_MODE_INPUT);

    mgos_gpio_set_mode(STATIC_IP_RST_BUTTON, MGOS_GPIO_MODE_INPUT);

    mgos_gpio_enable_int(STATIC_IP_RST_BUTTON);

    mgos_gpio_set_int_handler(STATIC_IP_RST_BUTTON, MGOS_GPIO_INT_EDGE_NEG, controller_static_ip_reset, NULL);
}

/*******************************************************************************
 * @fn      resetSensorCount
 *
 * @brief   Resets the sensor count(inCount_c1, outCount_c1, PrevPeopleCount, PeopleCount) to zero and turns off buzzer
 *
 * @param   None.
 *
 * @return  None.
 */
void resetSensorCount(struct mg_rpc_request_info *ri, void *cb_arg, struct mg_rpc_frame_info *fi, struct mg_str args)
{
    inCount = 0;
    outCount = 0;
    PeopleCount = 0;
    inCountAggregation = 0;
    outCountAggregation = 0;
    // blink_led(0, 0, NULL);
    breathLeds(white);

    if (mgos_mqtt_global_is_connected())
    {
        if (mgos_sys_config_get_dwpc_capacity() > 0)
        {
            ledColour = "white";
            buzzState = "OFF";
            buzzer_buzz(0, 0, 0);
            // Set led to defualt colour white colour
            // blink_led(0, 0, NULL);
            mgos_mqtt_pubf(mgos_sys_config_get_diagnostic_topic(), 0, false, "{Data: ClearCount, inCount: %d, outCount: %d, Time: %llu, PktId: 34, DeviceType: 32, MAC: %Q, Peoplecount: %d, BuzzerState: %Q, LedColour: %Q}", inCount, outCount, epochTime, mac_string, PeopleCount, buzzState, ledColour);
        }
        else
        {
            mgos_mqtt_pubf(mgos_sys_config_get_diagnostic_topic(), 0, false, "{Data: ClearCount, inCount: %d, outCount: %d, Time: %llu, PktId: 34, DeviceType: 32, MAC: %Q, Peoplecount: %d}", inCount, outCount, epochTime, mac_string, PeopleCount);
        }
    }
    mg_rpc_send_responsef(ri, data);
    broadcast();
    // (void)cb_arg;
    // (void)fi;
}

/*******************************************************************************
 * @fn      rebootSensor
 *
 * @brief   The device will be rebooted
 *
 * @param   None.
 *
 * @return  None.
 */
void rebootSensor(struct mg_rpc_request_info *ri, void *cb_arg, struct mg_rpc_frame_info *fi, struct mg_str args)
{
    mgos_system_restart_after(100);
    mg_rpc_send_responsef(ri, data);
    (void)cb_arg;
    (void)fi;
}
/*******************************************************************************
 * @fn      rgbColor
 *
 * @brief   Setting the different RGB colors based on the events
 *
 * @param   None.
 *
 * @return  None.
 */
void setColor(struct mg_rpc_request_info *ri, void *cb_arg, struct mg_rpc_frame_info *fi, struct mg_str args)
{
    char *hexCode = NULL;

    if (json_scanf(args.p, args.len, ri->args_fmt, &hexCode) == 1)
    {
        hexCode++;

        uint32_t hexValue = (uint32_t)strtol(hexCode, NULL, 16);
        uint8_t r_value = (uint8_t)(hexValue >> 16);
        uint8_t g_value = (uint8_t)((hexValue >> 8) & 0xff);
        uint8_t b_value = (uint8_t)(hexValue & 0xff);

        uint8_t set_rgb_color[] = {0x3A, g_value, r_value, b_value};
        for (uint8_t i = 0; i < 2; i++)
        {
            breathLeds(set_rgb_color);
            // sendGrayScaleData(LED_DRIVE_PIN, set_rgb_color);
            mgos_msleep(1);
        }
        mg_rpc_send_responsef(ri, data);
    }
    else
    {
        char *errorData = "{result:failed}";
        mg_rpc_send_responsef(ri, errorData);
    }

    (void)cb_arg;
    (void)fi;
}
/*******************************************************************************
@fn     updateCredntials

@brief   The function Allows the user to change the default credentails and set new

@param   None

@return  None
*/
void updateCredntials(struct mg_rpc_request_info *ri, void *cb_arg, struct mg_rpc_frame_info *fi, struct mg_str args)
{
    char *userName = NULL;
    char *auth = NULL;
    if (json_scanf(args.p, args.len, ri->args_fmt, &userName, &auth) == 2)
    {
        // char *authData = "Admin:admin:123456789";
        FILE *authFilePtr;
        authFilePtr = fopen("auth.txt", "w");
        fprintf(authFilePtr, auth);
        fclose(authFilePtr);

        // FILE *aclFilePtr;
        // aclFilePtr = fopen("acl.json", "w");
        const char *acl = "[{method:\"*\",acl:\"+%s\"}]";

        json_fprintf("acl.json", acl, userName);
#ifdef DEBUG
        printf("user auth: %s", auth);
        printf("user name: %s", userName);
#endif
        mg_rpc_send_responsef(ri, data);
    }
    else
    {
        char *errorData = "{result:failed}";
        mg_rpc_send_responsef(ri, errorData);
    }
}

uint8_t vl53l5x_Init()
{
    Dev.platform.address = VL53L5CX_DEFAULT_I2C_ADDRESS;
    status |= vl53l5cx_is_alive(&Dev, &isAlive);
    if (!isAlive)
    {
#ifdef DEBUG
        printf("VL53L5CXV0 not detected at requested address (0x%x)\n",
               Dev.platform.address);
#endif
    }
    status |= vl53l5cx_init(&Dev);
    status |= vl53l5cx_set_ranging_frequency_hz(&Dev, mgos_sys_config_get_dwpc_sensor_freq()); // Set 2Hz ranging frequency
    status |= vl53l5cx_set_ranging_mode(&Dev, VL53L5CX_RANGING_MODE_CONTINUOUS);               // Set mode continuous
    status |= vl53l5cx_set_resolution(&Dev, VL53L5CX_RESOLUTION_4X4);
    status |= vl53l5cx_start_ranging(&Dev);

    if (status)
    {
#ifdef DEBUG
        printf("Something went wrong!\n");
#endif
    }
    return status;
}

// catogory 1 algorithm
void getMeanMinDistances(uint16_t *DistancePtr, uint8_t size)
{
    uint8_t i;
    uint8_t inZonecountC1 = 0;
    uint8_t outZonecountC1 = 0;
    uint8_t inZonecountC4 = 0;
    uint8_t outZonecountC4 = 0;

    for (i = 0; i < size; i++)
    {
        DistancePtr[i] = Results.distance_mm[VL53L5CX_NB_TARGET_PER_ZONE * i];
    }
    for (i = 0; i < 4; i++)
    {
        // category 1
        if (DistancePtr[((i + 1) * 4) - 2] < mgos_sys_config_get_dwpc_distance()) // line 2
            outZonecountC1 += 1;

        if (DistancePtr[(i * 4) + 1] < mgos_sys_config_get_dwpc_distance()) // line 1
            inZonecountC1 += 1;

        // category 2
        if (DistancePtr[((i + 1) * 4) - 1] < mgos_sys_config_get_dwpc_distance()) // line 3
            outZonecountC4 += 1;
        if (DistancePtr[((i + 1) * 4) - 2] < mgos_sys_config_get_dwpc_distance()) // line 2
            inZonecountC4 += 1;
    }
    // cat 1
    if (outZonecountC1 >= mgos_sys_config_get_dwpc_outzonecount_threshold())
    {
        zoneOut_C1 = true; // Left Zone or Out zone
    }
    else
    {
        zoneOut_C1 = false;
    }
    if (inZonecountC1 >= mgos_sys_config_get_dwpc_Inzonecount_threshold())
    {
        zoneIn_C1 = true; // In Zone or right Zone
    }
    else
    {
        zoneIn_C1 = false;
    }

    // zone pathTrack for C1
    for (uint8_t i = sizeof(zone_pathtrack) - 1; i >= 2; i--)
    {
        zone_pathtrack[i] = zone_pathtrack[i - 2];
    }
    zone_pathtrack[1] = outZonecountC1;
    zone_pathtrack[0] = inZonecountC1;

    // cat 2
    if (outZonecountC4 >= mgos_sys_config_get_dwpc_outzonecount_threshold())
    {
        zoneOut_C4 = true; // Left Zone or Out zone
    }
    else
    {

        zoneOut_C4 = false;
    }
    if (inZonecountC4 >= mgos_sys_config_get_dwpc_Inzonecount_threshold())
    {
        zoneIn_C4 = true; // In Zone or right Zone
    }
    else
    {
        zoneIn_C4 = false;
    }

    // Zone pathTrack  c4
    for (uint8_t i = sizeof(zone_pathtrack) - 1; i >= 2; i--)
    {
        zone_pathtrack_2[i] = zone_pathtrack_2[i - 2];
    }
    zone_pathtrack_2[1] = outZonecountC4;
    zone_pathtrack_2[0] = inZonecountC4;
    
}
/*******************************************************************************
@fn     controller_static_ip_reset

@brief   The function performs reset static ip of the controller

@param   none

@return  None
*/
void controller_static_ip_reset()
{
    button_value += 1;
#ifndef DEBUG
    printf("Reset Button Value: %d\n", button_value);
#endif
    if (button_value == 5)
    {
        button_value = 0;
        mgos_config_reset(MGOS_CONFIG_LEVEL_USER);
#ifndef DEBUG
        printf("Static ip was Reset successfully!!");
#endif
    }
}
