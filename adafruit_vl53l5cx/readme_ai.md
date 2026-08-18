# Adafruit VL53L5CX

Blocks for the ST VL53L5CX 8x8 multizone time-of-flight distance sensor.

## Library Info
- **Name**: @aily-project/lib-adafruit-vl53l5cx
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit_VL53L5
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_vl53l5cx_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_vl53l5cx_init("vl53l5cx", WIRE, "0x29")` | `Adafruit_VL53L5CX vl53l5cx; ↵ VL53L5CX_ResultsData vl53l5cxData; ↵ WIRE.begin(); ↵ while (!(vl53l5cx.begin(0x29, &WIRE))) { delay(100); } ↵ vl53l5cx.setResolution(VL53L5CX_RESOLUTION_8X8); ↵ vl53l5cx.setRangingFrequency(10); ↵ vl53l5cx.startRanging();` |
| `adafruit_vl53l5cx_read` | Value | VAR(field_variable), DATA(dropdown), INDEX(input_value) | `adafruit_vl53l5cx_read($vl53l5cx, distance, math_number(0))` | `(vl53l5cx.isDataReady() && vl53l5cx.getRangingData(&vl53l5cxData), vl53l5cxData.distance_mm[constrain((int)1, 0, 63) * VL53L5CX_NB_TARGET_PER_ZONE])` |
| `adafruit_vl53l5cx_action` | Statement | VAR(field_variable), ACTION(dropdown) | `adafruit_vl53l5cx_action($vl53l5cx, start)` | `vl53l5cx.startRanging();` |
| `adafruit_vl53l5cx_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `adafruit_vl53l5cx_set($vl53l5cx, frequency, math_number(0))` | `vl53l5cx.setRangingFrequency((uint8_t)1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_vl53l5cx_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_vl53l5cx_init.ADDR | 0x29 | Selects the generated API option. |
| adafruit_vl53l5cx_read.DATA | distance, targets, reflectance, status | Selects the generated API option. |
| adafruit_vl53l5cx_action.ACTION | start, stop | Selects the generated API option. |
| adafruit_vl53l5cx_set.SETTING | frequency, resolution | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_vl53l5cx_init("vl53l5cx", WIRE, "0x29")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
