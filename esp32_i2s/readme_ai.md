# ESP32 I2S Audio Library

ESP32 I2S audio interface library supports standard I2S, TDM, and PDM modes for audio playback and recording, providing fast operation and tone generation functions.

## Library Info
- **Name**: @aily-project/lib-esp32-i2s
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_i2s_create` | Statement | VAR(field_input) | `esp32_i2s_create("i2s")` | `I2SClass i2s;` |
| `esp32_i2s_set_pins_std` | Statement | VAR(field_variable), BCLK(field_number), WS(field_number), DOUT(field_number), DIN(field_number), MCLK(field_number) | `esp32_i2s_set_pins_std($i2s, 5, 25, 26, -1, -1)` | `i2s.setPins(5, 25, 26, -1, -1);` |
| `esp32_i2s_set_pins_pdm_tx` | Statement | VAR(field_variable), CLK(field_number), DOUT0(field_number), DOUT1(field_number) | `esp32_i2s_set_pins_pdm_tx($i2s, 20, 21, -1)` | `i2s.setPinsPdmTx(20, 21, -1);` |
| `esp32_i2s_set_pins_pdm_rx` | Statement | VAR(field_variable), CLK(field_number), DIN0(field_number), DIN1(field_number), DIN2(field_number), DIN3(field_number) | `esp32_i2s_set_pins_pdm_rx($i2s, 20, 21, -1, -1, -1)` | `i2s.setPinsPdmRx(20, 21, -1, -1, -1);` |
| `esp32_i2s_begin` | Statement | VAR(field_variable), MODE(dropdown), RATE(field_number), BITS(dropdown), SLOT(dropdown), SLOT_MASK(dropdown) | `esp32_i2s_begin($i2s, I2S_MODE_STD, 44100, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_STEREO, "-1")` | `if (!i2s.begin(I2S_MODE_STD, 44100, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_STEREO)) { ↵ Serial.println("I2S初始化失败!"); ↵ while(1); ↵ }` |
| `esp32_i2s_configure_tx` | Statement | VAR(field_variable), RATE(field_number), BITS(dropdown), SLOT(dropdown), SLOT_MASK(dropdown) | `esp32_i2s_configure_tx($i2s, 44100, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_STEREO, "-1")` | `if (!i2s.configureTX(44100, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_STEREO)) { ↵ Serial.println("I2S TX配置失败!"); ↵ }` |
| `esp32_i2s_configure_rx` | Statement | VAR(field_variable), RATE(field_number), BITS(dropdown), SLOT(dropdown), TRANSFORM(dropdown) | `esp32_i2s_configure_rx($i2s, 16000, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_STEREO, I2S_RX_TRANSFORM_NONE)` | `if (!i2s.configureRX(16000, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_STEREO, I2S_RX_TRANSFORM_NONE)) { ↵ Serial.println("I2S RX配置失败!"); ↵ }` |
| `esp32_i2s_write_byte` | Statement | VAR(field_variable), BYTE(input_value) | `esp32_i2s_write_byte($i2s, math_number(0))` | `i2s.write(1);` |
| `esp32_i2s_read_bytes` | Statement | VAR(field_variable), BUFFER(input_value), SIZE(input_value) | `esp32_i2s_read_bytes($i2s, math_number(0), math_number(0))` | `i2s.readBytes(1, 1);` |
| `esp32_i2s_record_wav` | Value | VAR(field_variable), SECONDS(input_value), SIZE_VAR(field_input) | `esp32_i2s_record_wav($i2s, math_number(0), "wav_size")` | `i2s.recordWAV(1, &wav_size)` |
| `esp32_i2s_play_wav` | Statement | VAR(field_variable), DATA(input_value), LENGTH(input_value) | `esp32_i2s_play_wav($i2s, math_number(0), math_number(0))` | `i2s.playWAV(1, 1);` |
| `esp32_i2s_end` | Statement | VAR(field_variable) | `esp32_i2s_end($i2s)` | `i2s.end();` |
| `esp32_i2s_get_last_error` | Value | VAR(field_variable) | `esp32_i2s_get_last_error($i2s)` | `i2s.lastError()` |
| `esp32_i2s_write_sample` | Statement | VAR(field_variable), SAMPLE(input_value) | `esp32_i2s_write_sample($i2s, math_number(0))` | `i2s.write((int16_t)(1) & 0xFF); ↵ i2s.write(((int16_t)(1) >> 8) & 0xFF); ↵ i2s.write((int16_t)(1) & 0xFF); ↵ i2s.write(((int16_t)(1) >> 8) & 0xFF);` |
| `esp32_i2s_write_buffer` | Value | VAR(field_variable), BUFFER(input_value), SIZE(input_value) | `esp32_i2s_write_buffer($i2s, math_number(0), math_number(0))` | `i2s.write((const uint8_t*)1, 1)` |
| `esp32_i2s_available` | Value | VAR(field_variable) | `esp32_i2s_available($i2s)` | `i2s.available()` |
| `esp32_i2s_tx_sample_rate` | Value | VAR(field_variable) | `esp32_i2s_tx_sample_rate($i2s)` | `i2s.txSampleRate()` |
| `esp32_i2s_rx_sample_rate` | Value | VAR(field_variable) | `esp32_i2s_rx_sample_rate($i2s)` | `i2s.rxSampleRate()` |
| `esp32_i2s_set_inverted` | Statement | VAR(field_variable), BCLK_INV(field_checkbox), WS_INV(field_checkbox), MCLK_INV(field_checkbox) | `esp32_i2s_set_inverted($i2s, FALSE, FALSE, FALSE)` | `i2s.setInverted(false, false, false);` |
| `esp32_i2s_generate_tone` | Statement | VAR(field_variable), FREQUENCY(input_value), DURATION(input_value), AMPLITUDE(input_value) | `esp32_i2s_generate_tone($i2s, math_number(0), math_number(1000), math_number(0))` | `i2s_generate_tone(i2s, 1, 1, 1);` |
| `esp32_i2s_free_wav_buffer` | Statement | BUFFER(input_value) | `esp32_i2s_free_wav_buffer(math_number(0))` | `if (1 != NULL) { ↵ free(1); ↵ 1 = NULL; ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | I2S_MODE_STD, I2S_MODE_TDM, I2S_MODE_PDM_TX, I2S_MODE_PDM_RX | esp32_i2s_begin |
| BITS | I2S_DATA_BIT_WIDTH_16BIT, I2S_DATA_BIT_WIDTH_32BIT, I2S_DATA_BIT_WIDTH_24BIT, I2S_DATA_BIT_WIDTH_8BIT | esp32_i2s_begin, esp32_i2s_configure_tx, esp32_i2s_configure_rx |
| SLOT | I2S_SLOT_MODE_STEREO, I2S_SLOT_MODE_MONO | esp32_i2s_begin, esp32_i2s_configure_tx, esp32_i2s_configure_rx |
| SLOT_MASK | -1, I2S_STD_SLOT_LEFT, I2S_STD_SLOT_RIGHT, I2S_STD_SLOT_BOTH | esp32_i2s_begin, esp32_i2s_configure_tx |
| TRANSFORM | I2S_RX_TRANSFORM_NONE, I2S_RX_TRANSFORM_32_TO_16, I2S_RX_TRANSFORM_16_STEREO_TO_MONO | esp32_i2s_configure_rx |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_i2s_create("i2s")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_i2s_record_wav($i2s, math_number(0), "wav_size"))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_i2s_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
