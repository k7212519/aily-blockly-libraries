# DM11 motor driver

Emakefun DM11 motor driver module supports dual motor PWM control

## Library Info
- **Name**: @aily-project/lib-emakefun-dm11
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `dm11_init` | Statement | VAR(field_input), I2C_ADDR(field_input), FREQUENCY(input_value) | `dm11_init("dm11", "0x15", math_number(0))` | `if (dm11.Init(1) != em::Dm11::kOK) { ↵ Serial.println("DM11 init failed"); ↵ }` |
| `dm11_pwm_duty` | Statement | VAR(field_variable), CHANNEL(dropdown), DUTY(input_value) | `dm11_pwm_duty($dm11, "0", math_number(0))` | `dm11.PwmDuty(em::Dm11::kPwmChannel0, 1);` |
| `dm11_motor_control` | Statement | VAR(field_variable), MOTOR(dropdown), SPEED(input_value) | `dm11_motor_control($dm11, A, math_number(9600))` | `if (1 >= 0) { ↵ dm11.PwmDuty(em::Dm11::kPwmChannel0, 0); ↵ dm11.PwmDuty(em::Dm11::kPwmChannel1, constrain(1, 0, 4095)); ↵ } else { ↵ dm11.PwmDuty(em::Dm11::kPwmChannel0, constrain(-1, 0, 4095)); ↵ dm11.PwmDuty(em::Dm11::kPwmChannel1, 0); ↵ }` |
| `dm11_motor_stop` | Statement | VAR(field_variable), MOTOR(dropdown) | `dm11_motor_stop($dm11, A)` | `dm11.PwmDuty(em::Dm11::kPwmChannel0, 0); ↵ dm11.PwmDuty(em::Dm11::kPwmChannel1, 0);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CHANNEL | 0, 1, 2, 3 | dm11_pwm_duty |
| MOTOR | A, B | dm11_motor_control |
| MOTOR | A, B, ALL | dm11_motor_stop |

## ABS Examples

### Basic Usage
```
arduino_setup()
    dm11_init("dm11", "0x15", math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    dm11_pwm_duty($dm11, "0", math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `dm11_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
