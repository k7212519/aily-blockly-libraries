# WOL 网络唤醒

通过发送 Wake-on-LAN (WOL) 魔术包，唤醒局域网内的设备（PC、NAS、服务器等）。

## 库信息

| 字段 | 值 |
|------|------|
| 包名 | @aily-project/lib-wol |
| 版本 | 0.0.1 |
| 作者 | ailyProject |
| 源库 | https://github.com/coloz/wol-library |
| 许可证 | MIT |

## 支持的开发板

ESP32 系列、Arduino UNO R4 WiFi、Raspberry Pi Pico W

## 说明

基于 ArduinoWOL 库封装，支持通过 WiFi 发送标准 WOL 魔术包。用户只需提供目标设备的 MAC 地址，即可一键唤醒局域网设备。支持自定义广播地址和端口号。

## 快速开始

1. 确保开发板已连接 WiFi
2. 使用"发送WOL唤醒包"积木，填入目标设备的 MAC 地址即可
