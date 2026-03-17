# Arduino WiFiS3

Arduino UNO R4 WiFi 的 WiFiS3 库 Blockly 封装，提供 WiFi 连接、网络查询、网络扫描和配置功能。

## Library Info
- **Name**: @aily-project/lib-r4-wifis3
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `wifis3_begin` | Statement | SSID(input_value), PASS(input_value) | `wifis3_begin(text("ssid"), text("pass"))` | `WiFi.begin(ssid, pass); while(...) {}` |
| `wifis3_begin_open` | Statement | SSID(input_value) | `wifis3_begin_open(text("ssid"))` | `WiFi.begin(ssid); while(...) {}` |
| `wifis3_begin_ap` | Statement | SSID(input_value), PASS(input_value), CHANNEL(input_value) | `wifis3_begin_ap(text("MyAP"), text("pass"), math_number(1))` | `WiFi.beginAP(ssid, pass, ch);` |
| `wifis3_disconnect` | Statement | (none) | `wifis3_disconnect()` | `WiFi.disconnect();` |
| `wifis3_wait_for_connection` | Statement | TIMEOUT(input_value) | `wifis3_wait_for_connection(math_number(30000))` | wait loop with timeout |
| `wifis3_status` | Value | (none) | `wifis3_status()` | `WiFi.status()` |
| `wifis3_is_connected` | Value | (none) | `wifis3_is_connected()` | `(WiFi.status() == WL_CONNECTED)` |
| `wifis3_local_ip` | Value | (none) | `wifis3_local_ip()` | `ipToString(WiFi.localIP())` |
| `wifis3_mac_address` | Value | (none) | `wifis3_mac_address()` | `macToString()` |
| `wifis3_gateway_ip` | Value | (none) | `wifis3_gateway_ip()` | `ipToString(WiFi.gatewayIP())` |
| `wifis3_subnet_mask` | Value | (none) | `wifis3_subnet_mask()` | `ipToString(WiFi.subnetMask())` |
| `wifis3_dns_ip` | Value | DNS_INDEX(field_dropdown) | `wifis3_dns_ip(0)` | `ipToString(WiFi.dnsIP(0))` |
| `wifis3_set_dns` | Statement | DNS1(input_value), DNS2(input_value) | `wifis3_set_dns(text("8.8.8.8"), text("8.8.4.4"))` | `WiFi.setDNS(dns1, dns2);` |
| `wifis3_config_ip` | Statement | IP(input_value), GW(input_value), SUBNET(input_value) | `wifis3_config_ip(text("192.168.1.100"), text("192.168.1.1"), text("255.255.255.0"))` | `WiFi.config(ip, gw, subnet);` |
| `wifis3_set_hostname` | Statement | HOSTNAME(input_value) | `wifis3_set_hostname(text("arduino"))` | `WiFi.setHostname(name);` |
| `wifis3_scan_networks` | Statement | (none) | `wifis3_scan_networks()` | `WiFi.scanNetworks();` |
| `wifis3_scanned_networks_count` | Value | (none) | `wifis3_scanned_networks_count()` | `WiFi.scanNetworks()` |
| `wifis3_ssid_by_index` | Value | INDEX(input_value) | `wifis3_ssid_by_index(math_number(0))` | `WiFi.SSID(index)` |
| `wifis3_rssi_by_index` | Value | INDEX(input_value) | `wifis3_rssi_by_index(math_number(0))` | `WiFi.RSSI(index)` |
| `wifis3_ping` | Value | HOST(input_value), TTL(input_value), COUNT(input_value) | `wifis3_ping(text("8.8.8.8"), math_number(128), math_number(1))` | `WiFi.ping(host, ttl, count)` |
| `wifis3_firmware_version` | Value | (none) | `wifis3_firmware_version()` | `WiFi.firmwareVersion()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DNS_INDEX | 0, 1 | 0 = Primary DNS, 1 = Secondary DNS |

## ABS Examples

### Connect to WiFi and print IP
```
arduino_setup()
    wifis3_begin(text("MyNetwork"), text("password123"))
    wifis3_wait_for_connection(math_number(30000))
    serial_println(Serial, wifis3_local_ip())

arduino_loop()
    time_delay(math_number(1000))
