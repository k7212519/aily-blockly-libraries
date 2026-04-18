# Adafruit LED Backpack

基于HT16K33的多种LED显示模块驱动库（I2C），支持7段/14段数码管、8x8/8x16点阵、双色点阵、24段条形图。

## Library Info
- **Name**: @aily-project/lib-adafruit-ledbackpack
- **Version**: 1.5.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ledbp_init` | Statement | DISPLAY_TYPE(dropdown), ADDR(input_value) | `ledbp_init(Adafruit_7segment, math_number(0x70))` | `Adafruit_7segment ledbp; ledbp.begin(0x70);` |
| `ledbp_write_display` | Statement | (none) | `ledbp_write_display()` | `ledbp.writeDisplay();` |
| `ledbp_clear` | Statement | (none) | `ledbp_clear()` | `ledbp.clear();` |
| `ledbp_set_brightness` | Statement | BRIGHTNESS(input_value) | `ledbp_set_brightness(math_number(15))` | `ledbp.setBrightness(15);` |
| `ledbp_blink_rate` | Statement | RATE(dropdown) | `ledbp_blink_rate(HT16K33_BLINK_OFF)` | `ledbp.blinkRate(HT16K33_BLINK_OFF);` |
| `ledbp_set_display_state` | Statement | STATE(dropdown) | `ledbp_set_display_state(true)` | `ledbp.setDisplayState(true);` |
| `ledbp_seven_print_number` | Statement | NUM(input_value) | `ledbp_seven_print_number(math_number(1234))` | `ledbp.print(1234); ledbp.writeDisplay();` |
| `ledbp_seven_print_number_base` | Statement | NUM(input_value), BASE(dropdown) | `ledbp_seven_print_number_base(math_number(255), HEX)` | `ledbp.print(255, HEX); ledbp.writeDisplay();` |
| `ledbp_seven_write_digit_num` | Statement | POS(input_value), NUM(input_value), DOT(dropdown) | `ledbp_seven_write_digit_num(math_number(0), math_number(5), false)` | `ledbp.writeDigitNum(0, 5, false);` |
| `ledbp_seven_draw_colon` | Statement | STATE(dropdown) | `ledbp_seven_draw_colon(true)` | `ledbp.drawColon(true); ledbp.writeDisplay();` |
| `ledbp_alpha_write_digit_ascii` | Statement | POS(input_value), CHAR(input_value), DOT(dropdown) | `ledbp_alpha_write_digit_ascii(math_number(0), text("A"), false)` | `ledbp.writeDigitAscii(0, 'A', false);` |
| `ledbp_alpha_print_text` | Statement | TEXT(input_value) | `ledbp_alpha_print_text(text("HELO"))` | `ledbp_alpha_print(ledbp, "HELO");` |
| `ledbp_matrix_color` | Value | COLOR(dropdown) | `ledbp_matrix_color(LED_ON)` | `LED_ON` |
| `ledbp_matrix_draw_pixel` | Statement | X(input_value), Y(input_value), COLOR(input_value) | `ledbp_matrix_draw_pixel(math_number(0), math_number(0), ledbp_matrix_color(LED_ON))` | `ledbp.drawPixel(0, 0, LED_ON);` |
| `ledbp_matrix_draw_line` | Statement | X0, Y0, X1, Y1, COLOR(input_value) | `ledbp_matrix_draw_line(math_number(0), math_number(0), math_number(7), math_number(7), ledbp_matrix_color(LED_ON))` | `ledbp.drawLine(0,0,7,7,LED_ON);` |
| `ledbp_matrix_draw_rect` | Statement | X, Y, W, H, COLOR(input_value) | `ledbp_matrix_draw_rect(math_number(0), math_number(0), math_number(8), math_number(8), ledbp_matrix_color(LED_ON))` | `ledbp.drawRect(0,0,8,8,LED_ON);` |
| `ledbp_matrix_fill_rect` | Statement | X, Y, W, H, COLOR(input_value) | `ledbp_matrix_fill_rect(math_number(0), math_number(0), math_number(4), math_number(4), ledbp_matrix_color(LED_ON))` | `ledbp.fillRect(0,0,4,4,LED_ON);` |
| `ledbp_matrix_draw_circle` | Statement | X, Y, R, COLOR(input_value) | `ledbp_matrix_draw_circle(math_number(3), math_number(3), math_number(3), ledbp_matrix_color(LED_ON))` | `ledbp.drawCircle(3,3,3,LED_ON);` |
| `ledbp_matrix_set_text_size` | Statement | SIZE(input_value) | `ledbp_matrix_set_text_size(math_number(1))` | `ledbp.setTextSize(1);` |
| `ledbp_matrix_set_text_color` | Statement | COLOR(input_value) | `ledbp_matrix_set_text_color(ledbp_matrix_color(LED_ON))` | `ledbp.setTextColor(LED_ON);` |
| `ledbp_matrix_set_cursor` | Statement | X(input_value), Y(input_value) | `ledbp_matrix_set_cursor(math_number(0), math_number(0))` | `ledbp.setCursor(0, 0);` |
| `ledbp_matrix_print` | Statement | TEXT(input_value) | `ledbp_matrix_print(text("Hi"))` | `ledbp.print("Hi");` |
| `ledbp_matrix_set_rotation` | Statement | ROTATION(dropdown) | `ledbp_matrix_set_rotation(0)` | `ledbp.setRotation(0);` |
| `ledbp_matrix_set_text_wrap` | Statement | WRAP(dropdown) | `ledbp_matrix_set_text_wrap(false)` | `ledbp.setTextWrap(false);` |
| `ledbp_bar_set_bar` | Statement | BAR(input_value), COLOR(input_value) | `ledbp_bar_set_bar(math_number(0), ledbp_matrix_color(LED_RED))` | `ledbp.setBar(0, LED_RED);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DISPLAY_TYPE | Adafruit_7segment, Adafruit_AlphaNum4, Adafruit_8x8matrix, Adafruit_8x16matrix, Adafruit_8x16minimatrix, Adafruit_BicolorMatrix, Adafruit_24bargraph | 显示模块类型 |
| RATE | HT16K33_BLINK_OFF, HT16K33_BLINK_2HZ, HT16K33_BLINK_1HZ, HT16K33_BLINK_HALFHZ | 闪烁速率 |
| STATE | true, false | 开启 / 关闭 |
| DOT | true, false | 小数点 亮 / 灭 |
| BASE | DEC, HEX, BIN, OCT | 进制 |
| COLOR | LED_ON, LED_OFF, LED_RED, LED_YELLOW, LED_GREEN | 颜色常量 |
| ROTATION | 0, 1, 2, 3 | 0° / 90° / 180° / 270° |
| WRAP | true, false | 文字换行 开 / 关 |

