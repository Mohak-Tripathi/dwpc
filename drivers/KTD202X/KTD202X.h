
#ifndef KTD202X_H_
#define KTD202X_H_
#include "PCA9543A.h"
#include "mgos_i2c.h"

#include <stdint.h>

/* KTD2026 I2C Address */
#define DEVICE_ADDRESS 0x30

/* KTD2026 register map */
#define KTD2026_REG_EN_RST 0x00
#define KTD2026_REG_FLASH_PERIOD 0x01
#define KTD2026_REG_PWM1_TIMER 0x02
#define KTD2026_REG_PWM2_TIMER 0x03
#define KTD2026_REG_LED_EN 0x04
#define KTD2026_REG_TRISE_TFALL 0x05
#define KTD2026_REG_LED1 0x06
#define KTD2026_REG_LED2 0x07
#define KTD2026_REG_LED3 0x08
#define KTD2026_REG_MAX 0x09
#define KTD2026_TIME_UNIT 500

/* RGB LED Registers */
#define RED_LED KTD2026_REG_LED2
#define GREEN_LED KTD2026_REG_LED1
#define BLUE_LED KTD2026_REG_LED3
#define TURN_ON_ALL_LEDS KTD2026_REG_LED_EN
#define CHIP_RESET 0x7
#define ALL_ON 21
#define ALL_OFF 0
/* Number of RGB LEDs and LED drivers */
#define NUMBER_OF_LEDS 3
#define NUMBER_OF_LED_DRIVERS 4

void initLedDriver();
void setLedColour(uint8_t cmd, uint8_t *rgb);
void breathLeds(uint8_t *rgb);
void setSingleLed(uint8_t ledId, uint8_t *rgbColour);
#endif