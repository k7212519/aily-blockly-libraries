# SparkFun Qwiic Twist RGB Rotary Encoder

Blockly wrapper for SparkFun Qwiic Twist RGB rotary encoder.

## Library Info
- **Name**: @aily-project/lib-sparkfun-qwiic-twist
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `qwiic_twist_init` | Statement | VAR(field_input) | `qwiic_twist_init("twist")` | `twist.begin();` |
| `qwiic_twist_get_count` | Value | VAR(field_variable) | `qwiic_twist_get_count($twist)` | `twist.getCount()` |
| `qwiic_twist_set_count` | Statement | VAR(field_variable), COUNT(input_value) | `qwiic_twist_set_count($twist, math_number(0))` | `twist.setCount(1);` |
| `qwiic_twist_is_moved` | Value | VAR(field_variable) | `qwiic_twist_is_moved($twist)` | `twist.isMoved()` |
| `qwiic_twist_is_clicked` | Value | VAR(field_variable) | `qwiic_twist_is_clicked($twist)` | `twist.isClicked()` |
| `qwiic_twist_is_pressed` | Value | VAR(field_variable) | `qwiic_twist_is_pressed($twist)` | `twist.isPressed()` |
| `qwiic_twist_set_color` | Statement | VAR(field_variable), RED(input_value), GREEN(input_value), BLUE(input_value) | `qwiic_twist_set_color($twist, math_number(0), math_number(0), math_number(0))` | `twist.setColor(1, 1, 1);` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    qwiic_twist_init("twist")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, qwiic_twist_get_count($twist))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `qwiic_twist_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
