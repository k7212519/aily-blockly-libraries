# ESP32 Zigbee - AI 使用说明

## Library Info
- **Name**: @aily-project/lib-esp32-zigbee
- **Version**: 0.0.1

## 适用范围

ESP32 Zigbee 设备积木，支持网络角色、开放入网以及灯、温度、占用和接触传感器端点。

芯片/配置约束：仅适用于带 IEEE 802.15.4 的 ESP32-C5/C6/H2，Arduino 构建菜单必须选择与 begin 角色一致的 Zigbee 模式和分区。

## 代码生成约定

- 所有积木类型均使用 `esp32_` 前缀。
- generator.js 会自动添加 SDK 头文件和必要的全局对象。
- 创建对象类积木应在初始化阶段执行；状态查询积木可在循环或条件中使用。
- 不打包 SDK 源码，也不生成 src.7z。

## 积木

- `esp32_zigbee_begin`：以指定角色启动 Zigbee。
- `esp32_zigbee_connected`：检查 Zigbee 是否已加入网络。
- `esp32_zigbee_network`：控制设备加入网络。
- `esp32_zigbee_factory_reset`：清除 Zigbee 网络配置并重启。
- `esp32_zigbee_create_light`：创建开关灯端点并加入 Zigbee。
- `esp32_zigbee_set_light`：更新 Zigbee 灯状态。
- `esp32_zigbee_get_light`：读取 Zigbee 灯当前状态。
- `esp32_zigbee_create_temp`：创建温度传感器端点并加入 Zigbee。
- `esp32_zigbee_set_temp`：设置并上报温度。
- `esp32_zigbee_create_occupancy`：创建占用传感器端点并加入 Zigbee。
- `esp32_zigbee_set_occupancy`：设置并上报占用状态。
- `esp32_zigbee_create_contact`：创建接触传感器端点并加入 Zigbee。
- `esp32_zigbee_set_contact`：设置并上报接触状态。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------|------------|----------------|
| `esp32_zigbee_begin` | Value | ROLE(dropdown), ERASE(input_value) | `esp32_zigbee_begin(ZIGBEE_END_DEVICE, logic_boolean(TRUE))` | `Zigbee.begin(ZIGBEE_END_DEVICE, true)` |
| `esp32_zigbee_connected` | Value | (none) | `esp32_zigbee_connected()` | `Zigbee.connected()` |
| `esp32_zigbee_network` | Statement | ACTION(dropdown), SECONDS(input_value) | `esp32_zigbee_network(openNetwork, math_number(0))` | `Zigbee.openNetwork(1);` |
| `esp32_zigbee_factory_reset` | Statement | (none) | `esp32_zigbee_factory_reset()` | `Zigbee.factoryReset();` |
| `esp32_zigbee_create_light` | Statement | DEVICE(field_variable), ENDPOINT(input_value) | `esp32_zigbee_create_light($zigbeeLight, math_number(0))` | `Zigbee.addEndpoint(&zigbeeLight);` |
| `esp32_zigbee_set_light` | Statement | DEVICE(field_variable), STATE(input_value) | `esp32_zigbee_set_light($zigbeeLight, logic_boolean(TRUE))` | `zigbeeLight.setLight(true);` |
| `esp32_zigbee_get_light` | Value | DEVICE(field_variable) | `esp32_zigbee_get_light($zigbeeLight)` | `zigbeeLight.getLightState()` |
| `esp32_zigbee_create_temp` | Statement | DEVICE(field_variable), ENDPOINT(input_value) | `esp32_zigbee_create_temp($zigbeeTemp, math_number(0))` | `Zigbee.addEndpoint(&zigbeeTemp);` |
| `esp32_zigbee_set_temp` | Statement | DEVICE(field_variable), VALUE(input_value) | `esp32_zigbee_set_temp($zigbeeTemp, math_number(0))` | `zigbeeTemp.setTemperature(1); ↵ zigbeeTemp.reportTemperature();` |
| `esp32_zigbee_create_occupancy` | Statement | DEVICE(field_variable), ENDPOINT(input_value) | `esp32_zigbee_create_occupancy($zigbeeOccupancy, math_number(0))` | `Zigbee.addEndpoint(&zigbeeOccupancy);` |
| `esp32_zigbee_set_occupancy` | Statement | DEVICE(field_variable), VALUE(input_value) | `esp32_zigbee_set_occupancy($zigbeeOccupancy, logic_boolean(TRUE))` | `zigbeeOccupancy.setOccupancy(true); ↵ zigbeeOccupancy.report();` |
| `esp32_zigbee_create_contact` | Statement | DEVICE(field_variable), ENDPOINT(input_value) | `esp32_zigbee_create_contact($zigbeeContact, math_number(0))` | `Zigbee.addEndpoint(&zigbeeContact);` |
| `esp32_zigbee_set_contact` | Statement | DEVICE(field_variable), STATE(dropdown) | `esp32_zigbee_set_contact($zigbeeContact, setClosed)` | `zigbeeContact.setClosed();` |
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ROLE | ZIGBEE_END_DEVICE, ZIGBEE_ROUTER, ZIGBEE_COORDINATOR | esp32_zigbee_begin |
| ACTION | openNetwork, closeNetwork | esp32_zigbee_network |
| STATE | setClosed, setOpen | esp32_zigbee_set_contact |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_loop()
    serial_println(Serial, esp32_zigbee_begin(ZIGBEE_END_DEVICE, logic_boolean(TRUE)))
```
