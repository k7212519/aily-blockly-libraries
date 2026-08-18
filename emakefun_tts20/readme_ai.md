# TTS20 speech synthesis module

Easy Space TTS20 speech synthesis module library supports text-to-speech playback, built-in prompt tone playback, playback process control, and communicates through I2C interface

## Library Info
- **Name**: @aily-project/lib-emakefun-tts20
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `emakefun_tts20_init` | Statement | VAR(field_input), I2C_ADDRESS(dropdown), WIRE(dropdown) | `emakefun_tts20_init("tts20", "0x40", WIRE)` | `tts20.Init();` |
| `emakefun_tts20_play` | Statement | VAR(field_variable), TEXT(input_value) | `emakefun_tts20_play($tts20, text("value"))` | `tts20.Play("value");` |
| `emakefun_tts20_play_sound` | Statement | VAR(field_variable), SOUND(dropdown) | `emakefun_tts20_play_sound($tts20, ring_1)` | `tts20.Play(F("ring_1"));` |
| `emakefun_tts20_is_busy` | Value | VAR(field_variable) | `emakefun_tts20_is_busy($tts20)` | `tts20.IsBusy()` |
| `emakefun_tts20_wait_finish` | Statement | VAR(field_variable) | `emakefun_tts20_wait_finish($tts20)` | `while (tts20.IsBusy());` |
| `emakefun_tts20_stop` | Statement | VAR(field_variable) | `emakefun_tts20_stop($tts20)` | `tts20.Stop();` |
| `emakefun_tts20_pause` | Statement | VAR(field_variable) | `emakefun_tts20_pause($tts20)` | `tts20.Pause();` |
| `emakefun_tts20_resume` | Statement | VAR(field_variable) | `emakefun_tts20_resume($tts20)` | `tts20.Resume();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| I2C_ADDRESS | 0x40 | emakefun_tts20_init |
| SOUND | ring_1, ring_2, ring_3, ring_4, ring_5, message_1, message_2, message_3, message_4, message_5, alert_1, alert_2, alert_3, alert_4, alert_5 | emakefun_tts20_play_sound |

## ABS Examples

### Basic Usage
```
arduino_setup()
    emakefun_tts20_init("tts20", "0x40", WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, emakefun_tts20_is_busy($tts20))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `emakefun_tts20_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
