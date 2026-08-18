# SparkFun ATECCX08A Crypto Co-processor

Blockly wrapper for the SparkFun ATECCX08A cryptographic co-processor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-ateccx08a
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ateccx08a_init` | Statement | VAR(field_input), ADDRESS(dropdown) | `ateccx08a_init("atecc", ATECC508A_ADDRESS_DEFAULT)` | `Wire.begin(); ↵ atecc_ready = atecc.begin(ATECC508A_ADDRESS_DEFAULT);` |
| `ateccx08a_is_ready` | Value | VAR(field_variable) | `ateccx08a_is_ready($atecc)` | `atecc_ready` |
| `ateccx08a_wakeup` | Value | VAR(field_variable) | `ateccx08a_wakeup($atecc)` | `atecc.wakeUp()` |
| `ateccx08a_sleep` | Statement | VAR(field_variable) | `ateccx08a_sleep($atecc)` | `atecc.sleep();` |
| `ateccx08a_read_config` | Statement | VAR(field_variable) | `ateccx08a_read_config($atecc)` | `atecc.readConfigZone(false);` |
| `ateccx08a_lock_status` | Value | VAR(field_variable), FIELD(dropdown) | `ateccx08a_lock_status($atecc, CONFIG)` | `atecc.configLockStatus` |
| `ateccx08a_random` | Value | VAR(field_variable), TYPE(dropdown) | `ateccx08a_random($atecc, BYTE)` | `atecc.getRandomByte(false)` |
| `ateccx08a_update_random` | Statement | VAR(field_variable) | `ateccx08a_update_random($atecc)` | `atecc.updateRandom32Bytes(false);` |
| `ateccx08a_create_key_pair` | Value | VAR(field_variable), SLOT(input_value) | `ateccx08a_create_key_pair($atecc, math_number(0))` | `atecc.createNewKeyPair(1)` |
| `ateccx08a_generate_public_key` | Value | VAR(field_variable), SLOT(input_value) | `ateccx08a_generate_public_key($atecc, math_number(0))` | `atecc.generatePublicKey(1, false)` |
| `ateccx08a_write_config_sparkfun` | Statement | VAR(field_variable) | `ateccx08a_write_config_sparkfun($atecc)` | `atecc.writeConfigSparkFun();` |
| `ateccx08a_lock_zone` | Statement | VAR(field_variable), ZONE(dropdown) | `ateccx08a_lock_zone($atecc, CONFIG)` | `atecc.lockConfig();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | ATECC508A_ADDRESS_DEFAULT, 0x60 | ateccx08a_init |
| FIELD | CONFIG, DATA_OTP, SLOT0 | ateccx08a_lock_status |
| TYPE | BYTE, INT, LONG | ateccx08a_random |
| ZONE | CONFIG, DATA_OTP, SLOT0 | ateccx08a_lock_zone |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ateccx08a_init("atecc", ATECC508A_ADDRESS_DEFAULT)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ateccx08a_is_ready($atecc))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ateccx08a_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
