# QuickESPNow

QuickESPNow 是一个面向 ESP32 的 ESP-NOW 简化通信库，适合快速完成无线文本收发、广播通信和回调处理。

## 库信息

| 字段 | 值 |
|------|----|
| 包名 | @aily-project/lib-quickespnow |
| 版本 | 0.8.1 |
| 作者 | German Martin |
| 源码 | https://github.com/gmag11/QuickEspNow |
| 许可证 | MIT |

## 块定义

| 块类型 | 连接 | 字段/输入 | .abi格式 | 生成代码 |
|--------|------|-----------|----------|----------|
| `quickespnow_init_current` | 语句块 | INTERFACE(dropdown), SEND_MODE(dropdown) | `"INTERFACE":"WIFI_IF_STA"` | `quickEspNow.begin(CURRENT_WIFI_CHANNEL, WIFI_IF_STA, true);` |
| `quickespnow_init_channel` | 语句块 | CHANNEL(input), INTERFACE(dropdown), SEND_MODE(dropdown) | `"SEND_MODE":"true"` | `quickEspNow.begin(channel, WIFI_IF_STA, true);` |
| `quickespnow_stop` | 语句块 | 无 | - | `quickEspNow.stop();` |
| `quickespnow_set_channel` | 语句块 | CHANNEL(input) | `"inputs":{"CHANNEL":...}` | `quickEspNow.setChannel(channel);` |
| `quickespnow_enable_transmit` | 语句块 | ENABLE(input) | `"inputs":{"ENABLE":...}` | `quickEspNow.enableTransmit(enable);` |
| `quickespnow_send_text` | 语句块 | MAC(input), MESSAGE(input) | `"inputs":{"MAC":...,"MESSAGE":...}` | `_quickespnow_last_send_result = _quickespnow_send_text_to_mac(...);` |
| `quickespnow_send_broadcast_text` | 语句块 | MESSAGE(input) | `"inputs":{"MESSAGE":...}` | `_quickespnow_last_send_result = _quickespnow_send_broadcast_text(...);` |
| `quickespnow_on_received` | Hat块 | HANDLER(statement) | `"inputs":{"HANDLER":...}` | `quickEspNow.onDataRcvd(...);` |
| `quickespnow_on_sent` | Hat块 | HANDLER(statement) | `"inputs":{"HANDLER":...}` | `quickEspNow.onDataSent(...);` |
| `quickespnow_ready_to_send` | 值块 | 无 | - | `quickEspNow.readyToSendData()` |
| `quickespnow_last_send_result` | 值块 | 无 | - | `_quickespnow_last_send_result` |
| `quickespnow_get_max_message_length` | 值块 | 无 | - | `quickEspNow.getMaxMessageLength()` |
| `quickespnow_get_address_length` | 值块 | 无 | - | `quickEspNow.getAddressLength()` |
| `quickespnow_received_message` | 值块 | 无 | - | `_quickespnow_rx_message` |
| `quickespnow_received_length` | 值块 | 无 | - | `_quickespnow_rx_length` |
| `quickespnow_received_rssi` | 值块 | 无 | - | `_quickespnow_rx_rssi` |
| `quickespnow_received_is_broadcast` | 值块 | 无 | - | `_quickespnow_rx_is_broadcast` |
| `quickespnow_received_sender_mac` | 值块 | 无 | - | `_quickespnow_rx_sender_mac` |
| `quickespnow_sent_target_mac` | 值块 | 无 | - | `_quickespnow_tx_target_mac` |
| `quickespnow_sent_status` | 值块 | 无 | - | `_quickespnow_tx_status` |

## 字段类型映射

| 类型 | .abi格式 | 示例 |
|------|----------|------|
| field_dropdown | 字符串 | `"INTERFACE":"WIFI_IF_STA"` |
| input_value | 嵌套块 | `"inputs":{"MESSAGE":{"block":...}}` |
| input_statement | 语句输入 | `"inputs":{"HANDLER":{"block":...}}` |

## 连接规则

- 语句块具有 `previousStatement` 和 `nextStatement`，用于流程连接。
- 值块只有 `output`，用于作为参数或条件输入。
- Hat块没有前后连接，只用于声明回调逻辑。
- 本库基于全局对象 `quickEspNow`，不需要创建对象变量。

## 使用示例

```json
{
	"type": "arduino_setup",
	"inputs": {
		"ARDUINO_SETUP": {
			"block": {
				"type": "quickespnow_init_channel",
				"fields": {
					"INTERFACE": "WIFI_IF_STA",
					"SEND_MODE": "true"
				},
				"inputs": {
					"CHANNEL": {
						"shadow": {
							"type": "math_number",
							"fields": {
								"NUM": 1
							}
						}
					}
				}
			}
		}
	}
}
```

## 重要规则

1. 使用前应先设置 WiFi 的 STA 或 AP 模式。
2. 若未连接 WiFi，建议使用 `quickespnow_init_channel` 显式指定频道。
3. MAC 地址必须使用 `AA:BB:CC:DD:EE:FF` 格式。
4. 同一工程建议每类回调只保留一个块，避免后注册覆盖前注册。