# Seeed HM3301 PM2.5 激光粉尘传感器

HM3301激光粉尘传感器的Aily Blockly图形化库，可检测空气中PM1.0、PM2.5、PM10颗粒物浓度。

## 库信息

| 字段 | 值 |
|------|-----|
| Package | @aily-project/lib-seeed-hm3301 |
| Version | 1.0.0 |
| Author | SeeedStudio |
| Source | https://github.com/Seeed-Studio/Seeed_PM2_5_sensor_HM3301 |
| License | MIT |

## 支持开发板

Arduino UNO, Arduino Mega2560, ESP32, ESP8266

## 描述

HM3301是一款基于激光散射原理的数字粉尘传感器，通过I2C接口（地址0x40）通讯。可同时检测PM1.0、PM2.5和PM10三种颗粒物的浓度，支持标准颗粒物和大气环境两种数据格式。

## 快速开始

1. 将HM3301的VCC/GND/SDA/SCL连接到开发板
2. 在setup中放置初始化积木
3. 在loop中使用读取积木获取PM数据
