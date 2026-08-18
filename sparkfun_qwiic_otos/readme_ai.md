# SparkFun Qwiic OTOS Optical Tracking

Blockly wrapper for SparkFun Qwiic OTOS optical tracking odometer sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-qwiic-otos
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `qwiic_otos_init` | Statement | VAR(field_input) | `qwiic_otos_init("otos")` | `otos.begin();` |
| `qwiic_otos_calibrate_imu` | Statement | VAR(field_variable) | `qwiic_otos_calibrate_imu($otos)` | `otos.calibrateImu();` |
| `qwiic_otos_reset_tracking` | Statement | VAR(field_variable) | `qwiic_otos_reset_tracking($otos)` | `otos.resetTracking();` |
| `qwiic_otos_get_pos_x` | Value | VAR(field_variable) | `qwiic_otos_get_pos_x($otos)` | `([&](){ otos.getPosition(_otos_pos_otos); return _otos_pos_otos.x; })()` |
| `qwiic_otos_get_pos_y` | Value | VAR(field_variable) | `qwiic_otos_get_pos_y($otos)` | `([&](){ otos.getPosition(_otos_pos_otos); return _otos_pos_otos.y; })()` |
| `qwiic_otos_get_heading` | Value | VAR(field_variable) | `qwiic_otos_get_heading($otos)` | `([&](){ otos.getPosition(_otos_pos_otos); return _otos_pos_otos.h; })()` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    qwiic_otos_init("otos")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, qwiic_otos_get_pos_x($otos))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `qwiic_otos_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
