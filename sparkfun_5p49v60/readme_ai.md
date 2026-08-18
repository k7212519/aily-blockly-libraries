# SparkFun 5P49V60 Clock Generator

Blockly wrapper for the SparkFun 5P49V60 programmable clock generator.

## Library Info
- **Name**: @aily-project/lib-sparkfun-5p49v60
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `5p49v60_init` | Statement | VAR(field_input), ADDRESS(dropdown) | `5p49v60_init("clockGen", DEF)` | `Wire.begin(); ↵ clockGen.begin();` |
| `5p49v60_set_vco` | Statement | VAR(field_variable), FREQ(input_value) | `5p49v60_set_vco($clockGen, math_number(0))` | `clockGen.setVcoFrequency(1);` |
| `5p49v60_mux_pll_to_fod` | Statement | VAR(field_variable), CHANNEL(dropdown) | `5p49v60_mux_pll_to_fod($clockGen, "1")` | `clockGen.muxPllToFodOne();` |
| `5p49v60_set_clock_freq` | Statement | VAR(field_variable), CHANNEL(dropdown), FREQ(input_value) | `5p49v60_set_clock_freq($clockGen, "1", math_number(0))` | `clockGen.setClockOneFreq(1);` |
| `5p49v60_set_clock_mode` | Statement | VAR(field_variable), CHANNEL(dropdown), MODE(dropdown) | `5p49v60_set_clock_mode($clockGen, "1", "0")` | `clockGen.clockOneConfigMode(0);` |
| `5p49v60_skew_clock` | Statement | VAR(field_variable), CHANNEL(dropdown), SKEW(input_value) | `5p49v60_skew_clock($clockGen, "1", math_number(0))` | `clockGen.skewClockOne(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | DEF, ALT | 5p49v60_init |
| CHANNEL | 1, 2, 3, 4 | 5p49v60_mux_pll_to_fod, 5p49v60_set_clock_freq, 5p49v60_set_clock_mode |
| MODE | 0, 1, 2, 3, 4, 5, 6 | 5p49v60_set_clock_mode |

## ABS Examples

### Basic Usage
```
arduino_setup()
    5p49v60_init("clockGen", DEF)
    serial_begin(Serial, 9600)

arduino_loop()
    5p49v60_set_vco($clockGen, math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `5p49v60_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
