#include "vl53l5cx_platform.h"
#include <stdio.h>
static uint8_t _I2CBuffer[I2C_PACKET_SIZE];

uint8_t RdByte(VL53L5CX_Platform *p_platform, uint16_t RegisterAdress, uint8_t *p_value)
{
    uint8_t status = 1;
    status = RdMulti(p_platform, RegisterAdress, p_value, 1);
    return status;
}

uint8_t WrByte(VL53L5CX_Platform *p_platform, uint16_t RegisterAdress, uint8_t value)
{
    uint8_t status = 1;
    status = WrMulti(p_platform, RegisterAdress, &value, 1);
    return status;
}

uint8_t WrMulti(VL53L5CX_Platform *p_platform, uint16_t RegisterAdress, uint8_t *p_values, uint32_t size)
{
    uint8_t status = 1;
    // Send Bytes
    while (size > 0)
    {
        uint32_t len = size;
        if (len > (I2C_PACKET_SIZE - 2))
        {
            len = (I2C_PACKET_SIZE - 2);
        }

        // First two bytes in the write buffer is the registry address
        _I2CBuffer[0] = RegisterAdress >> 8;
        _I2CBuffer[1] = RegisterAdress & 0xFF;
        memcpy(&_I2CBuffer[2], p_values, len);
        status = !mgos_i2c_write(mgos_i2c_get_global(), p_platform->address, _I2CBuffer, len+sizeof(RegisterAdress), true);
        if (status)
        {
            return status;
        }
        // Move the pointer Forward
        p_values += len;

        // calculate the remaining bytes to send
        size -= len;

        // move the register address forward
        RegisterAdress += len;
    }
    return status;
}

uint8_t RdMulti(VL53L5CX_Platform *p_platform, uint16_t RegisterAdress, uint8_t *p_values, uint32_t size)
{
    uint8_t status = 1;
    uint8_t data_write[2];

    data_write[0] = (RegisterAdress >> 8) & 0xFF;
    data_write[1] = RegisterAdress & 0xFF;
    status = mgos_i2c_write(mgos_i2c_get_global(), p_platform->address, data_write, 2, true);
    if (status)
    {
        status = !mgos_i2c_read(mgos_i2c_get_global(), p_platform->address, p_values, size, true);
    }
    return status;
}

void SwapBuffer(uint8_t *buffer, uint16_t size)
{
    uint32_t i, tmp;

    /* Example of possible implementation using <string.h> */
    for (i = 0; i < size; i = i + 4)
    {
        tmp = (buffer[i] << 24) | (buffer[i + 1] << 16) | (buffer[i + 2] << 8) | (buffer[i + 3]);

        memcpy(&(buffer[i]), &tmp, 4);
    }
}

uint8_t WaitMs(uint32_t TimeMs)
{
    uint32_t j = 0;

    /* by experimination, this is in us (approx) */
    while (j < TimeMs * 1000)
    {
        
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        asm(" NOP");
        j++;
    }
    return 0;
}
