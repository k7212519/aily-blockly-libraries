# nanoModbus communication library

Lightweight Modbus RTU/TCP communication library, supports client and server modes

## Library Info
- **Name**: @aily-project/lib-nano-modbus
- **Version**: 0.0.2

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `nmbs_client_create` | Statement | VAR(field_input), SERIAL(dropdown), BAUDRATE(dropdown) | `nmbs_client_create("modbusClient", SERIAL, BAUDRATE)` | `SERIAL.begin(BAUDRATE); ↵ { ↵ nmbs_platform_conf platform_conf; ↵ nmbs_platform_conf_create(&platform_conf); ↵ platform_conf.transport = NMBS_TRANSPORT_RTU; ↵ platform_conf.read = nmbs_read_SERIAL; ↵ platform_conf.write = nmbs_write_SERIAL; ↵ nmbs_client_create(&modbusClient, &platform_conf); ↵ } ↵ nmbs_set_read_timeout(&modbusClient, 1000); ↵ nmbs_set_byte_timeout(&modbusClient, 100);` |
| `nmbs_client_tcp_create` | Statement | VAR(field_input), SSID(input_value), PASS(input_value), IP(input_value), PORT(input_value) | `nmbs_client_tcp_create("modbusClient", text("value"), text("value"), text("value"), math_number(0))` | `WiFi.begin("value", "value"); ↵ while (WiFi.status() != WL_CONNECTED) { delay(500); } ↵ nmbs_wc_modbusClient.connect("value", 1); ↵ { ↵ nmbs_platform_conf platform_conf; ↵ nmbs_platform_conf_create(&platform_conf); ↵ platform_conf.transport = NMBS_TRANSPORT_TCP; ↵ platform_conf.read = nmbs_read_tcp; ↵ platform_conf.write = nmbs_write_tcp; ↵ platform_conf.arg = &nmbs_wc_modbusClient; ↵ nmbs_client_create(&modbusClient, &platform_conf); ↵ } ↵ nmbs_set_read_timeout(&modbusClient, 1000);` |
| `nmbs_set_dest_address` | Statement | VAR(field_variable), ADDRESS(input_value) | `nmbs_set_dest_address($modbusClient, math_number(0))` | `nmbs_set_destination_rtu_address(&modbusClient, 1);` |
| `nmbs_set_timeout` | Statement | VAR(field_variable), READ_TIMEOUT(input_value), BYTE_TIMEOUT(input_value) | `nmbs_set_timeout($modbusClient, math_number(1000), math_number(1000))` | `nmbs_set_read_timeout(&modbusClient, 1); ↵ nmbs_set_byte_timeout(&modbusClient, 1);` |
| `nmbs_read_holding_register` | Value | VAR(field_variable), ADDRESS(input_value) | `nmbs_read_holding_register($modbusClient, math_number(0))` | `nmbs_helper_read_holding(&modbusClient, 1)` |
| `nmbs_read_input_register` | Value | VAR(field_variable), ADDRESS(input_value) | `nmbs_read_input_register($modbusClient, math_number(0))` | `nmbs_helper_read_input(&modbusClient, 1)` |
| `nmbs_read_coil` | Value | VAR(field_variable), ADDRESS(input_value) | `nmbs_read_coil($modbusClient, math_number(0))` | `nmbs_helper_read_coil(&modbusClient, 1)` |
| `nmbs_read_discrete_input` | Value | VAR(field_variable), ADDRESS(input_value) | `nmbs_read_discrete_input($modbusClient, math_number(0))` | `nmbs_helper_read_discrete(&modbusClient, 1)` |
| `nmbs_write_single_coil` | Statement | VAR(field_variable), ADDRESS(input_value), VALUE(input_value) | `nmbs_write_single_coil($modbusClient, math_number(0), logic_boolean(TRUE))` | `nmbs_write_single_coil(&modbusClient, 1, true);` |
| `nmbs_write_single_register` | Statement | VAR(field_variable), ADDRESS(input_value), VALUE(input_value) | `nmbs_write_single_register($modbusClient, math_number(0), math_number(0))` | `nmbs_write_single_register(&modbusClient, 1, 1);` |
| `nmbs_server_create` | Statement | VAR(field_input), SERIAL(dropdown), BAUDRATE(dropdown), ADDRESS(field_number) | `nmbs_server_create("modbusServer", Serial, "9600", 1)` | `Serial.begin(9600); ↵ { ↵ nmbs_platform_conf platform_conf; ↵ nmbs_platform_conf_create(&platform_conf); ↵ platform_conf.transport = NMBS_TRANSPORT_RTU; ↵ platform_conf.read = nmbs_read_Serial; ↵ platform_conf.write = nmbs_write_Serial; ↵ nmbs_callbacks callbacks; ↵ nmbs_callbacks_create(&callbacks); ↵ callbacks.read_coils = nmbs_cb_read_coils; ↵ callbacks.write_single_coil = nmbs_cb_write_single_coil; ↵ callbacks.write_multiple_coils = nmbs_cb_write_multi_coils; ↵ callbacks.read_holding_registers = nmbs_cb_read_holding_regs; ↵ callbacks.write_single_register = nmbs_cb_write_single_reg; ↵ callbacks.write_multiple_registers = nmbs_cb_write_multi_regs; ↵ callbacks.read_discrete_inputs = nmbs_cb_read_discrete_inputs; ↵ callbacks.read_input_registers = nmbs_cb_read_input_regs; ↵ nmbs_server_create(&modbusServer, 1, &platform_conf, &callbacks); ↵ } ↵ nmbs_set_read_timeout(&modbusServer, 1000); ↵ nmbs_set_byte_timeout(&modbusServer, 100);` |
| `nmbs_server_tcp_create` | Statement | VAR(field_input), SSID(input_value), PASS(input_value), PORT(field_number) | `nmbs_server_tcp_create("modbusServer", text("value"), text("value"), 502)` | `WiFi.begin("value", "value"); ↵ while (WiFi.status() != WL_CONNECTED) { delay(500); } ↵ nmbs_ws_modbusServer.begin(); ↵ { ↵ nmbs_platform_conf platform_conf; ↵ nmbs_platform_conf_create(&platform_conf); ↵ platform_conf.transport = NMBS_TRANSPORT_TCP; ↵ platform_conf.read = nmbs_read_tcp; ↵ platform_conf.write = nmbs_write_tcp; ↵ platform_conf.arg = &nmbs_wcc_modbusServer; ↵ nmbs_callbacks callbacks; ↵ nmbs_callbacks_create(&callbacks); ↵ callbacks.read_coils = nmbs_cb_read_coils; ↵ callbacks.write_single_coil = nmbs_cb_write_single_coil; ↵ callbacks.write_multiple_coils = nmbs_cb_write_multi_coils; ↵ callbacks.read_holding_registers = nmbs_cb_read_holding_regs; ↵ callbacks.write_single_register = nmbs_cb_write_single_reg; ↵ callbacks.write_multiple_registers = nmbs_cb_write_multi_regs; ↵ callbacks.read_discrete_inputs = nmbs_cb_read_discrete_inputs; ↵ callbacks.read_input_registers = nmbs_cb_read_input_regs; ↵ nmbs_server_create(&modbusServer, 0, &platform_conf, &callbacks); ↵ } ↵ nmbs_set_read_timeout(&modbusServer, 1000);` |
| `nmbs_server_poll` | Statement | VAR(field_variable) | `nmbs_server_poll($modbusServer)` | `nmbs_server_poll(&modbusServer);` |
| `nmbs_server_tcp_poll` | Statement | VAR(field_variable) | `nmbs_server_tcp_poll($modbusServer)` | `nmbs_tcp_server_poll(&modbusServer, &nmbs_ws_modbusServer, &nmbs_wcc_modbusServer);` |
| `nmbs_server_set_coil` | Statement | ADDRESS(input_value), VALUE(input_value) | `nmbs_server_set_coil(math_number(0), logic_boolean(TRUE))` | `nmbs_bitfield_write(nmbs_srv_coils, 1, true);` |
| `nmbs_server_get_coil` | Value | ADDRESS(input_value) | `nmbs_server_get_coil(math_number(0))` | `nmbs_bitfield_read(nmbs_srv_coils, 1)` |
| `nmbs_server_set_register` | Statement | ADDRESS(input_value), VALUE(input_value) | `nmbs_server_set_register(math_number(0), math_number(0))` | `nmbs_srv_holding_regs[1] = 1;` |
| `nmbs_server_get_register` | Value | ADDRESS(input_value) | `nmbs_server_get_register(math_number(0))` | `nmbs_srv_holding_regs[1]` |
| `nmbs_server_set_input_register` | Statement | ADDRESS(input_value), VALUE(input_value) | `nmbs_server_set_input_register(math_number(0), math_number(0))` | `nmbs_srv_input_regs[1] = 1;` |
| `nmbs_server_get_input_register` | Value | ADDRESS(input_value) | `nmbs_server_get_input_register(math_number(0))` | `nmbs_srv_input_regs[1]` |
| `nmbs_server_set_discrete_input` | Statement | ADDRESS(input_value), VALUE(input_value) | `nmbs_server_set_discrete_input(math_number(0), logic_boolean(TRUE))` | `nmbs_bitfield_write(nmbs_srv_discrete_inputs, 1, true);` |
| `nmbs_server_get_discrete_input` | Value | ADDRESS(input_value) | `nmbs_server_get_discrete_input(math_number(0))` | `nmbs_bitfield_read(nmbs_srv_discrete_inputs, 1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SERIAL | Serial, Serial1, Serial2 | nmbs_server_create |
| BAUDRATE | 9600, 19200, 38400, 57600, 115200 | nmbs_server_create |

## ABS Examples

### Basic Usage
```
arduino_setup()
    nmbs_client_create("modbusClient", SERIAL, BAUDRATE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, nmbs_read_holding_register($modbusClient, math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `nmbs_client_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
