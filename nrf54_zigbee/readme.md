# nRF54 Zigbee Home Automation

基于 nRF54L15 的 Zigbee Home Automation 积木库，支持标准 Zigbee HA 设备创建和网络通信。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-nrf54-zigbee |
| Version | 0.1.0 |
| Author | xiao_nrf54l15 |
| Source | Nrf54L15-Clean-Implementation |
| License | MIT |

## Supported Boards

- Seeed XIAO nRF54L15

## Description

本库封装了 nRF54L15 芯片的 Zigbee 协议栈，提供完整的 Zigbee Home Automation 设备支持。无需依赖 Zephyr/nRF Connect SDK，采用直接寄存器级实现。支持的设备类型包括：

- **灯光设备**: On/Off 灯、调光灯、彩色灯（HSV）、扩展彩色灯（RGBW+色温）
- **传感器设备**: 温度传感器、温湿度传感器（含电池状态）
- **开关设备**: On/Off 开关控制器

支持安全入网（Install Code）、属性自动报告、状态持久化存储、断电恢复等功能。

## Quick Start

1. 在 `setup` 中放置"初始化Zigbee设备"块，选择设备角色和类型
2. 在 `setup` 中放置"启动Zigbee网络"块
3. 在 `loop` 中放置"Zigbee轮询处理"块
4. 根据设备类型使用对应的状态设置/读取积木
