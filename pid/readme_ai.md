# PID controller library

The optimized PID controller library provides functions such as quick setup, parameter preset, temperature control, motor speed regulation, etc., and supports various Arduino development boards.

## Library Info
- **Name**: @aily-project/lib-pid
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `pid_init` | Statement | PID_NAME(field_variable), INPUT(field_variable), OUTPUT(field_variable), SETPOINT(field_variable), PRESET(dropdown), KP(field_number), KI(field_number), KD(field_number), DIRECTION(dropdown) | `pid_init($myPID, $input, $output, $setpoint, custom, 2, 5, 1, DIRECT)` | `double input; ↵ double output; ↵ double setpoint; ↵ double Kp_myPID = 2, Ki_myPID = 5, Kd_myPID = 1; ↵ PID myPID(&input, &output, &setpoint, Kp_myPID, Ki_myPID, Kd_myPID, DIRECT); ↵ myPID.SetMode(AUTOMATIC);` |
| `pid_quick_setup` | Statement | INPUT_PIN(dropdown), OUTPUT_PIN(dropdown), SETPOINT(input_value), APPLICATION(dropdown) | `pid_quick_setup(INPUT_PIN, OUTPUT_PIN, math_number(0), temperature)` | `quickPidInput = analogRead(INPUT_PIN); ↵ quickPID.Compute(); ↵ analogWrite(OUTPUT_PIN, quickPidOutput);` |
| `pid_compute` | Statement | PID_NAME(field_variable) | `pid_compute($myPID)` | `myPID.Compute();` |
| `pid_control_loop` | Statement | PID_NAME(field_variable), READ_INPUT(input_statement), WRITE_OUTPUT(input_statement) | `pid_control_loop($myPID)` | `myPID.Compute();` |
| `pid_temperature_control` | Statement | TEMP_PIN(dropdown), HEATER_PIN(dropdown), TARGET_TEMP(input_value) | `pid_temperature_control(TEMP_PIN, HEATER_PIN, math_number(0))` | `tempInput = readTemperature(TEMP_PIN); ↵ tempPID.Compute(); ↵ analogWrite(HEATER_PIN, tempOutput);` |
| `pid_motor_speed_control` | Statement | ENCODER_PIN(dropdown), MOTOR_PIN(dropdown), TARGET_RPM(input_value) | `pid_motor_speed_control(ENCODER_PIN, MOTOR_PIN, math_number(0))` | `motorInput = calculateRPM(); ↵ motorPID.Compute(); ↵ analogWrite(MOTOR_PIN, motorOutput);` |
| `pid_set_mode` | Statement | PID_NAME(field_variable), MODE(dropdown) | `pid_set_mode($myPID, AUTOMATIC)` | `myPID.SetMode(AUTOMATIC);` |
| `pid_set_tunings` | Statement | PID_NAME(field_variable), KP(input_value), KI(input_value), KD(input_value) | `pid_set_tunings($myPID, math_number(0), math_number(0), math_number(0))` | `myPID.SetTunings(1, 1, 1);` |
| `pid_set_output_limits` | Statement | PID_NAME(field_variable), MIN(input_value), MAX(input_value) | `pid_set_output_limits($myPID, math_number(0), math_number(0))` | `myPID.SetOutputLimits(1, 1);` |
| `pid_get_input` | Value | INPUT(field_variable) | `pid_get_input($input)` | `input` |
| `pid_get_output` | Value | OUTPUT(field_variable) | `pid_get_output($output)` | `output` |
| `pid_set_setpoint` | Statement | SETPOINT(field_variable), VALUE(input_value) | `pid_set_setpoint($setpoint, math_number(0))` | `setpoint = 1;` |
| `pid_set_input` | Statement | INPUT(field_variable), VALUE(input_value) | `pid_set_input($input, math_number(0))` | `input = 1;` |
| `pid_adaptive_control` | Statement | PID_NAME(field_variable), INPUT(field_variable), SETPOINT(field_variable), THRESHOLD(field_number), AGG_KP(field_number), AGG_KI(field_number), AGG_KD(field_number), CONS_KP(field_number), CONS_KI(field_number), CONS_KD(field_number) | `pid_adaptive_control($myPID, $input, $setpoint, 10, 4, 0.2, 1, 1, 0.05, 0.25)` | `double gap_myPID = abs(setpoint - input); ↵ if (gap_myPID < 10) { ↵ myPID.SetTunings(consKp_myPID, consKi_myPID, consKd_myPID); ↵ } else { ↵ myPID.SetTunings(aggKp_myPID, aggKi_myPID, aggKd_myPID); ↵ } ↵ myPID.Compute();` |
| `pid_is_at_setpoint` | Value | INPUT(field_variable), SETPOINT(field_variable), TOLERANCE(field_number) | `pid_is_at_setpoint($input, $setpoint, 5)` | `abs(setpoint - input) <= 5` |
| `pid_get_error` | Value | INPUT(field_variable), SETPOINT(field_variable) | `pid_get_error($input, $setpoint)` | `(setpoint - input)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PRESET | custom, temperature, motor_speed, position, level | pid_init |
| DIRECTION | DIRECT, REVERSE | pid_init |
| APPLICATION | temperature, motor_speed, position, level, custom | pid_quick_setup |
| MODE | AUTOMATIC, MANUAL | pid_set_mode |

## ABS Examples

### Basic Usage
```
arduino_setup()
    pid_init($myPID, $input, $output, $setpoint, custom, 2, 5, 1, DIRECT)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, pid_get_input($input))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **UI-only extension**: `pid_init` applies preset/default values to existing inputs only; it does not add ABS arguments.
