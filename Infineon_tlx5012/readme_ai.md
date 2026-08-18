# TLx5012B Magnetic Angle Sensor

Infineon TLx5012B magnetic angle sensor control library, suitable for Arduino, ESP32 and other development boards. Use the SPI interface to read 360° angle, angular velocity, number of rotations and temperature, suita...

## Library Info
- **Name**: @aily-project/lib-infineon-tlx5012
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tlx5012_init` | Statement | VAR(field_input), CS_PIN(dropdown) | `tlx5012_init("angleSensor", CS_PIN)` | `using namespace tle5012; ↵ Tle5012Ino angleSensor = Tle5012Ino(CS_PIN); ↵ errorTypes angleSensor_err = NO_ERROR; ↵ angleSensor_err = angleSensor.begin();` |
| `tlx5012_read_angle` | Value | VAR(field_variable) | `tlx5012_read_angle($angleSensor)` | `tlx5012_getAngle_angleSensor()` |
| `tlx5012_read_speed` | Value | VAR(field_variable) | `tlx5012_read_speed($angleSensor)` | `tlx5012_getSpeed_angleSensor()` |
| `tlx5012_read_revolutions` | Value | VAR(field_variable) | `tlx5012_read_revolutions($angleSensor)` | `tlx5012_getRevolutions_angleSensor()` |
| `tlx5012_read_temperature` | Value | VAR(field_variable) | `tlx5012_read_temperature($angleSensor)` | `tlx5012_getTemperature_angleSensor()` |
| `tlx5012_read_angle_range` | Value | VAR(field_variable) | `tlx5012_read_angle_range($angleSensor)` | `tlx5012_getAngleRange_angleSensor()` |
| `tlx5012_reset` | Statement | VAR(field_variable) | `tlx5012_reset($angleSensor)` | `angleSensor.resetFirmware();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CS_PIN | ${board.digitalPins} | tlx5012_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tlx5012_init("angleSensor", CS_PIN)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tlx5012_read_angle($angleSensor))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `tlx5012_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
