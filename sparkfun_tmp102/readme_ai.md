# SparkFun TMP102 Temperature Sensor

Blockly wrapper for the SparkFun TMP102 I2C digital temperature sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-tmp102
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tmp102_init` | Statement | VAR(field_input), ADDR(dropdown) | `tmp102_init("tmp", "0x48")` | `Wire.begin(); ↵ tmp.begin(0x48);` |
| `tmp102_read_temp_c` | Value | VAR(field_variable) | `tmp102_read_temp_c($tmp)` | `tmp.readTempC()` |
| `tmp102_read_temp_f` | Value | VAR(field_variable) | `tmp102_read_temp_f($tmp)` | `tmp.readTempF()` |
| `tmp102_sleep` | Statement | VAR(field_variable) | `tmp102_sleep($tmp)` | `tmp.sleep();` |
| `tmp102_wakeup` | Statement | VAR(field_variable) | `tmp102_wakeup($tmp)` | `tmp.wakeup();` |
| `tmp102_alert` | Value | VAR(field_variable) | `tmp102_alert($tmp)` | `tmp.alert()` |
| `tmp102_set_high_temp_c` | Statement | VAR(field_variable), TEMP(input_value) | `tmp102_set_high_temp_c($tmp, math_number(0))` | `tmp.setHighTempC(1);` |
| `tmp102_set_low_temp_c` | Statement | VAR(field_variable), TEMP(input_value) | `tmp102_set_low_temp_c($tmp, math_number(0))` | `tmp.setLowTempC(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDR | 0x48, 0x49, 0x4A, 0x4B | tmp102_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tmp102_init("tmp", "0x48")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tmp102_read_temp_c($tmp))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `tmp102_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
