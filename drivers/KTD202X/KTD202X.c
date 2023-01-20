#include "KTD202X.h"
#include "mgos_system.h"

/*******************************************************************************
 * @fn          i2cWrite
 *
 * @brief       Writes the data over I2C bus for specified device or register address
 *
 *
 * @param       reg_add - register address of the particular device
 *
 * @param       value - data to write
 *
 * @return      int
 */
static int i2cWrite(uint8_t reg_add, uint8_t value)
{
    uint8_t data_buff[2] = {reg_add, value};
    uint8_t status;
    // Initialize slave address of transaction
    status = mgos_i2c_write(mgos_i2c_get_global(), DEVICE_ADDRESS, &data_buff,
                            sizeof(data_buff), true);
    return status;
}

/*******************************************************************************
 * @fn          initLedDriver
 *
 * @brief       initializes the LEDs driver and respective RGB LEDs with preferred configuration
 *
 *
 * @return      none
 */
void initLedDriver()
{

    for (uint8_t numberOfDrivers = 0; numberOfDrivers < NUMBER_OF_LED_DRIVERS;
         numberOfDrivers++)
    {
        uint8_t status = 0;
        if (selectMuxAndChannel(LED_DRIVER_MUX, numberOfDrivers))
        {
            i2cWrite(KTD2026_REG_EN_RST, CHIP_RESET);
            mgos_msleep(250);

            if (numberOfDrivers != 1 && numberOfDrivers != 2)
            {
                status = i2cWrite(TURN_ON_ALL_LEDS, ALL_ON);
            }
            else
            {
                status = i2cWrite(TURN_ON_ALL_LEDS, ALL_OFF);
            }
        }
    }
}

void breathLeds(uint8_t *rgb)
{

    uint8_t RGB_LEDS[] = {RED_LED, GREEN_LED, BLUE_LED};
    for (uint8_t numberOfDrivers = 0; numberOfDrivers <= NUMBER_OF_LED_DRIVERS;
         numberOfDrivers++)
    {
        if (numberOfDrivers != 1 && numberOfDrivers != 2)
        {

        if (selectMuxAndChannel(LED_DRIVER_MUX, numberOfDrivers))
        {
            for (uint8_t numberOfLeds = 0; numberOfLeds < NUMBER_OF_LEDS;
                 numberOfLeds++)
            {
                i2cWrite(RGB_LEDS[numberOfLeds], rgb[numberOfLeds]);
            }
            i2cWrite(0x05, 0xaa);
            i2cWrite(0x01, 0x12);
            i2cWrite(0x02, 0x00);
            i2cWrite(KTD2026_REG_LED_EN, 0x2a);
            i2cWrite(0x02, 0x56);
        }
        }
    }
}

/*******************************************************************************
 * @fn          setLedColour
 *
 * @brief       sets RGB colour
 *
 * @param       array of rgb colours
 *
 * @return      none
 */
// void setLedColour(uint8_t redColour, uint8_t greenColour, uint8_t blueColour)
void setSingleLed(uint8_t ledId, uint8_t *rgbColour)
{
    //    for (uint8_t i = 0; i < 3; i++)
    //    {
    //        printf("rgbValue[%x] : %x\n", i, rgbColour[i]);
    //    }
    uint8_t status = 0;
    uint8_t RGB_LEDS[] = {RED_LED, GREEN_LED, BLUE_LED};
    if (selectMuxAndChannel(LED_DRIVER_MUX, ledId))
    {
        //        i2cWrite(0x02, 0x00);
        //        i2cWrite(0x01, 0x00);
        //        i2cWrite(0x04, 0x15);
        //        i2cWrite(0x05, 0x00);
        i2cWrite(KTD2026_REG_PWM1_TIMER, 0x00);
        i2cWrite(KTD2026_REG_FLASH_PERIOD, 0x00);
        i2cWrite(KTD2026_REG_LED_EN, ((rgbColour[2] & 1) << 4 | (rgbColour[0] & 1) << 2 | (rgbColour[1] & 1)));
        i2cWrite(KTD2026_REG_TRISE_TFALL, 0x00);
        for (uint8_t numberOfLeds = 0; numberOfLeds < NUMBER_OF_LEDS;
             numberOfLeds++)
        {

            status = i2cWrite(RGB_LEDS[numberOfLeds], rgbColour[numberOfLeds]);
            //            if(rgbColour[numberOfLeds] == 0){
            //                status = i2cWrite(KTD2026_REG_LED_EN, (0x15 & ~(3<<numberOfLeds*2)));
            //            }
        }
    }
}