# Adafruit MLX90640

Blocks for the MLX90640 32x24 infrared thermal imaging array.

## Library Info
- **Name**: @aily-project/lib-adafruit-mlx90640
- **Version**: 0.1.0
- **Author**: Adafruit
- **Source**: https://github.com/adafruit/Adafruit_MLX90640
- **License**: BSD-3-Clause

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_mlx90640_init` | Statement | VAR(field_input), WIRE(dropdown), ADDR(dropdown) | `adafruit_mlx90640_init("mlx90640", WIRE, "0x33")` | `Adafruit_MLX90640 mlx90640; ↵ float mlx90640Frame[768] = {0}; ↵ WIRE.begin(); ↵ while (!(mlx90640.begin(0x33, &WIRE))) { delay(100); } ↵ mlx90640.setMode(MLX90640_CHESS); ↵ mlx90640.setResolution(MLX90640_ADC_18BIT); ↵ mlx90640.setRefreshRate(MLX90640_4_HZ);` |
| `adafruit_mlx90640_read` | Value | VAR(field_variable), DATA(dropdown), INDEX(input_value) | `adafruit_mlx90640_read($mlx90640, pixel, math_number(0))` | `(mlx90640.getFrame(mlx90640Frame), mlx90640Frame[constrain((int)1, 0, 767)])` |
| `adafruit_mlx90640_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `adafruit_mlx90640_set($mlx90640, refresh_rate, math_number(0))` | `mlx90640.setRefreshRate((mlx90640_refreshrate_t)constrain((int)1, 0, 7));` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adafruit_mlx90640_init.WIRE | board-provided options | Selects the generated API option. |
| adafruit_mlx90640_init.ADDR | 0x33 | Selects the generated API option. |
| adafruit_mlx90640_read.DATA | pixel, ambient | Selects the generated API option. |
| adafruit_mlx90640_set.SETTING | refresh_rate, resolution, mode | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adafruit_mlx90640_init("mlx90640", WIRE, "0x33")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
