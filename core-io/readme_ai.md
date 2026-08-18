# I/O restraint

Core library for basic I/O control, supporting development boards using the Arduino framework

## Library Info
- **Name**: @aily-project/lib-core-io
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `io_pinmode` | Statement | PIN(input_value), MODE(input_value) | `io_pinmode(math_number(2), math_number(0))` | `pinMode(1, 1);` |
| `io_digitalwrite` | Statement | PIN(input_value), STATE(input_value) | `io_digitalwrite(math_number(2), math_number(0))` | `pinMode(1, OUTPUT); ↵ digitalWrite(1, 1);` |
| `io_digitalread` | Value | PIN(input_value) | `io_digitalread(math_number(2))` | `(pinMode(1, INPUT), digitalRead(1))` |
| `io_analogwrite` | Statement | PIN(input_value), PWM(input_value) | `io_analogwrite(math_number(2), math_number(0))` | `analogWrite(1, 1);` |
| `io_analogread` | Value | PIN(input_value) | `io_analogread(math_number(2))` | `analogRead(1)` |
| `io_pin_digi` | Value | PIN(dropdown) | `io_pin_digi(PIN)` | `PIN` |
| `io_pin_adc` | Value | PIN(dropdown) | `io_pin_adc(PIN)` | `PIN` |
| `io_pin_pwm` | Value | PIN(dropdown) | `io_pin_pwm(PIN)` | `PIN` |
| `io_mode` | Value | MODE(dropdown) | `io_mode(INPUT)` | `INPUT` |
| `io_state` | Value | STATE(dropdown) | `io_state(LOW)` | `LOW` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | INPUT, OUTPUT, INPUT_PULLUP | io_mode |
| STATE | LOW, HIGH | io_state |

## ABS Examples

### Basic Usage
```
arduino_setup()
    io_pinmode(math_number(2), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, io_digitalread(math_number(2)))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
