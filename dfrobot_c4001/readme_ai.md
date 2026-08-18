# C4001 mmWave Radar

Aily Blockly library for the DFRobot C4001 human presence radar.

## Library Info
- **Name**: @aily-project/lib-dfrobot-c4001
- **Version**: 0.1.0
- **Author**: DFRobot
- **Source**: https://github.com/DFRobot/DFRobot_C4001
- **License**: MIT

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `c4001_init_i2c` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(dropdown) | `c4001_init_i2c("c4001", Wire, DEVICE_ADDR_0)` | `while (!c4001.begin()) { ↵ delay(1000); ↵ }` |
| `c4001_init_uart` | Statement | VAR(field_input), SERIAL(dropdown), RX(input_value), TX(input_value) | `c4001_init_uart("c4001", Serial1, math_number(26), math_number(25))` | `while (!c4001.begin()) { ↵ delay(1000); ↵ }` |
| `c4001_motion_detected` | Value | VAR(field_variable) | `c4001_motion_detected($c4001)` | `c4001.motionDetection()` |
| `c4001_set_mode` | Statement | VAR(field_variable), MODE(dropdown) | `c4001_set_mode($c4001, eExitMode)` | `c4001.setSensorMode(eExitMode);` |
| `c4001_sensor_command` | Statement | VAR(field_variable), COMMAND(dropdown) | `c4001_sensor_command($c4001, eStartSen)` | `c4001.setSensor(eStartSen);` |
| `c4001_get_status` | Value | VAR(field_variable), STATUS(dropdown) | `c4001_get_status($c4001, WORK)` | `c4001.getStatus().workStatus` |
| `c4001_set_presence_range` | Statement | VAR(field_variable), MIN(input_value), MAX(input_value), TRIG(input_value) | `c4001_set_presence_range($c4001, math_number(30), math_number(1000), math_number(1000))` | `c4001.setDetectionRange(1, 1, 1);` |
| `c4001_set_sensitivity` | Statement | VAR(field_variable), TYPE(dropdown), SENSITIVITY(input_value) | `c4001_set_sensitivity($c4001, TRIG, math_number(5))` | `c4001.setTrigSensitivity(1);` |
| `c4001_set_delay` | Statement | VAR(field_variable), TRIG(input_value), KEEP(input_value) | `c4001_set_delay($c4001, math_number(100), math_number(4))` | `c4001.setDelay(1, 1);` |
| `c4001_get_presence_config` | Value | VAR(field_variable), DATA(dropdown) | `c4001_get_presence_config($c4001, MIN)` | `c4001.getMinRange()` |
| `c4001_set_io_polarity` | Statement | VAR(field_variable), POLARITY(dropdown) | `c4001_set_io_polarity($c4001, 1)` | `c4001.setIoPolaity(0);` |
| `c4001_set_pwm` | Statement | VAR(field_variable), PWM1(input_value), PWM2(input_value), TIMER(input_value) | `c4001_set_pwm($c4001, math_number(50), math_number(0), math_number(10))` | `c4001.setPwm(1, 1, 1);` |
| `c4001_get_target` | Value | VAR(field_variable), DATA(dropdown) | `c4001_get_target($c4001, NUMBER)` | `c4001.getTargetNumber()` |
| `c4001_set_speed_threshold` | Statement | VAR(field_variable), MIN(input_value), MAX(input_value), THRESHOLD(input_value) | `c4001_set_speed_threshold($c4001, math_number(30), math_number(1200), math_number(10))` | `c4001.setDetectThres(1, 1, 1);` |
| `c4001_set_micro_motion` | Statement | VAR(field_variable), STATE(dropdown) | `c4001_set_micro_motion($c4001, eON)` | `c4001.setFrettingDetection(eON);` |
| `c4001_get_speed_config` | Value | VAR(field_variable), DATA(dropdown) | `c4001_get_speed_config($c4001, MIN)` | `c4001.getTMinRange()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | DEVICE_ADDR_0, DEVICE_ADDR_1 | I2C address 0x2A/0x2B |
| MODE | eExitMode, eSpeedMode | presence mode or speed/range mode |
| COMMAND | eStartSen, eStopSen, eResetSen, eRecoverSen, eSaveParams, eChangeMode | sensor command |
| STATUS | WORK, MODE, INIT | `getStatus()` member |
| DATA | block-specific dropdown values | presence config, target data, or speed config |

## ABS Examples

```
arduino_setup()
    c4001_init_i2c("c4001", Wire, DEVICE_ADDR_0)
    c4001_set_mode($c4001, eExitMode)

arduino_loop()
    serial_println(Serial, c4001_motion_detected($c4001))
```

## Notes

1. `c4001_init_i2c` and `c4001_init_uart` create `$name` as `DFRobot_C4001`.
2. UART baud rate is fixed at 9600 by the upstream driver.
3. In speed mode, call target number before speed/range/energy to refresh the driver's internal cache.
4. IO polarity and PWM are meaningful for UART modules; I2C driver methods return default values.
