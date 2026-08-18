# USB analog keyboard

Simulate Arduino as a USB keyboard, which can realize keyboard input, key simulation and other functions

## Library Info
- **Name**: @aily-project/lib-keyboard
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `keyboard_begin` | Statement | (none) | `keyboard_begin()` | `Keyboard.begin();` |
| `keyboard_end` | Statement | (none) | `keyboard_end()` | `Keyboard.end();` |
| `keyboard_print` | Statement | TEXT(input_value) | `keyboard_print(text("value"))` | `Keyboard.print(1);` |
| `keyboard_press` | Statement | KEY(input_value) | `keyboard_press(text("value"))` | `Keyboard.press('v');` |
| `keyboard_special_key` | Value | KEY(dropdown) | `keyboard_special_key(KEY_RETURN)` | `KEY_RETURN` |
| `keyboard_release` | Statement | KEY(input_value) | `keyboard_release(math_number(0))` | `Keyboard.release('\0');` |
| `keyboard_release_all` | Statement | (none) | `keyboard_release_all()` | `Keyboard.releaseAll();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| KEY | KEY_RETURN, KEY_ESC, KEY_BACKSPACE, KEY_TAB, ' ', KEY_LEFT_CTRL, KEY_LEFT_SHIFT, KEY_LEFT_ALT, KEY_LEFT_GUI, KEY_RIGHT_CTRL, KEY_RIGHT_SHIFT, KEY_RIGHT_ALT, KEY_RIGHT_GUI, KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW,... | keyboard_special_key |

## ABS Examples

### Basic Usage
```
arduino_setup()
    keyboard_begin()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, keyboard_special_key(KEY_RETURN))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
