# WS2812 RGB点阵屏

WS2812/NeoPixel RGB点阵屏 Blockly 库，底层使用 Adafruit NeoPixel，支持自定义宽高、蛇形走线、RGB图案编辑、基础绘图、文字和常用动画。

## 库信息
- **库名**: @aily-project/lib-ws2812-rgb-matrix
- **版本**: 1.0.0
- **兼容**: Arduino/ESP32/ESP8266/RP2040 等支持 Adafruit_NeoPixel 的平台
- **变量类型**: WS2812RGBMatrix

## 块定义

| 块类型 | 连接 | 字段/输入 | .abi格式 | 生成代码 |
| --- | --- | --- | --- | --- |
| `ws2812_matrix_init` | 语句块 | VAR(field_input), PIN, WIDTH, HEIGHT, SERPENTINE, TYPE, BRIGHTNESS | `"fields":{"VAR":"matrix","PIN":"6","WIDTH":8,"HEIGHT":8}` | `Adafruit_NeoPixel matrix(64, 6, NEO_GRB + NEO_KHZ800); matrix.begin();` |
| `ws2812_matrix_show` | 语句块 | VAR(field_variable) | `"fields":{"VAR":{"name":"matrix","type":"WS2812RGBMatrix"}}` | `matrix.show();` |
| `ws2812_matrix_clear` | 语句块 | VAR, SHOW(dropdown) | `"fields":{"SHOW":"true"}` | `matrix.clear(); matrix.show();` |
| `ws2812_matrix_set_brightness` | 语句块 | VAR, BRIGHTNESS(input_value) | `"inputs":{"BRIGHTNESS":{"block":{"type":"math_number"}}}` | `matrix.setBrightness(constrain(...));` |
| `ws2812_matrix_color_picker` | 值块 | COLOR(field_colour) | `"fields":{"COLOR":"#ff0000"}` | `0xFF0000UL` |
| `ws2812_matrix_color_rgb` | 值块 | RED/GREEN/BLUE(input_value) | RGB数值输入 | `((r<<16)|(g<<8)|b)` |
| `ws2812_matrix_set_pixel_xy` | 语句块 | VAR, X, Y, COLOR | 坐标和颜色输入 | `ws2812MatrixSetPixel(...)` |
| `ws2812_matrix_draw_image` | 语句块 | VAR, IMAGE(field_led_matrix_image), X, Y, TRANSPARENT | RGB图案字段 | 生成颜色数组并绘制 |
| `ws2812_matrix_draw_line/rect/circle` | 语句块 | 坐标、尺寸、颜色 | 图形输入 | 调用绘图辅助函数 |
| `ws2812_matrix_draw_text/scroll_text` | 语句块 | TEXT, 坐标/颜色/速度 | 文本输入 | 绘制 5x7 英文字符 |
| `ws2812_matrix_color_wipe/rainbow/theater_chase/run_effect` | 语句块 | 颜色、延迟、循环 | 动画输入 | 调用阻塞式动画函数 |
| `ws2812_matrix_xy_to_index/get_width/get_height/get_count` | 值块 | VAR 和可选坐标 | 状态读取 | 返回序号、宽高或LED数量 |

## 字段类型映射

| 类型 | .abi格式 | 示例 |
| --- | --- | --- |
| field_input | 字符串 | `"VAR":"matrix"` |
| field_variable | WS2812RGBMatrix变量对象 | `"VAR":{"id":"m_id","name":"matrix","type":"WS2812RGBMatrix"}` |
| field_dropdown | 字符串 | `"SERPENTINE":"true"`, `"TYPE":"NEO_GRB + NEO_KHZ800"` |
| field_colour | 十六进制颜色 | `"COLOR":"#ff0000"` |
| field_led_matrix_image | RGB点阵对象 | `{"mode":"rgb","width":8,"height":8,"pixels":[...]}` |
| input_value | 嵌套block对象 | `"X":{"block":{"type":"math_number","fields":{"NUM":0}}}` |

## 连接规则

- 初始化块使用 `field_input` 创建变量，其他操作块使用 `field_variable` 引用同一个 `WS2812RGBMatrix` 变量。
- 设置像素、绘图和填充只写入缓冲区；需要用 `ws2812_matrix_show` 刷新，动画和滚动文本会自动刷新。
- 坐标从左上角开始，`X` 向右增加，`Y` 向下增加；蛇形走线会自动把奇数行反向映射到 LED 序号。
- `field_led_matrix_image` 的空像素可选择透明或覆盖为熄灭。

## 使用示例

### 初始化 8x8 点阵并显示图案
```json
{
  "type": "ws2812_matrix_init",
  "fields": {"VAR":"matrix","PIN":"6","WIDTH":8,"HEIGHT":8,"SERPENTINE":"true","TYPE":"NEO_GRB + NEO_KHZ800","BRIGHTNESS":50},
  "next": {"block": {"type":"ws2812_matrix_draw_image"}}
}
```

### 坐标绘制
```json
{
  "type": "ws2812_matrix_set_pixel_xy",
  "inputs": {
    "X": {"block":{"type":"math_number","fields":{"NUM":3}}},
    "Y": {"block":{"type":"math_number","fields":{"NUM":4}}},
    "COLOR": {"block":{"type":"ws2812_matrix_color_picker","fields":{"COLOR":"#00ff00"}}}
  },
  "next": {"block":{"type":"ws2812_matrix_show"}}
}
```

## 重要规则

1. `WIDTH * HEIGHT` 必须等于实际串联 LED 数量。
2. 大多数 WS2812B 使用 `GRB 800KHz`，颜色异常时切换为 `RGB 800KHz` 或 `BRG 800KHz`。
3. 亮度范围是 0-255，建议从较低亮度开始测试，避免供电不足。
4. 文本绘制支持英文、数字和常用符号；中文建议使用 RGB 图案字段绘制。
5. 动画块为阻塞式执行，动画运行期间后续积木会等待。
