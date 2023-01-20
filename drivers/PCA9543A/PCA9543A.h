
#ifndef PCA9543A_H_
#define PCA9543A_H_
#include <stdint.h>
#include "mgos_i2c.h"

#define PCA9543A_ADDRESS 0x77
#define TOF_SENSOR_MUX 0x77 // TOF sensors
#define LED_DRIVER_MUX 0x70 // Led

uint8_t selectMuxAndChannel(uint8_t muxAddress, uint8_t channel);
uint8_t selectChannel(uint8_t channel);
void i2cScanner();

#endif