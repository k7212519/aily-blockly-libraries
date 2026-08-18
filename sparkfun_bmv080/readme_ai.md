# SparkFun BMV080 Particulate Matter Sensor

Blockly wrapper for the SparkFun BMV080 PM1/PM2.5/PM10 particulate matter sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-bmv080
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bmv080_init_i2c` | Statement | VAR(field_input), ADDRESS(dropdown), MODE(dropdown) | `bmv080_init_i2c("bmv080", SF_BMV080_DEFAULT_ADDRESS, SF_BMV080_MODE_CONTINUOUS)` | `Wire.begin(); ↵ bmv080_ready = bmv080.begin(SF_BMV080_DEFAULT_ADDRESS, Wire); ↵ if (bmv080_ready) { ↵ bmv080_ready = bmv080.init(); ↵ } ↵ if (bmv080_ready) { ↵ bmv080_ready = bmv080.setMode(SF_BMV080_MODE_CONTINUOUS); ↵ }` |
| `bmv080_is_ready` | Value | VAR(field_variable) | `bmv080_is_ready($bmv080)` | `bmv080_ready` |
| `bmv080_read_sensor` | Value | VAR(field_variable) | `bmv080_read_sensor($bmv080)` | `bmv080.readSensor()` |
| `bmv080_pm1` | Value | VAR(field_variable) | `bmv080_pm1($bmv080)` | `bmv080.PM1()` |
| `bmv080_pm25` | Value | VAR(field_variable) | `bmv080_pm25($bmv080)` | `bmv080.PM25()` |
| `bmv080_pm10` | Value | VAR(field_variable) | `bmv080_pm10($bmv080)` | `bmv080.PM10()` |
| `bmv080_is_obstructed` | Value | VAR(field_variable) | `bmv080_is_obstructed($bmv080)` | `bmv080.isObstructed()` |
| `bmv080_set_mode` | Statement | VAR(field_variable), MODE(dropdown) | `bmv080_set_mode($bmv080, SF_BMV080_MODE_CONTINUOUS)` | `bmv080.setMode(SF_BMV080_MODE_CONTINUOUS);` |
| `bmv080_set_duty_cycle` | Statement | VAR(field_variable), SECONDS(input_value) | `bmv080_set_duty_cycle($bmv080, math_number(0))` | `bmv080.setDutyCyclingPeriod(1);` |
| `bmv080_set_obstruction_detection` | Statement | VAR(field_variable), STATE(dropdown) | `bmv080_set_obstruction_detection($bmv080, TRUE)` | `bmv080.setDoObstructionDetection(true);` |
| `bmv080_set_vibration_filtering` | Statement | VAR(field_variable), STATE(dropdown) | `bmv080_set_vibration_filtering($bmv080, TRUE)` | `bmv080.setDoVibrationFiltering(true);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | SF_BMV080_DEFAULT_ADDRESS, 0x57 | bmv080_init_i2c |
| MODE | SF_BMV080_MODE_CONTINUOUS, SF_BMV080_MODE_DUTY_CYCLE | bmv080_init_i2c, bmv080_set_mode |
| STATE | TRUE, FALSE | bmv080_set_obstruction_detection, bmv080_set_vibration_filtering |

## ABS Examples

### Basic Usage
```
arduino_setup()
    bmv080_init_i2c("bmv080", SF_BMV080_DEFAULT_ADDRESS, SF_BMV080_MODE_CONTINUOUS)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, bmv080_is_ready($bmv080))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `bmv080_init_i2c("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
