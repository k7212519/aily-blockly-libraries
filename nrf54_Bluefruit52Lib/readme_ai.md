# Bluefruit52Lib

Bluefruit-compatible BLE blocks for XIAO nRF54L15.

## Library Info
- **Name**: @aily-project/lib-bluefruit52lib
- **Version**: 0.6.48

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bluefruit52_init` | Statement | PRPH_COUNT(field_number), CENTRAL_COUNT(field_number) | `bluefruit52_init(1, 0)` | `Bluefruit.begin` |
| `bluefruit52_set_name` | Statement | NAME(input_value) | `bluefruit52_set_name(text("Bluefruit52"))` | `Bluefruit.setName` |
| `bluefruit52_set_tx_power` | Statement | TX_POWER(dropdown) | `bluefruit52_set_tx_power(0)` | `Bluefruit.setTxPower` |
| `bluefruit52_auto_conn_led` | Statement | ENABLED(dropdown) | `bluefruit52_auto_conn_led(true)` | `Bluefruit.autoConnLed` |
| `bluefruit52_config_bandwidth` | Statement | ROLE(dropdown), BANDWIDTH(dropdown) | `bluefruit52_config_bandwidth(Prph, BANDWIDTH_MAX)` | `config*Bandwidth` |
| `bluefruit52_connected` | Value | (none) | `bluefruit52_connected()` | `Bluefruit.connected` |
| `bluefruit52_disconnect` | Statement | HANDLE(input_value) | `bluefruit52_disconnect(math_number(0))` | `Bluefruit.disconnect` |
| `bluefruit52_callback_conn_handle` | Value | (none) | `bluefruit52_callback_conn_handle()` | callback handle |
| `bluefruit52_callback_disconnect_reason` | Value | (none) | `bluefruit52_callback_disconnect_reason()` | reason |
| `bluefruit52_callback_data` | Value | (none) | `bluefruit52_callback_data()` | callback data |
| `bluefruit52_on_periph_connect` | Hat | HANDLER(input_statement) | `bluefruit52_on_periph_connect() @HANDLER:` | periph connect callback |
| `bluefruit52_on_periph_disconnect` | Hat | HANDLER(input_statement) | `bluefruit52_on_periph_disconnect() @HANDLER:` | periph disconn callback |
| `bluefruit52_on_central_connect` | Hat | HANDLER(input_statement) | `bluefruit52_on_central_connect() @HANDLER:` | central connect callback |
| `bluefruit52_on_central_disconnect` | Hat | HANDLER(input_statement) | `bluefruit52_on_central_disconnect() @HANDLER:` | central disconn callback |
| `bluefruit52_adv_clear` | Statement | TARGET(dropdown) | `bluefruit52_adv_clear(Both)` | `clearData` |
| `bluefruit52_adv_add_flags` | Statement | (none) | `bluefruit52_adv_add_flags()` | `Advertising.addFlags` |
| `bluefruit52_adv_add_tx_power` | Statement | (none) | `bluefruit52_adv_add_tx_power()` | `Advertising.addTxPower` |
| `bluefruit52_adv_add_name` | Statement | TARGET(dropdown) | `bluefruit52_adv_add_name(Both)` | `addName` |
| `bluefruit52_adv_add_service` | Statement | VAR(field_variable) | `bluefruit52_adv_add_service($bleuart)` | `addService(var)` |
| `bluefruit52_adv_add_uuid` | Statement | UUID(input_value) | `bluefruit52_adv_add_uuid(text("BEE0"))` | `addUuid(BLEUuid)` |
| `bluefruit52_adv_add_appearance` | Statement | APPEARANCE(dropdown) | `bluefruit52_adv_add_appearance(BLE_APPEARANCE_HID_KEYBOARD)` | `addAppearance` |
| `bluefruit52_adv_restart_on_disconnect` | Statement | ENABLED(dropdown) | `bluefruit52_adv_restart_on_disconnect(true)` | `restartOnDisconnect` |
| `bluefruit52_adv_set_interval` | Statement | FAST(input_value), SLOW(input_value) | `bluefruit52_adv_set_interval(math_number(32), math_number(244))` | `setInterval` |
| `bluefruit52_adv_set_initial_timeout` | Statement | SECONDS(input_value) | `bluefruit52_adv_set_initial_timeout(math_number(30))` | `setFastTimeout` |
| `bluefruit52_adv_start` | Statement | TIMEOUT(input_value) | `bluefruit52_adv_start(math_number(0))` | `Advertising.start` |
| `bluefruit52_adv_stop` | Statement | (none) | `bluefruit52_adv_stop()` | `Advertising.stop` |
| `bluefruit52_adv_is_running` | Value | (none) | `bluefruit52_adv_is_running()` | `Advertising.isRunning` |
| `bluefruit52_bleuart_create` | Statement | VAR(field_input), FIFO(input_value) | `bluefruit52_bleuart_create("bleuart", math_number(256))` | `BLEUart var` |
| `bluefruit52_bleuart_begin` | Statement | VAR(field_variable) | `bluefruit52_bleuart_begin($bleuart)` | `var.begin` |
| `bluefruit52_bleuart_write` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_bleuart_write($bleuart, text("Hi"))` | `var.print/write` |
| `bluefruit52_bleuart_available` | Value | VAR(field_variable) | `bluefruit52_bleuart_available($bleuart)` | `var.available` |
| `bluefruit52_bleuart_read` | Value | VAR(field_variable) | `bluefruit52_bleuart_read($bleuart)` | `var.read` |
| `bluefruit52_bleuart_read_string` | Value | VAR(field_variable) | `bluefruit52_bleuart_read_string($bleuart)` | read `String` |
| `bluefruit52_bleuart_notify_enabled` | Value | VAR(field_variable) | `bluefruit52_bleuart_notify_enabled($bleuart)` | `var.notifyEnabled` |
| `bluefruit52_bleuart_on_receive` | Statement | VAR(field_variable), HANDLER(input_statement) | `bluefruit52_bleuart_on_receive($bleuart) @HANDLER:` | RX callback |
| `bluefruit52_bleuart_peripheral_quick` | Statement | NAME(input_value) | `bluefruit52_bleuart_peripheral_quick(text("Bluefruit52-UART"))` | quick UART peripheral |
| `bluefruit52_bleuart_quick_send` | Statement | DATA(input_value) | `bluefruit52_bleuart_quick_send(text("Hi"))` | quick UART send |
| `bluefruit52_bleuart_quick_received_data` | Value | (none) | `bluefruit52_bleuart_quick_received_data()` | quick UART read all |
| `bluefruit52_bleuart_quick_connected` | Value | (none) | `bluefruit52_bleuart_quick_connected()` | `Bluefruit.connected` |
| `bluefruit52_service_create` | Statement | VAR(field_input), UUID(input_value) | `bluefruit52_service_create("svc", text("BEE0"))` | `BLEService var` |
| `bluefruit52_service_begin` | Statement | VAR(field_variable) | `bluefruit52_service_begin($svc)` | `svc.begin` |
| `bluefruit52_characteristic_create` | Statement | VAR(field_input), UUID(input_value), PROPERTIES(dropdown), MAX_LEN(input_value) | `bluefruit52_characteristic_create("chr", text("BEE1"), CHR_PROPS_READ, math_number(20))` | `BLECharacteristic` |
| `bluefruit52_characteristic_set_permission` | Statement | VAR(field_variable), READ_PERM(dropdown), WRITE_PERM(dropdown) | `bluefruit52_characteristic_set_permission($chr, SECMODE_OPEN, SECMODE_OPEN)` | `chr.setPermission` |
| `bluefruit52_characteristic_begin` | Statement | VAR(field_variable) | `bluefruit52_characteristic_begin($chr)` | `chr.begin` |
| `bluefruit52_characteristic_write_text` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_characteristic_write_text($chr, text("v"))` | `chr.write` |
| `bluefruit52_characteristic_notify_text` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_characteristic_notify_text($chr, text("v"))` | `chr.notify` |
| `bluefruit52_characteristic_indicate_text` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_characteristic_indicate_text($chr, text("v"))` | `chr.indicate` |
| `bluefruit52_characteristic_read_string` | Value | VAR(field_variable) | `bluefruit52_characteristic_read_string($chr)` | read `String` |
| `bluefruit52_characteristic_notify_enabled` | Value | VAR(field_variable) | `bluefruit52_characteristic_notify_enabled($chr)` | `chr.notifyEnabled` |
| `bluefruit52_characteristic_on_write` | Statement | VAR(field_variable), HANDLER(input_statement) | `bluefruit52_characteristic_on_write($chr) @HANDLER:` | write callback |
| `bluefruit52_dis_create` | Statement | VAR(field_input) | `bluefruit52_dis_create("bledis")` | `BLEDis var` |
| `bluefruit52_dis_set` | Statement | VAR(field_variable), FIELD(dropdown), VALUE(input_value) | `bluefruit52_dis_set($bledis, setManufacturer, text("Seeed"))` | `dis.FIELD(value)` |
| `bluefruit52_dis_begin` | Statement | VAR(field_variable) | `bluefruit52_dis_begin($bledis)` | `dis.begin` |
| `bluefruit52_bas_create` | Statement | VAR(field_input) | `bluefruit52_bas_create("blebas")` | `BLEBas var` |
| `bluefruit52_bas_begin` | Statement | VAR(field_variable) | `bluefruit52_bas_begin($blebas)` | `bas.begin` |
| `bluefruit52_bas_write` | Statement | VAR(field_variable), LEVEL(input_value) | `bluefruit52_bas_write($blebas, math_number(100))` | `bas.write` |
| `bluefruit52_bas_notify` | Statement | VAR(field_variable), LEVEL(input_value) | `bluefruit52_bas_notify($blebas, math_number(95))` | `bas.notify` |
| `bluefruit52_scanner_config` | Statement | INTERVAL(input_value), WINDOW(input_value), ACTIVE(dropdown), RESTART(dropdown) | `bluefruit52_scanner_config(math_number(160), math_number(80), false, true)` | scanner config |
| `bluefruit52_scanner_start` | Statement | TIMEOUT(input_value) | `bluefruit52_scanner_start(math_number(0))` | `Scanner.start` |
| `bluefruit52_scanner_stop` | Statement | (none) | `bluefruit52_scanner_stop()` | `Scanner.stop` |
| `bluefruit52_scanner_resume` | Statement | (none) | `bluefruit52_scanner_resume()` | `Scanner.resume` |
| `bluefruit52_scanner_filter_uuid` | Statement | UUID(input_value) | `bluefruit52_scanner_filter_uuid(text("BEE0"))` | `Scanner.filterUuid` |
| `bluefruit52_on_scan_report` | Hat | HANDLER(input_statement) | `bluefruit52_on_scan_report() @HANDLER:` | scan callback |
| `bluefruit52_scan_report_rssi` | Value | (none) | `bluefruit52_scan_report_rssi()` | `report->rssi` |
| `bluefruit52_scan_report_address` | Value | (none) | `bluefruit52_scan_report_address()` | report address |
| `bluefruit52_scan_report_has_uuid` | Value | UUID(input_value) | `bluefruit52_scan_report_has_uuid(text("BEE0"))` | check UUID |
| `bluefruit52_central_connect_report` | Statement | (none) | `bluefruit52_central_connect_report()` | connect report |
| `bluefruit52_central_connected` | Value | (none) | `bluefruit52_central_connected()` | `Central.connected` |
| `bluefruit52_client_uart_create` | Statement | VAR(field_input) | `bluefruit52_client_uart_create("clientUart")` | `BLEClientUart var` |
| `bluefruit52_client_uart_begin` | Statement | VAR(field_variable) | `bluefruit52_client_uart_begin($clientUart)` | `client.begin` |
| `bluefruit52_client_uart_discover` | Statement | VAR(field_variable), HANDLE(input_value) | `bluefruit52_client_uart_discover($clientUart, bluefruit52_callback_conn_handle())` | `client.discover` |
| `bluefruit52_client_uart_enable_txd` | Statement | VAR(field_variable) | `bluefruit52_client_uart_enable_txd($clientUart)` | `client.enableTXD` |
| `bluefruit52_client_uart_write` | Statement | VAR(field_variable), DATA(input_value) | `bluefruit52_client_uart_write($clientUart, text("Hi"))` | `client.print/write` |
| `bluefruit52_client_uart_read_string` | Value | VAR(field_variable) | `bluefruit52_client_uart_read_string($clientUart)` | read `String` |
| `bluefruit52_client_uart_on_receive` | Statement | VAR(field_variable), HANDLER(input_statement) | `bluefruit52_client_uart_on_receive($clientUart) @HANDLER:` | RX callback |
| `bluefruit52_hid_create` | Statement | VAR(field_input) | `bluefruit52_hid_create("blehid")` | `BLEHidAdafruit var` |
| `bluefruit52_hid_begin` | Statement | VAR(field_variable) | `bluefruit52_hid_begin($blehid)` | `hid.begin` |
| `bluefruit52_hid_key_press` | Statement | VAR(field_variable), CHAR(input_value) | `bluefruit52_hid_key_press($blehid, text("A"))` | `hid.keyPress` |
| `bluefruit52_hid_key_release` | Statement | VAR(field_variable) | `bluefruit52_hid_key_release($blehid)` | `hid.keyRelease` |
| `bluefruit52_hid_key_sequence` | Statement | VAR(field_variable), TEXT(input_value), INTERVAL(input_value) | `bluefruit52_hid_key_sequence($blehid, text("Hi"), math_number(5))` | `hid.keySequence` |
| `bluefruit52_hid_mouse_move` | Statement | VAR(field_variable), X(input_value), Y(input_value) | `bluefruit52_hid_mouse_move($blehid, math_number(10), math_number(0))` | `hid.mouseMove` |
| `bluefruit52_hid_mouse_press` | Statement | VAR(field_variable), BUTTON(dropdown) | `bluefruit52_hid_mouse_press($blehid, MOUSE_BUTTON_LEFT)` | `mouseButtonPress` |
| `bluefruit52_hid_mouse_release` | Statement | VAR(field_variable) | `bluefruit52_hid_mouse_release($blehid)` | `mouseButtonRelease` |
| `bluefruit52_hid_mouse_scroll` | Statement | VAR(field_variable), AMOUNT(input_value) | `bluefruit52_hid_mouse_scroll($blehid, math_number(1))` | `hid.mouseScroll` |
| `bluefruit52_beacon_create` | Statement | VAR(field_input), UUID(input_value), MAJOR(input_value), MINOR(input_value), RSSI(input_value) | `bluefruit52_beacon_create("beacon", text("01122334-4556-6778-899A-ABBCCDDEEFF0"), math_number(1), math_number(1), math_number(-54))` | `BLEBeacon` |
| `bluefruit52_beacon_set_manufacturer` | Statement | VAR(field_variable), COMPANY_ID(input_value) | `bluefruit52_beacon_set_manufacturer($beacon, math_number(89))` | `beacon.setManufacturer` |
| `bluefruit52_eddystone_create` | Statement | VAR(field_input), URL(input_value), RSSI(input_value) | `bluefruit52_eddystone_create("eddyUrl", text("https://example.com"), math_number(-40))` | `EddyStoneUrl` |
| `bluefruit52_adv_set_beacon` | Statement | VAR(field_variable) | `bluefruit52_adv_set_beacon($beacon)` | `Advertising.setBeacon` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TX_POWER | 8, 4, 0, -4, -8, -12, -16, -20, -40 | dBm |
| ROLE | Prph, Central | Bandwidth role |
| BANDWIDTH | BANDWIDTH_AUTO, BANDWIDTH_LOW, BANDWIDTH_NORMAL, BANDWIDTH_HIGH, BANDWIDTH_MAX | Bandwidth |
| ENABLED, ACTIVE, RESTART | true, false | Toggle values |
| TARGET | Advertising, ScanResponse, Both | Advertising data target |
| APPEARANCE | BLE_APPEARANCE_GENERIC_CLOCK, BLE_APPEARANCE_HID_KEYBOARD, BLE_APPEARANCE_HID_MOUSE, BLE_APPEARANCE_HID_GAMEPAD | Appearance |
| PROPERTIES | CHR_PROPS_READ, CHR_PROPS_WRITE, CHR_PROPS_WRITE_WO_RESP, CHR_PROPS_NOTIFY, CHR_PROPS_INDICATE, combos | Char flags |
| READ_PERM, WRITE_PERM | SECMODE_OPEN, SECMODE_NO_ACCESS, SECMODE_ENC_NO_MITM, SECMODE_ENC_WITH_MITM | Security |
| FIELD | setManufacturer, setModel, setSerialNum, setFirmwareRev, setHardwareRev, setSoftwareRev | DIS |
| BUTTON | MOUSE_BUTTON_LEFT, MOUSE_BUTTON_RIGHT, MOUSE_BUTTON_MIDDLE, MOUSE_BUTTON_BACKWARD, MOUSE_BUTTON_FORWARD | Mouse |

## ABS Examples

### Quick BLE UART Peripheral
```text
arduino_setup()
    bluefruit52_bleuart_peripheral_quick(text("Bluefruit52-UART"))

arduino_loop()
    controls_if()
        @IF0: bluefruit52_bleuart_quick_connected()
        @DO0:
            bluefruit52_bleuart_quick_send(bluefruit52_bleuart_quick_received_data())
```

## Notes

1. **Variable creation**: `*_create("name", ...)` creates `$name`; later `field_variable` parameters use `$name`.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE)`, or nested value blocks.
3. **GATT order**: call `bluefruit52_service_begin` before `bluefruit52_characteristic_begin`.
4. **Callbacks**: handle, reason, data, and scan-report blocks only work inside callbacks.
5. **UUID**: 16-bit uses `text("BEE0")`; 128-bit uses canonical text.