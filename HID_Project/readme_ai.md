# HID-Project

Extended HID functions for Arduino keyboards, mice, consumer keys, system keys, and gamepads.

## Library Info

- **Name**: @aily-project/lib-hid-project
- **Version**: 1.0.0
- **Upstream Version**: 2.8.4
- **Source**: https://github.com/NicoHood/HID

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `hid_project_begin` | Statement | DEVICE(dropdown) | `hid_project_begin(Keyboard)` | `Keyboard.begin();` |
| `hid_project_end` | Statement | DEVICE(dropdown) | `hid_project_end(Keyboard)` | `Keyboard.end();` |
| `hid_keyboard_print` | Statement | TEXT(input_value) | `hid_keyboard_print(text("value"))` | `Keyboard.print("value");` |
| `hid_keyboard_key` | Statement | ACTION(dropdown), KEY(dropdown) | `hid_keyboard_key(write, KEY_ENTER)` | `Keyboard.write(KEY_ENTER);` |
| `hid_keyboard_release_all` | Statement | (none) | `hid_keyboard_release_all()` | `Keyboard.releaseAll();` |
| `hid_consumer_write` | Statement | KEY(dropdown) | `hid_consumer_write(MEDIA_PLAY_PAUSE)` | `Consumer.write(MEDIA_PLAY_PAUSE);` |
| `hid_mouse_move` | Statement | X(input_value), Y(input_value), WHEEL(input_value) | `hid_mouse_move(math_number(1), math_number(1), math_number(1))` | `Mouse.move(1, 1, 1);` |
| `hid_mouse_button` | Statement | ACTION(dropdown), BUTTON(dropdown) | `hid_mouse_button(click, MOUSE_LEFT)` | `Mouse.click(MOUSE_LEFT);` |
| `hid_gamepad_button` | Statement | ACTION(dropdown), BUTTON(input_value) | `hid_gamepad_button(press, math_number(1))` | `Gamepad.press(1);` |
| `hid_gamepad_axis` | Statement | AXIS(dropdown), VALUE(input_value) | `hid_gamepad_axis(xAxis, math_number(1))` | `Gamepad.xAxis(1);` |
| `hid_gamepad_write` | Statement | (none) | `hid_gamepad_write()` | `Gamepad.write();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DEVICE | Keyboard, Mouse, Consumer, System, Gamepad | Global HID object. |
| ACTION | write, press, release, click | HID operation. |

## Notes

1. Call begin for each HID object before using it.
2. Some AVR boards require HoodLoader2 or native USB support for HID output.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    hid_project_begin(Keyboard)
```
