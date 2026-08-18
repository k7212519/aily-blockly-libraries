# Adafruit MCP23X17

Blocks for MCP23017 I2C and MCP23S17 SPI 16-bit GPIO expanders; this package exposes the portable I2C path.

## Library Info
- **Name**: @aily-project/lib-adafruit-mcp23x17
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit-MCP23017-Arduino-Library
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_mcp23x17_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_mcp23x17_init("mcp23x17", WIRE, "0x20")` | `Adafruit_MCP23X17 mcp23x17; ↵ WIRE.begin(); ↵ while (!(mcp23x17.begin_I2C(0x20, &WIRE))) { delay(100); }` |
| `adafruit_mcp23x17_read` | Value | VAR(field_variable), DATA(dropdown), INDEX(input_value) | `adafruit_mcp23x17_read($mcp23x17, pin, math_number(0))` | `(mcp23x17.pinMode((uint8_t)1, INPUT), mcp23x17.digitalRead((uint8_t)1))` |
| `adafruit_mcp23x17_action` | Statement | VAR(field_variable), ACTION(dropdown) | `adafruit_mcp23x17_action($mcp23x17, clear)` | `mcp23x17.writeGPIOAB(0);` |
| `adafruit_mcp23x17_write` | Statement | VAR(field_variable), INDEX(input_value), VALUE(input_value) | `adafruit_mcp23x17_write($mcp23x17, INDEX, VALUE)` | `mcp23x17.pinMode((uint8_t)1, OUTPUT); mcp23x17.digitalWrite((uint8_t)1, (bool)1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_mcp23x17_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_mcp23x17_init.ADDR | 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27 | Selects the generated API option. |
| adafruit_mcp23x17_read.DATA | pin, all | Selects the generated API option. |
| adafruit_mcp23x17_action.ACTION | clear | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_mcp23x17_init("mcp23x17", WIRE, "0x20")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
