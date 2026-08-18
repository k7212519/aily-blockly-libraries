# ESP32 Bluetooth Audio

ESP32 Bluetooth A2DP audio transmission library, supports audio receivers and transmitters

## Library Info
- **Name**: @aily-project/lib-esp32-a2dp
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `a2dp_sink_create` | Statement | VAR(field_input), OUTPUT_TYPE(dropdown) | `a2dp_sink_create("a2dp_sink", I2S)` | `I2SStream a2dp_sink_i2s; ↵ BluetoothA2DPSink a2dp_sink(a2dp_sink_i2s);` |
| `a2dp_sink_start` | Statement | VAR(field_variable), NAME(input_value) | `a2dp_sink_start($a2dp_sink, text("value"))` | `a2dp_sink.start("value");` |
| `a2dp_sink_set_volume` | Statement | VAR(field_variable), VOLUME(input_value) | `a2dp_sink_set_volume($a2dp_sink, math_number(0))` | `a2dp_sink.set_volume(1);` |
| `a2dp_sink_get_volume` | Value | VAR(field_variable) | `a2dp_sink_get_volume($a2dp_sink)` | `a2dp_sink.get_volume()` |
| `a2dp_sink_play` | Statement | VAR(field_variable) | `a2dp_sink_play($a2dp_sink)` | `a2dp_sink.play();` |
| `a2dp_sink_pause` | Statement | VAR(field_variable) | `a2dp_sink_pause($a2dp_sink)` | `a2dp_sink.pause();` |
| `a2dp_sink_stop` | Statement | VAR(field_variable) | `a2dp_sink_stop($a2dp_sink)` | `a2dp_sink.stop();` |
| `a2dp_sink_next` | Statement | VAR(field_variable) | `a2dp_sink_next($a2dp_sink)` | `a2dp_sink.next();` |
| `a2dp_sink_previous` | Statement | VAR(field_variable) | `a2dp_sink_previous($a2dp_sink)` | `a2dp_sink.previous();` |
| `a2dp_sink_on_metadata` | Hat | VAR(field_variable), ID_VAR(field_variable), TEXT_VAR(field_variable), HANDLER(input_statement) | `a2dp_sink_on_metadata($a2dp_sink, $metadata_id, $metadata_text)` | `void a2dp_metadata_callback_a2dp_sink(uint8_t metadata_id, const uint8_t *metadata_text) { ↵ } ↵ a2dp_sink.set_avrc_metadata_attribute_mask(ESP_AVRC_MD_ATTR_TITLE &#124; ESP_AVRC_MD_ATTR_ARTIST &#124; ESP_AVRC_MD_ATTR_ALBUM &#124; ESP_AVRC_MD_ATTR_PLAYING_TIME); ↵ a2dp_sink.set_avrc_metadata_callback(a2dp_metadata_callback_a2dp_sink);` |
| `a2dp_sink_on_connection_state` | Hat | VAR(field_variable), STATE_VAR(field_variable), HANDLER(input_statement) | `a2dp_sink_on_connection_state($a2dp_sink, $conn_state)` | `void a2dp_conn_state_callback_a2dp_sink(esp_a2d_connection_state_t conn_state, void *ptr) { ↵ } ↵ a2dp_sink.set_on_connection_state_changed(a2dp_conn_state_callback_a2dp_sink);` |
| `a2dp_sink_on_audio_state` | Hat | VAR(field_variable), STATE_VAR(field_variable), HANDLER(input_statement) | `a2dp_sink_on_audio_state($a2dp_sink, $audio_state)` | `void a2dp_audio_state_callback_a2dp_sink(esp_a2d_audio_state_t audio_state, void *ptr) { ↵ } ↵ a2dp_sink.set_on_audio_state_changed(a2dp_audio_state_callback_a2dp_sink);` |
| `a2dp_sink_get_audio_state` | Value | VAR(field_variable) | `a2dp_sink_get_audio_state($a2dp_sink)` | `a2dp_sink.get_audio_state()` |
| `a2dp_source_create` | Statement | VAR(field_input) | `a2dp_source_create("a2dp_source")` | `BluetoothA2DPSource a2dp_source;` |
| `a2dp_source_start` | Statement | VAR(field_variable), TARGET_NAME(input_value) | `a2dp_source_start($a2dp_source, text("value"))` | `a2dp_source.start("value");` |
| `a2dp_source_set_volume` | Statement | VAR(field_variable), VOLUME(input_value) | `a2dp_source_set_volume($a2dp_source, math_number(0))` | `a2dp_source.set_volume(1);` |
| `a2dp_source_on_data_callback` | Hat | VAR(field_variable), FRAME_VAR(field_variable), COUNT_VAR(field_variable), HANDLER(input_statement) | `a2dp_source_on_data_callback($a2dp_source, $frame, $frame_count)` | `int32_t a2dp_get_data_frames_a2dp_source(Frame *frame, int32_t frame_count) { ↵ return frame_count; ↵ } ↵ a2dp_source.set_data_callback_in_frames(a2dp_get_data_frames_a2dp_source);` |
| `a2dp_source_set_auto_reconnect` | Statement | VAR(field_variable), ENABLE(dropdown) | `a2dp_source_set_auto_reconnect($a2dp_source, TRUE)` | `a2dp_source.set_auto_reconnect(true);` |
| `a2dp_audio_state_started` | Value | (none) | `a2dp_audio_state_started()` | `ESP_A2D_AUDIO_STATE_STARTED` |
| `a2dp_audio_state_stopped` | Value | (none) | `a2dp_audio_state_stopped()` | `ESP_A2D_AUDIO_STATE_STOPPED` |
| `a2dp_audio_state_remote_suspend` | Value | (none) | `a2dp_audio_state_remote_suspend()` | `ESP_A2D_AUDIO_STATE_REMOTE_SUSPEND` |
| `a2dp_sink_config_i2s_pins` | Statement | VAR(field_variable), BCK(input_value), WS(input_value), DATA(input_value) | `a2dp_sink_config_i2s_pins($a2dp_sink, math_number(0), math_number(0), math_number(0))` | `{ ↵ auto a2dp_sink_i2s_config = a2dp_sink_i2s.defaultConfig(TX_MODE); ↵ a2dp_sink_i2s_config.pin_bck = 1; ↵ a2dp_sink_i2s_config.pin_ws = 1; ↵ a2dp_sink_i2s_config.pin_data = 1; ↵ a2dp_sink_i2s.begin(a2dp_sink_i2s_config); ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| OUTPUT_TYPE | I2S, INTERNAL_DAC | a2dp_sink_create |
| ENABLE | TRUE, FALSE | a2dp_source_set_auto_reconnect |

## ABS Examples

### Basic Usage
```
arduino_setup()
    a2dp_sink_create("a2dp_sink", I2S)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, a2dp_sink_get_volume($a2dp_sink))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `a2dp_sink_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
