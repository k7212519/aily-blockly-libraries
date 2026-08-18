# SparkFun BME280 Environmental Sensor

Blockly wrapper for the SparkFun BME280 temperature, humidity and pressure sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-bme280
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bme280_init_i2c` | Statement | VAR(field_input), ADDRESS(dropdown) | `bme280_init_i2c("bme280", "0x77")` | `Wire.begin(); ↵ bme280.setI2CAddress(0x77); ↵ bme280_ready = bme280.beginI2C();` |
| `bme280_init_spi` | Statement | VAR(field_input), CS(field_number) | `bme280_init_spi("bme280", 10)` | `SPI.begin(); ↵ bme280_ready = bme280.beginSPI(10);` |
| `bme280_is_ready` | Value | VAR(field_variable) | `bme280_is_ready($bme280)` | `bme280_ready` |
| `bme280_read_temperature` | Value | VAR(field_variable), UNIT(dropdown) | `bme280_read_temperature($bme280, C)` | `bme280.readTempC()` |
| `bme280_read_pressure` | Value | VAR(field_variable) | `bme280_read_pressure($bme280)` | `bme280.readFloatPressure()` |
| `bme280_read_humidity` | Value | VAR(field_variable) | `bme280_read_humidity($bme280)` | `bme280.readFloatHumidity()` |
| `bme280_read_altitude` | Value | VAR(field_variable), UNIT(dropdown) | `bme280_read_altitude($bme280, M)` | `bme280.readFloatAltitudeMeters()` |
| `bme280_dew_point` | Value | VAR(field_variable), UNIT(dropdown) | `bme280_dew_point($bme280, C)` | `bme280.dewPointC()` |
| `bme280_set_mode` | Statement | VAR(field_variable), MODE(dropdown) | `bme280_set_mode($bme280, MODE_NORMAL)` | `bme280.setMode(MODE_NORMAL);` |
| `bme280_set_oversampling` | Statement | VAR(field_variable), SENSOR(dropdown), OVERSAMPLE(dropdown) | `bme280_set_oversampling($bme280, TEMP, "0")` | `bme280.setTempOverSample(0);` |
| `bme280_set_filter` | Statement | VAR(field_variable), FILTER(dropdown) | `bme280_set_filter($bme280, "0")` | `bme280.setFilter(0);` |
| `bme280_is_measuring` | Value | VAR(field_variable) | `bme280_is_measuring($bme280)` | `bme280.isMeasuring()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x77, 0x76 | bme280_init_i2c |
| UNIT | C, F | bme280_read_temperature, bme280_dew_point |
| UNIT | M, FT | bme280_read_altitude |
| MODE | MODE_NORMAL, MODE_FORCED, MODE_SLEEP | bme280_set_mode |
| SENSOR | TEMP, PRESSURE, HUMIDITY | bme280_set_oversampling |
| OVERSAMPLE | 0, 1, 2, 4, 8, 16 | bme280_set_oversampling |
| FILTER | 0, 1, 2, 3, 4 | bme280_set_filter |

## ABS Examples

### Basic Usage
```
arduino_setup()
    bme280_init_i2c("bme280", "0x77")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, bme280_is_ready($bme280))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `bme280_init_i2c("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
