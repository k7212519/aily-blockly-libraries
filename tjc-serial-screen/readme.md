# 淘晶驰串口屏

Blockly blocks for controlling 淘晶驰 serial HMI screens from Arduino-compatible boards.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-tjc-serial-screen |
| Version | 1.0.0 |
| Author | TJC / 淘晶驰 |
| Source | http://wiki.tjc1688.com/ |
| License | Documentation/examples by TJC; library glue MIT |

## Supported Boards

Arduino AVR/MegaAVR, ESP32, ESP8266, Renesas UNO R4 WiFi, and RP2040 with a compatible UART.

## Description

The library sends 淘晶驰 ASCII commands with the required `FF FF FF` terminator. It provides hardware and software serial initialization, page and component control, brightness, generic commands, `bkcmd`, and basic return-frame parsing.

## Quick Start

1. Connect screen TX to MCU RX, screen RX to MCU TX, and share GND.
2. Add a hardware or software serial initialization block at `115200` baud.
3. Add a page, property, or generic command block. Use UTF-8 screen projects for Chinese text.
