# PJON

PJON is a multi-master bus network protocol for local and networked device communication.

## Library Info

- **Name**: @aily-project/lib-pjon
- **Version**: 1.0.0
- **Upstream Version**: 13.1.0
- **Source**: https://github.com/gioblu/PJON

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `pjon_sbb_begin` | Statement | VAR(field_input), ID(input_value), PIN(input_value) | `pjon_sbb_begin("bus", math_number(1), math_number(1))` | `bus.strategy.set_pin(1); ↵ bus.begin();` |
| `pjon_sbb_update_receive` | Statement | VAR(field_variable), TIMEOUT(input_value) | `pjon_sbb_update_receive($bus, math_number(1))` | `bus.update(); ↵ bus.receive(1);` |
| `pjon_sbb_send_text` | Statement | VAR(field_variable), TEXT(input_value), DEVICE(input_value) | `pjon_sbb_send_text($bus, text("value"), math_number(1))` | `aily_pjon_send_text(bus, 1, "value");` |
| `pjon_sbb_send_repeated_text` | Statement | VAR(field_variable), TEXT(input_value), DEVICE(input_value), INTERVAL(input_value) | `pjon_sbb_send_repeated_text($bus, text("value"), math_number(1), math_number(1))` | `aily_pjon_send_repeated_text(bus, 1, "value", 1);` |
| `pjon_sbb_reply_text` | Statement | VAR(field_variable), TEXT(input_value) | `pjon_sbb_reply_text($bus, text("value"))` | `aily_pjon_reply_text(bus, "value");` |
| `pjon_sbb_on_receive` | Hat | VAR(field_variable), BYTEVAR(field_input), LENVAR(field_input), DO(input_statement) | `pjon_sbb_on_receive($bus, "pjonByte", "pjonLength")` | `void aily_pjon_receive_bus(uint8_t *payload, uint16_t length, const PJON_Packet_Info &packet_info) { ↵ (void)packet_info; ↵ uint8_t pjonByte = length ? payload[0] : 0; ↵ uint16_t pjonLength = length; ↵ } ↵ bus.set_receiver(aily_pjon_receive_bus);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| VAR | Blockly variable | PJON bus object name. |

## Notes

1. The wrapper uses PJONSoftwareBitBang because it is the most common Arduino PJON entry point.
2. The begin block adds update() and receive(1000) to loop automatically.
3. Callback local variables expose the first payload byte and packet length.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    pjon_sbb_begin("bus", math_number(1), math_number(1))
```
