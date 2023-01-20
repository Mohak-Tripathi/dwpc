#include "buzzer.h"
#include "mgos_system.h"
#include "mgos_pwm.h"

struct mgos_rlock_type *buzzer_lock = NULL;
static uint8_t all_off[] = {0x3A, 0x00, 0x00, 0x00};

static void buzzer_timer_cb(void *arg)
{
    mgos_rlock(buzzer_lock);

    if (buzzer.state)
    {
        // off
        mgos_pwm_set(buzzer.pin, 0, 0.5);
    }
    else
    {
        // on
        mgos_pwm_set(buzzer.pin, buzzer.frequency, 0.5);
    }
    buzzer.state = !(buzzer.state);
    mgos_runlock(buzzer_lock);
}

static void kill_buzzer_timer_cb(void *arg)
{
    mgos_rlock(buzzer_lock);
    if (buzzer.timer_id != MGOS_INVALID_TIMER_ID)
    {
        mgos_clear_timer(buzzer.timer_id);
        buzzer.timer_id = MGOS_INVALID_TIMER_ID;
    }
    mgos_pwm_set(buzzer.pin, 0, 0.5);
    mgos_runlock(buzzer_lock);
}

void buzzer_init(uint8_t pin)
{
    buzzer_lock = mgos_rlock_create();
    buzzer.pin = pin;
}

void buzzer_buzz(uint16_t frequency, uint32_t delay, uint32_t buzzTime)
{

    mgos_rlock(buzzer_lock);
    buzzer.frequency = frequency;
    buzzer.delay = delay;
    buzzer.buzzTime = buzzTime;
    if (buzzer.timer_id != MGOS_INVALID_TIMER_ID)
    {
        mgos_clear_timer(buzzer.timer_id);
        buzzer.timer_id = MGOS_INVALID_TIMER_ID;
    }
    if (frequency != 0)
    {
        if (delay != 0)
        {

            buzzer.timer_id = mgos_set_timer(
                buzzer.delay,
                (MGOS_TIMER_REPEAT | MGOS_TIMER_RUN_NOW),
                buzzer_timer_cb, NULL);

            // if (buzzer.buzzTime)
            // {
            //     mgos_set_timer(
            //         buzzer.buzzTime,
            //         MGOS_TIMER_RUN_NOW,
            //         kill_buzzer_timer_cb, NULL);
            // }
            // buzzer.timer_id = mgos_set_timer(delay, 0, buzzer_timer_cb, NULL);
        }
        else
        {
            /* code */
            mgos_pwm_set(buzzer.pin, buzzer.frequency, 0.5);
        }
        if (buzzer.buzzTime)
        {
            mgos_set_timer(
                buzzer.buzzTime,
                0,
                kill_buzzer_timer_cb, NULL);
        }
    }
    else
    {
        // off
        mgos_pwm_set(buzzer.pin, 0, 0.5);
    }

    mgos_runlock(buzzer_lock);
}
