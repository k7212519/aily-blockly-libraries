# DPS3xx Barometric Pressure & Temperature Sensor

Infineon DPS3xx high-precision barometric pressure and temperature sensor library for Blockly.

## Library Info
- **Name**: @aily-project/lib-dps3xx
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `dps3xx_init` | Statement | ADDR(dropdown), WIRE(dropdown) | `dps3xx_init(0x77, Wire)` | `dps3xxSensor.begin(Wire, 0x77); dps3xxSensor.correctTemp();` |
| `dps3xx_read_temperature` | Value(Number) | OSR(dropdown) | `dps3xx_read_temperature(7)` | `dps3xx_readTemperature(7)` |
| `dps3xx_read_pressure` | Value(Number) | OSR(dropdown) | `dps3xx_read_pressure(7)` | `dps3xx_readPressure(7)` |
| `dps3xx_correct_temp` | Statement | (none) | `dps3xx_correct_temp()` | `dps3xxSensor.correctTemp();` |
| `dps3xx_get_product_id` | Value(Number) | (none) | `dps3xx_get_product_id()` | `dps3xxSensor.getProductId()` |
| `dps3xx_get_revision_id` | Value(Number) | (none) | `dps3xx_get_revision_id()` | `dps3xxSensor.getRevisionId()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDR | 0x77, 0x76 | I2C slave address |
| WIRE | Wire, Wire1 (board-dependent) | I2C bus interface |
| OSR | 0, 1, 2, 3, 4, 5, 6, 7 | Oversampling rate (2^n internal measurements) |

## ABS Examples

### Basic Temperature & Pressure Reading
```
arduino_setup()
    dps3xx_init(0x77, Wire)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_print(Serial, text("Temperature: "))
    serial_println(Serial, dps3xx_read_temperature(7))
    serial_print(Serial, text("Pressure: "))
    serial_println(Serial, dps3xx_read_pressure(7))
    time_delay(math_number(500))
```

## Notes

1. **Initialization**: Place `dps3xx_init` inside `arduino_setup()`. The init block automatically calls `correctTemp()` to fix potential hardware issues.
2. **Oversampling**: Value 0-7 means 2^n internal measurements combined. Higher = more precise but slower. Value 7 (128x) is recommended for highest precision.
3. **Pressure unit**: Returns Pascal (Pa). Divide by 100 to get hPa (hectopascal).
4. **Global object**: Uses a single global `dps3xxSensor` object. Helper functions `dps3xx_readTemperature()` and `dps3xx_readPressure()` are auto-generated.
