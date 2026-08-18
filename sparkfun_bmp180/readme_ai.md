# SparkFun BMP180 pressure sensor

Blockly wrapper for SparkFun BMP180 pressure and temperature sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-bmp180
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bmp180_init` | Statement | VAR(field_input) | `bmp180_init("bmp180")` | `bmp180_ready = bmp180.begin();` |
| `bmp180_is_ready` | Value | VAR(field_variable) | `bmp180_is_ready($bmp180)` | `bmp180_ready` |
| `bmp180_read_temperature` | Value | VAR(field_variable) | `bmp180_read_temperature($bmp180)` | `bmp180ReadTemperature(bmp180)` |
| `bmp180_read_pressure` | Value | VAR(field_variable), OVERSAMPLING(dropdown) | `bmp180_read_pressure($bmp180, "0")` | `bmp180ReadPressure(bmp180, 0)` |
| `bmp180_sea_level` | Value | VAR(field_variable), PRESSURE(input_value), ALTITUDE(input_value) | `bmp180_sea_level($bmp180, math_number(0), math_number(0))` | `bmp180.sealevel(1, 1)` |
| `bmp180_altitude` | Value | VAR(field_variable), PRESSURE(input_value), BASELINE(input_value) | `bmp180_altitude($bmp180, math_number(0), math_number(0))` | `bmp180.altitude(1, 1)` |
| `bmp180_get_error` | Value | VAR(field_variable) | `bmp180_get_error($bmp180)` | `bmp180.getError()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| OVERSAMPLING | 0, 1, 2, 3 | bmp180_read_pressure |

## ABS Examples

### Basic Usage
```
arduino_setup()
    bmp180_init("bmp180")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, bmp180_is_ready($bmp180))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `bmp180_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
