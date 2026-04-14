# nRF54 BLE

nRF54L15低功耗蓝牙(BLE)库，支持广播、连接、GATT服务、Nordic UART透传和扫描功能

## Library Info
- **Name**: @aily-project/lib-nrf54_ble
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `nrf54_ble_init` | Statement | TX_POWER(dropdown) | `nrf54_ble_init(-8)` | `_nrf54_ble.begin(-8);` |
| `nrf54_ble_end` | Statement | (none) | `nrf54_ble_end()` | `_nrf54_ble.end();` |
| `nrf54_ble_set_name` | Statement | NAME(input_value) | `nrf54_ble_set_name(text("XIAO-nRF54"))` | `_nrf54_ble.setAdvertisingName("XIAO-nRF54", true);` |
| `nrf54_ble_set_address` | Statement | ADDRESS(input_value), ADDR_TYPE(dropdown) | `nrf54_ble_set_address(text("C0:DE:54:15:00:01"), kRandomStatic)` | `_nrf54_ble.setDeviceAddressString("...", BleAddressType::kRandomStatic);` |
| `nrf54_ble_get_address` | Value(String) | (none) | `nrf54_ble_get_address()` | `_nrf54_ble_get_addr_str()` |
| `nrf54_ble_set_tx_power` | Statement | TX_POWER(dropdown) | `nrf54_ble_set_tx_power(0)` | `_nrf54_ble.setTxPowerDbm(0);` |
| `nrf54_ble_set_adv_type` | Statement | PDU_TYPE(dropdown) | `nrf54_ble_set_adv_type(kAdvInd)` | `_nrf54_ble.setAdvertisingPduType(BleAdvPduType::kAdvInd);` |
| `nrf54_ble_set_adv_data_raw` | Statement | FLAGS(checkbox), INCLUDE_NAME(checkbox) | `nrf54_ble_set_adv_data_raw(TRUE, TRUE)` | `_nrf54_ble.buildAdvertisingPacket();` |
| `nrf54_ble_set_scan_response_name` | Statement | NAME(input_value) | `nrf54_ble_set_scan_response_name(text("XIAO-nRF54"))` | `_nrf54_ble.setScanResponseName("XIAO-nRF54");` |
| `nrf54_ble_advertise_once` | Statement | (none) | `nrf54_ble_advertise_once()` | `_nrf54_ble.advertiseEvent(350U, 700000UL);` |
| `nrf54_ble_advertise_connectable` | Statement | (none) | `nrf54_ble_advertise_connectable()` | `_nrf54_ble.advertiseInteractEvent(&_nrf54_ble_adv_interaction, ...);` |
| `nrf54_ble_is_connected` | Value(Boolean) | (none) | `nrf54_ble_is_connected()` | `_nrf54_ble.isConnected()` |
| `nrf54_ble_disconnect` | Statement | (none) | `nrf54_ble_disconnect()` | `_nrf54_ble.disconnect();` |
| `nrf54_ble_poll_event` | Statement | (none) | `nrf54_ble_poll_event()` | `_nrf54_ble.pollConnectionEvent(&_nrf54_ble_conn_event, 450000UL);` |
| `nrf54_ble_on_connected` | Hat | HANDLER(input_statement) | `nrf54_ble_on_connected() @HANDLER: ...` | registers connected callback |
| `nrf54_ble_on_disconnected` | Hat | HANDLER(input_statement) | `nrf54_ble_on_disconnected() @HANDLER: ...` | registers disconnected callback |
| `nrf54_ble_set_gatt_device_name` | Statement | NAME(input_value) | `nrf54_ble_set_gatt_device_name(text("XIAO"))` | `_nrf54_ble.setGattDeviceName("XIAO");` |
| `nrf54_ble_set_gatt_battery` | Statement | LEVEL(input_value) | `nrf54_ble_set_gatt_battery(math_number(100))` | `_nrf54_ble.setGattBatteryLevel(100);` |
| `nrf54_ble_clear_gatt` | Statement | (none) | `nrf54_ble_clear_gatt()` | `_nrf54_ble.clearCustomGatt();` |
| `nrf54_ble_add_service_16` | Statement | SVC_VAR(field_input), UUID(input_value) | `nrf54_ble_add_service_16("svcHandle", text("0xFFF0"))` | `_nrf54_ble.addCustomGattService(strtoul("0xFFF0", NULL, 16), &svcHandle);` |
| `nrf54_ble_add_service_128` | Statement | SVC_VAR(field_input), UUID(input_value) | `nrf54_ble_add_service_128("svcHandle", text("12345678-..."))` | `_nrf54_ble.addCustomGattService128(uuid128, &svcHandle);` |
| `nrf54_ble_add_characteristic` | Statement | SVC_VAR(field_variable), CHAR_VAR(field_input), UUID(input_value), PROPS(dropdown) | `nrf54_ble_add_characteristic($svcHandle, "charHandle", text("0xFFF1"), READ_NOTIFY)` | `_nrf54_ble.addCustomGattCharacteristic(svcHandle, ..., &charHandle, &charHandle_cccd);` |
| `nrf54_ble_set_char_value` | Statement | CHAR_VAR(field_variable), VALUE(input_value) | `nrf54_ble_set_char_value($charHandle, text("Hello"))` | `_nrf54_ble.setCustomGattCharacteristicValue(charHandle, ...);` |
| `nrf54_ble_notify_char` | Statement | CHAR_VAR(field_variable) | `nrf54_ble_notify_char($charHandle)` | `_nrf54_ble.notifyCustomGattCharacteristic(charHandle, false);` |
| `nrf54_ble_is_cccd_enabled` | Value(Boolean) | CHAR_VAR(field_variable) | `nrf54_ble_is_cccd_enabled($charHandle)` | `_nrf54_ble.isCustomGattCccdEnabled(charHandle, false)` |
| `nrf54_ble_on_char_write` | Hat | CHAR_VAR(field_variable), HANDLER(input_statement) | `nrf54_ble_on_char_write($charHandle) @HANDLER: ...` | registers write callback for characteristic |
| `nrf54_ble_char_write_value` | Value(String) | (none) | `nrf54_ble_char_write_value()` | `_nrf54_ble_last_write_value` |
| `nrf54_ble_nus_init` | Statement | NAME(input_value) | `nrf54_ble_nus_init(text("X54-NUS"))` | full NUS init sequence |
| `nrf54_ble_nus_available` | Value(Number) | (none) | `nrf54_ble_nus_available()` | `_nrf54_nus.available()` |
| `nrf54_ble_nus_read_string` | Value(String) | (none) | `nrf54_ble_nus_read_string()` | `_nrf54_nus_read_string()` |
| `nrf54_ble_nus_write` | Statement | DATA(input_value) | `nrf54_ble_nus_write(text("Hello"))` | `_nrf54_nus.write(...)` |
| `nrf54_ble_nus_println` | Statement | DATA(input_value) | `nrf54_ble_nus_println(text("Hello"))` | `_nrf54_nus.write(... + "\r\n")` |
| `nrf54_ble_nus_connected` | Value(Boolean) | (none) | `nrf54_ble_nus_connected()` | `_nrf54_nus.isConnected()` |
| `nrf54_ble_nus_service` | Statement | (none) | `nrf54_ble_nus_service()` | `_nrf54_nus_service_loop();` |
| `nrf54_ble_scan_passive` | Value(Boolean) | (none) | `nrf54_ble_scan_passive()` | `_nrf54_ble.scanCycle(&_nrf54_ble_scan_pkt, 2000000UL)` |
| `nrf54_ble_scan_active` | Value(Boolean) | (none) | `nrf54_ble_scan_active()` | `_nrf54_ble.scanActiveCycle(&_nrf54_ble_active_scan_result, ...)` |
| `nrf54_ble_scan_get_address` | Value(String) | (none) | `nrf54_ble_scan_get_address()` | `_nrf54_ble_scan_addr_str()` |
| `nrf54_ble_scan_get_rssi` | Value(Number) | (none) | `nrf54_ble_scan_get_rssi()` | `_nrf54_ble_active_scan_result.advRssiDbm` |
| `nrf54_ble_scan_get_name` | Value(String) | (none) | `nrf54_ble_scan_get_name()` | `_nrf54_ble_scan_parse_name()` |
| `nrf54_ble_peripheral_quick` | Hat | NAME(input_value), ON_RECEIVE(input_statement) | `nrf54_ble_peripheral_quick(text("XIAO-nRF54")) @ON_RECEIVE: ...` | full NUS peripheral setup + loop |
| `nrf54_ble_peripheral_received_data` | Value(String) | (none) | `nrf54_ble_peripheral_received_data()` | `_nrf54_ble_rx_data` |
| `nrf54_ble_peripheral_send` | Statement | DATA(input_value) | `nrf54_ble_peripheral_send(text("Hi"))` | `_nrf54_nus.write(...)` |
| `nrf54_ble_peripheral_connected` | Value(Boolean) | (none) | `nrf54_ble_peripheral_connected()` | `_nrf54_nus.isConnected()` |
| `nrf54_ble_power_low_power_mode` | Statement | (none) | `nrf54_ble_power_low_power_mode()` | `_nrf54_ble_power.setLatencyMode(PowerLatencyMode::kLowPower);` |
| `nrf54_ble_battery_percent` | Value(Number) | (none) | `nrf54_ble_battery_percent()` | `_nrf54_ble_read_battery()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TX_POWER | 8, 4, 0, -4, -8, -12, -16, -20, -40 | Transmit power in dBm |
| ADDR_TYPE | kRandomStatic, kPublic | BLE address type |
| PDU_TYPE | kAdvInd, kAdvNonConnInd, kAdvScanInd | Advertising PDU type |
| PROPS | READ, WRITE, WRITE_NR, NOTIFY, INDICATE, READ_NOTIFY, READ_WRITE, READ_WRITE_NOTIFY | GATT characteristic properties |

## ABS Examples

### Quick Mode — NUS Peripheral (Simplest)

```
nrf54_ble_peripheral_quick(text("XIAO-nRF54"))
    @ON_RECEIVE:
        serial_println(Serial, nrf54_ble_peripheral_received_data())
        nrf54_ble_peripheral_send(text("OK"))
