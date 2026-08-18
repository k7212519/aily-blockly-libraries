# rc-switch

Operate 433/315 MHz remote controlled devices from Arduino-compatible boards.

## Library Info

- **Name**: @aily-project/lib-rc-switch
- **Version**: 1.0.0
- **Upstream Version**: 2.6.4
- **Source**: https://github.com/sui77/rc-switch

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `rcswitch_create` | Statement | VAR(field_input) | `rcswitch_create("mySwitch")` | `RCSwitch mySwitch = RCSwitch();` |
| `rcswitch_enable_transmit` | Statement | VAR(field_variable), PIN(input_value) | `rcswitch_enable_transmit($mySwitch, math_number(1))` | `mySwitch.enableTransmit(1);` |
| `rcswitch_enable_receive` | Statement | VAR(field_variable), INTERRUPT(input_value) | `rcswitch_enable_receive($mySwitch, math_number(1))` | `mySwitch.enableReceive(1);` |
| `rcswitch_set_protocol` | Statement | VAR(field_variable), PROTOCOL(input_value), PULSE(input_value) | `rcswitch_set_protocol($mySwitch, math_number(1), math_number(1))` | `mySwitch.setProtocol(1, 1);` |
| `rcswitch_set_repeat` | Statement | VAR(field_variable), REPEAT(input_value) | `rcswitch_set_repeat($mySwitch, math_number(1))` | `mySwitch.setRepeatTransmit(1);` |
| `rcswitch_send_decimal` | Statement | VAR(field_variable), CODE(input_value), BITS(input_value) | `rcswitch_send_decimal($mySwitch, math_number(1), math_number(1))` | `mySwitch.send(1, 1);` |
| `rcswitch_send_binary` | Statement | VAR(field_variable), CODE(input_value) | `rcswitch_send_binary($mySwitch, text("value"))` | `mySwitch.send("value");` |
| `rcswitch_send_tristate` | Statement | VAR(field_variable), CODE(input_value) | `rcswitch_send_tristate($mySwitch, text("value"))` | `mySwitch.sendTriState("value");` |
| `rcswitch_available` | Value | VAR(field_variable) | `rcswitch_available($mySwitch)` | `mySwitch.available()` |
| `rcswitch_received_value` | Value | VAR(field_variable), FIELD(dropdown) | `rcswitch_received_value($mySwitch, getReceivedValue)` | `mySwitch.getReceivedValue()` |
| `rcswitch_reset_available` | Statement | VAR(field_variable) | `rcswitch_reset_available($mySwitch)` | `mySwitch.resetAvailable();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| FIELD | value, bit length, delay, protocol | Received packet field. |

## Notes

1. Use enable transmit before send blocks.
2. Use enable receive with an interrupt number, for example 0 for pin 2 on many AVR boards.
3. Call reset available after reading a received packet.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    rcswitch_create("mySwitch")
```
