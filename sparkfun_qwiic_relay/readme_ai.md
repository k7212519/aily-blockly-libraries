# SparkFun Qwiic Relay

Blockly wrapper for SparkFun Qwiic Relay (single and quad relay modules).

## Library Info
- **Name**: @aily-project/lib-sparkfun-qwiic-relay
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `qwiic_relay_init` | Statement | VAR(field_input), ADDR(dropdown) | `qwiic_relay_init("relay", SINGLE_RELAY_DEFAULT_ADDRESS)` | `relay.begin();` |
| `qwiic_relay_on` | Statement | VAR(field_variable) | `qwiic_relay_on($relay)` | `relay.turnRelayOn();` |
| `qwiic_relay_off` | Statement | VAR(field_variable) | `qwiic_relay_off($relay)` | `relay.turnRelayOff();` |
| `qwiic_relay_toggle` | Statement | VAR(field_variable) | `qwiic_relay_toggle($relay)` | `relay.toggleRelay();` |
| `qwiic_relay_on_num` | Statement | VAR(field_variable), NUM(input_value) | `qwiic_relay_on_num($relay, math_number(0))` | `relay.turnRelayOn(1);` |
| `qwiic_relay_off_num` | Statement | VAR(field_variable), NUM(input_value) | `qwiic_relay_off_num($relay, math_number(0))` | `relay.turnRelayOff(1);` |
| `qwiic_relay_all_on` | Statement | VAR(field_variable) | `qwiic_relay_all_on($relay)` | `relay.turnAllRelaysOn();` |
| `qwiic_relay_all_off` | Statement | VAR(field_variable) | `qwiic_relay_all_off($relay)` | `relay.turnAllRelaysOff();` |
| `qwiic_relay_get_state` | Value | VAR(field_variable) | `qwiic_relay_get_state($relay)` | `relay.getState()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDR | SINGLE_RELAY_DEFAULT_ADDRESS, QUAD_RELAY_DEFAULT_ADDRESS | qwiic_relay_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    qwiic_relay_init("relay", SINGLE_RELAY_DEFAULT_ADDRESS)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, qwiic_relay_get_state($relay))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `qwiic_relay_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
