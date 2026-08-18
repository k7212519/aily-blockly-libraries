# BMP280 air pressure sensor

Grove BMP280 Barometric Pressure and Temperature Sensor Library, supporting temperature, barometric pressure and altitude measurements

## Library Info
- **Name**: @aily-project/lib-seeed-bmp280
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bmp280_create` | Statement | VAR(field_input) | `bmp280_create("bmp280")` | `BMP280 bmp280;` |
| `bmp280_init` | Statement | VAR(field_variable) | `bmp280_init($bmp280)` | `bmp280.init();` |
| `bmp280_get_temperature` | Value | VAR(field_variable) | `bmp280_get_temperature($bmp280)` | `bmp280.getTemperature()` |
| `bmp280_get_pressure` | Value | VAR(field_variable) | `bmp280_get_pressure($bmp280)` | `bmp280.getPressure()` |
| `bmp280_calc_altitude` | Value | VAR(field_variable), PRESSURE(input_value) | `bmp280_calc_altitude($bmp280, math_number(0))` | `bmp280.calcAltitude(1)` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    bmp280_create("bmp280")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, bmp280_get_temperature($bmp280))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `bmp280_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
