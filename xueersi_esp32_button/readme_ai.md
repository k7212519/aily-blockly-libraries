# Xueersi ESP32 Buttons

OneButton-style Blockly blocks for the Xueersi XiaoMiao ESP32 onboard Up, Down, Left, Right, A and B buttons.

## Library Info
- **Name**: @aily-project/lib-xueersi-esp32-button
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `xueersi_esp32_button_setup` | Statement | (none) | `xueersi_esp32_button_setup()` | `OneButton xueersiButtonUp; ↵ xueersiButtonUp.setup(2, INPUT_PULLUP, true); ↵ xueersiButtonUp.tick(); ↵ OneButton xueersiButtonDown; ↵ xueersiButtonDown.setup(13, INPUT_PULLUP, true); ↵ xueersiButtonDown.tick(); ↵ OneButton xueersiButtonLeft; ↵ xueersiButtonLeft.setup(27, INPUT_PULLUP, true); ↵ xueersiButtonLeft.tick(); ↵ OneButton xueersiButtonRight; ↵ xueersiButtonRight.setup(35, INPUT, true); ↵ xueersiButtonRight.tick(); ↵ OneButton xueersiButtonA; ↵ xueersiButtonA.setup(34, INPUT, true); ↵ xueersiButtonA.tick(); ↵ OneButton xueersiButtonB; ↵ xueersiButtonB.setup(12, INPUT_PULLUP, true); ↵ xueersiButtonB.tick();` |
| `xueersi_esp32_button_is_pressed` | Value | BUTTON(dropdown) | `xueersi_esp32_button_is_pressed(UP)` | `(digitalRead(2) == LOW)` |
| `xueersi_esp32_button_on_event` | Hat | BUTTON(dropdown), EVENT(dropdown), DO(input_statement) | `xueersi_esp32_button_on_event(UP, CLICK)` | `OneButton xueersiButtonUp; ↵ xueersiButtonUp.setup(2, INPUT_PULLUP, true); ↵ xueersiButtonUp.tick(); ↵ void onXueersiUpClick() { ↵ } ↵ xueersiButtonUp.attachClick(onXueersiUpClick);` |
| `xueersi_esp32_button_set_debounce_ms` | Statement | BUTTON(dropdown), MS(input_value) | `xueersi_esp32_button_set_debounce_ms(UP, math_number(50))` | `xueersiButtonUp.setDebounceMs(1);` |
| `xueersi_esp32_button_set_click_ms` | Statement | BUTTON(dropdown), MS(input_value) | `xueersi_esp32_button_set_click_ms(UP, math_number(400))` | `xueersiButtonUp.setClickMs(1);` |
| `xueersi_esp32_button_set_press_ms` | Statement | BUTTON(dropdown), MS(input_value) | `xueersi_esp32_button_set_press_ms(UP, math_number(800))` | `xueersiButtonUp.setPressMs(1);` |
| `xueersi_esp32_button_set_long_press_interval_ms` | Statement | BUTTON(dropdown), MS(input_value) | `xueersi_esp32_button_set_long_press_interval_ms(UP, math_number(1000))` | `xueersiButtonUp.setLongPressIntervalMs(1);` |
| `xueersi_esp32_button_is_long_pressed` | Value | BUTTON(dropdown) | `xueersi_esp32_button_is_long_pressed(UP)` | `xueersiButtonUp.isLongPressed()` |
| `xueersi_esp32_button_get_pressed_ms` | Value | BUTTON(dropdown) | `xueersi_esp32_button_get_pressed_ms(UP)` | `xueersiButtonUp.getPressedMs()` |
| `xueersi_esp32_button_get_number_clicks` | Value | BUTTON(dropdown) | `xueersi_esp32_button_get_number_clicks(UP)` | `xueersiButtonUp.getNumberClicks()` |
| `xueersi_esp32_button_reset` | Statement | BUTTON(dropdown) | `xueersi_esp32_button_reset(UP)` | `xueersiButtonUp.reset();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BUTTON | UP, DOWN, LEFT, RIGHT, A, B | Fixed onboard buttons: UP=GPIO2, DOWN=GPIO13, LEFT=GPIO27, RIGHT=GPIO35, A=GPIO34, B=GPIO12 |
| EVENT | CLICK, DOUBLE_CLICK, MULTI_CLICK, PRESS, LONG_PRESS_START, DURING_LONG_PRESS, LONG_PRESS_STOP | OneButton event to register |

## ABS Examples

### Basic Usage
```
arduino_setup()
    xueersi_esp32_button_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, xueersi_esp32_button_is_pressed(UP))
    time_delay(math_number(100))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, variables, or nested value blocks for time parameters.
3. **Runtime**: each used button emits `OneButton.h`, a fixed global object, setup code, and automatic `tick()` calls.
