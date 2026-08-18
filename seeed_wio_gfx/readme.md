# Wio Terminal Display

## Description

Screen driver library designed for Wio Terminal's built-in 2.4-inch 320×240 TFT LCD, with graphics, text, static images, animation, and SD-card video support.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-seeed-wio-gfx |
| Version | 1.0.11 |
| Author | SeeedStudio |
| Source | https://github.com/Seeed-Studio/Seeed_GFX |
| License | Original license |

## Supported Boards

Wio Terminal

## Quick Start

1. Enable `@aily-project/lib-seeed-wio-gfx` for a Wio Terminal project.
2. Initialize the built-in screen in `arduino_setup()` and select its SPI frequency. The default is 50 MHz; `MAX (CPU/2)` is available for testing and may cause display corruption.
3. Add drawing, text, static-image, animation, or SD-video blocks. Static images support PNG/JPEG/WebP/BMP converted to RGB565/RGB332; RGB565 SD video uses double-buffer DMA when memory allows.
