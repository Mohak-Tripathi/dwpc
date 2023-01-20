#ifndef BUZZER_H_

#define BUZZER_H_
#include <stdint.h>
#include <stdbool.h>
#include "mgos_timers.h"

struct buzzer
{
    /* data */
    uint8_t pin;
    uint16_t frequency;
    uint32_t delay;
    uint32_t buzzTime;
    bool state;
    mgos_timer_id timer_id;
} buzzer;
void buzzer_init(uint8_t pin);
void buzzer_buzz(uint16_t frequency, uint32_t delay, uint32_t buzzTime);
#endif