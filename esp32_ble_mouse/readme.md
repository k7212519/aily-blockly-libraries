# BLE bluetooth mouse (ESP32 SDK)

BLE mouse library for ESP32, supporting mouse movement, click, wheel and other operations

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-esp32-ble-mouse |
| Version | 2.0.0 |
| Author | ailyProject |
| Source | ESP32 Arduino SDK 3.3.11 BLE |
| License | Original license |

## Supported Boards

ESP32

## Description

BLE mouse library for ESP32, supporting mouse movement, click, wheel and other operations

## BLE Backend

Uses `BLEDevice` and `BLEHIDDevice` from ESP32 Arduino SDK 3.3.11. The package does not bundle NimBLE-Arduino. The SDK uses Bluedroid on the classic ESP32 and its built-in NimBLE host on newer ESP32 targets.

## Quick Start

1. Enable `@aily-project/lib-esp32-ble-mouse` in Aily Blockly.
2. Add the library blocks, initialize hardware in `arduino_setup()`, then use read/write blocks in `arduino_loop()`.
