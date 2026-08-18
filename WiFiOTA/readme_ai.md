# WiFi OTA

Based on arduinoOTA

## Library Info
- **Name**: @aily-project/lib-arduinoota
- **Version**: 1.1.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `arduinoota_config_auto` | Statement | (none) | `arduinoota_config_auto()` | `ArduinoOTA.onStart(arduinoota_on_start_dispatch); ↵ ArduinoOTA.beforeApply(arduinoota_before_apply_dispatch); ↵ ArduinoOTA.onError(arduinoota_on_error_dispatch); ↵ ArduinoOTA.begin(WiFi.localIP(), arduinoota_to_cstr(""), arduinoota_to_cstr("password"), InternalStorage);` |
| `arduinoota_begin` | Statement | NAME(input_value), PASSWORD(input_value) | `arduinoota_begin(text("value"), text("value"))` | `ArduinoOTA.onStart(arduinoota_on_start_dispatch); ↵ ArduinoOTA.beforeApply(arduinoota_before_apply_dispatch); ↵ ArduinoOTA.onError(arduinoota_on_error_dispatch); ↵ ArduinoOTA.begin(WiFi.localIP(), arduinoota_to_cstr("value"), arduinoota_to_cstr("value"), InternalStorage);` |
| `arduinoota_begin_advanced` | Statement | NETWORK(dropdown), STORAGE(dropdown), DISCOVERY(dropdown), NAME(input_value), PASSWORD(input_value) | `arduinoota_begin_advanced(WIFI_AUTO, InternalStorage, MDNS, text("value"), text("value"))` | `ArduinoOTA.onStart(arduinoota_on_start_dispatch); ↵ ArduinoOTA.beforeApply(arduinoota_before_apply_dispatch); ↵ ArduinoOTA.onError(arduinoota_on_error_dispatch); ↵ ArduinoOTA.begin(WiFi.localIP(), arduinoota_to_cstr("value"), arduinoota_to_cstr("value"), InternalStorage);` |
| `arduinoota_poll` | Statement | (none) | `arduinoota_poll()` | `ArduinoOTA.poll();` |
| `arduinoota_handle` | Statement | (none) | `arduinoota_handle()` | `ArduinoOTA.handle();` |
| `arduinoota_end` | Statement | (none) | `arduinoota_end()` | `ArduinoOTA.end();` |
| `arduinoota_on_start` | Hat | HANDLER(input_statement) | `arduinoota_on_start()` | `typedef void (*ArduinoOTAUserStartCallback)(); ↵ typedef void (*ArduinoOTAUserBeforeApplyCallback)(); ↵ typedef void (*ArduinoOTAUserErrorCallback)(int code, const char* message); ↵ ArduinoOTAUserStartCallback arduinoota_user_on_start = nullptr; ↵ ArduinoOTAUserBeforeApplyCallback arduinoota_user_before_apply = nullptr; ↵ ArduinoOTAUserErrorCallback arduinoota_user_on_error = nullptr; ↵ void arduinoota_user_on_start_callback() { ↵ } ↵ arduinoota_user_on_start = arduinoota_user_on_start_callback;` |
| `arduinoota_before_apply` | Hat | HANDLER(input_statement) | `arduinoota_before_apply()` | `typedef void (*ArduinoOTAUserStartCallback)(); ↵ typedef void (*ArduinoOTAUserBeforeApplyCallback)(); ↵ typedef void (*ArduinoOTAUserErrorCallback)(int code, const char* message); ↵ ArduinoOTAUserStartCallback arduinoota_user_on_start = nullptr; ↵ ArduinoOTAUserBeforeApplyCallback arduinoota_user_before_apply = nullptr; ↵ ArduinoOTAUserErrorCallback arduinoota_user_on_error = nullptr; ↵ void arduinoota_user_before_apply_callback() { ↵ } ↵ arduinoota_user_before_apply = arduinoota_user_before_apply_callback;` |
| `arduinoota_on_error` | Hat | CODE_VAR(field_input), MESSAGE_VAR(field_input), HANDLER(input_statement) | `arduinoota_on_error("code", "message")` | `typedef void (*ArduinoOTAUserStartCallback)(); ↵ typedef void (*ArduinoOTAUserBeforeApplyCallback)(); ↵ typedef void (*ArduinoOTAUserErrorCallback)(int code, const char* message); ↵ ArduinoOTAUserStartCallback arduinoota_user_on_start = nullptr; ↵ ArduinoOTAUserBeforeApplyCallback arduinoota_user_before_apply = nullptr; ↵ ArduinoOTAUserErrorCallback arduinoota_user_on_error = nullptr; ↵ void arduinoota_user_on_error_callback(int code, const char* message) { ↵ } ↵ arduinoota_user_on_error = arduinoota_user_on_error_callback;` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| NETWORK | WIFI_AUTO, WIFI_NINA, WIFI101, WIFI_S3, WIFI_ESP_AT, ETHERNET, ETHERNET_ENC | arduinoota_begin_advanced |
| STORAGE | InternalStorage, SDStorage | arduinoota_begin_advanced |
| DISCOVERY | MDNS, NO_PORT | arduinoota_begin_advanced |

## ABS Examples

### Basic Usage
```
arduino_setup()
    arduinoota_config_auto()

arduino_loop()
    arduinoota_begin(text("value"), text("value"))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
