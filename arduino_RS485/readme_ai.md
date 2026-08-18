# RS485 communication library

Optimized RS485 serial communication library supports one-click configuration, automatic initialization, master-slave communication and other simplified functions

## Library Info
- **Name**: @aily-project/lib-arduino-rs485
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `rs485_end` | Statement | (none) | `rs485_end()` | `RS485.end();` |
| `rs485_available` | Value | (none) | `rs485_available()` | `RS485.available()` |
| `rs485_read` | Value | (none) | `rs485_read()` | `RS485.read()` |
| `rs485_peek` | Value | (none) | `rs485_peek()` | `RS485.peek()` |
| `rs485_write` | Statement | DATA(input_value) | `rs485_write(math_number(0))` | `RS485.write(1);` |
| `rs485_print` | Statement | DATA(input_value) | `rs485_print(math_number(0))` | `RS485.print(1);` |
| `rs485_println` | Statement | DATA(input_value) | `rs485_println(math_number(0))` | `RS485.println(1);` |
| `rs485_flush` | Statement | (none) | `rs485_flush()` | `RS485.flush();` |
| `rs485_begin_transmission` | Statement | (none) | `rs485_begin_transmission()` | `RS485.beginTransmission();` |
| `rs485_end_transmission` | Statement | (none) | `rs485_end_transmission()` | `RS485.endTransmission();` |
| `rs485_receive` | Statement | (none) | `rs485_receive()` | `RS485.receive();` |
| `rs485_no_receive` | Statement | (none) | `rs485_no_receive()` | `RS485.noReceive();` |
| `rs485_send_break` | Statement | DURATION(field_number) | `rs485_send_break(100)` | `RS485.sendBreak(100);` |
| `rs485_send_break_microseconds` | Statement | DURATION(field_number) | `rs485_send_break_microseconds(1000)` | `RS485.sendBreakMicroseconds(1000);` |
| `rs485_set_pins` | Statement | TX_PIN(dropdown), DE_PIN(dropdown), RE_PIN(dropdown) | `rs485_set_pins(TX_PIN, DE_PIN, RE_PIN)` | `RS485.setPins(TX_PIN, DE_PIN, RE_PIN);` |
| `rs485_simple_send` | Statement | DATA(input_value) | `rs485_simple_send(math_number(0))` | `RS485.beginTransmission(); ↵ RS485.print(1); ↵ RS485.endTransmission();` |
| `rs485_simple_receive` | Statement | DO(input_statement) | `rs485_simple_receive()` | `if (RS485.available()) { ↵ rs485_receivedData = ""; ↵ while (RS485.available()) { ↵ char c = RS485.read(); ↵ rs485_receivedData += c; ↵ delay(1); ↵ } ↵ if (rs485_receivedData.length() > 0) { ↵ } ↵ }` |
| `rs485_received_data` | Value | (none) | `rs485_received_data()` | `rs485_receivedData` |
| `rs485_begin` | Statement | SERIAL(dropdown), BAUDRATE(dropdown), TX_PIN(dropdown), DE_PIN(dropdown), RE_PIN(dropdown) | `rs485_begin(SERIAL, BAUDRATE, TX_PIN, DE_PIN, RE_PIN)` | `#define RS485_SERIAL_PORT SERIAL ↵ RS485Class RS485(SERIAL, TX_PIN, DE_PIN, RE_PIN); ↵ RS485.begin(BAUDRATE);` |
| `rs485_master_send` | Statement | DATA(input_value), SLAVE_ADDR(field_number) | `rs485_master_send(math_number(0), 1)` | `RS485.beginTransmission(); ↵ RS485.print("TO:1:"); ↵ RS485.print(1); ↵ RS485.endTransmission();` |
| `rs485_slave_receive` | Statement | SLAVE_ADDR(field_number), DO(input_statement) | `rs485_slave_receive(1)` | `if (RS485.available()) { ↵ rs485_receivedData = ""; ↵ while (RS485.available()) { ↵ char c = RS485.read(); ↵ rs485_receivedData += c; ↵ delay(1); ↵ } ↵ if (rs485_receivedData.length() > 0 && rs485_receivedData.indexOf("TO:1:") == 0) { ↵ rs485_receivedData = rs485_receivedData.substring(5); ↵ } ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TX_PIN | ${board.digitalPins} | rs485_set_pins |
| DE_PIN | ${board.digitalPins} | rs485_set_pins |
| RE_PIN | ${board.digitalPins} | rs485_set_pins |
| SERIAL | ${board.serialPort} | rs485_begin |
| BAUDRATE | ${board.serialSpeed} | rs485_begin |

## ABS Examples

### Basic Usage
```
arduino_setup()
    rs485_begin_transmission()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, rs485_available())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
