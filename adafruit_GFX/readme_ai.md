# Adafruit GFX

The color display driver library based on Adafruit GFX supports common driver chips such as ST7735, ST7789, and ST7796S. It supports a variety of displays (such as OLED, TFT, LCD, etc.), supports drawing of text, imag...

## Library Info
- **Name**: @aily-project/lib-adafruit-gfx
- **Version**: 1.0.3

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tft_init` | Statement | MODEL(dropdown), CS(input_value), DC(input_value), MOSI(input_value), SCLK(input_value), RST(input_value), BLK(input_value), WIDTH(input_value), HEIGHT(input_value) | `tft_init(ST7735, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `Adafruit_ST7735 tft = Adafruit_ST7735(1, 1, 1, 1, 1); ↵ tft.initR(INITR_BLACKTAB); ↵ // 如果显示异常，可尝试以下初始化参数： ↵ // tft.initR(INITR_REDTAB); ↵ // tft.initR(INITR_GREENTAB); ↵ // tft.initR(INITR_144GREENTAB);` |
| `tft_set_rotation` | Statement | ROTATION(dropdown) | `tft_set_rotation("0")` | `tft.setRotation(0);` |
| `tft_invert_display` | Statement | INVERT(dropdown) | `tft_invert_display(true)` | `tft.invertDisplay(true);` |
| `tft_fill_screen` | Statement | COLOR(input_value) | `tft_fill_screen(math_number(0))` | `tft.fillScreen(1);` |
| `tft_clear_screen` | Statement | (none) | `tft_clear_screen()` | `tft.fillScreen(ST77XX_BLACK);` |
| `tft_preset_color` | Value | COLOR(field_colour_hsv_sliders) | `tft_preset_color("#ffffff")` | `tft.color565(255, 255, 255)` |
| `tft_set_text_color` | Statement | COLOR(input_value), BG_COLOR(input_value) | `tft_set_text_color(math_number(0), math_number(0))` | `tft.setTextColor(1, 1);` |
| `tft_set_text_size` | Statement | SIZE(input_value) | `tft_set_text_size(math_number(0))` | `tft.setTextSize(1);` |
| `tft_print` | Statement | ROW(input_value), COLUMN(input_value), TEXT(input_value) | `tft_print(math_number(0), math_number(0), text("value"))` | `tft.setCursor(1 , 1 ); ↵ tft.print(1);` |
| `tft_draw_pixel` | Statement | X(input_value), Y(input_value), COLOR(input_value) | `tft_draw_pixel(math_number(0), math_number(0), math_number(0))` | `tft.drawPixel(1, 1, 1);` |
| `tft_draw_line` | Statement | X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), COLOR(input_value) | `tft_draw_line(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawLine(1, 1, 1, 1, 1);` |
| `tft_draw_fast_h_line` | Statement | X(input_value), Y(input_value), W(input_value), COLOR(input_value) | `tft_draw_fast_h_line(math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawFastHLine(1, 1, 1, 1);` |
| `tft_draw_fast_v_line` | Statement | X(input_value), Y(input_value), H(input_value), COLOR(input_value) | `tft_draw_fast_v_line(math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawFastVLine(1, 1, 1, 1);` |
| `tft_draw_rect` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), COLOR(input_value) | `tft_draw_rect(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawRect(1, 1, 1, 1, 1);` |
| `tft_fill_rect` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), COLOR(input_value) | `tft_fill_rect(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.fillRect(1, 1, 1, 1, 1);` |
| `tft_draw_round_rect` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), R(input_value), COLOR(input_value) | `tft_draw_round_rect(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawRoundRect(1, 1, 1, 1, 1, 1);` |
| `tft_fill_round_rect` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), R(input_value), COLOR(input_value) | `tft_fill_round_rect(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.fillRoundRect(1, 1, 1, 1, 1, 1);` |
| `tft_draw_circle` | Statement | X(input_value), Y(input_value), R(input_value), COLOR(input_value) | `tft_draw_circle(math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawCircle(1, 1, 1, 1);` |
| `tft_fill_circle` | Statement | X(input_value), Y(input_value), R(input_value), COLOR(input_value) | `tft_fill_circle(math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.fillCircle(1, 1, 1, 1);` |
| `tft_draw_triangle` | Statement | X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), X2(input_value), Y2(input_value), COLOR(input_value) | `tft_draw_triangle(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawTriangle(1, 1, 1, 1, 1, 1, 1);` |
| `tft_fill_triangle` | Statement | X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), X2(input_value), Y2(input_value), COLOR(input_value) | `tft_fill_triangle(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.fillTriangle(1, 1, 1, 1, 1, 1, 1);` |
| `tft_color565` | Value | R(input_value), G(input_value), B(input_value) | `tft_color565(math_number(0), math_number(0), math_number(0))` | `tft.color565(1, 1, 1)` |
| `tft_create_canvas16` | Statement | NAME(field_variable), WIDTH(input_value), HEIGHT(input_value) | `tft_create_canvas16($canvas16, math_number(0), math_number(0))` | `GFXcanvas16 canvas16(1, 1);` |
| `tft_create_canvas1` | Statement | NAME(field_variable), WIDTH(input_value), HEIGHT(input_value) | `tft_create_canvas1($canvas1, math_number(0), math_number(0))` | `GFXcanvas1 canvas1(1, 1);` |
| `tft_get_buffer` | Value | CANVAS(input_value) | `tft_get_buffer(math_number(0))` | `1.getBuffer()` |
| `tft_bitmap_image` | Value | IMAGE_DATA(field_input) | `tft_bitmap_image("IMAGE_DATA")` | `bitmap_generatorcoveragetftbitmapimage` |
| `tft_image_file` | Statement | IMAGE_PREVIEW(field_image_preview), X(field_number), Y(field_number), WIDTH(field_number), HEIGHT(field_number) | `tft_image_file({"schemaVersion":1,"filePath":"","width":100,"height":100,"mediaType":"","byteLength":0,"image":null}, 0, 0, 32, 32)` | `tft.drawRGBBitmap(0, 0, imageFile_generatorcoveragetftimagefile, 32, 32);` |
| `tft_draw_image` | Statement | X(input_value), Y(input_value), BITMAP(input_value) | `tft_draw_image(math_number(0), math_number(0), math_number(0))` | `tft.drawRGBBitmap(1, 1, 1, 1_width, 1_height);` |
| `tft_draw_url_image` | Statement | URL(input_value), X(input_value), Y(input_value), WIDTH(input_value), HEIGHT(input_value) | `tft_draw_url_image(text("value"), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft_draw_url_image("value", 1, 1, 1, 1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODEL | ST7735, ST7789, ST7796S | tft_init |
| ROTATION | 0, 1, 2, 3 | tft_set_rotation |
| INVERT | true, false | tft_invert_display |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tft_init(ST7735, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))
    tft_clear_screen()
    tft_set_text_size(math_number(2))
    tft_print(math_number(0), math_number(0), text("Hello"))

arduino_loop()
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
