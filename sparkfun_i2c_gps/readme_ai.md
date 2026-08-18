# SparkFun I2C GPS Module

Blockly wrapper for SparkFun I2C GPS library, reads NMEA data over I2C.

## Library Info
- **Name**: @aily-project/lib-sparkfun-i2c-gps
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `i2cgps_init` | Statement | VAR(field_input) | `i2cgps_init("gps")` | `Wire.begin(); ↵ gps.begin();` |
| `i2cgps_available` | Value | VAR(field_variable) | `i2cgps_available($gps)` | `gps.available()` |
| `i2cgps_read` | Value | VAR(field_variable) | `i2cgps_read($gps)` | `gps.read()` |
| `i2cgps_check` | Statement | VAR(field_variable) | `i2cgps_check($gps)` | `gps.check();` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    i2cgps_init("gps")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, i2cgps_available($gps))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `i2cgps_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
