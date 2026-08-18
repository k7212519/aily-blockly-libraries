# MIDI Library

Arduino MIDI input and output library.

## Library Info

- **Name**: @aily-project/lib-midi
- **Version**: 1.0.0
- **Upstream Version**: 5.0.2
- **Source**: https://github.com/FortySevenEffects/arduino_midi_library

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `midi_begin` | Statement | CHANNEL(input_value) | `midi_begin(math_number(1))` | `MIDI.begin(1);` |
| `midi_read` | Value | (none) | `midi_read()` | `MIDI.read()` |
| `midi_send_note_on` | Statement | NOTE(input_value), VELOCITY(input_value), CHANNEL(input_value) | `midi_send_note_on(math_number(1), math_number(1), math_number(1))` | `MIDI.sendNoteOn(1, 1, 1);` |
| `midi_send_note_off` | Statement | NOTE(input_value), VELOCITY(input_value), CHANNEL(input_value) | `midi_send_note_off(math_number(1), math_number(1), math_number(1))` | `MIDI.sendNoteOff(1, 1, 1);` |
| `midi_send_control_change` | Statement | CC(input_value), VALUE(input_value), CHANNEL(input_value) | `midi_send_control_change(math_number(1), math_number(1), math_number(1))` | `MIDI.sendControlChange(1, 1, 1);` |
| `midi_send_program_change` | Statement | PROGRAM(input_value), CHANNEL(input_value) | `midi_send_program_change(math_number(1), math_number(1))` | `MIDI.sendProgramChange(1, 1);` |
| `midi_send_pitch_bend` | Statement | VALUE(input_value), CHANNEL(input_value) | `midi_send_pitch_bend(math_number(1), math_number(1))` | `MIDI.sendPitchBend(1, 1);` |
| `midi_get_data` | Value | FIELD(dropdown) | `midi_get_data(getType)` | `MIDI.getType()` |
| `midi_turn_thru` | Statement | STATE(dropdown) | `midi_turn_thru(turnThruOn)` | `MIDI.turnThruOn();` |
| `midi_on_note_on` | Hat | CHANNELVAR(field_input), NOTEVAR(field_input), VELOCITYVAR(field_input), DO(input_statement) | `midi_on_note_on("midiChannel", "midiNote", "midiVelocity")` | `MIDI_CREATE_DEFAULT_INSTANCE(); ↵ void ailyMidiNoteOn(byte channel, byte note, byte velocity) { ↵ byte midiChannel = channel; ↵ byte midiNote = note; ↵ byte midiVelocity = velocity; ↵ } ↵ MIDI.setHandleNoteOn(ailyMidiNoteOn); ↵ MIDI.read();` |
| `midi_on_control_change` | Hat | CHANNELVAR(field_input), CCVAR(field_input), VALUEVAR(field_input), DO(input_statement) | `midi_on_control_change("midiChannel", "midiCC", "midiValue")` | `MIDI_CREATE_DEFAULT_INSTANCE(); ↵ void ailyMidiControlChange(byte channel, byte number, byte value) { ↵ byte midiChannel = channel; ↵ byte midiCC = number; ↵ byte midiValue = value; ↵ } ↵ MIDI.setHandleControlChange(ailyMidiControlChange); ↵ MIDI.read();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| FIELD | getType, getChannel, getData1, getData2 | Last received MIDI message field. |
| STATE | turnThruOn, turnThruOff | MIDI thru mode. |

## Notes

1. The wrapper uses MIDI_CREATE_DEFAULT_INSTANCE().
2. Callback blocks add MIDI.read() to loop automatically.
3. For custom serial ports, extend the wrapper with MIDI_CREATE_INSTANCE blocks.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    midi_begin(math_number(1))
```
