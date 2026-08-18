# Arduino Audio Tools

Composable I2S audio streams, sample IO, and stream copy pipelines.

## Library Info
- **Name**: @aily-project/lib-arduino-audio-tools
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `audio_tools_i2s_init` | Statement | VAR(field_input), MODE(dropdown), RATE(input_value), CHANNELS(input_value), BITS(input_value), BCLK(dropdown), WS(dropdown), TX(dropdown), RX(dropdown) | `audio_tools_i2s_init("i2sAudio", TX_MODE, math_number(0), math_number(0), math_number(0), BCLK, WS, TX, RX)` | `I2SStream i2sAudio; ↵ auto i2sAudio_config = i2sAudio.defaultConfig(TX_MODE); ↵ i2sAudio_config.sample_rate = 1; ↵ i2sAudio_config.channels = 1; ↵ i2sAudio_config.bits_per_sample = 1; ↵ i2sAudio_config.pin_bck = BCLK; ↵ i2sAudio_config.pin_ws = WS; ↵ i2sAudio_config.pin_data = TX; ↵ i2sAudio_config.pin_data_rx = RX; ↵ i2sAudio.begin(i2sAudio_config);` |
| `audio_tools_copy_init` | Statement | VAR(field_input), OUT(field_variable), IN(field_variable), AUTO(field_checkbox) | `audio_tools_copy_init("audioCopier", $i2sOut, $i2sIn, TRUE)` | `StreamCopy audioCopier(i2sOut, i2sIn); ↵ audioCopier.copy();` |
| `audio_tools_copy` | Statement | VAR(field_variable) | `audio_tools_copy($audioCopier)` | `audioCopier.copy();` |
| `audio_tools_write_sample` | Statement | VAR(field_variable), SAMPLE(input_value) | `audio_tools_write_sample($i2sAudio, math_number(0))` | `_ailyAudioSampleOut = (int16_t)(1); ↵ i2sAudio.write((uint8_t*)&_ailyAudioSampleOut, sizeof(_ailyAudioSampleOut));` |
| `audio_tools_read_sample` | Value | VAR(field_variable) | `audio_tools_read_sample($i2sAudio)` | `(i2sAudio.readBytes((uint8_t*)&_ailyAudioSampleIn, sizeof(_ailyAudioSampleIn)), _ailyAudioSampleIn)` |
| `audio_tools_available` | Value | VAR(field_variable) | `audio_tools_available($i2sAudio)` | `i2sAudio.available()` |
| `audio_tools_end` | Statement | VAR(field_variable) | `audio_tools_end($i2sAudio)` | `i2sAudio.end();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | TX_MODE, RX_MODE, RXTX_MODE | audio_tools_i2s_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    audio_tools_i2s_init("i2sAudio", TX_MODE, math_number(0), math_number(0), math_number(0), BCLK, WS, TX, RX)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, audio_tools_read_sample($i2sAudio))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `audio_tools_i2s_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
