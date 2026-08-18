# Firmata

Standard serial protocol for communication between microcontrollers and host software.

## Library Info

- **Name**: @aily-project/lib-firmata
- **Version**: 1.0.0
- **Upstream Version**: 2.5.9
- **Source**: https://github.com/firmata/arduino

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `firmata_begin` | Statement | BAUD(input_value), AUTO(field_checkbox) | `firmata_begin(math_number(1), TRUE)` | `Firmata.setFirmwareVersion(FIRMATA_FIRMWARE_MAJOR_VERSION, FIRMATA_FIRMWARE_MINOR_VERSION); ↵ Firmata.begin(1);` |
| `firmata_process` | Statement | (none) | `firmata_process()` | `while (Firmata.available()) { ↵ Firmata.processInput(); ↵ }` |
| `firmata_available` | Value | (none) | `firmata_available()` | `Firmata.available()` |
| `firmata_send_analog` | Statement | PIN(input_value), VALUE(input_value) | `firmata_send_analog(math_number(1), math_number(1))` | `Firmata.sendAnalog(1, 1);` |
| `firmata_send_digital_port` | Statement | PORT(input_value), VALUE(input_value) | `firmata_send_digital_port(math_number(1), math_number(1))` | `Firmata.sendDigitalPort(1, 1);` |
| `firmata_send_string` | Statement | TEXT(input_value) | `firmata_send_string(text("value"))` | `Firmata.sendString("value");` |
| `firmata_on_digital_message` | Hat | PORTVAR(field_input), VALUEVAR(field_input), DO(input_statement) | `firmata_on_digital_message("firmataPort", "firmataValue")` | `void ailyFirmataDigitalMessage(byte port, int value) { ↵ byte firmataPort = port; ↵ int firmataValue = value; ↵ } ↵ Firmata.attach(DIGITAL_MESSAGE, ailyFirmataDigitalMessage);` |
| `firmata_on_pin_mode` | Hat | PINVAR(field_input), MODEVAR(field_input), DO(input_statement) | `firmata_on_pin_mode("firmataPin", "firmataMode")` | `void ailyFirmataSetPinMode(byte pin, int mode) { ↵ byte firmataPin = pin; ↵ int firmataMode = mode; ↵ } ↵ Firmata.attach(SET_PIN_MODE, ailyFirmataSetPinMode);` |
| `firmata_on_string` | Hat | TEXTVAR(field_input), DO(input_statement) | `firmata_on_string("firmataText")` | `void ailyFirmataString(char *text) { ↵ String firmataText = String(text); ↵ } ↵ Firmata.attach(STRING_DATA, ailyFirmataString);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| AUTO | TRUE, FALSE | Whether begin adds input processing to loop. |

## Notes

1. Firmata begin can automatically process input in loop.
2. Callback blocks attach the matching Firmata command handler in setup.
3. For full StandardFirmata behavior, combine these blocks with normal GPIO, analog, servo, and I2C blocks as needed.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    firmata_begin(math_number(1), TRUE)
```
