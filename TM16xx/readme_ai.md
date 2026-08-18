# TM16xx digital tube display library

TM16xx series chip driver library supports TM1637, TM1638, TM1640, TM1650, TM1668 and other digital tube display modules

## Library Info
- **Name**: @aily-project/lib-tm16xx
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tm16xx_init` | Statement | CHIP_TYPE(dropdown), DIO_PIN(dropdown), CLK_PIN(dropdown), STB_PIN(dropdown), DIGITS(field_number) | `tm16xx_init(TM1637, DIO_PIN, CLK_PIN, STB_PIN, 8)` | `TM1637 tm16xx_module(DIO_PIN, CLK_PIN); ↵ tm16xx_module.setupDisplay(true, 7);` |
| `tm16xx_simple_init` | Statement | CHIP_TYPE(dropdown), DIO_PIN(dropdown), CLK_PIN(dropdown) | `tm16xx_simple_init(TM1637, DIO_PIN, CLK_PIN)` | `TM1637 tm16xx_module(DIO_PIN, CLK_PIN); ↵ tm16xx_module.setupDisplay(true, 7);` |
| `tm16xx_display_string` | Statement | TEXT(input_value) | `tm16xx_display_string(text("value"))` | `tm16xx_module.setDisplayToString("value");` |
| `tm16xx_display_number` | Statement | NUMBER(input_value), DOT_POSITION(dropdown) | `tm16xx_display_number(math_number(0), "0")` | `tm16xx_module.setDisplayToDecNumber(1);` |
| `tm16xx_clear_display` | Statement | (none) | `tm16xx_clear_display()` | `tm16xx_module.clearDisplay();` |
| `tm16xx_set_brightness` | Statement | BRIGHTNESS(dropdown) | `tm16xx_set_brightness("0")` | `tm16xx_module.setupDisplay(true, 0);` |
| `tm16xx_set_segment` | Statement | POSITION(field_number), SEGMENTS(input_value) | `tm16xx_set_segment(0, math_number(0))` | `tm16xx_module.setSegments(1, 0);` |
| `tm16xx_get_buttons` | Value | (none) | `tm16xx_get_buttons()` | `tm16xx_module.getButtons()` |
| `tm16xx_is_button_pressed` | Value | BUTTON(field_number) | `tm16xx_is_button_pressed(1)` | `(tm16xx_module.getButtons() & 1) != 0` |
| `tm16xx_display_time` | Statement | HOUR(input_value), MINUTE(input_value), SHOW_COLON(field_checkbox) | `tm16xx_display_time(math_number(0), math_number(0), TRUE)` | `int tm16xx_time = (1) * 100 + (1); ↵ tm16xx_module.setDisplayToDecNumber(tm16xx_time, _BV(4));` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CHIP_TYPE | TM1637, TM1638, TM1640, TM1650, TM1668 | tm16xx_init |
| CHIP_TYPE | TM1637, TM1640, TM1650 | tm16xx_simple_init |
| DOT_POSITION | 0, 1, 2, 3, 4, 5, 6, 7, 8 | tm16xx_display_number |
| BRIGHTNESS | 0, 1, 2, 3, 4, 5, 6, 7 | tm16xx_set_brightness |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tm16xx_init(TM1637, DIO_PIN, CLK_PIN, STB_PIN, 8)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tm16xx_get_buttons())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **Conditional presentation**: `tm16xx_init` may hide `STB_PIN` for chip types that do not use it, but `STB_PIN` remains the third positional ABS argument for a stable signature.
