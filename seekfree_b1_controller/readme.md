# 逐飞麦轮车控制

逐飞 B1 麦轮车套件 Blockly 库，提供底盘、声光、按键、灰度、OpenART mini 与机械臂控制。

## Library Info

| Field | Value |
|---|---|
| Package | @aily-project/lib-seekfree_b1_controller |
| Version | 0.0.1 |
| Author | 逐飞科技 |
| Source | src/ |
| License | 未注明 |

## Supported Boards

ESP32-S3（Arduino ESP32 core），5V 外设。

## Description

通过 CAN、GPIO 和串口驱动 B1 小车模块；支持前后左右/旋转/目标跟踪、陀螺仪校准、LED/蜂鸣器、板载按键、灰度循迹、视觉识别和舵机通道控制。

## Quick Start

1. 在 setup 中放入对应初始化块。
2. 选择传感器接口、通道或舵机通道。
3. 在 loop 中组合运动、读取与识别块完成控制逻辑。
