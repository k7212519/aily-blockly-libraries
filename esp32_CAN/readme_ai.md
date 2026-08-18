# ESP32 CAN bus

ESP32 CAN (TWAI) communication library supports sending and receiving CAN messages, suitable for ESP32 series development boards

## Library Info
- **Name**: @aily-project/lib-esp32-twai
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_can_init` | Statement | RX_PIN(field_number), TX_PIN(field_number), MODE(dropdown), SPEED(dropdown) | `esp32_can_init(21, 22, TWAI_MODE_NORMAL, "TWAI_TIMING_CONFIG_500KBITS()")` | `// Initialize configuration structures using macro initializers ↵ twai_general_config_t g_config = TWAI_GENERAL_CONFIG_DEFAULT((gpio_num_t)TX_PIN, (gpio_num_t)RX_PIN, TWAI_MODE_NORMAL); ↵ twai_timing_config_t t_config = TWAI_TIMING_CONFIG_500KBITS(); ↵ twai_filter_config_t f_config = TWAI_FILTER_CONFIG_ACCEPT_ALL(); ↵ // Install TWAI driver ↵ if (twai_driver_install(&g_config, &t_config, &f_config) == ESP_OK) { ↵ driver_installed = true; ↵ } else { ↵ return; ↵ } ↵ // Start TWAI driver ↵ if (twai_start() != ESP_OK) { ↵ return; ↵ }` |
| `esp32_can_configure_alerts` | Statement | RX_DATA(field_checkbox), TX_IDLE(field_checkbox), TX_SUCCESS(field_checkbox), TX_FAILED(field_checkbox), ERR_PASS(field_checkbox), BUS_ERROR(field_checkbox), RX_QUEUE_FULL(field_checkbox) | `esp32_can_configure_alerts(FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE)` | `// Reconfigure alerts ↵ uint32_t alerts_to_enable = 0; ↵ twai_reconfigure_alerts(alerts_to_enable, NULL);` |
| `esp32_can_send_message` | Statement | ID(field_number), LENGTH(field_number), DATA(field_input) | `esp32_can_send_message(0, 4, "0,0,0,0")` | `{ ↵ // Parse data string into array ↵ String dataStr = "0,0,0,0"; ↵ uint8_t dataArray[8] = {0}; ↵ int dataIdx = 0; ↵ int commaIndex; ↵ while ((commaIndex = dataStr.indexOf(',')) != -1) { ↵ dataArray[dataIdx++] = dataStr.substring(0, commaIndex).toInt(); ↵ dataStr = dataStr.substring(commaIndex + 1); ↵ if (dataIdx >= 8) break; ↵ } ↵ if (dataStr.length() > 0 && dataIdx < 8) { ↵ dataArray[dataIdx] = dataStr.toInt(); ↵ } ↵ send_can_message(0, 4, dataArray); ↵ }` |
| `esp32_can_receive_message` | Statement | (none) | `esp32_can_receive_message()` | `{ ↵ // Check if message is received ↵ twai_message_t message; ↵ if (twai_receive(&message, 0) == ESP_OK) { ↵ handle_rx_message(message); ↵ } ↵ }` |
| `esp32_can_check_alerts` | Statement | (none) | `esp32_can_check_alerts()` | `{ ↵ // Check if alert happened ↵ twai_read_alerts(&alerts_triggered, pdMS_TO_TICKS(POLLING_RATE_MS)); ↵ twai_status_info_t twaistatus; ↵ twai_get_status_info(&twaistatus); ↵ // 如果有接收数据警报，处理所有接收到的消息 ↵ if (alerts_triggered & TWAI_ALERT_RX_DATA) { ↵ twai_message_t message; ↵ while (twai_receive(&message, 0) == ESP_OK) { ↵ handle_rx_message(message); ↵ } ↵ } ↵ }` |
| `esp32_can_message_available` | Value | (none) | `esp32_can_message_available()` | `new_message_available` |
| `esp32_can_get_message_id` | Value | (none) | `esp32_can_get_message_id()` | `last_received_message.identifier` |
| `esp32_can_get_message_length` | Value | (none) | `esp32_can_get_message_length()` | `last_received_message.data_length_code` |
| `esp32_can_get_message_data` | Value | INDEX(field_number) | `esp32_can_get_message_data(0)` | `last_received_message.data[0]` |
| `esp32_can_transmit_interval` | Statement | INTERVAL(field_number) | `esp32_can_transmit_interval(1000)` | `{ ↵ // Setup timer for periodic transmission ↵ unsigned long currentMillis = millis(); ↵ if (currentMillis - previousMillis >= TRANSMIT_RATE_MS) { ↵ previousMillis = currentMillis; ↵ // Call your send function here, e.g.: send_can_message(); ↵ } ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | TWAI_MODE_NORMAL, TWAI_MODE_LISTEN_ONLY | esp32_can_init |
| SPEED | TWAI_TIMING_CONFIG_500KBITS(), TWAI_TIMING_CONFIG_100KBITS(), TWAI_TIMING_CONFIG_125KBITS(), TWAI_TIMING_CONFIG_250KBITS(), TWAI_TIMING_CONFIG_1MBITS() | esp32_can_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_can_init(21, 22, TWAI_MODE_NORMAL, "TWAI_TIMING_CONFIG_500KBITS()")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_can_message_available())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
