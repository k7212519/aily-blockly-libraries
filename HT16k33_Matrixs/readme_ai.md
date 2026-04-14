# HT16K33 点阵屏

HT16K33 驱动的 8x8 LED 点阵屏库，支持多种动画效果。

## 库信息
- **名称**: @aily-project/lib-ht16k33-matrix
- **版本**: 1.0.0

## 块定义

| 块类型 | 连接类型 | 参数（args0顺序） | ABS格式 | 生成代码 |
|--------|----------|-------------------|---------|----------|
| `ht16k33_init` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(dropdown) | `ht16k33_init("matrix", Wire, "0x70")` | `HT16K33Matrix matrix(0x70);` + `matrix.begin(&Wire);` |
| `ht16k33_clear` | Statement | VAR(field_variable) | `ht16k33_clear($matrix)` | `matrix.clear();` |
| `ht16k33_set_pixel` | Statement | VAR(field_variable), ROW(input_value), COL(input_value), STATE(dropdown) | `ht16k33_set_pixel($matrix, math_number(0), math_number(0), true)` | `matrix.setPixel(0, 0, true);` |
| `ht16k33_display` | Statement | VAR(field_variable) | `ht16k33_display($matrix)` | `matrix.display();` |
| `ht16k33_set_brightness` | Statement | VAR(field_variable), LEVEL(input_value) | `ht16k33_set_brightness($matrix, math_number(7))` | `matrix.setBrightness(7);` |
| `ht16k33_set_rotation` | Statement | VAR(field_variable), ROTATION(dropdown) | `ht16k33_set_rotation($matrix, "0")` | `matrix.setRotation(0);` |
| `ht16k33_effect` | Statement | VAR(field_variable), EFFECT(dropdown) | `ht16k33_effect($matrix, rowScan)` | `matrix.rowScan();` |

## 参数选项

| 参数 | 可选值 | 说明 |
|------|--------|------|
| WIRE | Wire, Wire1 等 | I2C 总线选择（由开发板配置自动填充） |
| ADDRESS | 0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77 | HT16K33 I2C 地址 |
| STATE | true, false | 像素状态：点亮或熄灭 |
| LEVEL | 0-15 | 亮度级别（0最暗，15最亮） |
| ROTATION | 0, 1, 2, 3 | 旋转角度：0°, 90°, 180°, 270°（顺时针） |
| EFFECT | rowScan, colScan, rings, diagonal, snow, chess, heart, smile, breathe, spiral | 动画效果选择 |

## ABS 示例

### 基础使用
```
arduino_setup()
    ht16k33_init("matrix", Wire, "0x70")

arduino_loop()
    ht16k33_effect($matrix, heart)
    time_delay(math_number(1000))
    ht16k33_effect($matrix, smile)
    time_delay(math_number(1000))
```

### 手动绘制像素
```
arduino_setup()
    ht16k33_init("matrix", Wire, "0x70")

arduino_loop()
    ht16k33_clear($matrix)
    ht16k33_set_pixel($matrix, math_number(0), math_number(0), true)
    ht16k33_set_pixel($matrix, math_number(1), math_number(1), true)
    ht16k33_display($matrix)
    time_delay(math_number(500))
```

### 循环播放所有效果
```
arduino_setup()
    ht16k33_init("matrix", Wire, "0x70")

arduino_loop()
    ht16k33_effect($matrix, rowScan)
    time_delay(math_number(300))
    ht16k33_effect($matrix, colScan)
    time_delay(math_number(300))
    ht16k33_effect($matrix, rings)
    time_delay(math_number(300))
    ht16k33_effect($matrix, diagonal)
    time_delay(math_number(300))
    ht16k33_effect($matrix, snow)
    time_delay(math_number(300))
    ht16k33_effect($matrix, chess)
    time_delay(math_number(300))
    ht16k33_effect($matrix, heart)
    time_delay(math_number(300))
    ht16k33_effect($matrix, smile)
    time_delay(math_number(300))
    ht16k33_effect($matrix, breathe)
    time_delay(math_number(300))
    ht16k33_effect($matrix, spiral)
    time_delay(math_number(300))
```

## 注意事项

1. **变量创建**: `ht16k33_init("varName", ...)` 创建变量 `$varName`，后续块使用 `variables_get($varName)` 或简写 `$varName` 引用
2. **I2C 初始化**: 库自动处理 Wire 初始化，无需手动调用 `Wire.begin()`
3. **像素坐标**: 行和列的范围都是 0-7
4. **刷新显示**: 使用 `ht16k33_set_pixel` 后需调用 `ht16k33_display` 才会显示
5. **效果块**: 所有效果块都是阻塞式的，执行完毕后才返回