# FastAccelStepper

High-speed stepper motion with acceleration and queued moves.

## Library Info
- **Name**: @aily-project/lib-fastaccelstepper
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `fast_stepper_init` | Statement | VAR(field_input), STEP(dropdown), DIR(dropdown), ENABLE(dropdown) | `fast_stepper_init("stepper", STEP, DIR, ENABLE)` | `FastAccelStepperEngine _ailyStepperEngine; ↵ FastAccelStepper *stepper = nullptr; ↵ _ailyStepperEngine.init(); ↵ stepper = _ailyStepperEngine.stepperConnectToPin(STEP); ↵ if (stepper) { ↵ stepper->setDirectionPin(DIR); ↵ stepper->setEnablePin(ENABLE); ↵ stepper->setAutoEnable(true); ↵ }` |
| `fast_stepper_set_profile` | Statement | VAR(field_variable), SPEED(input_value), ACCEL(input_value) | `fast_stepper_set_profile($stepper, math_number(9600), math_number(0))` | `if (stepper) { stepper->setSpeedInHz(1); stepper->setAcceleration(1); }` |
| `fast_stepper_move` | Statement | VAR(field_variable), MODE(dropdown), STEPS(input_value) | `fast_stepper_move($stepper, move, math_number(0))` | `if (stepper) stepper->move(1);` |
| `fast_stepper_run` | Statement | VAR(field_variable), ACTION(dropdown) | `fast_stepper_run($stepper, runForward)` | `if (stepper) stepper->runForward();` |
| `fast_stepper_position` | Statement | VAR(field_variable), POSITION(input_value) | `fast_stepper_position($stepper, math_number(0))` | `if (stepper) stepper->setCurrentPosition(1);` |
| `fast_stepper_state` | Value | VAR(field_variable), STATE(dropdown) | `fast_stepper_state($stepper, getCurrentPosition)` | `(stepper ? stepper->getCurrentPosition() : 0)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | move, moveTo | fast_stepper_move |
| ACTION | runForward, runBackward, stopMove, forceStop | fast_stepper_run |
| STATE | getCurrentPosition, targetPos, isRunning, isRunningContinuously | fast_stepper_state |

## ABS Examples

### Basic Usage
```
arduino_setup()
    fast_stepper_init("stepper", STEP, DIR, ENABLE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, fast_stepper_state($stepper, getCurrentPosition))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `fast_stepper_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
