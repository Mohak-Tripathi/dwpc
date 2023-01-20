#ifndef TLC59731_H_

#define TLC59731_H_

#include <stdint.h>

#define LED_DRIVE_PIN 4

#define NUMBER_OF_DRIVERS 4
#define drivers 1
// timing is everything here

#define DELAY 1u     // width a pulse on the wire (read: 1 unit!), period is 2 units
#define T_CYCLE_0 4u // time to wait for the cycle to complete (before the next bit can be sent) if a 0 was send (4 units)
#define T_CYCLE_1 1u // time to wait for the cycle to complete (before the next bit can be sent) if a 1 was send (1 unit)

#define HIGH 1
#define LOW 0

// void sendGrayScaleData(uint8_t ledDriverPin, uint8_t *gsData, uint8_t drivers);
void sendGrayScaleData(uint8_t ledDriverPin, uint8_t *gsData);


#endif