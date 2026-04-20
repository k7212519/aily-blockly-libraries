# Seeed PCA9685

Grove 16通道舵机/PWM驱动器（PCA9685）Blockly积木库

## Library Info
- **Name**: @aily-project/lib-seeed-pca9685
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_pca9685_init` | Statement | VAR(field_input), ADDRESS(field_input) | `seeed_pca9685_init("pwm", "0x7f")` | `PCA9685 pwm; pwm.init(0x7f);` |
| `seeed_pca9685_set_frequency` | Statement | VAR(field_variable), FREQ(input_value) | `seeed_pca9685_set_frequency($pwm, math_number(1000))` | `pwm.setFrequency(1000);` |
| `seeed_pca9685_set_pwm` | Statement | VAR(field_variable), PIN(input_value), ON(input_value), OFF(input_value) | `seeed_pca9685_set_pwm($pwm, math_number(1), math_number(0), math_number(1024))` | `pwm.setPwm(1, 0, 1024);` |
| `seeed_pca9685_servo_init` | Statement | VAR(field_input), ADDRESS(field_input) | `seeed_pca9685_servo_init("servo", "0x7f")` | `ServoDriver servo; servo.init(0x7f);` |
| `seeed_pca9685_servo_set_pulse_range` | Statement | VAR(field_variable), MIN(input_value), MAX(input_value), DEGREE(input_value) | `seeed_pca9685_servo_set_pulse_range($servo, math_number(500), math_number(2500), math_number(180))` | `servo.setServoPulseRange(500, 2500, 180);` |
| `seeed_pca9685_servo_set_angle` | Statement | VAR(field_variable), PIN(input_value), ANGLE(input_value) | `seeed_pca9685_servo_set_angle($servo, math_number(1), math_number(90))` | `servo.setAngle(1, 90);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x40~0x7f (except 0x70) | I2C address, default 0x7f |
| PIN | 1~16 | PWM output channel |
| ON/OFF | 0~4095 | PWM duty cycle timestamps |
| FREQ | 24~1526 | PWM frequency in Hz |
| ANGLE | 0~180 | Servo angle in degrees |
| MIN | 500 (typical) | Minimum pulse width in μs |
| MAX | 2500 (typical) | Maximum pulse width in μs |

## ABS Examples

### Servo Control
```
arduino_setup()
    seeed_pca9685_servo_init("servo", "0x7f")

arduino_loop()
    seeed_pca9685_servo_set_angle($servo, math_number(1), math_number(0))
    time_delay(math_number(1000))
    seeed_pca9685_servo_set_angle($servo, math_number(1), math_number(90))
    time_delay(math_number(1000))
```

### LED PWM Control
```
arduino_setup()
    seeed_pca9685_init("pwm", "0x7f")
    seeed_pca9685_set_frequency($pwm, math_number(100))
    seeed_pca9685_set_pwm($pwm, math_number(1), math_number(0), math_number(1024))

arduino_loop()
```

## Notes

1. **Wire.begin()**: 自动在setup中添加Wire.begin()初始化I2C
2. **I2C地址**: 用户直接输入完整格式如 `0x7f`，生成代码原样使用
3. **引脚范围**: PWM引脚编号为1-16（不是0-15）
4. **两种模式**: PCA9685用于通用PWM输出，ServoDriver用于舵机控制
5. **Variable创建**: `seeed_pca9685_init("varName", "0x7f")` 创建变量 `$varName`，后续用 `variables_get($varName)` 引用
