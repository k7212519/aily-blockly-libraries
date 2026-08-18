# SparkFun MAG3110 3-Axis Magnetometer

Blockly wrapper for SparkFun MAG3110 3-axis magnetometer.

## Library Info
- **Name**: @aily-project/lib-sparkfun-mag3110
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mag3110_init` | Statement | VAR(field_input) | `mag3110_init("mag")` | `Wire.begin(); ↵ mag.initialize();` |
| `mag3110_start` | Statement | VAR(field_variable) | `mag3110_start($mag)` | `mag.start();` |
| `mag3110_data_ready` | Value | VAR(field_variable) | `mag3110_data_ready($mag)` | `mag.dataReady()` |
| `mag3110_read_axis` | Value | VAR(field_variable), AXIS(dropdown) | `mag3110_read_axis($mag, X)` | `(mag3110ReadMag_mag(), mag3110_x_mag)` |
| `mag3110_read_heading` | Value | VAR(field_variable) | `mag3110_read_heading($mag)` | `mag.readHeading()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| AXIS | X, Y, Z | mag3110_read_axis |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mag3110_init("mag")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mag3110_data_ready($mag))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `mag3110_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
