# ESP32 Offline Chinese TTS

ABS reference for the ESP32-S3 offline Chinese TTS library and its I2S output workflow.

## Library Info
- **Name**: @aily-project/lib-esp32-tts
- **Version**: 0.3.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_tts_init` | Statement | VAR(field_input), MODEL(dropdown), BCLK(input_value), LRCLK(input_value), DOUT(input_value), MCLK(input_value) | `esp32_tts_init("tts", 0, math_number(5), math_number(6), math_number(7), math_number(-1))` | `tts_i2s.setPins(1, 1, 1, -1, 1); ↵ if (!tts_i2s.begin(I2S_MODE_STD, ESP32TTS::sampleRate, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_MONO, I2S_STD_SLOT_LEFT)) { ↵ Serial.println("ESP32TTS: I2S initialization failed"); ↵ } else if (!tts.begin()) { ↵ Serial.printf("ESP32TTS initialization failed: %s\n", tts.lastErrorMessage()); ↵ }` |
| `esp32_tts_speak` | Statement | VAR(field_variable), TEXT(input_value) | `esp32_tts_speak($tts, text("你好"))` | `if (!tts.speak(String("value").c_str(), tts_i2s)) { ↵ Serial.printf("ESP32TTS speak failed: %s\n", tts.lastErrorMessage()); ↵ }` |
| `esp32_tts_speak_pinyin` | Statement | VAR(field_variable), PINYIN(input_value) | `esp32_tts_speak_pinyin($tts, text("da4 jia1 hao3"))` | `if (!tts.speakPinyin(String("value").c_str(), tts_i2s)) { ↵ Serial.printf("ESP32TTS pinyin failed: %s\n", tts.lastErrorMessage()); ↵ }` |
| `esp32_tts_speak_money` | Statement | VAR(field_variable), YUAN(input_value), JIAO(input_value), FEN(input_value), MODE(dropdown) | `esp32_tts_speak_money($tts, math_number(72), math_number(1), math_number(0), ESP32TTSPayMode::NumberOnly)` | `if (!tts.speakMoney(1, 1, 1, ESP32TTSPayMode::NumberOnly, tts_i2s)) { ↵ Serial.printf("ESP32TTS money failed: %s\n", tts.lastErrorMessage()); ↵ }` |
| `esp32_tts_set_speed` | Statement | VAR(field_variable), SPEED(dropdown) | `esp32_tts_set_speed($tts, 3)` | `if (!tts.setSpeed(0)) { ↵ Serial.printf("ESP32TTS speed failed: %s\n", tts.lastErrorMessage()); ↵ }` |
| `esp32_tts_get_speed` | Value Number | VAR(field_variable) | `esp32_tts_get_speed($tts)` | `tts.speed()` |
| `esp32_tts_is_ready` | Value Boolean | VAR(field_variable) | `esp32_tts_is_ready($tts)` | `tts.isReady()` |
| `esp32_tts_is_speaking` | Value Boolean | VAR(field_variable) | `esp32_tts_is_speaking($tts)` | `tts.isSpeaking()` |
| `esp32_tts_last_error` | Value Number | VAR(field_variable) | `esp32_tts_last_error($tts)` | `static_cast<uint8_t>(tts.lastError())` |
| `esp32_tts_last_error_message` | Value String | VAR(field_variable) | `esp32_tts_last_error_message($tts)` | `String(tts.lastErrorMessage())` |
| `esp32_tts_stop` | Statement | VAR(field_variable) | `esp32_tts_stop($tts)` | `tts.stop();` |
| `esp32_tts_end` | Statement | VAR(field_variable) | `esp32_tts_end($tts)` | `if (!tts.end()) { ↵ Serial.printf("ESP32TTS end failed: %s\n", tts.lastErrorMessage()); ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODEL | `0`, `1` | Small model (default, about 2.78 MiB) or standard model (about 3.64 MiB). The choice sets a compile-time macro. |
| MODE | `ESP32TTSPayMode::NumberOnly`, `ESP32TTSPayMode::Alipay`, `ESP32TTSPayMode::WeChat` | Amount only, Alipay received, or WeChat Pay received wording. |
| SPEED | `0`, `1`, `2`, `3`, `4`, `5` | Slowest through fastest; default is 3. |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_tts_init("tts", 0, math_number(5), math_number(6), math_number(7), math_number(-1))
    esp32_tts_set_speed($tts, 3)
    esp32_tts_speak($tts, text("欢迎使用离线语音合成"))

arduino_loop()
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_tts_init("varName", ...)` creates `$varName` and an internal `${varName}_i2s` output object.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Hardware**: only ESP32-S3 is supported. Use at least 8 MB flash and Arduino-ESP32 3.3.8+.
4. **Audio**: output is fixed at 16 kHz, signed 16-bit, mono PCM. MCLK may be `-1` for devices such as MAX98357A.
5. **Blocking**: synthesis calls block. `esp32_tts_stop` is useful from another FreeRTOS task, not after a blocking call in the same task.
6. **Partition setup**: package installation copies `partitions.csv` when absent and selects an 8 MB custom layout with a 6.6875 MiB app partition.
