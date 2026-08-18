# ggwave

Encode and decode short data messages as audible or ultrasonic waveforms.

## Library Info
- **Name**: @aily-project/lib-ggwave
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ggwave_init` | Statement | VAR(field_input), MODE(dropdown), RATE(input_value), FRAME(input_value), PAYLOAD(input_value) | `ggwave_init("ggwave", GGWAVE_OPERATING_MODE_RX_AND_TX, math_number(0), math_number(0), math_number(0))` | `ggwave_Instance ggwave = -1; ↵ uint8_t *ggwave_waveform = nullptr; ↵ int ggwave_waveform_bytes = 0; ↵ char ggwave_payload[257] = {0}; ↵ int ggwave_payload_length = 0; ↵ ggwave_Parameters ggwave_params = ggwave_getDefaultParameters(); ↵ ggwave_params.payloadLength = 1; ↵ ggwave_params.sampleRateInp = 1; ↵ ggwave_params.sampleRateOut = 1; ↵ ggwave_params.sampleRate = 1; ↵ ggwave_params.samplesPerFrame = 1; ↵ ggwave_params.sampleFormatInp = GGWAVE_SAMPLE_FORMAT_I16; ↵ ggwave_params.sampleFormatOut = GGWAVE_SAMPLE_FORMAT_I16; ↵ ggwave_params.operatingMode = GGWAVE_OPERATING_MODE_RX_AND_TX; ↵ ggwave = ggwave_init(ggwave_params);` |
| `ggwave_encode` | Statement | VAR(field_variable), TEXT(input_value), PROTOCOL(dropdown), VOLUME(input_value) | `ggwave_encode($ggwave, text("value"), GGWAVE_PROTOCOL_AUDIBLE_NORMAL, math_number(0))` | `{ ↵ String _ailyGgText = String("value"); ↵ int _ailyGgNeeded = ggwave_encode(ggwave, _ailyGgText.c_str(), _ailyGgText.length(), GGWAVE_PROTOCOL_AUDIBLE_NORMAL, 1, NULL, 1); ↵ if (_ailyGgNeeded > 0) { ↵ uint8_t *_ailyGgBuffer = (uint8_t*)realloc(ggwave_waveform, _ailyGgNeeded); ↵ if (_ailyGgBuffer) { ggwave_waveform = _ailyGgBuffer; ggwave_waveform_bytes = ggwave_encode(ggwave, _ailyGgText.c_str(), _ailyGgText.length(), GGWAVE_PROTOCOL_AUDIBLE_NORMAL, 1, ggwave_waveform, 0); } ↵ } ↵ }` |
| `ggwave_waveform` | Value | VAR(field_variable), DATA(dropdown) | `ggwave_waveform($ggwave, waveform)` | `ggwave_waveform` |
| `ggwave_decode` | Value | VAR(field_variable), BUFFER(field_input), BYTES(input_value) | `ggwave_decode($ggwave, "audioBuffer", math_number(0))` | `(ggwave_payload_length = ggwave_ndecode(ggwave, audioBuffer, 1, ggwave_payload, sizeof(ggwave_payload) - 1), ggwave_payload[ggwave_payload_length > 0 ? ggwave_payload_length : 0] = 0, ggwave_payload_length)` |
| `ggwave_decoded` | Value | VAR(field_variable), DATA(dropdown) | `ggwave_decoded($ggwave, text)` | `String(ggwave_payload)` |
| `ggwave_free` | Statement | VAR(field_variable) | `ggwave_free($ggwave)` | `ggwave_free(ggwave); ↵ ggwave = -1; ↵ free(ggwave_waveform); ↵ ggwave_waveform = nullptr; ↵ ggwave_waveform_bytes = 0;` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | GGWAVE_OPERATING_MODE_RX_AND_TX, GGWAVE_OPERATING_MODE_TX, GGWAVE_OPERATING_MODE_RX | ggwave_init |
| PROTOCOL | GGWAVE_PROTOCOL_AUDIBLE_NORMAL, GGWAVE_PROTOCOL_AUDIBLE_FAST, GGWAVE_PROTOCOL_AUDIBLE_FASTEST, GGWAVE_PROTOCOL_ULTRASOUND_NORMAL, GGWAVE_PROTOCOL_ULTRASOUND_FAST, GGWAVE_PROTOCOL_ULTRASOUND_FASTEST, GGWAVE_PROTOCOL_DT... | ggwave_encode |
| DATA | waveform, bytes | ggwave_waveform |
| DATA | text, length | ggwave_decoded |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ggwave_init("ggwave", GGWAVE_OPERATING_MODE_RX_AND_TX, math_number(0), math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ggwave_waveform($ggwave, waveform))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ggwave_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
