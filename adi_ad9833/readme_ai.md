# ADI AD9833

Cross-controller SPI blocks for the Analog Devices AD9833 programmable waveform generator.

## Library Info
- **Name**: @aily-project/lib-adi-ad9833
- **Version**: 0.1.0
- **Author**: Analog Devices / Aily Project
- **Source**: https://www.analog.com/en/products/ad9833.html
- **License**: MIT

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adi_ad9833_init` | Statement | VAR(field_input), CS(dropdown), REFCLK(field_input) | `adi_ad9833_init(VAR, CS, REFCLK)` | `AilyAD9833 ad9833(CS, &SPI, 25000000); ↵ while (!(ad9833.begin())) { delay(100); }` |
| `adi_ad9833_action` | Statement | VAR(field_variable), ACTION(dropdown) | `adi_ad9833_action($ad9833, enable)` | `ad9833.enableOutput(true);` |
| `adi_ad9833_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `adi_ad9833_set($ad9833, frequency, math_number(0))` | `ad9833.setFrequency((float)1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| adi_ad9833_init.CS | board-provided options | Selects the generated API option. |
| adi_ad9833_action.ACTION | enable, disable | Selects the generated API option. |
| adi_ad9833_set.SETTING | frequency, phase, waveform | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    adi_ad9833_init("ad9833", CS, "25000000")
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
