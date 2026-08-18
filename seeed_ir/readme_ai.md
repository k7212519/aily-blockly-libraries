# Seeed Infrared Remote

Blockly wrapper for Seeed_Arduino_IR with Wio Terminal built-in IR sending, IRLib2 protocol sending, raw sending, and basic receive decoding.

## Library Info
- **Name**: @aily-project/lib-seeed-ir
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_ir_sender_create` | Statement | VAR(field_input) | `seeed_ir_sender_create("irSender")` | `IRsend irSender;` |
| `seeed_ir_raw_sender_create` | Statement | VAR(field_input) | `seeed_ir_raw_sender_create("rawSender")` | `IRsendRaw rawSender;` |
| `seeed_ir_send` | Statement | VAR(field_variable), PROTOCOL(dropdown), DATA(input_value), DATA2(input_value), KHZ(input_value) | `seeed_ir_send($irSender, NEC, math_number(0), math_number(0), math_number(0))` | `irSender.send(NEC, 1, 1, 1);` |
| `seeed_ir_send_nec` | Statement | VAR(field_variable), DATA(input_value), KHZ(input_value) | `seeed_ir_send_nec($irSender, math_number(0), math_number(0))` | `irSender.send(NEC, 1, 0, 1);` |
| `seeed_ir_wio_send` | Statement | PROTOCOL(dropdown), DATA(input_value), DATA2(input_value), KHZ(input_value) | `seeed_ir_wio_send(NEC, math_number(0), math_number(0), math_number(0))` | `ailyWioIrSender.send(NEC, 1, 1, 1);` |
| `seeed_ir_send_raw` | Statement | VAR(field_variable), DATA(input_value), KHZ(input_value) | `seeed_ir_send_raw($rawSender, text("value"), math_number(0))` | `{ ↵ uint16_t ailySeeedIrRawData[] = {value}; ↵ rawSender.send(ailySeeedIrRawData, sizeof(ailySeeedIrRawData) / sizeof(ailySeeedIrRawData[0]), 1); ↵ }` |
| `seeed_ir_receiver_create` | Statement | VAR(field_input), DECODER(field_input), PROTOCOL(dropdown), PIN(field_number) | `seeed_ir_receiver_create("irReceiver", "irDecoder", NEC, 2)` | `IRrecvPCI irReceiver(2); ↵ IRdecode irDecoder;` |
| `seeed_ir_receiver_enable` | Statement | VAR(field_variable) | `seeed_ir_receiver_enable($irReceiver)` | `irReceiver.enableIRIn();` |
| `seeed_ir_on_receive` | Statement | VAR(field_variable), DECODER(field_variable), DO(input_statement) | `seeed_ir_on_receive($irReceiver, $irDecoder)` | `if (irReceiver.getResults()) { ↵ irDecoder.decode(); ↵ irReceiver.enableIRIn(); ↵ }` |
| `seeed_ir_receiver_available` | Value | VAR(field_variable) | `seeed_ir_receiver_available($irReceiver)` | `irReceiver.getResults()` |
| `seeed_ir_decoder_decode` | Statement | DECODER(field_variable) | `seeed_ir_decoder_decode($irDecoder)` | `irDecoder.decode();` |
| `seeed_ir_decoder_get` | Value | DECODER(field_variable), FIELD(dropdown) | `seeed_ir_decoder_get($irDecoder, PROTOCOL)` | `irDecoder.protocolNum` |
| `seeed_ir_decoder_protocol_name` | Value | DECODER(field_variable) | `seeed_ir_decoder_protocol_name($irDecoder)` | `ailySeeedIrProtocolName(irDecoder.protocolNum)` |
| `seeed_ir_decoder_dump` | Statement | DECODER(field_variable), VERBOSE(dropdown) | `seeed_ir_decoder_dump($irDecoder, true)` | `irDecoder.dumpResults(true);` |
| `seeed_ir_receiver_resume` | Statement | VAR(field_variable) | `seeed_ir_receiver_resume($irReceiver)` | `irReceiver.enableIRIn();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PROTOCOL | NEC, SONY, RC5, RC6, PANASONIC_OLD, JVC, NECX, SAMSUNG36, GICABLE, DIRECTV, RCMM, CYKM | seeed_ir_send, seeed_ir_wio_send, seeed_ir_receiver_create |
| FIELD | PROTOCOL, VALUE, ADDRESS, BITS | seeed_ir_decoder_get |
| VERBOSE | true, false | seeed_ir_decoder_dump |

## ABS Examples

### Basic Usage
```
arduino_setup()
    seeed_ir_sender_create("irSender")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, seeed_ir_receiver_available($irReceiver))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `seeed_ir_sender_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
