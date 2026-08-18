# SparkFun LP55231 9-Channel LED Driver

Blockly wrapper for SparkFun LP55231 9-channel I2C LED driver.

## Library Info
- **Name**: @aily-project/lib-sparkfun-lp55231
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `lp55231_init` | Statement | VAR(field_input), ADDR(dropdown) | `lp55231_init("ledDriver", "0x32")` | `ledDriver.Begin(); ↵ ledDriver.Enable();` |
| `lp55231_set_channel_pwm` | Statement | VAR(field_variable), CHANNEL(input_value), VALUE(input_value) | `lp55231_set_channel_pwm($ledDriver, math_number(0), math_number(0))` | `ledDriver.SetChannelPWM(1, 1);` |
| `lp55231_set_master_fader` | Statement | VAR(field_variable), FADER(dropdown), VALUE(input_value) | `lp55231_set_master_fader($ledDriver, "0", math_number(0))` | `ledDriver.SetMasterFader(0, 1);` |
| `lp55231_enable` | Statement | VAR(field_variable) | `lp55231_enable($ledDriver)` | `ledDriver.Enable();` |
| `lp55231_disable` | Statement | VAR(field_variable) | `lp55231_disable($ledDriver)` | `ledDriver.Disable();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDR | 0x32, 0x33, 0x34, 0x35 | lp55231_init |
| FADER | 0, 1, 2 | lp55231_set_master_fader |

## ABS Examples

### Basic Usage
```
arduino_setup()
    lp55231_init("ledDriver", "0x32")
    serial_begin(Serial, 9600)

arduino_loop()
    lp55231_set_channel_pwm($ledDriver, math_number(0), math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `lp55231_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
