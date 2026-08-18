# SparkFun BMI270 6-DoF IMU

Blockly wrapper for the SparkFun BMI270 6-DoF IMU (accelerometer + gyroscope) library.

## Library Info
- **Name**: @aily-project/lib-sparkfun-bmi270
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bmi270_init_i2c` | Statement | VAR(field_input), ADDR(dropdown) | `bmi270_init_i2c("imu", "0x68")` | `Wire.begin(); ↵ while (imu.beginI2C(0x68) != 0) { delay(100); }` |
| `bmi270_get_data` | Statement | VAR(field_variable) | `bmi270_get_data($imu)` | `imu.getSensorData();` |
| `bmi270_get_accel` | Value | VAR(field_variable), AXIS(dropdown) | `bmi270_get_accel($imu, accelX)` | `imu.data.accelX` |
| `bmi270_get_gyro` | Value | VAR(field_variable), AXIS(dropdown) | `bmi270_get_gyro($imu, gyroX)` | `imu.data.gyroX` |
| `bmi270_get_temperature` | Value | VAR(field_variable) | `bmi270_get_temperature($imu)` | `(imu.getTemperature(&_bmi270_temp_imu), _bmi270_temp_imu)` |
| `bmi270_enable_step_counter` | Statement | VAR(field_variable) | `bmi270_enable_step_counter($imu)` | `imu.enableFeature(BMI2_STEP_DETECTOR); ↵ imu.enableFeature(BMI2_STEP_COUNTER); ↵ imu.enableFeature(BMI2_STEP_ACTIVITY);` |
| `bmi270_get_step_count` | Value | VAR(field_variable) | `bmi270_get_step_count($imu)` | `(imu.getStepCount(&_bmi270_steps_imu), _bmi270_steps_imu)` |
| `bmi270_reset_step_count` | Statement | VAR(field_variable) | `bmi270_reset_step_count($imu)` | `imu.resetStepCount();` |
| `bmi270_get_step_activity` | Value | VAR(field_variable) | `bmi270_get_step_activity($imu)` | `(imu.getStepActivity(&_bmi270_activity_imu), _bmi270_activity_imu)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDR | 0x68, 0x69 | bmi270_init_i2c |
| AXIS | accelX, accelY, accelZ | bmi270_get_accel |
| AXIS | gyroX, gyroY, gyroZ | bmi270_get_gyro |

## ABS Examples

### Basic Usage
```
arduino_setup()
    bmi270_init_i2c("imu", "0x68")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, bmi270_get_accel($imu, accelX))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `bmi270_init_i2c("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
