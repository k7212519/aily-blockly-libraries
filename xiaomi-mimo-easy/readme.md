# Xiaomi MiMo AI

ESP32 library for Xiaomi MiMo text, vision, ASR, and I2S TTS workflows.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-xiaomi-mimo |
| Version | 1.0.0 |
| Author | Xiaomi |
| Source | https://mimo.mi.com/docs/zh-CN/quick-start/summary/model |
| License | MIT |

## Supported Boards

ESP32 Arduino Core 3.3.10; compiled on ESP32-S3 Dev Module and AI Thinker ESP32-CAM.

## Description

Provides MiMo V2.5 chat, web search, vision, ASR, and TTS. Camera helpers support JPEG/RGB565 sensors; audio supports I2S mic/amp and ES8311 codec modules.

## Quick Start

1. Connect Wi-Fi, initialize MiMo with an API key, then use the chat block.
2. For vision, initialize a supported camera profile and use "capture and ask".
3. For speech, initialize I2S mic/amp or ES8311, then use ASR/TTS blocks.
