# Adafruit INA228

Blocks for the INA228 high-precision current, voltage, power, energy and charge monitor.

## Library Info
- **Name**: @aily-project/lib-adafruit-ina228
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit_INA228
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_ina228_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_ina228_init("ina228", WIRE, "0x40")` | `Adafruit_INA228 ina228; ↵ WIRE.begin(); ↵ while (!(ina228.begin(0x40, &WIRE))) { delay(100); }` |
| `adafruit_ina228_read` | Value | VAR(field_variable), DATA(dropdown) | `adafruit_ina228_read($ina228, bus_voltage)` | `ina228.getBusVoltage_V()` |
| `adafruit_ina228_adjust` | Statement | VAR(field_variable), VALUE1(input_value), VALUE2(input_value) | `adafruit_ina228_adjust($ina228, VALUE1, VALUE2)` | `ina228.setShunt((float)1, (float)1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_ina228_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_ina228_init.ADDR | 0x40, 0x41, 0x44, 0x45 | Selects the generated API option. |
| adafruit_ina228_read.DATA | bus_voltage, shunt_voltage, current, power, energy, charge, temperature, ready | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_ina228_init("ina228", WIRE, "0x40")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
