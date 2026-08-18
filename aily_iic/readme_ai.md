# Aily I2C communication library

I2C communication support library based on Wire library package, suitable for Arduino UNO, MEGA, ESP8266, ESP32 and other development boards

## Library Info
- **Name**: @aily-project/lib-aily-iic
- **Version**: 0.0.2

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `wire_begin` | Statement | WIRE(dropdown), MODE(dropdown); runtime variants: master: (none); slave-address: ADDRESS(input_value) | `wire_begin(WIRE, MASTER)` | `WIRE.begin(); // 主设备模式` |
| `wire_begin_with_settings` | Statement | WIRE(dropdown), MODE(dropdown), SDA(input_value), SCL(input_value); runtime variants: master-custom-pins: (none); slave-custom-pins-and-address: ADDRESS(input_value) | `wire_begin_with_settings(WIRE, MASTER, math_number(0), math_number(0))` | `// WIRE: SDA=1, SCL=1 (custom) 主设备模式 ↵ WIRE.begin(1, 1); ↵ // Wire WIRE initialized with custom pins` |
| `wire_set_clock` | Statement | WIRE(dropdown), FREQUENCY(input_value) | `wire_set_clock(WIRE, math_number(0))` | `WIRE.setClock(((uint32_t)((1) * 1000.0)));` |
| `wire_begin_transmission` | Statement | WIRE(dropdown), ADDRESS(input_value) | `wire_begin_transmission(WIRE, math_number(0))` | `WIRE.beginTransmission(1);` |
| `wire_write` | Statement | WIRE(dropdown), DATA(input_value) | `wire_write(WIRE, math_number(0))` | `WIRE.write(1);` |
| `wire_end_transmission` | Statement | WIRE(dropdown) | `wire_end_transmission(WIRE)` | `WIRE.endTransmission();` |
| `wire_request_from` | Statement | WIRE(dropdown), ADDRESS(input_value), QUANTITY(input_value) | `wire_request_from(WIRE, math_number(0), math_number(0))` | `WIRE.requestFrom(1, 1);` |
| `wire_available` | Value | WIRE(dropdown) | `wire_available(WIRE)` | `WIRE.available()` |
| `wire_read` | Value | WIRE(dropdown) | `wire_read(WIRE)` | `WIRE.read()` |
| `wire_variables` | Value | WIRE(dropdown) | `wire_variables(WIRE)` | `WIRE` |
| `wire_on_receive` | Hat | WIRE(dropdown), CALLBACK(input_statement) | `wire_on_receive(WIRE)` | `void wireReceiveHandler(int numBytes) { ↵ } ↵ WIRE.onReceive(wireReceiveHandler);` |
| `wire_on_request` | Hat | WIRE(dropdown), CALLBACK(input_statement) | `wire_on_request(WIRE)` | `void wireRequestHandler() { ↵ } ↵ WIRE.onRequest(wireRequestHandler);` |
| `wire_scan` | Statement | WIRE(dropdown) | `wire_scan(WIRE)` | `wireScanI2CDevices();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | MASTER, SLAVE | wire_begin, wire_begin_with_settings |

## ABS Examples

### Basic Usage
```
arduino_setup()
    wire_begin(WIRE, MASTER)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, wire_available(WIRE))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **Runtime shape**: only `wire_begin` and `wire_begin_with_settings` add `ADDRESS` in `SLAVE` mode. The other extensions refresh existing wire-instance or board metadata without changing their ABS signatures.

## Runtime Variant Examples

### Runtime Variant: wire_begin/slave-address
```abs
arduino_setup()
    wire_begin(WIRE, SLAVE, math_number(8))
```

### Runtime Variant: wire_begin_with_settings/slave-custom-pins-and-address
```abs
arduino_setup()
    wire_begin_with_settings(WIRE, SLAVE, math_number(0), math_number(0), math_number(8))
```
