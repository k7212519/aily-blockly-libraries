# LSM303AGR加速度计和磁力计

LSM303AGR三轴加速度计和三轴磁力计传感器控制库，使用I2C接口读取加速度、磁场和温度数据。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-lsm303agr |
| Version | 0.0.1 |
| Author | STMicroelectronics / aily Project |
| Source | https://github.com/stm32duino/LSM303AGR |
| License | BSD-3-Clause |

## Supported Boards

Arduino AVR (UNO/Nano/Mega), Arduino SAM (Due), ESP32

## Description

LSM303AGR是一款集成了三轴加速度计和三轴磁力计的传感器芯片。本库提供7个Blockly积木块，支持读取三轴加速度值（mg）、三轴磁场值（mGauss）、温度值（°C），以及基于Madgwick滤波器的AHRS姿态解算（横滚角、俯仰角、航向角）。通过I2C接口与开发板通信。

## Quick Start

将库添加到项目中，在Aily Blockly编辑器中使用提供的积木块。在setup中初始化传感器，在loop中读取数据。
