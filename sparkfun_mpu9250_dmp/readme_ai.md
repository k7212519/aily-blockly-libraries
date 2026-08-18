# SparkFun MPU-9250 DMP IMU

Blockly wrapper for the SparkFun MPU-9250 9-DoF IMU with DMP support.

## Library Info
- **Name**: @aily-project/lib-sparkfun-mpu9250-dmp
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mpu9250_init` | Statement | VAR(field_input) | `mpu9250_init("imu")` | `imu.begin();` |
| `mpu9250_set_sensors` | Statement | VAR(field_variable), ACCEL(dropdown), GYRO(dropdown), COMPASS(dropdown) | `mpu9250_set_sensors($imu, "1", "1", "1")` | `imu.setSensors(INV_XYZ_ACCEL &#124; INV_XYZ_GYRO &#124; INV_XYZ_COMPASS);` |
| `mpu9250_set_gyro_fsr` | Statement | VAR(field_variable), FSR(dropdown) | `mpu9250_set_gyro_fsr($imu, "250")` | `imu.setGyroFSR(250);` |
| `mpu9250_set_accel_fsr` | Statement | VAR(field_variable), FSR(dropdown) | `mpu9250_set_accel_fsr($imu, "2")` | `imu.setAccelFSR(2);` |
| `mpu9250_set_lpf` | Statement | VAR(field_variable), LPF(dropdown) | `mpu9250_set_lpf($imu, "5")` | `imu.setLPF(5);` |
| `mpu9250_set_sample_rate` | Statement | VAR(field_variable), RATE(input_value) | `mpu9250_set_sample_rate($imu, math_number(0))` | `imu.setSampleRate(1);` |
| `mpu9250_data_ready` | Value | VAR(field_variable) | `mpu9250_data_ready($imu)` | `imu.dataReady()` |
| `mpu9250_update` | Statement | VAR(field_variable) | `mpu9250_update($imu)` | `imu.update(UPDATE_ACCEL &#124; UPDATE_GYRO &#124; UPDATE_COMPASS);` |
| `mpu9250_get_accel` | Value | VAR(field_variable), AXIS(dropdown) | `mpu9250_get_accel($imu, ax)` | `imu.ax` |
| `mpu9250_get_gyro` | Value | VAR(field_variable), AXIS(dropdown) | `mpu9250_get_gyro($imu, gx)` | `imu.gx` |
| `mpu9250_get_compass` | Value | VAR(field_variable), AXIS(dropdown) | `mpu9250_get_compass($imu, mx)` | `imu.mx` |
| `mpu9250_get_temperature` | Value | VAR(field_variable) | `mpu9250_get_temperature($imu)` | `imu.temperature` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ACCEL | 1, 0 | mpu9250_set_sensors |
| GYRO | 1, 0 | mpu9250_set_sensors |
| COMPASS | 1, 0 | mpu9250_set_sensors |
| FSR | 250, 500, 1000, 2000 | mpu9250_set_gyro_fsr |
| FSR | 2, 4, 8, 16 | mpu9250_set_accel_fsr |
| LPF | 5, 10, 20, 42, 98, 188 | mpu9250_set_lpf |
| AXIS | ax, ay, az | mpu9250_get_accel |
| AXIS | gx, gy, gz | mpu9250_get_gyro |
| AXIS | mx, my, mz | mpu9250_get_compass |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mpu9250_init("imu")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mpu9250_data_ready($imu))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `mpu9250_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
