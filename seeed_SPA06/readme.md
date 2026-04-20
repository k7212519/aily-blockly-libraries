# SPA06 (SPL07-003) 气压温度传感器

SPA06 是一款基于 SPL07-003 芯片的高精度气压和温度传感器 Blockly 库。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-seeed-spa06 |
| Version | 0.0.1 |
| Author | SeeedStudio / Kenneract |
| Source | https://github.com/Seeed-Studio/Seeed_Arduino_SPA06 |
| License | MIT |

## Supported Boards

Arduino UNO, Arduino Mega, Arduino Nano, ESP32, ESP8266, Arduino SAMD, RP2040

## Description

SPA06 库用于通过 I2C 接口读取 SPL07-003 气压温度传感器的数据。支持气压、温度和海拔高度的读取，提供灵活的采样率和过采样配置，支持多种工作模式（单次测量、连续测量等）。

## Quick Start

1. 将 SPA06 传感器通过 I2C（SDA/SCL）连接到 Arduino
2. 在 setup 中使用"初始化SPA06传感器"积木
3. 在 loop 中使用"读取SPA06温度/气压/海拔"积木获取数据
