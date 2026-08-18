# SparkFun Si4703 FM Radio Receiver

Blockly wrapper for the SparkFun Si4703 FM radio receiver breakout.

## Library Info
- **Name**: @aily-project/lib-sparkfun-si4703
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `si4703_init` | Statement | VAR(field_input), RST(input_value), SDIO(input_value), SCLK(input_value) | `si4703_init("radio", math_number(0), math_number(0), math_number(0))` | `radio.powerOn();` |
| `si4703_set_channel` | Statement | VAR(field_variable), CHANNEL(input_value) | `si4703_set_channel($radio, math_number(0))` | `radio.setChannel(1);` |
| `si4703_seek` | Statement | VAR(field_variable), DIR(dropdown) | `si4703_seek($radio, UP)` | `radio.seekUp();` |
| `si4703_set_volume` | Statement | VAR(field_variable), VOLUME(input_value) | `si4703_set_volume($radio, math_number(0))` | `radio.setVolume(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DIR | UP, DOWN | si4703_seek |

## ABS Examples

### Basic Usage
```
arduino_setup()
    si4703_init("radio", math_number(0), math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    si4703_set_channel($radio, math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `si4703_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
