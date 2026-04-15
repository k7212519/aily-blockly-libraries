# RadioLib LoRa 无线通信

基于RadioLib的LoRa无线通信积木库，支持多种LoRa射频模块。

## 库信息

| 字段 | 值 |
|------|------|
| 包名 | @aily-project/lib-radiolib |
| 版本 | 7.6.0 |
| 作者 | Jan Gromes |
| 来源 | https://github.com/jgromes/RadioLib |
| 许可 | MIT |

## 支持的开发板

Arduino UNO, Arduino Mega, Arduino Nano, ESP32, ESP8266, STM32, RP2040 等

## 说明

RadioLib是一个通用无线通信库，支持多种射频模块。本积木库聚焦LoRa模式，支持SX1276/SX1278（SX127x系列）、SX1262/SX1268（SX126x系列）、LLCC68和SX1280（2.4GHz LoRa）等芯片。提供阻塞式和中断式两种收发模式。

## 快速开始

1. 在setup中放置"初始化LoRa"积木，选择芯片类型并设置引脚和频率
2. 使用"发送消息"或"接收消息"积木进行通信
3. 收发双方需使用相同的频率、带宽、扩频因子和编码率
