# SparkFun MY1690 MP3 Decoder

Blockly wrapper for the SparkFun MY1690 serial MP3 decoder module.

## Library Info
- **Name**: @aily-project/lib-sparkfun-my1690
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `my1690_init` | Statement | VAR(field_input), SERIAL(dropdown) | `my1690_init("mp3", Serial)` | `Serial.begin(9600); ↵ mp3.begin(Serial);` |
| `my1690_play` | Statement | VAR(field_variable) | `my1690_play($mp3)` | `mp3.play();` |
| `my1690_pause` | Statement | VAR(field_variable) | `my1690_pause($mp3)` | `mp3.pause();` |
| `my1690_stop` | Statement | VAR(field_variable) | `my1690_stop($mp3)` | `mp3.stopPlaying();` |
| `my1690_next` | Statement | VAR(field_variable) | `my1690_next($mp3)` | `mp3.playNext();` |
| `my1690_previous` | Statement | VAR(field_variable) | `my1690_previous($mp3)` | `mp3.playPrevious();` |
| `my1690_play_track` | Statement | VAR(field_variable), TRACK(input_value) | `my1690_play_track($mp3, math_number(0))` | `mp3.playTrackNumber(1);` |
| `my1690_set_volume` | Statement | VAR(field_variable), VOLUME(input_value) | `my1690_set_volume($mp3, math_number(0))` | `mp3.setVolume(1);` |
| `my1690_volume_up` | Statement | VAR(field_variable) | `my1690_volume_up($mp3)` | `mp3.volumeUp();` |
| `my1690_volume_down` | Statement | VAR(field_variable) | `my1690_volume_down($mp3)` | `mp3.volumeDown();` |
| `my1690_set_eq` | Statement | VAR(field_variable), EQ(dropdown) | `my1690_set_eq($mp3, "0")` | `mp3.setEQ(0);` |
| `my1690_set_play_mode` | Statement | VAR(field_variable), MODE(dropdown) | `my1690_set_play_mode($mp3, "0")` | `mp3.setPlayMode(0);` |
| `my1690_get_status` | Value | VAR(field_variable) | `my1690_get_status($mp3)` | `mp3.getPlayStatus()` |
| `my1690_get_volume` | Value | VAR(field_variable) | `my1690_get_volume($mp3)` | `mp3.getVolume()` |
| `my1690_get_song_count` | Value | VAR(field_variable) | `my1690_get_song_count($mp3)` | `mp3.getSongCount()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SERIAL | Serial, Serial1, Serial2, Serial3 | my1690_init |
| EQ | 0, 1, 2, 3, 4, 5 | my1690_set_eq |
| MODE | 0, 1, 2, 3, 4 | my1690_set_play_mode |

## ABS Examples

### Basic Usage
```
arduino_setup()
    my1690_init("mp3", Serial)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, my1690_get_status($mp3))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `my1690_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
