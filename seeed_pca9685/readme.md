# Seeed PCA9685

Grove 16通道舵机/PWM驱动器（PCA9685）的Blockly积木库。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-seeed-pca9685 |
| Version | 1.0.0 |
| Author | SeeedStudio |
| Source | https://github.com/Seeed-Studio/Seeed_PCA9685 |
| License | MIT |

## Supported Boards

Arduino UNO, Arduino Mega, Arduino Nano, ESP32, ESP8266, Arduino UNO R4 WiFi, Raspberry Pi Pico

## Description

基于SeeedStudio的PCA9685库，提供16通道PWM输出和舵机角度控制功能。支持通过I2C接口控制最多16路PWM输出或舵机，默认I2C地址为0x7f，PWM频率范围24Hz~1526Hz。

## Quick Start

1. 连接Grove 16-Channel Servo Driver到I2C接口
2. 使用"创建舵机驱动器"积木创建对象
3. 使用"初始化"积木设置I2C地址
4. 使用"设置舵机角度"积木控制舵机
