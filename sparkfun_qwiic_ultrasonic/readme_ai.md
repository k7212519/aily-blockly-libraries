# SparkFun Qwiic Ultrasonic Distance Sensor

Blockly wrapper for SparkFun Qwiic Ultrasonic distance sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-qwiic-ultrasonic
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `qwiic_ultrasonic_init` | Statement | VAR(field_input) | `qwiic_ultrasonic_init("sonar")` | `sonar.begin();` |
| `qwiic_ultrasonic_read` | Value | VAR(field_variable) | `qwiic_ultrasonic_read($sonar)` | `([&](){ sonar.triggerAndRead(_ultrasonic_dist_sonar); return _ultrasonic_dist_sonar; })()` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    qwiic_ultrasonic_init("sonar")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, qwiic_ultrasonic_read($sonar))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `qwiic_ultrasonic_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
