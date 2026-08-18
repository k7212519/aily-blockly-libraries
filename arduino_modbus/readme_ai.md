# Arduino Modbus Communication Library

Arduino Modbus RTU/TCP client and server communication library, supports reading and writing coils, registers and other functions

## Library Info
- **Name**: @aily-project/lib-arduino-modbus
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `modbus_rtu_client_begin` | Statement | BAUDRATE(dropdown) | `modbus_rtu_client_begin("9600")` | `if (!ModbusRTUClient.begin(9600)) { ↵ Serial.println("Failed to start Modbus RTU Client!"); ↵ while (1); ↵ }` |
| `modbus_rtu_server_begin` | Statement | SLAVE_ID(field_number), BAUDRATE(dropdown) | `modbus_rtu_server_begin(1, "9600")` | `if (!ModbusRTUServer.begin(1, 9600)) { ↵ Serial.println("Failed to start Modbus RTU Server!"); ↵ while (1); ↵ }` |
| `modbus_tcp_client_begin` | Statement | IP(input_value), PORT(field_number) | `modbus_tcp_client_begin(text("value"), 502)` | `IPAddress serverIP; ↵ serverIP.fromString("value"); ↵ if (!modbusTCPClient.begin(serverIP, 502)) { ↵ Serial.println("Failed to start Modbus TCP Client!"); ↵ while (1); ↵ }` |
| `modbus_tcp_server_begin` | Statement | SLAVE_ID(field_number) | `modbus_tcp_server_begin(255)` | `if (!modbusTCPServer.begin(255)) { ↵ Serial.println("Failed to start Modbus TCP Server!"); ↵ while (1); ↵ }` |
| `modbus_coil_read` | Value | SLAVE_ID(field_number), ADDRESS(field_number) | `modbus_coil_read(1, 0)` | `ModbusRTUClient.coilRead(1, 0)` |
| `modbus_coil_write` | Statement | SLAVE_ID(field_number), ADDRESS(field_number), VALUE(input_value) | `modbus_coil_write(1, 0, math_number(0))` | `ModbusRTUClient.coilWrite(1, 0, 1);` |
| `modbus_discrete_input_read` | Value | SLAVE_ID(field_number), ADDRESS(field_number) | `modbus_discrete_input_read(1, 0)` | `ModbusRTUClient.discreteInputRead(1, 0)` |
| `modbus_holding_register_read` | Value | SLAVE_ID(field_number), ADDRESS(field_number) | `modbus_holding_register_read(1, 0)` | `ModbusRTUClient.holdingRegisterRead(1, 0)` |
| `modbus_holding_register_write` | Statement | SLAVE_ID(field_number), ADDRESS(field_number), VALUE(input_value) | `modbus_holding_register_write(1, 0, math_number(0))` | `ModbusRTUClient.holdingRegisterWrite(1, 0, 1);` |
| `modbus_input_register_read` | Value | SLAVE_ID(field_number), ADDRESS(field_number) | `modbus_input_register_read(1, 0)` | `ModbusRTUClient.inputRegisterRead(1, 0)` |
| `modbus_server_configure_coils` | Statement | START_ADDRESS(field_number), COUNT(field_number) | `modbus_server_configure_coils(0, 1)` | `ModbusRTUServer.configureCoils(0, 1);` |
| `modbus_server_configure_discrete_inputs` | Statement | START_ADDRESS(field_number), COUNT(field_number) | `modbus_server_configure_discrete_inputs(0, 1)` | `ModbusRTUServer.configureDiscreteInputs(0, 1);` |
| `modbus_server_configure_holding_registers` | Statement | START_ADDRESS(field_number), COUNT(field_number) | `modbus_server_configure_holding_registers(0, 1)` | `ModbusRTUServer.configureHoldingRegisters(0, 1);` |
| `modbus_server_configure_input_registers` | Statement | START_ADDRESS(field_number), COUNT(field_number) | `modbus_server_configure_input_registers(0, 1)` | `ModbusRTUServer.configureInputRegisters(0, 1);` |
| `modbus_server_poll` | Value | (none) | `modbus_server_poll()` | `ModbusRTUServer.poll()` |
| `modbus_server_coil_read` | Value | ADDRESS(field_number) | `modbus_server_coil_read(0)` | `ModbusRTUServer.coilRead(0)` |
| `modbus_server_coil_write` | Statement | ADDRESS(field_number), VALUE(input_value) | `modbus_server_coil_write(0, math_number(0))` | `ModbusRTUServer.coilWrite(0, 1);` |
| `modbus_server_discrete_input_write` | Statement | ADDRESS(field_number), VALUE(input_value) | `modbus_server_discrete_input_write(0, math_number(0))` | `ModbusRTUServer.discreteInputWrite(0, 1);` |
| `modbus_server_holding_register_read` | Value | ADDRESS(field_number) | `modbus_server_holding_register_read(0)` | `ModbusRTUServer.holdingRegisterRead(0)` |
| `modbus_server_holding_register_write` | Statement | ADDRESS(field_number), VALUE(input_value) | `modbus_server_holding_register_write(0, math_number(0))` | `ModbusRTUServer.holdingRegisterWrite(0, 1);` |
| `modbus_server_input_register_write` | Statement | ADDRESS(field_number), VALUE(input_value) | `modbus_server_input_register_write(0, math_number(0))` | `ModbusRTUServer.inputRegisterWrite(0, 1);` |
| `modbus_last_error` | Value | (none) | `modbus_last_error()` | `ModbusRTUClient.lastError()` |
| `modbus_quick_coil_control` | Statement | SLAVE_ID(field_number), ADDRESS(field_number), VALUE(dropdown) | `modbus_quick_coil_control(1, 0, "1")` | `ModbusRTUClient.coilWrite(1, 0, 1);` |
| `modbus_quick_register_read` | Value | SLAVE_ID(field_number), ADDRESS(field_number) | `modbus_quick_register_read(1, 0)` | `ModbusRTUClient.holdingRegisterRead(1, 0)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BAUDRATE | 9600, 19200, 38400, 57600, 115200 | modbus_rtu_client_begin, modbus_rtu_server_begin |
| VALUE | 1, 0 | modbus_quick_coil_control |

## ABS Examples

### Basic Usage
```
arduino_setup()
    modbus_rtu_client_begin("9600")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, modbus_coil_read(1, 0))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
