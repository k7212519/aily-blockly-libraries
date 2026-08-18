# SHT3x Temp & Humidity Sensor

SHT30/SHT31/SHT35 temperature and humidity sensor library, I2C communication, includes temperature/humidity reading and heater control

## Library Info
- **Name**: @aily-project/lib-adafruit-sht3x
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `sht31_init` | Statement | VAR(field_input), ADDRESS(dropdown), WIRE(dropdown) | `sht31_init("sht31", "0x44", WIRE)` | `Adafruit_SHT31 sht31; ↵ // SHT3x I2C连接: 使用默认I2C引脚 ↵ WIRE.begin(); ↵ if (!sht31.begin(0x44)) { ↵ while (1) delay(1); ↵ }` |
| `sht31_heater_control` | Statement | VAR(field_variable), STATE(dropdown) | `sht31_heater_control($sht31, true)` | `sht31.heater(true);` |
| `sht31_is_heater_enabled` | Value | VAR(field_variable) | `sht31_is_heater_enabled($sht31)` | `sht31.isHeaterEnabled()` |
| `sht31_reset` | Statement | VAR(field_variable) | `sht31_reset($sht31)` | `sht31.reset();` |
| `sht31_simple_read` | Value | VAR(field_variable), TYPE(dropdown) | `sht31_simple_read($sht31, temperature)` | `sht31.readTemperature()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x44, 0x45 | sht31_init |
| STATE | true, false | sht31_heater_control |
| TYPE | temperature, humidity | sht31_simple_read |

## ABS Examples

### Basic Usage
```
arduino_setup()
    sht31_init("sht31", "0x44", WIRE)
    sht31_heater_control($sht31, false)

arduino_loop()
    sht31_simple_read($sht31, temperature)
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `sht31_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
