# ES8311 音频编解码器

ESP32 I2S 音频录音、播放与云端音频理解库，基于 `ES8311Audio` 类封装。

## Library Info
- **Name**: `@aily-project/lib-es8311`
- **Version**: `1.0.0`

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `es8311_init` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(dropdown) | `es8311_init("audio", Wire, "0x18")` | `ES8311Audio audio; audio.beginI2C(Wire, 0x18);` |
| `es8311_i2s_config` | Statement | VAR(field_input), MCK(dropdown), BCK(dropdown), WS(dropdown), DOUT(dropdown), DIN(dropdown), DURATION(input_value) | `es8311_i2s_config("audio", 46, 39, 2, 38, 40, math_number(5))` | `audio.beginI2S(46, 39, 2, 38, 40, 5);` |
| `es8311_record` | Statement | VAR(field_variable) | `es8311_record($audio)` | `audio.record();` |
| `es8311_play` | Statement | VAR(field_variable) | `es8311_play($audio)` | `audio.play();` |
| `es8311_play_loop` | Statement | VAR(field_variable) | `es8311_play_loop($audio)` | `audio.playLoop();` |
| `es8311_stop` | Statement | VAR(field_variable) | `es8311_stop($audio)` | `es8311_qwen_stop_requested = true; audio.stop();` |
| `es8311_has_recording` | Value(Boolean) | VAR(field_variable) | `es8311_has_recording($audio)` | `audio.hasRecording()` |
| `es8311_set_volume` | Statement | VAR(field_variable), VOLUME(field_number) | `es8311_set_volume($audio, 80)` | `audio.setVolume(80);` |
| `es8311_set_mic_gain` | Statement | VAR(field_variable), GAIN(field_dropdown) | `es8311_set_mic_gain($audio, "3")` | `audio.setMicGain(3);` |
| `es8311_mute` | Statement | VAR(field_variable), MODE(field_dropdown) | `es8311_mute($audio, "1")` | `audio.mute(1);` |
| `es8311_alc_enable` | Statement | VAR(field_variable), ENABLE(field_dropdown) | `es8311_alc_enable($audio, "true")` | `audio.alcEnable(true);` |
| `es8311_sound_detected` | Value(Boolean) | VAR(field_variable), THRESHOLD(field_number) | `es8311_sound_detected($audio, 30)` | `audio.soundDetected(30)` |
| `es8311_record_slot` | Statement | VAR(field_variable), SLOT(field_dropdown) | `es8311_record_slot($audio, "0")` | `audio.recordSlot(0);` |
| `es8311_play_slot` | Statement | VAR(field_variable), SLOT(field_dropdown) | `es8311_play_slot($audio, "0")` | `audio.playSlot(0);` |
| `es8311_play_tone` | Statement | VAR(field_variable), FREQ(field_number), DURATION(field_number) | `es8311_play_tone($audio, 1000, 500)` | `audio.playTone(1000, 500);` |
| `es8311_qwen_config` | Statement | API_KEY(input_value), BASE_URL(input_value) | `es8311_qwen_config(text("sk-xxx"), text("https://dashscope.aliyuncs.com/compatible-mode/v1"))` | `es8311_qwen_api_key = ...; es8311_qwen_base_url = ...;` |
| `es8311_qwen_audio_chat` | Statement | VAR(field_variable), PROMPT(input_value), MODEL(dropdown) | `es8311_qwen_audio_chat($audio, text("这段音频在说什么"), qwen3.5-omni-plus)` | `es8311_qwen_audio_chat_request(audio, "qwen3.5-omni-plus", ...);` |
| `es8311_qwen_get_last_text` | Value(String) | (none) | `es8311_qwen_get_last_text()` | `es8311_qwen_last_text` |
| `es8311_qwen_get_last_success` | Value(Boolean) | (none) | `es8311_qwen_get_last_success()` | `es8311_qwen_last_success` |
| `es8311_qwen_get_last_error` | Value(String) | (none) | `es8311_qwen_get_last_error()` | `es8311_qwen_last_error` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | `0x18`, `0x30` | I2C 地址 |
| GAIN | `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7` | 0dB / +6dB / +12dB / +18dB / +24dB / +30dB / +36dB / +42dB |
| MODE | `0`, `1`, `2`, `3` | 取消静音 / 输出静音 / 麦克风静音 / 全部静音 |
| ENABLE | `true`, `false` | 开启 / 关闭自动增益控制 |
| SLOT | `0`, `1`, `2`, `3` | 录音槽位 |
| MODEL | `qwen3.5-omni-plus`, `qwen-omni-turbo`, `qwen3-omni-flash` | 云端音频理解模型 |

## ABS Examples

### 本地录音与播放
```text
arduino_setup()
    es8311_init("audio", Wire, "0x18")
    es8311_i2s_config("audio", 46, 39, 2, 38, 40, math_number(5))
    es8311_set_volume($audio, 80)
    es8311_set_mic_gain($audio, "3")

arduino_loop()
    es8311_record($audio)
    es8311_play($audio)
    time_delay(math_number(1000))
```

### 云端音频理解
```text
arduino_setup()
    es8311_init("audio", Wire, "0x18")
    es8311_i2s_config("audio", 46, 39, 2, 38, 40, math_number(5))
    es8311_qwen_config(text("sk-xxx"), text("https://dashscope.aliyuncs.com/compatible-mode/v1"))

arduino_loop()
    es8311_record($audio)
    es8311_qwen_audio_chat($audio, text("这段音频在说什么"), qwen3.5-omni-plus)
    serial_println(Serial, es8311_qwen_get_last_text())
```

## Notes

1. **初始化顺序**: 必须先调用 `es8311_init`，再调用 `es8311_i2s_config`。
2. **WiFi 前置条件**: `es8311_qwen_audio_chat` 不会负责联网，调用前必须先通过现有 WiFi 积木完成连接。
3. **录音来源**: `es8311_qwen_audio_chat` 只会上传当前已录好的音频缓冲，不会自动重新录音。
4. **上传格式**: 当前录音会按 `16kHz / 16bit / mono` 在内存中封装为 WAV 后再 Base64 上传。
5. **语音回复播放**: 云端返回音频会实时播放，并在结束后恢复本地 ES8311 的 `16kHz` I2S 配置。
6. **停止行为**: `es8311_stop($audio)` 会同时中断本地录音/播放和正在进行的 AI 语音回复播放。
7. **结果缓存**: 仅缓存最后一次文本结果、成功状态和错误信息，不缓存 AI 回复音频供二次重放。
