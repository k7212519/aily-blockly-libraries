# Cycore IoT

面向 ESP32、ESP32-S3、Cycore ESP32-S3（WiFiDuino，编译标识 `esp32:esp32:wifiduino32s3`）、ESP32-C3 和 ESP32-C6 的芯云物联网图形化编程库。学生只需要填写 Wi-Fi 和平台返回的设备码；Broker、端口、共享账号、连接模式和基础 Topic 均由库内置，无法从积木修改。

库会自动完成 MQTT Topic 拼接、LWT、心跳、自动重连、命令解析、ACK 和批量遥测。MQTT Client ID 会组合设备码与芯片 MAC，避免重复烧录造成会话互踢；网络尚未连通时的少量上报会进入本地队列并在上线后补发。默认 Topic 为 `cycoreiot/{deviceCode}/{telemetry|event|status|ack|command}`。

建议先放置“初始化 Cycore IoT”块，再添加组件控制回调和遥测上报块。主循环中的网络处理由生成器自动加入，重连使用 `millis()` 判断，不会阻塞学生程序。

## Broker 运维配置

首版采用一个已经在 EMQX 中启用的 MQTT 共享账号，后端桥接和教学设备均使用该账号。凭据由部署方维护，并与 `CycoreIoTConfig.h`、后端 `IOT_MQTT_USERNAME`、`IOT_MQTT_PASSWORD` 保持一致。

- 不需要 HTTP 认证器或 `auth-key`。
- 共享账号需要允许后端订阅 `cycoreiot/+/+`，并允许设备发布状态与遥测、订阅控制命令。

若 EMQX 的授权默认策略为拒绝，请为共享账号添加以下规则：

- 允许发布：`cycoreiot/+/telemetry`、`cycoreiot/+/event`、`cycoreiot/+/status`、`cycoreiot/+/ack`
- 允许订阅：`cycoreiot/+/command`

该模式简化了接入，但不能阻止一台设备伪装成另一台设备，仅适合受控教学环境。公网生产环境应改回设备级凭证和 Topic ACL。
