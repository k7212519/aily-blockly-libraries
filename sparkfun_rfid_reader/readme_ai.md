# SparkFun Simultaneous UHF RFID Reader

Blockly wrapper for the SparkFun Simultaneous UHF RFID Tag Reader.

## Library Info
- **Name**: @aily-project/lib-sparkfun-rfid-reader
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `rfid_reader_init` | Statement | VAR(field_input), PORT(dropdown) | `rfid_reader_init("rfid", Serial1)` | `Serial1.begin(115200); ↵ rfid.begin(Serial1);` |
| `rfid_reader_start` | Statement | VAR(field_variable) | `rfid_reader_start($rfid)` | `rfid.startReading();` |
| `rfid_reader_stop` | Statement | VAR(field_variable) | `rfid_reader_stop($rfid)` | `rfid.stopReading();` |
| `rfid_reader_check_tag` | Value | VAR(field_variable) | `rfid_reader_check_tag($rfid)` | `rfid.check()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PORT | Serial1, Serial2, Serial3 | rfid_reader_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    rfid_reader_init("rfid", Serial1)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, rfid_reader_check_tag($rfid))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `rfid_reader_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
