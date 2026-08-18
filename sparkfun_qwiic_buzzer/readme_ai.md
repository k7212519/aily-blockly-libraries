# SparkFun Qwiic Buzzer

Blockly wrapper for SparkFun Qwiic Buzzer (I2C tone control, sound effects).

## Library Info
- **Name**: @aily-project/lib-sparkfun-qwiic-buzzer
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `qwiic_buzzer_init` | Statement | VAR(field_input) | `qwiic_buzzer_init("buzzer")` | `buzzer.begin();` |
| `qwiic_buzzer_on` | Statement | VAR(field_variable) | `qwiic_buzzer_on($buzzer)` | `buzzer.on();` |
| `qwiic_buzzer_off` | Statement | VAR(field_variable) | `qwiic_buzzer_off($buzzer)` | `buzzer.off();` |
| `qwiic_buzzer_configure` | Statement | VAR(field_variable), FREQ(input_value), DURATION(input_value), VOLUME(dropdown) | `qwiic_buzzer_configure($buzzer, math_number(0), math_number(1000), "4")` | `buzzer.configureBuzzer(1, 1, 4);` |
| `qwiic_buzzer_sound_effect` | Statement | VAR(field_variable), EFFECT(input_value), VOLUME(dropdown) | `qwiic_buzzer_sound_effect($buzzer, math_number(0), "4")` | `buzzer.playSoundEffect(1, 4);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| VOLUME | 4, 3, 2, 1, 0 | qwiic_buzzer_configure |
| VOLUME | 4, 3, 2, 1 | qwiic_buzzer_sound_effect |

## ABS Examples

### Basic Usage
```
arduino_setup()
    qwiic_buzzer_init("buzzer")
    serial_begin(Serial, 9600)

arduino_loop()
    qwiic_buzzer_on($buzzer)
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `qwiic_buzzer_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
