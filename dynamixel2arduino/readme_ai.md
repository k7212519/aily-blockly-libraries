# Dynamixel2Arduino

DYNAMIXEL bus setup, operating modes, goals, feedback, and control items.

## Library Info
- **Name**: @aily-project/lib-dynamixel2arduino
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `dynamixel_init` | Statement | VAR(field_input), SERIAL(dropdown), DIR(dropdown), BAUD(dropdown), PROTOCOL(dropdown) | `dynamixel_init("dxl", SERIAL, DIR, BAUD, "2.0")` | `using namespace ControlTableItem; ↵ Dynamixel2Arduino dxl(SERIAL, DIR); ↵ dxl.begin(BAUD); ↵ dxl.setPortProtocolVersion(2.0);` |
| `dynamixel_set_mode` | Statement | VAR(field_variable), ID(input_value), MODE(dropdown) | `dynamixel_set_mode($dxl, math_number(0), OP_POSITION)` | `dxl.torqueOff(1); ↵ dxl.setOperatingMode(1, OP_POSITION); ↵ dxl.torqueOn(1);` |
| `dynamixel_goal` | Statement | VAR(field_variable), ID(input_value), GOAL(dropdown), VALUE(input_value), UNIT(dropdown) | `dynamixel_goal($dxl, math_number(0), setGoalPosition, math_number(0), UNIT_RAW)` | `dxl.setGoalPosition(1, 1, UNIT_RAW);` |
| `dynamixel_read` | Value | VAR(field_variable), ID(input_value), DATA(dropdown), UNIT(dropdown) | `dynamixel_read($dxl, math_number(0), getPresentPosition, UNIT_RAW)` | `dxl.getPresentPosition(1, UNIT_RAW)` |
| `dynamixel_action` | Statement | VAR(field_variable), ID(input_value), ACTION(dropdown) | `dynamixel_action($dxl, math_number(0), torqueOn)` | `dxl.torqueOn(1);` |
| `dynamixel_ping` | Value | VAR(field_variable), ID(input_value) | `dynamixel_ping($dxl, math_number(0))` | `dxl.ping(1)` |
| `dynamixel_control_item` | Statement | VAR(field_variable), ID(input_value), ITEM(dropdown), VALUE(input_value) | `dynamixel_control_item($dxl, math_number(0), PROFILE_VELOCITY, math_number(0))` | `dxl.writeControlTableItem(PROFILE_VELOCITY, 1, 1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PROTOCOL | 2.0, 1.0 | dynamixel_init |
| MODE | OP_POSITION, OP_EXTENDED_POSITION, OP_VELOCITY, OP_PWM, OP_CURRENT, OP_CURRENT_BASED_POSITION | dynamixel_set_mode |
| GOAL | setGoalPosition, setGoalVelocity, setGoalCurrent, setGoalPWM | dynamixel_goal |
| UNIT | UNIT_RAW, UNIT_DEGREE, UNIT_RPM, UNIT_PERCENT | dynamixel_goal, dynamixel_read |
| DATA | getPresentPosition, getPresentVelocity, getPresentCurrent, getPresentPWM | dynamixel_read |
| ACTION | torqueOn, torqueOff, ledOn, ledOff, reboot, factoryReset | dynamixel_action |
| ITEM | PROFILE_VELOCITY, PROFILE_ACCELERATION, POSITION_P_GAIN, VELOCITY_LIMIT, CURRENT_LIMIT, TEMPERATURE_LIMIT | dynamixel_control_item |

## ABS Examples

### Basic Usage
```
arduino_setup()
    dynamixel_init("dxl", SERIAL, DIR, BAUD, "2.0")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, dynamixel_read($dxl, math_number(0), getPresentPosition, UNIT_RAW))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `dynamixel_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
