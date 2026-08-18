# 9-axis IMU sensor

9-axis IMU sensor library, supports QMI8658A six-axis sensor (accelerometer + gyroscope) and MMC5603NJ three-axis magnetic sensor, suitable for control board 3.0

## Library Info
- **Name**: @aily-project/lib-imu9dof
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `imu9dof_init` | Statement | VAR(field_input), WIRE(dropdown) | `imu9dof_init("imu", WIRE)` | `// 初始化9轴IMU传感器 imu ↵ if (imu.begin(&WIRE)) { ↵ Serial.println("9轴IMU传感器 imu 初始化成功!"); ↵ } else { ↵ Serial.println("警告: 9轴IMU传感器 imu 初始化失败，请检查接线!"); ↵ }` |
| `imu9dof_read_accel` | Value | VAR(field_variable), AXIS(dropdown) | `imu9dof_read_accel($imu, X)` | `({ float _ax, _ay, _az; imu.readAccel(&_ax, &_ay, &_az); _ax; })` |
| `imu9dof_read_gyro` | Value | VAR(field_variable), AXIS(dropdown) | `imu9dof_read_gyro($imu, X)` | `({ float _gx, _gy, _gz; imu.readGyro(&_gx, &_gy, &_gz); _gx; })` |
| `imu9dof_read_mag` | Value | VAR(field_variable), AXIS(dropdown) | `imu9dof_read_mag($imu, X)` | `({ float _mx, _my, _mz; imu.readMag(&_mx, &_my, &_mz); _mx; })` |
| `imu9dof_read_temperature` | Value | VAR(field_variable) | `imu9dof_read_temperature($imu)` | `imu.readTemperature()` |
| `imu9dof_compute_angles` | Statement | VAR(field_variable) | `imu9dof_compute_angles($imu)` | `imu.computeAngles();` |
| `imu9dof_read_angle` | Value | VAR(field_variable), ANGLE(dropdown) | `imu9dof_read_angle($imu, ROLL)` | `imu.getRoll()` |
| `imu9dof_calibrate_mag` | Statement | VAR(field_variable) | `imu9dof_calibrate_mag($imu)` | `imu.calibrateMag();` |
| `imu9dof_set_acc_range` | Statement | VAR(field_variable), RANGE(dropdown) | `imu9dof_set_acc_range($imu, QMI8658A_ACC_RANGE_2G)` | `imu.setAccRange(QMI8658A_ACC_RANGE_2G);` |
| `imu9dof_set_gyro_range` | Statement | VAR(field_variable), RANGE(dropdown) | `imu9dof_set_gyro_range($imu, QMI8658A_GYRO_RANGE_16DPS)` | `imu.setGyroRange(QMI8658A_GYRO_RANGE_16DPS);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| AXIS | X, Y, Z | imu9dof_read_accel, imu9dof_read_gyro, imu9dof_read_mag |
| ANGLE | ROLL, PITCH, YAW | imu9dof_read_angle |
| RANGE | QMI8658A_ACC_RANGE_2G, QMI8658A_ACC_RANGE_4G, QMI8658A_ACC_RANGE_8G, QMI8658A_ACC_RANGE_16G | imu9dof_set_acc_range |
| RANGE | QMI8658A_GYRO_RANGE_16DPS, QMI8658A_GYRO_RANGE_32DPS, QMI8658A_GYRO_RANGE_64DPS, QMI8658A_GYRO_RANGE_128DPS, QMI8658A_GYRO_RANGE_256DPS, QMI8658A_GYRO_RANGE_512DPS, QMI8658A_GYRO_RANGE_1024DPS, QMI8658A_GYRO_RANGE_204... | imu9dof_set_gyro_range |

## ABS Examples

### Basic Usage
```
arduino_setup()
    imu9dof_init("imu", WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, imu9dof_read_accel($imu, X))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `imu9dof_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **UI-only extension**: `imu9dof_init` refreshes board/I2C presentation only; it does not add ABS arguments.
