# SparkFun ESP32 DMX

Blockly wrapper for SparkFun ESP32 DMX Shield.

## Library Info
- **Name**: @aily-project/lib-sparkfun-dmx
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `dmx_init` | Statement | VAR(field_input), UART(field_number), EN(input_value), CHANNELS(input_value), DIR(dropdown) | `dmx_init("dmx", 2, math_number(0), math_number(0), DMX_WRITE_DIR)` | `dmxSerial.begin(DMX_BAUD, DMX_FORMAT); ↵ dmx.begin(dmxSerial, 1, 1); ↵ dmx.setComDir(DMX_WRITE_DIR);` |
| `dmx_set_dir` | Statement | VAR(field_variable), DIR(dropdown) | `dmx_set_dir($dmx, DMX_WRITE_DIR)` | `dmx.setComDir(DMX_WRITE_DIR);` |
| `dmx_write_byte` | Statement | VAR(field_variable), CHANNEL(input_value), VALUE(input_value) | `dmx_write_byte($dmx, math_number(0), math_number(0))` | `dmx.writeByte((uint8_t)constrain(1, 0, 255), 1);` |
| `dmx_read_byte` | Value | VAR(field_variable), CHANNEL(input_value) | `dmx_read_byte($dmx, math_number(0))` | `dmx.readByte(1)` |
| `dmx_data_available` | Value | VAR(field_variable) | `dmx_data_available($dmx)` | `dmx.dataAvailable()` |
| `dmx_update` | Statement | VAR(field_variable) | `dmx_update($dmx)` | `dmx.update();` |
| `dmx_update_ok` | Value | VAR(field_variable) | `dmx_update_ok($dmx)` | `dmx.update()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DIR | DMX_WRITE_DIR, DMX_READ_DIR | dmx_init, dmx_set_dir |

## ABS Examples

### Basic Usage
```
arduino_setup()
    dmx_init("dmx", 2, math_number(0), math_number(0), DMX_WRITE_DIR)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, dmx_read_byte($dmx, math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `dmx_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
