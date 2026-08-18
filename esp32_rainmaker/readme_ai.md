# ESP32 RainMaker - AI 使用说明

## Library Info
- **Name**: @aily-project/lib-esp32-rainmaker
- **Version**: 0.0.1

## 适用范围

ESP32 RainMaker 云端设备积木，支持节点、标准设备、服务、参数上报与重置。

芯片/配置约束：构建配置必须包含 ESP RainMaker 工作队列；实际联网通常还需配合 WiFiProv 完成配网。

## 代码生成约定

- 所有积木类型均使用 `esp32_` 前缀。
- generator.js 会自动添加 SDK 头文件和必要的全局对象。
- 创建对象类积木应在初始化阶段执行；状态查询积木可在循环或条件中使用。
- 不打包 SDK 源码，也不生成 src.7z。

## 积木

- `esp32_rainmaker_init_node`：创建 RainMaker 节点。
- `esp32_rainmaker_add_device`：创建标准设备并添加到节点。
- `esp32_rainmaker_enable_service`：启用 RainMaker 标准服务。
- `esp32_rainmaker_start`：启动 RainMaker 云服务。
- `esp32_rainmaker_stop`：停止 RainMaker 云服务。
- `esp32_rainmaker_report`：更新并上报设备参数。
- `esp32_rainmaker_reset`：延时执行 RainMaker 恢复出厂或 Wi-Fi 重置。
- `esp32_rainmaker_node_id`：读取 RainMaker 节点 ID。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------|------------|----------------|
| `esp32_rainmaker_init_node` | Statement | NODE(field_variable), NAME(input_value) | `esp32_rainmaker_init_node($rainmakerNode, text("value"))` | `rainmakerNode = RMaker.initNode("value");` |
| `esp32_rainmaker_add_device` | Statement | NODE(field_variable), CLASS(dropdown), DEVICE(field_variable), NAME(input_value), VALUE(input_value) | `esp32_rainmaker_add_device($rainmakerNode, Switch, $rainmakerDevice, text("value"), math_number(0))` | `rainmakerDevice = ::Switch("value", NULL, 1); ↵ rainmakerNode.addDevice(rainmakerDevice);` |
| `esp32_rainmaker_enable_service` | Statement | SERVICE(dropdown) | `esp32_rainmaker_enable_service("enableOTA(OTA_USING_TOPICS)")` | `RMaker.enableOTA(OTA_USING_TOPICS);` |
| `esp32_rainmaker_start` | Statement | (none) | `esp32_rainmaker_start()` | `RMaker.start();` |
| `esp32_rainmaker_stop` | Statement | (none) | `esp32_rainmaker_stop()` | `RMaker.stop();` |
| `esp32_rainmaker_report` | Statement | DEVICE(field_variable), PARAM(input_value), VALUE(input_value) | `esp32_rainmaker_report($rainmakerDevice, text("value"), math_number(0))` | `rainmakerDevice.updateAndReportParam("value", 1);` |
| `esp32_rainmaker_reset` | Statement | RESET(dropdown), SECONDS(input_value) | `esp32_rainmaker_reset(RMakerFactoryReset, math_number(0))` | `RMakerFactoryReset(1);` |
| `esp32_rainmaker_node_id` | Value | NODE(field_variable) | `esp32_rainmaker_node_id($rainmakerNode)` | `String(rainmakerNode.getNodeID())` |
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CLASS | Switch, LightBulb, Fan, TemperatureSensor | esp32_rainmaker_add_device |
| SERVICE | enableOTA(OTA_USING_TOPICS), enableTZService(), enableSchedule(), enableScenes() | esp32_rainmaker_enable_service |
| RESET | RMakerFactoryReset, RMakerWiFiReset | esp32_rainmaker_reset |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    esp32_rainmaker_init_node($rainmakerNode, text("value"))
```
