# nRF54 BLE

nRF54L15 BLE library with advertising, connections, GATT services, Nordic UART Service (NUS), and passive/active scanning

## Library Info
- **Name**: @aily-project/lib-nrf54-ble
- **Version**: 0.6.81

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `nrf54_ble_init` | Statement | TX_POWER(dropdown) | `nrf54_ble_init("8")` | `_nrf54_ble.begin(8);` |
| `nrf54_ble_end` | Statement | (none) | `nrf54_ble_end()` | `_nrf54_ble.end();` |
| `nrf54_ble_set_name` | Statement | NAME(input_value) | `nrf54_ble_set_name(math_number(0))` | `_nrf54_ble.setAdvertisingName(String(1).c_str(), true);` |
| `nrf54_ble_set_address` | Statement | ADDRESS(input_value), ADDR_TYPE(dropdown) | `nrf54_ble_set_address(text("value"), kRandomStatic)` | `_nrf54_ble.setDeviceAddressString("value", BleAddressType::kRandomStatic);` |
| `nrf54_ble_get_address` | Value | (none) | `nrf54_ble_get_address()` | `_nrf54_ble_get_addr_str()` |
| `nrf54_ble_set_tx_power` | Statement | TX_POWER(dropdown) | `nrf54_ble_set_tx_power("8")` | `_nrf54_ble.setTxPowerDbm(8);` |
| `nrf54_ble_set_adv_type` | Statement | PDU_TYPE(dropdown) | `nrf54_ble_set_adv_type(kAdvInd)` | `_nrf54_ble.setAdvertisingPduType(BleAdvPduType::kAdvInd);` |
| `nrf54_ble_set_adv_data_raw` | Statement | FLAGS(field_checkbox), INCLUDE_NAME(field_checkbox) | `nrf54_ble_set_adv_data_raw(TRUE, TRUE)` | `_nrf54_ble.buildAdvertisingPacket();` |
| `nrf54_ble_set_scan_response_name` | Statement | NAME(input_value) | `nrf54_ble_set_scan_response_name(math_number(0))` | `_nrf54_ble.setScanResponseName(String(1).c_str());` |
| `nrf54_ble_advertise_once` | Statement | (none) | `nrf54_ble_advertise_once()` | `_nrf54_ble.advertiseEvent(350U, 700000UL);` |
| `nrf54_ble_advertise_connectable` | Statement | (none) | `nrf54_ble_advertise_connectable()` | `_nrf54_ble.advertiseInteractEvent(&_nrf54_ble_adv_interaction, 350U, 300000UL, 700000UL);` |
| `nrf54_ble_is_connected` | Value | (none) | `nrf54_ble_is_connected()` | `_nrf54_ble.isConnected()` |
| `nrf54_ble_disconnect` | Statement | (none) | `nrf54_ble_disconnect()` | `_nrf54_ble.disconnect();` |
| `nrf54_ble_poll_event` | Statement | (none) | `nrf54_ble_poll_event()` | `_nrf54_ble.pollConnectionEvent(&_nrf54_ble_conn_event, 450000UL);` |
| `nrf54_ble_on_connected` | Hat | HANDLER(input_statement) | `nrf54_ble_on_connected()` | `using namespace xiao_nrf54l15; ↵ static BleRadio _nrf54_ble; ↵ static PowerManager _nrf54_ble_power; ↵ static bool _nrf54_ble_was_connected = false; ↵ if (_nrf54_ble.isConnected() && !_nrf54_ble_was_connected) { ↵ } ↵ _nrf54_ble_was_connected = _nrf54_ble.isConnected();` |
| `nrf54_ble_on_disconnected` | Hat | HANDLER(input_statement) | `nrf54_ble_on_disconnected()` | `using namespace xiao_nrf54l15; ↵ static BleRadio _nrf54_ble; ↵ static PowerManager _nrf54_ble_power; ↵ static bool _nrf54_ble_was_connected = false; ↵ if (!_nrf54_ble.isConnected() && _nrf54_ble_was_connected) { ↵ } ↵ _nrf54_ble_was_connected = _nrf54_ble.isConnected();` |
| `nrf54_ble_set_gatt_device_name` | Statement | NAME(input_value) | `nrf54_ble_set_gatt_device_name(math_number(0))` | `_nrf54_ble.setGattDeviceName(String(1).c_str());` |
| `nrf54_ble_set_gatt_battery` | Statement | LEVEL(input_value) | `nrf54_ble_set_gatt_battery(math_number(0))` | `_nrf54_ble.setGattBatteryLevel(1);` |
| `nrf54_ble_clear_gatt` | Statement | (none) | `nrf54_ble_clear_gatt()` | `_nrf54_ble.clearCustomGatt();` |
| `nrf54_ble_add_service_16` | Statement | SVC_VAR(field_input), UUID(input_value) | `nrf54_ble_add_service_16("svcHandle", text("value"))` | `_nrf54_ble.addCustomGattService(strtoul("value", NULL, 16), &svcHandle);` |
| `nrf54_ble_add_service_128` | Statement | SVC_VAR(field_input), UUID(input_value) | `nrf54_ble_add_service_128("svcHandle", text("value"))` | `{ ↵ uint8_t _uuid128[16]; ↵ _nrf54_ble_parse_uuid128("value", _uuid128); ↵ _nrf54_ble.addCustomGattService128(_uuid128, &svcHandle); ↵ }` |
| `nrf54_ble_add_characteristic` | Statement | SVC_VAR(field_variable), CHAR_VAR(field_input), UUID(input_value), PROPS(dropdown) | `nrf54_ble_add_characteristic($svcHandle, "charHandle", text("value"), READ)` | `_nrf54_ble.addCustomGattCharacteristic(svcHandle, strtoul("value", NULL, 16), static_cast<uint8_t>(kBleGattPropRead), nullptr, 0U, &charHandle, &charHandle_cccd);` |
| `nrf54_ble_set_char_value` | Statement | CHAR_VAR(field_variable), VALUE(input_value) | `nrf54_ble_set_char_value($charHandle, math_number(0))` | `{ ↵ String _val = String(1); ↵ _nrf54_ble.setCustomGattCharacteristicValue(charHandle, reinterpret_cast<const uint8_t*>(_val.c_str()), _val.length()); ↵ }` |
| `nrf54_ble_notify_char` | Statement | CHAR_VAR(field_variable) | `nrf54_ble_notify_char($charHandle)` | `_nrf54_ble.notifyCustomGattCharacteristic(charHandle, false);` |
| `nrf54_ble_is_cccd_enabled` | Value | CHAR_VAR(field_variable) | `nrf54_ble_is_cccd_enabled($charHandle)` | `_nrf54_ble.isCustomGattCccdEnabled(charHandle, false)` |
| `nrf54_ble_on_char_write` | Hat | CHAR_VAR(field_variable), HANDLER(input_statement) | `nrf54_ble_on_char_write($charHandle)` | `using namespace xiao_nrf54l15; ↵ static BleRadio _nrf54_ble; ↵ static PowerManager _nrf54_ble_power; ↵ static String _nrf54_ble_last_write_value = ""; ↵ void _nrf54_ble_write_cb_charHandle(uint16_t valueHandle, const uint8_t* value, uint8_t valueLength, bool withResponse, void* context) { ↵ _nrf54_ble_last_write_value = ""; ↵ for (uint8_t i = 0; i < valueLength; ++i) { ↵ _nrf54_ble_last_write_value += (char)value[i]; ↵ } ↵ } ↵ _nrf54_ble.setCustomGattWriteHandler(charHandle, _nrf54_ble_write_cb_charHandle, nullptr);` |
| `nrf54_ble_char_write_value` | Value | (none) | `nrf54_ble_char_write_value()` | `_nrf54_ble_last_write_value` |
| `nrf54_ble_nus_init` | Statement | NAME(input_value) | `nrf54_ble_nus_init(math_number(0))` | `_nrf54_ble.begin(0); ↵ _nrf54_ble_power.setLatencyMode(PowerLatencyMode::kLowPower); ↵ _nrf54_ble.setAdvertisingPduType(BleAdvPduType::kAdvInd); ↵ _nrf54_ble.setAdvertisingName(String(1).c_str(), true); ↵ _nrf54_ble.setScanResponseName(String(1).c_str()); ↵ _nrf54_ble.setGattDeviceName(String(1).c_str()); ↵ _nrf54_nus.begin(); ↵ _nrf54_ble.setBackgroundConnectionServiceEnabled(true);` |
| `nrf54_ble_nus_available` | Value | (none) | `nrf54_ble_nus_available()` | `_nrf54_nus.available()` |
| `nrf54_ble_nus_read_string` | Value | (none) | `nrf54_ble_nus_read_string()` | `_nrf54_nus_read_string()` |
| `nrf54_ble_nus_write` | Statement | DATA(input_value) | `nrf54_ble_nus_write(math_number(0))` | `{ ↵ String _d = String(1); ↵ _nrf54_nus.write(reinterpret_cast<const uint8_t*>(_d.c_str()), _d.length()); ↵ }` |
| `nrf54_ble_nus_println` | Statement | DATA(input_value) | `nrf54_ble_nus_println(math_number(0))` | `{ ↵ String _d = String(1) + "\r\n"; ↵ _nrf54_nus.write(reinterpret_cast<const uint8_t*>(_d.c_str()), _d.length()); ↵ }` |
| `nrf54_ble_nus_connected` | Value | (none) | `nrf54_ble_nus_connected()` | `_nrf54_nus.isConnected()` |
| `nrf54_ble_nus_service` | Statement | (none) | `nrf54_ble_nus_service()` | `_nrf54_nus_service_loop();` |
| `nrf54_ble_scan_passive` | Value | (none) | `nrf54_ble_scan_passive()` | `_nrf54_ble.scanCycle(&_nrf54_ble_scan_pkt, 2000000UL)` |
| `nrf54_ble_scan_active` | Value | (none) | `nrf54_ble_scan_active()` | `_nrf54_ble.scanActiveCycle(&_nrf54_ble_active_scan_result, 300000UL, 300000UL)` |
| `nrf54_ble_scan_get_address` | Value | (none) | `nrf54_ble_scan_get_address()` | `_nrf54_ble_scan_addr_str()` |
| `nrf54_ble_scan_get_rssi` | Value | (none) | `nrf54_ble_scan_get_rssi()` | `_nrf54_ble_active_scan_result.advRssiDbm` |
| `nrf54_ble_scan_get_name` | Value | (none) | `nrf54_ble_scan_get_name()` | `_nrf54_ble_scan_parse_name()` |
| `nrf54_ble_peripheral_quick` | Hat | NAME(input_value), ON_RECEIVE(input_statement) | `nrf54_ble_peripheral_quick(math_number(0))` | `using namespace xiao_nrf54l15; ↵ static BleRadio _nrf54_ble; ↵ static PowerManager _nrf54_ble_power; ↵ static BleNordicUart _nrf54_nus(_nrf54_ble); ↵ static BleAdvInteraction _nrf54_ble_adv_interaction{}; ↵ static bool _nrf54_nus_was_connected = false; ↵ static String _nrf54_ble_rx_data = ""; ↵ void _nrf54_ble_quick_on_receive() { ↵ } ↵ void _nrf54_ble_quick_loop() { ↵ if (!_nrf54_ble.isConnected()) { ↵ _nrf54_nus_was_connected = false; ↵ _nrf54_ble.advertiseInteractEvent(&_nrf54_ble_adv_interaction, 350U, 300000UL, 700000UL); ↵ if (!_nrf54_ble.isConnected()) { ↵ delay(20); ↵ } ↵ return; ↵ } ↵ BleConnectionEvent evt{}; ↵ _nrf54_ble.pollConnectionEvent(&evt, 450000UL); ↵ _nrf54_nus.service(&evt); ↵ if (_nrf54_nus.available()) { ↵ _nrf54_ble_rx_data = ""; ↵ while (_nrf54_nus.available()) { ↵ _nrf54_ble_rx_data += (char)_nrf54_nus.read(); ↵ } ↵ _nrf54_ble_quick_on_receive(); ↵ } ↵ } ↵ _nrf54_ble.begin(0); ↵ _nrf54_ble_power.setLatencyMode(PowerLatencyMode::kLowPower); ↵ _nrf54_ble.setAdvertisingPduType(BleAdvPduType::kAdvInd); ↵ _nrf54_ble.setAdvertisingName(String(1).c_str(), true); ↵ _nrf54_ble.setScanResponseName(String(1).c_str()); ↵ _nrf54_ble.setGattDeviceName(String(1).c_str()); ↵ _nrf54_nus.begin(); ↵ _nrf54_ble.setBackgroundConnectionServiceEnabled(true); ↵ _nrf54_ble_quick_loop();` |
| `nrf54_ble_peripheral_received_data` | Value | (none) | `nrf54_ble_peripheral_received_data()` | `_nrf54_ble_rx_data` |
| `nrf54_ble_peripheral_send` | Statement | DATA(input_value) | `nrf54_ble_peripheral_send(math_number(0))` | `{ ↵ String _d = String(1); ↵ _nrf54_nus.write(reinterpret_cast<const uint8_t*>(_d.c_str()), _d.length()); ↵ }` |
| `nrf54_ble_peripheral_connected` | Value | (none) | `nrf54_ble_peripheral_connected()` | `_nrf54_nus.isConnected()` |
| `nrf54_ble_power_low_power_mode` | Statement | (none) | `nrf54_ble_power_low_power_mode()` | `_nrf54_ble_power.setLatencyMode(PowerLatencyMode::kLowPower);` |
| `nrf54_ble_battery_percent` | Value | (none) | `nrf54_ble_battery_percent()` | `_nrf54_ble_read_battery()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TX_POWER | 8, 4, 0, -4, -8, -12, -16, -20, -40 | nrf54_ble_init, nrf54_ble_set_tx_power |
| ADDR_TYPE | kRandomStatic, kPublic | nrf54_ble_set_address |
| PDU_TYPE | kAdvInd, kAdvNonConnInd, kAdvScanInd | nrf54_ble_set_adv_type |
| PROPS | READ, WRITE, WRITE_NR, NOTIFY, INDICATE, READ_NOTIFY, READ_WRITE, READ_WRITE_NOTIFY | nrf54_ble_add_characteristic |

## ABS Examples

### Basic Usage
```
arduino_setup()
    nrf54_ble_init("8")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, nrf54_ble_get_address())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
