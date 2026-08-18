# SerialTransfer

Reliable data transmission based on the SerialTransfer library, supporting three communication methods: UART/I2C/SPI, CRC checksum data packaging

## Library Info
- **Name**: @aily-project/lib-serial-transfer
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `serial_transfer_init` | Statement | VAR(field_input), SERIAL(dropdown), BAUD(input_value) | `serial_transfer_init("myTransfer", Serial, math_number(9600))` | `SerialTransfer myTransfer; ↵ Serial.begin(1); ↵ myTransfer.begin(Serial);` |
| `serial_transfer_send_int` | Statement | VAR(field_variable), VALUE(input_value), PACKET_ID(input_value) | `serial_transfer_send_int($myTransfer, math_number(0), math_number(0))` | `{ ↵ int32_t _st_val = 1; ↵ uint16_t _st_size = myTransfer.txObj(_st_val); ↵ myTransfer.sendData(_st_size, 1); ↵ }` |
| `serial_transfer_send_float` | Statement | VAR(field_variable), VALUE(input_value), PACKET_ID(input_value) | `serial_transfer_send_float($myTransfer, math_number(0), math_number(0))` | `{ ↵ float _st_val = 1; ↵ uint16_t _st_size = myTransfer.txObj(_st_val); ↵ myTransfer.sendData(_st_size, 1); ↵ }` |
| `serial_transfer_send_string` | Statement | VAR(field_variable), VALUE(input_value), PACKET_ID(input_value) | `serial_transfer_send_string($myTransfer, text("value"), math_number(0))` | `_st_sendString_myTransfer(String("value").c_str(), 1);` |
| `serial_transfer_available` | Value | VAR(field_variable) | `serial_transfer_available($myTransfer)` | `(myTransfer.available() > 0)` |
| `serial_transfer_receive_int` | Value | VAR(field_variable) | `serial_transfer_receive_int($myTransfer)` | `_st_recvInt_myTransfer()` |
| `serial_transfer_receive_float` | Value | VAR(field_variable) | `serial_transfer_receive_float($myTransfer)` | `_st_recvFloat_myTransfer()` |
| `serial_transfer_receive_string` | Value | VAR(field_variable), LENGTH(input_value) | `serial_transfer_receive_string($myTransfer, math_number(0))` | `_st_recvString_myTransfer(1)` |
| `serial_transfer_status` | Value | VAR(field_variable) | `serial_transfer_status($myTransfer)` | `myTransfer.status` |
| `serial_transfer_current_packet_id` | Value | VAR(field_variable) | `serial_transfer_current_packet_id($myTransfer)` | `myTransfer.currentPacketID()` |
| `i2c_transfer_init_master` | Statement | VAR(field_input), WIRE(dropdown) | `i2c_transfer_init_master("i2cTransfer", Wire)` | `I2CTransfer i2cTransfer; ↵ Wire.begin(); ↵ i2cTransfer.begin(Wire);` |
| `i2c_transfer_init_slave` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(input_value) | `i2c_transfer_init_slave("i2cTransfer", Wire, math_number(0))` | `I2CTransfer i2cTransfer; ↵ Wire.begin(1); ↵ i2cTransfer.begin(Wire);` |
| `i2c_transfer_send_int` | Statement | VAR(field_variable), VALUE(input_value), ADDRESS(input_value), PACKET_ID(input_value) | `i2c_transfer_send_int($i2cTransfer, math_number(0), math_number(0), math_number(0))` | `{ ↵ int32_t _i2c_val = 1; ↵ uint16_t _i2c_size = i2cTransfer.txObj(_i2c_val); ↵ i2cTransfer.sendData(_i2c_size, 1, 1); ↵ }` |
| `i2c_transfer_send_float` | Statement | VAR(field_variable), VALUE(input_value), ADDRESS(input_value), PACKET_ID(input_value) | `i2c_transfer_send_float($i2cTransfer, math_number(0), math_number(0), math_number(0))` | `{ ↵ float _i2c_val = 1; ↵ uint16_t _i2c_size = i2cTransfer.txObj(_i2c_val); ↵ i2cTransfer.sendData(_i2c_size, 1, 1); ↵ }` |
| `i2c_transfer_send_string` | Statement | VAR(field_variable), VALUE(input_value), ADDRESS(input_value), PACKET_ID(input_value) | `i2c_transfer_send_string($i2cTransfer, text("value"), math_number(0), math_number(0))` | `_i2c_sendString_i2cTransfer(String("value").c_str(), 1, 1);` |
| `i2c_transfer_receive_int` | Value | VAR(field_variable) | `i2c_transfer_receive_int($i2cTransfer)` | `_i2c_recvInt_i2cTransfer()` |
| `i2c_transfer_receive_float` | Value | VAR(field_variable) | `i2c_transfer_receive_float($i2cTransfer)` | `_i2c_recvFloat_i2cTransfer()` |
| `i2c_transfer_receive_string` | Value | VAR(field_variable), LENGTH(input_value) | `i2c_transfer_receive_string($i2cTransfer, math_number(0))` | `_i2c_recvString_i2cTransfer(1)` |
| `i2c_transfer_status` | Value | VAR(field_variable) | `i2c_transfer_status($i2cTransfer)` | `i2cTransfer.status` |
| `spi_transfer_init_master` | Statement | VAR(field_input), SS_PIN(input_value) | `spi_transfer_init_master("spiTransfer", math_number(2))` | `SPITransfer spiTransfer; ↵ digitalWrite(1, HIGH); ↵ SPI.begin(); ↵ SPI.setClockDivider(SPI_CLOCK_DIV8); ↵ spiTransfer.begin(SPI);` |
| `spi_transfer_init_slave` | Statement | VAR(field_input) | `spi_transfer_init_slave("spiTransfer")` | `SPITransfer spiTransfer; ↵ volatile bool _spi_newPacket_spiTransfer = false; ↵ SPCR &#124;= bit(SPE); ↵ pinMode(MISO, OUTPUT); ↵ SPI.attachInterrupt(); ↵ spiTransfer.begin(SPI); ↵ ISR(SPI_STC_vect) { ↵ if (spiTransfer.available()) ↵ _spi_newPacket_spiTransfer = true; ↵ }` |
| `spi_transfer_send_int` | Statement | VAR(field_variable), VALUE(input_value), PACKET_ID(input_value) | `spi_transfer_send_int($spiTransfer, math_number(0), math_number(0))` | `{ ↵ int32_t _spi_val = 1; ↵ uint16_t _spi_size = spiTransfer.txObj(_spi_val); ↵ spiTransfer.sendData(_spi_size, 1); ↵ }` |
| `spi_transfer_send_float` | Statement | VAR(field_variable), VALUE(input_value), PACKET_ID(input_value) | `spi_transfer_send_float($spiTransfer, math_number(0), math_number(0))` | `{ ↵ float _spi_val = 1; ↵ uint16_t _spi_size = spiTransfer.txObj(_spi_val); ↵ spiTransfer.sendData(_spi_size, 1); ↵ }` |
| `spi_transfer_send_string` | Statement | VAR(field_variable), VALUE(input_value), PACKET_ID(input_value) | `spi_transfer_send_string($spiTransfer, text("value"), math_number(0))` | `_spi_sendString_spiTransfer(String("value").c_str(), 1);` |
| `spi_transfer_available` | Value | VAR(field_variable) | `spi_transfer_available($spiTransfer)` | `_spi_newPacket_spiTransfer` |
| `spi_transfer_receive_int` | Value | VAR(field_variable) | `spi_transfer_receive_int($spiTransfer)` | `_spi_recvInt_spiTransfer()` |
| `spi_transfer_receive_float` | Value | VAR(field_variable) | `spi_transfer_receive_float($spiTransfer)` | `_spi_recvFloat_spiTransfer()` |
| `spi_transfer_receive_string` | Value | VAR(field_variable), LENGTH(input_value) | `spi_transfer_receive_string($spiTransfer, math_number(0))` | `_spi_recvString_spiTransfer(1)` |
| `spi_transfer_status` | Value | VAR(field_variable) | `spi_transfer_status($spiTransfer)` | `spiTransfer.status` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SERIAL | Serial, Serial1, Serial2, Serial3 | serial_transfer_init |
| WIRE | Wire, Wire1 | i2c_transfer_init_master, i2c_transfer_init_slave |

## ABS Examples

### Basic Usage
```
arduino_setup()
    serial_transfer_init("myTransfer", Serial, math_number(9600))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, serial_transfer_available($myTransfer))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `serial_transfer_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
