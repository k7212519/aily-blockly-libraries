# TLx5012B 磁性角度传感器

Infineon XENSIV TLx5012B 磁性角度传感器的 Blockly 积木库，支持 360° 角度测量。

## 库信息

| 字段 | 值 |
|------|------|
| Package | @aily-project/lib-infineon-tlx5012 |
| Version | 0.0.1 |
| Author | Infineon Technologies AG |
| Source | https://github.com/Infineon/arduino-xensiv-angle-sensor-tlx5012 |
| License | MIT |

## 支持的开发板

Arduino UNO, Arduino Mega, ESP32, ESP32-S3

## 简介

TLx5012B 是一款预校准的 360° 磁性角度传感器，使用 SPI 接口通信。支持读取角度值、角速度、旋转圈数和温度。适用于电机控制、机器人、旋钮编码等应用场景。

## 快速开始

1. 将传感器的 SPI 引脚连接到开发板（MISO、MOSI、SCK、CS）
2. 使用"初始化 TLx5012B"积木设置 CS 引脚
3. 使用"读取角度值"等积木获取传感器数据
