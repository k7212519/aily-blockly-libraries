# Modbus RTU slave

Packaged ModbusRTUSlave library, supports RS-485 DE/RE control, coil/register array configuration and response delay settings, making it easy to build an RTU slave station

## Library Info
- **Name**: @aily-project/lib-modbus-rtu-slave
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `modbus_rtu_slave_create` | Statement | VAR(field_input), SERIAL(dropdown), DE_PIN(input_value), RE_PIN(input_value) | `modbus_rtu_slave_create("modbus", SERIAL, math_number(2), math_number(2))` | `#ifndef MODBUS_SERIAL ↵ #define MODBUS_SERIAL SERIAL ↵ #endif ↵ ModbusRTUSlave modbus(MODBUS_SERIAL, 1, 1);` |
| `modbus_rtu_slave_set_response_delay` | Statement | VAR(field_variable), DELAY(input_value) | `modbus_rtu_slave_set_response_delay($modbus, math_number(1000))` | `modbus.setResponseDelay(1);` |
| `modbus_rtu_slave_begin` | Statement | VAR(field_variable), UNIT_ID(field_number), BAUD(dropdown), CONFIG(dropdown) | `modbus_rtu_slave_begin($modbus, 1, "9600", SERIAL_8N1)` | `MODBUS_SERIAL.begin(9600, MODBUS_CONFIG); ↵ modbus.begin(1, 9600, MODBUS_CONFIG);` |
| `modbus_rtu_slave_poll` | Statement | VAR(field_variable), DO(input_statement) | `modbus_rtu_slave_poll($modbus)` | `modbus.poll();` |
| `modbus_rtu_slave_bind_coils` | Statement | VAR(field_variable), ARRAY(field_input), LENGTH(field_number) | `modbus_rtu_slave_bind_coils($modbus, "coils", 2)` | `modbus.configureCoils(coils, 2);` |
| `modbus_rtu_slave_bind_discrete` | Statement | VAR(field_variable), ARRAY(field_input), LENGTH(field_number) | `modbus_rtu_slave_bind_discrete($modbus, "discreteInputs", 2)` | `modbus.configureDiscreteInputs(discreteInputs, 2);` |
| `modbus_rtu_slave_bind_holding` | Statement | VAR(field_variable), ARRAY(field_input), LENGTH(field_number) | `modbus_rtu_slave_bind_holding($modbus, "holdingRegisters", 2)` | `modbus.configureHoldingRegisters(holdingRegisters, 2);` |
| `modbus_rtu_slave_bind_input` | Statement | VAR(field_variable), ARRAY(field_input), LENGTH(field_number) | `modbus_rtu_slave_bind_input($modbus, "inputRegisters", 2)` | `modbus.configureInputRegisters(inputRegisters, 2);` |
| `modbus_rtu_slave_coils_set` | Statement | ARRAY(field_variable), INDEX(input_value), VALUE(input_value) | `modbus_rtu_slave_coils_set($coils, math_number(0), logic_boolean(TRUE))` | `coils[1] = true;` |
| `modbus_rtu_slave_coils_get` | Value | ARRAY(field_variable), INDEX(input_value) | `modbus_rtu_slave_coils_get($coils, math_number(0))` | `coils[1]` |
| `modbus_rtu_slave_discrete_set` | Statement | ARRAY(field_variable), INDEX(input_value), VALUE(input_value) | `modbus_rtu_slave_discrete_set($discreteInputs, math_number(0), logic_boolean(TRUE))` | `discreteInputs[1] = true;` |
| `modbus_rtu_slave_discrete_get` | Value | ARRAY(field_variable), INDEX(input_value) | `modbus_rtu_slave_discrete_get($discreteInputs, math_number(0))` | `discreteInputs[1]` |
| `modbus_rtu_slave_holding_set` | Statement | ARRAY(field_variable), INDEX(input_value), VALUE(input_value) | `modbus_rtu_slave_holding_set($holdingRegisters, math_number(0), math_number(0))` | `holdingRegisters[1] = 1;` |
| `modbus_rtu_slave_holding_get` | Value | ARRAY(field_variable), INDEX(input_value) | `modbus_rtu_slave_holding_get($holdingRegisters, math_number(0))` | `holdingRegisters[1]` |
| `modbus_rtu_slave_input_set` | Statement | ARRAY(field_variable), INDEX(input_value), VALUE(input_value) | `modbus_rtu_slave_input_set($inputRegisters, math_number(0), math_number(0))` | `inputRegisters[1] = 1;` |
| `modbus_rtu_slave_input_get` | Value | ARRAY(field_variable), INDEX(input_value) | `modbus_rtu_slave_input_get($inputRegisters, math_number(0))` | `inputRegisters[1]` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BAUD | 9600, 19200, 38400, 57600, 115200 | modbus_rtu_slave_begin |
| CONFIG | SERIAL_8N1, SERIAL_8N2, SERIAL_8E1, SERIAL_8E2, SERIAL_8O1, SERIAL_8O2 | modbus_rtu_slave_begin |

## ABS Examples

### Basic Usage
```
arduino_setup()
    modbus_rtu_slave_create("modbus", SERIAL, math_number(2), math_number(2))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, modbus_rtu_slave_coils_get($coils, math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `modbus_rtu_slave_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
