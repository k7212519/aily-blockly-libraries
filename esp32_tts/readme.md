# ESP32 Offline Chinese TTS

Offline Chinese speech synthesis for ESP32-S3 with I2S output, pinyin, payment announcements, and six speed levels.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-esp32-tts |
| Version | 0.3.1 |
| Author | tts_esp32 contributors |
| Source | https://github.com/coloz/ESP32_TTS_arduino |
| License | Apache-2.0 |

## Supported Boards

ESP32-S3 boards with at least 8 MB flash and Arduino-ESP32 3.3.8+.

## Description

Embeds a Xiaoxin voice model and streams 16 kHz, 16-bit mono PCM to an I2S DAC or amplifier. The package installs a matching 8 MB partition table.

## Quick Start

1. Add the initialization block in `arduino_setup()` and set BCLK, LRCLK, DOUT, and optional MCLK (`-1` when unused).
2. Connect a text, pinyin, or payment announcement block. Calls are blocking; use the status and error blocks for diagnostics.
