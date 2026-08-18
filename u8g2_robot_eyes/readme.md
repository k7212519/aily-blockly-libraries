# U8g2 Robot Eyes

Smooth animated square or round monochrome robot eyes for full-buffer U8g2 displays.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-u8g2-robot-eyes |
| Version | 1.2.16 |
| Author | U8g2RobotEyes contributors |
| Source | https://github.com/coloz/U8g2RobotEyes |
| License | MIT |

## Supported Boards

Arduino-compatible boards supported by U8g2; ESP32, ESP32-S3 and RP2040 are recommended.

## Description

Provides 20 expressions, smooth morphing, blinking, gaze animation, idle motion, and square/round compile-time themes for 128×64 monochrome displays.

## Quick Start

Create and initialize a full-buffer U8g2 display first. Add the initialization block, choose a theme, then use expression and gaze blocks. Disable automatic loop updates when composing with other U8g2 content through `drawToBuffer`.
