# TLx493D 3D磁传感器

Infineon XENSIV TLx493D系列3D磁传感器的Blockly库，支持通过I2C接口读取三轴磁场和温度数据。

## 库信息

| 字段 | 值 |
|------|-----|
| 包名 | @aily-project/lib-infineon-tlx493d |
| 版本 | 0.0.1 |
| 作者 | Infineon Technologies |
| 来源 | https://github.com/Infineon/arduino-xensiv-3d-magnetic-sensor-tlx493d |
| 许可 | MIT |

## 支持的开发板

Arduino UNO、Arduino Mega、Arduino SAMD、ESP32、Raspberry Pi Pico

## 说明

本库封装了Infineon XENSIV TLx493D系列3D磁传感器，支持A1B6、A2B6、A2BW、P2B6、W2B6、W2BW、P3B6等多种型号。传感器通过I2C接口通信，可测量X/Y/Z三轴磁场强度（单位mT）和温度（单位°C），适用于位置检测、角度测量、电流感应等应用场景。

## 快速开始

1. 将传感器通过I2C连接到开发板（SDA、SCL、VCC、GND）
2. 在setup中使用"初始化3D磁传感器"积木，选择传感器型号和I2C地址
3. 在loop中使用"读取磁场"或"读取温度"积木获取数据
