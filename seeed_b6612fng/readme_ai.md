# Grove Motor Driver TB6612FNG

I2C motor driver module supporting 2 DC motors or 1 stepper motor.

## Library Info
- **Name**: @aily-project/lib-seeed_tb6612fng
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tb6612fng_init` | Statement | VAR(field_input), ADDR(dropdown) | `tb6612fng_init("motor", 0x14)` | `MotorDriver motor; Wire.begin(); motor.init(0x14);` |
| `tb6612fng_dc_run` | Statement | VAR(field_variable), CHANNEL(dropdown), SPEED(input_value) | `tb6612fng_dc_run($motor, MOTOR_CHA, math_number(255))` | `motor.dcMotorRun(MOTOR_CHA, 255);` |
| `tb6612fng_dc_brake` | Statement | VAR(field_variable), CHANNEL(dropdown) | `tb6612fng_dc_brake($motor, MOTOR_CHA)` | `motor.dcMotorBrake(MOTOR_CHA);` |
| `tb6612fng_dc_stop` | Statement | VAR(field_variable), CHANNEL(dropdown) | `tb6612fng_dc_stop($motor, MOTOR_CHA)` | `motor.dcMotorStop(MOTOR_CHA);` |
| `tb6612fng_stepper_run` | Statement | VAR(field_variable), MODE(dropdown), STEPS(input_value), RPM(input_value) | `tb6612fng_stepper_run($motor, FULL_STEP, math_number(200), math_number(120))` | `motor.stepperRun(FULL_STEP, 200, 120);` |
| `tb6612fng_stepper_stop` | Statement | VAR(field_variable) | `tb6612fng_stepper_stop($motor)` | `motor.stepperStop();` |
| `tb6612fng_stepper_keep_run` | Statement | VAR(field_variable), MODE(dropdown), RPM(input_value), DIR(dropdown) | `tb6612fng_stepper_keep_run($motor, MICRO_STEPPING, math_number(120), true)` | `motor.stepperKeepRun(MICRO_STEPPING, 120, true);` |
| `tb6612fng_standby` | Statement | VAR(field_variable) | `tb6612fng_standby($motor)` | `motor.standby();` |
| `tb6612fng_not_standby` | Statement | VAR(field_variable) | `tb6612fng_not_standby($motor)` | `motor.notStandby();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDR | 0x14, 0x15, 0x16, 0x17 | I2C address |
| CHANNEL | MOTOR_CHA, MOTOR_CHB | DC motor channel |
| MODE | FULL_STEP, WAVE_DRIVE, HALF_STEP, MICRO_STEPPING | Stepper mode |
| DIR | true, false | Direction: true=CW, false=CCW |

## ABS Examples

### DC Motor Control
```
arduino_setup()
    tb6612fng_init("motor", 0x14)

arduino_loop()
    tb6612fng_dc_run($motor, MOTOR_CHA, math_number(255))
    tb6612fng_dc_run($motor, MOTOR_CHB, math_number(255))
    time_delay(math_number(1000))
    tb6612fng_dc_brake($motor, MOTOR_CHA)
    tb6612fng_dc_brake($motor, MOTOR_CHB)
    time_delay(math_number(1000))
```

### Stepper Motor Control
```
arduino_setup()
    tb6612fng_init("motor", 0x14)

arduino_loop()
    tb6612fng_stepper_run($motor, HALF_STEP, math_number(4000), math_number(120))
    time_delay(math_number(6000))
    tb6612fng_stepper_keep_run($motor, MICRO_STEPPING, math_number(120), true)
    time_delay(math_number(3000))
    tb6612fng_stepper_stop($motor)
    time_delay(math_number(3000))
```

## Notes

1. **Initialization**: Call `tb6612fng_init` inside `arduino_setup()`, it auto-calls `Wire.begin()`
2. **Variable**: `tb6612fng_init("motor", ...)` creates variable `$motor`; reference with `variables_get($motor)`
3. **Speed range**: DC motor speed -255~255, positive=CW, negative=CCW
4. **RPM range**: Stepper RPM 1~300, high RPM may cause step loss (recommended ≤150)
5. **Stepper modes**: FULL_STEP/WAVE_DRIVE = 1.8°/step (200 steps/rev), HALF_STEP = 0.9°/step (400 steps/rev)
