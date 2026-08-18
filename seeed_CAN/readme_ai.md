# Seeed CAN

SeeedStudio CAN bus communication library, supports MCP2515 and MCP2518FD controllers

## Library Info
- **Name**: @aily-project/lib-seeed-can
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_can_create` | Statement | VAR(field_input), CS_PIN(field_number) | `seeed_can_create("can", 9)` | `mcp2515_can can(9);` |
| `seeed_can_begin` | Statement | VAR(field_variable), SPEED(dropdown), CLOCK(dropdown) | `seeed_can_begin($can, CAN_5KBPS, MCP_8MHz)` | `can.begin(CAN_5KBPS, MCP_8MHz);` |
| `seeed_can_send` | Statement | VAR(field_variable), ID(input_value), EXT(dropdown), DATA(input_value) | `seeed_can_send($can, math_number(0), "0", text("value"))` | `can.sendMsgBuf(1, 0, 8, "value");` |
| `seeed_can_receive_check` | Value | VAR(field_variable) | `seeed_can_receive_check($can)` | `(can.checkReceive() == CAN_MSGAVAIL)` |
| `seeed_can_receive` | Statement | VAR(field_variable), LEN(field_variable), ID(field_variable), DATA(field_variable) | `seeed_can_receive($can, $len, $id, $data)` | `can.readMsgBuf(&len, data); ↵ id = can.getCanId();` |
| `seeed_can_get_id` | Value | VAR(field_variable) | `seeed_can_get_id($can)` | `can.getCanId()` |
| `seeed_can_init_mask` | Statement | VAR(field_variable), NUM(dropdown), EXT(dropdown), MASK(input_value) | `seeed_can_init_mask($can, "0", "0", math_number(0))` | `can.init_Mask(0, 0, 1);` |
| `seeed_can_init_filter` | Statement | VAR(field_variable), NUM(dropdown), EXT(dropdown), FILTER(input_value) | `seeed_can_init_filter($can, "0", "0", math_number(0))` | `can.init_Filt(0, 0, 1);` |
| `seeed_can_set_mode` | Statement | VAR(field_variable), MODE(dropdown) | `seeed_can_set_mode($can, MODE_NORMAL)` | `can.setMode(MODE_NORMAL);` |
| `seeed_can_sleep` | Statement | VAR(field_variable) | `seeed_can_sleep($can)` | `can.sleep();` |
| `seeed_can_wake` | Statement | VAR(field_variable) | `seeed_can_wake($can)` | `can.wake();` |
| `seeed_can_check_error` | Value | VAR(field_variable) | `seeed_can_check_error($can)` | `can.checkError()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SPEED | CAN_5KBPS, CAN_10KBPS, CAN_20KBPS, CAN_25KBPS, CAN_31K25BPS, CAN_33KBPS, CAN_40KBPS, CAN_50KBPS, CAN_80KBPS, CAN_83K3BPS, CAN_95KBPS, CAN_95K2BPS, CAN_100KBPS, CAN_125KBPS, CAN_200KBPS, CAN_250KBPS, CAN_500KBPS, CAN_6... | seeed_can_begin |
| CLOCK | MCP_8MHz, MCP_12MHz, MCP_16MHz | seeed_can_begin |
| EXT | 0, 1 | seeed_can_send, seeed_can_init_mask, seeed_can_init_filter |
| NUM | 0, 1 | seeed_can_init_mask |
| NUM | 0, 1, 2, 3, 4, 5 | seeed_can_init_filter |
| MODE | MODE_NORMAL, MODE_SLEEP, MODE_LISTEN, MODE_CONFIG | seeed_can_set_mode |

## ABS Examples

### Basic Usage
```
arduino_setup()
    seeed_can_create("can", 9)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, seeed_can_receive_check($can))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `seeed_can_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
