# WOL 网络唤醒

通过发送 Wake-on-LAN 魔术包唤醒局域网内的设备。

## Library Info
- **Name**: @aily-project/lib-wol
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `wol_send` | Statement | MAC(input_value/String), BROADCAST_IP(input_value/String), PORT(input_value/Number) | `wol_send(text("00:11:22:33:44:55"), text("255.255.255.255"), math_number(9))` | `wolSendMagicPacket("00:11:22:33:44:55", "255.255.255.255", 9);` |
| `wol_send_result` | Value(Boolean) | MAC(input_value/String), BROADCAST_IP(input_value/String), PORT(input_value/Number) | `wol_send_result(text("00:11:22:33:44:55"), text("255.255.255.255"), math_number(9))` | `wolSendMagicPacket("00:11:22:33:44:55", "255.255.255.255", 9)` |

## ABS Examples

### 基本唤醒设备
```
arduino_setup()
    serial_begin(Serial, 9600)
    wol_send(text("00:11:22:33:44:55"), text("255.255.255.255"), math_number(9))
    serial_println(Serial, text("Magic Packet sent"))
```

### 唤醒并检查结果
```
arduino_setup()
    serial_begin(Serial, 9600)
    controls_if()
        @IF0: wol_send_result(text("AA:BB:CC:DD:EE:FF"), text("192.168.1.255"), math_number(9))
        @DO0:
            serial_println(Serial, text("Wake up success"))
        @ELSE:
            serial_println(Serial, text("Wake up failed"))
```

## Notes

1. **网络要求**: 使用前需确保开发板已通过 WiFi 连接到局域网
2. **MAC 地址格式**: 支持 `00:11:22:33:44:55` 和 `00-11-22-33-44-55` 两种格式
3. **广播地址**: 默认 `255.255.255.255`，某些路由器可能需要使用子网广播地址（如 `192.168.1.255`）
4. **端口**: WOL 标准端口为 9，一般无需修改
5. **快操作模式**: 自动创建 WiFiUDP 对象和辅助函数，无需手动管理
