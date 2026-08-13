# Cycore Display

## Metadata

- Package: `@aily-project/lib-cycore-gfx`
- Version: `1.0.0`
- Board: `esp32:esp32:wifiduino32s3` only
- Voltage: 3.3V
- Display: write-only 8-pin ST7789 (GND, VCC, SCL, SDA, RST, DC, CS, BL)
- Sizes: 240×240 and 240×320

## Architecture

The library creates `SPIClass cycoreGfxSpi(HSPI)` and calls `begin(sck, -1, mosi, -1)`. It constructs `Adafruit_ST7789` with the hardware-SPI pointer. Drawing targets an RGB565 `GFXcanvas16` whose buffer is allocated from PSRAM first, then internal RAM. It never falls back to direct-to-display drawing.

The canvas always has rotation 0 and is recreated to match `tft.width()` and `tft.height()` after the display rotation changes. Reinitialization and rotation therefore clear the pending frame. 240×320 becomes 320×240 at rotations 1 and 3.

`cycore_gfx_present` sets one full-screen address window and calls `writePixels()` once. `cycore_gfx_present_region` clips the rectangle, opens one SPI transaction and sends one contiguous row at a time. `cycore_gfx_frame` runs nested statements then performs a full refresh.

## Initialization

Use `cycore_gfx_init` in setup. It initializes at rotation 0 and 32MHz; use `cycore_gfx_set_rotation` and `cycore_gfx_set_frequency` afterward when different settings are needed. Defaults: size 240×240, SCK 12, MOSI 11, CS 10, RST 17, DC 18, BL 21. Available frequencies are 20, 32, and 40MHz. MISO is fixed to -1. The backlight is active-high.

Check `cycore_gfx_ready` before relying on output when allocation may fail. Width and height reporters return the current rotated logical dimensions. Repeated initialization releases the old canvas/display, ends HSPI, and configures it again.

## Drawing workflow

1. Initialize once.
2. Draw or clear the canvas with `cycore_gfx_*` drawing blocks.
3. Refresh the full screen or a clipped region.

Changes remain invisible until refresh. This avoids character-by-character and shape-by-shape redraw artifacts. The display has no TE signal, so refresh is not synchronized to vertical blanking.

There is no global font or font-size state. Each `cycore_gfx_draw_text` block independently selects from one `FONT` field: complete WenQuanYi GB2312 at 14 or 16 pixels, integer-scaled Chinese 28/32/42/48 pixels, or built-in Latin 8/16/24/32 pixels. Chinese choices accept runtime UTF-8 `String` values containing Simplified Chinese, mixed ASCII, and symbols such as `℃` (U+2103). Scaling is applied per draw call while rendering into the canvas. Text supports foreground color, transparent or opaque background, and X/Y placement. Geometry includes pixels, lines, fast horizontal/vertical lines, rectangles, rounded rectangles, circles, triangles, and filled variants. Colors are RGB565 values; use the color picker or RGB conversion block.

## Images

`cycore_gfx_bitmap_data` accepts JSON in either form:

```json
[["#ff0000", "#00ff00"], ["#0000ff", "#ffffff"]]
```

or:

```json
{"width":2,"height":2,"pixels":[63488,2016,31,65535]}
```

Pixels may be RGB565 numbers, `0xFFFF`, `#RRGGBB`, or `[r,g,b]`. Local image fields are converted at code-generation time to `static const uint16_t[] PROGMEM`; the runtime helper clips and copies rows into the canvas. Invalid/unavailable images set a block warning and generate no draw statement. URL, HTTP, Wi-Fi, SD and runtime file loading are intentionally unsupported.

## Resource use

- 240×240 canvas: 115,200 bytes
- 240×320 canvas: 153,600 bytes

PSRAM should be enabled for the target board. Full-frame transfer targets are under 100ms for 240×240 and under 120ms for 240×320 under normal wiring at 32MHz, but actual timing depends on the module and wiring quality.
