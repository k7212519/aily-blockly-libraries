# TCA8418 keyboard matrix

TCA8418 I2C keyboard matrix and GPIO expander driver library, supports keyboard matrix scanning and GPIO control

## Library Info
- **Name**: @aily-project/lib-adafruit-tca8418
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tca8418_create` | Statement | VAR(field_input) | `tca8418_create("keypad")` | `Adafruit_TCA8418 keypad;` |
| `tca8418_begin` | Statement | VAR(field_variable), ADDRESS(input_value) | `tca8418_begin($keypad, math_number(0))` | `if (!keypad.begin(0x1, &Wire)) { ↵ Serial.println("keypad not found, check wiring & pullups!"); ↵ while (1); ↵ }` |
| `tca8418_matrix` | Statement | VAR(field_variable), ROWS(input_value), COLUMNS(input_value) | `tca8418_matrix($keypad, math_number(0), math_number(0))` | `keypad.matrix(1, 1);` |
| `tca8418_available` | Value | VAR(field_variable) | `tca8418_available($keypad)` | `keypad.available()` |
| `tca8418_get_event` | Value | VAR(field_variable) | `tca8418_get_event($keypad)` | `keypad.getEvent()` |
| `tca8418_flush` | Statement | VAR(field_variable) | `tca8418_flush($keypad)` | `keypad.flush();` |
| `tca8418_pin_mode` | Statement | VAR(field_variable), PIN(input_value), MODE(dropdown) | `tca8418_pin_mode($keypad, math_number(2), INPUT)` | `keypad.pinMode(1, INPUT);` |
| `tca8418_digital_read` | Value | VAR(field_variable), PIN(input_value) | `tca8418_digital_read($keypad, math_number(2))` | `keypad.digitalRead(1)` |
| `tca8418_digital_write` | Statement | VAR(field_variable), PIN(input_value), LEVEL(dropdown) | `tca8418_digital_write($keypad, math_number(2), HIGH)` | `keypad.digitalWrite(1, HIGH);` |
| `tca8418_enable_interrupts` | Statement | VAR(field_variable) | `tca8418_enable_interrupts($keypad)` | `keypad.enableInterrupts();` |
| `tca8418_disable_interrupts` | Statement | VAR(field_variable) | `tca8418_disable_interrupts($keypad)` | `keypad.disableInterrupts();` |
| `tca8418_enable_debounce` | Statement | VAR(field_variable) | `tca8418_enable_debounce($keypad)` | `keypad.enableDebounce();` |
| `tca8418_disable_debounce` | Statement | VAR(field_variable) | `tca8418_disable_debounce($keypad)` | `keypad.disableDebounce();` |
| `tca8418_when_key_event` | Hat | VAR(field_variable), HANDLER(input_statement) | `tca8418_when_key_event($keypad)` | `uint8_t _keypad_current_event = 0; ↵ if (keypad.available() > 0) { ↵ _keypad_current_event = keypad.getEvent(); ↵ }` |
| `tca8418_current_event` | Value | VAR(field_variable) | `tca8418_current_event($keypad)` | `_keypad_current_event` |
| `tca8418_get_event_row` | Value | EVENT(input_value) | `tca8418_get_event_row(math_number(0))` | `(((1 & 0x7F) - 1) / 10)` |
| `tca8418_get_event_col` | Value | EVENT(input_value) | `tca8418_get_event_col(math_number(0))` | `(((1 & 0x7F) - 1) % 10)` |
| `tca8418_get_event_pressed` | Value | EVENT(input_value) | `tca8418_get_event_pressed(math_number(0))` | `(!(1 & 0x80))` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | INPUT, OUTPUT, INPUT_PULLUP | tca8418_pin_mode |
| LEVEL | HIGH, LOW | tca8418_digital_write |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tca8418_create("keypad")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tca8418_available($keypad))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `tca8418_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
