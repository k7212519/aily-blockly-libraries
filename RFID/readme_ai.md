# MFRC522 RFID

MFRC522 RFID reader/writer library supports I2C communication protocol and can read and write RFID cards

## Library Info
- **Name**: @aily-project/lib-mfrc522
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mfrc522_setup` | Statement | VAR(field_input), ADDRESS(field_number); runtime variants: fixed-board-i2c-pins: (none); esp32-custom-i2c-pins: SDA_PIN(dropdown), SCL_PIN(dropdown) | `mfrc522_setup("rfid", 0x2F)` | `Serial.begin(115200); ↵ MFRC522 rfid(0x2F); ↵ Wire.begin(); ↵ rfid.PCD_Init(); ↵ // MFRC522 I2C连接 (Arduino UNO): SDA->A4, SCL->A5` |
| `mfrc522_is_new_card_present` | Value | VAR(field_variable) | `mfrc522_is_new_card_present($rfid)` | `rfid.PICC_IsNewCardPresent()` |
| `mfrc522_read_card_serial` | Value | VAR(field_variable) | `mfrc522_read_card_serial($rfid)` | `rfid.PICC_ReadCardSerial()` |
| `mfrc522_read_uid` | Value | VAR(field_variable) | `mfrc522_read_uid($rfid)` | `rfid.Read_Uid()` |
| `mfrc522_when_card_detected` | Hat | VAR(field_variable), HANDLER(input_statement) | `mfrc522_when_card_detected($rfid)` | `if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) { ↵ }` |
| `mfrc522_authenticate` | Statement | VAR(field_variable), SECTOR(input_value), KEY_TYPE(dropdown), KEY(input_value) | `mfrc522_authenticate($rfid, math_number(0), A, text("value"))` | `rfid.PCD_Authenticate(0x60, 1, &authKey_rfid_1, &rfid.uid);` |
| `mfrc522_read_block` | Statement | VAR(field_variable), BLOCK(input_value), BUFFER(field_variable) | `mfrc522_read_block($rfid, math_number(0), $data)` | `rfid.MIFARE_Read(1, data, &dataSize);` |
| `mfrc522_write_block` | Statement | VAR(field_variable), DATA(input_value), BLOCK(input_value) | `mfrc522_write_block($rfid, text("value"), math_number(0))` | `rfid.MIFARE_Write(1, writeBuffer_rfid_1, 16);` |
| `mfrc522_halt_card` | Statement | VAR(field_variable) | `mfrc522_halt_card($rfid)` | `rfid.PICC_HaltA(); ↵ rfid.PCD_StopCrypto1();` |
| `mfrc522_get_data_string` | Value | BUFFER(field_variable) | `mfrc522_get_data_string($data)` | `format_data()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| KEY_TYPE | A, B | mfrc522_authenticate |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mfrc522_setup("rfid", 0x2F)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mfrc522_is_new_card_present($rfid))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `mfrc522_setup("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **Runtime shape**: `mfrc522_setup` adds `SDA_PIN` and `SCL_PIN` only on boards that require custom ESP32 I2C pins; fixed-pin boards use the shorter signature.

## Runtime Variant Examples

### Runtime Variant: mfrc522_setup/esp32-custom-i2c-pins
```abs
arduino_setup()
    mfrc522_setup("rfid", 0x2F, 21, 22)
```
