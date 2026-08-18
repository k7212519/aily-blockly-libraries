# CapacitiveSensor

Capacitive touch sensor library providing touch sensing readouts and auto-calibration configuration blocks

## Library Info
- **Name**: @aily-project/lib-capacitive-sensor
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `capacitivesensor_create` | Statement | VAR(field_input), SEND(dropdown), RECV(dropdown) | `capacitivesensor_create("sensor", SEND, RECV)` | `CapacitiveSensor sensor(SEND, RECV);` |
| `capacitivesensor_read` | Value | VAR(field_variable), SAMPLES(input_value) | `capacitivesensor_read($sensor, math_number(0))` | `sensor.capacitiveSensor(1)` |
| `capacitivesensor_read_raw` | Value | VAR(field_variable), SAMPLES(input_value) | `capacitivesensor_read_raw($sensor, math_number(0))` | `sensor.capacitiveSensorRaw(1)` |
| `capacitivesensor_set_timeout` | Statement | VAR(field_variable), TIMEOUT(input_value) | `capacitivesensor_set_timeout($sensor, math_number(1000))` | `sensor.set_CS_Timeout_Millis(1);` |
| `capacitivesensor_set_autocal` | Statement | VAR(field_variable), INTERVAL(input_value) | `capacitivesensor_set_autocal($sensor, math_number(1000))` | `sensor.set_CS_AutocaL_Millis(1);` |
| `capacitivesensor_reset_autocal` | Statement | VAR(field_variable) | `capacitivesensor_reset_autocal($sensor)` | `sensor.reset_CS_AutoCal();` |
| `capacitivesensor_wiring_hint` | Statement | (none) | `capacitivesensor_wiring_hint()` | `No direct code emitted; this block is a visual wiring hint.` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SEND | ${board.digitalPins} | capacitivesensor_create |
| RECV | ${board.digitalPins} | capacitivesensor_create |

## ABS Examples

### Basic Usage
```
arduino_setup()
    capacitivesensor_create("sensor", SEND, RECV)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, capacitivesensor_read($sensor, math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `capacitivesensor_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **UI-only extension**: `capacitivesensor_wiring_hint` updates the wiring-hint image only; it does not add ABS arguments.
