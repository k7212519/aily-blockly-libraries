# Adafruit MAX31855

Blocks for the MAX31855 K-type thermocouple-to-digital converter.

## Library Info
- **Name**: @aily-project/lib-adafruit-max31855
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit-MAX31855-library
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_max31855_init` | Statement | VAR(field_input), CS(dropdown) | `adafruit_max31855_init(VAR, CS)` | `Adafruit_MAX31855 max31855(CS, &SPI); ↵ while (!(max31855.begin())) { delay(100); }` |
| `adafruit_max31855_read` | Value | VAR(field_variable), DATA(dropdown) | `adafruit_max31855_read($max31855, thermocouple_c)` | `max31855.readCelsius()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_max31855_init.CS | board-provided options | Selects the generated API option. |
| adafruit_max31855_read.DATA | thermocouple_c, thermocouple_f, internal, error | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_max31855_init("max31855", CS)
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
