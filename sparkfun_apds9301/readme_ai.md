# SparkFun APDS9301 lux sensor

Blockly wrapper for the SparkFun APDS9301 lux sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-apds9301
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `apds9301_init` | Statement | VAR(field_input), ADDRESS(dropdown) | `apds9301_init("apds9301", "0x39")` | `Wire.begin(); ↵ apds9301_ready = (apds9301.begin(0x39) == APDS9301::SUCCESS);` |
| `apds9301_is_ready` | Value | VAR(field_variable) | `apds9301_is_ready($apds9301)` | `apds9301_ready` |
| `apds9301_read_lux` | Value | VAR(field_variable) | `apds9301_read_lux($apds9301)` | `apds9301.readLuxLevel()` |
| `apds9301_read_channel` | Value | VAR(field_variable), CHANNEL(dropdown) | `apds9301_read_channel($apds9301, readCH0Level)` | `apds9301.readCH0Level()` |
| `apds9301_set_gain` | Statement | VAR(field_variable), GAIN(dropdown) | `apds9301_set_gain($apds9301, APDS9301::LOW_GAIN)` | `apds9301.setGain(APDS9301::LOW_GAIN);` |
| `apds9301_set_integration_time` | Statement | VAR(field_variable), TIME(dropdown) | `apds9301_set_integration_time($apds9301, APDS9301::INT_TIME_13_7_MS)` | `apds9301.setIntegrationTime(APDS9301::INT_TIME_13_7_MS);` |
| `apds9301_enable_interrupt` | Statement | VAR(field_variable), STATE(dropdown) | `apds9301_enable_interrupt($apds9301, APDS9301::INT_ON)` | `apds9301.enableInterrupt(APDS9301::INT_ON);` |
| `apds9301_set_threshold` | Statement | VAR(field_variable), BOUND(dropdown), THRESHOLD(input_value) | `apds9301_set_threshold($apds9301, LOW, math_number(0))` | `apds9301.setLowThreshold(1);` |
| `apds9301_power` | Statement | VAR(field_variable), STATE(dropdown) | `apds9301_power($apds9301, APDS9301::POW_ON)` | `apds9301.powerEnable(APDS9301::POW_ON);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x39, 0x29, 0x49 | apds9301_init |
| CHANNEL | readCH0Level, readCH1Level | apds9301_read_channel |
| GAIN | APDS9301::LOW_GAIN, APDS9301::HIGH_GAIN | apds9301_set_gain |
| TIME | APDS9301::INT_TIME_13_7_MS, APDS9301::INT_TIME_101_MS, APDS9301::INT_TIME_402_MS | apds9301_set_integration_time |
| STATE | APDS9301::INT_ON, APDS9301::INT_OFF | apds9301_enable_interrupt |
| BOUND | LOW, HIGH | apds9301_set_threshold |
| STATE | APDS9301::POW_ON, APDS9301::POW_OFF | apds9301_power |

## ABS Examples

### Basic Usage
```
arduino_setup()
    apds9301_init("apds9301", "0x39")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, apds9301_is_ready($apds9301))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `apds9301_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
