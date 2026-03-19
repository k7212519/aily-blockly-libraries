# TLx5012B Magnetic Angle Sensor

Infineon XENSIV TLx5012B magnetic angle sensor Blockly library for 360° angular position sensing via SPI.

## Library Info
- **Name**: @aily-project/lib-infineon-tlx5012
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tlx5012_init` | Statement | VAR(field_input), CS_PIN(dropdown) | `tlx5012_init("angleSensor", 10)` | `Tle5012Ino angleSensor = Tle5012Ino(10);` + setup `angleSensor.begin();` |
| `tlx5012_read_angle` | Value(Number) | VAR(field_variable) | `tlx5012_read_angle(variables_get($angleSensor))` | `tlx5012_getAngle_angleSensor()` |
| `tlx5012_read_speed` | Value(Number) | VAR(field_variable) | `tlx5012_read_speed(variables_get($angleSensor))` | `tlx5012_getSpeed_angleSensor()` |
| `tlx5012_read_revolutions` | Value(Number) | VAR(field_variable) | `tlx5012_read_revolutions(variables_get($angleSensor))` | `tlx5012_getRevolutions_angleSensor()` |
| `tlx5012_read_temperature` | Value(Number) | VAR(field_variable) | `tlx5012_read_temperature(variables_get($angleSensor))` | `tlx5012_getTemperature_angleSensor()` |
| `tlx5012_read_angle_range` | Value(Number) | VAR(field_variable) | `tlx5012_read_angle_range(variables_get($angleSensor))` | `tlx5012_getAngleRange_angleSensor()` |
| `tlx5012_reset` | Statement | VAR(field_variable) | `tlx5012_reset(variables_get($angleSensor))` | `angleSensor.resetFirmware();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CS_PIN | Board digital pins | Chip Select pin for SPI communication |

## ABS Examples

### Basic Angle Reading
```
arduino_setup()
    tlx5012_init("angleSensor", 10)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tlx5012_read_angle(variables_get($angleSensor)))
    time_delay(math_number(1000))
```

### Read All Sensor Values
```
arduino_setup()
    tlx5012_init("angleSensor", 10)
    serial_begin(Serial, 115200)

arduino_loop()
    serial_print(Serial, text("Angle: "))
    serial_println(Serial, tlx5012_read_angle(variables_get($angleSensor)))
    serial_print(Serial, text("Speed: "))
    serial_println(Serial, tlx5012_read_speed(variables_get($angleSensor)))
    serial_print(Serial, text("Revolutions: "))
    serial_println(Serial, tlx5012_read_revolutions(variables_get($angleSensor)))
    serial_print(Serial, text("Temperature: "))
    serial_println(Serial, tlx5012_read_temperature(variables_get($angleSensor)))
    time_delay(math_number(500))
```

## Notes

1. **Initialization**: Call `tlx5012_init` inside `arduino_setup()`
2. **SPI Interface**: The sensor uses 3-wire SSC (SPI) communication
3. **Variable**: `tlx5012_init("varName", ...)` creates variable `$varName`; reference it later with `variables_get($varName)`
4. **Helper functions**: Value blocks auto-generate helper functions since the original API uses output parameters
5. **Revolution range**: Revolution count is limited to -256 ~ 256 and wraps around at boundaries
