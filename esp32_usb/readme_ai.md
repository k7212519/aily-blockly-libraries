# ESP32 USB functionality

ESP32 native USB HID function supports keyboard, mouse, game controller, media control, system control and MIDI

## Library Info
- **Name**: @aily-project/lib-esp32-usb
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_usb_keyboard_begin` | Statement | (none) | `esp32_usb_keyboard_begin()` | `#ifndef ARDUINO_USB_MODE ↵ #error This ESP32 SoC has no Native USB interface ↵ #elif ARDUINO_USB_MODE == 1 ↵ #warning This sketch should be used when USB is in OTG mode ↵ #endif ↵ USB.begin(); ↵ USBHIDKeyboard Keyboard; ↵ Keyboard.begin();` |
| `esp32_usb_keyboard_print` | Statement | TEXT(input_value) | `esp32_usb_keyboard_print(text("value"))` | `Keyboard.print("value");` |
| `esp32_usb_keyboard_println` | Statement | TEXT(input_value) | `esp32_usb_keyboard_println(text("value"))` | `Keyboard.println("value");` |
| `esp32_usb_keyboard_write` | Statement | KEY(input_value) | `esp32_usb_keyboard_write(text("value"))` | `Keyboard.write("value");` |
| `esp32_usb_keyboard_press` | Statement | KEY(input_value) | `esp32_usb_keyboard_press(text("value"))` | `Keyboard.press("value");` |
| `esp32_usb_keyboard_release` | Statement | KEY(input_value) | `esp32_usb_keyboard_release(text("value"))` | `Keyboard.release("value");` |
| `esp32_usb_keyboard_release_all` | Statement | (none) | `esp32_usb_keyboard_release_all()` | `Keyboard.releaseAll();` |
| `esp32_usb_keyboard_special_key` | Value | KEY(dropdown) | `esp32_usb_keyboard_special_key(KEY_RETURN)` | `KEY_RETURN` |
| `esp32_usb_mouse_begin` | Statement | (none) | `esp32_usb_mouse_begin()` | `#ifndef ARDUINO_USB_MODE ↵ #error This ESP32 SoC has no Native USB interface ↵ #elif ARDUINO_USB_MODE == 1 ↵ #warning This sketch should be used when USB is in OTG mode ↵ #endif ↵ USB.begin(); ↵ USBHIDMouse Mouse; ↵ Mouse.begin();` |
| `esp32_usb_mouse_move` | Statement | X(input_value), Y(input_value), WHEEL(input_value) | `esp32_usb_mouse_move(math_number(0), math_number(0), math_number(0))` | `Mouse.move(1, 1, 1);` |
| `esp32_usb_mouse_click` | Statement | BUTTON(dropdown), ACTION(dropdown) | `esp32_usb_mouse_click(MOUSE_LEFT, click)` | `Mouse.click(MOUSE_LEFT);` |
| `esp32_usb_mouse_is_pressed` | Value | BUTTON(dropdown) | `esp32_usb_mouse_is_pressed(MOUSE_LEFT)` | `Mouse.isPressed(MOUSE_LEFT)` |
| `esp32_usb_gamepad_begin` | Statement | (none) | `esp32_usb_gamepad_begin()` | `#ifndef ARDUINO_USB_MODE ↵ #error This ESP32 SoC has no Native USB interface ↵ #elif ARDUINO_USB_MODE == 1 ↵ #warning This sketch should be used when USB is in OTG mode ↵ #endif ↵ USB.begin(); ↵ USBHIDGamepad Gamepad; ↵ Gamepad.begin();` |
| `esp32_usb_gamepad_press_button` | Statement | BUTTON(dropdown) | `esp32_usb_gamepad_press_button(BUTTON_A)` | `Gamepad.pressButton(BUTTON_A);` |
| `esp32_usb_gamepad_release_button` | Statement | BUTTON(dropdown) | `esp32_usb_gamepad_release_button(BUTTON_A)` | `Gamepad.releaseButton(BUTTON_A);` |
| `esp32_usb_gamepad_left_stick` | Statement | X(input_value), Y(input_value) | `esp32_usb_gamepad_left_stick(math_number(0), math_number(0))` | `Gamepad.leftStick(1, 1);` |
| `esp32_usb_gamepad_right_stick` | Statement | X(input_value), Y(input_value) | `esp32_usb_gamepad_right_stick(math_number(0), math_number(0))` | `Gamepad.rightStick(1, 1);` |
| `esp32_usb_gamepad_trigger` | Statement | SIDE(dropdown), VALUE(input_value) | `esp32_usb_gamepad_trigger(left, math_number(0))` | `Gamepad.leftTrigger(1);` |
| `esp32_usb_gamepad_hat` | Statement | DIRECTION(dropdown) | `esp32_usb_gamepad_hat(HAT_CENTER)` | `Gamepad.hat(HAT_CENTER);` |
| `esp32_usb_consumer_press` | Statement | KEY(dropdown) | `esp32_usb_consumer_press(CONSUMER_CONTROL_PLAY_PAUSE)` | `ConsumerControl.press(CONSUMER_CONTROL_PLAY_PAUSE);` |
| `esp32_usb_consumer_release` | Statement | (none) | `esp32_usb_consumer_release()` | `ConsumerControl.release();` |
| `esp32_usb_system_press` | Statement | ACTION(dropdown) | `esp32_usb_system_press(SYSTEM_CONTROL_POWER_OFF)` | `SystemControl.press(SYSTEM_CONTROL_POWER_OFF);` |
| `esp32_usb_system_release` | Statement | (none) | `esp32_usb_system_release()` | `SystemControl.release();` |
| `esp32_usb_midi_begin` | Statement | (none) | `esp32_usb_midi_begin()` | `#ifndef ARDUINO_USB_MODE ↵ #error This ESP32 SoC has no Native USB interface ↵ #elif ARDUINO_USB_MODE == 1 ↵ #warning This sketch should be used when USB is in OTG mode ↵ #endif ↵ USB.begin(); ↵ USBMIDI MIDI; ↵ MIDI.begin();` |
| `esp32_usb_midi_note_on` | Statement | NOTE(input_value), VELOCITY(input_value), CHANNEL(input_value) | `esp32_usb_midi_note_on(math_number(0), math_number(0), math_number(0))` | `MIDI.noteOn(1, 1, 1);` |
| `esp32_usb_midi_note_off` | Statement | NOTE(input_value), VELOCITY(input_value), CHANNEL(input_value) | `esp32_usb_midi_note_off(math_number(0), math_number(0), math_number(0))` | `MIDI.noteOff(1, 1, 1);` |
| `esp32_usb_midi_control_change` | Statement | CONTROL(input_value), VALUE(input_value), CHANNEL(input_value) | `esp32_usb_midi_control_change(math_number(0), math_number(0), math_number(0))` | `MIDI.controlChange(1, 1, 1);` |
| `esp32_usb_midi_program_change` | Statement | PROGRAM(input_value), CHANNEL(input_value) | `esp32_usb_midi_program_change(math_number(0), math_number(0))` | `MIDI.programChange(1, 1);` |
| `esp32_usb_midi_pitch_bend` | Statement | VALUE(input_value), CHANNEL(input_value) | `esp32_usb_midi_pitch_bend(math_number(0), math_number(0))` | `MIDI.pitchBend((int16_t)1, 1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| KEY | KEY_RETURN, KEY_ESC, KEY_BACKSPACE, KEY_TAB, KEY_SPACE, KEY_LEFT_CTRL, KEY_LEFT_SHIFT, KEY_LEFT_ALT, KEY_LEFT_GUI, KEY_RIGHT_CTRL, KEY_RIGHT_SHIFT, KEY_RIGHT_ALT, KEY_RIGHT_GUI, KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_... | esp32_usb_keyboard_special_key |
| BUTTON | MOUSE_LEFT, MOUSE_RIGHT, MOUSE_MIDDLE | esp32_usb_mouse_click, esp32_usb_mouse_is_pressed |
| ACTION | click, press, release | esp32_usb_mouse_click |
| BUTTON | BUTTON_A, BUTTON_B, BUTTON_C, BUTTON_X, BUTTON_Y, BUTTON_Z, BUTTON_TL, BUTTON_TR, BUTTON_TL2, BUTTON_TR2, BUTTON_SELECT, BUTTON_START, BUTTON_MODE, BUTTON_THUMBL, BUTTON_THUMBR | esp32_usb_gamepad_press_button, esp32_usb_gamepad_release_button |
| SIDE | left, right | esp32_usb_gamepad_trigger |
| DIRECTION | HAT_CENTER, HAT_UP, HAT_UP_RIGHT, HAT_RIGHT, HAT_DOWN_RIGHT, HAT_DOWN, HAT_DOWN_LEFT, HAT_LEFT, HAT_UP_LEFT | esp32_usb_gamepad_hat |
| KEY | CONSUMER_CONTROL_PLAY_PAUSE, CONSUMER_CONTROL_STOP, CONSUMER_CONTROL_SCAN_NEXT, CONSUMER_CONTROL_SCAN_PREVIOUS, CONSUMER_CONTROL_RECORD, CONSUMER_CONTROL_FAST_FORWARD, CONSUMER_CONTROL_REWIND, CONSUMER_CONTROL_VOLUME_... | esp32_usb_consumer_press |
| ACTION | SYSTEM_CONTROL_POWER_OFF, SYSTEM_CONTROL_STANDBY, SYSTEM_CONTROL_WAKE_HOST | esp32_usb_system_press |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_usb_keyboard_begin()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_usb_keyboard_special_key(KEY_RETURN))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
