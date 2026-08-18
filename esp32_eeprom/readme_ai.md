# ESP32 EEPROM - AI 使用说明

## Library Info
- **Name**: @aily-project/lib-esp32-eeprom
- **Version**: 0.0.1

## 适用范围

ESP32 EEPROM 兼容存储积木，补齐 begin、commit、end 及类型化读写生命周期。

芯片/配置约束：EEPROM 是基于 Flash 的兼容层，频繁 commit 会影响 Flash 寿命。

## 代码生成约定

- 所有积木类型均使用 `esp32_` 前缀。
- generator.js 会自动添加 SDK 头文件和必要的全局对象。
- 创建对象类积木应在初始化阶段执行；状态查询积木可在循环或条件中使用。
- 不打包 SDK 源码，也不生成 src.7z。

## 积木

- `esp32_eeprom_begin`：分配 EEPROM 模拟存储区。
- `esp32_eeprom_read`：读取指定地址的一个字节。
- `esp32_eeprom_write`：写入一个字节，之后需要提交。
- `esp32_eeprom_read_typed`：按指定类型读取数值。
- `esp32_eeprom_write_typed`：按指定类型写入数值。
- `esp32_eeprom_read_string`：读取以零结尾的字符串。
- `esp32_eeprom_write_string`：写入字符串并返回写入长度。
- `esp32_eeprom_commit`：把缓存中的更改写入 Flash。
- `esp32_eeprom_end`：提交并释放 EEPROM 缓冲区。
- `esp32_eeprom_length`：返回当前 EEPROM 容量。
- `esp32_eeprom_dirty`：检查缓存是否有未提交更改。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------|------------|----------------|
| `esp32_eeprom_begin` | Statement | SIZE(input_value) | `esp32_eeprom_begin(math_number(0))` | `EEPROM.begin(1);` |
| `esp32_eeprom_read` | Value | ADDRESS(input_value) | `esp32_eeprom_read(math_number(0))` | `EEPROM.read(1)` |
| `esp32_eeprom_write` | Statement | ADDRESS(input_value), VALUE(input_value) | `esp32_eeprom_write(math_number(0), math_number(0))` | `EEPROM.write(1, 1);` |
| `esp32_eeprom_read_typed` | Value | METHOD(dropdown), ADDRESS(input_value) | `esp32_eeprom_read_typed(readInt, math_number(0))` | `EEPROM.readInt(1)` |
| `esp32_eeprom_write_typed` | Statement | METHOD(dropdown), ADDRESS(input_value), VALUE(input_value) | `esp32_eeprom_write_typed(writeInt, math_number(0), math_number(0))` | `EEPROM.writeInt(1, 1);` |
| `esp32_eeprom_read_string` | Value | ADDRESS(input_value) | `esp32_eeprom_read_string(math_number(0))` | `EEPROM.readString(1)` |
| `esp32_eeprom_write_string` | Statement | ADDRESS(input_value), TEXT(input_value) | `esp32_eeprom_write_string(math_number(0), text("value"))` | `EEPROM.writeString(1, "value");` |
| `esp32_eeprom_commit` | Value | (none) | `esp32_eeprom_commit()` | `EEPROM.commit()` |
| `esp32_eeprom_end` | Statement | (none) | `esp32_eeprom_end()` | `EEPROM.end();` |
| `esp32_eeprom_length` | Value | (none) | `esp32_eeprom_length()` | `EEPROM.length()` |
| `esp32_eeprom_dirty` | Value | (none) | `esp32_eeprom_dirty()` | `EEPROM.isDirty()` |
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| METHOD | readInt, readUInt, readLong64, readFloat, readDouble, readBool | esp32_eeprom_read_typed |
| METHOD | writeInt, writeUInt, writeLong64, writeFloat, writeDouble, writeBool | esp32_eeprom_write_typed |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    esp32_eeprom_begin(math_number(0))
```
