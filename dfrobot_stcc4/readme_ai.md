# STCC4 CO2 Sensor

Gravity STCC4 CO2 sensor library for Aily Blockly.

## Library Info
- **Name**: @aily-project/lib-dfrobot-stcc4
- **Version**: 0.1.0
- **Author**: YeezB
- **Source**: https://gitee.com/yeezb/ext-stcc4-co2-sensor
- **License**: MIT

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `stcc4_init` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(dropdown) | `stcc4_init("stcc4", Wire, "0x64")` | `while (!stcc4.begin()) { ↵ delay(500); ↵ } ↵ stcc4.wakeup(); ↵ delay(10); ↵ stcc4.startMeasurement();` |
| `stcc4_read` | Value | VAR(field_variable) | `stcc4_read($stcc4)` | `stcc4.measurement(&stcc4CO2, &stcc4Temperature, &stcc4Humidity, &stcc4Status)` |
| `stcc4_get_data` | Value | VAR(field_variable), DATA(dropdown) | `stcc4_get_data($stcc4, CO2)` | `stcc4CO2` |
| `stcc4_get_id` | Value | VAR(field_variable) | `stcc4_get_id($stcc4)` | `stcc4.getID()` |
| `stcc4_measurement_control` | Statement | VAR(field_variable), ACTION(dropdown) | `stcc4_measurement_control($stcc4, startMeasurement)` | `stcc4.startMeasurement();` |
| `stcc4_power_control` | Statement | VAR(field_variable), ACTION(dropdown) | `stcc4_power_control($stcc4, wakeup)` | `stcc4.wakeup();` |
| `stcc4_reset` | Statement | VAR(field_variable), TYPE(dropdown) | `stcc4_reset($stcc4, softRest)` | `stcc4.softRest();` |
| `stcc4_set_rht_compensation` | Statement | VAR(field_variable), TEMPERATURE(input_value), HUMIDITY(input_value) | `stcc4_set_rht_compensation($stcc4, math_number(25), math_number(50))` | `stcc4.setRHTcompensation(1, 1);` |
| `stcc4_set_pressure_compensation` | Statement | VAR(field_variable), PRESSURE(input_value) | `stcc4_set_pressure_compensation($stcc4, math_number(1013))` | `stcc4.setPressureCompensation(1);` |
| `stcc4_forced_recalibration` | Value | VAR(field_variable), TARGET_PPM(input_value) | `stcc4_forced_recalibration($stcc4, math_number(400))` | `stcc4.forcedRecalibration(1, &stcc4FrcCorrection)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x64, 0x65 | I2C address |
| DATA | CO2, TEMPERATURE, HUMIDITY, STATUS, FRC_CORRECTION | cached sensor values |
| ACTION | startMeasurement, stopMeasurement, singleMeasurement, wakeup, sleep | depends on block |
| TYPE | softRest, factoryReset | reset command |

## ABS Examples

```
arduino_setup()
    stcc4_init("stcc4", Wire, "0x64")

arduino_loop()
    controls_if(stcc4_read($stcc4))
        serial_println(Serial, stcc4_get_data($stcc4, CO2))
```

## Notes

1. `stcc4_init("name", ...)` creates `$name` as `DFRobot_STCC4_I2C`.
2. Run `stcc4_read` before `stcc4_get_data`; data blocks return the last cached values.
3. RHT compensation accepts 10-40 C and 20-80 %RH. Pressure compensation accepts 400-1100 hPa.
4. Forced recalibration target must be 0-32000 ppm; read `FRC_CORRECTION` after success.
