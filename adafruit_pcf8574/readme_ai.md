# Adafruit PCF8574

Blocks for the PCF8574 quasi-bidirectional 8-bit I2C GPIO expander.

## Library Info
- **Name**: @aily-project/lib-adafruit-pcf8574
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit_PCF8574
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_pcf8574_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_pcf8574_init("pcf8574", WIRE, "0x20")` | `Adafruit_PCF8574 pcf8574; ↵ WIRE.begin(); ↵ while (!(pcf8574.begin(0x20, &WIRE))) { delay(100); }` |
| `adafruit_pcf8574_read` | Value | VAR(field_variable), DATA(dropdown), INDEX(input_value) | `adafruit_pcf8574_read($pcf8574, pin, math_number(0))` | `(pcf8574.pinMode((uint8_t)1, INPUT_PULLUP), pcf8574.digitalRead((uint8_t)1))` |
| `adafruit_pcf8574_action` | Statement | VAR(field_variable), ACTION(dropdown) | `adafruit_pcf8574_action($pcf8574, all_low)` | `pcf8574.digitalWriteByte(0x00);` |
| `adafruit_pcf8574_write` | Statement | VAR(field_variable), INDEX(input_value), VALUE(input_value) | `adafruit_pcf8574_write($pcf8574, INDEX, VALUE)` | `pcf8574.pinMode((uint8_t)1, OUTPUT); pcf8574.digitalWrite((uint8_t)1, (bool)1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_pcf8574_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_pcf8574_init.ADDR | 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27 | Selects the generated API option. |
| adafruit_pcf8574_read.DATA | pin, all | Selects the generated API option. |
| adafruit_pcf8574_action.ACTION | all_low, all_high | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_pcf8574_init("pcf8574", WIRE, "0x20")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
