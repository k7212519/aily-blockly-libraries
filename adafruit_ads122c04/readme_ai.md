# Adafruit ADS122C04

Blocks for the ADS122C04 24-bit delta-sigma I2C ADC.

## Library Info
- **Name**: @aily-project/lib-adafruit-ads122c04
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit_ADS122C04
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_ads122c04_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_ads122c04_init("ads122c04", WIRE, "0x40")` | `Adafruit_ADS122C04 ads122c04; ↵ WIRE.begin(); ↵ while (!(ads122c04.begin(0x40, &WIRE))) { delay(100); }` |
| `adafruit_ads122c04_read` | Value | VAR(field_variable), DATA(dropdown) | `adafruit_ads122c04_read($ads122c04, raw)` | `ads122c04.readData()` |
| `adafruit_ads122c04_action` | Statement | VAR(field_variable), ACTION(dropdown) | `adafruit_ads122c04_action($ads122c04, start)` | `ads122c04.startSync();` |
| `adafruit_ads122c04_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `adafruit_ads122c04_set($ads122c04, gain, math_number(0))` | `ads122c04.setGain((ads122c04_gain_t)constrain((int)1, 0, 7));` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_ads122c04_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_ads122c04_init.ADDR | 0x40, 0x41, 0x44, 0x45 | Selects the generated API option. |
| adafruit_ads122c04_read.DATA | raw, voltage, temperature, ready | Selects the generated API option. |
| adafruit_ads122c04_action.ACTION | start, powerdown, reset | Selects the generated API option. |
| adafruit_ads122c04_set.SETTING | gain, rate, continuous | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_ads122c04_init("ads122c04", WIRE, "0x40")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
