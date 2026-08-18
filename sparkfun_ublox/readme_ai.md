# SparkFun uBlox GNSS Module

Blockly wrapper for the SparkFun uBlox GNSS GPS module over I2C.

## Library Info
- **Name**: @aily-project/lib-sparkfun-ublox
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ublox_init` | Statement | VAR(field_input) | `ublox_init("gps")` | `Wire.begin(); ↵ gps.begin();` |
| `ublox_get_pvt` | Value | VAR(field_variable) | `ublox_get_pvt($gps)` | `gps.getPVT()` |
| `ublox_get_latitude` | Value | VAR(field_variable) | `ublox_get_latitude($gps)` | `gps.getLatitude()` |
| `ublox_get_longitude` | Value | VAR(field_variable) | `ublox_get_longitude($gps)` | `gps.getLongitude()` |
| `ublox_get_altitude` | Value | VAR(field_variable) | `ublox_get_altitude($gps)` | `gps.getAltitude()` |
| `ublox_get_siv` | Value | VAR(field_variable) | `ublox_get_siv($gps)` | `gps.getSIV()` |
| `ublox_get_fix_type` | Value | VAR(field_variable) | `ublox_get_fix_type($gps)` | `gps.getFixType()` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ublox_init("gps")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ublox_get_pvt($gps))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ublox_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
