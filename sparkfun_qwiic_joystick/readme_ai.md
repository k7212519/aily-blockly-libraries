# SparkFun Qwiic Joystick

Blockly wrapper for SparkFun Qwiic Joystick (X/Y axis + button via I2C).

## Library Info
- **Name**: @aily-project/lib-sparkfun-qwiic-joystick
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `qwiic_joystick_init` | Statement | VAR(field_input) | `qwiic_joystick_init("joystick")` | `joystick.begin();` |
| `qwiic_joystick_get_horizontal` | Value | VAR(field_variable) | `qwiic_joystick_get_horizontal($joystick)` | `joystick.getHorizontal()` |
| `qwiic_joystick_get_vertical` | Value | VAR(field_variable) | `qwiic_joystick_get_vertical($joystick)` | `joystick.getVertical()` |
| `qwiic_joystick_get_button` | Value | VAR(field_variable) | `qwiic_joystick_get_button($joystick)` | `joystick.checkButton()` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    qwiic_joystick_init("joystick")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, qwiic_joystick_get_horizontal($joystick))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `qwiic_joystick_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
