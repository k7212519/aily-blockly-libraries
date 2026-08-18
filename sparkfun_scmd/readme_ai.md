# SparkFun Serial Controlled Motor Driver

Blockly wrapper for the SparkFun Serial Controlled Motor Driver (SCMD).

## Library Info
- **Name**: @aily-project/lib-sparkfun-scmd
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `scmd_init` | Statement | VAR(field_input) | `scmd_init("scmd")` | `scmd.settings.commInterface = I2C_MODE; ↵ scmd.settings.I2CAddress = 0x5D; ↵ scmd.begin();` |
| `scmd_set_drive` | Statement | VAR(field_variable), MOTOR(input_value), DIR(dropdown), LEVEL(input_value) | `scmd_set_drive($scmd, math_number(0), "0", math_number(0))` | `scmd.setDrive(1, 0, 1);` |
| `scmd_enable` | Statement | VAR(field_variable) | `scmd_enable($scmd)` | `scmd.enable();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DIR | 0, 1 | scmd_set_drive |

## ABS Examples

### Basic Usage
```
arduino_setup()
    scmd_init("scmd")
    serial_begin(Serial, 9600)

arduino_loop()
    scmd_set_drive($scmd, math_number(0), "0", math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `scmd_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
