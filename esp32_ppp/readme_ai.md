# ESP32 PPP 蜂窝网络 - AI 使用说明

## Library Info
- **Name**: @aily-project/lib-esp32-ppp
- **Version**: 0.0.1

## 适用范围

ESP32 PPP 蜂窝调制解调器积木，支持 APN、串口引脚、联网、状态、短信和 AT 命令。

芯片/配置约束：开发板构建配置必须启用 LWIP PPP 与 esp-modem，且硬件供电应满足蜂窝模块峰值电流。

## 代码生成约定

- 所有积木类型均使用 `esp32_` 前缀。
- generator.js 会自动添加 SDK 头文件和必要的全局对象。
- 创建对象类积木应在初始化阶段执行；状态查询积木可在循环或条件中使用。
- 不打包 SDK 源码，也不生成 src.7z。

## 积木

- `esp32_ppp_set_apn`：设置蜂窝网络 APN 与可选 SIM PIN。
- `esp32_ppp_set_pins`：设置调制解调器 UART 和流控引脚。
- `esp32_ppp_set_reset`：设置调制解调器硬件复位引脚。
- `esp32_ppp_begin`：启动 PPP 调制解调器。
- `esp32_ppp_end`：停止 PPP 数据连接。
- `esp32_ppp_attached`：检查调制解调器是否附着网络。
- `esp32_ppp_sync`：检查调制解调器是否响应 AT。
- `esp32_ppp_info_number`：读取调制解调器数值状态。
- `esp32_ppp_info_text`：读取调制解调器身份或运营商文本。
- `esp32_ppp_sms`：发送 SMS 短信。
- `esp32_ppp_at`：发送 AT 命令并返回文本响应。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------|------------|----------------|
| `esp32_ppp_set_apn` | Statement | APN(input_value), PIN(input_value) | `esp32_ppp_set_apn(text("value"), text("value"))` | `PPP.setApn("value"); ↵ PPP.setPin("value");` |
| `esp32_ppp_set_pins` | Statement | TX(input_value), RX(input_value), RTS(input_value), CTS(input_value) | `esp32_ppp_set_pins(math_number(0), math_number(0), math_number(0), math_number(0))` | `PPP.setPins(1, 1, 1, 1);` |
| `esp32_ppp_set_reset` | Statement | RST(input_value), ACTIVE_LOW(input_value) | `esp32_ppp_set_reset(math_number(0), logic_boolean(TRUE))` | `PPP.setResetPin(1, true);` |
| `esp32_ppp_begin` | Value | MODEL(dropdown), UART(input_value), BAUD(input_value) | `esp32_ppp_begin(PPP_MODEM_GENERIC, math_number(0), math_number(9600))` | `PPP.begin(PPP_MODEM_GENERIC, 1, 1)` |
| `esp32_ppp_end` | Statement | (none) | `esp32_ppp_end()` | `PPP.end();` |
| `esp32_ppp_attached` | Value | (none) | `esp32_ppp_attached()` | `PPP.attached()` |
| `esp32_ppp_sync` | Value | (none) | `esp32_ppp_sync()` | `PPP.sync()` |
| `esp32_ppp_info_number` | Value | INFO(dropdown) | `esp32_ppp_info_number(RSSI)` | `PPP.RSSI()` |
| `esp32_ppp_info_text` | Value | INFO(dropdown) | `esp32_ppp_info_text(IMEI)` | `PPP.IMEI()` |
| `esp32_ppp_sms` | Value | NUMBER(input_value), MESSAGE(input_value) | `esp32_ppp_sms(text("value"), text("value"))` | `PPP.sms("value", "value")` |
| `esp32_ppp_at` | Value | COMMAND(input_value), TIMEOUT(input_value) | `esp32_ppp_at(text("value"), math_number(1000))` | `PPP.cmd("value", 1)` |
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODEL | PPP_MODEM_GENERIC, PPP_MODEM_SIM7600, PPP_MODEM_SIM7070, PPP_MODEM_SIM7000, PPP_MODEM_BG96, PPP_MODEM_SIM800 | esp32_ppp_begin |
| INFO | RSSI, BER, networkMode, batteryVoltage, batteryLevel | esp32_ppp_info_number |
| INFO | IMEI, IMSI, moduleName, operatorName | esp32_ppp_info_text |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_loop()
    serial_println(Serial, esp32_ppp_begin(PPP_MODEM_GENERIC, math_number(0), math_number(9600)))
```
