# GM60 QR code scanner

DFRobot GM60 QR code/barcode scanning and recognition sensor control library supports I2C and UART communication and can recognize QRCode, Data Matrix, PDF417, EAN13, Code128 and other code systems.

## Library Info
- **Name**: @aily-project/lib-dfrobot-gm60
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `gm60_init_i2c` | Statement | VAR(field_input), ADDRESS(dropdown), WIRE(dropdown) | `gm60_init_i2c("gm60", "0x1A", WIRE)` | `gm60.begin();` |
| `gm60_init_uart` | Statement | VAR(field_input), RX(input_value), TX(input_value) | `gm60_init_uart("gm60", math_number(0), math_number(0))` | `SoftwareSerial gm60Serial(1, 1); ↵ DFRobot_GM60_UART gm60; ↵ gm60Serial.begin(9600); ↵ gm60.begin(gm60Serial);` |
| `gm60_set_encode` | Statement | VAR(field_variable), ENCODE(dropdown) | `gm60_set_encode($gm60, eUTF8)` | `gm60.encode(gm60.eUTF8);` |
| `gm60_setup_code` | Statement | VAR(field_variable), ON(dropdown), CONTENT(dropdown) | `gm60_setup_code($gm60, true, true)` | `gm60.setupCode(true, true);` |
| `gm60_set_identify` | Statement | VAR(field_variable), BARCODE(dropdown) | `gm60_set_identify($gm60, eEnableAllBarcode)` | `gm60.setIdentify(gm60.eEnableAllBarcode);` |
| `gm60_reset` | Statement | VAR(field_variable) | `gm60_reset($gm60)` | `gm60.reset();` |
| `gm60_detection` | Value | VAR(field_variable) | `gm60_detection($gm60)` | `gm60.detection()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x1A | gm60_init_i2c |
| ENCODE | eUTF8, eGBK | gm60_set_encode |
| ON | true, false | gm60_setup_code |
| CONTENT | true, false | gm60_setup_code |
| BARCODE | eEnableAllBarcode, eEnableDefaultcode, eForbidAllBarcode | gm60_set_identify |

## ABS Examples

### Basic Usage
```
arduino_setup()
    gm60_init_i2c("gm60", "0x1A", WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, gm60_detection($gm60))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `gm60_init_i2c("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
