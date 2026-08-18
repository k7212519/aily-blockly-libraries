# ESP32 eModbus communication

ESP32 Modbus RTU/TCP client and server communication library, supporting asynchronous non-blocking communication, multiple function codes, and callback processing

## Library Info
- **Name**: @aily-project/lib-esp32-emodbus
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `emodbus_rtu_client_create` | Statement | VAR(field_input), RTS_PIN(dropdown) | `emodbus_rtu_client_create("mbClient", RTS_PIN)` | `ModbusClientRTU mbClient(RTS_PIN);` |
| `emodbus_rtu_client_begin` | Statement | VAR(field_variable), SERIAL(dropdown), BAUDRATE(dropdown), RX_PIN(dropdown), TX_PIN(dropdown) | `emodbus_rtu_client_begin($mbClient, Serial1, "9600", RX_PIN, TX_PIN)` | `RTUutils::prepareHardwareSerial(Serial1); ↵ Serial1.begin(9600, SERIAL_8N1, RX_PIN, TX_PIN); ↵ mbClient.begin(Serial1);` |
| `emodbus_tcp_client_create` | Statement | VAR(field_input) | `emodbus_tcp_client_create("mbTcpClient")` | `WiFiClient _wifiClient_mbTcpClient; ↵ ModbusClientTCP mbTcpClient(_wifiClient_mbTcpClient);` |
| `emodbus_tcp_client_begin` | Statement | VAR(field_variable) | `emodbus_tcp_client_begin($mbTcpClient)` | `mbTcpClient.begin();` |
| `emodbus_tcp_client_set_target` | Statement | VAR(field_variable), IP(input_value), PORT(field_number) | `emodbus_tcp_client_set_target($mbTcpClient, text("value"), 502)` | `mbTcpClient.setTarget(_parseIP("value"), 502);` |
| `emodbus_client_set_timeout` | Statement | VAR(field_variable), TIMEOUT(field_number) | `emodbus_client_set_timeout($mbClient, 2000)` | `mbClient.setTimeout(2000);` |
| `emodbus_client_on_data` | Hat | VAR(field_variable), HANDLER(input_statement) | `emodbus_client_on_data($mbClient)` | `ModbusMessage _emodbus_response_mbClient; ↵ uint32_t _emodbus_token_mbClient = 0; ↵ void _emodbus_onData_mbClient(ModbusMessage response, uint32_t token) { ↵ _emodbus_response_mbClient = response; ↵ _emodbus_token_mbClient = token; ↵ } ↵ mbClient.onDataHandler(&_emodbus_onData_mbClient);` |
| `emodbus_client_on_error` | Hat | VAR(field_variable), HANDLER(input_statement) | `emodbus_client_on_error($mbClient)` | `Modbus::Error _emodbus_error_mbClient = Modbus::SUCCESS; ↵ void _emodbus_onError_mbClient(Modbus::Error error, uint32_t token) { ↵ _emodbus_error_mbClient = error; ↵ ModbusError me(error); ↵ } ↵ mbClient.onErrorHandler(&_emodbus_onError_mbClient);` |
| `emodbus_read_holding_registers` | Statement | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value), COUNT(input_value) | `emodbus_read_holding_registers($mbClient, 1, math_number(0), math_number(0))` | `mbClient.addRequest((uint32_t)millis(), 1, READ_HOLD_REGISTER, 1, 1);` |
| `emodbus_read_input_registers` | Statement | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value), COUNT(input_value) | `emodbus_read_input_registers($mbClient, 1, math_number(0), math_number(0))` | `mbClient.addRequest((uint32_t)millis(), 1, READ_INPUT_REGISTER, 1, 1);` |
| `emodbus_read_coils` | Statement | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value), COUNT(input_value) | `emodbus_read_coils($mbClient, 1, math_number(0), math_number(0))` | `mbClient.addRequest((uint32_t)millis(), 1, READ_COIL, 1, 1);` |
| `emodbus_read_discrete_inputs` | Statement | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value), COUNT(input_value) | `emodbus_read_discrete_inputs($mbClient, 1, math_number(0), math_number(0))` | `mbClient.addRequest((uint32_t)millis(), 1, READ_DISCR_INPUT, 1, 1);` |
| `emodbus_write_single_register` | Statement | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value), VALUE(input_value) | `emodbus_write_single_register($mbClient, 1, math_number(0), math_number(0))` | `mbClient.addRequest((uint32_t)millis(), 1, WRITE_HOLD_REGISTER, 1, (uint16_t)1);` |
| `emodbus_write_single_coil` | Statement | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value), VALUE(input_value) | `emodbus_write_single_coil($mbClient, 1, math_number(0), logic_boolean(TRUE))` | `mbClient.addRequest((uint32_t)millis(), 1, WRITE_COIL, 1, (uint16_t)((true) ? 0xFF00 : 0x0000));` |
| `emodbus_write_multiple_registers` | Statement | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value), VALUES(input_value) | `emodbus_write_multiple_registers($mbClient, 1, math_number(0), math_number(0))` | `_emodbus_writeMultiRegs(mbClient, 1, 1, 1);` |
| `emodbus_sync_read_holding_registers` | Value | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value) | `emodbus_sync_read_holding_registers($mbClient, 1, math_number(0))` | `_emodbus_syncReadHoldReg(mbClient, 1, 1)` |
| `emodbus_sync_read_input_register` | Value | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value) | `emodbus_sync_read_input_register($mbClient, 1, math_number(0))` | `_emodbus_syncReadInputReg(mbClient, 1, 1)` |
| `emodbus_sync_read_coil` | Value | VAR(field_variable), SERVER_ID(field_number), ADDRESS(input_value) | `emodbus_sync_read_coil($mbClient, 1, math_number(0))` | `_emodbus_syncReadCoil(mbClient, 1, 1)` |
| `emodbus_response_get_uint16` | Value | INDEX(input_value) | `emodbus_response_get_uint16(math_number(0))` | `_emodbus_getResponseUint16(_emodbus_response_mbClient, 1)` |
| `emodbus_response_get_float` | Value | INDEX(input_value) | `emodbus_response_get_float(math_number(0))` | `_emodbus_getResponseFloat(_emodbus_response_mbClient, 1)` |
| `emodbus_response_server_id` | Value | (none) | `emodbus_response_server_id()` | `_emodbus_response_mbClient.getServerID()` |
| `emodbus_response_function_code` | Value | (none) | `emodbus_response_function_code()` | `_emodbus_response_mbClient.getFunctionCode()` |
| `emodbus_response_length` | Value | (none) | `emodbus_response_length()` | `_emodbus_response_mbClient.size()` |
| `emodbus_error_code` | Value | (none) | `emodbus_error_code()` | `(int)_emodbus_error_mbClient` |
| `emodbus_error_message` | Value | (none) | `emodbus_error_message()` | `(const char *)ModbusError(_emodbus_error_mbClient)` |
| `emodbus_rtu_server_create` | Statement | VAR(field_input), TIMEOUT(field_number), RTS_PIN(dropdown) | `emodbus_rtu_server_create("mbServer", 2000, RTS_PIN)` | `ModbusServerRTU mbServer(2000, RTS_PIN);` |
| `emodbus_rtu_server_begin` | Statement | VAR(field_variable), SERIAL(dropdown), BAUDRATE(dropdown), RX_PIN(dropdown), TX_PIN(dropdown) | `emodbus_rtu_server_begin($mbServer, Serial1, "9600", RX_PIN, TX_PIN)` | `RTUutils::prepareHardwareSerial(Serial1); ↵ Serial1.begin(9600, SERIAL_8N1, RX_PIN, TX_PIN); ↵ mbServer.begin(Serial1);` |
| `emodbus_tcp_server_create` | Statement | VAR(field_input), PORT(field_number), MAX_CLIENTS(field_number) | `emodbus_tcp_server_create("mbTcpServer", 502, 4)` | `ModbusServerWiFi mbTcpServer;` |
| `emodbus_tcp_server_begin` | Statement | VAR(field_variable) | `emodbus_tcp_server_begin($mbTcpServer)` | `mbTcpServer.start(502, 4, 20000);` |
| `emodbus_server_register_fc03` | Hat | VAR(field_variable), SERVER_ID(field_number), ADDRESS_VAR(field_variable), COUNT_VAR(field_variable), HANDLER(input_statement) | `emodbus_server_register_fc03($mbServer, 1, $reqAddress, $reqCount)` | `ModbusMessage _emodbus_server_response; ↵ ModbusMessage _emodbus_fc03_mbServer(ModbusMessage request) { ↵ uint16_t reqAddress = 0; ↵ uint16_t reqCount = 0; ↵ request.get(2, reqAddress); ↵ request.get(4, reqCount); ↵ _emodbus_server_response = ModbusMessage(); ↵ _emodbus_server_response.add(request.getServerID(), request.getFunctionCode(), (uint8_t)(reqCount * 2)); ↵ return _emodbus_server_response; ↵ } ↵ mbServer.registerWorker(1, READ_HOLD_REGISTER, &_emodbus_fc03_mbServer);` |
| `emodbus_server_register_fc06` | Hat | VAR(field_variable), SERVER_ID(field_number), ADDRESS_VAR(field_variable), VALUE_VAR(field_variable), HANDLER(input_statement) | `emodbus_server_register_fc06($mbServer, 1, $reqAddress, $reqValue)` | `ModbusMessage _emodbus_fc06_mbServer(ModbusMessage request) { ↵ uint16_t reqAddress = 0; ↵ uint16_t reqValue = 0; ↵ request.get(2, reqAddress); ↵ request.get(4, reqValue); ↵ return ECHO_RESPONSE; ↵ } ↵ mbServer.registerWorker(1, WRITE_HOLD_REGISTER, &_emodbus_fc06_mbServer);` |
| `emodbus_server_add_response_data` | Statement | VALUE(input_value) | `emodbus_server_add_response_data(math_number(0))` | `_emodbus_server_response.add((uint16_t)1);` |
| `emodbus_server_set_error` | Statement | ERROR_CODE(dropdown) | `emodbus_server_set_error(ILLEGAL_FUNCTION)` | `_emodbus_server_response.setError(request.getServerID(), request.getFunctionCode(), ILLEGAL_FUNCTION);` |
| `emodbus_client_pending_requests` | Value | VAR(field_variable) | `emodbus_client_pending_requests($mbClient)` | `mbClient.pendingRequests()` |
| `emodbus_client_clear_queue` | Statement | VAR(field_variable) | `emodbus_client_clear_queue($mbClient)` | `mbClient.clearQueue();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SERIAL | Serial1, Serial2 | emodbus_rtu_client_begin, emodbus_rtu_server_begin |
| BAUDRATE | 9600, 19200, 38400, 57600, 115200 | emodbus_rtu_client_begin, emodbus_rtu_server_begin |
| ERROR_CODE | ILLEGAL_FUNCTION, ILLEGAL_DATA_ADDRESS, ILLEGAL_DATA_VALUE, SERVER_DEVICE_FAILURE | emodbus_server_set_error |

## ABS Examples

### Basic Usage
```
arduino_setup()
    emodbus_rtu_client_create("mbClient", RTS_PIN)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, emodbus_sync_read_holding_registers($mbClient, 1, math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `emodbus_rtu_client_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
