# ElegantOTA

Authenticated OTA web portal for ESP8266, ESP32, RP2040W, and RP2350W.

## Library Info
- **Name**: @aily-project/lib-elegantota
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `elegant_ota_init` | Statement | VAR(field_input), MODE(dropdown), PORT(input_value), USERNAME(input_value), PASSWORD(input_value), REBOOT(field_checkbox) | `elegant_ota_init("otaServer", sync, math_number(0), text("value"), text("value"), TRUE)` | `WebServer otaServer(1); ↵ ElegantOTA.setAutoReboot(true); ↵ ElegantOTA.begin(&otaServer, String("value").c_str(), String("value").c_str()); ↵ otaServer.begin(); ↵ otaServer.handleClient(); ↵ ElegantOTA.loop();` |
| `elegant_ota_auth` | Statement | USERNAME(input_value), PASSWORD(input_value) | `elegant_ota_auth(text("value"), text("value"))` | `ElegantOTA.setAuth(String("value").c_str(), String("value").c_str());` |
| `elegant_ota_on_start` | Statement | DO(input_statement) | `elegant_ota_on_start()` | `ElegantOTA.onStart([]() { ↵ });` |
| `elegant_ota_on_progress` | Statement | DO(input_statement) | `elegant_ota_on_progress()` | `ElegantOTA.onProgress([](size_t _ailyOtaCurrent, size_t _ailyOtaFinal) { ↵ });` |
| `elegant_ota_on_end` | Statement | DO(input_statement) | `elegant_ota_on_end()` | `ElegantOTA.onEnd([](bool _ailyOtaSuccess) { ↵ });` |
| `elegant_ota_callback_value` | Value | VALUE(dropdown) | `elegant_ota_callback_value(_ailyOtaCurrent)` | `_ailyOtaCurrent` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | sync, async | elegant_ota_init |
| VALUE | _ailyOtaCurrent, _ailyOtaFinal, percent, _ailyOtaSuccess | elegant_ota_callback_value |

## ABS Examples

### Basic Usage
```
arduino_setup()
    elegant_ota_init("otaServer", sync, math_number(0), text("value"), text("value"), TRUE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, elegant_ota_callback_value(_ailyOtaCurrent))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `elegant_ota_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
