# DPS3xx 气压温度传感器

Infineon DPS3xx 高精度数字气压温度传感器 Blockly 积木库。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-dps3xx |
| Version | 0.0.1 |
| Author | aily-project |
| Source | https://github.com/Infineon/arduino-xensiv-dps3xx |
| License | MIT |

## Supported Boards

Arduino UNO, Arduino Mega, ESP32, ESP32-S3, ESP32-C3

## Description

DPS3xx 是英飞凌推出的高灵敏度气压温度传感器，可通过 I2C 或 SPI 接口连接。测量范围为 300-1200 hPa（气压）和 -40~85°C（温度）。支持可配置的过采样率，可在精度和速度之间灵活选择。

## Quick Start

1. 通过 I2C 连接 DPS3xx 传感器（默认地址 0x77）
2. 在 setup 中放置"初始化 DPS3xx"积木
3. 在 loop 中使用"读取温度"或"读取气压"积木获取数据
