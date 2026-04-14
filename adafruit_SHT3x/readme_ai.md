# SHT3x Temperature & Humidity Sensor

SHT30/SHT31/SHT35 temperature and humidity sensor library, I2C communication, includes temperature/humidity reading and heater control

## Library Info
- **Name**: @aily-project/lib-adafruit-sht3x
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `sht31_init` | Statement | VAR(field_input), ADDRESS(dropdown), WIRE(dropdown) | `sht31_init("sht31", "0x44", "Wire")` | `Adafruit_SHT31 sht31; Wire.begin(); sht31.begin(0x44);` |
| `sht31_heater_control` | Statement | VAR(field_variable), STATE(dropdown) | `sht31_heater_control($sht31, "true")` | `sht31.heater(true);` |
| `sht31_is_heater_enabled` | Value | VAR(field_variable) | `sht31_is_heater_enabled($sht31)` | `sht31.isHeaterEnabled()` |
| `sht31_reset` | Statement | VAR(field_variable) | `sht31_reset($sht31)` | `sht31.reset();` |
| `sht31_simple_read` | Value | VAR(field_variable), TYPE(dropdown) | `sht31_simple_read($sht31, "temperature")` | `sht31.readTemperature()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x44, 0x45 | 0x44 (default) / 0x45 (alternate, ADDR pin HIGH) |
| WIRE | Wire, Wire1 | I2C bus (from board.json i2c field) |
| STATE | true, false | Enable / Disable heater |
| TYPE | temperature, humidity | Temperature(°C) / Humidity(%) |

## ABS Examples

### Basic Temperature & Humidity Reading
```
arduino_setup()
    sht31_init("sht31", "0x44", "Wire")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_print(Serial, text("Temperature: "))
    serial_println(Serial, sht31_simple_read($sht31, "temperature"))
    serial_print(Serial, text("Humidity: "))
    serial_println(Serial, sht31_simple_read($sht31, "humidity"))
    time_delay(math_number(2000))
```

### Heater Control & Status Check
```
arduino_setup()
    sht31_init("sht31", "0x44", "Wire")
    serial_begin(Serial, 9600)

arduino_loop()
    sht31_heater_control($sht31, "true")
    serial_print(Serial, text("Heater enabled: "))
    serial_println(Serial, sht31_is_heater_enabled($sht31))
    time_delay(math_number(5000))
    sht31_heater_control($sht31, "false")
    time_delay(math_number(5000))
```

### Sensor Reset
```
arduino_setup()
    sht31_init("sht31", "0x44", "Wire")
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: logic_compare(sht31_simple_read($sht31, "temperature"), GT, math_number(50))
        @DO0:
            serial_println(Serial, text("High temp! Resetting sensor..."))
            sht31_reset($sht31)
            time_delay(math_number(1000))
    
    serial_println(Serial, sht31_simple_read($sht31, "temperature"))
    time_delay(math_number(2000))
```

### Dual Sensor (Multiple Instances)
```
arduino_setup()
    sht31_init("sht31", "0x44", "Wire")
    sht31_init("sht31_2", "0x45", "Wire")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_print(Serial, text("Sensor1 Temp: "))
    serial_println(Serial, sht31_simple_read($sht31, "temperature"))
    serial_print(Serial, text("Sensor2 Temp: "))
    serial_println(Serial, sht31_simple_read($sht31_2, "temperature"))
    time_delay(math_number(2000))
```

## Important Notes

1. **Initialization**: Place `sht31_init` inside `arduino_setup()`
2. **Parameter Order**: Follows `block.json` args0 order
3. **Variable Types**: `sht31_init` creates variable with `field_input`, other blocks reference it with `field_variable` (type: Adafruit_SHT31)
4. **Multi-instance**: Supports multiple sensors with different variable names and I2C addresses
5. **Heater**: Built-in heater removes condensation; readings may shift ~+3°C when enabled
