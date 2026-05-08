# 逐飞麦轮车控制

逐飞 B1 麦轮车控制 Blockly 库，覆盖底盘运动、声光输出、按键、灰度传感、OpenART mini 视觉与机械臂。

## Library Info

- **Name**: @aily-project/lib-seekfree_b1_controller
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|---|---|---|---|---|
| `four_driver_init` | Statement | none | `four_driver_init()` | setup: `esp32c3_can.begin(); four_driver.begin();` |
| `four_driver_set_speed` | Statement | speed1(input_value), speed2(input_value), speed3(input_value), speed4(input_value) | `four_driver_set_speed(math_number(50), math_number(50), math_number(50), math_number(50))` | `four_driver.set_speed(1, 0..3, value);` |
| `four_driver_move` | Statement | DIRECTION(dropdown), DISTANCE(input_value), SPEED(input_value) | `four_driver_move(0, math_number(10), math_number(50))` | `four_driver.move(direction, speed, distance);` |
| `four_driver_keep_move` | Statement | DIRECTION(dropdown), SPEED(input_value) | `four_driver_keep_move(0, math_number(50))` | `four_driver.keep_move(direction, speed);` |
| `four_driver_turn` | Statement | DIRECTION(dropdown), ANGLE(input_value), SPEED(input_value) | `four_driver_turn(1, math_number(90), math_number(50))` | `four_driver.turn(direction * angle * 10, speed);` |
| `four_driver_track` | Value | coord_x(input_value), coord_y(input_value) | `four_driver_track(math_number(80), math_number(60))` | `four_driver.track(x, y)` |
| `four_driver_calibration_gyro` | Statement | none | `four_driver_calibration_gyro()` | `four_driver.calibration_gyro();` |
| `four_driver_calibration_head` | Statement | ANGLE(input_value) | `four_driver_calibration_head(math_number(0))` | `four_driver.calibration_head(angle);` |
| `beep_begin` | Statement | none | `beep_begin()` | setup: `pinMode(21, OUTPUT); digitalWrite(21, HIGH);` |
| `beep_set` | Statement | STATE(dropdown) | `beep_set(0)` | `digitalWrite(21, state);` |
| `led_begin` | Statement | none | `led_begin()` | setup: `pinMode(35/36/37, OUTPUT);` |
| `led_set` | Statement | PIN(dropdown), STATE(dropdown) | `led_set(35, 0)` | `digitalWrite(pin, state);` |
| `key_gpio_begin` | Statement | none | `key_gpio_begin()` | setup: `key_gpio.begin();` |
| `key_gpio_read` | Value | KEY_ID(dropdown), STATE(dropdown) | `key_gpio_read(0, 1)` | `key_gpio.read_state(key_id, state)` |
| `photoelectricity_init` | Statement | power_index(dropdown) | `photoelectricity_init(0)` | setup: `location.begin(power_index);` |
| `photoelectricity_set_black` | Statement | DEVICE_ID(dropdown) | `photoelectricity_set_black(1)` | `location.set_black(device_id);` |
| `photoelectricity_set_white` | Statement | DEVICE_ID(dropdown) | `photoelectricity_set_white(1)` | `location.set_white(device_id);` |
| `photoelectricity_get_position` | Value | DEVICE_ID(dropdown) | `photoelectricity_get_position(1)` | `location.get_position(device_id, photoelectricity_position)` |
| `photoelectricity_get_value` | Value | DEVICE_ID(dropdown), CHANNEL(dropdown) | `photoelectricity_get_value(1, 0)` | `location.get_value(device_id, channel, photoelectricity_value)` |
| `photoelectricity_get_value_bin` | Value | DEVICE_ID(dropdown), CHANNEL(dropdown) | `photoelectricity_get_value_bin(1, 0)` | `location.get_value_bin(device_id, channel, photoelectricity_value_bin)` |
| `photoelectricity_get_black_num` | Value | DEVICE_ID(dropdown) | `photoelectricity_get_black_num(1)` | `location.get_black_num(device_id, black_num)` |
| `photoelectricity_get_white_num` | Value | DEVICE_ID(dropdown) | `photoelectricity_get_white_num(1)` | `location.get_white_num(device_id, white_num)` |
| `openart_mini_begin` | Statement | none | `openart_mini_begin()` | setup: `openart_mini.begin();` |
| `openart_mini_detection_object_easy` | Statement | VALUE(dropdown) | `openart_mini_detection_object_easy(1)` | `openart_mini.detection_object_easy(type);` |
| `openart_mini_detection_object` | Statement | L_MIN(input_value), L_MAX(input_value), A_MIN(input_value), A_MAX(input_value), B_MIN(input_value), B_MAX(input_value) | `openart_mini_detection_object(math_number(39), math_number(84), math_number(-24), math_number(41), math_number(43), math_number(82))` | `openart_mini.detection_object(lMin, lMax, aMin, aMax, bMin, bMax);` |
| `openart_mini_detection_apriltag` | Statement | none | `openart_mini_detection_apriltag()` | `openart_mini.detection_apriltag();` |
| `openart_mini_detection_stop` | Statement | none | `openart_mini_detection_stop()` | `openart_mini.detection_stop();` |
| `openart_mini_get_result` | Value | TYPE(dropdown) | `openart_mini_get_result(1)` | `openart_mini.get_result(type)` |
| `openart_mini_get_coord_x` | Value | TYPE(dropdown) | `openart_mini_get_coord_x(1)` | `openart_mini.get_coord_x(type)` |
| `openart_mini_get_coord_y` | Value | TYPE(dropdown) | `openart_mini_get_coord_y(1)` | `openart_mini.get_coord_y(type)` |
| `robotic_arm_init` | Statement | none | `robotic_arm_init()` | setup: `robot_arm.begin();` |
| `robotic_arm_set_servo_motor_angle` | Statement | channel(dropdown), angle(input_value) | `robotic_arm_set_servo_motor_angle(0, math_number(90))` | `robot_arm.set_servo_motor_angle(1, channel, angle * 10);` |
| `robotic_arm_set_servo_motor_offset_angle` | Statement | channel(dropdown), angle(input_value) | `robotic_arm_set_servo_motor_offset_angle(0, math_number(0))` | `robot_arm.set_servo_motor_offset_angle(1, channel, angle * 10);` |
| `robotic_arm_get_servo_motor_angle` | Value | channel(dropdown) | `robotic_arm_get_servo_motor_angle(0)` | `robot_arm.get_servo_motor_angle(1, channel, angle)` |

