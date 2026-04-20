# micro:bit LED Matrix

Control the 5x5 LED matrix on BBC micro:bit with Adafruit GFX compatible drawing functions.

## Library Info
- **Name**: @aily-project/lib-microbit
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `microbit_matrix_begin` | Statement | None | `microbit_matrix_begin()` | `matrix.begin();` |
| `microbit_matrix_clear` | Statement | None | `microbit_matrix_clear()` | `matrix.clear();` |
| `microbit_matrix_fill` | Statement | STATE(field_dropdown) | `microbit_matrix_fill(1)` or `microbit_matrix_fill(0)` | `matrix.fillScreen(1);` or `matrix.fillScreen(0);` |
| `microbit_matrix_draw_pixel` | Statement | X(input_value), Y(input_value), STATE(field_dropdown) | `microbit_matrix_draw_pixel(math_number(0), math_number(0), 1)` | `matrix.drawPixel(0, 0, 1);` |
| `microbit_matrix_draw_line` | Statement | X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), STATE(field_dropdown) | `microbit_matrix_draw_line(math_number(0), math_number(0), math_number(4), math_number(4), 1)` | `matrix.drawLine(0, 0, 4, 4, 1);` |
| `microbit_matrix_draw_rect` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), STATE(field_dropdown) | `microbit_matrix_draw_rect(math_number(0), math_number(0), math_number(5), math_number(5), 1)` | `matrix.drawRect(0, 0, 5, 5, 1);` |
| `microbit_matrix_fill_rect` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), STATE(field_dropdown) | `microbit_matrix_fill_rect(math_number(0), math_number(0), math_number(5), math_number(5), 1)` | `matrix.fillRect(0, 0, 5, 5, 1);` |
| `microbit_matrix_draw_circle` | Statement | X(input_value), Y(input_value), R(input_value), STATE(field_dropdown) | `microbit_matrix_draw_circle(math_number(2), math_number(2), math_number(2), 1)` | `matrix.drawCircle(2, 2, 2, 1);` |
| `microbit_matrix_fill_circle` | Statement | X(input_value), Y(input_value), R(input_value), STATE(field_dropdown) | `microbit_matrix_fill_circle(math_number(2), math_number(2), math_number(2), 1)` | `matrix.fillCircle(2, 2, 2, 1);` |
| `microbit_matrix_draw_triangle` | Statement | X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), X2(input_value), Y2(input_value), STATE(field_dropdown) | `microbit_matrix_draw_triangle(math_number(0), math_number(4), math_number(2), math_number(0), math_number(4), math_number(4), 1)` | `matrix.drawTriangle(0, 4, 2, 0, 4, 4, 1);` |
| `microbit_matrix_fill_triangle` | Statement | X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), X2(input_value), Y2(input_value), STATE(field_dropdown) | `microbit_matrix_fill_triangle(math_number(0), math_number(4), math_number(2), math_number(0), math_number(4), math_number(4), 1)` | `matrix.fillTriangle(0, 4, 2, 0, 4, 4, 1);` |
| `microbit_matrix_show_icon` | Statement | ICON(field_dropdown) | `microbit_matrix_show_icon(HEART)` | `matrix.show(matrix.HEART);` |
| `microbit_matrix_show_bitmap` | Statement | BITMAP(input_value) | `microbit_matrix_show_bitmap(microbit_matrix_bitmap_heart())` | `matrix.show(matrix.HEART);` |
| `microbit_matrix_print_text` | Statement | TEXT(input_value) | `microbit_matrix_print_text(text("HELLO"))` | `matrix.print("HELLO");` |
| `microbit_matrix_print_number` | Statement | NUMBER(input_value) | `microbit_matrix_print_number(math_number(42))` | `matrix.print(42);` |
| `microbit_matrix_scroll_text` | Statement | TEXT(input_value), SPEED(input_value) | `microbit_matrix_scroll_text(text("HELLO"), math_number(150))` | `matrix.scrollText("HELLO", 150);` |
| `microbit_matrix_bitmap_create` | Value | ROW1(input_value), ROW2(input_value), ROW3(input_value), ROW4(input_value), ROW5(input_value) | `microbit_matrix_bitmap_create(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | Returns bitmap array |
| `microbit_matrix_bitmap_heart` | Value | None | `microbit_matrix_bitmap_heart()` | `matrix.HEART` |
| `microbit_matrix_bitmap_empty_heart` | Value | None | `microbit_matrix_bitmap_empty_heart()` | `matrix.EMPTYHEART` |
| `microbit_matrix_bitmap_yes` | Value | None | `microbit_matrix_bitmap_yes()` | `matrix.YES` |
| `microbit_matrix_bitmap_no` | Value | None | `microbit_matrix_bitmap_no()` | `matrix.NO` |
| `microbit_matrix_bitmap_smile` | Value | None | `microbit_matrix_bitmap_smile()` | `matrix.MICROBIT_SMILE` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| STATE | 1, 0 | LED state: 1 = ON, 0 = OFF |
| ICON | HEART, EMPTYHEART, YES, NO, SMILE | Preset icon names |

## ABS Examples

### Basic Initialization and Display
arduino_setup()
    microbit_matrix_begin()

arduino_loop()
    microbit_matrix_show_icon(HEART)
    time_delay(math_number(1000))
    microbit_matrix_clear()
    time_delay(math_number(500))

### Drawing Shapes
arduino_setup()
    microbit_matrix_begin()

arduino_loop()
    microbit_matrix_clear()
    microbit_matrix_draw_line(math_number(0), math_number(0), math_number(4), math_number(4), 1)
    microbit_matrix_draw_line(math_number(0), math_number(4), math_number(4), math_number(0), 1)
    time_delay(math_number(1000))

### Scrolling Text
arduino_setup()
    microbit_matrix_begin()

arduino_loop()
    microbit_matrix_scroll_text(text("HELLO WORLD"), math_number(150))

### Custom Bitmap
arduino_setup()
    microbit_matrix_begin()

arduino_loop()
    microbit_matrix_show_bitmap(microbit_matrix_bitmap_create(math_number(10), math_number(10), math_number(10), math_number(10), math_number(10)))
    time_delay(math_number(1000))

## Notes

1. **Initialization**: Call `microbit_matrix_begin()` inside `arduino_setup()` before using any other matrix blocks.
2. **Coordinates**: The LED matrix is 5x5, so x and y coordinates range from 0 to 4.
3. **Global object**: All blocks use a global `matrix` object automatically created by the library.
4. **Bitmap format**: Each row in a bitmap is a byte (0-255), representing 5 LEDs in binary (LSB = leftmost LED).
5. **Text scrolling**: `microbit_matrix_print_text()` automatically scrolls text longer than 1 character.