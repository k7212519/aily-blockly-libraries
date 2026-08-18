# SparkFun GridEYE AMG88 Thermal Sensor

Blockly wrapper for the SparkFun GridEYE AMG88 8x8 thermal sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-grideye
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `grideye_init` | Statement | VAR(field_input), ADDRESS(dropdown) | `grideye_init("grideye", "0x69")` | `Wire.begin(); ↵ grideye.begin(0x69);` |
| `grideye_get_pixel_temp` | Value | VAR(field_variable), PIXEL(input_value) | `grideye_get_pixel_temp($grideye, math_number(0))` | `grideye.getPixelTemperature(1)` |
| `grideye_get_device_temp` | Value | VAR(field_variable) | `grideye_get_device_temp($grideye)` | `grideye.getDeviceTemperature()` |
| `grideye_set_framerate` | Statement | VAR(field_variable), RATE(dropdown) | `grideye_set_framerate($grideye, "1")` | `grideye.setFramerate1FPS();` |
| `grideye_power` | Statement | VAR(field_variable), MODE(dropdown) | `grideye_power($grideye, wake)` | `grideye.wake();` |
| `grideye_set_interrupt` | Statement | VAR(field_variable), UPPER(input_value), LOWER(input_value) | `grideye_set_interrupt($grideye, math_number(0), math_number(0))` | `grideye.setUpperInterruptValue(1); ↵ grideye.setLowerInterruptValue(1);` |
| `grideye_moving_avg` | Statement | VAR(field_variable), ENABLE(dropdown) | `grideye_moving_avg($grideye, enable)` | `grideye.movingAverageEnable();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x69, 0x68 | grideye_init |
| RATE | 1, 10 | grideye_set_framerate |
| MODE | wake, sleep | grideye_power |
| ENABLE | enable, disable | grideye_moving_avg |

## ABS Examples

### Basic Usage
```
arduino_setup()
    grideye_init("grideye", "0x69")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, grideye_get_pixel_temp($grideye, math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `grideye_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