## Parameter Options

| Parameter | Values | Description |
|---|---|---|
| DIRECTION | `0` forward, `1` backward, `2` shift left, `3` shift right | Mecanum chassis movement direction |
| TURN DIRECTION | `1` turn left, `-1` turn right | Signed turn direction |
| STATE | `0` on, `1` off | Buzzer and LED output state |
| PIN | `35` green LED, `36` blue LED, `37` red LED | Onboard LED pin selection |
| KEY_ID | `0` button 1, `1` button 2, `2` button 3, `3` button 4 | Onboard button index |
| KEY STATE | `0` not pressed, `1` pressed, `2` long pressing, `3` pressed and released | State to test in `key_gpio_read` |
| power_index | `0` port 1, `1` port 2, `2` port 3, `3` port 4 | Grayscale sensor interface |
| DEVICE_ID | `1` sensor 1, `2` sensor 2, `3` sensor 3, `4` sensor 4 | Grayscale sensor device ID |
| CHANNEL | `0`..`7` | Grayscale sensor channel 1..8 |
| VALUE | `1` yellow, `2` green, `3` red, `4` black | Easy object color for OpenART mini |
| TYPE | `1` object, `2` AprilTag code | OpenART mini result type |
| channel | `0`..`5` | Servo channel display 1..6 |

## ABS Examples

### Basic Car Motion

```abs
arduino_setup()
    four_driver_init()
    led_begin()
    beep_begin()

arduino_loop()
    four_driver_move(0, math_number(50), math_number(40))
    led_set(35, 0)
    beep_set(1)
```

### Grayscale And Vision

```abs
arduino_setup()
    photoelectricity_init(0)
    openart_mini_begin()

arduino_loop()
    openart_mini_detection_object_easy(1)
    four_driver_track(openart_mini_get_coord_x(1), openart_mini_get_coord_y(1))
```

### Robotic Arm

```abs
arduino_setup()
    robotic_arm_init()

arduino_loop()
    robotic_arm_set_servo_motor_angle(0, math_number(90))
    robotic_arm_set_servo_motor_offset_angle(0, math_number(0))
```

## Notes

1. Initialization blocks should be placed in `arduino_setup()` before read/write blocks from the same module.
2. Numeric dropdown values are generator values; use the values listed above, not translated labels.
3. Number inputs are `input_value` slots, so use `math_number(n)` or another value block.
4. `four_driver_init`, `photoelectricity_init`, and `robotic_arm_init` add CAN-related objects and setup code automatically.