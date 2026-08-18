# RFID card reader (Chuanglebo)

Chuanglebo RFID radio frequency card module support library reads RFID tag ID through the soft serial port and supports Arduino UNO, MEGA and other development boards.

## Library Info
- **Name**: @aily-project/lib-loborobot-rfidreader
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `rfid_setup` | Statement | VAR(field_input), RX_PIN(dropdown), TX_PIN(dropdown), ENABLE_PIN(dropdown) | `rfid_setup("rfidReader", RX_PIN, TX_PIN, ENABLE_PIN)` | `SoftwareSerial rfidReader(RX_PIN, TX_PIN); ↵ int rfidReader_enablePin = ENABLE_PIN; ↵ String rfidReader_currentTag = ""; ↵ String rfidReader_lastTag = ""; ↵ void rfidReader_readTag(String &tagString) { ↵ int bytesread = 0; ↵ int val = 0; ↵ char code[10]; ↵ String tagCode = ""; ↵ if (rfidReader.available() > 0) { ↵ if ((val = rfidReader.read()) == 10) { ↵ bytesread = 0; ↵ while (bytesread < 10) { ↵ if (rfidReader.available() > 0) { ↵ val = rfidReader.read(); ↵ if ((val == 10) &#124;&#124; (val == 13)) { ↵ break; ↵ } ↵ code[bytesread] = val; ↵ bytesread++; ↵ } ↵ } ↵ if (bytesread == 10) { ↵ for (int x = 0; x < 10; x++) { ↵ tagCode += code[x]; ↵ } ↵ tagString = tagCode; ↵ while (rfidReader.available() > 0) { ↵ rfidReader.read(); ↵ } ↵ } ↵ bytesread = 0; ↵ tagCode = ""; ↵ } ↵ } ↵ } ↵ rfidReader.begin(2400); ↵ pinMode(rfidReader_enablePin, OUTPUT); ↵ digitalWrite(rfidReader_enablePin, LOW);` |
| `rfid_on_tag_read` | Hat | VAR(field_variable), TAG_VAR(field_variable), HANDLER(input_statement) | `rfid_on_tag_read($rfidReader, $tagID)` | `String tagID = ""; ↵ if (rfidReader.available() > 0) { ↵ rfidReader_readTag(rfidReader_currentTag); ↵ } ↵ if (rfidReader_currentTag != rfidReader_lastTag && rfidReader_currentTag != "") { ↵ rfidReader_lastTag = rfidReader_currentTag; ↵ tagID = rfidReader_currentTag; ↵ }` |
| `rfid_available` | Value | VAR(field_variable) | `rfid_available($rfidReader)` | `rfidReader.available() > 0` |
| `rfid_read_tag` | Value | VAR(field_variable) | `rfid_read_tag($rfidReader)` | `rfidReader_currentTag` |
| `rfid_enable` | Statement | VAR(field_variable), STATE(dropdown) | `rfid_enable($rfidReader, LOW)` | `digitalWrite(rfidReader_enablePin, LOW);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| STATE | LOW, HIGH | rfid_enable |

## ABS Examples

### Basic Usage
```
arduino_setup()
    rfid_setup("rfidReader", RX_PIN, TX_PIN, ENABLE_PIN)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, rfid_available($rfidReader))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `rfid_setup("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
