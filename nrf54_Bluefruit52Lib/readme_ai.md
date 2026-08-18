# Bluefruit

Bluefruit-compatible BLE library for nrf54l15 with advertising, BLE UART, GATT services, scanning, central role, and HID

## Library Info
- **Name**: @aily-project/lib-bluefruit52lib
- **Version**: 0.6.81

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bluefruit52_init` | Statement | PRPH_COUNT(field_number), CENTRAL_COUNT(field_number) | `bluefruit52_init(1, 0)` | `Bluefruit.begin(1, 0);` |
| `bluefruit52_set_name` | Statement | NAME(input_value) | `bluefruit52_set_name(text("value"))` | `Bluefruit.setName(String("value").c_str());` |
| `bluefruit52_set_tx_power` | Statement | TX_POWER(dropdown) | `bluefruit52_set_tx_power("8")` | `Bluefruit.setTxPower(8);` |
| `bluefruit52_auto_conn_led` | Statement | ENABLED(dropdown) | `bluefruit52_auto_conn_led(true)` | `Bluefruit.autoConnLed(true);` |
| `bluefruit52_config_bandwidth` | Statement | ROLE(dropdown), BANDWIDTH(dropdown) | `bluefruit52_config_bandwidth(Prph, BANDWIDTH_AUTO)` | `Bluefruit.configPrphBandwidth(BANDWIDTH_AUTO);` |
| `bluefruit52_connected` | Value | (none) | `bluefruit52_connected()` | `Bluefruit.connected()` |
| `bluefruit52_disconnect` | Statement | HANDLE(input_value) | `bluefruit52_disconnect(math_number(0))` | `Bluefruit.disconnect(1);` |
| `bluefruit52_callback_conn_handle` | Value | (none) | `bluefruit52_callback_conn_handle()` | `_bluefruit52_callback_conn_handle` |
| `bluefruit52_callback_disconnect_reason` | Value | (none) | `bluefruit52_callback_disconnect_reason()` | `_bluefruit52_callback_disconnect_reason` |
| `bluefruit52_callback_data` | Value | (none) | `bluefruit52_callback_data()` | `_bluefruit52_callback_data` |
| `bluefruit52_on_periph_connect` | Hat | HANDLER(input_statement) | `bluefruit52_on_periph_connect()` | `static uint16_t _bluefruit52_callback_conn_handle = BLE_CONN_HANDLE_INVALID; ↵ static uint8_t _bluefruit52_callback_disconnect_reason = 0; ↵ static String _bluefruit52_callback_data = ""; ↵ void _bluefruit52_periph_connect_callback(uint16_t conn_handle) { ↵ _bluefruit52_callback_conn_handle = conn_handle; ↵ } ↵ Bluefruit.Periph.setConnectCallback(_bluefruit52_periph_connect_callback);` |
| `bluefruit52_on_periph_disconnect` | Hat | HANDLER(input_statement) | `bluefruit52_on_periph_disconnect()` | `static uint16_t _bluefruit52_callback_conn_handle = BLE_CONN_HANDLE_INVALID; ↵ static uint8_t _bluefruit52_callback_disconnect_reason = 0; ↵ static String _bluefruit52_callback_data = ""; ↵ void _bluefruit52_periph_disconnect_callback(uint16_t conn_handle, uint8_t reason) { ↵ _bluefruit52_callback_conn_handle = conn_handle; ↵ _bluefruit52_callback_disconnect_reason = reason; ↵ } ↵ Bluefruit.Periph.setDisconnectCallback(_bluefruit52_periph_disconnect_callback);` |
| `bluefruit52_on_central_connect` | Hat | HANDLER(input_statement) | `bluefruit52_on_central_connect()` | `static uint16_t _bluefruit52_callback_conn_handle = BLE_CONN_HANDLE_INVALID; ↵ static uint8_t _bluefruit52_callback_disconnect_reason = 0; ↵ static String _bluefruit52_callback_data = ""; ↵ void _bluefruit52_central_connect_callback(uint16_t conn_handle) { ↵ _bluefruit52_callback_conn_handle = conn_handle; ↵ } ↵ Bluefruit.Central.setConnectCallback(_bluefruit52_central_connect_callback);` |
| `bluefruit52_on_central_disconnect` | Hat | HANDLER(input_statement) | `bluefruit52_on_central_disconnect()` | `static uint16_t _bluefruit52_callback_conn_handle = BLE_CONN_HANDLE_INVALID; ↵ static uint8_t _bluefruit52_callback_disconnect_reason = 0; ↵ static String _bluefruit52_callback_data = ""; ↵ void _bluefruit52_central_disconnect_callback(uint16_t conn_handle, uint8_t reason) { ↵ _bluefruit52_callback_conn_handle = conn_handle; ↵ _bluefruit52_callback_disconnect_reason = reason; ↵ } ↵ Bluefruit.Central.setDisconnectCallback(_bluefruit52_central_disconnect_callback);` |
| `bluefruit52_adv_clear` | Statement | TARGET(dropdown) | `bluefruit52_adv_clear(Advertising)` | `Bluefruit.Advertising.clearData();` |
| `bluefruit52_adv_add_flags` | Statement | (none) | `bluefruit52_adv_add_flags()` | `Bluefruit.Advertising.addFlags(BLE_GAP_ADV_FLAGS_LE_ONLY_GENERAL_DISC_MODE);` |
| `bluefruit52_adv_add_tx_power` | Statement | (none) | `bluefruit52_adv_add_tx_power()` | `Bluefruit.Advertising.addTxPower();` |
| `bluefruit52_adv_add_name` | Statement | TARGET(dropdown) | `bluefruit52_adv_add_name(Advertising)` | `Bluefruit.Advertising.addName();` |
| `bluefruit52_adv_add_service` | Statement | VAR(field_variable) | `bluefruit52_adv_add_service($bleuart)` | `Bluefruit.Advertising.addService(bleuart);` |
| `bluefruit52_adv_add_uuid` | Statement | UUID(input_value) | `bluefruit52_adv_add_uuid(text("value"))` | `Bluefruit.Advertising.addService(BLEUuid("value"));` |
| `bluefruit52_adv_add_appearance` | Statement | APPEARANCE(dropdown) | `bluefruit52_adv_add_appearance(BLE_APPEARANCE_GENERIC_CLOCK)` | `Bluefruit.Advertising.addAppearance(BLE_APPEARANCE_GENERIC_CLOCK);` |
| `bluefruit52_adv_restart_on_disconnect` | Statement | ENABLED(dropdown) | `bluefruit52_adv_restart_on_disconnect(true)` | `Bluefruit.Advertising.restartOnDisconnect(true);` |
| `bluefruit52_adv_set_interval` | Statement | FAST(input_value), SLOW(input_value) | `bluefruit52_adv_set_interval(math_number(0), math_number(0))` | `Bluefruit.Advertising.setInterval(1, 1);` |
| `bluefruit52_adv_set_initial_timeout` | Statement | SECONDS(input_value) | `bluefruit52_adv_set_initial_timeout(math_number(0))` | `Bluefruit.Advertising.setFastTimeout(1);` |
| `bluefruit52_adv_start` | Statement | TIMEOUT(input_value) | `bluefruit52_adv_start(math_number(1000))` | `Bluefruit.Advertising.start(1);` |
| `bluefruit52_adv_stop` | Statement | (none) | `bluefruit52_adv_stop()` | `Bluefruit.Advertising.stop();` |
| `bluefruit52_adv_is_running` | Value | (none) | `bluefruit52_adv_is_running()` | `Bluefruit.Advertising.isRunning()` |
| `bluefruit52_bleuart_create` | Statement | VAR(field_input), FIFO(input_value) | `bluefruit52_bleuart_create("bleuart", math_number(0))` | `BLEUart bleuart(1);` |
| `bluefruit52_bleuart_begin` | Statement | VAR(field_variable) | `bluefruit52_bleuart_begin($bleuart)` | `bleuart.begin();` |
| `bluefruit52_bleuart_write` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_bleuart_write($bleuart, math_number(0))` | `bleuart.print(String(1));` |
| `bluefruit52_bleuart_available` | Value | VAR(field_variable) | `bluefruit52_bleuart_available($bleuart)` | `bleuart.available()` |
| `bluefruit52_bleuart_read` | Value | VAR(field_variable) | `bluefruit52_bleuart_read($bleuart)` | `bleuart.read()` |
| `bluefruit52_bleuart_read_string` | Value | VAR(field_variable) | `bluefruit52_bleuart_read_string($bleuart)` | `_bluefruit52_read_all(bleuart)` |
| `bluefruit52_bleuart_notify_enabled` | Value | VAR(field_variable) | `bluefruit52_bleuart_notify_enabled($bleuart)` | `bleuart.notifyEnabled()` |
| `bluefruit52_bleuart_on_receive` | Statement | VAR(field_variable), HANDLER(input_statement) | `bluefruit52_bleuart_on_receive($bleuart)` | `bleuart.setRxCallback(_bluefruit52_bleuart_rx_callback);` |
| `bluefruit52_bleuart_peripheral_quick` | Statement | NAME(input_value) | `bluefruit52_bleuart_peripheral_quick(text("value"))` | `Bluefruit.begin(1, 0); ↵ Bluefruit.setName(String("value").c_str()); ↵ Bluefruit.configPrphBandwidth(BANDWIDTH_MAX); ↵ _bluefruit52_quick_dis.setManufacturer("SeeedStudio"); ↵ _bluefruit52_quick_dis.setModel("XIAO nRF54L15"); ↵ _bluefruit52_quick_dis.begin(); ↵ _bluefruit52_quick_uart.begin(); ↵ _bluefruit52_quick_uart_start_adv();` |
| `bluefruit52_bleuart_quick_send` | Statement | DATA(input_value) | `bluefruit52_bleuart_quick_send(math_number(0))` | `_bluefruit52_quick_uart.print(String(1));` |
| `bluefruit52_bleuart_quick_received_data` | Value | (none) | `bluefruit52_bleuart_quick_received_data()` | `_bluefruit52_read_all(_bluefruit52_quick_uart)` |
| `bluefruit52_bleuart_quick_connected` | Value | (none) | `bluefruit52_bleuart_quick_connected()` | `Bluefruit.connected()` |
| `bluefruit52_service_create` | Statement | VAR(field_input), UUID(input_value) | `bluefruit52_service_create("customService", text("value"))` | `customService.setUuid(BLEUuid("value"));` |
| `bluefruit52_service_begin` | Statement | VAR(field_variable) | `bluefruit52_service_begin($customService)` | `customService.begin();` |
| `bluefruit52_characteristic_create` | Statement | VAR(field_input), UUID(input_value), PROPERTIES(dropdown), MAX_LEN(input_value) | `bluefruit52_characteristic_create("customChar", text("value"), CHR_PROPS_READ, math_number(0))` | `customChar.setUuid(BLEUuid("value")); ↵ customChar.setProperties(CHR_PROPS_READ); ↵ customChar.setMaxLen(1);` |
| `bluefruit52_characteristic_set_permission` | Statement | VAR(field_variable), READ_PERM(dropdown), WRITE_PERM(dropdown) | `bluefruit52_characteristic_set_permission($customChar, SECMODE_OPEN, SECMODE_OPEN)` | `customChar.setPermission(SECMODE_OPEN, SECMODE_OPEN);` |
| `bluefruit52_characteristic_begin` | Statement | VAR(field_variable) | `bluefruit52_characteristic_begin($customChar)` | `customChar.begin();` |
| `bluefruit52_characteristic_write_text` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_characteristic_write_text($customChar, math_number(0))` | `_bluefruit52_characteristic_write_string(customChar, String(1));` |
| `bluefruit52_characteristic_notify_text` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_characteristic_notify_text($customChar, math_number(0))` | `_bluefruit52_characteristic_notify_string(customChar, String(1));` |
| `bluefruit52_characteristic_indicate_text` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_characteristic_indicate_text($customChar, math_number(0))` | `_bluefruit52_characteristic_indicate_string(customChar, String(1));` |
| `bluefruit52_characteristic_read_string` | Value | VAR(field_variable) | `bluefruit52_characteristic_read_string($customChar)` | `_bluefruit52_characteristic_read_string(customChar)` |
| `bluefruit52_characteristic_notify_enabled` | Value | VAR(field_variable) | `bluefruit52_characteristic_notify_enabled($customChar)` | `customChar.notifyEnabled()` |
| `bluefruit52_characteristic_on_write` | Statement | VAR(field_variable), HANDLER(input_statement) | `bluefruit52_characteristic_on_write($customChar)` | `customChar.setWriteCallback(_bluefruit52_customChar_write_callback);` |
| `bluefruit52_dis_create` | Statement | VAR(field_input) | `bluefruit52_dis_create("bledis")` | `BLEDis bledis;` |
| `bluefruit52_dis_set` | Statement | VAR(field_variable), FIELD(dropdown), VALUE(input_value) | `bluefruit52_dis_set($bledis, setManufacturer, text("value"))` | `{ ↵ String _bluefruit52_text = String("value"); ↵ _bluefruit52_text.toCharArray(_bluefruit52_dis_bledis_setManufacturer, sizeof(_bluefruit52_dis_bledis_setManufacturer)); ↵ bledis.setManufacturer(_bluefruit52_dis_bledis_setManufacturer); ↵ }` |
| `bluefruit52_dis_begin` | Statement | VAR(field_variable) | `bluefruit52_dis_begin($bledis)` | `bledis.begin();` |
| `bluefruit52_bas_create` | Statement | VAR(field_input) | `bluefruit52_bas_create("blebas")` | `BLEBas blebas;` |
| `bluefruit52_bas_begin` | Statement | VAR(field_variable) | `bluefruit52_bas_begin($blebas)` | `blebas.begin();` |
| `bluefruit52_bas_write` | Statement | VAR(field_variable), LEVEL(input_value) | `bluefruit52_bas_write($blebas, math_number(0))` | `blebas.write((uint8_t)(1));` |
| `bluefruit52_bas_notify` | Statement | VAR(field_variable), LEVEL(input_value) | `bluefruit52_bas_notify($blebas, math_number(0))` | `blebas.notify((uint8_t)(1));` |
| `bluefruit52_scanner_config` | Statement | INTERVAL(input_value), WINDOW(input_value), ACTIVE(dropdown), RESTART(dropdown) | `bluefruit52_scanner_config(math_number(1000), math_number(0), true, true)` | `Bluefruit.Scanner.setInterval(1, 1); ↵ Bluefruit.Scanner.useActiveScan(true); ↵ Bluefruit.Scanner.restartOnDisconnect(true);` |
| `bluefruit52_scanner_start` | Statement | TIMEOUT(input_value) | `bluefruit52_scanner_start(math_number(1000))` | `Bluefruit.Scanner.start(1);` |
| `bluefruit52_scanner_stop` | Statement | (none) | `bluefruit52_scanner_stop()` | `Bluefruit.Scanner.stop();` |
| `bluefruit52_scanner_resume` | Statement | (none) | `bluefruit52_scanner_resume()` | `Bluefruit.Scanner.resume();` |
| `bluefruit52_scanner_filter_uuid` | Statement | UUID(input_value) | `bluefruit52_scanner_filter_uuid(text("value"))` | `Bluefruit.Scanner.filterUuid(BLEUuid("value"));` |
| `bluefruit52_on_scan_report` | Hat | HANDLER(input_statement) | `bluefruit52_on_scan_report()` | `static ble_gap_evt_adv_report_t* _bluefruit52_scan_report = NULL; ↵ String _bluefruit52_addr_to_string(const ble_gap_addr_t& addr) { ↵ char buffer[18] = {0}; ↵ snprintf(buffer, sizeof(buffer), "%02X:%02X:%02X:%02X:%02X:%02X", ↵ addr.addr[5], addr.addr[4], addr.addr[3], addr.addr[2], addr.addr[1], addr.addr[0]); ↵ return String(buffer); ↵ } ↵ String _bluefruit52_scan_report_address() { ↵ if (_bluefruit52_scan_report == NULL) return String(""); ↵ return _bluefruit52_addr_to_string(_bluefruit52_scan_report->peer_addr); ↵ } ↵ void _bluefruit52_scan_callback(ble_gap_evt_adv_report_t* report) { ↵ _bluefruit52_scan_report = report; ↵ } ↵ Bluefruit.Scanner.setRxCallback(_bluefruit52_scan_callback);` |
| `bluefruit52_scan_report_rssi` | Value | (none) | `bluefruit52_scan_report_rssi()` | `(_bluefruit52_scan_report ? _bluefruit52_scan_report->rssi : 0)` |
| `bluefruit52_scan_report_address` | Value | (none) | `bluefruit52_scan_report_address()` | `_bluefruit52_scan_report_address()` |
| `bluefruit52_scan_report_has_uuid` | Value | UUID(input_value) | `bluefruit52_scan_report_has_uuid(text("value"))` | `(_bluefruit52_scan_report && Bluefruit.Scanner.checkReportForUuid(_bluefruit52_scan_report, BLEUuid("value")))` |
| `bluefruit52_central_connect_report` | Statement | (none) | `bluefruit52_central_connect_report()` | `if (_bluefruit52_scan_report != NULL) { ↵ Bluefruit.Central.connect(_bluefruit52_scan_report); ↵ }` |
| `bluefruit52_central_connected` | Value | (none) | `bluefruit52_central_connected()` | `Bluefruit.Central.connected()` |
| `bluefruit52_client_uart_create` | Statement | VAR(field_input) | `bluefruit52_client_uart_create("clientUart")` | `BLEClientUart clientUart;` |
| `bluefruit52_client_uart_begin` | Statement | VAR(field_variable) | `bluefruit52_client_uart_begin($clientUart)` | `clientUart.begin();` |
| `bluefruit52_client_uart_discover` | Statement | VAR(field_variable), HANDLE(input_value) | `bluefruit52_client_uart_discover($clientUart, math_number(0))` | `clientUart.discover(1);` |
| `bluefruit52_client_uart_enable_txd` | Statement | VAR(field_variable) | `bluefruit52_client_uart_enable_txd($clientUart)` | `clientUart.enableTXD();` |
| `bluefruit52_client_uart_write` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_client_uart_write($clientUart, math_number(0))` | `clientUart.print(String(1));` |
| `bluefruit52_client_uart_read_string` | Value | VAR(field_variable) | `bluefruit52_client_uart_read_string($clientUart)` | `_bluefruit52_read_all(clientUart)` |
| `bluefruit52_client_uart_on_receive` | Statement | VAR(field_variable), HANDLER(input_statement) | `bluefruit52_client_uart_on_receive($clientUart)` | `clientUart.setRxCallback(_bluefruit52_clientUart_client_uart_rx_callback);` |
| `bluefruit52_hid_create` | Statement | VAR(field_input) | `bluefruit52_hid_create("blehid")` | `BLEHidAdafruit blehid;` |
| `bluefruit52_hid_begin` | Statement | VAR(field_variable) | `bluefruit52_hid_begin($blehid)` | `blehid.begin();` |
| `bluefruit52_hid_key_press` | Statement | VAR(field_variable), CHAR(input_value) | `bluefruit52_hid_key_press($blehid, text("value"))` | `{ ↵ String _bluefruit52_key = String("value"); ↵ if (_bluefruit52_key.length() > 0) blehid.keyPress(_bluefruit52_key.charAt(0)); ↵ }` |
| `bluefruit52_hid_key_release` | Statement | VAR(field_variable) | `bluefruit52_hid_key_release($blehid)` | `blehid.keyRelease();` |
| `bluefruit52_hid_key_sequence` | Statement | VAR(field_variable), TEXT(input_value), INTERVAL(input_value) | `bluefruit52_hid_key_sequence($blehid, text("value"), math_number(1000))` | `blehid.keySequence(String("value").c_str(), 1);` |
| `bluefruit52_hid_mouse_move` | Statement | VAR(field_variable), X(input_value), Y(input_value) | `bluefruit52_hid_mouse_move($blehid, math_number(0), math_number(0))` | `blehid.mouseMove((int8_t)(1), (int8_t)(1));` |
| `bluefruit52_hid_mouse_press` | Statement | VAR(field_variable), BUTTON(dropdown) | `bluefruit52_hid_mouse_press($blehid, MOUSE_BUTTON_LEFT)` | `blehid.mouseButtonPress(MOUSE_BUTTON_LEFT);` |
| `bluefruit52_hid_mouse_release` | Statement | VAR(field_variable) | `bluefruit52_hid_mouse_release($blehid)` | `blehid.mouseButtonRelease();` |
| `bluefruit52_hid_mouse_scroll` | Statement | VAR(field_variable), AMOUNT(input_value) | `bluefruit52_hid_mouse_scroll($blehid, math_number(0))` | `blehid.mouseScroll((int8_t)(1));` |
| `bluefruit52_beacon_create` | Statement | VAR(field_input), UUID(input_value), MAJOR(input_value), MINOR(input_value), RSSI(input_value) | `bluefruit52_beacon_create("beacon", text("value"), math_number(0), math_number(0), math_number(0))` | `_bluefruit52_parse_uuid128(String("value").c_str(), _bluefruit52_uuid_beacon); ↵ beacon.setUuid(_bluefruit52_uuid_beacon); ↵ beacon.setMajorMinor((uint16_t)(1), (uint16_t)(1)); ↵ beacon.setRssiAt1m((int8_t)(1));` |
| `bluefruit52_beacon_set_manufacturer` | Statement | VAR(field_variable), COMPANY_ID(input_value) | `bluefruit52_beacon_set_manufacturer($beacon, math_number(0))` | `beacon.setManufacturer((uint16_t)(1));` |
| `bluefruit52_eddystone_create` | Statement | VAR(field_input), URL(input_value), RSSI(input_value) | `bluefruit52_eddystone_create("eddyUrl", text("value"), math_number(0))` | `{ ↵ String _bluefruit52_url = String("value"); ↵ _bluefruit52_url.toCharArray(_bluefruit52_eddy_url_eddyUrl, sizeof(_bluefruit52_eddy_url_eddyUrl)); ↵ eddyUrl.setUrl(_bluefruit52_eddy_url_eddyUrl); ↵ eddyUrl.setRssi((int8_t)(1)); ↵ }` |
| `bluefruit52_adv_set_beacon` | Statement | VAR(field_variable) | `bluefruit52_adv_set_beacon($beacon)` | `Bluefruit.Advertising.setBeacon(beacon);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TX_POWER | 8, 4, 0, -4, -8, -12, -16, -20, ... | bluefruit52_set_tx_power |
| ENABLED | true, false | bluefruit52_auto_conn_led, bluefruit52_adv_restart_on_disconnect |
| ROLE | Prph, Central | bluefruit52_config_bandwidth |
| BANDWIDTH | BANDWIDTH_AUTO, BANDWIDTH_LOW, BANDWIDTH_NORMAL, BANDWIDTH_HIGH, BANDWIDTH_MAX | bluefruit52_config_bandwidth |
| TARGET | Advertising, ScanResponse, Both | bluefruit52_adv_clear, bluefruit52_adv_add_name |
| APPEARANCE | BLE_APPEARANCE_GENERIC_CLOCK, BLE_APPEARANCE_HID_KEYBOARD, BLE_APPEARANCE_HID... | bluefruit52_adv_add_appearance |
| PROPERTIES | CHR_PROPS_READ, CHR_PROPS_WRITE, CHR_PROPS_WRITE_WO_RESP, CHR_PROPS_NOTIFY, C... | bluefruit52_characteristic_create |
| READ_PERM | SECMODE_OPEN, SECMODE_NO_ACCESS, SECMODE_ENC_NO_MITM, SECMODE_ENC_WITH_MITM | bluefruit52_characteristic_set_permission |
| WRITE_PERM | SECMODE_OPEN, SECMODE_NO_ACCESS, SECMODE_ENC_NO_MITM, SECMODE_ENC_WITH_MITM | bluefruit52_characteristic_set_permission |
| FIELD | setManufacturer, setModel, setSerialNum, setFirmwareRev, setHardwareRev, setS... | bluefruit52_dis_set |
| ACTIVE | true, false | bluefruit52_scanner_config |
| RESTART | true, false | bluefruit52_scanner_config |
| BUTTON | MOUSE_BUTTON_LEFT, MOUSE_BUTTON_RIGHT, MOUSE_BUTTON_MIDDLE, MOUSE_BUTTON_BACK... | bluefruit52_hid_mouse_press |

## Notes

1. **Variable**: `bluefruit52_bleuart_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    bluefruit52_init(1, 0)
```
