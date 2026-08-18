# SparkFun TeensyView OLED Display

Blockly wrapper for the SparkFun TeensyView 128x32 SPI OLED display.

## Library Info
- **Name**: @aily-project/lib-sparkfun-teensyview
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `teensyview_init` | Statement | VAR(field_input), RST(input_value), DC(input_value), CS(input_value), SCK(input_value), SDI(input_value) | `teensyview_init("oled", math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `oled.begin(); ↵ oled.clear(ALL);` |
| `teensyview_clear` | Statement | VAR(field_variable) | `teensyview_clear($oled)` | `oled.clear(PAGE);` |
| `teensyview_print` | Statement | VAR(field_variable), X(input_value), Y(input_value), TEXT(input_value) | `teensyview_print($oled, math_number(0), math_number(0), text("value"))` | `oled.setCursor(1, 1); ↵ oled.print(1);` |
| `teensyview_pixel` | Statement | VAR(field_variable), X(input_value), Y(input_value), COLOR(dropdown) | `teensyview_pixel($oled, math_number(0), math_number(0), "1")` | `oled.pixel(1, 1, 1);` |
| `teensyview_display` | Statement | VAR(field_variable) | `teensyview_display($oled)` | `oled.display();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| COLOR | 1, 0 | teensyview_pixel |

## ABS Examples

### Basic Usage
```
arduino_setup()
    teensyview_init("oled", math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    teensyview_clear($oled)
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `teensyview_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
