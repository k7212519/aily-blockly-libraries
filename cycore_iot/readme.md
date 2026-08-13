# Cycore IoT

面向 ESP32、ESP32-S3、Cycore ESP32-S3（WiFiDuino，编译标识 `esp32:esp32:wifiduino32s3`）、ESP32-C3 和 ESP32-C6 的芯云物联网图形化编程库。学生只需要填写 Wi-Fi 和平台返回的设备码；Broker、端口、共享账号、连接模式和基础 Topic 均由库内置，无法从积木修改。

库会自动完成 MQTT Topic 拼接、LWT、心跳、自动重连、命令解析、ACK 和批量遥测。所有数据上报项需要放入“上报数据”容器，并从下拉菜单选择 1000–5000 毫秒的上报周期（默认 2000 毫秒）。每个容器拥有独立计时器和数据，周期到达时把完整消息放入线程安全队列；真正的 MQTT 发送只由主循环中的 `cycoreIoT.loop()` 执行。因此上报容器可以在 ESP32 FreeRTOS 子线程中使用，但 `cycoreIoT.loop()` 仍应只在一个线程中频繁运行。MQTT Client ID 会组合设备码与芯片 MAC，避免重复烧录造成会话互踢；网络尚未连通时的少量上报会进入本地队列并在上线后补发。最近收到的命令 ID 会被缓存，重复投递只会重发 ACK，不会再次执行硬件回调。默认 Topic 为 `cycoreiot/{deviceCode}/{telemetry|event|status|ack|command}`。

建议先放置“初始化 Cycore IoT”块，再添加组件控制回调和“上报数据”容器，并把数值、文本、布尔或颜色记录块放入容器。主循环中的网络处理由生成器自动加入，重连使用 `millis()` 判断，不会阻塞学生程序。

FreeRTOS 子线程上报示例见 `examples/freertos_report/freertos_report.ino`。线程中只调用局部 `CycoreIoT::Telemetry` 的 `add()`、`addColor()` 和 `publish()`；不要在线程或中断服务函数中调用 `cycoreIoT.loop()`，也不支持从 ISR 上报。

## Broker 运维配置

首版采用一个已经在 EMQX 中启用的 MQTT 共享账号，后端桥接和教学设备均使用该账号。凭据由部署方维护，并与 `CycoreIoTConfig.h`、后端 `IOT_MQTT_USERNAME`、`IOT_MQTT_PASSWORD` 保持一致。

- 不需要 HTTP 认证器或 `auth-key`。
- 共享账号需要允许后端订阅 `cycoreiot/+/+`，并允许设备发布状态与遥测、订阅控制命令。

若 EMQX 的授权默认策略为拒绝，请为共享账号添加以下规则：

- 允许发布：`cycoreiot/+/telemetry`、`cycoreiot/+/event`、`cycoreiot/+/status`、`cycoreiot/+/ack`
- 允许订阅：`cycoreiot/+/command`

该模式简化了接入，但不能阻止一台设备伪装成另一台设备，仅适合受控教学环境。公网生产环境应改回设备级凭证和 Topic ACL。
