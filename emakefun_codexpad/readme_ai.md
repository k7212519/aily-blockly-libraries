# CodexPad Bluetooth handle

Emakefun CodexPad Bluetooth game controller library supports connecting the controller via BLE and reading button and joystick input in real time

## Library Info
- **Name**: @aily-project/lib-codexpad
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `codexpad_init` | Statement | VAR(field_input), MAC(input_value) | `codexpad_init("pad", text("value"))` | `CodexPad pad; ↵ pad.Init(); ↵ pad.Connect(std::string("value")); ↵ pad.Update();` |
| `codexpad_is_connected` | Value | VAR(field_variable) | `codexpad_is_connected($pad)` | `pad.is_connected()` |
| `codexpad_set_tx_power` | Statement | VAR(field_variable), POWER(dropdown) | `codexpad_set_tx_power($pad, kMinus16dBm)` | `pad.set_tx_power(CodexPad::TxPower::kMinus16dBm);` |
| `codexpad_button_pressed` | Value | VAR(field_variable), BUTTON(dropdown) | `codexpad_button_pressed($pad, kUp)` | `pad.pressed(CodexPad::Button::kUp)` |
| `codexpad_button_released` | Value | VAR(field_variable), BUTTON(dropdown) | `codexpad_button_released($pad, kUp)` | `pad.released(CodexPad::Button::kUp)` |
| `codexpad_button_holding` | Value | VAR(field_variable), BUTTON(dropdown) | `codexpad_button_holding($pad, kUp)` | `pad.holding(CodexPad::Button::kUp)` |
| `codexpad_button_state` | Value | VAR(field_variable), BUTTON(dropdown) | `codexpad_button_state($pad, kUp)` | `pad.button_state(CodexPad::Button::kUp)` |
| `codexpad_axis_value` | Value | VAR(field_variable), AXIS(dropdown) | `codexpad_axis_value($pad, kLeftStickX)` | `pad.axis_value(CodexPad::Axis::kLeftStickX)` |
| `codexpad_axis_changed` | Value | VAR(field_variable), AXIS(dropdown), THRESHOLD(input_value) | `codexpad_axis_changed($pad, kLeftStickX, math_number(0))` | `pad.HasAxisValueChanged(CodexPad::Axis::kLeftStickX, 1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| POWER | kMinus16dBm, kMinus12dBm, kMinus8dBm, kMinus5dBm, kMinus3dBm, kMinus1dBm, k0dBm, k1dBm, k2dBm, k3dBm, k4dBm, k5dBm, k6dBm | codexpad_set_tx_power |
| BUTTON | kUp, kDown, kLeft, kRight, kSquareX, kTriangleY, kCrossA, kCircleB, kL1, kL2, kL3, kR1, kR2, kR3, kSelect, kStart, kHome | codexpad_button_pressed, codexpad_button_released, codexpad_button_holding |
| AXIS | kLeftStickX, kLeftStickY, kRightStickX, kRightStickY | codexpad_axis_value, codexpad_axis_changed |

## ABS Examples

### Basic Usage
```
arduino_setup()
    codexpad_init("pad", text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, codexpad_is_connected($pad))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `codexpad_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
