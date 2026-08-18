# ThingsBoard

ThingsBoard MQTT telemetry, attributes, JSON payloads, and connection management.

## Library Info
- **Name**: @aily-project/lib-thingsboard
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `thingsboard_init` | Statement | VAR(field_input), SERVER(input_value), TOKEN(input_value), PORT(input_value), SIZE(input_value) | `thingsboard_init("tb", text("value"), text("value"), math_number(0), math_number(0))` | `tb.connect("value", "value", 1);` |
| `thingsboard_connect` | Value | VAR(field_variable), SERVER(input_value), TOKEN(input_value), PORT(input_value) | `thingsboard_connect($tb, text("value"), text("value"), math_number(0))` | `tb.connect("value", "value", 1)` |
| `thingsboard_send` | Value | VAR(field_variable), KIND(dropdown), KEY(input_value), VALUE(input_value) | `thingsboard_send($tb, sendTelemetryData, text("value"), math_number(0))` | `tb.sendTelemetryData(String("value").c_str(), 1)` |
| `thingsboard_send_json` | Value | VAR(field_variable), KIND(dropdown), JSON(input_value) | `thingsboard_send_json($tb, sendTelemetryString, text("value"))` | `tb.sendTelemetryString(String("value").c_str())` |
| `thingsboard_connected` | Value | VAR(field_variable) | `thingsboard_connected($tb)` | `tb.connected()` |
| `thingsboard_disconnect` | Statement | VAR(field_variable) | `thingsboard_disconnect($tb)` | `tb.disconnect();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| KIND | sendTelemetryData, sendAttributeData | thingsboard_send |
| KIND | sendTelemetryString, sendAttributeString | thingsboard_send_json |

## ABS Examples

### Basic Usage
```
arduino_setup()
    thingsboard_init("tb", text("value"), text("value"), math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, thingsboard_connect($tb, text("value"), text("value"), math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `thingsboard_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
