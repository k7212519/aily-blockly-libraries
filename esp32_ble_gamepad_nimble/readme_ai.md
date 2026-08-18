# ESP32 Bluetooth controller (NimBLE)

ESP32 Bluetooth game controller library supports buttons, joysticks, special buttons and other functions

## Library Info
- **Name**: @aily-project/lib-esp32-ble-gamepad-nimble
- **Version**: 1.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_ble_gamepad_init` | Statement | DEVICE_NAME(input_value) | `esp32_ble_gamepad_init(text("value"))` | `BleCompositeHID compositeHID("value", "ailyProject", 100); ↵ GamepadDevice* gamepad; ↵ gamepad = new GamepadDevice(); ↵ compositeHID.addDevice(gamepad); ↵ compositeHID.begin();` |
| `esp32_ble_gamepad_connected` | Value | (none) | `esp32_ble_gamepad_connected()` | `compositeHID.isConnected()` |
| `esp32_ble_gamepad_press_button` | Statement | BUTTON(dropdown) | `esp32_ble_gamepad_press_button(BUTTON_1)` | `gamepad->press(BUTTON_1);` |
| `esp32_ble_gamepad_release_button` | Statement | BUTTON(dropdown) | `esp32_ble_gamepad_release_button(BUTTON_1)` | `gamepad->release(BUTTON_1);` |
| `esp32_ble_gamepad_button_with_pin` | Statement | PIN(dropdown), PIN_MODE(dropdown), BUTTON(dropdown) | `esp32_ble_gamepad_button_with_pin(PIN, INPUT_PULLUP, BUTTON_1)` | `if (compositeHID.isConnected()) { ↵ int currentButtonPINState = digitalRead(PIN); ↵ if (currentButtonPINState != previousButtonPINState) { ↵ if (currentButtonPINState == LOW) { ↵ gamepad->press(BUTTON_1); ↵ } else { ↵ gamepad->release(BUTTON_1); ↵ } ↵ } ↵ previousButtonPINState = currentButtonPINState; ↵ }` |
| `esp32_ble_gamepad_set_axes` | Statement | X_AXIS(input_value), Y_AXIS(input_value) | `esp32_ble_gamepad_set_axes(math_number(0), math_number(0))` | `gamepad->setLeftThumb(1, 1);` |
| `esp32_ble_gamepad_set_hat` | Statement | HAT_DIRECTION(dropdown) | `esp32_ble_gamepad_set_hat(HAT_CENTERED)` | `gamepad->setHat1(HAT_CENTERED);` |
| `esp32_ble_gamepad_special_button` | Statement | SPECIAL_BUTTON(dropdown) | `esp32_ble_gamepad_special_button(Start)` | `gamepad->pressStart();` |
| `esp32_ble_gamepad_release_special_button` | Statement | SPECIAL_BUTTON(dropdown) | `esp32_ble_gamepad_release_special_button(Start)` | `gamepad->releaseStart();` |
| `esp32_ble_gamepad_analog_read` | Statement | ANALOG_PIN(dropdown), AXIS(dropdown) | `esp32_ble_gamepad_analog_read(ANALOG_PIN, X)` | `{ ↵ int potValue = analogRead(ANALOG_PIN); ↵ int adjustedValue = map(potValue, 0, 4095, -32768, 32767); ↵ gamepad->setX(adjustedValue); ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BUTTON | BUTTON_1, BUTTON_2, BUTTON_3, BUTTON_4, BUTTON_5, BUTTON_6, BUTTON_7, BUTTON_8, BUTTON_9, BUTTON_10, BUTTON_11, BUTTON_12, BUTTON_13, BUTTON_14, BUTTON_15, BUTTON_16 | esp32_ble_gamepad_press_button, esp32_ble_gamepad_release_button |
| PIN_MODE | INPUT_PULLUP, INPUT | esp32_ble_gamepad_button_with_pin |
| BUTTON | BUTTON_1, BUTTON_2, BUTTON_3, BUTTON_4, BUTTON_5, BUTTON_6, BUTTON_7, BUTTON_8 | esp32_ble_gamepad_button_with_pin |
| HAT_DIRECTION | HAT_CENTERED, HAT_UP, HAT_UP_RIGHT, HAT_RIGHT, HAT_DOWN_RIGHT, HAT_DOWN, HAT_DOWN_LEFT, HAT_LEFT, HAT_UP_LEFT | esp32_ble_gamepad_set_hat |
| SPECIAL_BUTTON | Start, Select, Menu, Home, Back, VolumeInc, VolumeDec, VolumeMute | esp32_ble_gamepad_special_button, esp32_ble_gamepad_release_special_button |
| AXIS | X, Y, Z, RX, RY, RZ | esp32_ble_gamepad_analog_read |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_ble_gamepad_init(text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_ble_gamepad_connected())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
