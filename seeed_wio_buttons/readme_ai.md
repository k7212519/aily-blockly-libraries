# Wio Terminal Buttons

Wio Terminal A/B/C buttons and 5-way switch with OneButton event handling.

## Library Info
- **Name**: @aily-project/lib-seeed-wio-buttons
- **Version**: 1.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `wio_buttons_setup` | Statement | (none) | `wio_buttons_setup()` | `OneButton wioButtonKeyA; ↵ wioButtonKeyA.setup(WIO_KEY_A, INPUT_PULLUP, true); ↵ wioButtonKeyA.tick(); ↵ OneButton wioButtonKeyB; ↵ wioButtonKeyB.setup(WIO_KEY_B, INPUT_PULLUP, true); ↵ wioButtonKeyB.tick(); ↵ OneButton wioButtonKeyC; ↵ wioButtonKeyC.setup(WIO_KEY_C, INPUT_PULLUP, true); ↵ wioButtonKeyC.tick(); ↵ OneButton wioButtonUp; ↵ wioButtonUp.setup(WIO_5S_UP, INPUT_PULLUP, true); ↵ wioButtonUp.tick(); ↵ OneButton wioButtonDown; ↵ wioButtonDown.setup(WIO_5S_DOWN, INPUT_PULLUP, true); ↵ wioButtonDown.tick(); ↵ OneButton wioButtonLeft; ↵ wioButtonLeft.setup(WIO_5S_LEFT, INPUT_PULLUP, true); ↵ wioButtonLeft.tick(); ↵ OneButton wioButtonRight; ↵ wioButtonRight.setup(WIO_5S_RIGHT, INPUT_PULLUP, true); ↵ wioButtonRight.tick(); ↵ OneButton wioButtonPress; ↵ wioButtonPress.setup(WIO_5S_PRESS, INPUT_PULLUP, true); ↵ wioButtonPress.tick();` |
| `wio_button_is_pressed` | Value | BUTTON(dropdown) | `wio_button_is_pressed(WIO_KEY_A)` | `wioButtonKeyA.debouncedValue()` |
| `wio_switch_is_pressed` | Value | DIRECTION(dropdown) | `wio_switch_is_pressed(WIO_5S_UP)` | `wioButtonUp.debouncedValue()` |
| `wio_control_on_event` | Hat | CONTROL(dropdown), EVENT(dropdown), DO(input_statement) | `wio_control_on_event(WIO_KEY_A, CLICK)` | `OneButton wioButtonKeyA; ↵ wioButtonKeyA.setup(WIO_KEY_A, INPUT_PULLUP, true); ↵ wioButtonKeyA.tick(); ↵ void onWioKeyAClick() { ↵ } ↵ wioButtonKeyA.attachClick(onWioKeyAClick);` |
| `wio_control_set_debounce_ms` | Statement | CONTROL(dropdown), MS(input_value) | `wio_control_set_debounce_ms(WIO_KEY_A, math_number(50))` | `wioButtonKeyA.setDebounceMs(1);` |
| `wio_control_set_click_ms` | Statement | CONTROL(dropdown), MS(input_value) | `wio_control_set_click_ms(WIO_KEY_A, math_number(400))` | `wioButtonKeyA.setClickMs(1);` |
| `wio_control_set_press_ms` | Statement | CONTROL(dropdown), MS(input_value) | `wio_control_set_press_ms(WIO_KEY_A, math_number(800))` | `wioButtonKeyA.setPressMs(1);` |
| `wio_control_set_long_press_interval_ms` | Statement | CONTROL(dropdown), MS(input_value) | `wio_control_set_long_press_interval_ms(WIO_KEY_A, math_number(1000))` | `wioButtonKeyA.setLongPressIntervalMs(1);` |
| `wio_control_is_long_pressed` | Value | CONTROL(dropdown) | `wio_control_is_long_pressed(WIO_KEY_A)` | `wioButtonKeyA.isLongPressed()` |
| `wio_control_get_pressed_ms` | Value | CONTROL(dropdown) | `wio_control_get_pressed_ms(WIO_KEY_A)` | `wioButtonKeyA.getPressedMs()` |
| `wio_control_get_number_clicks` | Value | CONTROL(dropdown) | `wio_control_get_number_clicks(WIO_KEY_A)` | `wioButtonKeyA.getNumberClicks()` |
| `wio_control_reset` | Statement | CONTROL(dropdown) | `wio_control_reset(WIO_KEY_A)` | `wioButtonKeyA.reset();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BUTTON | `WIO_KEY_A`, `WIO_KEY_B`, `WIO_KEY_C` | top buttons |
| DIRECTION | `WIO_5S_UP`, `WIO_5S_DOWN`, `WIO_5S_LEFT`, `WIO_5S_RIGHT`, `WIO_5S_PRESS` | 5-way switch |
| CONTROL | all BUTTON and DIRECTION values | any onboard input |
| EVENT | `CLICK`, `DOUBLE_CLICK`, `MULTI_CLICK`, `PRESS`, `LONG_PRESS_START`, `DURING_LONG_PRESS`, `LONG_PRESS_STOP` | OneButton event |

## ABS Examples

```text
wio_control_set_press_ms(WIO_5S_PRESS, math_number(800))
wio_control_on_event(WIO_5S_PRESS, LONG_PRESS_START)
    serial_println(Serial, text("long press"))
```

## Notes

Each referenced control gets one global OneButton object. The generator adds the library include, active-low `INPUT_PULLUP` setup and a deduplicated `tick()` call automatically. The original pressed-state block ids remain compatible.
