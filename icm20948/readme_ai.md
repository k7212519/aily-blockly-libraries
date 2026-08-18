# ICM20948 nine-axis sensor

ICM20948 nine-axis sensor support library supports accelerometer, gyroscope, magnetometer and AHRS attitude calculation

## Library Info
- **Name**: @aily-project/lib-icm20948
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `icm20948_init` | Statement | ADDRESS(dropdown) | `icm20948_init("1")` | `ICM_20948_I2C myICM; ↵ bool icm_initialized = false; ↵ if (!icm_initialized) { ↵ Wire.begin(); ↵ Wire.setClock(400000); ↵ myICM.begin(Wire, 1); ↵ if (myICM.status == ICM_20948_Stat_Ok) { ↵ // 软件复位 ↵ myICM.swReset(); ↵ delay(250); ↵ // 唤醒传感器 ↵ myICM.sleep(false); ↵ myICM.lowPower(false); ↵ // 启动磁力计 ↵ myICM.startupMagnetometer(); ↵ icm_initialized = true; ↵ Serial.println("ICM20948 initialized successfully"); ↵ } else { ↵ Serial.println("ICM20948 initialization failed"); ↵ } ↵ }` |
| `icm20948_read_accel` | Value | AXIS(dropdown) | `icm20948_read_accel(X)` | `myICM.accX()` |
| `icm20948_read_gyro` | Value | AXIS(dropdown) | `icm20948_read_gyro(X)` | `myICM.gyrX()` |
| `icm20948_read_mag` | Value | AXIS(dropdown) | `icm20948_read_mag(X)` | `myICM.magX()` |
| `icm20948_read_temp` | Value | (none) | `icm20948_read_temp()` | `myICM.temp()` |
| `icm20948_data_ready` | Value | (none) | `icm20948_data_ready()` | `(icm_initialized && myICM.dataReady())` |
| `icm20948_ahrs_init` | Statement | FREQ(field_number) | `icm20948_ahrs_init(100)` | `// AHRS变量 ↵ float ahrs_q0 = 1.0f, ahrs_q1 = 0.0f, ahrs_q2 = 0.0f, ahrs_q3 = 0.0f; ↵ float ahrs_roll = 0.0f, ahrs_pitch = 0.0f, ahrs_yaw = 0.0f; ↵ float ahrs_sample_freq = 100.0f; ↵ float ahrs_beta = 0.1f; ↵ unsigned long ahrs_last_update = 0; ↵ void madgwick_update(float gx, float gy, float gz, float ax, float ay, float az, float mx, float my, float mz) { ↵ float recipNorm; ↵ float s0, s1, s2, s3; ↵ float qDot1, qDot2, qDot3, qDot4; ↵ float hx, hy; ↵ float _2q0mx, _2q0my, _2q0mz, _2q1mx, _2bx, _2bz, _4bx, _4bz, _2q0, _2q1, _2q2, _2q3, _2q0q2, _2q2q3, q0q0, q0q1, q0q2, q0q3, q1q1, q1q2, q1q3, q2q2, q2q3, q3q3; ↵ // Convert gyroscope degrees/sec to radians/sec ↵ gx *= 0.0174533f; ↵ gy *= 0.0174533f; ↵ gz *= 0.0174533f; ↵ // Rate of change of quaternion from gyroscope ↵ qDot1 = 0.5f * (-ahrs_q1 * gx - ahrs_q2 * gy - ahrs_q3 * gz); ↵ qDot2 = 0.5f * (ahrs_q0 * gx + ahrs_q2 * gz - ahrs_q3 * gy); ↵ qDot3 = 0.5f * (ahrs_q0 * gy - ahrs_q1 * gz + ahrs_q3 * gx); ↵ qDot4 = 0.5f * (ahrs_q0 * gz + ahrs_q1 * gy - ahrs_q2 * gx); ↵ // Compute feedback only if accelerometer measurement valid ↵ if(!((ax == 0.0f) && (ay == 0.0f) && (az == 0.0f))) { ↵ // Normalise accelerometer measurement ↵ recipNorm = 1.0f / sqrt(ax * ax + ay * ay + az * az); ↵ ax *= recipNorm; ↵ ay *= recipNorm; ↵ az *= recipNorm; ↵ // Normalise magnetometer measurement ↵ recipNorm = 1.0f / sqrt(mx * mx + my * my + mz * mz); ↵ mx *= recipNorm; ↵ my *= recipNorm; ↵ mz *= recipNorm; ↵ // Auxiliary variables to avoid repeated arithmetic ↵ _2q0mx = 2.0f * ahrs_q0 * mx; ↵ _2q0my = 2.0f * ahrs_q0 * my; ↵ _2q0mz = 2.0f * ahrs_q0 * mz; ↵ _2q1mx = 2.0f * ahrs_q1 * mx; ↵ _2q0 = 2.0f * ahrs_q0; ↵ _2q1 = 2.0f * ahrs_q1; ↵ _2q2 = 2.0f * ahrs_q2; ↵ _2q3 = 2.0f * ahrs_q3; ↵ _2q0q2 = 2.0f * ahrs_q0 * ahrs_q2; ↵ _2q2q3 = 2.0f * ahrs_q2 * ahrs_q3; ↵ q0q0 = ahrs_q0 * ahrs_q0; ↵ q0q1 = ahrs_q0 * ahrs_q1; ↵ q0q2 = ahrs_q0 * ahrs_q2; ↵ q0q3 = ahrs_q0 * ahrs_q3; ↵ q1q1 = ahrs_q1 * ahrs_q1; ↵ q1q2 = ahrs_q1 * ahrs_q2; ↵ q1q3 = ahrs_q1 * ahrs_q3; ↵ q2q2 = ahrs_q2 * ahrs_q2; ↵ q2q3 = ahrs_q2 * ahrs_q3; ↵ q3q3 = ahrs_q3 * ahrs_q3; ↵ // Reference direction of Earth's magnetic field ↵ hx = mx * q0q0 - _2q0my * ahrs_q3 + _2q0mz * ahrs_q2 + mx * q1q1 + _2q1 * my * ahrs_q2 + _2q1 * mz * ahrs_q3 - mx * q2q2 - mx * q3q3; ↵ hy = _2q0mx * ahrs_q3 + my * q0q0 - _2q0mz * ahrs_q1 + _2q1mx * ahrs_q2 - my * q1q1 + my * q2q2 + _2q2 * mz * ahrs_q3 - my * q3q3; ↵ _2bx = sqrt(hx * hx + hy * hy); ↵ _2bz = -_2q0mx * ahrs_q2 + _2q0my * ahrs_q1 + mz * q0q0 + _2q1mx * ahrs_q3 - mz * q1q1 + _2q2 * my * ahrs_q3 - mz * q2q2 + mz * q3q3; ↵ _4bx = 2.0f * _2bx; ↵ _4bz = 2.0f * _2bz; ↵ // Gradient decent algorithm corrective step ↵ s0 = -_2q2 * (2.0f * q1q3 - _2q0q2 - ax) + _2q1 * (2.0f * q0q1 + _2q2q3 - ay) - _2bz * ahrs_q2 * (_2bx * (0.5f - q2q2 - q3q3) + _2bz * (q1q3 - q0q2) - mx) + (-_2bx * ahrs_q3 + _2bz * ahrs_q1) * (_2bx * (q1q2 - q0q3) + _2bz * (q0q1 + q2q3) - my) + _2bx * ahrs_q2 * (_2bx * (q0q2 + q1q3) + _2bz * (0.5f - q1q1 - q2q2) - mz); ↵ s1 = _2q3 * (2.0f * q1q3 - _2q0q2 - ax) + _2q0 * (2.0f * q0q1 + _2q2q3 - ay) - 4.0f * ahrs_q1 * (1 - 2.0f * q1q1 - 2.0f * q2q2 - az) + _2bz * ahrs_q3 * (_2bx * (0.5f - q2q2 - q3q3) + _2bz * (q1q3 - q0q2) - mx) + (_2bx * ahrs_q2 + _2bz * ahrs_q0) * (_2bx * (q1q2 - q0q3) + _2bz * (q0q1 + q2q3) - my) + (_2bx * ahrs_q3 - _4bz * ahrs_q1) * (_2bx * (q0q2 + q1q3) + _2bz * (0.5f - q1q1 - q2q2) - mz); ↵ s2 = -_2q0 * (2.0f * q1q3 - _2q0q2 - ax) + _2q3 * (2.0f * q0q1 + _2q2q3 - ay) - 4.0f * ahrs_q2 * (1 - 2.0f * q1q1 - 2.0f * q2q2 - az) + (-_4bx * ahrs_q2 - _2bz * ahrs_q0) * (_2bx * (0.5f - q2q2 - q3q3) + _2bz * (q1q3 - q0q2) - mx) + (_2bx * ahrs_q1 + _2bz * ahrs_q3) * (_2bx * (q1q2 - q0q3) + _2bz * (q0q1 + q2q3) - my) + (_2bx * ahrs_q0 - _4bz * ahrs_q2) * (_2bx * (q0q2 + q1q3) + _2bz * (0.5f - q1q1 - q2q2) - mz); ↵ s3 = _2q1 * (2.0f * q1q3 - _2q0q2 - ax) + _2q2 * (2.0f * q0q1 + _2q2q3 - ay) + (-_4bx * ahrs_q3 + _2bz * ahrs_q1) * (_2bx * (0.5f - q2q2 - q3q3) + _2bz * (q1q3 - q0q2) - mx) + (-_2bx * ahrs_q0 + _2bz * ahrs_q2) * (_2bx * (q1q2 - q0q3) + _2bz * (q0q1 + q2q3) - my) + _2bx * ahrs_q1 * (_2bx * (q0q2 + q1q3) + _2bz * (0.5f - q1q1 - q2q2) - mz); ↵ recipNorm = 1.0f / sqrt(s0 * s0 + s1 * s1 + s2 * s2 + s3 * s3); // normalise step magnitude ↵ s0 *= recipNorm; ↵ s1 *= recipNorm; ↵ s2 *= recipNorm; ↵ s3 *= recipNorm; ↵ // Apply feedback step ↵ qDot1 -= ahrs_beta * s0; ↵ qDot2 -= ahrs_beta * s1; ↵ qDot3 -= ahrs_beta * s2; ↵ qDot4 -= ahrs_beta * s3; ↵ } ↵ // Integrate rate of change of quaternion to yield quaternion ↵ float dt = 1.0f / ahrs_sample_freq; ↵ ahrs_q0 += qDot1 * dt; ↵ ahrs_q1 += qDot2 * dt; ↵ ahrs_q2 += qDot3 * dt; ↵ ahrs_q3 += qDot4 * dt; ↵ // Normalise quaternion ↵ recipNorm = 1.0f / sqrt(ahrs_q0 * ahrs_q0 + ahrs_q1 * ahrs_q1 + ahrs_q2 * ahrs_q2 + ahrs_q3 * ahrs_q3); ↵ ahrs_q0 *= recipNorm; ↵ ahrs_q1 *= recipNorm; ↵ ahrs_q2 *= recipNorm; ↵ ahrs_q3 *= recipNorm; ↵ // Convert quaternion to Euler angles ↵ ahrs_roll = atan2(2.0f * (ahrs_q0 * ahrs_q1 + ahrs_q2 * ahrs_q3), 1.0f - 2.0f * (ahrs_q1 * ahrs_q1 + ahrs_q2 * ahrs_q2)) * 57.2958f; ↵ ahrs_pitch = asin(2.0f * (ahrs_q0 * ahrs_q2 - ahrs_q3 * ahrs_q1)) * 57.2958f; ↵ ahrs_yaw = atan2(2.0f * (ahrs_q0 * ahrs_q3 + ahrs_q1 * ahrs_q2), 1.0f - 2.0f * (ahrs_q2 * ahrs_q2 + ahrs_q3 * ahrs_q3)) * 57.2958f; ↵ }` |
| `icm20948_ahrs_update` | Statement | (none) | `icm20948_ahrs_update()` | `if (icm_initialized && myICM.dataReady()) { ↵ myICM.getAGMT(); ↵ madgwick_update( ↵ myICM.gyrX(), myICM.gyrY(), myICM.gyrZ(), ↵ myICM.accX(), myICM.accY(), myICM.accZ(), ↵ myICM.magX(), myICM.magY(), myICM.magZ() ↵ ); ↵ }` |
| `icm20948_get_roll` | Value | (none) | `icm20948_get_roll()` | `ahrs_roll` |
| `icm20948_get_pitch` | Value | (none) | `icm20948_get_pitch()` | `ahrs_pitch` |
| `icm20948_get_yaw` | Value | (none) | `icm20948_get_yaw()` | `ahrs_yaw` |
| `icm20948_calibrate_gyro` | Statement | SAMPLES(field_number) | `icm20948_calibrate_gyro(500)` | `Serial.println("开始陀螺仪校准，请保持传感器静止..."); ↵ delay(2000); ↵ float sum_x = 0, sum_y = 0, sum_z = 0; ↵ for (int i = 0; i < 500; i++) { ↵ if (myICM.dataReady()) { ↵ myICM.getAGMT(); ↵ sum_x += myICM.gyrX(); ↵ sum_y += myICM.gyrY(); ↵ sum_z += myICM.gyrZ(); ↵ delay(2); ↵ } ↵ } ↵ gyro_offset_x = sum_x / 500; ↵ gyro_offset_y = sum_y / 500; ↵ gyro_offset_z = sum_z / 500; ↵ Serial.print("陀螺仪偏移值 - X: "); ↵ Serial.print(gyro_offset_x); ↵ Serial.print(", Y: "); ↵ Serial.print(gyro_offset_y); ↵ Serial.print(", Z: "); ↵ Serial.println(gyro_offset_z);` |
| `icm20948_set_gyro_offset` | Statement | OFFSET_X(input_value), OFFSET_Y(input_value), OFFSET_Z(input_value) | `icm20948_set_gyro_offset(math_number(0), math_number(0), math_number(0))` | `gyro_offset_x = 1; ↵ gyro_offset_y = 1; ↵ gyro_offset_z = 1;` |
| `icm20948_set_accel_range` | Statement | RANGE(dropdown) | `icm20948_set_accel_range(gpm2)` | `if (icm_initialized) { ↵ ICM_20948_fss_t myFSS; ↵ myFSS.a = gpm2; ↵ myICM.setFullScale(ICM_20948_Internal_Acc, myFSS); ↵ }` |
| `icm20948_set_gyro_range` | Statement | RANGE(dropdown) | `icm20948_set_gyro_range(dps250)` | `if (icm_initialized) { ↵ ICM_20948_fss_t myFSS; ↵ myFSS.g = dps250; ↵ myICM.setFullScale(ICM_20948_Internal_Gyr, myFSS); ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 1, 0 | icm20948_init |
| AXIS | X, Y, Z | icm20948_read_accel, icm20948_read_gyro, icm20948_read_mag |
| RANGE | gpm2, gpm4, gpm8, gpm16 | icm20948_set_accel_range |
| RANGE | dps250, dps500, dps1000, dps2000 | icm20948_set_gyro_range |

## ABS Examples

### Basic Usage
```
arduino_setup()
    icm20948_init("1")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, icm20948_read_accel(X))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
