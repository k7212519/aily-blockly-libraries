# TFT Screen

## Description

ST7735 TFT drawing, static-image, and animation blocks for the Xueersi ESP32 handheld.

## Library Info

| Package | Version | License |
|---|---|---|
| @aily-project/lib-tft-screen | 1.0.4 | MIT |

## Supported Boards

Xueersi ESP32 handheld.

## Quick Start

1. Add `tftscr_init`.
2. Use `tftscr_image`/`tftscr_draw_image` for embedded PNG/JPEG/WebP/BMP images, drawing blocks for primitives, or `tftscr_animation` for embedded animations.
3. Initialize the TF card with the parameter-free `xueersi_esp32_sd` block.
4. For long animations, copy an AILY video to TF and use `tftscr_play_tf_animation` with the recommended 48 KB buffer.

TF playback reuses the `SD`/`FS` instance initialized by `xueersi_esp32_sd`; it never restarts SD or SPI. TFT and TF share HSPI, and GPIO19 is both TF MISO and panel RESET, so the library uses ST7735 software reset. Row-aligned reads and synchronous batched LCD writes avoid TFT_eSPI DMA taking ownership of the live SD bus.
