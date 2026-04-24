# MAX30102血氧心率传感器

在 Blockly 中快速接入 MAX30102，用少量积木完成初始化、测量，并读取血氧、心率、温度和原始红光/红外值。

## 库信息

| 字段 | 值 |
|------|----|
| 包名 | @aily-project/lib-max30102 |
| 版本 | 0.0.1 |
| 作者 | ailyProject |
| 来源 | https://github.com/aromring/MAX30102_by_RF |
| 许可 | 参考上游仓库 |

## 支持板卡

ESP32、ESP32-S3、Arduino SAMD，建议使用 3.3V 板卡。

## 简介

这个库把 MAX30102 的 I2C 初始化、FIFO 采样和 RF 算法计算封装成 Blockly 积木，适合做血氧和心率检测原型。测量后可直接读取 SpO2、心率、温度以及红光、红外、R 值和相关系数。

## 快速开始

1. 连接模块的 VCC、GND、SDA、SCL、INT，其中 SDA/SCL 接开发板 I2C，引脚 INT 接任意数字口。
2. 在 `arduino_setup` 中放入初始化块，选择实际接线的 SDA、SCL、INT。
3. 在 `arduino_loop` 中执行一次测量，再读取数值；详细块参数和 ABS 用法见 `readme_ai.md`。
