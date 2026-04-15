# ES8311 音频编解码

ES8311 I2S 音频编解码器 Blockly 库，支持录音、播放、音量调节和 WAV 文件保存。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-es8311 |
| Version | 1.0.0 |
| Source | 基于 ES8311 寄存器手册及 ESP32 I2S 驱动 |

## Supported Boards

- ESP32-S3（推荐）
- ESP32 系列（需支持 I2S）

## Description

ES8311 是一款低功耗高性能音频编解码器，通过 I2C 控制寄存器、I2S 传输音频数据。本库提供初始化、录音、播放、音量/增益调节、WAV 文件保存等功能。

## Quick Start

1. 拖入 `es8311_init` 块，配置 I2C 和 I2S 引脚
2. 在 loop 中使用 `es8311_record` 录音、`es8311_play` 播放
3. 可选：`es8311_save_wav` 保存录音到文件系统
