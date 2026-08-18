# PIR human motion sensor

PIR motion sensor library for detecting human movement

## Library Info
- **Name**: @aily-project/lib-pir
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `grove_pir_init` | Statement | VAR(field_input), PIN(input_value) | `grove_pir_init("pir", math_number(2))` | `pinMode(pir_pin, INPUT);` |
| `grove_pir_read` | Value | VAR(field_variable) | `grove_pir_read($pir)` | `digitalRead(pir_pin)` |
| `grove_pir_motion_detected` | Value | VAR(field_variable) | `grove_pir_motion_detected($pir)` | `digitalRead(pir_pin) == HIGH` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    grove_pir_init("pir", math_number(2))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, grove_pir_read($pir))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `grove_pir_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
