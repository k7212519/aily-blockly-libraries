# PS2 Controller Library

Library for reading PlayStation 2 controller input, supporting analog sticks, button detection, pressure sensing and vibration feedback

## Library Info
- **Name**: @aily-project/lib-ps2x
- **Version**: 1.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ps2x_init` | Statement | CLK(dropdown), CMD(dropdown), ATT(dropdown), DAT(dropdown), PRESSURES(dropdown), RUMBLE(dropdown) | `ps2x_init(CLK, CMD, ATT, DAT, true, true)` | `PS2X ps2x; ↵ int ps2x_error = 0; ↵ byte ps2x_type = 0; ↵ delay(300); ↵ ps2x_error = ps2x.config_gamepad(CLK, CMD, ATT, DAT, true, true); ↵ if(ps2x_error == 0){ ↵ Serial.println("Found Controller, configured successful"); ↵ } else if(ps2x_error == 1){ ↵ Serial.println("No controller found, check wiring"); ↵ } else if(ps2x_error == 2){ ↵ Serial.println("Controller found but not accepting commands"); ↵ } else if(ps2x_error == 3){ ↵ Serial.println("Controller refusing to enter Pressures mode"); ↵ } ↵ ps2x_type = ps2x.readType();` |
| `ps2x_read` | Statement | VIBRATE(input_value) | `ps2x_read(math_number(0))` | `if(ps2x_error != 1) { ↵ ps2x.read_gamepad(false, 1); ↵ }` |
| `ps2x_button` | Value | BUTTON(dropdown) | `ps2x_button(PSB_PAD_UP)` | `ps2x.Button(PSB_PAD_UP)` |
| `ps2x_button_pressed` | Value | BUTTON(dropdown) | `ps2x_button_pressed(PSB_PAD_UP)` | `ps2x.ButtonPressed(PSB_PAD_UP)` |
| `ps2x_button_released` | Value | BUTTON(dropdown) | `ps2x_button_released(PSB_PAD_UP)` | `ps2x.ButtonReleased(PSB_PAD_UP)` |
| `ps2x_analog` | Value | ANALOG(dropdown) | `ps2x_analog(PSS_RX)` | `ps2x.Analog(PSS_RX)` |
| `ps2x_analog_button` | Value | BUTTON(dropdown) | `ps2x_analog_button(PSAB_PAD_UP)` | `ps2x.Analog(PSAB_PAD_UP)` |
| `ps2x_controller_type` | Value | (none) | `ps2x_controller_type()` | `ps2x_type` |
| `ps2x_new_button_state` | Value | (none) | `ps2x_new_button_state()` | `ps2x.NewButtonState()` |
| `ps2x_new_button_state_specific` | Value | BUTTON(dropdown) | `ps2x_new_button_state_specific(PSB_PAD_UP)` | `ps2x.NewButtonState(PSB_PAD_UP)` |
| `ps2x_is_connected` | Value | (none) | `ps2x_is_connected()` | `(ps2x_error == 0)` |
| `ps2x_simple_init` | Statement | CLK(dropdown), CMD(dropdown), ATT(dropdown), DAT(dropdown) | `ps2x_simple_init(CLK, CMD, ATT, DAT)` | `PS2X ps2x; ↵ int ps2x_error = 0; ↵ delay(300); ↵ ps2x_error = ps2x.config_gamepad(CLK, CMD, ATT, DAT, false, false); ↵ if(ps2x_error == 0){ ↵ Serial.println("PS2 Controller Ready!"); ↵ } else { ↵ Serial.println("PS2 Controller Error!"); ↵ }` |
| `ps2x_simple_read` | Statement | (none) | `ps2x_simple_read()` | `if(ps2x_error == 0) { ↵ ps2x.read_gamepad(); ↵ }` |
| `ps2x_joystick_moved` | Value | STICK(dropdown) | `ps2x_joystick_moved(LEFT)` | `(abs(ps2x.Analog(PSS_LX) - 128) > 30 &#124;&#124; abs(ps2x.Analog(PSS_LY) - 128) > 30)` |
| `ps2x_joystick_position` | Value | STICK(dropdown), AXIS(dropdown) | `ps2x_joystick_position(LEFT, X)` | `ps2x.Analog(PSS_LX)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PRESSURES | true, false | ps2x_init |
| RUMBLE | true, false | ps2x_init |
| BUTTON | PSB_PAD_UP, PSB_PAD_DOWN, PSB_PAD_LEFT, PSB_PAD_RIGHT, PSB_TRIANGLE, PSB_CIRCLE, PSB_CROSS, PSB_SQUARE, PSB_L1, PSB_L2, PSB_L3, PSB_R1, PSB_R2, PSB_R3, PSB_SELECT, PSB_START | ps2x_button, ps2x_button_released, ps2x_new_button_state_specific |
| BUTTON | PSB_PAD_UP, PSB_PAD_DOWN, PSB_PAD_LEFT, PSB_PAD_RIGHT, PSB_TRIANGLE, PSB_CIRCLE, PSB_CROSS, PSB_SQUARE, PSB_L1, PSB_L2, PSB_L3, PSB_R1, PSB_R2, PSB_R3, PSB_SELECT, PSB_START, PSB_RED, PSB_BLUE | ps2x_button_pressed |
| ANALOG | PSS_RX, PSS_RY, PSS_LX, PSS_LY | ps2x_analog |
| BUTTON | PSAB_PAD_UP, PSAB_PAD_DOWN, PSAB_PAD_LEFT, PSAB_PAD_RIGHT, PSAB_TRIANGLE, PSAB_CIRCLE, PSAB_CROSS, PSAB_SQUARE, PSAB_L1, PSAB_L2, PSAB_R1, PSAB_R2 | ps2x_analog_button |
| STICK | LEFT, RIGHT | ps2x_joystick_moved, ps2x_joystick_position |
| AXIS | X, Y | ps2x_joystick_position |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ps2x_init(CLK, CMD, ATT, DAT, true, true)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ps2x_button(PSB_PAD_UP))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
