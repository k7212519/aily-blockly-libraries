# USB Host Shield Library 2.0

MAX3421E-based USB Host Shield library for USB devices, hubs, HID, Bluetooth, and game controllers.

## Library Info

- **Name**: @aily-project/lib-usb-host-shield-2-0
- **Version**: 1.0.0
- **Upstream Version**: 1.7.0
- **Source**: https://github.com/felis/USB_Host_Shield_2.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `usbhost_begin` | Statement | HALT(field_checkbox) | `usbhost_begin(TRUE)` | `if (Usb.Init() == -1) { ↵ while (1); ↵ }` |
| `usbhost_task` | Statement | (none) | `usbhost_task()` | `Usb.Task();` |
| `usbhost_ps4_begin` | Statement | HALT(field_checkbox) | `usbhost_ps4_begin(TRUE)` | `if (Usb.Init() == -1) { ↵ while (1); ↵ }` |
| `usbhost_ps4_connected` | Value | (none) | `usbhost_ps4_connected()` | `PS4.connected()` |
| `usbhost_ps4_button` | Value | BUTTON(dropdown), MODE(dropdown) | `usbhost_ps4_button(CROSS, getButtonClick)` | `PS4.getButtonClick(CROSS)` |
| `usbhost_ps4_hat` | Value | HAT(dropdown) | `usbhost_ps4_hat(LeftHatX)` | `PS4.getAnalogHat(LeftHatX)` |
| `usbhost_ps4_rumble` | Statement | LOW(input_value), HIGH(input_value) | `usbhost_ps4_rumble(math_number(1), math_number(1))` | `PS4.setRumbleOn(1, 1);` |
| `usbhost_ps4_led` | Statement | COLOR(dropdown) | `usbhost_ps4_led(Red)` | `PS4.setLed(Red);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BUTTON | CROSS, CIRCLE, SQUARE, TRIANGLE, UP, DOWN, LEFT, RIGHT, L1, R1, SHARE, OPTIONS, PS, TOUCHPAD | PS4 button constant. |
| MODE | getButtonClick, getButtonPress | Read click event or held state. |

## Notes

1. The core begin block initializes the MAX3421E host shield and adds Usb.Task() to loop.
2. The PS4 blocks target USB-connected PS4 controllers. Other controller families can be added using the same pattern.
3. Include SPI wiring and host shield power requirements in hardware setup.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    usbhost_begin(TRUE)
```
