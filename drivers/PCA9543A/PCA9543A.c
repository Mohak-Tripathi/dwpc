#include "PCA9543A.h"
#include <stdio.h>
#define true 1
#define false 0

uint8_t selectChannel(uint8_t channel)
{
    // struct mgos_i2c *i2c = mgos_i2c_get_global();
    uint8_t data = 0;
    int status = 0;
    // switch (channel)
    // {
    // case 0:
    //     data = data | 1;
    //     break;
    // case 1:
    //     data = data | 2;
    //     break;
    // default:
    //     return;
    // }
    data = 1 << channel;
    status = mgos_i2c_write(mgos_i2c_get_global(), PCA9543A_ADDRESS, &data, sizeof(data), true);
    // printf("Choosing channel %d\n", status);
    return status;
}

/*******************************************************************************
 * @fn          selectMuxAndChannel
 *
 * @brief       Switch between the I2C slaves(channels) to read or write data
 *
 * @param       I2C_Handle - I2C communication bus handle instance
 *
 * @param       channel - to select the particular slave(channel)
 *
 * @return      none
 */
uint8_t selectMuxAndChannel(uint8_t muxAddress, uint8_t channel)
{
    uint8_t status = 0;
    uint8_t data = 0;
    data = 1 << channel;
    status = mgos_i2c_write(mgos_i2c_get_global(), muxAddress, &data, sizeof(data), true);

    //#ifdef DEBUG
    //    if (status)
    //    {
    //        printf("channel ok\n");
    //    }
    //#endif
    return status;
}

// void selectChannel(uint8_t channel)
// {
//     // struct mgos_i2c *i2c = mgos_i2c_get_global();
//     uint8_t data = 0;
//     int status;
//     switch (channel)
//     {
//     case 0:
//         data = channel;
//         status = mgos_i2c_write(mgos_i2c_get_global(), PCA9543A_ADDRESS, &data, sizeof(data), true);
//         printf("Choosing channel %d\n", status);
//         break;
//     case 1:

//         data = channel;
//         status = mgos_i2c_write(mgos_i2c_get_global(), PCA9543A_ADDRESS, &data, sizeof(data), true);
//         printf("Choosing channel %d\n", status);
//         break;
//     default:
//         break;
//     }
// }

void i2cScanner()
{
    uint8_t result;
    uint8_t nDevices = 0;
    uint8_t Buffer[1];
    Buffer[0] = 0;
    for (uint8_t i = 1; i < 127; i++)
    {
        result = mgos_i2c_write(mgos_i2c_get_global(), i, &Buffer, sizeof(Buffer), true);
        if (result)
        {
            nDevices++;
            printf("Address %x\n", i);
        }
    }
    printf("Detected %d devices\n", nDevices);
}