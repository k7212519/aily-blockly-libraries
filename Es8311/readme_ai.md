# ES8311 Audio Codec

ES8311 audio codec driver library, supports I2S recording and playback, volume/gain control, sound detection, multi-slot recording

## Library Info
- **Name**: @aily-project/lib-es8311
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `es8311_init` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(dropdown) | `es8311_init("audio", WIRE, "0x18")` | `audio.beginI2C(WIRE, 0x18);` |
| `es8311_i2s_config` | Statement | VAR(field_input), MCK(dropdown), BCK(dropdown), WS(dropdown), DOUT(dropdown), DIN(dropdown), DURATION(input_value) | `es8311_i2s_config("audio", MCK, BCK, WS, DOUT, DIN, math_number(1000))` | `audio.beginI2S(MCK, BCK, WS, DOUT, DIN, 1);` |
| `es8311_record` | Statement | VAR(field_variable) | `es8311_record($audio)` | `audio.record();` |
| `es8311_record_start` | Statement | VAR(field_variable) | `es8311_record_start($audio)` | `audio.recordStart();` |
| `es8311_record_stop` | Statement | VAR(field_variable) | `es8311_record_stop($audio)` | `audio.recordStop();` |
| `es8311_is_recording` | Value | VAR(field_variable) | `es8311_is_recording($audio)` | `audio.isRecording()` |
| `es8311_is_speaking` | Value | VAR(field_variable) | `es8311_is_speaking($audio)` | `audio.isStreaming()` |
| `es8311_play` | Statement | VAR(field_variable) | `es8311_play($audio)` | `audio.play();` |
| `es8311_has_recording` | Value | VAR(field_variable) | `es8311_has_recording($audio)` | `audio.hasRecording()` |
| `es8311_set_volume` | Statement | VAR(field_variable), VOLUME(field_number) | `es8311_set_volume($audio, 80)` | `audio.setVolume(80);` |
| `es8311_set_mic_gain` | Statement | VAR(field_variable), GAIN(dropdown) | `es8311_set_mic_gain($audio, "0")` | `audio.setMicGain(0);` |
| `es8311_stop` | Statement | VAR(field_variable) | `es8311_stop($audio)` | `es8311_qwen_stop_requested = true; ↵ audio.stop();` |
| `es8311_sound_level` | Value | VAR(field_variable) | `es8311_sound_level($audio)` | `audio.getSoundLevel()` |
| `es8311_mute` | Statement | VAR(field_variable), MODE(dropdown) | `es8311_mute($audio, "0")` | `audio.mute(0);` |
| `es8311_play_tone` | Statement | VAR(field_variable), FREQ(field_number), DURATION(field_number) | `es8311_play_tone($audio, 1000, 500)` | `audio.playTone(1000, 500);` |
| `es8311_alc_enable` | Statement | VAR(field_variable), ENABLE(dropdown) | `es8311_alc_enable($audio, true)` | `audio.alcEnable(true);` |
| `es8311_record_slot` | Statement | VAR(field_variable), SLOT(dropdown) | `es8311_record_slot($audio, "0")` | `audio.recordSlot(0);` |
| `es8311_play_slot` | Statement | VAR(field_variable), SLOT(dropdown) | `es8311_play_slot($audio, "0")` | `audio.playSlot(0);` |
| `es8311_play_loop` | Statement | VAR(field_variable) | `es8311_play_loop($audio)` | `audio.playLoop();` |
| `es8311_stream_begin` | Statement | VAR(field_variable), RATE(dropdown) | `es8311_stream_begin($audio, "16000")` | `audio.streamBegin(16000);` |
| `es8311_stream_end` | Statement | VAR(field_variable) | `es8311_stream_end($audio)` | `audio.streamEnd();` |
| `es8311_stream_play_url` | Statement | VAR(field_variable), URL(input_value), RATE(dropdown) | `es8311_stream_play_url($audio, text("http://..."), "16000")` | `es8311_stream_play_url(audio, "value", 16000);` |
| `es8311_qwen_config` | Statement | API_KEY(input_value), BASE_URL(input_value) | `es8311_qwen_config(text("value"), text("value"))` | `es8311_qwen_api_key = "value"; ↵ es8311_qwen_base_url = "value"; ↵ es8311_qwen_last_success = false; ↵ es8311_qwen_last_error = ""; ↵ es8311_qwen_last_text = ""; ↵ es8311_qwen_stop_requested = false;` |
| `es8311_qwen_audio_chat` | Statement | VAR(field_variable), PROMPT(input_value), MODEL(dropdown), VOICE(dropdown), PLAY_MODE(dropdown) | `es8311_qwen_audio_chat($audio, text("value"), qwen3.5-omni-plus, Tina, WAIT)` | `es8311_qwen_audio_chat_request(audio, "qwen3.5-omni-plus", "value", "Tina", false);` |
| `es8311_qwen_get_last_text` | Value | (none) | `es8311_qwen_get_last_text()` | `es8311_qwen_last_text` |
| `es8311_qwen_get_last_success` | Value | (none) | `es8311_qwen_get_last_success()` | `es8311_qwen_last_success` |
| `es8311_qwen_get_last_error` | Value | (none) | `es8311_qwen_get_last_error()` | `es8311_qwen_last_error` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x18, 0x30 | es8311_init |
| GAIN | 0, 1, 2, 3, 4, 5, 6, 7 | es8311_set_mic_gain |
| MODE | 0, 1, 2, 3 | es8311_mute |
| ENABLE | true, false | es8311_alc_enable |
| SLOT | 0, 1, 2, 3 | es8311_record_slot, es8311_play_slot |
| RATE | 16000, 24000, 8000, 22050, 44100, 48000 | es8311_stream_begin, es8311_stream_play_url (source sample rate, resampled to 16kHz) |
| MODEL | qwen3.5-omni-plus, qwen-omni-turbo, qwen3-omni-flash | es8311_qwen_audio_chat |
| VOICE | Tina, Cherry, Serena, Ethan, Chelsie | es8311_qwen_audio_chat (reply voice) |
| PLAY_MODE | WAIT, BACKGROUND | es8311_qwen_audio_chat (WAIT blocks until playback done; BACKGROUND returns after download, interrupt with es8311_stop) |

## ABS Examples

### Basic Usage
```
arduino_setup()
    es8311_init("audio", WIRE, "0x18")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, es8311_has_recording($audio))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `es8311_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
