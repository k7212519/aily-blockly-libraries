# Lighting Internet of Things

Blinker IoT control library supports mobile APP control and smart speaker control, uses Bluetooth BLE, MQTT and other communication methods, and is compatible with a variety of development boards

## Library Info
- **Name**: @aily-project/lib-blinker
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `blinker_init_wifi` | Statement | MODE(dropdown); runtime variants: manual-credentials: AUTH(input_value), SSID(input_value), PSWD(input_value); esptouch-v2: (none) | `blinker_init_wifi("手动配网", text("Your Device Secret Key"), text("Your WiFi SSID"), text("Your WiFi Password"))` | `Blinker.begin(1, 1, 1);` |
| `blinker_init_ble` | Statement | (none) | `blinker_init_ble()` | `Blinker.begin();` |
| `blinker_debug_init` | Statement | SERIAL(dropdown), SPEED(dropdown), DEBUG_ALL(dropdown) | `blinker_debug_init(SERIAL, SPEED, true)` | `BLINKER_DEBUG.stream(SERIAL); ↵ BLINKER_DEBUG.debugAll();` |
| `blinker_button` | Hat | KEY(field_input), NAME(input_statement) | `blinker_button("btn-")` | `BlinkerButton Blinker_btn_("btn-"); ↵ void button_btn__callback(const String & state) { ↵ } ↵ Blinker_btn_.attach(button_btn__callback);` |
| `blinker_button_state` | Value | STATE(dropdown) | `blinker_button_state(tap)` | `state == "tap"` |
| `blinker_slider` | Hat | KEY(field_input), NAME(input_statement) | `blinker_slider("ran-")` | `BlinkerSlider Blinker_ran_("ran-"); ↵ void slider_ran__callback(int32_t value) { ↵ } ↵ Blinker_ran_.attach(slider_ran__callback);` |
| `blinker_slider_value` | Value | (none) | `blinker_slider_value()` | `value` |
| `blinker_colorpicker` | Hat | KEY(field_input), NAME(input_statement) | `blinker_colorpicker("col-")` | `BlinkerRGB Blinker_col_("col-"); ↵ void rgb_col__callback(uint8_t r_value, uint8_t g_value, uint8_t b_value, uint8_t bright_value) { ↵ } ↵ Blinker_col_.attach(rgb_col__callback);` |
| `blinker_colorpicker_value` | Value | KEY(dropdown) | `blinker_colorpicker_value(r_value)` | `r_value` |
| `blinker_joystick` | Hat | KEY(field_input), NAME(input_statement) | `blinker_joystick("joy-")` | `BlinkerJoystick Blinker_joy_("joy-"); ↵ void joystick_joy__callback(uint8_t xAxis, uint8_t yAxis) { ↵ } ↵ Blinker_joy_.attach(joystick_joy__callback);` |
| `blinker_joystick_value` | Value | KEY(dropdown) | `blinker_joystick_value(X)` | `xAxis` |
| `blinker_data_handler` | Hat | NAME(input_statement) | `blinker_data_handler()` | `void data_callback(const String & data) { ↵ } ↵ Blinker.attachData(data_callback);` |
| `blinker_heartbeat` | Hat | NAME(input_statement) | `blinker_heartbeat()` | `void heartbeat_callback() { ↵ } ↵ Blinker.attachHeartbeat(heartbeat_callback);` |
| `blinker_chart` | Hat | KEY(field_input), NAME(input_statement) | `blinker_chart("chart-")` | `BlinkerChart Blinker_chart_("chart-"); ↵ void chart_chart__callback() { ↵ } ↵ Blinker_chart_.attach(chart_chart__callback);` |
| `blinker_chart_data_upload` | Statement | CHART(field_input), KEY(field_input), VALUE(input_value) | `blinker_chart_data_upload("chart-", "data-", math_number(0))` | `Blinker_chart_.upload("data-", 1);` |
| `blinker_log` | Statement | TEXT(input_value) | `blinker_log(text("value"))` | `BLINKER_LOG(1);` |
| `blinker_log_args` | Statement | TEXT(input_value), ARGS(input_value) | `blinker_log_args(text("value"), math_number(0))` | `BLINKER_LOG(1, 1);` |
| `blinker_vibrate` | Statement | (none) | `blinker_vibrate()` | `Blinker.vibrate();` |
| `blinker_print` | Statement | TEXT(input_value) | `blinker_print(text("value"))` | `Blinker.print("value");` |
| `blinker_state` | Value | STATE(input_value) | `blinker_state(math_number(0))` | `.state(1)` |
| `blinker_icon` | Value | ICON(input_value) | `blinker_icon(math_number(0))` | `.icon(1)` |
| `blinker_color` | Value | COLOR(input_value) | `blinker_color(math_number(0))` | `.color(1)` |
| `blinker_text` | Value | TEXT(input_value) | `blinker_text(text("value"))` | `.text(1)` |
| `blinker_value` | Value | VALUE(input_value) | `blinker_value(math_number(0))` | `.value(1)` |
| `blinker_reset` | Statement | (none) | `blinker_reset()` | `Blinker.reset();` |
| `blinker_widget_print` | Statement | WIDGET(field_input), INPUT0(input_value); variadic: INPUT{1...}(input_value) | `blinker_widget_print("WIDGET", math_number(0), INPUT1=blinker_state(text("online")))` | `Blinker_value.print();` |
| `blinker_delay` | Statement | DELAY(input_value) | `blinker_delay(math_number(1000))` | `Blinker.delay(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | 手动配网, EspTouchV2 | blinker_init_wifi |
| DEBUG_ALL | true, false | blinker_debug_init |
| STATE | tap, on, off, press, pressup | blinker_button_state |
| KEY | r_value, g_value, b_value, bright_value | blinker_colorpicker_value |
| KEY | X, Y | blinker_joystick_value |

## ABS Examples

### Basic Usage
```
arduino_setup()
    blinker_init_wifi("手动配网", text("Your Device Secret Key"), text("Your WiFi SSID"), text("Your WiFi Password"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, blinker_button_state(tap))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **Runtime shape**: manual WiFi mode adds `AUTH`, `SSID`, and `PSWD`; `EspTouchV2` adds none. `blinker_widget_print` accepts additional values as named indexed inputs `INPUT1`, `INPUT2`, and so on.

## Runtime Variant Examples

### Runtime Variant: blinker_init_wifi/esptouch-v2
```abs
arduino_setup()
    blinker_init_wifi(EspTouchV2)
```
