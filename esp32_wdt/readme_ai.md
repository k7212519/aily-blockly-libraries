# ESP32 watchdog

Task watchdog timer library for ESP32, supporting task and user level watchdog monitoring

## Library Info
- **Name**: @aily-project/lib-esp32-wdt
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `wdt_init` | Statement | TIMEOUT(field_number), PANIC(field_checkbox) | `wdt_init(5, FALSE)` | `esp_task_wdt_config_t twdt_config = { ↵ .timeout_ms = 5000, ↵ .idle_core_mask = (1 << portNUM_PROCESSORS) - 1, ↵ .trigger_panic = false, ↵ }; ↵ ESP_ERROR_CHECK(esp_task_wdt_init(&twdt_config));` |
| `wdt_add_task` | Statement | (none) | `wdt_add_task()` | `ESP_ERROR_CHECK(esp_task_wdt_add(NULL));` |
| `wdt_reset` | Statement | (none) | `wdt_reset()` | `esp_task_wdt_reset();` |
| `wdt_add_user` | Statement | USER_NAME(input_value) | `wdt_add_user(text("value"))` | `ESP_ERROR_CHECK(esp_task_wdt_add_user("value", &wdt_user_handle_value));` |
| `wdt_reset_user` | Statement | USER_NAME(input_value) | `wdt_reset_user(text("value"))` | `esp_task_wdt_reset_user(wdt_user_handle_value);` |
| `wdt_delete_task` | Statement | (none) | `wdt_delete_task()` | `ESP_ERROR_CHECK(esp_task_wdt_delete(NULL));` |
| `wdt_delete_user` | Statement | USER_NAME(input_value) | `wdt_delete_user(text("value"))` | `ESP_ERROR_CHECK(esp_task_wdt_delete_user(wdt_user_handle_value));` |
| `wdt_deinit` | Statement | (none) | `wdt_deinit()` | `ESP_ERROR_CHECK(esp_task_wdt_deinit());` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    wdt_init(5, FALSE)
    serial_begin(Serial, 9600)

arduino_loop()
    wdt_add_task()
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
