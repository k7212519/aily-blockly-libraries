# HT16K33 点阵屏

HT16K33驱动的8x8 LED点阵屏库，支持像素操作和10种预设动画效果

## 库信息
- **库名**: @aily-project/lib-ht16k33-matrix
- **版本**: 1.0.0
- **兼容**: Arduino全系列I2C平台(AVR/ESP32/ESP8266/RP2040等)

## 块定义

| 块类型 | 连接 | 字段/输入 | .abi格式 | 生成代码 |
|--------|------|----------|----------|----------|
| `ht16k33_init` | 语句块 | VAR(field_input), WIRE(field_dropdown), ADDRESS(field_dropdown) | `"fields":{"VAR":"matrix","WIRE":"Wire","ADDRESS":"0x70"}` | `HT16K33Matrix matrix(0x70); matrix.begin(&Wire);` |
| `ht16k33_clear` | 语句块 | VAR(field_variable) | `"fields":{"VAR":{"id":"m_id","name":"matrix","type":"HT16K33Matrix"}}` | `matrix.clear();` |
| `ht16k33_set_pixel` | 语句块 | VAR(field_variable), ROW(input_value), COL(input_value), STATE(field_dropdown) | `"fields":{...,"STATE":"true"},"inputs":{"ROW":{"block":{"type":"math_number","fields":{"NUM":"0"}}},"COL":{...}}` | `matrix.setPixel(0,0,true);` |
| `ht16k33_display` | 语句块 | VAR(field_variable) | `"fields":{"VAR":{...}}` | `matrix.display();` |
| `ht16k33_set_brightness` | 语句块 | VAR(field_variable), LEVEL(input_value) | `"fields":{...},"inputs":{"LEVEL":{"block":{"type":"math_number","fields":{"NUM":"7"}}}}` | `matrix.setBrightness(7);` |
| `ht16k33_set_rotation` | 语句块 | VAR(field_variable), ROTATION(field_dropdown) | `"fields":{"VAR":{...},"ROTATION":"0"}` | `matrix.setRotation(0);` |
| `ht16k33_effect` | 语句块 | VAR(field_variable), EFFECT(field_dropdown) | `"fields":{"VAR":{...},"EFFECT":"heart"}` | `matrix.heart();` |

## 字段类型映射

| 类型 | .abi格式 | 示例 |
|------|----------|------|
| field_input | 字符串 | `"VAR": "matrix"` |
| field_variable | HT16K33Matrix变量对象 | `"VAR": {"id":"m_id","name":"matrix","type":"HT16K33Matrix"}` |
| field_dropdown | 字符串 | `"ADDRESS":"0x70"`, `"ROTATION":"0"` |
| field_dropdown(动态) | 字符串 | `"WIRE":"Wire"` (从board.json的i2c获取) |
| input_value | 嵌套block对象 | `"ROW":{"block":{"type":"math_number","fields":{"NUM":"0"}}}` |

## 连接规则

- **全部语句块**: 所有7个块均有previousStatement/nextStatement，通过`next`字段顺序连接
- **无值块**: 本库无output块
- **特殊规则**:
  - 初始化块使用field_input创建变量，其他块使用field_variable引用(类型: HT16K33Matrix)
  - `set_pixel`后必须调用`display`才能刷新显示
  - 动态选项`${board.i2c}`从board.json获取可用I2C总线

## 使用示例

### 动画效果播放
```json
{
  "type": "ht16k33_init",
  "fields": {"VAR":"matrix","WIRE":"Wire","ADDRESS":"0x70"},
  "next": {"block": {
    "type": "ht16k33_effect",
    "fields": {"VAR":{"id":"m_id","name":"matrix","type":"HT16K33Matrix"},"EFFECT":"heart"}
  }}
}
```

### 手动绘制像素
```json
{
  "type": "ht16k33_set_pixel",
  "fields": {"VAR":{"id":"m_id","name":"matrix","type":"HT16K33Matrix"},"STATE":"true"},
  "inputs": {
    "ROW": {"block":{"type":"math_number","fields":{"NUM":"3"}}},
    "COL": {"block":{"type":"math_number","fields":{"NUM":"4"}}}
  },
  "next": {"block": {"type":"ht16k33_display","fields":{"VAR":{"id":"m_id","name":"matrix","type":"HT16K33Matrix"}}}}
}
```

## 重要规则

1. **初始化**: ht16k33_init必须放在arduino_setup()中，库自动处理Wire.begin()
2. **刷新**: set_pixel只写缓冲区，必须调用display刷新到屏幕
3. **坐标范围**: 行列均为0-7
4. **亮度范围**: 0-15（0最暗，15最亮）
5. **效果阻塞**: 所有动画效果块为阻塞式执行
6. **多实例**: 支持不同地址(0x70-0x77)创建多个点阵屏实例

## 支持的字段选项
- **WIRE**: 从board.json的i2c字段获取(如"Wire","Wire1")
- **ADDRESS**: "0x70"(默认)~"0x77"，共8个地址
- **STATE**: "true"(点亮), "false"(熄灭)
- **ROTATION**: "0"(0°), "1"(90°), "2"(180°), "3"(270°)
- **EFFECT**: rowScan/colScan/rings/diagonal/snow/chess/heart/smile/breathe/spiral