```

### Start WiFi AP
```
arduino_setup()
    wifis3_begin_ap(text("MyDevice"), text("12345678"), math_number(1))
    serial_println(Serial, wifis3_local_ip())
```

### Check connection and reconnect
```
arduino_setup()
    serial_begin(Serial, 9600)
    wifis3_begin(text("MyNetwork"), text("pass"))
    wifis3_wait_for_connection(math_number(30000))

arduino_loop()
    controls_if()
        @IF0: wifis3_is_connected()
        @DO0:
            serial_println(Serial, text("Connected"))
        @ELSE:
            serial_println(Serial, text("Disconnected"))
            wifis3_begin(text("MyNetwork"), text("pass"))
    time_delay(math_number(5000))
```

### Scan and list networks
```
arduino_setup()
    serial_begin(Serial, 9600)
    wifis3_scan_networks()
    controls_for($i, math_number(0), wifis3_scanned_networks_count(), math_number(1))
        serial_println(Serial, wifis3_ssid_by_index(variables_get($i)))
```

### Configure static IP
```
arduino_setup()
    wifis3_config_ip(text("192.168.1.100"), text("192.168.1.1"), text("255.255.255.0"))
    wifis3_set_dns(text("8.8.8.8"), text("8.8.4.4"))
    wifis3_begin(text("MyNetwork"), text("pass"))
    wifis3_wait_for_connection(math_number(30000))
```

## Notes

1. **Global object**: WiFi is an Arduino built-in global object; no initialization block needed — all blocks call WiFi methods directly
2. **Auto include**: All blocks automatically add `#include <WiFiS3.h>`
3. **wifis3_begin auto-waits**: `wifis3_begin` and `wifis3_begin_open` include a built-in retry loop until connected
4. **IP as String**: `wifis3_local_ip`, `wifis3_gateway_ip`, `wifis3_subnet_mask` return String via helper function `ipToString()`
5. **Static IP before connect**: Call `wifis3_config_ip` before `wifis3_begin` for static IP configuration
                  }
                }
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

### WiFi连接流程
1. 使用 `wifis3_begin` 或 `wifis3_begin_open` 启动连接
2. 使用 `wifis3_wait_for_connection` 等待连接完成
3. 可选：使用 `wifis3_is_connected` 检查连接状态

### 信息查询
- **IP地址类**: localIP、gatewayIP、subnetMask、dnsIP 都返回字符串格式
- **扫描网络**: 先调用 `scanNetworks()` 扫描，再使用索引查询SSID和RSSI
- **MAC地址**: 返回格式 `XX:XX:XX:XX:XX:XX`

### 常见错误
- ❌ `wifis3_ssid_by_index` 前未先调用 `wifis3_scan_networks`
  - ✅ 先扫描网络，再查询结果

- ❌ 在 `wifis3_begin` 后立即调用 `wifis3_local_ip` 但WiFi未连接
  - ✅ 使用 `wifis3_wait_for_connection` 等待连接完成

- ❌ 使用错误的配置IP格式（整数而非字符串）
  - ✅ IP配置必须使用字符串格式如 `"192.168.1.100"`

## 支持的WiFi模式

| 模式 | 块 | 说明 |
|------|-----|------|
| STA（Station） | wifis3_begin* | 连接到现有WiFi网络 |
| AP（Access Point） | wifis3_begin_ap | 创建WiFi热点 |
| 查询状态 | wifis3_status, wifis3_is_connected | 检查连接状态 |
| 网络信息 | wifis3_local_ip, wifis3_mac_address等 | 获取设备网络信息 |

## 支持的加密方式（通过 wifis3_begin）
- **WPA/WPA2**: 使用 `wifis3_begin(ssid, password)`
- **开放网络**: 使用 `wifis3_begin_open(ssid)`

## 智能特性

### 自动Serial初始化
当生成包含输出信息的代码时，自动在setup中添加 `Serial.begin(9600);`

### IP地址转换
内部自动使用 `ipToString()` 函数将IPAddress对象转换为可读的字符串格式

### MAC地址转换
自动使用 `macToString()` 函数将字节数组转换为标准MAC地址格式

---

此库提供了Arduino UNO R4 WiFi所有核心WiFi功能的图形化接口，用户可以直观地进行WiFi连接、状态查询、网络扫描等操作。
