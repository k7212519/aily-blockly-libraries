# SparkFun SevSeg display

Blockly wrapper for SevSeg seven-segment displays.

## Library Info
- **Name**: @aily-project/lib-sparkfun-sevseg
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `sevseg_init` | Statement | VAR(field_input), MODE(dropdown), DIGITS(input_value), D1(input_value), D2(input_value), D3(input_value), D4(input_value), A(input_value), B(input_value), C(input_value), D(input_value), E(input_value), F(input_value), G(input_value), DP(input_value), BRIGHTNESS(input_value) | `sevseg_init("display", COMMON_CATHODE, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `display.Begin(COMMON_CATHODE, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1); ↵ display.SetBrightness(1);` |
| `sevseg_display_text` | Statement | VAR(field_variable), TEXT(input_value), DECIMAL(input_value) | `sevseg_display_text($display, text("value"), math_number(0))` | `sevsegDisplayText(display, String(1), 1);` |
| `sevseg_set_brightness` | Statement | VAR(field_variable), BRIGHTNESS(input_value) | `sevseg_set_brightness($display, math_number(0))` | `display.SetBrightness(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | COMMON_CATHODE, COMMON_ANODE | sevseg_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    sevseg_init("display", COMMON_CATHODE, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    sevseg_display_text($display, text("value"), math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `sevseg_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
