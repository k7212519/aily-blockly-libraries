# R4 analog waveform

Analog waveform generation library for Arduino UNO R4 WiFi, supporting sine, square and sawtooth wave outputs

## Library Info
- **Name**: @aily-project/lib-r4-analogwave
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `analogwave_init` | Statement | VAR(field_input), PIN(dropdown) | `analogwave_init("wave", DAC)` | `analogWave wave(DAC);` |
| `analogwave_sine` | Statement | VAR(field_variable), FREQ(input_value) | `analogwave_sine($wave, math_number(0))` | `wave.sine(1);` |
| `analogwave_square` | Statement | VAR(field_variable), FREQ(input_value) | `analogwave_square($wave, math_number(0))` | `wave.square(1);` |
| `analogwave_saw` | Statement | VAR(field_variable), FREQ(input_value) | `analogwave_saw($wave, math_number(0))` | `wave.saw(1);` |
| `analogwave_freq` | Statement | VAR(field_variable), FREQ(input_value) | `analogwave_freq($wave, math_number(0))` | `wave.freq(1);` |
| `analogwave_amplitude` | Statement | VAR(field_variable), AMP(input_value) | `analogwave_amplitude($wave, math_number(0))` | `wave.amplitude(1);` |
| `analogwave_start` | Statement | VAR(field_variable) | `analogwave_start($wave)` | `wave.start();` |
| `analogwave_stop` | Statement | VAR(field_variable) | `analogwave_stop($wave)` | `wave.stop();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PIN | DAC, DAC0, DAC1, A0 | analogwave_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    analogwave_init("wave", DAC)
    serial_begin(Serial, 9600)

arduino_loop()
    analogwave_sine($wave, math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `analogwave_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
