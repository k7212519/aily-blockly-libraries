# Adafruit TMAG5273

Blocks for the TMAG5273 low-power linear 3D Hall-effect sensor.

## Library Info
- **Name**: @aily-project/lib-adafruit-tmag5273
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit_TMAG5273
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_tmag5273_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_tmag5273_init("tmag5273", WIRE, "0x35")` | `Adafruit_TMAG5273 tmag5273; ↵ WIRE.begin(); ↵ while (!(tmag5273.begin(0x35, &WIRE))) { delay(100); } ↵ tmag5273.enableTemperature(true); ↵ tmag5273.setOperatingMode(TMAG5273_MODE_CONTINUOUS);` |
| `adafruit_tmag5273_read` | Value | VAR(field_variable), DATA(dropdown) | `adafruit_tmag5273_read($tmag5273, x)` | `tmag5273.readMagneticX()` |
| `adafruit_tmag5273_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `adafruit_tmag5273_set($tmag5273, xy_range, math_number(0))` | `tmag5273.setXYRangeWide((bool)1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_tmag5273_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_tmag5273_init.ADDR | 0x35, 0x22 | Selects the generated API option. |
| adafruit_tmag5273_read.DATA | x, y, z, magnitude, angle, temperature | Selects the generated API option. |
| adafruit_tmag5273_set.SETTING | xy_range, z_range, low_noise | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_tmag5273_init("tmag5273", WIRE, "0x35")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
