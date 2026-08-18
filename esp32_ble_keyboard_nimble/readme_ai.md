# BLE bluetooth keyboard (NimBLE)

Simulate ESP32 into a Bluetooth keyboard, supporting keyboard input, key simulation, media control and other functions

## Library Info
- **Name**: @aily-project/lib-esp32-ble-keyboard-nimble
- **Version**: 1.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ble_keyboard_begin` | Statement | DEVICE_NAME(field_input) | `ble_keyboard_begin("ESP32 Keyboard")` | `BleCompositeHID compositeHID("ESP32 Keyboard", "Espressif", 100); ↵ KeyboardDevice* keyboard; ↵ KeyboardConfiguration config; ↵ config.setUseMediaKeys(true); ↵ keyboard = new KeyboardDevice(config); ↵ compositeHID.addDevice(keyboard); ↵ compositeHID.begin();` |
| `ble_keyboard_end` | Statement | (none) | `ble_keyboard_end()` | `compositeHID.end();` |
| `ble_keyboard_is_connected` | Value | (none) | `ble_keyboard_is_connected()` | `compositeHID.isConnected()` |
| `ble_keyboard_print` | Statement | TEXT(input_value) | `ble_keyboard_print(text("value"))` | `if (compositeHID.isConnected()) { ↵ String str = "value"; ↵ for (int i = 0; i < str.length(); i++) { ↵ char c = str.charAt(i); ↵ if (c >= 'a' && c <= 'z') { ↵ keyboard->keyPress(KEY_A + (c - 'a')); ↵ delay(10); ↵ keyboard->keyRelease(KEY_A + (c - 'a')); ↵ } else if (c >= 'A' && c <= 'Z') { ↵ keyboard->modifierKeyPress(KEY_MOD_LSHIFT); ↵ keyboard->keyPress(KEY_A + (c - 'A')); ↵ delay(10); ↵ keyboard->keyRelease(KEY_A + (c - 'A')); ↵ keyboard->modifierKeyRelease(KEY_MOD_LSHIFT); ↵ } else if (c >= '0' && c <= '9') { ↵ keyboard->keyPress(KEY_0 + (c - '0')); ↵ delay(10); ↵ keyboard->keyRelease(KEY_0 + (c - '0')); ↵ } else if (c == ' ') { ↵ keyboard->keyPress(KEY_SPACE); ↵ delay(10); ↵ keyboard->keyRelease(KEY_SPACE); ↵ } ↵ delay(50); ↵ } ↵ }` |
| `ble_keyboard_press` | Statement | KEY(input_value) | `ble_keyboard_press(text("value"))` | `if (compositeHID.isConnected()) { ↵ keyboard->keyPress(KEY_NONE); ↵ }` |
| `ble_keyboard_release` | Statement | KEY(input_value) | `ble_keyboard_release(text("value"))` | `if (compositeHID.isConnected()) { ↵ keyboard->keyRelease(KEY_NONE); ↵ }` |
| `ble_keyboard_release_all` | Statement | (none) | `ble_keyboard_release_all()` | `if (compositeHID.isConnected()) { ↵ keyboard->resetKeys(); ↵ }` |
| `ble_keyboard_special_key` | Value | KEY(dropdown) | `ble_keyboard_special_key(KEY_ENTER)` | `KEY_ENTER` |
| `ble_keyboard_write` | Statement | KEY(input_value) | `ble_keyboard_write(text("value"))` | `if (compositeHID.isConnected()) { ↵ keyboard->keyPress(KEY_NONE); ↵ delay(10); ↵ keyboard->keyRelease(KEY_NONE); ↵ }` |
| `ble_keyboard_media_key` | Statement | MEDIA_KEY(dropdown) | `ble_keyboard_media_key(KEY_MEDIA_PLAYPAUSE)` | `if (compositeHID.isConnected()) { ↵ keyboard->mediaKeyPress(KEY_MEDIA_PLAYPAUSE); ↵ delay(10); ↵ keyboard->mediaKeyRelease(KEY_MEDIA_PLAYPAUSE); ↵ }` |
| `ble_keyboard_consumer_key` | Statement | CONSUMER_KEY(dropdown) | `ble_keyboard_consumer_key(KEY_MEDIA_CALCULATOR)` | `if (compositeHID.isConnected()) { ↵ keyboard->mediaKeyPress(KEY_MEDIA_CALCULATOR); ↵ delay(10); ↵ keyboard->mediaKeyRelease(KEY_MEDIA_CALCULATOR); ↵ }` |
| `ble_keyboard_set_battery_level` | Statement | LEVEL(field_number) | `ble_keyboard_set_battery_level(100)` | `compositeHID.setBatteryLevel(100);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| KEY | KEY_ENTER, KEY_ESC, KEY_BACKSPACE, KEY_TAB, KEY_SPACE, KEY_LEFTCTRL, KEY_LEFTSHIFT, KEY_LEFTALT, KEY_LEFTMETA, KEY_RIGHTCTRL, KEY_RIGHTSHIFT, KEY_RIGHTALT, KEY_RIGHTMETA, KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_INS... | ble_keyboard_special_key |
| MEDIA_KEY | KEY_MEDIA_PLAYPAUSE, KEY_MEDIA_STOP, KEY_MEDIA_NEXTTRACK, KEY_MEDIA_PREVIOUSTRACK, KEY_MEDIA_MUTE, KEY_MEDIA_VOLUMEUP, KEY_MEDIA_VOLUMEDOWN, KEY_MEDIA_FASTFORWARD, KEY_MEDIA_REWIND, KEY_MEDIA_EJECT | ble_keyboard_media_key |
| CONSUMER_KEY | KEY_MEDIA_CALCULATOR, KEY_MEDIA_WWWHOME, KEY_MEDIA_MAIL, KEY_MEDIA_MYCOMPUTER, KEY_MEDIA_WWWSEARCH, KEY_MEDIA_WWWBACK, KEY_MEDIA_WWWSTOP, KEY_MEDIA_WWWFAVORITES, KEY_MEDIA_MEDIASELECT | ble_keyboard_consumer_key |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ble_keyboard_begin("ESP32 Keyboard")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ble_keyboard_is_connected())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
