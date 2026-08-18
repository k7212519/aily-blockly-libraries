# Adafruit INA260

Blocks for the INA260 integrated-shunt current, voltage and power monitor.

## Library Info
- **Name**: @aily-project/lib-adafruit-ina260
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit_INA260
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_ina260_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_ina260_init("ina260", WIRE, "0x40")` | `Adafruit_INA260 ina260; ↵ WIRE.begin(); ↵ while (!(ina260.begin(0x40, &WIRE))) { delay(100); }` |
| `adafruit_ina260_read` | Value | VAR(field_variable), DATA(dropdown) | `adafruit_ina260_read($ina260, current)` | `ina260.readCurrent()` |
| `adafruit_ina260_action` | Statement | VAR(field_variable), ACTION(dropdown) | `adafruit_ina260_action($ina260, reset)` | `ina260.reset();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_ina260_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_ina260_init.ADDR | 0x40, 0x41, 0x44, 0x45 | Selects the generated API option. |
| adafruit_ina260_read.DATA | current, voltage, power | Selects the generated API option. |
| adafruit_ina260_action.ACTION | reset | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_ina260_init("ina260", WIRE, "0x40")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
