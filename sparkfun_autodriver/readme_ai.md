# SparkFun L6470 AutoDriver

Blockly wrapper for the SparkFun L6470 AutoDriver stepper motor driver.

## Library Info
- **Name**: @aily-project/lib-sparkfun-autodriver
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `autodriver_init` | Statement | VAR(field_input), POSITION(field_number), CS(field_number), RESET(field_number), BUSY(field_number) | `autodriver_init("motor", 0, 10, 6, 7)` | `pinMode(6, OUTPUT); ↵ pinMode(10, OUTPUT); ↵ digitalWrite(10, HIGH); ↵ digitalWrite(6, LOW); ↵ digitalWrite(6, HIGH); ↵ SPI.begin(); ↵ SPI.setDataMode(SPI_MODE3); ↵ motor.SPIPortConnect(&SPI);` |
| `autodriver_config_step_mode` | Statement | VAR(field_variable), STEP_MODE(dropdown) | `autodriver_config_step_mode($motor, STEP_FS)` | `motor.configStepMode(STEP_FS);` |
| `autodriver_set_speed` | Statement | VAR(field_variable), TARGET(dropdown), SPEED(input_value) | `autodriver_set_speed($motor, MAX, math_number(9600))` | `motor.setMaxSpeed(1);` |
| `autodriver_set_accel` | Statement | VAR(field_variable), TARGET(dropdown), VALUE(input_value) | `autodriver_set_accel($motor, ACC, math_number(0))` | `motor.setAcc(1);` |
| `autodriver_set_kval` | Statement | VAR(field_variable), TYPE(dropdown), VALUE(input_value) | `autodriver_set_kval($motor, RUN, math_number(0))` | `motor.setRunKVAL(1);` |
| `autodriver_run` | Statement | VAR(field_variable), DIR(dropdown), SPEED(input_value) | `autodriver_run($motor, FWD, math_number(9600))` | `motor.run(FWD, 1);` |
| `autodriver_move` | Statement | VAR(field_variable), DIR(dropdown), STEPS(input_value) | `autodriver_move($motor, FWD, math_number(0))` | `motor.move(FWD, 1);` |
| `autodriver_go_to` | Statement | VAR(field_variable), POSITION(input_value) | `autodriver_go_to($motor, math_number(0))` | `motor.goTo(1);` |
| `autodriver_get_position` | Value | VAR(field_variable) | `autodriver_get_position($motor)` | `motor.getPos()` |
| `autodriver_get_status` | Value | VAR(field_variable) | `autodriver_get_status($motor)` | `motor.getStatus()` |
| `autodriver_stop` | Statement | VAR(field_variable), TYPE(dropdown) | `autodriver_stop($motor, SOFT)` | `motor.softStop();` |
| `autodriver_hiz` | Statement | VAR(field_variable), TYPE(dropdown) | `autodriver_hiz($motor, SOFT)` | `motor.softHiZ();` |
| `autodriver_reset_position` | Statement | VAR(field_variable) | `autodriver_reset_position($motor)` | `motor.resetPos();` |
| `autodriver_reset_device` | Statement | VAR(field_variable) | `autodriver_reset_device($motor)` | `motor.resetDev();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| STEP_MODE | STEP_FS, STEP_FS_2, STEP_FS_4, STEP_FS_8, STEP_FS_16, STEP_FS_32, STEP_FS_64, STEP_FS_128 | autodriver_config_step_mode |
| TARGET | MAX, MIN, FULL | autodriver_set_speed |
| TARGET | ACC, DEC | autodriver_set_accel |
| TYPE | RUN, ACC, DEC, HOLD | autodriver_set_kval |
| DIR | FWD, REV | autodriver_run, autodriver_move |
| TYPE | SOFT, HARD | autodriver_stop, autodriver_hiz |

## ABS Examples

### Basic Usage
```
arduino_setup()
    autodriver_init("motor", 0, 10, 6, 7)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, autodriver_get_position($motor))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `autodriver_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
