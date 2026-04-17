# ES8311 音频编解码器

ESP32 I2S 音频录音与播放库，基于 ES8311Audio 类库封装。

## Library Info
- **Name**: @aily-project/lib-es8311
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `es8311_init` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(dropdown) | `es8311_init("audio", Wire, "0x18")` | `ES8311Audio audio; audio.beginI2C(Wire, 0x18);` |
| `es8311_i2s_config` | Statement | VAR(field_input), MCK(dropdown), BCK(dropdown), WS(dropdown), DOUT(dropdown), DIN(dropdown), DURATION(input_value) | `es8311_i2s_config("audio", 46, 39, 2, 38, 40, math_number(5))` | `audio.beginI2S(46,39,2,38,40,5);` |
| `es8311_record` | Statement | VAR(field_variable) | `es8311_record($audio)` | `audio.record();` |
| `es8311_play` | Statement | VAR(field_variable) | `es8311_play($audio)` | `audio.play();` |
| `es8311_play_loop` | Statement | VAR(field_variable) | `es8311_play_loop($audio)` | `audio.playLoop();` |
| `es8311_stop` | Statement | VAR(field_variable) | `es8311_stop($audio)` | `audio.stop();` |
| `es8311_has_recording` | Value(Boolean) | VAR(field_variable) | `es8311_has_recording($audio)` | `audio.hasRecording()` |
| `es8311_set_volume` | Statement | VAR(field_variable), VOLUME(field_number) | `es8311_set_volume($audio, 80)` | `audio.setVolume(80);` |
| `es8311_set_mic_gain` | Statement | VAR(field_variable), GAIN(field_dropdown) | `es8311_set_mic_gain($audio, "3")` | `audio.setMicGain(3);` |
| `es8311_mute` | Statement | VAR(field_variable), MODE(field_dropdown) | `es8311_mute($audio, "1")` | `audio.mute(1);` |
| `es8311_alc_enable` | Statement | VAR(field_variable), ENABLE(field_dropdown) | `es8311_alc_enable($audio, "true")` | `audio.alcEnable(true);` |
| `es8311_sound_detected` | Value(Boolean) | VAR(field_variable), THRESHOLD(field_number) | `es8311_sound_detected($audio, 30)` | `audio.soundDetected(30)` |
| `es8311_record_slot` | Statement | VAR(field_variable), SLOT(field_dropdown) | `es8311_record_slot($audio, "0")` | `audio.recordSlot(0);` |
| `es8311_play_slot` | Statement | VAR(field_variable), SLOT(field_dropdown) | `es8311_play_slot($audio, "0")` | `audio.playSlot(0);` |
| `es8311_play_tone` | Statement | VAR(field_variable), FREQ(field_number), DURATION(field_number) | `es8311_play_tone($audio, 1000, 500)` | `audio.playTone(1000, 500);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| WIRE | ${board.i2c} | I2C总线选择（由开发板配置自动填充） |
| ADDRESS | 0x18, 0x30 | 0x18(默认) / 0x30 |
| MCK/BCK/WS/DOUT/DIN | ${board.digitalPins} | I2S引脚，从开发板配置获取 |
| DURATION | Number | 录音时长（秒），默认5 |
| VOLUME | Number(0~100) | 输出音量百分比，默认80 |
| GAIN | 0, 1, 2, 3, 4, 5, 6, 7 | 0dB / +6dB / +12dB / +18dB / +24dB / +30dB / +36dB / +42dB |
| THRESHOLD | Number(0~100) | 声音检测阈值，默认30 |
| MODE | 0, 1, 2, 3 | 取消静音 / 输出静音 / 麦克风静音 / 全部静音 |
| ENABLE | true, false | 开启ALC / 关闭ALC |
| SLOT | 0, 1, 2, 3 | 录音槽位编号 |
| FREQ | Number | 提示音频率(Hz)，默认1000 |

## ABS Examples

### Basic Usage
```
arduino_setup()
    es8311_init("audio", Wire, "0x18")
    es8311_i2s_config("audio", 46, 39, 2, 38, 40, math_number(5))
    es8311_set_volume($audio, 80)
    es8311_set_mic_gain($audio, "3")

arduino_loop()
    es8311_record($audio)
    time_delay(math_number(200))
    es8311_play($audio)
    time_delay(math_number(1000))
```

### Sound Detection
```
arduino_loop()
    controls_if()
        @IF0: es8311_sound_detected($audio, 30)
        @DO0:
            es8311_record($audio)
            es8311_play($audio)
```

## Notes

1. **Variable Creation**: `es8311_init("varName", ...)` creates variable `$varName`; reference with `$varName`
2. **Initialization**: Place both `es8311_init`(I2C) and `es8311_i2s_config`(I2S) inside `arduino_setup()`
3. **I2C Init**: Library auto-handles `Wire.begin()`, no need to call manually
4. **Parameter Order**: Follows `block.json` args0 order
5. **Memory**: Recording uses ~32KB/sec, max ~10 seconds recommended on ESP32