# LSM303AGR加速度计和磁力计

LSM303AGR三轴加速度计和三轴磁力计传感器控制库，使用I2C接口读取加速度、磁场和温度数据，内置Madgwick AHRS姿态解算。

## Library Info
- **Name**: @aily-project/lib-lsm303agr
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `lsm303agr_acc_init` | Statement | VAR(field_input), WIRE(dropdown) | `lsm303agr_acc_init("Acc", Wire)` | `Acc.begin(); Acc.Enable(); Acc.EnableTemperatureSensor();` |
| `lsm303agr_mag_init` | Statement | VAR(field_input), WIRE(dropdown) | `lsm303agr_mag_init("Mag", Wire)` | `Mag.begin(); Mag.Enable();` |
| `lsm303agr_acc_get_axis` | Value(Number) | VAR(field_variable), AXIS(dropdown) | `lsm303agr_acc_get_axis($Acc, 0)` | `_lsm303agr_acc_read_axis(Acc, 0)` |
| `lsm303agr_mag_get_axis` | Value(Number) | VAR(field_variable), AXIS(dropdown) | `lsm303agr_mag_get_axis($Mag, 0)` | `_lsm303agr_mag_read_axis(Mag, 0)` |
| `lsm303agr_acc_get_temperature` | Value(Number) | VAR(field_variable) | `lsm303agr_acc_get_temperature($Acc)` | `_lsm303agr_acc_read_temp(Acc)` |
| `lsm303agr_ahrs_update` | Statement | ACC_VAR(field_variable), MAG_VAR(field_variable) | `lsm303agr_ahrs_update($Acc, $Mag)` | `_lsm303agr_ahrs_update(Acc, Mag);` |
| `lsm303agr_ahrs_get_angle` | Value(Number) | ANGLE(dropdown) | `lsm303agr_ahrs_get_angle(ROLL)` | `_lsm303agr_ahrs_filter.getRoll()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| AXIS | 0 (X), 1 (Y), 2 (Z) | 传感器的X/Y/Z轴 |
| WIRE | ${board.i2c} | I2C总线选择 |
| ANGLE | ROLL, PITCH, HEADING | 横滚角、俯仰角、航向角 |

## ABS Examples

### 基本用法 - 读取加速度和磁场
```
arduino_setup()
    lsm303agr_acc_init("Acc", Wire)
    lsm303agr_mag_init("Mag", Wire)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_print(Serial, text("Acc X: "))
    serial_println(Serial, lsm303agr_acc_get_axis($Acc, 0))
    serial_print(Serial, text("Mag X: "))
    serial_println(Serial, lsm303agr_mag_get_axis($Mag, 0))
    serial_print(Serial, text("Temp: "))
    serial_println(Serial, lsm303agr_acc_get_temperature($Acc))
    time_delay(math_number(1000))
```

### 姿态解算 - 获取Roll/Pitch/Heading
```
arduino_setup()
    lsm303agr_acc_init("Acc", Wire)
    lsm303agr_mag_init("Mag", Wire)
    serial_begin(Serial, 9600)

arduino_loop()
    lsm303agr_ahrs_update($Acc, $Mag)
    serial_print(Serial, text("Roll: "))
    serial_println(Serial, lsm303agr_ahrs_get_angle(ROLL))
    serial_print(Serial, text("Pitch: "))
    serial_println(Serial, lsm303agr_ahrs_get_angle(PITCH))
    serial_print(Serial, text("Heading: "))
    serial_println(Serial, lsm303agr_ahrs_get_angle(HEADING))
    time_delay(math_number(10))
```

## Notes

1. **Variable Creation**: `lsm303agr_acc_init("varName", ...)` creates variable `$varName` of type `LSM303AGR_ACC`; `lsm303agr_mag_init("varName", ...)` creates variable `$varName` of type `LSM303AGR_MAG`
2. **Initialization**: Place init blocks inside `arduino_setup()`
3. **Units**: Accelerometer values in mg, magnetometer values in mGauss, temperature in °C
4. **AHRS**: Uses Madgwick filter for sensor fusion. Must call `lsm303agr_ahrs_update` each loop iteration before reading angles. Roll/Pitch range: -180~180°, Heading range: 0~360°
5. **AHRS Timing**: For best results, call `lsm303agr_ahrs_update` at a consistent rate (~100Hz, use `time_delay(math_number(10))`)
6. **Parameter Order**: Follows `block.json` args0 order
