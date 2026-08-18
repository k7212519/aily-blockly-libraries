# SparkFun Bio Sensor Hub

Blockly wrapper for the SparkFun MAX32664 Bio Sensor Hub and MAX30101 pulse oximeter.

## Library Info
- **Name**: @aily-project/lib-sparkfun-bio-sensor-hub
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `biohub_init` | Statement | VAR(field_input), RESET_PIN(field_number), MFIO_PIN(field_number) | `biohub_init("bioHub", 4, 13)` | `Wire.begin(); ↵ bioHub_status = bioHub.begin(Wire, 4, 13); ↵ bioHub_ready = (bioHub_status == SFE_BIO_SUCCESS);` |
| `biohub_is_ready` | Value | VAR(field_variable) | `biohub_is_ready($bioHub)` | `bioHub_ready` |
| `biohub_config_bpm` | Statement | VAR(field_variable), MODE(dropdown) | `biohub_config_bpm($bioHub, MODE_ONE)` | `bioHub_status = bioHub.configBpm(MODE_ONE);` |
| `biohub_config_sensor_bpm` | Statement | VAR(field_variable), MODE(dropdown) | `biohub_config_sensor_bpm($bioHub, MODE_ONE)` | `bioHub_status = bioHub.configSensorBpm(MODE_ONE);` |
| `biohub_read_bpm` | Statement | VAR(field_variable) | `biohub_read_bpm($bioHub)` | `bioHub_data = bioHub.readBpm();` |
| `biohub_read_sensor_bpm` | Statement | VAR(field_variable) | `biohub_read_sensor_bpm($bioHub)` | `bioHub_data = bioHub.readSensorBpm();` |
| `biohub_value` | Value | VAR(field_variable), FIELD(dropdown) | `biohub_value($bioHub, heartRate)` | `bioHub_data.heartRate` |
| `biohub_set_pulse_width` | Statement | VAR(field_variable), WIDTH(dropdown) | `biohub_set_pulse_width($bioHub, "69")` | `bioHub_status = bioHub.setPulseWidth(69);` |
| `biohub_set_sample_rate` | Statement | VAR(field_variable), RATE(dropdown) | `biohub_set_sample_rate($bioHub, "50")` | `bioHub_status = bioHub.setSampleRate(50);` |
| `biohub_set_adc_range` | Statement | VAR(field_variable), RANGE(dropdown) | `biohub_set_adc_range($bioHub, "2048")` | `bioHub_status = bioHub.setAdcRange(2048);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | MODE_ONE, MODE_TWO | biohub_config_bpm, biohub_config_sensor_bpm |
| FIELD | heartRate, oxygen, confidence, status, irLed, redLed, rValue | biohub_value |
| WIDTH | 69, 118, 215, 411 | biohub_set_pulse_width |
| RATE | 50, 100, 200, 400, 800, 1000, 1600, 3200 | biohub_set_sample_rate |
| RANGE | 2048, 4096, 8192, 16384 | biohub_set_adc_range |

## ABS Examples

### Basic Usage
```
arduino_setup()
    biohub_init("bioHub", 4, 13)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, biohub_is_ready($bioHub))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `biohub_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
