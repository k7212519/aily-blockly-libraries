# PN532 NFC

PN532 NFC/RFID module library, supports SPI/I2C/UART interface, can read and write Mifare Classic, Mifare Ultralight, NTAG2xx and other cards

## Library Info
- **Name**: @aily-project/lib-adafruit-PN532
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `pn532_create_spi` | Statement | VAR(field_input), SCK(field_number), MISO(field_number), MOSI(field_number), SS(field_number) | `pn532_create_spi("nfc", 2, 5, 3, 4)` | `Adafruit_PN532 nfc(2, 5, 3, 4);` |
| `pn532_create_spi_hw` | Statement | VAR(field_input), SS(field_number) | `pn532_create_spi_hw("nfc", 10)` | `Adafruit_PN532 nfc(10);` |
| `pn532_create_i2c` | Statement | VAR(field_input) | `pn532_create_i2c("nfc")` | `Adafruit_PN532 nfc(-1, -1);` |
| `pn532_create_i2c_pins` | Statement | VAR(field_input), IRQ(field_number), RESET(field_number) | `pn532_create_i2c_pins("nfc", 2, 3)` | `Adafruit_PN532 nfc(2, 3);` |
| `pn532_begin` | Statement | VAR(field_variable) | `pn532_begin($nfc)` | `nfc.begin();` |
| `pn532_get_firmware_version` | Value | VAR(field_variable) | `pn532_get_firmware_version($nfc)` | `nfc.getFirmwareVersion()` |
| `pn532_sam_config` | Statement | VAR(field_variable) | `pn532_sam_config($nfc)` | `nfc.SAMConfig();` |
| `pn532_set_passive_retries` | Statement | VAR(field_variable), RETRIES(field_number) | `pn532_set_passive_retries($nfc, 255)` | `nfc.setPassiveActivationRetries(255);` |
| `pn532_read_passive_target` | Value | VAR(field_variable), CARDTYPE(dropdown), TIMEOUT(field_number) | `pn532_read_passive_target($nfc, PN532_MIFARE_ISO14443A, 1000)` | `nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, pn532_uid, &pn532_uid_length, 1000)` |
| `pn532_get_uid_length` | Value | (none) | `pn532_get_uid_length()` | `pn532_uid_length` |
| `pn532_get_uid_byte` | Value | INDEX(input_value) | `pn532_get_uid_byte(math_number(0))` | `pn532_uid[1]` |
| `pn532_mifare_classic_authenticate` | Value | VAR(field_variable), SECTOR(field_number), KEYTYPE(dropdown), KEY(input_value) | `pn532_mifare_classic_authenticate($nfc, 1, MIFARE_CMD_AUTH_A, text("value"))` | `nfc.mifareclassic_AuthenticateBlock(pn532_uid, pn532_uid_length, 1, MIFARE_CMD_AUTH_A, convertKey("value"))` |
| `pn532_mifare_classic_read_block` | Value | VAR(field_variable), BLOCK(field_number) | `pn532_mifare_classic_read_block($nfc, 4)` | `parseNDEFURI(nfc, 4)` |
| `pn532_mifare_classic_write_block` | Value | VAR(field_variable), BLOCK(field_number), DATA(input_value) | `pn532_mifare_classic_write_block($nfc, 4, text("value"))` | `writeMifareClassicBlock(nfc, 4, "value")` |
| `pn532_mifare_ultralight_read_page` | Value | VAR(field_variable), PAGE(field_number) | `pn532_mifare_ultralight_read_page($nfc, 4)` | `readMifareUltralightPage(nfc, 4)` |
| `pn532_mifare_ultralight_write_page` | Value | VAR(field_variable), PAGE(field_number), DATA(input_value) | `pn532_mifare_ultralight_write_page($nfc, 4, text("value"))` | `writeMifareUltralightPage(nfc, 4, "value")` |
| `pn532_ntag2xx_read_page` | Value | VAR(field_variable), PAGE(field_number) | `pn532_ntag2xx_read_page($nfc, 4)` | `readNTAG2xxPage(nfc, 4)` |
| `pn532_ntag2xx_write_page` | Value | VAR(field_variable), PAGE(field_number), DATA(input_value) | `pn532_ntag2xx_write_page($nfc, 4, text("value"))` | `writeNTAG2xxPage(nfc, 4, "value")` |
| `pn532_mifare_classic_write_ndef_uri` | Value | VAR(field_variable), SECTOR(field_number), PREFIX(dropdown), URL(input_value) | `pn532_mifare_classic_write_ndef_uri($nfc, 1, NDEF_URIPREFIX_NONE, text("value"))` | `writeNDEFURI_Manual(nfc, 1, NDEF_URIPREFIX_NONE, "value")` |
| `pn532_ntag2xx_write_ndef_uri` | Value | VAR(field_variable), PREFIX(dropdown), URL(input_value) | `pn532_ntag2xx_write_ndef_uri($nfc, NDEF_URIPREFIX_NONE, text("value"))` | `nfc.ntag2xx_WriteNDEFURI(NDEF_URIPREFIX_NONE, stringToCharArray("value"), getStringLength("value"))` |
| `pn532_mifare_classic_format_ndef` | Value | VAR(field_variable) | `pn532_mifare_classic_format_ndef($nfc)` | `nfc.mifareclassic_FormatNDEF()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CARDTYPE | PN532_MIFARE_ISO14443A | pn532_read_passive_target |
| KEYTYPE | MIFARE_CMD_AUTH_A, MIFARE_CMD_AUTH_B | pn532_mifare_classic_authenticate |
| PREFIX | NDEF_URIPREFIX_NONE, NDEF_URIPREFIX_HTTP_WWWDOT, NDEF_URIPREFIX_HTTPS_WWWDOT, NDEF_URIPREFIX_HTTP, NDEF_URIPREFIX_HTTPS, NDEF_URIPREFIX_TEL, NDEF_URIPREFIX_MAILTO, NDEF_URIPREFIX_FTP_ANONAT | pn532_mifare_classic_write_ndef_uri, pn532_ntag2xx_write_ndef_uri |

## ABS Examples

### Basic Usage
```
arduino_setup()
    pn532_create_spi("nfc", 2, 5, 3, 4)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, pn532_get_firmware_version($nfc))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `pn532_create_spi("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
