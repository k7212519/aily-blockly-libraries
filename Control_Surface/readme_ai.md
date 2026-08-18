# Control Surface

Arduino library for creating MIDI controllers and MIDI devices.

## Library Info

- **Name**: @aily-project/lib-control-surface
- **Version**: 1.0.0
- **Upstream Version**: 2.1.2
- **Source**: https://github.com/tttapa/Control-Surface

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `control_surface_usb_interface` | Statement | VAR(field_input) | `control_surface_usb_interface("midi")` | `USBMIDI_Interface midi;` |
| `control_surface_serial_interface` | Statement | VAR(field_input), SERIAL(dropdown) | `control_surface_serial_interface("midi", SERIAL)` | `HardwareSerialMIDI_Interface midi {SERIAL, MIDI_BAUD};` |
| `control_surface_begin` | Statement | (none) | `control_surface_begin()` | `Control_Surface.begin();` |
| `control_surface_loop` | Statement | (none) | `control_surface_loop()` | `Control_Surface.loop();` |
| `control_surface_cc_pot` | Statement | VAR(field_input), PIN(input_value), CC(input_value), CHANNEL(dropdown) | `control_surface_cc_pot("pot", math_number(1), math_number(1), Channel_1)` | `CCPotentiometer pot {1, {1, Channel_1}};` |
| `control_surface_note_button` | Statement | VAR(field_input), PIN(input_value), NOTE(input_value), CHANNEL(dropdown) | `control_surface_note_button("button", math_number(1), math_number(1), Channel_1)` | `NoteButton button {1, {1, Channel_1}};` |
| `control_surface_send_note` | Statement | VAR(field_variable), ACTION(dropdown), NOTE(input_value), VELOCITY(input_value), CHANNEL(dropdown) | `control_surface_send_note($midi, sendNoteOn, math_number(1), math_number(1), Channel_1)` | `midi.sendNoteOn({1, Channel_1}, 1);` |
| `control_surface_send_cc` | Statement | VAR(field_variable), CC(input_value), VALUE(input_value), CHANNEL(dropdown) | `control_surface_send_cc($midi, math_number(1), math_number(1), Channel_1)` | `midi.sendControlChange({1, Channel_1}, 1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CHANNEL | Channel_1 ... Channel_16 | Control Surface channel enum. |

## Notes

1. Declare at least one MIDI interface before Control_Surface.begin().
2. Element declaration blocks add global objects; place them once in setup flow for Blockly clarity.
3. Use Control_Surface.loop() continuously to scan inputs and send MIDI messages.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    control_surface_begin()
```
