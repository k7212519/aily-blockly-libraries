# K10 RGB LED

UNIHIKER K10 板载 RGB LED 控制库，支持亮度和颜色设置。

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-led
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_rgb_brightness` | Statement | BRIGHTNESS(field_number) | `k10_rgb_brightness()` | `k10.rgb->brightness(round(val));` |
| `k10_rgb_write` | Statement | INDEX(dropdown), R(input_value), G(input_value), B(input_value) | `k10_rgb_write(-1, math_number(255), math_number(0), math_number(0))` | `k10.rgb->write(index, r, g, b);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| INDEX | -1(全部), 0(1号灯), 1(2号灯), 2(3号灯) | RGB 灯编号 |
| BRIGHTNESS | 0-255 | 亮度值 |

## ABS Examples

### 设置全部RGB灯为红色
```
arduino_setup()
    k10_rgb_brightness()
    k10_rgb_write(-1, math_number(255), math_number(0), math_number(0))
```

### 三色交替
```
arduino_setup()
    k10_rgb_brightness()

arduino_loop()
    k10_rgb_write(0, math_number(255), math_number(0), math_number(0))
    k10_rgb_write(1, math_number(0), math_number(255), math_number(0))
    k10_rgb_write(2, math_number(0), math_number(0), math_number(255))
    time_delay(math_number(1000))
```

## Notes

1. **无需额外初始化**: 使用 RGB 积木时自动初始化 K10 开发板
2. **灯数量**: 板载 3 颗 WS2812 RGB LED，编号 0/1/2，选择 -1 表示全部
3. **亮度范围**: 0-255，默认值 50
