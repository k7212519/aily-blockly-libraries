# TFT_eSPI

TFT_eSPI - Arduino library, graphics and font library supporting multiple TFT displays

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-tft-espi |
| Version | 2.5.48 |
| Author | ailyProject |
| Source | https://github.com/Bodmer/TFT_eSPI |
| License | Original license |

## Supported Boards

ESP32, RP2040, STMicroelectronics:stm32, adafruit:samd, Seeeduino:samd, adafruit:nrf52

## Description

TFT_eSPI - Arduino library, graphics and font library supporting multiple TFT displays

## Quick Start

1. Enable `@aily-project/lib-tft-espi` in Aily Blockly.
2. Add the library blocks, initialize hardware in `arduino_setup()`, then use read/write blocks in `arduino_loop()`.

## Static Images

Upload PNG, JPEG, WebP, or BMP images and convert them to RGB565 or RGB332 pixel data. Images are embedded in `PROGMEM` and rendered at the selected coordinates with `pushImage()`. The source image is retained by the editor so changing width, height, or colour format always reconverts from the original file.

## GIF and MP4 Animation

Upload GIF or MP4 in the animation field and choose RGB565 for higher colour fidelity or RGB332 for roughly twice the frame capacity. The generated `PROGMEM` frames are rendered through the matching `pushImage()` overload automatically. ILI9341, ILI9341_2, ILI9342, ST7735, ST7789, and ST7789_2 configurations correct the animation red/blue channel order during code generation. Other drivers keep the source colour layout. Blocking, non-blocking, looped, and selected-frame playback are supported. Keep clips short; MP4 audio is ignored.
