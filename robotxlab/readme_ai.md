# RobotXlab robot control library

Robot control library based on Arduino UNO R3, supporting dual motor drive, servo control, ultrasonic ranging, line following sensor, photosensitive sensor, infrared obstacle avoidance, infrared remote control, PS2 ha...

## Library Info
- **Name**: @aily-project/lib-robotxlab
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `robotxlab_motor` | Statement | DIRECTION(dropdown), SPEED(input_value) | `robotxlab_motor("0", math_number(255))` | `run(0, 1);` |
| `robotxlab_servo` | Statement | ANGLE(input_value) | `robotxlab_servo(math_number(90))` | `myservo.write(1);` |
| `robotxlab_servo_pulse` | Statement | ANGLE(input_value) | `robotxlab_servo_pulse(math_number(90))` | `servopulse(1);` |
| `robotxlab_led` | Statement | STATE(dropdown) | `robotxlab_led(HIGH)` | `digitalWrite(led, HIGH);` |
| `robotxlab_buzzer` | Statement | STATE(dropdown) | `robotxlab_buzzer(HIGH)` | `digitalWrite(buzz, HIGH);` |
| `robotxlab_ultrasonic` | Value | (none) | `robotxlab_ultrasonic()` | `sr04.Distance()` |
| `robotxlab_button` | Value | STATE(dropdown) | `robotxlab_button("1")` | `My_click() == 1` |
| `robotxlab_line_tracking` | Value | PORT(dropdown), VALUE(dropdown) | `robotxlab_line_tracking("2", "1")` | `digitalRead(Sensor_2) == 1` |
| `robotxlab_light_analog` | Value | PORT(dropdown) | `robotxlab_light_analog("4")` | `analogRead(LightSensor_4)` |
| `robotxlab_light_digital` | Value | PORT(dropdown), VALUE(dropdown) | `robotxlab_light_digital("4", "0")` | `digitalRead(LightSensor_4) == 0` |
| `robotxlab_ir_obstacle` | Value | PORT(dropdown), VALUE(dropdown) | `robotxlab_ir_obstacle("4", "0")` | `digitalRead(RedSensor_4) == 0` |
| `robotxlab_ir_remote` | Value | KEY(dropdown) | `robotxlab_ir_remote("1")` | `Get_IRremote() == IR_1` |
| `robotxlab_ps2_button` | Value | KEY(dropdown) | `robotxlab_ps2_button("1")` | `Get_PS2_key() == SP2Key_1` |
| `robotxlab_ps2_rocker` | Value | ROCKER(dropdown), DIR(dropdown) | `robotxlab_ps2_rocker("0", "0")` | `Get_PS2_rocker(0, 0)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DIRECTION | 0, 1 | robotxlab_motor |
| STATE | HIGH, LOW | robotxlab_led, robotxlab_buzzer |
| STATE | 1, 0 | robotxlab_button |
| PORT | 2, 3 | robotxlab_line_tracking |
| VALUE | 1, 0 | robotxlab_line_tracking |
| PORT | 4, 5 | robotxlab_light_analog, robotxlab_light_digital, robotxlab_ir_obstacle |
| VALUE | 0, 1 | robotxlab_light_digital, robotxlab_ir_obstacle |
| KEY | 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16 | robotxlab_ir_remote |
| KEY | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 | robotxlab_ps2_button |
| ROCKER | 0, 1 | robotxlab_ps2_rocker |
| DIR | 0, 2, -1 | robotxlab_ps2_rocker |

## ABS Examples

### Basic Usage
```
arduino_setup()
    robotxlab_motor("0", math_number(255))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, robotxlab_ultrasonic())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
