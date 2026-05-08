# Bluefruit52Lib

Bluefruit-compatible BLE blocks for the XIAO nRF54L15 clean core.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-bluefruit52lib |
| Version | 0.6.48 |
| Author | lolren |
| Source | https://github.com/lolren/nrf54-arduino-core |
| License | Not specified |

## Supported Boards

- XIAO nRF54L15 clean core (`nrf54l15clean:nrf54l15clean`)

## Description

This library exposes the Bluefruit-style BLE API as Aily Blockly blocks. It covers BLE initialization, advertising, BLE UART, custom GATT services, scanning/central mode, HID keyboard/mouse actions, and beacon payloads.

## Quick Start

1. Add `bluefruit52_bleuart_peripheral_quick(text("Bluefruit52-UART"))` in `arduino_setup()`.
2. Use the quick receive/send blocks in `arduino_loop()` to echo BLE UART data.
