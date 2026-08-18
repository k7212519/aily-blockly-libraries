# Seeed PCA9685 Servo/PWM Driver

Seeed PCA9685 I2C 16-channel PWM/servo driver library with PWM output and servo angle control

## Library Info
- **Name**: @aily-project/lib-seeed-pca9685
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_pca9685_init` | Statement | VAR(field_input), ADDRESS(field_input) | `seeed_pca9685_init("pwm", "0x7f")` | `pwm.init(0x7f);` |
| `seeed_pca9685_set_frequency` | Statement | VAR(field_variable), FREQ(input_value) | `seeed_pca9685_set_frequency($pwm, math_number(0))` | `pwm.setFrequency(1);` |
| `seeed_pca9685_set_pwm` | Statement | VAR(field_variable), PIN(input_value), ON(input_value), OFF(input_value) | `seeed_pca9685_set_pwm($pwm, math_number(2), math_number(0), math_number(0))` | `pwm.setPwm(1, 1, 1);` |
| `seeed_pca9685_servo_init` | Statement | VAR(field_input), ADDRESS(field_input) | `seeed_pca9685_servo_init("servo", "0x7f")` | `servo.init(0x7f);` |
| `seeed_pca9685_servo_set_pulse_range` | Statement | VAR(field_variable), MIN(input_value), MAX(input_value), DEGREE(input_value) | `seeed_pca9685_servo_set_pulse_range($servo, math_number(0), math_number(0), math_number(90))` | `servo.setServoPulseRange(1, 1, 1);` |
| `seeed_pca9685_servo_set_angle` | Statement | VAR(field_variable), PIN(input_value), ANGLE(input_value) | `seeed_pca9685_servo_set_angle($servo, math_number(2), math_number(90))` | `servo.setAngle(1, 1);` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    seeed_pca9685_init("pwm", "0x7f")
    serial_begin(Serial, 9600)

arduino_loop()
    seeed_pca9685_set_frequency($pwm, math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `seeed_pca9685_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
