#ifndef BLINK_H_

#define BLINK_H_
#include <stdint.h>
#include <stdbool.h>
#include "mgos_timers.h"

struct Blink
{
    /* data */
    uint8_t on_ms;
    uint8_t off_ms;
    mgos_timer_id timer_id;
    bool state;
} blink;
void blink_init();
void blink_led(uint16_t on_ms, uint16_t off_ms, uint8_t *gsData);
#endif