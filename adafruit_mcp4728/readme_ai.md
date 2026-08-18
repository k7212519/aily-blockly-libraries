# Adafruit MCP4728

Blocks for the MCP4728 four-channel 12-bit I2C DAC.

## Library Info
- **Name**: @aily-project/lib-adafruit-mcp4728
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit_MCP4728
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_mcp4728_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_mcp4728_init("mcp4728", WIRE, "0x60")` | `Adafruit_MCP4728 mcp4728; ↵ WIRE.begin(); ↵ while (!(mcp4728.begin(0x60, &WIRE))) { delay(100); }` |
| `adafruit_mcp4728_read` | Value | VAR(field_variable), DATA(dropdown), INDEX(input_value) | `adafruit_mcp4728_read($mcp4728, value, math_number(0))` | `mcp4728.getChannelValue((MCP4728_channel_t)constrain((int)1, 0, 3))` |
| `adafruit_mcp4728_action` | Statement | VAR(field_variable), ACTION(dropdown) | `adafruit_mcp4728_action($mcp4728, save)` | `mcp4728.saveToEEPROM();` |
| `adafruit_mcp4728_write` | Statement | VAR(field_variable), INDEX(input_value), VALUE(input_value) | `adafruit_mcp4728_write($mcp4728, INDEX, VALUE)` | `mcp4728.setChannelValue((MCP4728_channel_t)constrain((int)1, 0, 3), (uint16_t)constrain((int)1, 0, 4095));` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_mcp4728_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_mcp4728_init.ADDR | 0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67 | Selects the generated API option. |
| adafruit_mcp4728_read.DATA | value | Selects the generated API option. |
| adafruit_mcp4728_action.ACTION | save | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_mcp4728_init("mcp4728", WIRE, "0x60")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
