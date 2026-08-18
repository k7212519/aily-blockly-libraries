# Stepper motor drive

The Blockly package of the AccelStepper library supports stepper motors with acceleration control and multi-motor synchronous control.

## Library Info
- **Name**: @aily-project/lib-accelstepper
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `accelstepper_setup` | Statement | VAR(field_input), INTERFACE(dropdown), PIN1(input_value), PIN2(input_value), PIN3(input_value), PIN4(input_value) | `accelstepper_setup("stepper", "4", math_number(2), math_number(2), math_number(2), math_number(2))` | `stepper = AccelStepper(4, 1, 1, 1, 1);` |
| `accelstepper_setup_driver` | Statement | VAR(field_input), PIN_STEP(input_value), PIN_DIR(input_value) | `accelstepper_setup_driver("stepper", math_number(2), math_number(2))` | `stepper = AccelStepper(AccelStepper::DRIVER, 1, 1);` |
| `accelstepper_move_to` | Statement | VAR(field_variable), POSITION(input_value) | `accelstepper_move_to($stepper, math_number(0))` | `stepper.moveTo(1);` |
| `accelstepper_move` | Statement | VAR(field_variable), STEPS(input_value) | `accelstepper_move($stepper, math_number(0))` | `stepper.move(1);` |
| `accelstepper_run` | Statement | VAR(field_variable) | `accelstepper_run($stepper)` | `stepper.run();` |
| `accelstepper_run_speed` | Statement | VAR(field_variable) | `accelstepper_run_speed($stepper)` | `stepper.runSpeed();` |
| `accelstepper_stop` | Statement | VAR(field_variable) | `accelstepper_stop($stepper)` | `stepper.stop();` |
| `accelstepper_set_max_speed` | Statement | VAR(field_variable), SPEED(input_value) | `accelstepper_set_max_speed($stepper, math_number(9600))` | `stepper.setMaxSpeed(1);` |
| `accelstepper_set_speed` | Statement | VAR(field_variable), SPEED(input_value) | `accelstepper_set_speed($stepper, math_number(9600))` | `stepper.setSpeed(1);` |
| `accelstepper_get_speed` | Value | VAR(field_variable) | `accelstepper_get_speed($stepper)` | `stepper.speed()` |
| `accelstepper_set_acceleration` | Statement | VAR(field_variable), ACCEL(input_value) | `accelstepper_set_acceleration($stepper, math_number(0))` | `stepper.setAcceleration(1);` |
| `accelstepper_get_current_position` | Value | VAR(field_variable) | `accelstepper_get_current_position($stepper)` | `stepper.currentPosition()` |
| `accelstepper_set_current_position` | Statement | VAR(field_variable), POSITION(input_value) | `accelstepper_set_current_position($stepper, math_number(0))` | `stepper.setCurrentPosition(1);` |
| `accelstepper_distance_to_go` | Value | VAR(field_variable) | `accelstepper_distance_to_go($stepper)` | `stepper.distanceToGo()` |
| `accelstepper_is_running` | Value | VAR(field_variable) | `accelstepper_is_running($stepper)` | `stepper.isRunning()` |
| `accelstepper_enable_outputs` | Statement | VAR(field_variable) | `accelstepper_enable_outputs($stepper)` | `stepper.enableOutputs();` |
| `accelstepper_disable_outputs` | Statement | VAR(field_variable) | `accelstepper_disable_outputs($stepper)` | `stepper.disableOutputs();` |
| `accelstepper_run_to_position` | Statement | VAR(field_variable) | `accelstepper_run_to_position($stepper)` | `stepper.runToPosition();` |
| `accelstepper_run_to_new_position` | Statement | VAR(field_variable), POSITION(input_value) | `accelstepper_run_to_new_position($stepper, math_number(0))` | `stepper.runToNewPosition(1);` |
| `accelstepper_run_speed_to_position` | Statement | VAR(field_variable) | `accelstepper_run_speed_to_position($stepper)` | `stepper.runSpeedToPosition();` |
| `accelstepper_set_enable_pin` | Statement | VAR(field_variable), PIN(input_value) | `accelstepper_set_enable_pin($stepper, math_number(2))` | `stepper.setEnablePin(1);` |
| `multistepper_create` | Statement | VAR(field_input) | `multistepper_create("steppers")` | `steppers = MultiStepper();` |
| `multistepper_add_stepper` | Statement | STEPPER(field_variable), VAR(field_variable) | `multistepper_add_stepper($stepper, $steppers)` | `steppers.addStepper(stepper);` |
| `multistepper_move_to` | Statement | VAR(field_variable), POSITIONS(input_value) | `multistepper_move_to($steppers, math_number(0))` | `steppers.moveTo(1);` |
| `multistepper_move_to_2` | Statement | VAR(field_variable), POS1(input_value), POS2(input_value) | `multistepper_move_to_2($steppers, math_number(0), math_number(0))` | `long positions_2[] = {1, 1}; ↵ steppers.moveTo(positions_2);` |
| `multistepper_move_to_3` | Statement | VAR(field_variable), POS1(input_value), POS2(input_value), POS3(input_value) | `multistepper_move_to_3($steppers, math_number(0), math_number(0), math_number(0))` | `long positions_3[] = {1, 1, 1}; ↵ steppers.moveTo(positions_3);` |
| `multistepper_move_to_4` | Statement | VAR(field_variable), POS1(input_value), POS2(input_value), POS3(input_value), POS4(input_value) | `multistepper_move_to_4($steppers, math_number(0), math_number(0), math_number(0), math_number(0))` | `long positions_4[] = {1, 1, 1, 1}; ↵ steppers.moveTo(positions_4);` |
| `multistepper_run` | Statement | VAR(field_variable) | `multistepper_run($steppers)` | `steppers.run();` |
| `multistepper_run_speed_to_position` | Statement | VAR(field_variable) | `multistepper_run_speed_to_position($steppers)` | `steppers.runSpeedToPosition();` |
| `multistepper_positions_array` | Value | INPUT0(input_value); variadic: INPUT{1...}(input_value) | `multistepper_positions_array(math_number(0), INPUT1=math_number(200))` | `{}` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| INTERFACE | 4, 2, 3, 6, 8 | accelstepper_setup |

## ABS Examples

### Basic Usage
```
arduino_setup()
    accelstepper_setup("stepper", "4", math_number(2), math_number(2), math_number(2), math_number(2))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, accelstepper_get_speed($stepper))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `accelstepper_setup("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
