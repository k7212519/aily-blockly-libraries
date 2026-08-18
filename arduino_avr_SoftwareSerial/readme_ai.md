# Soft serial communication

A software simulation serial port library suitable for the AVR core, allowing serial port communication on any digital pin, supporting multiple soft serial port instances, baud rate configuration, data transceiver and...

## Library Info
- **Name**: @aily-project/lib-avr-softwareserial
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `softwareserial_init` | Statement | VAR(field_input), RX_PIN(dropdown), TX_PIN(dropdown), BAUD(dropdown) | `softwareserial_init("mySerial", RX_PIN, TX_PIN, "300")` | `mySerial.begin(300);` |
| `softwareserial_available` | Value | VAR(field_variable) | `softwareserial_available($mySerial)` | `mySerial.available()` |
| `softwareserial_read` | Value | VAR(field_variable), TYPE(dropdown) | `softwareserial_read($mySerial, "read()")` | `mySerial.read()` |
| `softwareserial_print` | Statement | VAR(field_variable), DATA(input_value) | `softwareserial_print($mySerial, math_number(0))` | `mySerial.print(1);` |
| `softwareserial_println` | Statement | VAR(field_variable), DATA(input_value) | `softwareserial_println($mySerial, math_number(0))` | `mySerial.println(1);` |
| `softwareserial_write` | Statement | VAR(field_variable), DATA(input_value) | `softwareserial_write($mySerial, math_number(0))` | `mySerial.write(1);` |
| `softwareserial_listen` | Statement | VAR(field_variable) | `softwareserial_listen($mySerial)` | `mySerial.listen();` |
| `softwareserial_islistening` | Value | VAR(field_variable) | `softwareserial_islistening($mySerial)` | `mySerial.isListening()` |
| `softwareserial_overflow` | Value | VAR(field_variable) | `softwareserial_overflow($mySerial)` | `mySerial.overflow()` |
| `softwareserial_end` | Statement | VAR(field_variable) | `softwareserial_end($mySerial)` | `mySerial.end();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BAUD | 300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200 | softwareserial_init |
| TYPE | read(), peek(), parseInt(), parseFloat(), readString() | softwareserial_read |

## ABS Examples

### Basic Usage
```
arduino_setup()
    softwareserial_init("mySerial", RX_PIN, TX_PIN, "300")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, softwareserial_available($mySerial))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `softwareserial_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
