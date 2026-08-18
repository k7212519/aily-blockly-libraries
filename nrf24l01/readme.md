# nRF24L01 Radio

RF24-based Aily Blockly driver for nRF24L01(+) 2.4 GHz transceivers.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-nrf24l01 |
| Version | 0.1.0 |
| Author | TMRh20 / Aily Project |
| Source | https://github.com/nRF24/RF24 |
| Bundled driver | RF24 1.6.0 |
| License | GPL-2.0 |

## Supported Boards

Arduino-compatible boards with hardware SPI: AVR, SAMD, ESP32, ESP8266, UNO R4, RP2040, and STM32.

## Description

Blocks cover initialization, radio settings, addresses, retries, auto ACK, listening, text and number payloads, status, and low power.

## Quick Start

Configure both radios with the same channel and data rate. Set the transmitter address, open the same address on receive pipe 1, start listening on the receiver, then use matching text/text or number/number blocks.

## Wiring

Use the board's hardware SPI pins plus the selected CE and CSN pins. Connect module VCC to **3.3 V only**. Payloads are limited to 32 bytes.
