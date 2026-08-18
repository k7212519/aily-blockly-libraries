# SparkFun CCS811 Air Quality Sensor

Blockly wrapper for the SparkFun CCS811 eCO2 and TVOC sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-ccs811
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ccs811_init` | Statement | VAR(field_input), ADDRESS(dropdown) | `ccs811_init("ccs811", "0x5B")` | `Wire.begin(); ↵ ccs811.setI2CAddress(0x5B); ↵ ccs811_ready = ccs811.begin();` |
| `ccs811_is_ready` | Value | VAR(field_variable) | `ccs811_is_ready($ccs811)` | `ccs811_ready` |
| `ccs811_data_available` | Value | VAR(field_variable) | `ccs811_data_available($ccs811)` | `ccs811.dataAvailable()` |
| `ccs811_read_results` | Statement | VAR(field_variable) | `ccs811_read_results($ccs811)` | `ccs811.readAlgorithmResults();` |
| `ccs811_get_co2` | Value | VAR(field_variable) | `ccs811_get_co2($ccs811)` | `ccs811.getCO2()` |
| `ccs811_get_tvoc` | Value | VAR(field_variable) | `ccs811_get_tvoc($ccs811)` | `ccs811.getTVOC()` |
| `ccs811_set_drive_mode` | Statement | VAR(field_variable), MODE(dropdown) | `ccs811_set_drive_mode($ccs811, "0")` | `ccs811.setDriveMode(0);` |
| `ccs811_set_environmental_data` | Statement | VAR(field_variable), HUMIDITY(input_value), TEMPERATURE(input_value) | `ccs811_set_environmental_data($ccs811, math_number(0), math_number(0))` | `ccs811.setEnvironmentalData(1, 1);` |
| `ccs811_get_baseline` | Value | VAR(field_variable) | `ccs811_get_baseline($ccs811)` | `ccs811.getBaseline()` |
| `ccs811_set_baseline` | Statement | VAR(field_variable), BASELINE(input_value) | `ccs811_set_baseline($ccs811, math_number(0))` | `ccs811.setBaseline(1);` |
| `ccs811_has_error` | Value | VAR(field_variable) | `ccs811_has_error($ccs811)` | `ccs811.checkForStatusError()` |
| `ccs811_error_register` | Value | VAR(field_variable) | `ccs811_error_register($ccs811)` | `ccs811.getErrorRegister()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x5B, 0x5A | ccs811_init |
| MODE | 0, 1, 2, 3, 4 | ccs811_set_drive_mode |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ccs811_init("ccs811", "0x5B")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ccs811_is_ready($ccs811))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ccs811_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
