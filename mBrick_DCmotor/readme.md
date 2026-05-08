# mBrick DC Motor

用于 mBrick 直流电机模块的 Blockly 库，支持单电机、两轮差速车和四轮驱动车控制。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-mbrick-dcmotor |
| Version | 1.0.0 |
| Author | AILY Project |
| Source | mBrick_DCmotor Arduino library |
| License | Unknown |

## Supported Boards

ESP32

## Description

该库封装了 mBrick 直流电机驱动对象，提供单个电机启停、方向切换、PWM 调速，以及两轮车、四轮车的前进、后退、转向和最小启动 PWM 设置。电机接口采用固定端口映射，适合基于 mBrick 电机底盘的快速搭建。

## Quick Start

1. 在 arduino_setup() 中先用 mbrick_motor_init 初始化所需电机。
2. 若要控制两轮车或四轮车，再用对应的 init 块组合成车体对象。
3. 在 arduino_loop() 中调用前进、后退、转向、停止或调速块。