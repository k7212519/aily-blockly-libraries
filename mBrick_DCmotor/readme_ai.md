# mBrick DC Motor

Blockly library for mBrick DC Motor.

## Library Info
- **Name**: @aily-project/lib-mbrick-dcmotor
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mbrick_motor_init` | Statement | VAR(field_input), MOTOR(dropdown) | `mbrick_motor_init("motor1", M1)` | `motor1.begin();` |
| `mbrick_motor_forward` | Statement | VAR(field_variable), PWM(input_value) | `mbrick_motor_forward($motor1, math_number(0))` | `motor1.forward(1);` |
| `mbrick_motor_backward` | Statement | VAR(field_variable), PWM(input_value) | `mbrick_motor_backward($motor1, math_number(0))` | `motor1.backward(1);` |
| `mbrick_motor_stop` | Statement | VAR(field_variable), MODE(dropdown) | `mbrick_motor_stop($motor1, COAST)` | `motor1.stop(COAST);` |
| `mbrick_motor_set_speed` | Statement | VAR(field_variable), PWM(input_value) | `mbrick_motor_set_speed($motor1, math_number(0))` | `motor1.setSpeedPWM(1);` |
| `mbrick_motor_is_running` | Value | VAR(field_variable) | `mbrick_motor_is_running($motor1)` | `motor1.isRunning()` |
| `mbrick_car_init` | Statement | VAR(field_input), LEFT_MOTOR(field_variable), RIGHT_MOTOR(field_variable) | `mbrick_car_init("car", $motor1, $motor2)` | `car.begin();` |
| `mbrick_car_forward` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car_forward($car, math_number(9600))` | `car.forward(1);` |
| `mbrick_car_backward` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car_backward($car, math_number(9600))` | `car.backward(1);` |
| `mbrick_car_turn_left` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car_turn_left($car, math_number(9600))` | `car.turnLeft(1);` |
| `mbrick_car_turn_right` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car_turn_right($car, math_number(9600))` | `car.turnRight(1);` |
| `mbrick_car_stop` | Statement | VAR(field_variable), MODE(dropdown) | `mbrick_car_stop($car, COAST)` | `car.stop(COAST);` |
| `mbrick_car_set_speed` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car_set_speed($car, math_number(9600))` | `car.setSpeed(1);` |
| `mbrick_car_set_min_pwm` | Statement | VAR(field_variable), MIN_PWM(input_value) | `mbrick_car_set_min_pwm($car, math_number(0))` | `car.setMinPWM(1);` |
| `mbrick_car4wd_init` | Statement | VAR(field_input), LF(field_variable), LR(field_variable), RF(field_variable), RR(field_variable) | `mbrick_car4wd_init("car4wd", $motor1, $motor2, $motor3, $motor4)` | `car4wd.begin();` |
| `mbrick_car4wd_forward` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car4wd_forward($car4wd, math_number(9600))` | `car4wd.forward(1);` |
| `mbrick_car4wd_backward` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car4wd_backward($car4wd, math_number(9600))` | `car4wd.backward(1);` |
| `mbrick_car4wd_turn_left` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car4wd_turn_left($car4wd, math_number(9600))` | `car4wd.turnLeft(1);` |
| `mbrick_car4wd_turn_right` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car4wd_turn_right($car4wd, math_number(9600))` | `car4wd.turnRight(1);` |
| `mbrick_car4wd_stop` | Statement | VAR(field_variable), MODE(dropdown) | `mbrick_car4wd_stop($car4wd, COAST)` | `car4wd.stop(COAST);` |
| `mbrick_car4wd_set_speed` | Statement | VAR(field_variable), SPEED(input_value) | `mbrick_car4wd_set_speed($car4wd, math_number(9600))` | `car4wd.setSpeed(1);` |
| `mbrick_car4wd_set_min_pwm` | Statement | VAR(field_variable), MIN_PWM(input_value) | `mbrick_car4wd_set_min_pwm($car4wd, math_number(0))` | `car4wd.setMinPWM(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MOTOR | M1, M2, M3, M4 | mbrick_motor_init |
| MODE | COAST, BRAKE | mbrick_motor_stop, mbrick_car_stop, mbrick_car4wd_stop |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mbrick_motor_init("motor1", M1)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mbrick_motor_is_running($motor1))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `mbrick_motor_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **PWM channels**: the bundled driver binds motors to high LEDC channels first, avoiding ESP32Servo's default low-channel allocation.
