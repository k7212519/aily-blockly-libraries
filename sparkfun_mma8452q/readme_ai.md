# SparkFun MMA8452Q Accelerometer

Blockly wrapper for the SparkFun MMA8452Q 3-axis I2C accelerometer.

## Library Info
- **Name**: @aily-project/lib-sparkfun-mma8452q
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mma8452q_init` | Statement | VAR(field_input), SCALE(dropdown) | `mma8452q_init("accel", SCALE_2G)` | `Wire.begin(); ↵ accel.begin(); ↵ accel.init(SCALE_2G);` |
| `mma8452q_available` | Value | VAR(field_variable) | `mma8452q_available($accel)` | `accel.available()` |
| `mma8452q_read` | Statement | VAR(field_variable) | `mma8452q_read($accel)` | `accel.read();` |
| `mma8452q_get_axis_raw` | Value | VAR(field_variable), AXIS(dropdown) | `mma8452q_get_axis_raw($accel, X)` | `accel.getX()` |
| `mma8452q_get_axis_g` | Value | VAR(field_variable), AXIS(dropdown) | `mma8452q_get_axis_g($accel, X)` | `accel.getCalculatedX()` |
| `mma8452q_set_scale` | Statement | VAR(field_variable), SCALE(dropdown) | `mma8452q_set_scale($accel, SCALE_2G)` | `accel.setScale(SCALE_2G);` |
| `mma8452q_set_odr` | Statement | VAR(field_variable), ODR(dropdown) | `mma8452q_set_odr($accel, ODR_800)` | `accel.setDataRate(ODR_800);` |
| `mma8452q_read_pl` | Value | VAR(field_variable) | `mma8452q_read_pl($accel)` | `accel.readPL()` |
| `mma8452q_orientation` | Value | VAR(field_variable), ORIENT(dropdown) | `mma8452q_orientation($accel, isRight)` | `accel.isRight()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SCALE | SCALE_2G, SCALE_4G, SCALE_8G | mma8452q_init, mma8452q_set_scale |
| AXIS | X, Y, Z | mma8452q_get_axis_raw, mma8452q_get_axis_g |
| ODR | ODR_800, ODR_400, ODR_200, ODR_100, ODR_50, ODR_12, ODR_6, ODR_1 | mma8452q_set_odr |
| ORIENT | isRight, isLeft, isUp, isDown, isFlat | mma8452q_orientation |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mma8452q_init("accel", SCALE_2G)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mma8452q_available($accel))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `mma8452q_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
