# Adafruit TinyUSB

USB device descriptors, WebUSB serial, MIDI, and enumeration state.

## Library Info
- **Name**: @aily-project/lib-adafruit-tinyusb
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tinyusb_device_init` | Statement | VID(input_value), PID(input_value), MANUFACTURER(input_value), PRODUCT(input_value) | `tinyusb_device_init(math_number(0), math_number(0), text("value"), text("value"))` | `if (!TinyUSBDevice.isInitialized()) TinyUSBDevice.begin(0); ↵ #ifdef TINYUSB_NEED_POLLING_TASK ↵ TinyUSBDevice.task(); ↵ #endif ↵ String _ailyTinyUsbManufacturer; ↵ String _ailyTinyUsbProduct; ↵ _ailyTinyUsbManufacturer = "value"; ↵ _ailyTinyUsbProduct = "value"; ↵ TinyUSBDevice.setID(1, 1); ↵ TinyUSBDevice.setManufacturerDescriptor(_ailyTinyUsbManufacturer.c_str()); ↵ TinyUSBDevice.setProductDescriptor(_ailyTinyUsbProduct.c_str());` |
| `tinyusb_webusb_init` | Statement | VAR(field_input), HOST(field_input) | `tinyusb_webusb_init("webUsb", "example.tinyusb.org/webusb-serial/index.html")` | `if (!TinyUSBDevice.isInitialized()) TinyUSBDevice.begin(0); ↵ #ifdef TINYUSB_NEED_POLLING_TASK ↵ TinyUSBDevice.task(); ↵ #endif ↵ WEBUSB_URL_DEF(webUsb_landing, 1, "example.tinyusb.org/webusb-serial/index.html"); ↵ Adafruit_USBD_WebUSB webUsb; ↵ webUsb.setLandingPage(&webUsb_landing); ↵ webUsb.begin();` |
| `tinyusb_webusb_write` | Statement | VAR(field_variable), OP(dropdown), DATA(input_value) | `tinyusb_webusb_write($webUsb, print, math_number(0))` | `webUsb.print(1); ↵ webUsb.flush();` |
| `tinyusb_webusb_data` | Value | VAR(field_variable), DATA(dropdown) | `tinyusb_webusb_data($webUsb, available)` | `webUsb.available()` |
| `tinyusb_midi_init` | Statement | VAR(field_input) | `tinyusb_midi_init("usbMidi")` | `if (!TinyUSBDevice.isInitialized()) TinyUSBDevice.begin(0); ↵ #ifdef TINYUSB_NEED_POLLING_TASK ↵ TinyUSBDevice.task(); ↵ #endif ↵ Adafruit_USBD_MIDI usbMidi_transport; ↵ MIDI_CREATE_INSTANCE(Adafruit_USBD_MIDI, usbMidi_transport, usbMidi); ↵ usbMidi.begin(MIDI_CHANNEL_OMNI); ↵ usbMidi.read();` |
| `tinyusb_midi_note` | Statement | VAR(field_variable), ACTION(dropdown), NOTE(input_value), VELOCITY(input_value), CHANNEL(input_value) | `tinyusb_midi_note($usbMidi, sendNoteOn, math_number(0), math_number(0), math_number(0))` | `usbMidi.sendNoteOn(1, 1, 1);` |
| `tinyusb_midi_control` | Statement | VAR(field_variable), CONTROL(input_value), VALUE(input_value), CHANNEL(input_value) | `tinyusb_midi_control($usbMidi, math_number(0), math_number(0), math_number(0))` | `usbMidi.sendControlChange(1, 1, 1);` |
| `tinyusb_mounted` | Value | (none) | `tinyusb_mounted()` | `TinyUSBDevice.mounted()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| OP | print, println, write | tinyusb_webusb_write |
| DATA | available, read, connected | tinyusb_webusb_data |
| ACTION | sendNoteOn, sendNoteOff, sendPolyPressure | tinyusb_midi_note |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tinyusb_device_init(math_number(0), math_number(0), text("value"), text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tinyusb_webusb_data($webUsb, available))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `tinyusb_webusb_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
