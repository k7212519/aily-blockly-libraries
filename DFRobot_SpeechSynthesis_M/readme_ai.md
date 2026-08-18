# Speech synthesis module

DFRobot speech synthesis module library supports Chinese and English mixed broadcasting, multiple speakers, volume/speed/intonation adjustment, and supports I2C and serial communication.

## Library Info
- **Name**: @aily-project/lib-speech-synthesis
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `speech_init_i2c` | Statement | VAR(field_input), WIRE(dropdown), VERSION(dropdown) | `speech_init_i2c("tts", WIRE, eV1)` | `tts.begin(tts.eV1);` |
| `speech_init_uart` | Statement | VAR(field_input), SERIAL(dropdown), VERSION(dropdown) | `speech_init_uart("tts", SERIAL, eV1)` | `DFRobot_SpeechSynthesis_UART tts; ↵ SERIAL.begin(115200); ↵ tts.begin(tts.eV1, SERIAL);` |
| `speech_speak` | Statement | VAR(field_variable), TEXT(input_value) | `speech_speak($tts, text("value"))` | `tts.speak("value");` |
| `speech_set_volume` | Statement | VAR(field_variable), VOLUME(dropdown) | `speech_set_volume($tts, "0")` | `tts.setVolume(0);` |
| `speech_set_speed` | Statement | VAR(field_variable), SPEED(dropdown) | `speech_set_speed($tts, "0")` | `tts.setSpeed(0);` |
| `speech_set_tone` | Statement | VAR(field_variable), TONE(dropdown) | `speech_set_tone($tts, "0")` | `tts.setTone(0);` |
| `speech_set_sound_type` | Statement | VAR(field_variable), TYPE(dropdown) | `speech_set_sound_type($tts, eFemale1)` | `tts.setSoundType(tts.eFemale1);` |
| `speech_set_english_pron` | Statement | VAR(field_variable), PRON(dropdown) | `speech_set_english_pron($tts, eWord)` | `tts.setEnglishPron(tts.eWord);` |
| `speech_set_language` | Statement | VAR(field_variable), LANG(dropdown) | `speech_set_language($tts, eAutoJudgel)` | `tts.setLanguage(tts.eAutoJudgel);` |
| `speech_set_digital_pron` | Statement | VAR(field_variable), PRON(dropdown) | `speech_set_digital_pron($tts, eAutoJudged)` | `tts.setDigitalPron(tts.eAutoJudged);` |
| `speech_set_style` | Statement | VAR(field_variable), STYLE(dropdown) | `speech_set_style($tts, eSmooth)` | `tts.setSpeechStyle(tts.eSmooth);` |
| `speech_enable_rhythm` | Statement | VAR(field_variable), ENABLE(dropdown) | `speech_enable_rhythm($tts, true)` | `tts.enableRhythm(true);` |
| `speech_enable_pinyin` | Statement | VAR(field_variable), ENABLE(dropdown) | `speech_enable_pinyin($tts, true)` | `tts.enablePINYIN(true);` |
| `speech_stop` | Statement | VAR(field_variable) | `speech_stop($tts)` | `tts.stopSynthesis();` |
| `speech_pause` | Statement | VAR(field_variable) | `speech_pause($tts)` | `tts.pauseSynthesis();` |
| `speech_resume` | Statement | VAR(field_variable) | `speech_resume($tts)` | `tts.recoverSynthesis();` |
| `speech_wait` | Statement | VAR(field_variable) | `speech_wait($tts)` | `tts.wait();` |
| `speech_reset` | Statement | VAR(field_variable) | `speech_reset($tts)` | `tts.reset();` |
| `speech_sleep` | Statement | VAR(field_variable) | `speech_sleep($tts)` | `tts.sleep();` |
| `speech_wakeup` | Statement | VAR(field_variable) | `speech_wakeup($tts)` | `tts.wakeup();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| VERSION | eV1, eV2 | speech_init_i2c, speech_init_uart |
| VOLUME | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | speech_set_volume |
| SPEED | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | speech_set_speed |
| TONE | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | speech_set_tone |
| TYPE | eFemale1, eMale1, eMale2, eFemale2, eDonaldDuck, eFemale3 | speech_set_sound_type |
| PRON | eWord, eAlphabet | speech_set_english_pron |
| LANG | eAutoJudgel, eChinesel, eEnglishl | speech_set_language |
| PRON | eAutoJudged, eNumber, eNumeric | speech_set_digital_pron |
| STYLE | eSmooth, eCaton | speech_set_style |
| ENABLE | true, false | speech_enable_rhythm, speech_enable_pinyin |

## ABS Examples

### Basic Usage
```
arduino_setup()
    speech_init_i2c("tts", WIRE, eV1)
    serial_begin(Serial, 9600)

arduino_loop()
    speech_init_uart("tts", SERIAL, eV1)
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `speech_init_i2c("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
