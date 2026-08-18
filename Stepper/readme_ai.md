# Stepper Motor Driver Library

Driver library for four-phase five-wire stepper motor 28BYJ-48, often used with driver boards such as ULN2003, and supports Arduino UNO, ESP32 and other development boards

## Library Info
- **Name**: @aily-project/lib-stepper
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `stepper_init` | Statement | STEPPER(field_variable), STEPS(field_number), PIN1(dropdown), PIN2(dropdown), PIN3(dropdown), PIN4(dropdown) | `stepper_init($stepper, 4096, PIN1, PIN2, PIN3, PIN4)` | `Stepper stepper(4096, PIN1, PIN2, PIN3, PIN4);` |
| `stepper_set_speed` | Statement | STEPPER(field_variable), SPEED(field_number) | `stepper_set_speed($stepper, 5)` | `stepper.setSpeed(5);` |
| `stepper_step` | Statement | STEPPER(field_variable), STEPS(input_value) | `stepper_step($stepper, math_number(0))` | `stepper.step(1);` |
| `stepper_rotate_degrees` | Statement | STEPPER(field_variable), DEGREES(input_value) | `stepper_rotate_degrees($stepper, math_number(90))` | `// 旋转指定角度 ↵ { ↵ // 将角度转换为步数 (度数 / 360) * 每圈步数 ↵ int steps = (int)((1 / 360.0) * 2048); ↵ stepper.step(steps); ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PIN1 | ${board.digitalPins} | stepper_init |
| PIN2 | ${board.digitalPins} | stepper_init |
| PIN3 | ${board.digitalPins} | stepper_init |
| PIN4 | ${board.digitalPins} | stepper_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    stepper_init($stepper, 4096, PIN1, PIN2, PIN3, PIN4)
    serial_begin(Serial, 9600)

arduino_loop()
    stepper_set_speed($stepper, 5)
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
