# Grove ultrasonic ranging

SeeedStudio ultrasonic distance sensor library supports measurement in centimeters, millimeters, and inches.

## Library Info
- **Name**: @aily-project/lib-seeed-ultrasonic
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ultrasonic_create` | Statement | VAR(field_input), PIN(dropdown) | `ultrasonic_create("ultrasonic", PIN)` | `Ultrasonic ultrasonic(PIN);` |
| `ultrasonic_measure_cm` | Value | VAR(field_variable) | `ultrasonic_measure_cm($ultrasonic)` | `ultrasonic.MeasureInCentimeters()` |
| `ultrasonic_measure_mm` | Value | VAR(field_variable) | `ultrasonic_measure_mm($ultrasonic)` | `ultrasonic.MeasureInMillimeters()` |
| `ultrasonic_measure_inch` | Value | VAR(field_variable) | `ultrasonic_measure_inch($ultrasonic)` | `ultrasonic.MeasureInInches()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PIN | ${board.digitalPins} | ultrasonic_create |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ultrasonic_create("ultrasonic", PIN)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ultrasonic_measure_cm($ultrasonic))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ultrasonic_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
