# ESP32 Wi-Fi 配网 - AI 使用说明

## Library Info
- **Name**: @aily-project/lib-esp32-wifiprov
- **Version**: 0.0.1

## 适用范围

ESP32 WiFiProv 配网积木，提供 SoftAP/BLE 配网、自动停止控制和二维码输出。

芯片/配置约束：BLE 配网仅适用于启用 Bluetooth/NimBLE 的芯片；所有模式都需启用 Network Provisioning。

## 代码生成约定

- 所有积木类型均使用 `esp32_` 前缀。
- generator.js 会自动添加 SDK 头文件和必要的全局对象。
- 创建对象类积木应在初始化阶段执行；状态查询积木可在循环或条件中使用。
- 不打包 SDK 源码，也不生成 src.7z。

## 积木

- `esp32_wifiprov_begin_softap`：启动 SoftAP 配网服务。
- `esp32_wifiprov_begin_ble`：启动 BLE 配网服务（芯片需支持 BLE）。
- `esp32_wifiprov_end`：停止并清理配网服务。
- `esp32_wifiprov_disable_auto_stop`：禁用成功后的自动停止并设置延时。
- `esp32_wifiprov_print_qr`：向 Serial 打印二维码链接与负载。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------|------------|----------------|
| `esp32_wifiprov_begin_softap` | Statement | NAME(input_value), POP(input_value), KEY(input_value), RESET(input_value) | `esp32_wifiprov_begin_softap(text("value"), text("value"), text("value"), logic_boolean(TRUE))` | `WiFiProv.beginProvision(NETWORK_PROV_SCHEME_SOFTAP, NETWORK_PROV_SCHEME_HANDLER_NONE, NETWORK_PROV_SECURITY, "value", "value", "value", NULL, true);` |
| `esp32_wifiprov_begin_ble` | Statement | NAME(input_value), POP(input_value), RESET(input_value) | `esp32_wifiprov_begin_ble(text("value"), text("value"), logic_boolean(TRUE))` | `#if (defined(CONFIG_BLUEDROID_ENABLED) &#124;&#124; defined(CONFIG_NIMBLE_ENABLED)) && __has_include("esp_bt.h") ↵ WiFiProv.beginProvision(NETWORK_PROV_SCHEME_BLE, NETWORK_PROV_SCHEME_HANDLER_FREE_BTDM, NETWORK_PROV_SECURITY, "value", "value", NULL, NULL, true); ↵ #endif` |
| `esp32_wifiprov_end` | Statement | (none) | `esp32_wifiprov_end()` | `WiFiProv.endProvision();` |
| `esp32_wifiprov_disable_auto_stop` | Value | DELAY(input_value) | `esp32_wifiprov_disable_auto_stop(math_number(1000))` | `WiFiProv.disableAutoStop(1)` |
| `esp32_wifiprov_print_qr` | Statement | NAME(input_value), POP(input_value), TRANSPORT(dropdown) | `esp32_wifiprov_print_qr(text("value"), text("value"), softap)` | `WiFiProv.printQR("value", "value", "softap", Serial);` |
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TRANSPORT | softap, ble | esp32_wifiprov_print_qr |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    esp32_wifiprov_begin_softap(text("value"), text("value"), text("value"), logic_boolean(TRUE))
```