## ABS Examples

### 4位7段数码管 显示计数
```
arduino_setup()
    ledbp_init(Adafruit_7segment, math_number(0x70))
    ledbp_set_brightness(math_number(10))

arduino_loop()
    ledbp_seven_print_number(math_number(1234))
    time_delay(math_number(500))
    ledbp_seven_print_number_base(math_number(255), HEX)
    time_delay(math_number(500))
```

### 8x8点阵 画圆
```
arduino_setup()
    ledbp_init(Adafruit_8x8matrix, math_number(0x70))

arduino_loop()
    ledbp_clear()
    ledbp_matrix_draw_circle(math_number(3), math_number(3), math_number(3), ledbp_matrix_color(LED_ON))
    ledbp_write_display()
    time_delay(math_number(500))
```

### 24段条形图
```
arduino_setup()
    ledbp_init(Adafruit_24bargraph, math_number(0x70))

arduino_loop()
    ledbp_bar_set_bar(math_number(0), ledbp_matrix_color(LED_RED))
    ledbp_bar_set_bar(math_number(1), ledbp_matrix_color(LED_YELLOW))
    ledbp_bar_set_bar(math_number(2), ledbp_matrix_color(LED_GREEN))
    ledbp_write_display()
    time_delay(math_number(500))
```

### 14段字符数码管 文本显示
```
arduino_setup()
    ledbp_init(Adafruit_AlphaNum4, math_number(0x70))

arduino_loop()
    ledbp_alpha_print_text(text("HELO"))
    time_delay(math_number(1000))
```

## Notes

1. **单例对象**：库内部使用全局对象 `ledbp`，类型由 `ledbp_init` 的下拉框决定；一个项目中通常只使用一种显示类型。
2. **I2C地址**：默认 `0x70`，2地址选择模块可用 `0x70-0x73`，3地址选择模块可用 `0x70-0x77`。
3. **刷新显示**：点阵绘制类积木只是更新缓冲区，需调用 `ledbp_write_display` 使内容生效。7段和14段的文本/数字积木已包含自动刷新。
4. **点阵颜色**：单色点阵使用 `LED_ON` / `LED_OFF`；双色点阵 / 条形图支持 `LED_RED` / `LED_YELLOW` / `LED_GREEN`。
5. **位置参数**：7段 `writeDigitNum` 位置范围 0-4（位置2为冒号，无法显示数字）；14段 `writeDigitAscii` 位置范围 0-3。
