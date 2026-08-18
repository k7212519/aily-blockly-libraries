# Heart Rate Sensor

Photoelectric heart rate sensor library, supports BPM calculation and waveform output.

## Library Info
- **Name**: @aily-project/lib-heartrate
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `heartrate_init` | Statement | VAR(field_input), PIN(dropdown) | `heartrate_init("heartSensor", PIN)` | `heartSensor.begin(PIN);` |
| `heartrate_update` | Statement | VAR(field_variable) | `heartrate_update($heartSensor)` | `heartSensor.update();` |
| `heartrate_get_bpm` | Value | VAR(field_variable) | `heartrate_get_bpm($heartSensor)` | `heartSensor.getBPM()` |
| `heartrate_get_wave` | Value | VAR(field_variable) | `heartrate_get_wave($heartSensor)` | `heartSensor.getWave()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PIN | `${board.analogPins}` | heartrate_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    heartrate_init("heartSensor", PIN)
    serial_begin(Serial, 115200)

arduino_loop()
    heartrate_update($heartSensor)
    serial_print(Serial, text("BPM: "))
    serial_println(Serial, heartrate_get_bpm($heartSensor))
    serial_print(Serial, text("Wave: "))
    serial_println(Serial, heartrate_get_wave($heartSensor))
    time_delay(math_number(25))
```

## Notes

1. **Variable**: `heartrate_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **Update**: call `heartrate_update` continuously in `arduino_loop()` before reading BPM or waveform values.
