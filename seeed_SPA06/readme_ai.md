# SPA06 (SPL07-003) Barometric Pressure & Temperature Sensor

Blockly library for SPA06/SPL07-003 pressure and temperature sensor via I2C.

## Library Info
- **Name**: @aily-project/lib-seeed-spa06
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `spa06_init` | Statement | ADDRESS(dropdown: 0x77/0x76) | `spa06_init(0x77)` | `Wire.begin(); spa06.begin(0x77, &Wire);` |
| `spa06_read_temperature` | Value(Number) | — | `spa06_read_temperature()` | `spa06.readTemperature()` |
| `spa06_read_pressure` | Value(Number) | — | `spa06_read_pressure()` | `spa06.readPressure()` |
| `spa06_read_altitude` | Value(Number) | — | `spa06_read_altitude()` | `spa06.calcAltitude()` |
| `spa06_pressure_available` | Value(Boolean) | — | `spa06_pressure_available()` | `spa06.pressureAvailable()` |
| `spa06_temperature_available` | Value(Boolean) | — | `spa06_temperature_available()` | `spa06.temperatureAvailable()` |
| `spa06_set_mode` | Statement | MODE(dropdown) | `spa06_set_mode(SPL07_CONT_PRES_TEMP)` | `spa06.setMode(SPL07_CONT_PRES_TEMP);` |
| `spa06_set_pressure_config` | Statement | RATE(dropdown), OVERSAMPLE(dropdown) | `spa06_set_pressure_config(SPL07_4HZ, SPL07_32SAMPLES)` | `spa06.setPressureConfig(SPL07_4HZ, SPL07_32SAMPLES);` |
| `spa06_set_temperature_config` | Statement | RATE(dropdown), OVERSAMPLE(dropdown) | `spa06_set_temperature_config(SPL07_4HZ, SPL07_1SAMPLE)` | `spa06.setTemperatureConfig(SPL07_4HZ, SPL07_1SAMPLE);` |
| `spa06_set_pressure_offset` | Statement | OFFSET(input_value:Number) | `spa06_set_pressure_offset(math_number(0))` | `spa06.setPressureOffset(0);` |
| `spa06_set_temperature_offset` | Statement | OFFSET(input_value:Number) | `spa06_set_temperature_offset(math_number(0))` | `spa06.setTemperatureOffset(0);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x77, 0x76 | I2C address (0x77 default SDO=high, 0x76 SDO=low) |
| MODE | SPL07_IDLE, SPL07_ONE_PRESSURE, SPL07_ONE_TEMPERATURE, SPL07_CONT_PRESSURE, SPL07_CONT_TEMPERATURE, SPL07_CONT_PRES_TEMP | Operating mode |
| RATE | SPL07_1HZ, SPL07_2HZ, SPL07_4HZ, SPL07_8HZ, SPL07_16HZ, SPL07_32HZ, SPL07_64HZ, SPL07_128HZ | Measurement rate |
| OVERSAMPLE | SPL07_1SAMPLE, SPL07_2SAMPLES, SPL07_4SAMPLES, SPL07_8SAMPLES, SPL07_16SAMPLES, SPL07_32SAMPLES, SPL07_64SAMPLES, SPL07_128SAMPLES | Oversampling rate |

## ABS Examples

### Basic Usage
```
arduino_setup()
    spa06_init(0x77)
    serial_begin(Serial, 115200)

arduino_loop()
    controls_if()
        @IF0: spa06_pressure_available()
        @DO0:
            serial_println(Serial, spa06_read_pressure())
            serial_println(Serial, spa06_read_temperature())
            serial_println(Serial, spa06_read_altitude())
    time_delay(math_number(1000))
```

### Advanced Configuration
```
arduino_setup()
    spa06_init(0x77)
    spa06_set_pressure_config(SPL07_4HZ, SPL07_32SAMPLES)
    spa06_set_temperature_config(SPL07_4HZ, SPL07_1SAMPLE)
    spa06_set_mode(SPL07_CONT_PRES_TEMP)
    serial_begin(Serial, 115200)

arduino_loop()
    controls_if()
        @IF0: logic_operation(spa06_pressure_available(), OR, spa06_temperature_available())
        @DO0:
            serial_println(Serial, spa06_read_pressure())
            serial_println(Serial, spa06_read_temperature())
            serial_println(Serial, spa06_read_altitude())
```

## Notes

1. **Initialization**: `spa06_init` must be placed inside `arduino_setup()`. It auto-includes Wire.h and SPL07-003.h, creates the global `spa06` object, calls `Wire.begin()` and `spa06.begin()`.
2. **Default config**: After `begin()`, the sensor defaults to continuous pressure & temperature mode at 64Hz with high precision oversampling.
3. **Custom config**: Use `spa06_set_pressure_config`, `spa06_set_temperature_config`, and `spa06_set_mode` to override defaults.
4. **Data check**: Use `spa06_pressure_available()` / `spa06_temperature_available()` before reading to ensure fresh data.
5. **Pressure unit**: `readPressure()` returns Pascals (divide by 100 for hPa).
6. **Altitude**: `calcAltitude()` uses standard sea-level pressure (1013.25 hPa) as reference.
