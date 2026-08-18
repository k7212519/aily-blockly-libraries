# SPA06 air pressure temperature sensor

SPA06-003 barometric pressure and temperature sensor library supports I2C and SPI communication, providing high-precision pressure and temperature measurement

## Library Info
- **Name**: @aily-project/lib-spa06
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `spa06_create_i2c` | Statement | VAR(field_input), ADDR(dropdown); runtime variants: fixed-board-i2c-pins: (none); esp32-custom-i2c-pins: SDA_PIN(dropdown), SCL_PIN(dropdown) | `spa06_create_i2c("spa06", "0x76")` | `Serial.begin(115200); ↵ SPL07_003 spa06; ↵ Wire.begin(); ↵ if (spa06.begin(0x76, &Wire) == false) { ↵ Serial.println("Error initializing SPL06-003 :("); ↵ while(1) {} ↵ } ↵ Serial.println("Connected to SPL06-003! :)"); ↵ // SPA06 I2C连接 (Arduino UNO): SDA->A4, SCL->A5` |
| `spa06_create_spi` | Statement | VAR(field_input), PIN(field_input) | `spa06_create_spi("spa06", "SS")` | `SPI.begin(); ↵ if (spa06.begin(SS, &SPI) == false) { ↵ Serial.println("Error initializing SPL06-003 :("); ↵ while(1) {} ↵ } ↵ Serial.println("Connected to SPL06-003! :)");` |
| `spa06_set_pressure_sampling` | Statement | VAR(field_variable), RATE(dropdown), OVERSAMPLE(dropdown) | `spa06_set_pressure_sampling($spa06, SPL07_1HZ, SPL07_1SAMPLE)` | `spa06.setPressureConfig(SPL07_1HZ, SPL07_1SAMPLE);` |
| `spa06_set_temperature_sampling` | Statement | VAR(field_variable), RATE(dropdown), OVERSAMPLE(dropdown) | `spa06_set_temperature_sampling($spa06, SPL07_1HZ, SPL07_1SAMPLE)` | `spa06.setTemperatureConfig(SPL07_1HZ, SPL07_1SAMPLE);` |
| `spa06_set_mode` | Statement | VAR(field_variable), MODE(dropdown) | `spa06_set_mode($spa06, SPL07_IDLE)` | `spa06.setMode(SPL07_IDLE);` |
| `spa06_set_temperature_source` | Statement | VAR(field_variable), SOURCE(dropdown) | `spa06_set_temperature_source($spa06, SPL07_TSRC_ASIC)` | `spa06.setTemperatureSource(SPL07_TSRC_ASIC);` |
| `spa06_read_pressure` | Value | VAR(field_variable) | `spa06_read_pressure($spa06)` | `spa06.readPressure()` |
| `spa06_read_temperature` | Value | VAR(field_variable) | `spa06_read_temperature($spa06)` | `spa06.readTemperature()` |
| `spa06_calc_altitude` | Value | VAR(field_variable) | `spa06_calc_altitude($spa06)` | `spa06.calcAltitude()` |
| `spa06_pressure_available` | Value | VAR(field_variable) | `spa06_pressure_available($spa06)` | `spa06.pressureAvailable()` |
| `spa06_temperature_available` | Value | VAR(field_variable) | `spa06_temperature_available($spa06)` | `spa06.temperatureAvailable()` |
| `spa06_set_interrupt` | Statement | VAR(field_variable), INTERRUPT(dropdown) | `spa06_set_interrupt($spa06, SPL07_INT_OFF)` | `spa06.configureInterrupt(SPL07_INT_OFF);` |
| `spa06_get_interrupt_status` | Value | VAR(field_variable) | `spa06_get_interrupt_status($spa06)` | `spa06.getInterruptStatus()` |
| `spa06_set_pressure_offset` | Statement | VAR(field_variable), OFFSET(input_value) | `spa06_set_pressure_offset($spa06, math_number(0))` | `spa06.setPressureOffset(1);` |
| `spa06_set_temperature_offset` | Statement | VAR(field_variable), OFFSET(input_value) | `spa06_set_temperature_offset($spa06, math_number(0))` | `spa06.setTemperatureOffset(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDR | 0x76, 0x77 | spa06_create_i2c |
| RATE | SPL07_1HZ, SPL07_2HZ, SPL07_4HZ, SPL07_8HZ, SPL07_16HZ, SPL07_32HZ, SPL07_64HZ, SPL07_128HZ | spa06_set_pressure_sampling, spa06_set_temperature_sampling |
| OVERSAMPLE | SPL07_1SAMPLE, SPL07_2SAMPLES, SPL07_4SAMPLES, SPL07_8SAMPLES, SPL07_16SAMPLES, SPL07_32SAMPLES, SPL07_64SAMPLES, SPL07_128SAMPLES | spa06_set_pressure_sampling, spa06_set_temperature_sampling |
| MODE | SPL07_IDLE, SPL07_ONE_PRESSURE, SPL07_ONE_TEMPERATURE, SPL07_CONT_PRESSURE, SPL07_CONT_TEMPERATURE, SPL07_CONT_PRES_TEMP | spa06_set_mode |
| SOURCE | SPL07_TSRC_ASIC, SPL07_TSRC_MEMS | spa06_set_temperature_source |
| INTERRUPT | SPL07_INT_OFF, SPL07_INT_PRES, SPL07_INT_TEMP, SPL07_INT_PRES_TEMP, SPL07_INT_FIFO, SPL07_INT_FIFO_PRES, SPL07_INT_FIFO_TEMP, SPL07_INT_ALL | spa06_set_interrupt |

## ABS Examples

### Basic Usage
```
arduino_setup()
    spa06_create_i2c("spa06", "0x76")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, spa06_read_pressure($spa06))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `spa06_create_i2c("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **Runtime shape**: `spa06_create_i2c` adds `SDA_PIN` and `SCL_PIN` only on boards that require custom ESP32 I2C pins; fixed-pin boards use the shorter signature.

## Runtime Variant Examples

### Runtime Variant: spa06_create_i2c/esp32-custom-i2c-pins
```abs
arduino_setup()
    spa06_create_i2c("spa06", "0x76", 21, 22)
```
