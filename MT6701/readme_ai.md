# MT6701 magnetic rotary encoder

MT6701 magnetic rotary encoder library, supports angle reading, RPM calculation and revolution accumulation, suitable for ESP32 development board

## Library Info
- **Name**: @aily-project/lib-mt6701
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mt6701_init` | Statement | OBJECT(field_variable) | `mt6701_init($encoder)` | `MT6701 encoder; ↵ encoder.begin();` |
| `mt6701_init_advanced` | Statement | OBJECT(field_variable), ADDRESS(dropdown), INTERVAL(input_value) | `mt6701_init_advanced($encoder, "0x06", math_number(1000))` | `MT6701 encoder(0x06, 1); ↵ encoder.begin();` |
| `mt6701_get_angle_radians` | Value | OBJECT(field_variable) | `mt6701_get_angle_radians($encoder)` | `encoder.getAngleRadians()` |
| `mt6701_get_angle_degrees` | Value | OBJECT(field_variable) | `mt6701_get_angle_degrees($encoder)` | `encoder.getAngleDegrees()` |
| `mt6701_get_rpm` | Value | OBJECT(field_variable) | `mt6701_get_rpm($encoder)` | `encoder.getRPM()` |
| `mt6701_get_count` | Value | OBJECT(field_variable) | `mt6701_get_count($encoder)` | `encoder.getCount()` |
| `mt6701_get_full_turns` | Value | OBJECT(field_variable) | `mt6701_get_full_turns($encoder)` | `encoder.getFullTurns()` |
| `mt6701_get_turns` | Value | OBJECT(field_variable) | `mt6701_get_turns($encoder)` | `encoder.getTurns()` |
| `mt6701_get_accumulator` | Value | OBJECT(field_variable) | `mt6701_get_accumulator($encoder)` | `encoder.getAccumulator()` |
| `mt6701_update_count` | Statement | OBJECT(field_variable) | `mt6701_update_count($encoder)` | `encoder.updateCount();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x06, 0x07, 0x08, 0x09 | mt6701_init_advanced |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mt6701_init($encoder)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mt6701_get_angle_radians($encoder))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
