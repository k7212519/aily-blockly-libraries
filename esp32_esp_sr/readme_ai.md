# ESP32 语音识别 - AI 使用说明

## Library Info
- **Name**: @aily-project/lib-esp32-esp-sr
- **Version**: 0.0.1

## 适用范围

ESP32-S3/P4 ESP-SR 离线唤醒词与命令词识别积木。

芯片/配置约束：仅适用于 ESP32-S3/P4，构建分区必须启用语音模型（Flash 或 SD）；I2S 输入需先由 esp32_i2s 库配置。

## 代码生成约定

- 所有积木类型均使用 `esp32_` 前缀。
- generator.js 会自动添加 SDK 头文件和必要的全局对象。
- 创建对象类积木应在初始化阶段执行；状态查询积木可在循环或条件中使用。
- 不打包 SDK 源码，也不生成 src.7z。

## 积木

- `esp32_esp_sr_begin`：启动离线语音识别并为四个短语分配命令 ID 1-4。
- `esp32_esp_sr_control`：结束、暂停或恢复语音识别。
- `esp32_esp_sr_set_mode`：切换唤醒词或命令识别模式。
- `esp32_esp_sr_last_event`：返回最近的 sr_event_t 数值。
- `esp32_esp_sr_last_command`：返回最近识别到的命令 ID。
- `esp32_esp_sr_last_phrase`：返回最近识别到的短语 ID。
- `esp32_esp_sr_event_constant`：返回语音事件常量。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------|------------|----------------|
| `esp32_esp_sr_begin` | Value | I2S(field_variable), CMD1(input_value), CMD2(input_value), CMD3(input_value), CMD4(input_value), CHANNELS(dropdown), FORMAT(input_value) | `esp32_esp_sr_begin($I2S, text("value"), text("value"), text("value"), text("value"), SR_CHANNELS_MONO, text("value"))` | `ESP_SR.begin(I2S, esp32_sr_commands, sizeof(esp32_sr_commands) / sizeof(sr_cmd_t), SR_CHANNELS_MONO, SR_MODE_WAKEWORD, "value")` |
| `esp32_esp_sr_control` | Value | ACTION(dropdown) | `esp32_esp_sr_control(end)` | `ESP_SR.end()` |
| `esp32_esp_sr_set_mode` | Value | MODE(dropdown) | `esp32_esp_sr_set_mode(SR_MODE_WAKEWORD)` | `ESP_SR.setMode(SR_MODE_WAKEWORD)` |
| `esp32_esp_sr_last_event` | Value | (none) | `esp32_esp_sr_last_event()` | `esp32_sr_last_event` |
| `esp32_esp_sr_last_command` | Value | (none) | `esp32_esp_sr_last_command()` | `esp32_sr_last_command` |
| `esp32_esp_sr_last_phrase` | Value | (none) | `esp32_esp_sr_last_phrase()` | `esp32_sr_last_phrase` |
| `esp32_esp_sr_event_constant` | Value | EVENT(dropdown) | `esp32_esp_sr_event_constant(SR_EVENT_WAKEWORD)` | `SR_EVENT_WAKEWORD` |
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CHANNELS | SR_CHANNELS_MONO, SR_CHANNELS_STEREO | esp32_esp_sr_begin |
| ACTION | end, pause, resume | esp32_esp_sr_control |
| MODE | SR_MODE_WAKEWORD, SR_MODE_COMMAND | esp32_esp_sr_set_mode |
| EVENT | SR_EVENT_WAKEWORD, SR_EVENT_WAKEWORD_CHANNEL, SR_EVENT_COMMAND, SR_EVENT_TIMEOUT | esp32_esp_sr_event_constant |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_loop()
    serial_println(Serial, esp32_esp_sr_begin($I2S, text("value"), text("value"), text("value"), text("value"), SR_CHANNELS_MONO, text("value")))
```
