# loop control

Core library for loop control

## Library Info
- **Name**: @aily-project/lib-core-loop
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `arduino_setup` | Hat | ARDUINO_SETUP(input_statement) | `arduino_setup()` | `setup() { ↵ }` |
| `arduino_loop` | Hat | ARDUINO_LOOP(input_statement) | `arduino_loop()` | `loop() { ↵ }` |
| `arduino_global` | Hat | ARDUINO_GLOBAL(input_statement) | `arduino_global()` | `No direct code emitted when the GLOBAL statement input is empty.` |
| `controls_repeat_ext` | Statement | TIMES(input_value), DO(input_statement) | `controls_repeat_ext(math_number(1000))` | `for (int count = 0; count < 1; count++) { ↵ }` |
| `controls_repeat` | Statement | TIMES(field_number), DO(input_statement) | `controls_repeat(10)` | `for (int count = 0; count < 10; count++) { ↵ }` |
| `controls_whileUntil` | Statement | MODE(dropdown), BOOL(input_value), DO(input_statement) | `controls_whileUntil(WHILE, logic_boolean(TRUE))` | `while (true) { ↵ }` |
| `controls_for` | Statement | VAR(field_variable), FROM(input_value), TO(input_value), BY(input_value), DO(input_statement) | `controls_for($var, math_number(0), math_number(0), math_number(0))` | `for (int item = 1; item < 1; item++) { ↵ }` |
| `controls_flow_statements` | Statement | FLOW(dropdown) | `controls_flow_statements(BREAK)` | `break;` |
| `controls_whileForever` | Statement | DO(input_statement) | `controls_whileForever()` | `while (1) { ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | WHILE, UNTIL | controls_whileUntil |
| FLOW | BREAK, CONTINUE | controls_flow_statements |

## ABS Examples

### Basic Usage
```
arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, text("loop"))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **UI-only extensions**: `controls_whileUntil` and `controls_for` attach tooltips/context-menu behavior only; their ABS signatures stay static.
