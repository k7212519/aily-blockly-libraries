# speech synthesis module (TTS)

Easy Space speech synthesis module library (V2.0) supports text-to-speech playback, cache playback, playback process control, and communicates through I2C interface

## Library Info
- **Name**: @aily-project/lib-emakefun-tts
- **Version**: 2.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `emakefun_tts_init` | Statement | VAR(field_input), I2C_ADDRESS(dropdown), WIRE(dropdown) | `emakefun_tts_init("tts", "0x40", WIRE)` | `tts.Initialize();` |
| `emakefun_tts_play` | Statement | VAR(field_variable), TEXT(input_value) | `emakefun_tts_play($tts, text("value"))` | `tts.Play("value");` |
| `emakefun_tts_push_cache` | Statement | VAR(field_variable), TEXT(input_value), CACHE_INDEX(input_value) | `emakefun_tts_push_cache($tts, text("value"), math_number(0))` | `tts.PushTextToCache("value", 1);` |
| `emakefun_tts_play_cache` | Statement | VAR(field_variable), COUNT(input_value) | `emakefun_tts_play_cache($tts, math_number(0))` | `tts.PlayFromCache(emakefun::Tts::kUtf8, 1);` |
| `emakefun_tts_stop` | Statement | VAR(field_variable) | `emakefun_tts_stop($tts)` | `tts.Stop();` |
| `emakefun_tts_pause` | Statement | VAR(field_variable) | `emakefun_tts_pause($tts)` | `tts.Pause();` |
| `emakefun_tts_resume` | Statement | VAR(field_variable) | `emakefun_tts_resume($tts)` | `tts.Resume();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| I2C_ADDRESS | 0x40 | emakefun_tts_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    emakefun_tts_init("tts", "0x40", WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    emakefun_tts_play($tts, text("value"))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `emakefun_tts_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
