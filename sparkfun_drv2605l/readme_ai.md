# SparkFun DRV2605L Haptic Motor Driver

Blockly wrapper for the SparkFun DRV2605L haptic motor driver.

## Library Info
- **Name**: @aily-project/lib-sparkfun-drv2605l
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `drv2605l_init` | Statement | VAR(field_input) | `drv2605l_init("haptic")` | `Wire.begin(); ↵ haptic.begin();` |
| `drv2605l_mode` | Statement | VAR(field_variable), MODE(dropdown) | `drv2605l_mode($haptic, "0x00")` | `haptic.Mode(0x00);` |
| `drv2605l_motor_select` | Statement | VAR(field_variable), TYPE(dropdown) | `drv2605l_motor_select($haptic, "0x00")` | `haptic.MotorSelect(0x00);` |
| `drv2605l_library` | Statement | VAR(field_variable), LIB(field_number) | `drv2605l_library($haptic, 1)` | `haptic.Library(1);` |
| `drv2605l_waveform` | Statement | VAR(field_variable), SEQ(field_number), WAV(field_number) | `drv2605l_waveform($haptic, 0, 1)` | `haptic.Waveform(0, 1);` |
| `drv2605l_go` | Statement | VAR(field_variable) | `drv2605l_go($haptic)` | `haptic.go();` |
| `drv2605l_stop` | Statement | VAR(field_variable) | `drv2605l_stop($haptic)` | `haptic.stop();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | 0x00, 0x01, 0x02, 0x03, 0x04, 0x05 | drv2605l_mode |
| TYPE | 0x00, 0x08 | drv2605l_motor_select |

## ABS Examples

### Basic Usage
```
arduino_setup()
    drv2605l_init("haptic")
    serial_begin(Serial, 9600)

arduino_loop()
    drv2605l_mode($haptic, "0x00")
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `drv2605l_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
