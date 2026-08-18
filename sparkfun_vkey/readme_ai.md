# SparkFun VKey Voltage Keypad

Blockly wrapper for the SparkFun VKey voltage-based analog keypad.

## Library Info
- **Name**: @aily-project/lib-sparkfun-vkey
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `vkey_init` | Statement | VAR(field_input), PIN(input_value) | `vkey_init("keypad", math_number(2))` | `VKey keypad(1);` |
| `vkey_read_key` | Value | VAR(field_variable) | `vkey_read_key($keypad)` | `keypad.getKey()` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    vkey_init("keypad", math_number(2))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, vkey_read_key($keypad))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `vkey_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
