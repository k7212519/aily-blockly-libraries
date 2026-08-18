# ESP32 Matter - AI 使用说明

## Library Info
- **Name**: @aily-project/lib-esp32-matter
- **Version**: 0.0.1

## 适用范围

ESP32 Matter 设备积木，覆盖配网状态、开关灯、调光灯及常用传感器端点。

芯片/配置约束：构建配置必须启用 ESP Matter 数据模型并选用 Matter 分区；端点必须在 Matter.begin() 之前创建。

## 代码生成约定

- 所有积木类型均使用 `esp32_` 前缀。
- generator.js 会自动添加 SDK 头文件和必要的全局对象。
- 创建对象类积木应在初始化阶段执行；状态查询积木可在循环或条件中使用。
- 不打包 SDK 源码，也不生成 src.7z。

## 积木

- `esp32_matter_begin`：启动 Matter 节点；端点需先创建。
- `esp32_matter_status`：查询 Matter 配网或连接状态。
- `esp32_matter_pairing_code`：获取 Matter 配对码或二维码 URL。
- `esp32_matter_decommission`：清除当前 Matter Fabric 配网信息。
- `esp32_matter_create_onoff_light`：创建开关灯端点。
- `esp32_matter_create_dimmable_light`：创建调光灯端点。
- `esp32_matter_light_set`：设置灯的开关或亮度。
- `esp32_matter_light_get`：读取灯的开关或亮度。
- `esp32_matter_create_numeric_sensor`：创建常用数值传感器端点。
- `esp32_matter_numeric_sensor_set`：更新并上报数值传感器值。
- `esp32_matter_create_boolean_sensor`：创建常用布尔传感器端点。
- `esp32_matter_boolean_sensor_set`：更新并上报布尔传感器值。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------|------------|----------------|
| `esp32_matter_begin` | Statement | (none) | `esp32_matter_begin()` | `Matter.begin();` |
| `esp32_matter_status` | Value | STATUS(dropdown) | `esp32_matter_status(isDeviceCommissioned)` | `Matter.isDeviceCommissioned()` |
| `esp32_matter_pairing_code` | Value | CODE(dropdown) | `esp32_matter_pairing_code(getManualPairingCode)` | `Matter.getManualPairingCode()` |
| `esp32_matter_decommission` | Statement | (none) | `esp32_matter_decommission()` | `Matter.decommission();` |
| `esp32_matter_create_onoff_light` | Statement | DEVICE(field_variable), STATE(input_value) | `esp32_matter_create_onoff_light($matterLight, logic_boolean(TRUE))` | `matterLight.begin(true);` |
| `esp32_matter_create_dimmable_light` | Statement | DEVICE(field_variable), STATE(input_value), BRIGHTNESS(input_value) | `esp32_matter_create_dimmable_light($matterDimmer, logic_boolean(TRUE), math_number(0))` | `matterDimmer.begin(true, 1);` |
| `esp32_matter_light_set` | Statement | DEVICE(field_variable), PROPERTY(dropdown), VALUE(input_value) | `esp32_matter_light_set($matterLight, setOnOff, math_number(0))` | `matterLight.setOnOff(1);` |
| `esp32_matter_light_get` | Value | DEVICE(field_variable), PROPERTY(dropdown) | `esp32_matter_light_get($matterLight, getOnOff)` | `matterLight.getOnOff()` |
| `esp32_matter_create_numeric_sensor` | Statement | DEVICE(field_variable), SENSOR(dropdown), VALUE(input_value) | `esp32_matter_create_numeric_sensor($matterSensor, MatterTemperatureSensor, math_number(0))` | `matterSensor.begin((double)(1));` |
| `esp32_matter_numeric_sensor_set` | Statement | DEVICE(field_variable), METHOD(dropdown), VALUE(input_value) | `esp32_matter_numeric_sensor_set($matterSensor, setTemperature, math_number(0))` | `matterSensor.setTemperature((double)(1));` |
| `esp32_matter_create_boolean_sensor` | Statement | DEVICE(field_variable), SENSOR(dropdown), VALUE(input_value) | `esp32_matter_create_boolean_sensor($matterContact, MatterContactSensor, logic_boolean(TRUE))` | `matterContact.begin(true);` |
| `esp32_matter_boolean_sensor_set` | Statement | DEVICE(field_variable), METHOD(dropdown), VALUE(input_value) | `esp32_matter_boolean_sensor_set($matterContact, setContact, logic_boolean(TRUE))` | `matterContact.setContact(true);` |
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| STATUS | isDeviceCommissioned, isWiFiConnected, isThreadConnected, isDeviceConnected | esp32_matter_status |
| CODE | getManualPairingCode, getOnboardingQRCodeUrl | esp32_matter_pairing_code |
| PROPERTY | setOnOff, setBrightness | esp32_matter_light_set |
| PROPERTY | getOnOff, getBrightness | esp32_matter_light_get |
| SENSOR | MatterTemperatureSensor, MatterHumiditySensor, MatterLightSensor, MatterPressureSensor | esp32_matter_create_numeric_sensor |
| METHOD | setTemperature, setHumidity, setIlluminance, setPressure | esp32_matter_numeric_sensor_set |
| SENSOR | MatterContactSensor, MatterOccupancySensor, MatterRainSensor, MatterWaterLeakDetector | esp32_matter_create_boolean_sensor |
| METHOD | setContact, setOccupancy, setRain, setLeak | esp32_matter_boolean_sensor_set |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    esp32_matter_begin()
```
