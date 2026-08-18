# SparkFun UG2856 transparent OLED

Blockly wrapper for WiseChip UG2856KLBAG01 transparent OLED display.

## Library Info
- **Name**: @aily-project/lib-sparkfun-hyperdisplay-ug2856klbag01
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ug2856_init_i2c` | Statement | VAR(field_input), WIRE(dropdown) | `ug2856_init_i2c("oled", WIRE)` | `WIRE.begin(); ↵ oled.begin(WIRE, false, SSD1309_ARD_UNUSED_PIN); ↵ oled.clearDisplay();` |
| `ug2856_init_spi` | Statement | VAR(field_input), SPI(dropdown), CS(input_value), DC(input_value) | `ug2856_init_spi("oled", SPI, math_number(0), math_number(0))` | `SPI.begin(); ↵ oled.begin(1, 1, SPI); ↵ oled.clearDisplay();` |
| `ug2856_clear` | Statement | VAR(field_variable) | `ug2856_clear($oled)` | `oled.clearDisplay();` |
| `ug2856_pixel` | Statement | VAR(field_variable), ACTION(dropdown), X(input_value), Y(input_value) | `ug2856_pixel($oled, Set, math_number(0), math_number(0))` | `oled.pixelSet(1, 1);` |
| `ug2856_line` | Statement | VAR(field_variable), ACTION(dropdown), X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), WIDTH(input_value) | `ug2856_line($oled, Set, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `oled.lineSet(1, 1, 1, 1, 1);` |
| `ug2856_rectangle` | Statement | VAR(field_variable), ACTION(dropdown), X0(input_value), Y0(input_value), X1(input_value), Y1(input_value), FILLED(dropdown) | `ug2856_rectangle($oled, Set, math_number(0), math_number(0), math_number(0), math_number(0), true)` | `oled.rectangleSet(1, 1, 1, 1, true);` |
| `ug2856_circle` | Statement | VAR(field_variable), ACTION(dropdown), X(input_value), Y(input_value), RADIUS(input_value), FILLED(dropdown) | `ug2856_circle($oled, Set, math_number(0), math_number(0), math_number(0), true)` | `oled.circleSet(1, 1, 1, true);` |
| `ug2856_print` | Statement | VAR(field_variable), COLOR(dropdown), X(input_value), Y(input_value), TEXT(input_value) | `ug2856_print($oled, Set, math_number(0), math_number(0), text("value"))` | `oled.setWindowColorSet(); ↵ oled.setTextCursor(1, 1); ↵ oled.print(String(1));` |
| `ug2856_contrast` | Statement | VAR(field_variable), VALUE(input_value) | `ug2856_contrast($oled, math_number(0))` | `oled.setContrastControl((uint8_t)constrain(1, 0, 255));` |
| `ug2856_invert` | Statement | VAR(field_variable), ON(dropdown) | `ug2856_invert($oled, true)` | `oled.setInversion(true);` |
| `ug2856_power` | Statement | VAR(field_variable), ON(dropdown) | `ug2856_power($oled, true)` | `oled.setPower(true);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ACTION | Set, Clear | ug2856_pixel, ug2856_line, ug2856_rectangle |
| FILLED | true, false | ug2856_rectangle, ug2856_circle |
| COLOR | Set, Clear | ug2856_print |
| ON | true, false | ug2856_invert, ug2856_power |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ug2856_init_i2c("oled", WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    ug2856_init_spi("oled", SPI, math_number(0), math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ug2856_init_i2c("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
