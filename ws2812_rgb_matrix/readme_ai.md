# WS2812 RGB Matrix Blockly Library

## Library Info
- Name: @aily-project/lib-ws2812-rgb-matrix
- Variable type: WS2812RGBMatrix
- Backend: Adafruit_NeoPixel
- Main use: addressable WS2812/NeoPixel RGB LED matrices with configurable width/height and row-major or serpentine wiring.

## Block Groups
- Initialize: `ws2812_matrix_init` creates an `Adafruit_NeoPixel` object and constants `<var>_width`, `<var>_height`, `<var>_serpentine`.
- Basic control: show, clear, brightness, fill, set pixel by XY or index.
- Color values: `ws2812_matrix_color_picker` and `ws2812_matrix_color_rgb` output packed `0xRRGGBBUL` numbers.
- Drawing: image field, line, rectangle, circle, text, scrolling text.
- Effects: color wipe, rainbow, theater chase, row scan, column scan, sparkle, breathe, checkerboard.
- Status: XY to LED index, width, height, LED count.

## Code Generation Rules
- Init block uses `field_input`; operation blocks use `field_variable` with type `WS2812RGBMatrix`.
- Always include `#include <Adafruit_NeoPixel.h>` when generating matrix code.
- Use helper functions added through `generator.addFunction` for XY mapping, shapes, bitmaps, text and animations.
- Drawing blocks modify the NeoPixel buffer only; users should call `ws2812_matrix_show` except for animation/scroll blocks, which refresh internally.
- `field_led_matrix_image` values are flattened row-major. `null` pixels become transparent when `TRANSPARENT` is true, otherwise they are emitted as black/off.

## Minimal ABS-like Flow
```
arduino_setup()
  ws2812_matrix_init("matrix", pin=6, width=8, height=8, serpentine=true, type=GRB800, brightness=50)

arduino_loop()
  ws2812_matrix_clear($matrix, false)
  ws2812_matrix_set_pixel_xy($matrix, 3, 4, color_picker(#00ff00))
  ws2812_matrix_show($matrix)
```

## Important Notes
- `WIDTH * HEIGHT` must match the physical LED count.
- Most WS2812B matrices use GRB 800KHz.
- Text helper supports uppercase/lowercase English letters, digits and common ASCII punctuation; use the RGB image field for non-ASCII glyphs.
