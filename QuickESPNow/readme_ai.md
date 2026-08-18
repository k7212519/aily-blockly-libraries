# QuickESPNow communication

QuickESPNow ESP-NOW communication library for fast wireless send, receive and callback handling on ESP32

## Library Info
- **Name**: @aily-project/lib-quickespnow
- **Version**: 0.8.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `quickespnow_init_current` | Statement | INTERFACE(dropdown), SEND_MODE(dropdown) | `quickespnow_init_current("0", true)` | `quickEspNow.begin(CURRENT_WIFI_CHANNEL, 0, true);` |
| `quickespnow_init_channel` | Statement | CHANNEL(input_value), INTERFACE(dropdown), SEND_MODE(dropdown) | `quickespnow_init_channel(math_number(0), "0", true)` | `quickEspNow.begin(1, 0, true);` |
| `quickespnow_stop` | Statement | (none) | `quickespnow_stop()` | `quickEspNow.stop();` |
| `quickespnow_set_channel` | Statement | CHANNEL(input_value) | `quickespnow_set_channel(math_number(0))` | `quickEspNow.setChannel(1);` |
| `quickespnow_enable_transmit` | Statement | ENABLE(input_value) | `quickespnow_enable_transmit(logic_boolean(TRUE))` | `quickEspNow.enableTransmit(true);` |
| `quickespnow_send_text` | Statement | MAC(input_value), MESSAGE(input_value) | `quickespnow_send_text(text("value"), text("value"))` | `_quickespnow_last_send_result = _quickespnow_send_text_to_mac(String("value"), String("value"));` |
| `quickespnow_send_broadcast_text` | Statement | MESSAGE(input_value) | `quickespnow_send_broadcast_text(text("value"))` | `_quickespnow_last_send_result = _quickespnow_send_broadcast_text(String("value"));` |
| `quickespnow_on_received` | Hat | HANDLER(input_statement) | `quickespnow_on_received()` | `String _quickespnow_rx_message = ""; ↵ int _quickespnow_rx_length = 0; ↵ int _quickespnow_rx_rssi = 0; ↵ bool _quickespnow_rx_is_broadcast = false; ↵ String _quickespnow_rx_sender_mac = ""; ↵ String _quickespnow_tx_target_mac = ""; ↵ int _quickespnow_tx_status = -1; ↵ int _quickespnow_last_send_result = 0; ↵ bool _quickespnow_parse_mac(const String& macText, uint8_t* address) { ↵ unsigned int values[6] = {0}; ↵ if (sscanf(macText.c_str(), "%x:%x:%x:%x:%x:%x", &values[0], &values[1], &values[2], &values[3], &values[4], &values[5]) != 6) { ↵ return false; ↵ } ↵ for (int i = 0; i < 6; ++i) { ↵ address[i] = static_cast<uint8_t>(values[i]); ↵ } ↵ return true; ↵ } ↵ String _quickespnow_mac_to_string(const uint8_t* address) { ↵ if (address == nullptr) { ↵ return String(""); ↵ } ↵ char buffer[18] = {0}; ↵ snprintf(buffer, sizeof(buffer), "%02X:%02X:%02X:%02X:%02X:%02X", ↵ address[0], address[1], address[2], address[3], address[4], address[5]); ↵ return String(buffer); ↵ } ↵ String _quickespnow_buffer_to_string(const uint8_t* data, size_t len) { ↵ String value = ""; ↵ for (size_t i = 0; i < len; ++i) { ↵ value += static_cast<char>(data[i]); ↵ } ↵ return value; ↵ } ↵ int _quickespnow_send_text_to_mac(const String& macText, const String& message) { ↵ uint8_t address[6] = {0}; ↵ if (!_quickespnow_parse_mac(macText, address)) { ↵ return COMMS_SEND_PARAM_ERROR; ↵ } ↵ return quickEspNow.send(address, reinterpret_cast<const uint8_t*>(message.c_str()), message.length()); ↵ } ↵ int _quickespnow_send_broadcast_text(const String& message) { ↵ return quickEspNow.sendBcast(reinterpret_cast<const uint8_t*>(message.c_str()), message.length()); ↵ } ↵ void _quickespnow_on_received_handler(uint8_t* address, uint8_t* data, uint8_t len, signed int rssi, bool broadcast) { ↵ _quickespnow_rx_sender_mac = _quickespnow_mac_to_string(address); ↵ _quickespnow_rx_message = _quickespnow_buffer_to_string(data, len); ↵ _quickespnow_rx_length = len; ↵ _quickespnow_rx_rssi = rssi; ↵ _quickespnow_rx_is_broadcast = broadcast; ↵ } ↵ quickEspNow.onDataRcvd(_quickespnow_on_received_handler);` |
| `quickespnow_on_sent` | Hat | HANDLER(input_statement) | `quickespnow_on_sent()` | `String _quickespnow_rx_message = ""; ↵ int _quickespnow_rx_length = 0; ↵ int _quickespnow_rx_rssi = 0; ↵ bool _quickespnow_rx_is_broadcast = false; ↵ String _quickespnow_rx_sender_mac = ""; ↵ String _quickespnow_tx_target_mac = ""; ↵ int _quickespnow_tx_status = -1; ↵ int _quickespnow_last_send_result = 0; ↵ bool _quickespnow_parse_mac(const String& macText, uint8_t* address) { ↵ unsigned int values[6] = {0}; ↵ if (sscanf(macText.c_str(), "%x:%x:%x:%x:%x:%x", &values[0], &values[1], &values[2], &values[3], &values[4], &values[5]) != 6) { ↵ return false; ↵ } ↵ for (int i = 0; i < 6; ++i) { ↵ address[i] = static_cast<uint8_t>(values[i]); ↵ } ↵ return true; ↵ } ↵ String _quickespnow_mac_to_string(const uint8_t* address) { ↵ if (address == nullptr) { ↵ return String(""); ↵ } ↵ char buffer[18] = {0}; ↵ snprintf(buffer, sizeof(buffer), "%02X:%02X:%02X:%02X:%02X:%02X", ↵ address[0], address[1], address[2], address[3], address[4], address[5]); ↵ return String(buffer); ↵ } ↵ String _quickespnow_buffer_to_string(const uint8_t* data, size_t len) { ↵ String value = ""; ↵ for (size_t i = 0; i < len; ++i) { ↵ value += static_cast<char>(data[i]); ↵ } ↵ return value; ↵ } ↵ int _quickespnow_send_text_to_mac(const String& macText, const String& message) { ↵ uint8_t address[6] = {0}; ↵ if (!_quickespnow_parse_mac(macText, address)) { ↵ return COMMS_SEND_PARAM_ERROR; ↵ } ↵ return quickEspNow.send(address, reinterpret_cast<const uint8_t*>(message.c_str()), message.length()); ↵ } ↵ int _quickespnow_send_broadcast_text(const String& message) { ↵ return quickEspNow.sendBcast(reinterpret_cast<const uint8_t*>(message.c_str()), message.length()); ↵ } ↵ void _quickespnow_on_sent_handler(uint8_t* address, uint8_t status) { ↵ _quickespnow_tx_target_mac = _quickespnow_mac_to_string(address); ↵ _quickespnow_tx_status = status; ↵ } ↵ quickEspNow.onDataSent(_quickespnow_on_sent_handler);` |
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
| INTERFACE | 0, WIFI_IF_STA, WIFI_IF_AP | quickespnow_init_current, quickespnow_init_channel |
| SEND_MODE | true, false | quickespnow_init_current, quickespnow_init_channel |

## ABS Examples

### Basic Usage
```
arduino_setup()
    quickespnow_init_current("0", true)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, quickespnow_ready_to_send())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
