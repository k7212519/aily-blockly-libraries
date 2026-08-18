# LCD display (I2C)

LCD1602/2004 I2C display control support library supports Arduino UNO, MEGA, ESP8266, ESP32 and other development boards

## Library Info
- **Name**: @aily-project/lib-liquidcrystal-i2c
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `lcd_i2c_init` | Statement | ADDRESS(dropdown), COLS(field_number), ROWS(field_number) | `lcd_i2c_init("0x27", 16, 2)` | `lcd.init(); ↵ lcd.backlight();` |
| `lcd_i2c_clear` | Statement | (none) | `lcd_i2c_clear()` | `lcd.clear();` |
| `lcd_i2c_set_cursor` | Statement | COL(input_value), ROW(input_value) | `lcd_i2c_set_cursor(math_number(0), math_number(0))` | `lcd.setCursor(1, 1);` |
| `lcd_i2c_print` | Statement | TEXT(input_value) | `lcd_i2c_print(text("value"))` | `lcd.print(1);` |
| `lcd_i2c_print_position` | Statement | COL(input_value), ROW(input_value), TEXT(input_value) | `lcd_i2c_print_position(math_number(0), math_number(0), text("value"))` | `lcd.setCursor(1, 1); ↵ lcd.print(1);` |
| `lcd_i2c_backlight_on` | Statement | (none) | `lcd_i2c_backlight_on()` | `lcd.backlight();` |
| `lcd_i2c_backlight_off` | Statement | (none) | `lcd_i2c_backlight_off()` | `lcd.noBacklight();` |
| `lcd_i2c_custom_char` | Value | CUSTOM_CHAR(field_bitmap), CHAR_INDEX(dropdown) | `lcd_i2c_custom_char([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], 0)` | `0` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x27, 0x26, 0x25, 0x24, 0x23, 0x22, 0x21, 0x20 | lcd_i2c_init |
| CHAR_INDEX | 0, 1, 2, 3, 4, 5, 6, 7 | lcd_i2c_custom_char |

## ABS Examples

### Basic Usage
```
arduino_setup()
    lcd_i2c_init("0x27", 16, 2)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, lcd_i2c_custom_char([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], 0))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
