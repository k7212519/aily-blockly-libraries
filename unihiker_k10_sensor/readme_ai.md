# K10传感器

UNIHIKER K10 板载传感器库，支持加速度计和光线/声音强度检测。

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-sensor
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_get_accelerometer` | Value(Number) | AXIS(dropdown) | `k10_get_accelerometer(x)` | `(k10.getAccelerometerX())` |
| `k10_get_strength` | Value(Number) | TYPE(dropdown) | `k10_get_strength(light)` | `(k10.getStrength())` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| AXIS | x, y, z | 加速度计轴方向 |
| TYPE | light(光线强度), sound(声音强度) | 传感器类型 |

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

## Notes

1. **无需额外初始化**: 使用传感器积木时自动初始化 K10 开发板
2. **加速度计**: 返回 X/Y/Z 轴原始加速度值（int 类型）
3. **光线传感器**: `k10_get_strength(light)` 返回环境光强度值
4. **声音传感器**: `k10_get_strength(sound)` 返回麦克风采集的声音强度
