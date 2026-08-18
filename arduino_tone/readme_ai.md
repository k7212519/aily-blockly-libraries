# ArduinoTone

Sound function, which can be used to control the passive buzzer to emit sounds of specified frequencies.

## Library Info
- **Name**: @aily-project/lib-core-tone
- **Version**: 0.0.2

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `io_tone` | Statement | TONEPIN(dropdown), FREQUENCY(input_value) | `io_tone(TONEPIN, math_number(0))` | `tone(TONEPIN,1);` |
| `io_tone_duration` | Statement | TONEPIN(dropdown), FREQUENCY(input_value), DURATION(input_value) | `io_tone_duration(TONEPIN, math_number(0), math_number(1000))` | `tone(TONEPIN,1,1); ↵ delay(1);` |
| `io_system_sound` | Statement | TONEPIN(dropdown), SOUND_TYPE(dropdown) | `io_system_sound(TONEPIN, startup)` | `tone(TONEPIN,523,200); ↵ delay(200); ↵ tone(TONEPIN,659,200); ↵ delay(200); ↵ tone(TONEPIN,784,400); ↵ delay(400); ↵ noTone(TONEPIN);` |
| `io_note` | Value | NOTE(dropdown) | `io_note("261")` | `261` |
| `io_music` | Statement | TONEPIN(dropdown), MUSIC_TYPE(dropdown) | `io_music(TONEPIN, twinkle)` | `tone(TONEPIN,262,500); ↵ delay(500); ↵ tone(TONEPIN,262,500); ↵ delay(500); ↵ tone(TONEPIN,392,500); ↵ delay(500); ↵ tone(TONEPIN,392,500); ↵ delay(500); ↵ tone(TONEPIN,440,500); ↵ delay(500); ↵ tone(TONEPIN,440,500); ↵ delay(500); ↵ tone(TONEPIN,392,1000); ↵ delay(1000); ↵ tone(TONEPIN,349,500); ↵ delay(500); ↵ tone(TONEPIN,349,500); ↵ delay(500); ↵ tone(TONEPIN,330,500); ↵ delay(500); ↵ tone(TONEPIN,330,500); ↵ delay(500); ↵ tone(TONEPIN,294,500); ↵ delay(500); ↵ tone(TONEPIN,294,500); ↵ delay(500); ↵ tone(TONEPIN,262,1000); ↵ delay(1000); ↵ noTone(TONEPIN);` |
| `io_notone` | Statement | TONEPIN(dropdown) | `io_notone(TONEPIN)` | `noTone(TONEPIN);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SOUND_TYPE | startup, success, error, warning, notification, beep, doorbell, alarm, coin, powerdown | io_system_sound |
| NOTE | 261, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494, 523, 587, 659, 698, 784, 880, 988, 0 | io_note |
| MUSIC_TYPE | twinkle, birthday, castle, mary, joy, mother, bee, tiger | io_music |

## ABS Examples

### Basic Usage
```
arduino_setup()
    io_tone(TONEPIN, math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, io_note("261"))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
