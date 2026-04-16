# MAG3110 三轴磁力计

SparkFun MAG3110三轴磁力计传感器控制库，适用于Arduino开发板。使用I2C接口读取三轴磁场数据，支持校准和航向角计算。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-sparkfun-mag3110 |
| Version | 0.0.1 |
| Author | SparkFun Electronics |
| Source | https://github.com/sparkfun/SparkFun_MAG3110_Breakout_Board_Arduino_Library |
| License | Beerware |

## Supported Boards

Arduino AVR (UNO/Nano/Mega), ESP32

## Description

MAG3110是Freescale的三轴数字磁力计，通过I2C接口通信。本库提供了读取原始磁场值、微特斯拉值、航向角以及校准功能。传感器可用于电子罗盘、位置检测等应用。

This library provides 10 Blockly blocks.

## Quick Start

将MAG3110通过I2C连接到开发板（SDA/SCL），在Aily Blockly编辑器中使用初始化块和读取块即可开始使用。
