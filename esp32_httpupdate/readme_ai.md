# ESP32 HTTPUpdate

ESP32 HTTP firmware online update library, supports firmware and SPIFFS file system updates

## Library Info
- **Name**: @aily-project/lib-esp32-httpupdate
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_httpupdate_set_led_pin` | Statement | PIN(input_value), LED_ON(dropdown) | `esp32_httpupdate_set_led_pin(math_number(2), HIGH)` | `httpUpdate.setLedPin(1, HIGH);` |
| `esp32_httpupdate_set_md5` | Statement | MD5(input_value) | `esp32_httpupdate_set_md5(text("value"))` | `httpUpdate.setMD5sum("value");` |
| `esp32_httpupdate_set_auth` | Statement | USER(input_value), PASSWORD(input_value) | `esp32_httpupdate_set_auth(text("value"), text("value"))` | `httpUpdate.setAuthorization("value", "value");` |
| `esp32_httpupdate_update` | Statement | URL(input_value) | `esp32_httpupdate_update(text("value"))` | `NetworkClient httpUpdateClient; ↵ t_httpUpdate_return ret = httpUpdate.update(httpUpdateClient, "value");` |
| `esp32_httpupdate_update_spiffs` | Statement | URL(input_value) | `esp32_httpupdate_update_spiffs(text("value"))` | `NetworkClient httpUpdateClient; ↵ t_httpUpdate_return ret = httpUpdate.updateSpiffs(httpUpdateClient, "value");` |
| `esp32_httpupdate_update_secure` | Statement | URL(input_value), CA_CERT(input_value), USER(input_value), PASSWORD(input_value) | `esp32_httpupdate_update_secure(text("value"), text("value"), text("value"), text("value"))` | `WiFiClientSecure httpUpdateClient; ↵ httpUpdateClient.setCACert("value"); ↵ httpUpdateClient.setTimeout(12000); ↵ t_httpUpdate_return ret = httpUpdate.update(httpUpdateClient, "value", "", [](HTTPClient *httpUpdateClient) {httpUpdateClient->setAuthorization("value", "value");});` |
| `esp32_httpupdate_update_spiffs_secure` | Statement | URL(input_value), CA_CERT(input_value), USER(input_value), PASSWORD(input_value) | `esp32_httpupdate_update_spiffs_secure(text("value"), text("value"), text("value"), text("value"))` | `WiFiClientSecure httpUpdateClient; ↵ httpUpdateClient.setCACert("value"); ↵ httpUpdateClient.setTimeout(12000); ↵ t_httpUpdate_return ret = httpUpdate.updateSpiffs(httpUpdateClient, "value", "", [](HTTPClient *httpUpdateClient) {httpUpdateClient->setAuthorization("value", "value");});` |
| `esp32_httpupdate_on_start` | Hat | HANDLER(input_statement) | `esp32_httpupdate_on_start()` | `void httpupdate_start_httpUpdate() { ↵ } ↵ httpUpdate.onStart(httpupdate_start_httpUpdate);` |
| `esp32_httpupdate_on_end` | Hat | HANDLER(input_statement) | `esp32_httpupdate_on_end()` | `void httpupdate_end_httpUpdate() { ↵ } ↵ httpUpdate.onEnd(httpupdate_end_httpUpdate);` |
| `esp32_httpupdate_on_progress` | Hat | HANDLER(input_statement) | `esp32_httpupdate_on_progress()` | `void httpupdate_progress_httpUpdate(int cur, int total) { ↵ } ↵ httpUpdate.onProgress(httpupdate_progress_httpUpdate);` |
| `esp32_httpupdate_on_error` | Hat | HANDLER(input_statement) | `esp32_httpupdate_on_error()` | `void httpupdate_error_httpUpdate(int err) { ↵ } ↵ httpUpdate.onError(httpupdate_error_httpUpdate);` |
| `esp32_httpupdate_get_last_error` | Value | (none) | `esp32_httpupdate_get_last_error()` | `httpUpdate.getLastError()` |
| `esp32_httpupdate_get_last_error_string` | Value | (none) | `esp32_httpupdate_get_last_error_string()` | `httpUpdate.getLastErrorString()` |
| `esp32_httpupdate_result` | Value | (none) | `esp32_httpupdate_result()` | `ret` |
| `esp32_httpupdate_result_list` | Value | CODE(dropdown) | `esp32_httpupdate_result_list(HTTP_UPDATE_FAILED)` | `HTTP_UPDATE_FAILED` |
| `esp32_httpupdate_process_current` | Value | (none) | `esp32_httpupdate_process_current()` | `cur` |
| `esp32_httpupdate_process_total` | Value | (none) | `esp32_httpupdate_process_total()` | `total` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| LED_ON | HIGH, LOW | esp32_httpupdate_set_led_pin |
| CODE | HTTP_UPDATE_FAILED, HTTP_UPDATE_NO_UPDATES, HTTP_UPDATE_OK | esp32_httpupdate_result_list |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_httpupdate_set_led_pin(math_number(2), HIGH)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_httpupdate_get_last_error())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
