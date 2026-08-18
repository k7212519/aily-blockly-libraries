# SparkFun Micro OLED Display

Blockly wrapper for the SparkFun Micro OLED 64x48 I2C display.

## Library Info
- **Name**: @aily-project/lib-sparkfun-micro-oled
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `micro_oled_init` | Statement | VAR(field_input), RST_PIN(field_number), DC_PIN(field_number) | `micro_oled_init("oled", 9, 1)` | `Wire.begin(); ↵ oled.begin(); ↵ oled.clear(ALL); ↵ oled.display();` |
| `micro_oled_clear` | Statement | VAR(field_variable), MODE(dropdown) | `micro_oled_clear($oled, ALL)` | `oled.clear(ALL);` |
| `micro_oled_display` | Statement | VAR(field_variable) | `micro_oled_display($oled)` | `oled.display();` |
| `micro_oled_set_cursor` | Statement | VAR(field_variable), X(input_value), Y(input_value) | `micro_oled_set_cursor($oled, math_number(0), math_number(0))` | `oled.setCursor(1, 1);` |
| `micro_oled_print` | Statement | VAR(field_variable), TEXT(input_value) | `micro_oled_print($oled, text("value"))` | `oled.print(1);` |
| `micro_oled_set_font` | Statement | VAR(field_variable), FONT(dropdown) | `micro_oled_set_font($oled, "0")` | `oled.setFontType(0);` |
| `micro_oled_pixel` | Statement | VAR(field_variable), X(input_value), Y(input_value) | `micro_oled_pixel($oled, math_number(0), math_number(0))` | `oled.pixel(1, 1);` |
| `micro_oled_line` | Statement | VAR(field_variable), X0(input_value), Y0(input_value), X1(input_value), Y1(input_value) | `micro_oled_line($oled, math_number(0), math_number(0), math_number(0), math_number(0))` | `oled.line(1, 1, 1, 1);` |
| `micro_oled_rect` | Statement | VAR(field_variable), X(input_value), Y(input_value), W(input_value), H(input_value), FILL(dropdown) | `micro_oled_rect($oled, math_number(0), math_number(0), math_number(0), math_number(0), "0")` | `oled.rect(1, 1, 1, 1);` |
| `micro_oled_circle` | Statement | VAR(field_variable), X(input_value), Y(input_value), R(input_value), FILL(dropdown) | `micro_oled_circle($oled, math_number(0), math_number(0), math_number(0), "0")` | `oled.circle(1, 1, 1);` |
| `micro_oled_invert` | Statement | VAR(field_variable), INV(dropdown) | `micro_oled_invert($oled, true)` | `oled.invert(true);` |
| `micro_oled_contrast` | Statement | VAR(field_variable), CONTRAST(input_value) | `micro_oled_contrast($oled, math_number(0))` | `oled.contrast(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | ALL, PAGE | micro_oled_clear |
| FONT | 0, 1, 2, 3 | micro_oled_set_font |
| FILL | 0, 1 | micro_oled_rect, micro_oled_circle |
| INV | true, false | micro_oled_invert |

## ABS Examples

### Basic Usage
```
arduino_setup()
    micro_oled_init("oled", 9, 1)
    serial_begin(Serial, 9600)

arduino_loop()
    micro_oled_clear($oled, ALL)
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `micro_oled_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
