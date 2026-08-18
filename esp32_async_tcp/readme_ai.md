# ESP32 Asynchronous TCP Library

ESP32 asynchronous TCP client and server library, supporting non-blocking TCP connections, data sending and receiving, and event callback processing

## Library Info
- **Name**: @aily-project/lib-esp32-async-tcp
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `async_tcp_client_create` | Statement | VAR(field_input) | `async_tcp_client_create("tcpClient")` | `AsyncClient tcpClient;` |
| `async_tcp_client_connect` | Statement | VAR(field_variable), HOST(input_value), PORT(input_value) | `async_tcp_client_connect($tcpClient, text("value"), math_number(0))` | `tcpClient.connect("value", 1);` |
| `async_tcp_client_close` | Statement | VAR(field_variable) | `async_tcp_client_close($tcpClient)` | `tcpClient.close();` |
| `async_tcp_client_write` | Statement | VAR(field_variable), DATA(input_value) | `async_tcp_client_write($tcpClient, text("value"))` | `tcpClient.write("value");` |
| `async_tcp_client_connected` | Value | VAR(field_variable) | `async_tcp_client_connected($tcpClient)` | `tcpClient.connected()` |
| `async_tcp_client_connecting` | Value | VAR(field_variable) | `async_tcp_client_connecting($tcpClient)` | `tcpClient.connecting()` |
| `async_tcp_client_space` | Value | VAR(field_variable) | `async_tcp_client_space($tcpClient)` | `tcpClient.space()` |
| `async_tcp_client_can_send` | Value | VAR(field_variable) | `async_tcp_client_can_send($tcpClient)` | `tcpClient.canSend()` |
| `async_tcp_client_set_no_delay` | Statement | VAR(field_variable), NODELAY(field_checkbox) | `async_tcp_client_set_no_delay($tcpClient, TRUE)` | `tcpClient.setNoDelay(true);` |
| `async_tcp_client_set_rx_timeout` | Statement | VAR(field_variable), TIMEOUT(input_value) | `async_tcp_client_set_rx_timeout($tcpClient, math_number(1000))` | `tcpClient.setRxTimeout(1);` |
| `async_tcp_client_remote_ip` | Value | VAR(field_variable) | `async_tcp_client_remote_ip($tcpClient)` | `tcpClient.remoteIP().toString()` |
| `async_tcp_client_remote_port` | Value | VAR(field_variable) | `async_tcp_client_remote_port($tcpClient)` | `tcpClient.remotePort()` |
| `async_tcp_client_local_port` | Value | VAR(field_variable) | `async_tcp_client_local_port($tcpClient)` | `tcpClient.localPort()` |
| `async_tcp_client_on_connect` | Hat | VAR(field_variable), HANDLER(input_statement) | `async_tcp_client_on_connect($tcpClient)` | `void asyncTcp_onConnect_tcpClient(void *arg, AsyncClient *client) { ↵ } ↵ tcpClient.onConnect(asyncTcp_onConnect_tcpClient, NULL);` |
| `async_tcp_client_on_disconnect` | Hat | VAR(field_variable), HANDLER(input_statement) | `async_tcp_client_on_disconnect($tcpClient)` | `void asyncTcp_onDisconnect_tcpClient(void *arg, AsyncClient *client) { ↵ } ↵ tcpClient.onDisconnect(asyncTcp_onDisconnect_tcpClient, NULL);` |
| `async_tcp_client_on_data` | Hat | VAR(field_variable), DATA_VAR(field_input), LEN_VAR(field_input), HANDLER(input_statement) | `async_tcp_client_on_data($tcpClient, "receivedData", "dataLength")` | `String receivedData; ↵ size_t dataLength = 0; ↵ void asyncTcp_onData_tcpClient(void *arg, AsyncClient *client, void *data, size_t len) { ↵ receivedData = String((char*)data).substring(0, len); ↵ dataLength = len; ↵ } ↵ tcpClient.onData(asyncTcp_onData_tcpClient, NULL);` |
| `async_tcp_client_on_error` | Hat | VAR(field_variable), ERROR_VAR(field_input), HANDLER(input_statement) | `async_tcp_client_on_error($tcpClient, "errorCode")` | `int8_t errorCode = 0; ↵ void asyncTcp_onError_tcpClient(void *arg, AsyncClient *client, int8_t error) { ↵ errorCode = error; ↵ } ↵ tcpClient.onError(asyncTcp_onError_tcpClient, NULL);` |
| `async_tcp_client_on_ack` | Hat | VAR(field_variable), LEN_VAR(field_input), TIME_VAR(field_input), HANDLER(input_statement) | `async_tcp_client_on_ack($tcpClient, "ackLength", "ackTime")` | `size_t ackLength = 0; ↵ uint32_t ackTime = 0; ↵ void asyncTcp_onAck_tcpClient(void *arg, AsyncClient *client, size_t len, uint32_t time) { ↵ ackLength = len; ↵ ackTime = time; ↵ } ↵ tcpClient.onAck(asyncTcp_onAck_tcpClient, NULL);` |
| `async_tcp_client_on_timeout` | Hat | VAR(field_variable), TIME_VAR(field_input), HANDLER(input_statement) | `async_tcp_client_on_timeout($tcpClient, "timeoutMs")` | `uint32_t timeoutMs = 0; ↵ void asyncTcp_onTimeout_tcpClient(void *arg, AsyncClient *client, uint32_t time) { ↵ timeoutMs = time; ↵ } ↵ tcpClient.onTimeout(asyncTcp_onTimeout_tcpClient, NULL);` |
| `async_tcp_client_error_to_string` | Value | ERROR(input_value) | `async_tcp_client_error_to_string(math_number(0))` | `AsyncClient::errorToString(1)` |
| `async_tcp_server_create` | Statement | VAR(field_input), PORT(input_value) | `async_tcp_server_create("tcpServer", math_number(0))` | `AsyncServer tcpServer(1);` |
| `async_tcp_server_begin` | Statement | VAR(field_variable) | `async_tcp_server_begin($tcpServer)` | `tcpServer.begin();` |
| `async_tcp_server_end` | Statement | VAR(field_variable) | `async_tcp_server_end($tcpServer)` | `tcpServer.end();` |
| `async_tcp_server_set_no_delay` | Statement | VAR(field_variable), NODELAY(field_checkbox) | `async_tcp_server_set_no_delay($tcpServer, TRUE)` | `tcpServer.setNoDelay(true);` |
| `async_tcp_server_on_client` | Hat | VAR(field_variable), CLIENT_VAR(field_input), HANDLER(input_statement) | `async_tcp_server_on_client($tcpServer, "newClient")` | `AsyncClient* newClient = nullptr; ↵ void asyncTcp_onClient_tcpServer(void *arg, AsyncClient *client) { ↵ newClient = client; ↵ } ↵ tcpServer.onClient(asyncTcp_onClient_tcpServer, NULL);` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    async_tcp_client_create("tcpClient")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, async_tcp_client_connected($tcpClient))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `async_tcp_client_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
