/*********************************************************************
 * INCLUDES
 */
#include "blink.h"
#include "mgos_system.h"
#include "TLC59731.h"

/*********************************************************************
 * GLOBAL VARIABLES
 */
/* to acquire cpu resource  */
struct mgos_rlock_type *blink_lock = NULL;
/* to turn off leds */
static uint8_t all_off[] = {0x3A, 0x00, 0x00, 0x00};
/* to sets leds to white colour  */
static uint8_t all_white[] = {0x3A, 0xFF, 0xFF, 0xFF};

/*******************************************************************************
 * @fn      blink_led_timer_cb
 *
 * @brief   sets leds to match the blink patteren
 *
 * @param   arg -> Ignored
 *
 *
 * @return  None.
 */
static void blink_led_timer_cb(void *arg)
{
    mgos_rlock(blink_lock);

    if (blink.state)
    {
        uint8_t *set_rgb_color = (uint8_t *)arg;
        for (uint8_t i = 0; i < 5; i++)
        {
            sendGrayScaleData(LED_DRIVE_PIN, set_rgb_color);
            mgos_msleep(1);
        }
    }
    else
    {
        for (uint8_t i = 0; i < 5; i++)
        {
            sendGrayScaleData(LED_DRIVE_PIN, all_off);
            mgos_msleep(1);
        }
    }
    if (blink.on_ms != blink.off_ms)
    {
        int timeout = (blink.state ? blink.on_ms : blink.off_ms);
        blink.timer_id =
            mgos_set_timer(timeout, 0, blink_led_timer_cb, arg);
    }
    blink.state = !(blink.state);
    mgos_runlock(blink_lock);
}

void blink_init()
{
    blink_lock = mgos_rlock_create();
}

void blink_led(uint16_t on_ms, uint16_t off_ms, uint8_t *gsData)
{
    mgos_rlock(blink_lock);
    blink.on_ms = on_ms;
    blink.off_ms = off_ms;
    if (blink.timer_id != MGOS_INVALID_TIMER_ID)
    {
        mgos_clear_timer(blink.timer_id);
        blink.timer_id = MGOS_INVALID_TIMER_ID;
    }
    if (on_ms != 0 && off_ms != 0)
    {
        blink.timer_id = mgos_set_timer(
            on_ms,
            (on_ms == off_ms ? MGOS_TIMER_REPEAT : 0) | MGOS_TIMER_RUN_NOW,
            blink_led_timer_cb, (void *)gsData);
    }
    else
    {
        for (uint8_t i = 0; i < 5; i++)
        {
            sendGrayScaleData(LED_DRIVE_PIN, all_white);
            mgos_msleep(1);
        }
    }

    mgos_runlock(blink_lock);
}
