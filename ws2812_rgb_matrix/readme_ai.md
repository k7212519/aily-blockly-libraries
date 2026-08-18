# WS2812 RGB Matrix

WS2812/NeoPixel RGB matrix driver with custom size, image, text and animation blocks

## Library Info
- **Name**: @aily-project/lib-ws2812-rgb-matrix
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ws2812_matrix_init` | Statement | VAR(field_input), PIN(dropdown), WIDTH(field_number), HEIGHT(field_number), SERPENTINE(dropdown), TYPE(dropdown), BRIGHTNESS(field_number) | `ws2812_matrix_init("matrix", PIN, 8, 8, false, "NEO_GRB + NEO_KHZ800", 50)` | `matrix.begin(); ↵ matrix.setBrightness(50); ↵ matrix.clear(); ↵ matrix.show();` |
| `ws2812_matrix_show` | Statement | VAR(field_variable) | `ws2812_matrix_show($matrix)` | `matrix.show();` |
| `ws2812_matrix_clear` | Statement | VAR(field_variable), SHOW(dropdown) | `ws2812_matrix_clear($matrix, true)` | `matrix.clear(); ↵ matrix.show();` |
| `ws2812_matrix_set_brightness` | Statement | VAR(field_variable), BRIGHTNESS(input_value) | `ws2812_matrix_set_brightness($matrix, math_number(0))` | `matrix.setBrightness(constrain((int)(1), 0, 255));` |
| `ws2812_matrix_color_picker` | Value | COLOR(field_colour) | `ws2812_matrix_color_picker("#ff0000")` | `0xFF0000UL` |
| `ws2812_matrix_color_rgb` | Value | RED(input_value), GREEN(input_value), BLUE(input_value) | `ws2812_matrix_color_rgb(math_number(0), math_number(0), math_number(0))` | `(((uint32_t)constrain((int)(1), 0, 255) << 16) &#124; ((uint32_t)constrain((int)(1), 0, 255) << 8) &#124; (uint32_t)constrain((int)(1), 0, 255))` |
| `ws2812_matrix_set_pixel_xy` | Statement | VAR(field_variable), X(input_value), Y(input_value), COLOR(input_value) | `ws2812_matrix_set_pixel_xy($matrix, math_number(0), math_number(0), math_number(0))` | `ws2812MatrixSetPixel(matrix, 1, 1, matrix_width, matrix_height, matrix_serpentine, 1);` |
| `ws2812_matrix_set_pixel_index` | Statement | VAR(field_variable), INDEX(input_value), COLOR(input_value) | `ws2812_matrix_set_pixel_index($matrix, math_number(0), math_number(0))` | `ws2812MatrixSetPixelIndex(matrix, 1, 1);` |
| `ws2812_matrix_fill_color` | Statement | VAR(field_variable), COLOR(input_value) | `ws2812_matrix_fill_color($matrix, math_number(0))` | `matrix.fill(1);` |
| `ws2812_matrix_draw_image` | Statement | VAR(field_variable), IMAGE(field_led_matrix_image), X(input_value), Y(input_value), TRANSPARENT(dropdown) | `ws2812_matrix_draw_image($matrix, {"schemaVersion":1,"mode":"rgb","encoding":"rgba8888-v1","width":8,"height":8,"pixels":null}, math_number(0), math_number(0), true)` | `ws2812MatrixDrawBitmap(matrix, 1, 1, matrix_width, matrix_height, matrix_serpentine, 8, 8, ws2812_matrix_image_14pb7y, true);` |
| `ws2812_matrix_draw_line` | Statement | VAR(field_variable), X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), COLOR(input_value) | `ws2812_matrix_draw_line($matrix, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `ws2812MatrixDrawLine(matrix, 1, 1, 1, 1, matrix_width, matrix_height, matrix_serpentine, 1);` |
| `ws2812_matrix_draw_rect` | Statement | VAR(field_variable), X(input_value), Y(input_value), WIDTH(input_value), HEIGHT(input_value), FILL(dropdown), COLOR(input_value) | `ws2812_matrix_draw_rect($matrix, math_number(0), math_number(0), math_number(0), math_number(0), false, math_number(0))` | `ws2812MatrixDrawRect(matrix, 1, 1, 1, 1, false, matrix_width, matrix_height, matrix_serpentine, 1);` |
| `ws2812_matrix_draw_circle` | Statement | VAR(field_variable), X(input_value), Y(input_value), RADIUS(input_value), FILL(dropdown), COLOR(input_value) | `ws2812_matrix_draw_circle($matrix, math_number(0), math_number(0), math_number(0), false, math_number(0))` | `ws2812MatrixDrawCircle(matrix, 1, 1, 1, false, matrix_width, matrix_height, matrix_serpentine, 1);` |
| `ws2812_matrix_draw_text` | Statement | VAR(field_variable), TEXT(input_value), X(input_value), Y(input_value), COLOR(input_value) | `ws2812_matrix_draw_text($matrix, text("value"), math_number(0), math_number(0), math_number(0))` | `ws2812MatrixDrawText(matrix, 1, 1, matrix_width, matrix_height, matrix_serpentine, String("value"), 1);` |
| `ws2812_matrix_scroll_text` | Statement | VAR(field_variable), TEXT(input_value), COLOR(input_value), BACKGROUND(input_value), WAIT(input_value) | `ws2812_matrix_scroll_text($matrix, text("value"), math_number(0), math_number(0), math_number(0))` | `ws2812MatrixScrollText(matrix, matrix_width, matrix_height, matrix_serpentine, String("value"), 1, 1, 1);` |
| `ws2812_matrix_color_wipe` | Statement | VAR(field_variable), COLOR(input_value), WAIT(input_value) | `ws2812_matrix_color_wipe($matrix, math_number(0), math_number(0))` | `ws2812MatrixColorWipe(matrix, 1, 1);` |
| `ws2812_matrix_rainbow` | Statement | VAR(field_variable), WAIT(input_value), CYCLES(input_value) | `ws2812_matrix_rainbow($matrix, math_number(0), math_number(0))` | `ws2812MatrixRainbow(matrix, 1, constrain((int)(1), 1, 255));` |
| `ws2812_matrix_theater_chase` | Statement | VAR(field_variable), COLOR(input_value), WAIT(input_value), CYCLES(input_value) | `ws2812_matrix_theater_chase($matrix, math_number(0), math_number(0), math_number(0))` | `ws2812MatrixTheaterChase(matrix, 1, 1, constrain((int)(1), 1, 255));` |
| `ws2812_matrix_run_effect` | Statement | VAR(field_variable), EFFECT(dropdown), COLOR(input_value), WAIT(input_value), CYCLES(input_value) | `ws2812_matrix_run_effect($matrix, "0", math_number(0), math_number(0), math_number(0))` | `ws2812MatrixRunEffect(matrix, matrix_width, matrix_height, matrix_serpentine, 0, 1, 1, constrain((int)(1), 1, 255));` |
| `ws2812_matrix_xy_to_index` | Value | VAR(field_variable), X(input_value), Y(input_value) | `ws2812_matrix_xy_to_index($matrix, math_number(0), math_number(0))` | `ws2812MatrixXYToIndex(1, 1, matrix_width, matrix_height, matrix_serpentine)` |
| `ws2812_matrix_get_width` | Value | VAR(field_variable) | `ws2812_matrix_get_width($matrix)` | `matrix_width` |
| `ws2812_matrix_get_height` | Value | VAR(field_variable) | `ws2812_matrix_get_height($matrix)` | `matrix_height` |
| `ws2812_matrix_get_count` | Value | VAR(field_variable) | `ws2812_matrix_get_count($matrix)` | `matrix.numPixels()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SERPENTINE | false, true | ws2812_matrix_init |
| TYPE | NEO_GRB + NEO_KHZ800, NEO_RGB + NEO_KHZ800, NEO_BRG + NEO_KHZ800, NEO_GRB + NEO_KHZ400 | ws2812_matrix_init |
| SHOW | true, false | ws2812_matrix_clear |
| TRANSPARENT | true, false | ws2812_matrix_draw_image |
| FILL | false, true | ws2812_matrix_draw_rect, ws2812_matrix_draw_circle |
| EFFECT | 0, 1, 2, 3, 4 | ws2812_matrix_run_effect |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ws2812_matrix_init("matrix", PIN, 8, 8, false, "NEO_GRB + NEO_KHZ800", 50)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ws2812_matrix_color_picker("#ff0000"))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ws2812_matrix_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
