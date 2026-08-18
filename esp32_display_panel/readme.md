# ESP32 Display Panel

TFT_eSPI-style SPI display blocks: select an LCD driver, assign pins, then use LCD and backlight operations.

## Library Info

| Field | Value |
|---|---|
| Package | @aily-project/lib-esp32-display-panel |
| Version | 1.0.4 |
| Source | https://github.com/esp-arduino-libs/ESP32_Display_Panel |
| License | Apache-2.0 |

## Supported Boards

ESP32 boards using an SPI display with AXS15231B, GC9A01, GC9B71, ILI9341, NV3022B, SH8601, SPD2010, ST7789, ST7796, ST77916 or ST77922. Requires Arduino-ESP32 3.1.0+.

## Description

Bundles `ESP32_Display_Panel` 1.0.4 and its dependencies. Initialization sets resolution, SPI/reset/backlight pins, backlight level, RGB/BGR order and SPI frequency. RGB565 fill blocks use 16-bit color.

## Quick Start

Add one initialization block to setup, choose the controller and enter the display pins, then run the LCD color-bar test. The controller is a project-wide compile-time setting. This block does not configure a touch controller or IO expander.
