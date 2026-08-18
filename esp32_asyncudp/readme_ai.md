# ESP32 Asynchronous UDP

ESP32 asynchronous UDP communication library supports UDP listening, sending, broadcast and multicast

## Library Info
- **Name**: @aily-project/lib-esp32-asyncudp
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_asyncudp_create` | Statement | VAR(field_input) | `esp32_asyncudp_create("udp")` | `AsyncUDP udp;` |
| `esp32_asyncudp_listen` | Statement | VAR(field_variable), PORT(input_value) | `esp32_asyncudp_listen($udp, math_number(0))` | `udp.listen(1);` |
| `esp32_asyncudp_on_packet` | Hat | VAR(field_variable), DATA_VAR(field_input), IP_VAR(field_input), PORT_VAR(field_input), HANDLER(input_statement) | `esp32_asyncudp_on_packet($udp, "data", "remoteIP", "remotePort")` | `udp.onPacket([](AsyncUDPPacket packet) { ↵ String data = (const char*)packet.data(); ↵ String remoteIP = packet.remoteIP().toString(); ↵ uint16_t remotePort = packet.remotePort(); ↵ });` |
| `esp32_asyncudp_send` | Statement | VAR(field_variable), DATA(input_value), IP(input_value), PORT(input_value) | `esp32_asyncudp_send($udp, text("value"), text("value"), math_number(0))` | `{ ↵ IPAddress targetIP; ↵ targetIP.fromString("value"); ↵ udp.writeTo((const uint8_t*)String("value").c_str(), String("value").length(), targetIP, 1); ↵ }` |
| `esp32_asyncudp_broadcast` | Statement | VAR(field_variable), DATA(input_value), PORT(input_value) | `esp32_asyncudp_broadcast($udp, text("value"), math_number(0))` | `udp.broadcastTo("value", 1);` |
| `esp32_asyncudp_close` | Statement | VAR(field_variable) | `esp32_asyncudp_close($udp)` | `udp.close();` |
| `esp32_asyncudp_listen_multicast` | Statement | VAR(field_variable), IP(input_value), PORT(input_value) | `esp32_asyncudp_listen_multicast($udp, text("value"), math_number(0))` | `{ ↵ IPAddress multicastIP; ↵ multicastIP.fromString("value"); ↵ udp.listenMulticast(multicastIP, 1); ↵ }` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_asyncudp_create("udp")
    serial_begin(Serial, 9600)

arduino_loop()
    esp32_asyncudp_listen($udp, math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_asyncudp_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
