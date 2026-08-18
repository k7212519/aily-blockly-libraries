# Arduino Ethernet

Wired Ethernet client, server, UDP, DHCP, and static IP blocks.

## Library Info
- **Name**: @aily-project/lib-arduino-ethernet
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ethernet_init` | Statement | MAC(input_value), MODE(dropdown), IP(input_value) | `ethernet_init(text("value"), dhcp, text("value"))` | `byte _ailyEthernetMac[6]; ↵ void _ailyEthernetParseMac(String value, byte out[6]) { ↵ for (uint8_t i = 0; i < 6; i++) out[i] = (byte)strtoul(value.substring(i * 3, i * 3 + 2).c_str(), nullptr, 16); ↵ } ↵ IPAddress _ailyEthernetIP(String value) { ↵ IPAddress result; ↵ result.fromString(value); ↵ return result; ↵ } ↵ _ailyEthernetParseMac("value", _ailyEthernetMac); ↵ Ethernet.begin(_ailyEthernetMac); ↵ Ethernet.maintain();` |
| `ethernet_network_info` | Value | INFO(dropdown) | `ethernet_network_info(localIP)` | `Ethernet.localIP()` |
| `ethernet_client_create` | Statement | VAR(field_input) | `ethernet_client_create("ethClient")` | `EthernetClient ethClient;` |
| `ethernet_client_connect` | Value | VAR(field_variable), HOST(input_value), PORT(input_value) | `ethernet_client_connect($ethClient, text("value"), math_number(0))` | `ethClient.connect("value", 1)` |
| `ethernet_client_write` | Statement | VAR(field_variable), OP(dropdown), DATA(input_value) | `ethernet_client_write($ethClient, print, math_number(0))` | `ethClient.print(1);` |
| `ethernet_client_data` | Value | VAR(field_variable), DATA(dropdown) | `ethernet_client_data($ethClient, available)` | `ethClient.available()` |
| `ethernet_client_stop` | Statement | VAR(field_variable) | `ethernet_client_stop($ethClient)` | `ethClient.stop();` |
| `ethernet_server_create` | Statement | VAR(field_input), PORT(input_value) | `ethernet_server_create("ethServer", math_number(0))` | `EthernetServer ethServer(1); ↵ ethServer.begin();` |
| `ethernet_server_accept` | Value | VAR(field_variable) | `ethernet_server_accept($ethServer)` | `ethServer.accept()` |
| `ethernet_udp_create` | Statement | VAR(field_input), PORT(input_value) | `ethernet_udp_create("ethUdp", math_number(0))` | `EthernetUDP ethUdp; ↵ ethUdp.begin(1);` |
| `ethernet_udp_send` | Statement | VAR(field_variable), DATA(input_value), HOST(input_value), PORT(input_value) | `ethernet_udp_send($ethUdp, math_number(0), text("value"), math_number(0))` | `ethUdp.beginPacket("value", 1); ↵ ethUdp.print(1); ↵ ethUdp.endPacket();` |
| `ethernet_udp_data` | Value | VAR(field_variable), DATA(dropdown) | `ethernet_udp_data($ethUdp, parsePacket)` | `ethUdp.parsePacket()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | dhcp, static | ethernet_init |
| INFO | localIP, gatewayIP, subnetMask, dnsServerIP, link, hardware | ethernet_network_info |
| OP | print, println | ethernet_client_write |
| DATA | available, read, line, connected | ethernet_client_data |
| DATA | parsePacket, available, read, remoteIP, remotePort | ethernet_udp_data |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ethernet_init(text("value"), dhcp, text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ethernet_network_info(localIP))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ethernet_client_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
