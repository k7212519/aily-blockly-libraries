# HT16K33 Matrix

8x8 LED dot matrix display driver, supports pixel operations and 10 preset animation effects

## Library Info
- **Name**: @aily-project/lib-ht16k33-matrix
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ht16k33_init` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(dropdown) | `ht16k33_init("matrix", WIRE, "0x70")` | `matrix.begin(&WIRE);` |
| `ht16k33_clear` | Statement | VAR(field_variable) | `ht16k33_clear($matrix)` | `matrix.clear();` |
| `ht16k33_set_pixel` | Statement | VAR(field_variable), ROW(input_value), COL(input_value), STATE(dropdown) | `ht16k33_set_pixel($matrix, math_number(0), math_number(0), true)` | `matrix.setPixel(1, 1, true);` |
| `ht16k33_display` | Statement | VAR(field_variable) | `ht16k33_display($matrix)` | `matrix.display();` |
| `ht16k33_set_brightness` | Statement | VAR(field_variable), LEVEL(field_number) | `ht16k33_set_brightness($matrix, 7)` | `matrix.setBrightness(7);` |
| `ht16k33_set_rotation` | Statement | VAR(field_variable), ROTATION(dropdown) | `ht16k33_set_rotation($matrix, "0")` | `matrix.setRotation(0);` |
| `ht16k33_effect` | Statement | VAR(field_variable), EFFECT(dropdown) | `ht16k33_effect($matrix, rowScan)` | `matrix.rowScan();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77 | ht16k33_init |
| STATE | true, false | ht16k33_set_pixel |
| ROTATION | 0, 1, 2, 3 | ht16k33_set_rotation |
| EFFECT | rowScan, colScan, rings, diagonal, snow, chess, heart, smile, breathe, spiral | ht16k33_effect |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ht16k33_init("matrix", WIRE, "0x70")
    serial_begin(Serial, 9600)

arduino_loop()
    ht16k33_clear($matrix)
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ht16k33_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
