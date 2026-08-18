# CHSC6X touch screen

CHSC6X capacitive touch screen controller driver library supports single touch and rotation configuration (I2C interface currently supports touch screens within 255x255 pixels).

## Library Info
- **Name**: @aily-project/lib-chsc6x
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `chsc6x_setup` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(input_value), PIN(input_value), WIDTH(input_value), HEIGHT(input_value), ROTATION(dropdown) | `chsc6x_setup("touch", WIRE, math_number(0), math_number(2), math_number(0), math_number(0), "0")` | `touch.begin();` |
| `chsc6x_is_pressed` | Value | VAR(field_variable) | `chsc6x_is_pressed($touch)` | `touch.isPressed()` |
| `chsc6x_get_x` | Value | VAR(field_variable) | `chsc6x_get_x($touch)` | `touch.getX()` |
| `chsc6x_get_y` | Value | VAR(field_variable) | `chsc6x_get_y($touch)` | `touch.getY()` |
| `chsc6x_get_xy` | Value | VAR(field_variable), X(input_value), Y(input_value) | `chsc6x_get_xy($touch, math_number(0), math_number(0))` | `touch.getXY(1, 1)` |
| `chsc6x_set_rotation` | Statement | VAR(field_variable), ROTATION(input_value) | `chsc6x_set_rotation($touch, math_number(0))` | `touch.setRotation(1);` |
| `chsc6x_get_rotation` | Value | VAR(field_variable) | `chsc6x_get_rotation($touch)` | `touch.getRotation()` |
| `chsc6x_set_screen_size` | Statement | VAR(field_variable), WIDTH(input_value), HEIGHT(input_value) | `chsc6x_set_screen_size($touch, math_number(0), math_number(0))` | `touch.setScreenSize(1, 1);` |
| `chsc6x_run` | Value | VAR(field_variable) | `chsc6x_run($touch)` | `touch.run()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ROTATION | 0, 1, 2, 3 | chsc6x_setup |

## ABS Examples

### Basic Usage
```
arduino_setup()
    chsc6x_setup("touch", WIRE, math_number(0), math_number(2), math_number(0), math_number(0), "0")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, chsc6x_is_pressed($touch))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `chsc6x_setup("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