```

### NUS Transparent Bridge

```
arduino_setup()
    serial_begin(Serial, 9600)
    nrf54_ble_nus_init(text("X54-NUS"))

arduino_loop()
    nrf54_ble_nus_service()
    controls_if()
        @IF0: logic_compare(nrf54_ble_nus_available(), GT, math_number(0))
        @DO0:
            serial_println(Serial, nrf54_ble_nus_read_string())
```

### Custom GATT Service

```
arduino_setup()
    nrf54_ble_init(0)
    nrf54_ble_set_name(text("XIAO-GATT"))
    nrf54_ble_clear_gatt()
    nrf54_ble_add_service_16("mySvc", text("0xFFF0"))
    nrf54_ble_add_characteristic($mySvc, "myChar", text("0xFFF1"), READ_NOTIFY)
    nrf54_ble_set_gatt_device_name(text("XIAO-GATT"))

arduino_loop()
    nrf54_ble_advertise_connectable()
    controls_if()
        @IF0: nrf54_ble_is_connected()
        @DO0:
            nrf54_ble_poll_event()
            nrf54_ble_set_char_value($myChar, text("Hello"))
            nrf54_ble_notify_char($myChar)
```

### Active Scanning

```
arduino_setup()
    serial_begin(Serial, 115200)
    nrf54_ble_init(0)

