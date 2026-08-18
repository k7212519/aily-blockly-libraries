# ESP32 Audio I2S

Streaming audio decoder and I2S playback for PSRAM-equipped ESP32 boards.

## Library Info
- **Name**: @aily-project/lib-esp32-audio-i2s
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp_audio_init` | Statement | VAR(field_input), BCLK(dropdown), LRCLK(dropdown), DOUT(dropdown), VOLUME(input_value) | `esp_audio_init("audio", BCLK, LRCLK, DOUT, math_number(0))` | `Audio audio; ↵ audio.setPinout(BCLK, LRCLK, DOUT); ↵ audio.setVolume(1); ↵ audio.loop();` |
| `esp_audio_stream` | Statement | VAR(field_variable), URL(input_value) | `esp_audio_stream($audio, text("value"))` | `audio.connecttohost("value");` |
| `esp_audio_file` | Statement | VAR(field_variable), FS(dropdown), PATH(input_value) | `esp_audio_file($audio, SD, text("value"))` | `audio.connecttoFS(SD, "value");` |
| `esp_audio_control` | Statement | VAR(field_variable), ACTION(dropdown) | `esp_audio_control($audio, pauseResume)` | `audio.pauseResume();` |
| `esp_audio_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `esp_audio_set($audio, setVolume, math_number(0))` | `audio.setVolume(1);` |
| `esp_audio_state` | Value | VAR(field_variable), STATE(dropdown) | `esp_audio_state($audio, isRunning)` | `audio.isRunning()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| FS | SD, SD_MMC, SPIFFS, LittleFS | esp_audio_file |
| ACTION | pauseResume, stopSong | esp_audio_control |
| SETTING | setVolume, setBalance, setAudioPlayTime | esp_audio_set |
| STATE | isRunning, getAudioCurrentTime, getAudioFileDuration, getVolume, getBitRate, getSampleRate, getChannels | esp_audio_state |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp_audio_init("audio", BCLK, LRCLK, DOUT, math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp_audio_state($audio, isRunning))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp_audio_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
