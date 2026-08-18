# K10 Button

UNIHIKER K10 onboard button library, supports A/B/AB button polling and interrupt callbacks

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-button
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_button_pressed` | Value | BTN(dropdown) | `k10_button_pressed(buttonA)` | `(k10.buttonA->isPressed())` |
| `k10_button_callback` | Hat | BTN(dropdown), EVENT(dropdown), DO(input_statement) | `k10_button_callback(buttonA, pressed)` | `UNIHIKER_K10 k10; ↵ k10.begin(); ↵ void onK10_buttonA_Pressed(); ↵ void onK10_buttonA_Pressed() { ↵ } ↵ k10.buttonA->setPressedCallback(onK10_buttonA_Pressed);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BTN | buttonA, buttonB, buttonAB | k10_button_pressed, k10_button_callback |
| EVENT | pressed, released | k10_button_callback |

## ABS Examples

### Basic Usage
```
arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, k10_button_pressed(buttonA))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
