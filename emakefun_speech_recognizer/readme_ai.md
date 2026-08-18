# LD3320D speech recognition

Emakefun LD3320D speech recognition module library supports multiple modes such as automatic recognition, key triggering, keyword triggering, etc.

## Library Info
- **Name**: @aily-project/lib-emakefun-speech-recognizer
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `speech_recognizer_setup` | Statement | VAR(field_input), I2C_ADDRESS(field_input) | `speech_recognizer_setup("speechRecognizer", "0x30")` | `if (speechRecognizer.Initialize() != emakefun::SpeechRecognizer::kOK) { ↵ Serial.println(F("Speech recognizer initialization failed!")); ↵ while(1); ↵ }` |
| `speech_recognizer_set_mode` | Statement | VAR(field_variable), MODE(dropdown) | `speech_recognizer_set_mode($speechRecognizer, kRecognitionAuto)` | `speechRecognizer.SetRecognitionMode(emakefun::SpeechRecognizer::kRecognitionAuto);` |
| `speech_recognizer_set_timeout` | Statement | VAR(field_variable), TIMEOUT(input_value) | `speech_recognizer_set_timeout($speechRecognizer, math_number(1000))` | `speechRecognizer.SetTimeout(1);` |
| `speech_recognizer_add_keyword` | Statement | KEYWORD(input_value), INDEX(input_value), VAR(field_variable) | `speech_recognizer_add_keyword(text("value"), math_number(0), $speechRecognizer)` | `speechRecognizer.AddKeyword(1, "value");` |
| `speech_recognizer_recognize` | Value | VAR(field_variable) | `speech_recognizer_recognize($speechRecognizer)` | `speechRecognizer_result` |
| `speech_recognizer_get_event` | Value | VAR(field_variable) | `speech_recognizer_get_event($speechRecognizer)` | `speechRecognizer.GetEvent()` |
| `speech_recognizer_event_handler` | Hat | VAR(field_variable), EVENT(dropdown), HANDLER(input_statement) | `speech_recognizer_event_handler($speechRecognizer, kEventStartWaitingForTrigger)` | `if (speechRecognizer.GetEvent() == emakefun::SpeechRecognizer::kEventStartWaitingForTrigger) { ↵ }` |
| `speech_recognizer_check_result` | Value | RESULT(input_value), INDEX(input_value) | `speech_recognizer_check_result(math_number(0), math_number(0))` | `(1 == 1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | kRecognitionAuto, kButtonTrigger, kKeywordTrigger, kKeywordOrButtonTrigger | speech_recognizer_set_mode |
| EVENT | kEventStartWaitingForTrigger, kEventButtonTriggered, kEventKeywordTriggered, kEventStartRecognizing, kEventSpeechRecognized, kEventSpeechRecognitionTimedOut | speech_recognizer_event_handler |

## ABS Examples

### Basic Usage
```
arduino_setup()
    speech_recognizer_setup("speechRecognizer", "0x30")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, speech_recognizer_recognize($speechRecognizer))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `speech_recognizer_setup("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
