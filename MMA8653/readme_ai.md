# MMA8653加速度传感器

NXP MMA8653三轴加速度传感器库，I2C通信，支持2/4/8G量程、8/10位分辨率、多种采样率

## Library Info
- **Name**: @aily-project/lib-mma8653
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mma8653_init` | Statement | RANGE(dropdown), RESOLUTION(dropdown), DATA_RATE(dropdown) | `mma8653_init(MMA8653_2G_RANGE, MMA8653_10BIT_RES, MMA8653_ODR_100)` | `accel.init(range, res, odr);` |
| `mma8653_set_mode` | Statement | MODE(dropdown) | `mma8653_set_mode(MMA8653_MODS_HIGH_RES)` | `accel.setMODS(mode);` |
| `mma8653_begin` | Statement | (none) | `mma8653_begin()` | `accel.begin();` |
| `mma8653_read_x` | Value | (none) | `mma8653_read_x()` | `mma8653_getX()` |
| `mma8653_read_y` | Value | (none) | `mma8653_read_y()` | `mma8653_getY()` |
| `mma8653_read_z` | Value | (none) | `mma8653_read_z()` | `mma8653_getZ()` |
| `mma8653_read_xyz` | Statement | VAR_X(field_variable), VAR_Y(field_variable), VAR_Z(field_variable) | `mma8653_read_xyz($accel_x, $accel_y, $accel_z)` | `accel.readSensor(&x, &y, &z);` |
| `mma8653_set_range` | Statement | RANGE(dropdown) | `mma8653_set_range(MMA8653_2G_RANGE)` | `accel.setRange(range);` |
| `mma8653_set_data_rate` | Statement | DATA_RATE(dropdown) | `mma8653_set_data_rate(MMA8653_ODR_100)` | `accel.setDataRate(odr);` |
| `mma8653_set_resolution` | Statement | RESOLUTION(dropdown) | `mma8653_set_resolution(MMA8653_10BIT_RES)` | `accel.setResolution(res);` |
| `mma8653_is_active` | Value | (none) | `mma8653_is_active()` | `accel.isActive()` |
| `mma8653_check_connection` | Value | (none) | `mma8653_check_connection()` | `accel.whoAmI()` |
| `mma8653_get_roll` | Value | (none) | `mma8653_get_roll()` | `mma8653_getRoll()` |
| `mma8653_get_pitch` | Value | (none) | `mma8653_get_pitch()` | `mma8653_getPitch()` |
| `mma8653_get_tilt` | Value | (none) | `mma8653_get_tilt()` | `mma8653_getTilt()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| RANGE | MMA8653_2G_RANGE, MMA8653_4G_RANGE, MMA8653_8G_RANGE | ±2g / ±4g / ±8g |
| RESOLUTION | MMA8653_10BIT_RES, MMA8653_8BIT_RES | 10位 / 8位分辨率 |
| DATA_RATE | MMA8653_ODR_800, MMA8653_ODR_400, MMA8653_ODR_200, MMA8653_ODR_100, MMA8653_ODR_50, MMA8653_ODR_12_5, MMA8653_ODR_6_25, MMA8653_ODR_1_56 | 800Hz / 400Hz / 200Hz / 100Hz / 50Hz / 12.5Hz / 6.25Hz / 1.56Hz |
| MODE | MMA8653_MODS_NORMAL, MMA8653_MODS_LOW_NOISE_LOW_POWER, MMA8653_MODS_HIGH_RES, MMA8653_MODS_LOW_POWER | 普通 / 低噪低功耗 / 高分辨率 / 低功耗 |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mma8653_init(MMA8653_2G_RANGE, MMA8653_10BIT_RES, MMA8653_ODR_50)
    mma8653_set_mode(MMA8653_MODS_HIGH_RES)
    mma8653_begin()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mma8653_read_x())
    time_delay(math_number(100))
```

### Read All Axes
```
arduino_setup()
    mma8653_init(MMA8653_2G_RANGE, MMA8653_10BIT_RES, MMA8653_ODR_50)
    mma8653_begin()
    serial_begin(Serial, 9600)

arduino_loop()
    mma8653_read_xyz($accel_x, $accel_y, $accel_z)
    serial_println(Serial, variables_get($accel_x))
    serial_println(Serial, variables_get($accel_y))
    serial_println(Serial, variables_get($accel_z))
    time_delay(math_number(100))
```

### Tilt/Inclinometer
```
arduino_setup()
    mma8653_init(MMA8653_2G_RANGE, MMA8653_10BIT_RES, MMA8653_ODR_50)
    mma8653_set_mode(MMA8653_MODS_HIGH_RES)
    mma8653_begin()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_print(Serial, text("Roll: "))
    serial_println(Serial, mma8653_get_roll())
    serial_print(Serial, text("Pitch: "))
    serial_println(Serial, mma8653_get_pitch())
    serial_print(Serial, text("Tilt: "))
    serial_println(Serial, mma8653_get_tilt())
    time_delay(math_number(100))
```

## Notes

1. **初始化顺序**: 必须先调用 `mma8653_init`，再调用 `mma8653_set_mode`（可选），最后调用 `mma8653_begin` 激活传感器
2. **I2C地址**: 固定为 0x1D，无需配置
3. **读取数据**: 传感器必须处于激活状态（调用 `mma8653_begin` 后）才能读取数据
4. **分辨率**: 10位模式输出范围 -512~511，8位模式输出范围 -128~127
5. **倾角计**: Roll为绕X轴旋转角度，Pitch为绕Y轴旋转角度，Tilt为与垂直方向的夹角，均以度(°)为单位
