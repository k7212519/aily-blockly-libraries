# R4 CAN bus communication library

CAN bus communication library for Arduino UNO R4, supporting sending and receiving of CAN messages

## Library Info
- **Name**: @aily-project/lib-r4-can
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `can_begin` | Statement | BITRATE(dropdown) | `can_begin(CanBitRate::BR_125k)` | `CAN1.begin(CanBitRate::BR_125k);` |
| `can_available` | Value | (none) | `can_available()` | `CAN1.available()` |
| `can_read` | Statement | VAR(field_variable) | `can_read($canMsg)` | `canMsg = CAN1.read();` |
| `can_create_message` | Value | ID(input_value), DATA(input_value) | `can_create_message(math_number(0), math_number(0))` | `CANMessage(1, 1)` |
| `can_write` | Statement | MSG(input_value) | `can_write(text("value"))` | `CAN1.write(1);` |
| `can_get_message_id` | Value | VAR(field_variable) | `can_get_message_id($canMsg)` | `canMsg.id` |
| `can_get_message_data` | Value | VAR(field_variable), INDEX(input_value) | `can_get_message_data($canMsg, math_number(0))` | `canMsg.data[1]` |
| `can_set_filter_mask` | Statement | TYPE(dropdown), MASK(input_value) | `can_set_filter_mask(Standard, math_number(0))` | `CAN.setFilterMask_Standard(1);` |
| `can_set_filter_id` | Statement | TYPE(dropdown), ID(input_value) | `can_set_filter_id(Standard, math_number(0))` | `CAN.setFilterId_Standard(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BITRATE | CanBitRate::BR_125k, CanBitRate::BR_250k, CanBitRate::BR_500k, CanBitRate::BR_1m | can_begin |
| TYPE | Standard, Extended | can_set_filter_mask, can_set_filter_id |

## ABS Examples

### Basic Usage
```
arduino_setup()
    can_begin(CanBitRate::BR_125k)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, can_available())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
