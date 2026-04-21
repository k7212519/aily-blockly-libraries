# K10传感器

UNIHIKER K10 板载传感器库，支持加速度计、光线强度检测以及 AHT20 温湿度传感器。

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-sensor
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_get_accelerometer` | Value(Number) | AXIS(dropdown) | `k10_get_accelerometer(x)` | `(k10.getAccelerometerX())` |
| `k10_get_strength` | Value(Number) | TYPE(dropdown) | `k10_get_strength(light)` | `(k10.readALS())` |
| `k10_aht20_measure` | Value(Boolean) | CRC(dropdown) | `k10_aht20_measure(true)` | `(aht20.startMeasurementReady(true))` |
| `k10_aht20_get_temperature` | Value(Number) | UNIT(dropdown) | `k10_aht20_get_temperature(C)` | `(aht20.getTemperature_C())` / `(aht20.getTemperature_F())` |
| `k10_aht20_get_humidity` | Value(Number) | — | `k10_aht20_get_humidity()` | `(aht20.getHumidity_RH())` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| AXIS | x, y, z | 加速度计轴方向 |
| TYPE | light(光线强度) | K10 板载光线传感器类型 |
| CRC | true(开启), false(关闭) | AHT20 测量过程是否启用 CRC 校验 |
| UNIT | C(摄氏度℃), F(华氏度℉) | AHT20 温度单位 |

## ABS Examples

### 读取加速度数据
```
arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_print(Serial, text("X: "))
    serial_print(Serial, k10_get_accelerometer(x))
    serial_print(Serial, text(" Y: "))
    serial_print(Serial, k10_get_accelerometer(y))
    serial_print(Serial, text(" Z: "))
    serial_println(Serial, k10_get_accelerometer(z))
    time_delay(math_number(500))
```

### 光线强度检测
```
arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_print(Serial, text("Light: "))
    serial_println(Serial, k10_get_strength(light))
    time_delay(math_number(1000))
```

### 读取 AHT20 温湿度
```
arduino_setup()
    serial_begin(Serial, 115200)

arduino_loop()
    controls_if()
        @IF0: k10_aht20_measure(true)
        @DO0:
            serial_print(Serial, text("temperature(C): "))
            serial_print(Serial, k10_aht20_get_temperature(C))
            serial_print(Serial, text(" temperature(F): "))
            serial_print(Serial, k10_aht20_get_temperature(F))
            serial_print(Serial, text(" humidity(%RH): "))
            serial_println(Serial, k10_aht20_get_humidity())
            time_delay(math_number(1000))
```

## Notes

1. **无需额外初始化**: 使用 K10 板载积木时自动 `k10.begin()`；使用 AHT20 积木时自动包含 `DFRobot_AHT20.h` 并在 `setup()` 中循环 `aht20.begin()` 直至成功
2. **加速度计**: `k10_get_accelerometer` 返回 X/Y/Z 轴原始加速度值
3. **光线传感器**: `k10_get_strength(light)` 调用 `k10.readALS()`
4. **AHT20 调用顺序**: 必须先用 `k10_aht20_measure` 启动测量并判断返回 true，再调用 `k10_aht20_get_temperature` / `k10_aht20_get_humidity` 读取，否则得到的是上一次或初始值
5. **AHT20 接口**: 默认 I2C 地址 0x38；温度范围 -40~85℃，湿度 0~100%RH
