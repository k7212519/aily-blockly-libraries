# TMCStepper

Configure TMC2209 UART and TMC2130 SPI stepper drivers with diagnostics.

## Library Info
- **Name**: @aily-project/lib-tmcstepper
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tmc2209_init` | Statement | VAR(field_input), SERIAL(dropdown), BAUD(dropdown), ADDRESS(input_value), RSENSE(input_value) | `tmc2209_init("tmcDriver", SERIAL, BAUD, math_number(0), math_number(0))` | `TMC2209Stepper tmcDriver(&SERIAL, 1, 1); ↵ SERIAL.begin(BAUD); ↵ tmcDriver.begin();` |
| `tmc2130_init` | Statement | VAR(field_input), CS(dropdown), RSENSE(input_value) | `tmc2130_init("tmcDriver", CS, math_number(0))` | `TMC2130Stepper tmcDriver(CS, 1); ↵ SPI.begin(); ↵ tmcDriver.begin();` |
| `tmc_set_current` | Statement | VAR(field_variable), CURRENT(input_value), HOLD(input_value) | `tmc_set_current($tmcDriver, math_number(0), math_number(0))` | `tmcDriver.rms_current(1, 1);` |
| `tmc_set_motion` | Statement | VAR(field_variable), MICROSTEPS(input_value), TOFF(input_value) | `tmc_set_motion($tmcDriver, math_number(0), math_number(0))` | `tmcDriver.microsteps(1); ↵ tmcDriver.toff(1);` |
| `tmc2209_mode` | Statement | VAR(field_variable), MODE(dropdown), AUTOSCALE(field_checkbox) | `tmc2209_mode($tmcDriver, stealth, TRUE)` | `tmcDriver.en_spreadCycle(false); ↵ tmcDriver.pwm_autoscale(true);` |
| `tmc2209_stall` | Statement | VAR(field_variable), SGTHRS(input_value), TCOOLTHRS(input_value) | `tmc2209_stall($tmcDriver, math_number(0), math_number(0))` | `tmcDriver.SGTHRS(1); ↵ tmcDriver.TCOOLTHRS(1);` |
| `tmc_read` | Value | VAR(field_variable), DATA(dropdown) | `tmc_read($tmcDriver, DRV_STATUS)` | `tmcDriver.DRV_STATUS()` |
| `tmc_connection` | Value | VAR(field_variable) | `tmc_connection($tmcDriver)` | `tmcDriver.test_connection()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | stealth, spread | tmc2209_mode |
| DATA | DRV_STATUS, TSTEP, microsteps, current | tmc_read |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tmc2209_init("tmcDriver", SERIAL, BAUD, math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tmc_read($tmcDriver, DRV_STATUS))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `tmc2209_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
