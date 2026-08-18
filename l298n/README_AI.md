# L298N motor driver

L298N dual H-bridge DC motor drive module library, supporting speed and direction control

## Library Info
- **Name**: @aily-project/lib-l298n
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `l298n_setup` | Statement | VAR(field_input), EN(field_input), IN1(field_input), IN2(field_input) | `l298n_setup("motor", "3", "4", "5")` | `L298N motor(3, 4, 5);` |
| `l298n_setup_no_enable` | Statement | VAR(field_input), IN1(field_input), IN2(field_input) | `l298n_setup_no_enable("motor", "4", "5")` | `L298N motor(4, 5);` |
| `l298n_set_speed` | Statement | VAR(field_variable), SPEED(input_value) | `l298n_set_speed($motor, math_number(9600))` | `motor.setSpeed(1);` |
| `l298n_forward` | Statement | VAR(field_variable) | `l298n_forward($motor)` | `motor.forward();` |
| `l298n_backward` | Statement | VAR(field_variable) | `l298n_backward($motor)` | `motor.backward();` |
| `l298n_stop` | Statement | VAR(field_variable) | `l298n_stop($motor)` | `motor.stop();` |
| `l298n_run` | Statement | VAR(field_variable), DIRECTION(dropdown) | `l298n_run($motor, FORWARD)` | `motor.run(L298N::FORWARD);` |
| `l298n_forward_for` | Statement | VAR(field_variable), DELAY(input_value) | `l298n_forward_for($motor, math_number(1000))` | `motor.forwardFor(1);` |
| `l298n_backward_for` | Statement | VAR(field_variable), DELAY(input_value) | `l298n_backward_for($motor, math_number(1000))` | `motor.backwardFor(1);` |
| `l298n_run_for` | Statement | VAR(field_variable), DIRECTION(dropdown), DELAY(input_value) | `l298n_run_for($motor, FORWARD, math_number(1000))` | `motor.runFor(1, L298N::FORWARD);` |
| `l298n_get_speed` | Value | VAR(field_variable) | `l298n_get_speed($motor)` | `motor.getSpeed()` |
| `l298n_is_moving` | Value | VAR(field_variable) | `l298n_is_moving($motor)` | `motor.isMoving()` |
| `l298n_get_direction` | Value | VAR(field_variable) | `l298n_get_direction($motor)` | `motor.getDirection()` |
| `l298n_reset` | Statement | VAR(field_variable) | `l298n_reset($motor)` | `motor.reset();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DIRECTION | FORWARD, BACKWARD, STOP | l298n_run, l298n_run_for |

## ABS Examples

### Basic Usage
```
arduino_setup()
    l298n_setup("motor", "3", "4", "5")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, l298n_get_speed($motor))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `l298n_setup("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
