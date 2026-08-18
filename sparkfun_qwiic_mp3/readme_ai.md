# SparkFun Qwiic MP3 Trigger

Blockly wrapper for SparkFun Qwiic MP3 Trigger (I2C MP3 playback control).

## Library Info
- **Name**: @aily-project/lib-sparkfun-qwiic-mp3
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `qwiic_mp3_init` | Statement | VAR(field_input) | `qwiic_mp3_init("mp3")` | `mp3.begin();` |
| `qwiic_mp3_play_track` | Statement | VAR(field_variable), TRACK(input_value) | `qwiic_mp3_play_track($mp3, math_number(0))` | `mp3.playTrack(1);` |
| `qwiic_mp3_play_file` | Statement | VAR(field_variable), FILENUM(input_value) | `qwiic_mp3_play_file($mp3, math_number(0))` | `mp3.playFile(1);` |
| `qwiic_mp3_play_next` | Statement | VAR(field_variable) | `qwiic_mp3_play_next($mp3)` | `mp3.playNext();` |
| `qwiic_mp3_play_prev` | Statement | VAR(field_variable) | `qwiic_mp3_play_prev($mp3)` | `mp3.playPrevious();` |
| `qwiic_mp3_pause` | Statement | VAR(field_variable) | `qwiic_mp3_pause($mp3)` | `mp3.pause();` |
| `qwiic_mp3_stop` | Statement | VAR(field_variable) | `qwiic_mp3_stop($mp3)` | `mp3.stop();` |
| `qwiic_mp3_set_volume` | Statement | VAR(field_variable), VOLUME(input_value) | `qwiic_mp3_set_volume($mp3, math_number(0))` | `mp3.setVolume(1);` |
| `qwiic_mp3_is_playing` | Value | VAR(field_variable) | `qwiic_mp3_is_playing($mp3)` | `mp3.isPlaying()` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    qwiic_mp3_init("mp3")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, qwiic_mp3_is_playing($mp3))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `qwiic_mp3_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
