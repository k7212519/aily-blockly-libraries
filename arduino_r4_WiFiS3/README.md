# Arduino WiFiS3

Arduino UNO R4 WiFi 的 WiFiS3 库 Blockly 封装，提供 WiFi 连接、网络查询、网络扫描和网络配置功能。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-r4-wifis3 |
| Version | 1.0.0 |
| Author | Arduino |
| Source | https://github.com/arduino-libraries/WiFiS3 |
| License | LGPL-2.1 |

## Supported Boards

Arduino UNO R4 WiFi (renesas_uno:unor4wifi)

## Description

WiFiS3 是 Arduino UNO R4 WiFi 内置的 WiFi 库，基于板载 ESP32-S3 模块实现无线网络功能。支持 WPA/WPA2 加密连接、开放网络连接、热点 (AP) 模式、静态 IP 配置、DNS 设置、网络扫描和 PING 诊断。

## Quick Start

1. 拖入「连接WiFi SSID / 密码」块到 setup，填写 SSID 和密码
2. 拖入「等待WiFi连接」块，设置超时时间
3. 使用「WiFi已连接？」或「获取本地IP地址」块验证连接状态

- **连接需要时间**: WiFi 连接不是瞬间完成的，建议使用 **等待 WiFi 连接** 块或循环等待
- **IP 地址格式**: 所有 IP 地址都以字符串格式返回（如 "192.168.1.100"）
- **MAC 地址格式**: MAC 地址以标准格式返回（如 "AA:BB:CC:DD:EE:FF"）
- **网络扫描**: 需要先调用 **扫描 WiFi 网络**，再通过索引查询结果
- **热点密码**: 建议设置超过 8 个字符的密码，确保网络安全

## 兼容性

- **硬件**: Arduino UNO R4 WiFi（仅支持此硬件）
- **库版本**: Arduino WiFiS3 >= 0.5.0
- **协议**: WiFi 802.11 b/g/n

## 参考资源

- [Arduino UNO R4 WiFi 官方文档](https://docs.arduino.cc/tutorials/uno-r4-wifi/)
- [WiFiS3 库源码](https://github.com/arduino/ArduinoCore-renesas)

---

**最后更新**: 2026年1月
