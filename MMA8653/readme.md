# MMA8653加速度传感器

NXP MMA8653三轴加速度传感器Blockly库，I2C通信，支持2/4/8G量程、8/10位分辨率、多种采样率

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-mma8653 |
| Version | 1.0.0 |
| Author | Lucas Hohmann |
| Source | https://github.com/lfhohmann/MMA8653 |
| License | MIT |

## Supported Boards

Arduino UNO, Arduino Mega, Arduino Nano, BBC Micro:Bit 等支持I2C的开发板

## Description

MMA8653是NXP的低功耗三轴加速度传感器，通过I2C接口通信（固定地址0x1D）。支持±2g/±4g/±8g量程、8位/10位分辨率，数据输出速率从1.56Hz到800Hz，还支持多种过采样模式（普通、低噪低功耗、高分辨率、低功耗）。

## Quick Start

1. 将传感器通过I2C连接到开发板（SDA/SCL）
2. 在setup中使用初始化积木配置量程、分辨率和采样率
3. 使用启动积木激活传感器
4. 在loop中读取X/Y/Z轴加速度数据
