#include "TLC59731.h"
#include "mgos_gpio.h"
#include "mgos_system.h"
#include "FreeRTOS.h"
#define NOP() asm volatile("nop")

unsigned long IRAM_ATTR micros()
{
    return (unsigned long)(esp_timer_get_time());
}
void IRAM_ATTR delayMicroseconds(uint32_t us)
{
    uint32_t m = micros();
    if (us)
    {
        uint32_t e = (m + us);
        if (m > e)
        { //overflow
            while (micros() > e)
            {
                NOP();
            }
        }
        while (micros() < e)
        {
            NOP();
        }
    }
}
static void sendBit(uint8_t ledDriverPin, uint8_t bit)
{
    // start next cycle
    mgos_gpio_write(ledDriverPin, HIGH);
    delayMicroseconds(DELAY); // the pulse on the wire does not really have a width of 1us, since the write operation needs time too
    mgos_gpio_write(ledDriverPin, LOW);
    delayMicroseconds(DELAY);

    if (bit)
    {
        // write "1" data bit
        mgos_gpio_write(ledDriverPin, HIGH);
        delayMicroseconds(DELAY);
        mgos_gpio_write(ledDriverPin, LOW);
        delayMicroseconds(T_CYCLE_1);
    }

    else
    {
        // for "0" data bit simply let timeout the cylce
        delayMicroseconds(T_CYCLE_0);
    }
}

static void sendByte(uint8_t ledDriverPin, uint8_t byte)
{
    sendBit(ledDriverPin, byte & (1 << 7));
    sendBit(ledDriverPin, byte & (1 << 6));
    sendBit(ledDriverPin, byte & (1 << 5));
    sendBit(ledDriverPin, byte & (1 << 4));
    sendBit(ledDriverPin, byte & (1 << 3));
    sendBit(ledDriverPin, byte & (1 << 2));
    sendBit(ledDriverPin, byte & (1 << 1));
    sendBit(ledDriverPin, byte & (1 << 0));
}

// void sendGrayScaleData(uint8_t ledDriverPin, uint8_t *gsData)
// {
//     // driver number
//     uint8_t driver = 0;
//     // start next cycle
//     mgos_gpio_write(ledDriverPin, HIGH);
//     delayMicroseconds(DELAY);
//     mgos_gpio_write(ledDriverPin, LOW);
//     delayMicroseconds(DELAY);
//     delayMicroseconds(T_CYCLE_0);
//     // send 32 bit data to each driver
//     while (driver < drivers)
//     {
//         // write the field values
//     for (uint8_t index = 0; index < 4; index++)
//     {
//         sendByte(ledDriverPin, gsData[index]);
//     }
//     // increment the driver number
//     driver++;
//     if (driver < drivers)
//     {
//         //End of Sequence (EOS) 3.5 x t (min) to 5.5 x t (max)
//         delayMicroseconds(4 * (T_CYCLE_0 + (2 * DELAY)));
//     }
//     else
//     {
//             //GS Data Latch (GSLAT) Sequence 8 x t (min)
//             delayMicroseconds(8 * (T_CYCLE_0 + (2 * DELAY)));
//     }
//     }
// }

void sendGrayScaleData(uint8_t ledDriverPin, uint8_t *gsData)
{
    // driver number
    // start next cycle
    mgos_gpio_write(ledDriverPin, HIGH);
    delayMicroseconds(DELAY);
    mgos_gpio_write(ledDriverPin, LOW);
    delayMicroseconds(DELAY);
    delayMicroseconds(T_CYCLE_0);
    // send 32 bit data to each driver
        // write the field values
    for (uint8_t index = 0; index < 4; index++)
    {
        sendByte(ledDriverPin, gsData[index]);
    }
    
}