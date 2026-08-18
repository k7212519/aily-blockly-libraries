# LCD screen

LCD1602/2004 display control support library, using 4-wire parallel communication, supports Arduino UNO, MEGA, ESP8266, ESP32 and other development boards

## Library Info
- **Name**: @aily-project/lib-liquidcrystal
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `lcd_init` | Statement | COLS(input_value), ROWS(input_value), RS_PIN(input_value), E_PIN(input_value), D4_PIN(input_value), D5_PIN(input_value), D6_PIN(input_value), D7_PIN(input_value), LIGHT_PIN(input_value) | `lcd_init(math_number(0), math_number(0), math_number(2), math_number(2), math_number(2), math_number(2), math_number(2), math_number(2), math_number(2))` | `#define LCD_COLS 1 ↵ #define LCD_ROWS 1 ↵ #define LCD_BACKLIGHT_PIN 1 ↵ LiquidCrystal lcd(1, 1, 1, 1, 1, 1); ↵ lcd.begin(LCD_COLS, LCD_ROWS); ↵ pinMode(LCD_BACKLIGHT_PIN, OUTPUT); ↵ digitalWrite(LCD_BACKLIGHT_PIN, HIGH);` |
| `lcd_clear` | Statement | (none) | `lcd_clear()` | `lcd.clear();` |
| `lcd_set_cursor` | Statement | COL(input_value), ROW(input_value) | `lcd_set_cursor(math_number(0), math_number(0))` | `lcd.setCursor(1, 1);` |
| `lcd_print` | Statement | TEXT(input_value) | `lcd_print(text("value"))` | `lcd.print(1);` |
| `lcd_print_position` | Statement | COL(input_value), ROW(input_value), TEXT(input_value) | `lcd_print_position(math_number(0), math_number(0), text("value"))` | `lcd.setCursor(1, 1); ↵ lcd.print(1);` |
| `lcd_backlight_on` | Statement | (none) | `lcd_backlight_on()` | `digitalWrite(LCD_BACKLIGHT_PIN, LOW);` |
| `lcd_backlight_off` | Statement | (none) | `lcd_backlight_off()` | `digitalWrite(LCD_BACKLIGHT_PIN, HIGH);` |
| `lcd_custom_char` | Value | CUSTOM_CHAR(field_bitmap), CHAR_INDEX(dropdown) | `lcd_custom_char([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], 0)` | `0` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CHAR_INDEX | 0, 1, 2, 3, 4, 5, 6, 7 | lcd_custom_char |

## ABS Examples

### Basic Usage
```
arduino_setup()
    lcd_init(math_number(0), math_number(0), math_number(2), math_number(2), math_number(2), math_number(2), math_number(2), math_number(2), math_number(2))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, lcd_custom_char([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], 0))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
