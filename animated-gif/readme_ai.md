# GIF animation player

A GIF animation player based on the AnimatedGIF library, which supports playing GIF animations from memory or SD card to the TFT display. It usually needs to be used in conjunction with the GFX library.

## Library Info
- **Name**: @aily-project/lib-animated-gif
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `gif_init` | Statement | VAR(field_input) | `gif_init("gif")` | `gif.begin(GIF_PALETTE_RGB565_LE);` |
| `gif_open_memory` | Statement | VAR(field_variable), HEADER(field_input), ARRAY(field_input), X(input_value), Y(input_value) | `gif_open_memory($gif, "image.h", "ucImage", math_number(0), math_number(0))` | `_gif_xOffset = 1; ↵ _gif_yOffset = 1; ↵ gif.open((uint8_t *)ucImage, sizeof(ucImage), _GIFDraw);` |
| `gif_open_sd` | Statement | VAR(field_variable), FILENAME(input_value), X(input_value), Y(input_value) | `gif_open_sd($gif, text("value"), math_number(0), math_number(0))` | `_gif_xOffset = 1; ↵ _gif_yOffset = 1; ↵ gif.open("value", _GIFOpenFile, _GIFCloseFile, _GIFReadFile, _GIFSeekFile, _GIFDraw);` |
| `gif_play_frame` | Value | VAR(field_variable), SYNC(dropdown) | `gif_play_frame($gif, true)` | `gif.playFrame(true, NULL)` |
| `gif_play_all` | Statement | VAR(field_variable) | `gif_play_all($gif)` | `while (gif.playFrame(true, NULL)) {}` |
| `gif_close` | Statement | VAR(field_variable) | `gif_close($gif)` | `gif.close();` |
| `gif_get_width` | Value | VAR(field_variable) | `gif_get_width($gif)` | `gif.getCanvasWidth()` |
| `gif_get_height` | Value | VAR(field_variable) | `gif_get_height($gif)` | `gif.getCanvasHeight()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SYNC | true, false | gif_play_frame |

## ABS Examples

### Basic Usage
```
arduino_setup()
    gif_init("gif")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, gif_play_frame($gif, true))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `gif_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
