# micro:bit LED Matrix

Control the 5x5 LED matrix on BBC micro:bit with Adafruit GFX compatible drawing functions.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-microbit |
| Version | 1.0.0 |
| Author | Adafruit Industries |
| Source | https://github.com/adafruit/Adafruit_Microbit |
| License | MIT |

## Supported Boards

- BBC micro:bit (v1)
- BBC micro:bit (v2)

## Description

This library provides a simple interface to control the 5x5 LED matrix on BBC micro:bit boards. It supports Adafruit GFX drawing functions including pixels, lines, rectangles, circles, triangles, and text scrolling. Preset icons (heart, smile, yes/no) are also available.

## Quick Start

1. Initialize the matrix with `microbit_matrix_begin` block
2. Use drawing blocks to display shapes, icons, or text
3. Coordinates range from 0-4 (x and y)