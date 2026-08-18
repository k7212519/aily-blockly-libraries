# TVout

Generate PAL or NTSC composite video output from AVR Arduino boards.

## Library Info

- **Name**: @aily-project/lib-tvout
- **Version**: 1.0.0
- **Source**: https://github.com/Avamander/arduino-tvout
- **Object type**: `TVout`

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tvout_begin` | Statement | VAR(field_input), MODE(dropdown), WIDTH(input_value), HEIGHT(input_value), FONT(dropdown) | `tvout_begin("TV", NTSC, math_number(120), math_number(96), font6x8)` | `TV.begin(NTSC, 1, 1); ↵ TV.select_font(font4x6);` |
| `tvout_end` | Statement | VAR(field_variable) | `tvout_end($TV)` | `TV.end();` |
| `tvout_select_font` | Statement | VAR(field_variable), FONT(dropdown) | `tvout_select_font($TV, font6x8)` | `TV.select_font(font4x6);` |
| `tvout_clear` | Statement | VAR(field_variable) | `tvout_clear($TV)` | `TV.fill(BLACK);` |
| `tvout_fill` | Statement | VAR(field_variable), COLOR(dropdown) | `tvout_fill($TV, WHITE)` | `TV.fill(BLACK);` |
| `tvout_set_pixel` | Statement | VAR(field_variable), X(input_value), Y(input_value), COLOR(dropdown) | `tvout_set_pixel($TV, math_number(0), math_number(0), WHITE)` | `TV.set_pixel(1, 1, WHITE);` |
| `tvout_get_pixel` | Value | VAR(field_variable), X(input_value), Y(input_value) | `tvout_get_pixel($TV, math_number(0), math_number(0))` | `TV.get_pixel(1, 1)` |
| `tvout_draw_line` | Statement | VAR(field_variable), X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), COLOR(dropdown) | `tvout_draw_line($TV, math_number(0), math_number(0), math_number(64), math_number(32), WHITE)` | `TV.draw_line(1, 1, 1, 1, WHITE);` |
| `tvout_draw_rect` | Statement | VAR(field_variable), X(input_value), Y(input_value), WIDTH(input_value), HEIGHT(input_value), COLOR(dropdown), FILL(dropdown) | `tvout_draw_rect($TV, math_number(10), math_number(10), math_number(40), math_number(24), WHITE, NONE)` | `TV.draw_rect(1, 1, 1, 1, WHITE);` |
| `tvout_draw_circle` | Statement | VAR(field_variable), X(input_value), Y(input_value), RADIUS(input_value), COLOR(dropdown), FILL(dropdown) | `tvout_draw_circle($TV, math_number(60), math_number(48), math_number(16), WHITE, NONE)` | `TV.draw_circle(1, 1, 1, WHITE);` |
| `tvout_shift` | Statement | VAR(field_variable), DISTANCE(input_value), DIRECTION(dropdown) | `tvout_shift($TV, math_number(1), UP)` | `TV.shift(1, UP);` |
| `tvout_set_cursor` | Statement | VAR(field_variable), X(input_value), Y(input_value) | `tvout_set_cursor($TV, math_number(0), math_number(0))` | `TV.set_cursor(1, 1);` |
| `tvout_print` | Statement | VAR(field_variable), TEXT(input_value) | `tvout_print($TV, text("Hello"))` | `TV.print(1);` |
| `tvout_println` | Statement | VAR(field_variable), TEXT(input_value) | `tvout_println($TV, text("Hello"))` | `TV.println(1);` |
| `tvout_print_at` | Statement | VAR(field_variable), X(input_value), Y(input_value), TEXT(input_value) | `tvout_print_at($TV, math_number(0), math_number(0), text("TVout"))` | `TV.print(1, 1, 1);` |
| `tvout_delay` | Statement | VAR(field_variable), MS(input_value) | `tvout_delay($TV, math_number(1000))` | `TV.delay(1);` |
| `tvout_delay_frame` | Statement | VAR(field_variable), FRAMES(input_value) | `tvout_delay_frame($TV, math_number(1))` | `TV.delay_frame(1);` |
| `tvout_millis` | Value | VAR(field_variable) | `tvout_millis($TV)` | `TV.millis()` |
| `tvout_resolution` | Value | VAR(field_variable), AXIS(dropdown) | `tvout_resolution($TV, hres)` | `TV.hres()` |
| `tvout_tone` | Statement | VAR(field_variable), FREQUENCY(input_value), DURATION(input_value) | `tvout_tone($TV, math_number(440), math_number(500))` | `TV.tone(1, 1);` |
| `tvout_no_tone` | Statement | VAR(field_variable) | `tvout_no_tone($TV)` | `TV.noTone();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | NTSC, PAL | Composite video standard. |
| FONT | font4x6, font6x8, font8x8, font8x8ext | Bitmap font from TVoutfonts. |
| COLOR | BLACK, WHITE, INVERT | Monochrome draw color or invert mode. |
| FILL | NONE, BLACK, WHITE, INVERT | Fill color for rectangles and circles; `NONE` omits the fill argument. |
| DIRECTION | UP, DOWN, LEFT, RIGHT | Frame-buffer shift direction. |
| AXIS | hres, vres | Horizontal or vertical resolution accessor. |

## Notes

1. **Initialization**: Place `tvout_begin` in `arduino_setup()` before drawing or printing.
2. **Variable**: `tvout_begin("TV", ...)` creates a `TVout` variable; later blocks should reference `variables_get($TV)`.
3. **Resolution**: Width should be divisible by 8; examples often use `120 x 96`.
4. **Board support**: Targets AVR boards and uses AVR timers and interrupts.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    tvout_begin("TV", NTSC, math_number(120), math_number(96), font6x8)
```
