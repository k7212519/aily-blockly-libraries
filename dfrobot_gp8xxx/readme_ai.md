# DFRobot GP8XXX

Blocks for the DFRobot GP8XXX family of I2C DAC voltage and current output modules.

## Library Info
- **Name**: @aily-project/lib-dfrobot-gp8xxx
- **Version**: 0.1.0
- **Author**: DFRobot
- **Source**: https://github.com/DFRobot/DFRobot_GP8XXX
- **License**: MIT

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `dfrobot_gp8xxx_init` | Statement | VAR(field_input), WIRE(dropdown), MODEL(dropdown), ADDR(dropdown) | `dfrobot_gp8xxx_init("gp8xxx", WIRE, 12, "0x58")` | `DFRobot_GP8XXX_IIC gp8xxx(RESOLUTION_12_BIT, 0x58, &WIRE); ↵ WIRE.begin(); ↵ while ((gp8xxx.begin()) != 0) { delay(100); }` |
| `dfrobot_gp8xxx_action` | Statement | VAR(field_variable), ACTION(dropdown) | `dfrobot_gp8xxx_action($gp8xxx, store)` | `gp8xxx.store();` |
| `dfrobot_gp8xxx_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `dfrobot_gp8xxx_set($gp8xxx, range, math_number(0))` | `gp8xxx.setDACOutRange((DFRobot_GP8XXX::eOutPutRange_t)constrain((int)1, 0, 3));` |
| `dfrobot_gp8xxx_write` | Statement | VAR(field_variable), INDEX(input_value), VALUE(input_value) | `dfrobot_gp8xxx_write($gp8xxx, INDEX, VALUE)` | `gp8xxx.setDACOutVoltage((uint16_t)1, (uint8_t)constrain((int)1, 0, 2));` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| dfrobot_gp8xxx_init.WIRE | board-provided options | Selects the generated API option. |
| dfrobot_gp8xxx_init.MODEL | 12, 15, 16 | Selects the generated API option. |
| dfrobot_gp8xxx_init.ADDR | 0x58, 0x59 | Selects the generated API option. |
| dfrobot_gp8xxx_action.ACTION | store | Selects the generated API option. |
| dfrobot_gp8xxx_set.SETTING | range | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    dfrobot_gp8xxx_init("gp8xxx", WIRE, 12, "0x58")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
