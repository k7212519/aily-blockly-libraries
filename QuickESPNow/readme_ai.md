# QuickESPNow

QuickESPNow ESP-NOW 无线通信库，基于全局对象 quickEspNow，适用于 ESP32。

## Library Info
- **Name**: @aily-project/lib-quickespnow
- **Version**: 0.8.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `quickespnow_init_current` | Statement | INTERFACE(dropdown), SEND_MODE(dropdown) | `quickespnow_init_current(WIFI_IF_STA, true)` | `quickEspNow.begin(CURRENT_WIFI_CHANNEL, WIFI_IF_STA, true);` |
| `quickespnow_init_channel` | Statement | CHANNEL(input_value), INTERFACE(dropdown), SEND_MODE(dropdown) | `quickespnow_init_channel(math_number(1), WIFI_IF_STA, true)` | `quickEspNow.begin(channel, WIFI_IF_STA, true);` |
| `quickespnow_stop` | Statement | (none) | `quickespnow_stop()` | `quickEspNow.stop();` |
| `quickespnow_set_channel` | Statement | CHANNEL(input_value) | `quickespnow_set_channel(math_number(1))` | `quickEspNow.setChannel(1);` |
| `quickespnow_enable_transmit` | Statement | ENABLE(input_value) | `quickespnow_enable_transmit(logic_boolean(TRUE))` | `quickEspNow.enableTransmit(true);` |
| `quickespnow_send_text` | Statement | MAC(input_value), MESSAGE(input_value) | `quickespnow_send_text(text("12:34:56:78:90:12"), text("hello"))` | `_quickespnow_last_send_result = _quickespnow_send_text_to_mac(...);` |
| `quickespnow_send_broadcast_text` | Statement | MESSAGE(input_value) | `quickespnow_send_broadcast_text(text("hello"))` | `_quickespnow_last_send_result = _quickespnow_send_broadcast_text(...);` |
| `quickespnow_on_received` | Hat | HANDLER(input_statement) | `quickespnow_on_received() @HANDLER: ...` | `quickEspNow.onDataRcvd(_quickespnow_on_received_handler);` |
| `quickespnow_on_sent` | Hat | HANDLER(input_statement) | `quickespnow_on_sent() @HANDLER: ...` | `quickEspNow.onDataSent(_quickespnow_on_sent_handler);` |
| `quickespnow_ready_to_send` | Value | (none) | `quickespnow_ready_to_send()` | `quickEspNow.readyToSendData()` |
| `quickespnow_last_send_result` | Value | (none) | `quickespnow_last_send_result()` | `_quickespnow_last_send_result` |
| `quickespnow_get_max_message_length` | Value | (none) | `quickespnow_get_max_message_length()` | `quickEspNow.getMaxMessageLength()` |
| `quickespnow_get_address_length` | Value | (none) | `quickespnow_get_address_length()` | `quickEspNow.getAddressLength()` |
| `quickespnow_received_message` | Value | (none) | `quickespnow_received_message()` | `_quickespnow_rx_message` |
| `quickespnow_received_length` | Value | (none) | `quickespnow_received_length()` | `_quickespnow_rx_length` |
| `quickespnow_received_rssi` | Value | (none) | `quickespnow_received_rssi()` | `_quickespnow_rx_rssi` |
| `quickespnow_received_is_broadcast` | Value | (none) | `quickespnow_received_is_broadcast()` | `_quickespnow_rx_is_broadcast` |
| `quickespnow_received_sender_mac` | Value | (none) | `quickespnow_received_sender_mac()` | `_quickespnow_rx_sender_mac` |
| `quickespnow_sent_target_mac` | Value | (none) | `quickespnow_sent_target_mac()` | `_quickespnow_tx_target_mac` |
| `quickespnow_sent_status` | Value | (none) | `quickespnow_sent_status()` | `_quickespnow_tx_status` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| INTERFACE | `0`, `WIFI_IF_STA`, `WIFI_IF_AP` | 自动接口、站点接口、热点接口 |
| SEND_MODE | `true`, `false` | 同步确认发送、异步发送 |

## ABS Examples

### Basic Usage
arduino_setup()
    serial_begin(Serial, 115200)
    quickespnow_init_channel(math_number(1), WIFI_IF_STA, true)

arduino_loop()
    controls_if()
        @IF0: quickespnow_ready_to_send()
        @DO0:
            quickespnow_send_broadcast_text(text("Hello ESP-NOW!"))
    time_delay(math_number(1000))

### Receive Callback
quickespnow_on_received()
    @HANDLER:
        serial_println(Serial, quickespnow_received_message())

## Notes

1. **Global object**: 此库直接调用全局对象 `quickEspNow`，不需要创建变量实例。
2. **WiFi dependency**: 使用前应先设置 STA 或 AP 模式；如果未连接 WiFi，建议使用显式频道的初始化块。
3. **MAC format**: `quickespnow_send_text` 的 MAC 参数必须是 `AA:BB:CC:DD:EE:FF` 格式。
4. **Callback state**: 接收和发送回调块会把最近一次回调数据保存到全局变量，供值块读取。
5. **Single callback**: 同一工程建议每类回调只放一个块，避免后定义的回调覆盖前一个。 