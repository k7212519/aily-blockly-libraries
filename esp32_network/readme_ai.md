# ESP32 Network Communication Library

ESP32 network communication library provides TCP client, TCP secure client (SSL/TLS), TCP server and UDP communication functions

## Library Info
- **Name**: @aily-project/lib-esp32-network
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_network_client_create` | Statement | VAR(field_input) | `esp32_network_client_create("client")` | `NetworkClient client;` |
| `esp32_network_client_connect_host` | Statement | VAR(field_variable), HOST(input_value), PORT(input_value) | `esp32_network_client_connect_host($client, text("value"), math_number(0))` | `client.connect("value", 1);` |
| `esp32_networkclientsecure_create` | Statement | VAR(field_input) | `esp32_networkclientsecure_create("client")` | `NetworkClientSecure client;` |
| `esp32_networkclientsecure_set_insecure` | Statement | VAR(field_variable) | `esp32_networkclientsecure_set_insecure($client)` | `client.setInsecure();` |
| `esp32_networkclientsecure_set_ca_cert` | Statement | VAR(field_variable), CA_CERT(input_value) | `esp32_networkclientsecure_set_ca_cert($client, text("value"))` | `client.setCACert("value".c_str());` |
| `esp32_networkclientsecure_set_certificate` | Statement | VAR(field_variable), CERT(input_value) | `esp32_networkclientsecure_set_certificate($client, text("value"))` | `client.setCertificate("value".c_str());` |
| `esp32_networkclientsecure_set_private_key` | Statement | VAR(field_variable), PRIVATE_KEY(input_value) | `esp32_networkclientsecure_set_private_key($client, text("value"))` | `client.setPrivateKey("value".c_str());` |
| `esp32_networkclientsecure_set_psk` | Statement | VAR(field_variable), PSK_IDENT(input_value), PSK_KEY(input_value) | `esp32_networkclientsecure_set_psk($client, text("value"), text("value"))` | `client.setPreSharedKey("value".c_str(), "value".c_str());` |
| `esp32_networkclientsecure_set_plain_start` | Statement | VAR(field_variable) | `esp32_networkclientsecure_set_plain_start($client)` | `client.setPlainStart();` |
| `esp32_networkclientsecure_start_tls` | Value | VAR(field_variable) | `esp32_networkclientsecure_start_tls($client)` | `client.startTLS()` |
| `esp32_networkclientsecure_set_handshake_timeout` | Statement | VAR(field_variable), TIMEOUT(input_value) | `esp32_networkclientsecure_set_handshake_timeout($client, math_number(1000))` | `client.setHandshakeTimeout(1);` |
| `esp32_networkclientsecure_verify_fingerprint` | Value | VAR(field_variable), FINGERPRINT(input_value), DOMAIN(input_value) | `esp32_networkclientsecure_verify_fingerprint($client, text("value"), text("value"))` | `client.verify("value".c_str(), "value".c_str())` |
| `esp32_networkclientsecure_get_peer_fingerprint` | Value | VAR(field_variable) | `esp32_networkclientsecure_get_peer_fingerprint($client)` | `getPeerFingerprint_client()` |
| `esp32_networkclientsecure_last_error` | Value | VAR(field_variable) | `esp32_networkclientsecure_last_error($client)` | `getLastError_client()` |
| `esp32_network_client_print` | Statement | VAR(field_variable), DATA(input_value) | `esp32_network_client_print($client, text("value"))` | `client.print("value");` |
| `esp32_network_client_println` | Statement | VAR(field_variable), DATA(input_value) | `esp32_network_client_println($client, text("value"))` | `client.println("value");` |
| `esp32_network_client_available` | Value | VAR(field_variable) | `esp32_network_client_available($client)` | `client.available()` |
| `esp32_network_client_read` | Value | VAR(field_variable), TYPE(dropdown) | `esp32_network_client_read($client, BYTE)` | `(char)client.read()` |
| `esp32_network_client_connected` | Value | VAR(field_variable) | `esp32_network_client_connected($client)` | `client.connected()` |
| `esp32_network_client_stop` | Statement | VAR(field_variable) | `esp32_network_client_stop($client)` | `client.stop();` |
| `esp32_network_server_create` | Statement | VAR(field_input), PORT(input_value), MAX_CLIENTS(input_value) | `esp32_network_server_create("server", math_number(0), math_number(0))` | `NetworkServer server(1, 1);` |
| `esp32_network_server_begin` | Statement | VAR(field_variable) | `esp32_network_server_begin($server)` | `server.begin();` |
| `esp32_network_server_accept` | Statement | VAR(field_variable), CLIENT_VAR(field_input) | `esp32_network_server_accept($server, "client")` | `NetworkClient client = server.accept();` |
| `esp32_network_server_stop` | Statement | VAR(field_variable) | `esp32_network_server_stop($server)` | `server.stop();` |
| `esp32_network_udp_create` | Statement | VAR(field_input) | `esp32_network_udp_create("udp")` | `NetworkUDP udp;` |
| `esp32_network_udp_begin` | Statement | VAR(field_variable), PORT(input_value) | `esp32_network_udp_begin($udp, math_number(0))` | `udp.begin(1);` |
| `esp32_network_udp_begin_packet` | Statement | VAR(field_variable), IP(input_value), PORT(input_value) | `esp32_network_udp_begin_packet($udp, text("value"), math_number(0))` | `udp.beginPacket("value", 1);` |
| `esp32_network_udp_write` | Statement | VAR(field_variable), DATA(input_value) | `esp32_network_udp_write($udp, text("value"))` | `udp.print("value");` |
| `esp32_network_udp_end_packet` | Statement | VAR(field_variable) | `esp32_network_udp_end_packet($udp)` | `udp.endPacket();` |
| `esp32_network_udp_parse_packet` | Value | VAR(field_variable) | `esp32_network_udp_parse_packet($udp)` | `udp.parsePacket()` |
| `esp32_network_udp_available` | Value | VAR(field_variable) | `esp32_network_udp_available($udp)` | `udp.available()` |
| `esp32_network_udp_read` | Value | VAR(field_variable) | `esp32_network_udp_read($udp)` | `udp.readString()` |
| `esp32_network_udp_remote_ip` | Value | VAR(field_variable) | `esp32_network_udp_remote_ip($udp)` | `udp.remoteIP().toString()` |
| `esp32_network_udp_remote_port` | Value | VAR(field_variable) | `esp32_network_udp_remote_port($udp)` | `udp.remotePort()` |
| `esp32_network_udp_stop` | Statement | VAR(field_variable) | `esp32_network_udp_stop($udp)` | `udp.stop();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | BYTE, STRING, LINE | esp32_network_client_read |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_network_client_create("client")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_networkclientsecure_start_tls($client))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_network_client_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
