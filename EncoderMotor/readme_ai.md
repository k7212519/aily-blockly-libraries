# encoder motor

ESP32 coding motor driver library supports PWM control and speed loop PID control

## Library Info
- **Name**: @aily-project/lib-encoder-motor
- **Version**: 1.1.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `encoder_motor_create` | Statement | VAR(field_input), POS_PIN(input_value), NEG_PIN(input_value), A_PIN(input_value), B_PIN(input_value), PPR(input_value), REDUCTION(input_value), PHASE(dropdown) | `encoder_motor_create("motor1", math_number(2), math_number(2), math_number(2), math_number(2), math_number(0), math_number(0), em::EncoderMotor::kAPhaseLeads)` | `em::EncoderMotor motor1(1, 1, 1, 1, 1, 1, em::EncoderMotor::kAPhaseLeads); ↵ motor1.Init();` |
| `encoder_motor_set_pid` | Statement | VAR(field_variable), P(input_value), I(input_value), D(input_value) | `encoder_motor_set_pid($motor1, math_number(0), math_number(0), math_number(0))` | `motor1.SetSpeedPid(1, 1, 1);` |
| `encoder_motor_run_pwm` | Statement | VAR(field_variable), PWM(input_value) | `encoder_motor_run_pwm($motor1, math_number(0))` | `motor1.RunPwmDuty(constrain(1, -1023, 1023));` |
| `encoder_motor_run_speed` | Statement | VAR(field_variable), SPEED(input_value) | `encoder_motor_run_speed($motor1, math_number(9600))` | `motor1.RunSpeed(constrain(1, -300, 300));` |
| `encoder_motor_stop` | Statement | VAR(field_variable) | `encoder_motor_stop($motor1)` | `motor1.Stop();` |
| `encoder_motor_get_speed` | Value | VAR(field_variable) | `encoder_motor_get_speed($motor1)` | `motor1.SpeedRpm()` |
| `encoder_motor_get_pwm` | Value | VAR(field_variable) | `encoder_motor_get_pwm($motor1)` | `motor1.PwmDuty()` |
| `encoder_motor_get_pulse` | Value | VAR(field_variable) | `encoder_motor_get_pulse($motor1)` | `motor1.EncoderPulseCount()` |
| `encoder_motor_get_revolutions` | Value | VAR(field_variable) | `encoder_motor_get_revolutions($motor1)` | `motor1.GetRevolutions()` |
| `encoder_motor_reset_pulse` | Statement | VAR(field_variable) | `encoder_motor_reset_pulse($motor1)` | `motor1.ResetPulseCount();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PHASE | em::EncoderMotor::kAPhaseLeads, em::EncoderMotor::kBPhaseLeads | encoder_motor_create |

## ABS Examples

### Basic Usage
```
arduino_setup()
    encoder_motor_create("motor1", math_number(2), math_number(2), math_number(2), math_number(2), math_number(0), math_number(0), em::EncoderMotor::kAPhaseLeads)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, encoder_motor_get_speed($motor1))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `encoder_motor_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
