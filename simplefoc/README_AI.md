# SimpleFOC

BLDC and Stepper motor FOC control library

## Library Info
- **Name**: @aily-project/lib-simplefoc
- **Version**: 2.4.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `simplefoc_bldc_create` | Statement | VAR(field_input), POLE_PAIRS(input_value), R(input_value), KV(input_value) | `simplefoc_bldc_create("motor", math_number(0), math_number(0), math_number(0))` | `BLDCMotor motor = BLDCMotor(1, 1, 1);` |
| `simplefoc_stepper_create` | Statement | VAR(field_input), POLE_PAIRS(input_value), R(input_value) | `simplefoc_stepper_create("stepper", math_number(0), math_number(0))` | `StepperMotor stepper = StepperMotor(1, 1);` |
| `simplefoc_driver_3pwm_create` | Statement | VAR(field_input), PIN_A(input_value), PIN_B(input_value), PIN_C(input_value), ENABLE(input_value) | `simplefoc_driver_3pwm_create("driver", math_number(2), math_number(2), math_number(2), math_number(0))` | `BLDCDriver3PWM driver = BLDCDriver3PWM(1, 1, 1, 1);` |
| `simplefoc_driver_6pwm_create` | Statement | VAR(field_input), PIN_AH(input_value), PIN_AL(input_value), PIN_BH(input_value), PIN_BL(input_value), PIN_CH(input_value), PIN_CL(input_value) | `simplefoc_driver_6pwm_create("driver", math_number(2), math_number(2), math_number(2), math_number(2), math_number(2), math_number(2))` | `BLDCDriver6PWM driver = BLDCDriver6PWM(1, 1, 1, 1, 1, 1);` |
| `simplefoc_encoder_create` | Statement | VAR(field_input), PIN_A(input_value), PIN_B(input_value), CPR(input_value) | `simplefoc_encoder_create("encoder", math_number(2), math_number(2), math_number(0))` | `Encoder encoder = Encoder(1, 1, 1); ↵ void doA_encoder(){encoder.handleA();} ↵ void doB_encoder(){encoder.handleB();}` |
| `simplefoc_magnetic_spi_create` | Statement | VAR(field_input), CS(input_value) | `simplefoc_magnetic_spi_create("sensor", math_number(0))` | `MagneticSensorSPI sensor = MagneticSensorSPI(1);` |
| `simplefoc_magnetic_i2c_create` | Statement | VAR(field_input), ADDRESS(input_value) | `simplefoc_magnetic_i2c_create("sensor", math_number(0))` | `MagneticSensorI2C sensor = MagneticSensorI2C(1);` |
| `simplefoc_motor_link_driver` | Statement | MOTOR(field_variable), DRIVER(field_variable) | `simplefoc_motor_link_driver($motor, $driver)` | `motor.linkDriver(&driver);` |
| `simplefoc_motor_link_sensor` | Statement | MOTOR(field_variable), SENSOR(field_variable) | `simplefoc_motor_link_sensor($motor, $encoder)` | `motor.linkSensor(&encoder);` |
| `simplefoc_driver_init` | Statement | DRIVER(field_variable), VOLTAGE(input_value) | `simplefoc_driver_init($driver, math_number(0))` | `driver.voltage_power_supply = 1; ↵ driver.init();` |
| `simplefoc_sensor_init` | Statement | SENSOR(field_variable) | `simplefoc_sensor_init($encoder)` | `encoder.init();` |
| `simplefoc_encoder_enable_interrupts` | Statement | SENSOR(field_variable) | `simplefoc_encoder_enable_interrupts($encoder)` | `encoder.enableInterrupts(doA_encoder, doB_encoder);` |
| `simplefoc_motor_init` | Statement | MOTOR(field_variable) | `simplefoc_motor_init($motor)` | `motor.init();` |
| `simplefoc_motor_initfoc` | Statement | MOTOR(field_variable) | `simplefoc_motor_initfoc($motor)` | `motor.initFOC();` |
| `simplefoc_motor_set_controller` | Statement | MOTOR(field_variable), MODE(dropdown) | `simplefoc_motor_set_controller($motor, torque)` | `motor.controller = MotionControlType::torque;` |
| `simplefoc_motor_set_torque` | Statement | MOTOR(field_variable), MODE(dropdown) | `simplefoc_motor_set_torque($motor, voltage)` | `motor.torque_controller = TorqueControlType::voltage;` |
| `simplefoc_motor_move` | Statement | MOTOR(field_variable), TARGET(input_value) | `simplefoc_motor_move($motor, math_number(0))` | `motor.move(1);` |
| `simplefoc_motor_loopfoc` | Statement | MOTOR(field_variable) | `simplefoc_motor_loopfoc($motor)` | `motor.loopFOC();` |
| `simplefoc_motor_pid_velocity` | Statement | MOTOR(field_variable), P(input_value), I(input_value), D(input_value), RAMP(input_value), LIMIT(input_value) | `simplefoc_motor_pid_velocity($motor, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `motor.PID_velocity.P = 1; ↵ motor.PID_velocity.I = 1; ↵ motor.PID_velocity.D = 1; ↵ motor.PID_velocity.output_ramp = 1; ↵ motor.PID_velocity.limit = 1;` |
| `simplefoc_motor_pid_angle` | Statement | MOTOR(field_variable), P(input_value), VEL_LIMIT(input_value) | `simplefoc_motor_pid_angle($motor, math_number(0), math_number(0))` | `motor.P_angle.P = 1; ↵ motor.velocity_limit = 1;` |
| `simplefoc_motor_pid_current` | Statement | MOTOR(field_variable), P(input_value), I(input_value), D(input_value), LIMIT(input_value) | `simplefoc_motor_pid_current($motor, math_number(0), math_number(0), math_number(0), math_number(0))` | `motor.PID_current_q.P = 1; ↵ motor.PID_current_q.I = 1; ↵ motor.PID_current_q.D = 1; ↵ motor.PID_current_q.limit = 1; ↵ motor.PID_current_d.P = 1; ↵ motor.PID_current_d.I = 1; ↵ motor.PID_current_d.D = 1; ↵ motor.PID_current_d.limit = 1;` |
| `simplefoc_motor_set_limits` | Statement | MOTOR(field_variable), VOLTAGE_LIMIT(input_value), CURRENT_LIMIT(input_value) | `simplefoc_motor_set_limits($motor, math_number(0), math_number(0))` | `motor.voltage_limit = 1; ↵ motor.current_limit = 1;` |
| `simplefoc_motor_get_angle` | Value | MOTOR(field_variable) | `simplefoc_motor_get_angle($motor)` | `motor.shaftAngle()` |
| `simplefoc_motor_get_velocity` | Value | MOTOR(field_variable) | `simplefoc_motor_get_velocity($motor)` | `motor.shaftVelocity()` |
| `simplefoc_motor_enable` | Statement | MOTOR(field_variable) | `simplefoc_motor_enable($motor)` | `motor.enable();` |
| `simplefoc_motor_disable` | Statement | MOTOR(field_variable) | `simplefoc_motor_disable($motor)` | `motor.disable();` |
| `simplefoc_lowside_current_sense_create` | Statement | VAR(field_input), PIN_A(input_value), PIN_B(input_value), PIN_C(input_value), SHUNT_R(input_value), GAIN(input_value) | `simplefoc_lowside_current_sense_create("current_sense", math_number(2), math_number(2), math_number(2), math_number(0), math_number(0))` | `LowsideCurrentSense current_sense = LowsideCurrentSense(1, 1, 1, 1, 1);` |
| `simplefoc_current_sense_link_driver` | Statement | CURRENT_SENSE(field_variable), DRIVER(field_variable) | `simplefoc_current_sense_link_driver($current_sense, $driver)` | `current_sense.linkDriver(&driver);` |
| `simplefoc_motor_link_current_sense` | Statement | MOTOR(field_variable), CURRENT_SENSE(field_variable) | `simplefoc_motor_link_current_sense($motor, $current_sense)` | `motor.linkCurrentSense(&current_sense);` |
| `simplefoc_current_sense_init` | Statement | CURRENT_SENSE(field_variable) | `simplefoc_current_sense_init($current_sense)` | `current_sense.init();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | torque, velocity, angle, velocity_openloop, angle_openloop | simplefoc_motor_set_controller |
| MODE | voltage, dc_current, foc_current, estimated_current | simplefoc_motor_set_torque |

## ABS Examples

### Basic Usage
```
arduino_setup()
    simplefoc_bldc_create("motor", math_number(0), math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, simplefoc_motor_get_angle($motor))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `simplefoc_bldc_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
