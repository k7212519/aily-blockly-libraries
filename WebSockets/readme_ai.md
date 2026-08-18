# WebSockets

WebSocket client and server library, based on RFC6455 standard, supports multiple hardware platforms such as ESP32/ESP8266

## Library Info
- **Name**: @aily-project/lib-websockets
- **Version**: 2.7.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `websocket_client_create` | Statement | VAR(field_input) | `websocket_client_create("wsClient")` | `WebSocketsClient wsClient;` |
| `websocket_client_begin` | Statement | VAR(field_variable), HOST(input_value), PORT(input_value), URL(input_value) | `websocket_client_begin($wsClient, text("value"), math_number(0), text("value"))` | `wsClient.begin("value", 1, "value");` |
| `websocket_client_begin_ssl` | Statement | VAR(field_variable), HOST(input_value), PORT(input_value), URL(input_value) | `websocket_client_begin_ssl($wsClient, text("value"), math_number(0), text("value"))` | `wsClient.beginSSL("value", 1, "value");` |
| `websocket_client_on_event` | Hat | VAR(field_variable), HANDLER(input_statement) | `websocket_client_on_event($wsClient)` | `void websocket_client_event_wsClient(WStype_t type, uint8_t * payload, size_t length) { ↵ } ↵ wsClient.onEvent(websocket_client_event_wsClient);` |
| `websocket_client_send_text` | Statement | VAR(field_variable), TEXT(input_value) | `websocket_client_send_text($wsClient, text("value"))` | `wsClient.sendTXT("value");` |
| `websocket_client_send_binary` | Statement | VAR(field_variable), DATA(input_value) | `websocket_client_send_binary($wsClient, text("value"))` | `wsClient.sendBIN((uint8_t*)"value".c_str(), "value".length());` |
| `websocket_client_disconnect` | Statement | VAR(field_variable) | `websocket_client_disconnect($wsClient)` | `wsClient.disconnect();` |
| `websocket_client_is_connected` | Value | VAR(field_variable) | `websocket_client_is_connected($wsClient)` | `wsClient.isConnected()` |
| `websocket_client_set_reconnect` | Statement | VAR(field_variable), INTERVAL(input_value) | `websocket_client_set_reconnect($wsClient, math_number(1000))` | `wsClient.setReconnectInterval(1);` |
| `websocket_client_enable_heartbeat` | Statement | VAR(field_variable), PING_INTERVAL(input_value), PONG_TIMEOUT(input_value), DISCONNECT_COUNT(input_value) | `websocket_client_enable_heartbeat($wsClient, math_number(2), math_number(1000), math_number(0))` | `wsClient.enableHeartbeat(1, 1, 1);` |
| `websocket_server_create` | Statement | VAR(field_input), PORT(input_value) | `websocket_server_create("wsServer", math_number(0))` | `WebSocketsServer wsServer(1);` |
| `websocket_server_begin` | Statement | VAR(field_variable) | `websocket_server_begin($wsServer)` | `wsServer.begin();` |
| `websocket_server_on_event` | Hat | VAR(field_variable), HANDLER(input_statement) | `websocket_server_on_event($wsServer)` | `void websocket_server_event_wsServer(uint8_t num, WStype_t type, uint8_t * payload, size_t length) { ↵ } ↵ wsServer.onEvent(websocket_server_event_wsServer);` |
| `websocket_server_send_text` | Statement | VAR(field_variable), CLIENT_NUM(input_value), TEXT(input_value) | `websocket_server_send_text($wsServer, math_number(0), text("value"))` | `wsServer.sendTXT(1, "value");` |
| `websocket_server_broadcast_text` | Statement | VAR(field_variable), TEXT(input_value) | `websocket_server_broadcast_text($wsServer, text("value"))` | `wsServer.broadcastTXT("value");` |
| `websocket_server_send_binary` | Statement | VAR(field_variable), CLIENT_NUM(input_value), DATA(input_value) | `websocket_server_send_binary($wsServer, math_number(0), text("value"))` | `wsServer.sendBIN(1, (uint8_t*)"value".c_str(), "value".length());` |
| `websocket_server_broadcast_binary` | Statement | VAR(field_variable), DATA(input_value) | `websocket_server_broadcast_binary($wsServer, text("value"))` | `wsServer.broadcastBIN((uint8_t*)"value".c_str(), "value".length());` |
| `websocket_server_disconnect` | Statement | VAR(field_variable), CLIENT_NUM(input_value) | `websocket_server_disconnect($wsServer, math_number(0))` | `wsServer.disconnect(1);` |
| `websocket_server_disconnect_all` | Statement | VAR(field_variable) | `websocket_server_disconnect_all($wsServer)` | `wsServer.disconnect();` |
| `websocket_server_connected_clients` | Value | VAR(field_variable) | `websocket_server_connected_clients($wsServer)` | `wsServer.connectedClients()` |
| `websocket_server_client_connected` | Value | VAR(field_variable), CLIENT_NUM(input_value) | `websocket_server_client_connected($wsServer, math_number(0))` | `wsServer.clientIsConnected(1)` |
| `websocket_event_type` | Value | TYPE(dropdown) | `websocket_event_type(WStype_DISCONNECTED)` | `WStype_DISCONNECTED` |
| `websocket_event_payload` | Value | PAYLOAD(dropdown) | `websocket_event_payload(TYPE)` | `type` |
| `websocket_event_payload_length` | Value | (none) | `websocket_event_payload_length()` | `length` |
| `websocket_event_client_num` | Value | (none) | `websocket_event_client_num()` | `num` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | WStype_DISCONNECTED, WStype_CONNECTED, WStype_TEXT, WStype_BIN, WStype_PING, WStype_PONG, WStype_ERROR | websocket_event_type |
| PAYLOAD | TYPE, PAYLOAD, PAYLOAD_CHAR | websocket_event_payload |

## ABS Examples

### Basic Usage
```
arduino_setup()
    websocket_client_create("wsClient")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, websocket_client_is_connected($wsClient))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `websocket_client_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
