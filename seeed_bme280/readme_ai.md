# BME280 temperature, humidity and pressure sensor

Grove BME280 temperature, humidity and air pressure sensor library supports reading temperature, humidity, air pressure and altitude

## Library Info
- **Name**: @aily-project/lib-seeed-bme280
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bme280_init` | Statement | VAR(field_input), I2C_ADDR(dropdown) | `bme280_init("bme280", "0x76")` | `if (!bme280.init(0x76)) { ↵ Serial.println("BME280初始化失败!"); ↵ }` |
| `bme280_get_temperature` | Value | VAR(field_variable) | `bme280_get_temperature($bme280)` | `bme280.getTemperature()` |
| `bme280_get_pressure` | Value | VAR(field_variable) | `bme280_get_pressure($bme280)` | `bme280.getPressure()` |
| `bme280_get_humidity` | Value | VAR(field_variable) | `bme280_get_humidity($bme280)` | `bme280.getHumidity()` |
| `bme280_calc_altitude` | Value | VAR(field_variable), PRESSURE(input_value) | `bme280_calc_altitude($bme280, math_number(0))` | `bme280.calcAltitude(1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| I2C_ADDR | 0x76, 0x77 | bme280_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    bme280_init("bme280", "0x76")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, bme280_get_temperature($bme280))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `bme280_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