arduino_loop()
    controls_if()
        @IF0: nrf54_ble_scan_active()
        @DO0:
            serial_println(Serial, nrf54_ble_scan_get_address())
            serial_println(Serial, nrf54_ble_scan_get_name())
            serial_println(Serial, nrf54_ble_scan_get_rssi())
```

## Notes

1. **Variable Creation**: `nrf54_ble_add_service_16("svcHandle", ...)` creates variable `$svcHandle` (uint16_t); `nrf54_ble_add_characteristic($svc, "charHandle", ...)` creates variable `$charHandle` (uint16_t)
2. **Initialization**: Place `nrf54_ble_init` or `nrf54_ble_nus_init` inside `arduino_setup()`
3. **Quick Mode**: `nrf54_ble_peripheral_quick` is a Hat block that auto-generates both setup and loop code — do NOT place inside `arduino_setup()` or `arduino_loop()`
4. **NUS Service Loop**: When using NUS blocks manually, `nrf54_ble_nus_service()` must be called in `arduino_loop()` — it handles advertising, connection events, and data transfer
5. **GATT Order**: Call `nrf54_ble_clear_gatt()` → `nrf54_ble_add_service_*` → `nrf54_ble_add_characteristic` in sequence before advertising
6. **Write Callback**: `nrf54_ble_char_write_value()` is only valid inside `nrf54_ble_on_char_write` handler
7. **Scan Results**: `nrf54_ble_scan_get_address/rssi/name` read from the last scan cycle result — call them after `nrf54_ble_scan_passive()` or `nrf54_ble_scan_active()` returns TRUE
8. **优先使用 GATT 方式**: 默认应优先使用 Custom GATT Service 方式实现 BLE 通信，除非用户的需求明确适合 NUS 透传场景（如简单的串口透传、快速双向文本收发），才使用 NUS 相关积木块。GATT 方式更灵活、可控，适合大多数自定义 BLE 应用
