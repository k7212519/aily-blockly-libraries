# Seeed RPC BLE

Blockly wrapper for Seeed Wio Terminal rpcBLE with BLE server, client, scan, UART, Web Bluetooth battery service, and iBeacon support.

## Library Info
- **Name**: @aily-project/lib-seeed-rpcble
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_rpcble_init` | Statement | NAME(input_value) | `seeed_rpcble_init(text("value"))` | `BLEDevice::init(String("value").c_str());` |
| `seeed_rpcble_deinit` | Statement | (none) | `seeed_rpcble_deinit()` | `BLEDevice::deinit();` |
| `seeed_rpcble_is_initialized` | Value | (none) | `seeed_rpcble_is_initialized()` | `BLEDevice::getInitialized()` |
| `seeed_rpcble_get_address` | Value | (none) | `seeed_rpcble_get_address()` | `String(BLEDevice::getAddress().toString().c_str())` |
| `seeed_rpcble_set_mtu` | Statement | MTU(input_value) | `seeed_rpcble_set_mtu(math_number(0))` | `BLEDevice::setMTU(1);` |
| `seeed_rpcble_get_mtu` | Value | (none) | `seeed_rpcble_get_mtu()` | `BLEDevice::getMTU()` |
| `seeed_rpcble_create_server` | Statement | VAR(field_input) | `seeed_rpcble_create_server("pServer")` | `pServer = BLEDevice::createServer();` |
| `seeed_rpcble_server_create_service` | Statement | SERVER(field_variable), SERVICE_VAR(field_input), UUID(input_value) | `seeed_rpcble_server_create_service($pServer, "pService", text("value"))` | `pService = pServer->createService(String("value").c_str());` |
| `seeed_rpcble_service_start` | Statement | VAR(field_variable) | `seeed_rpcble_service_start($pService)` | `pService->start();` |
| `seeed_rpcble_service_stop` | Statement | VAR(field_variable) | `seeed_rpcble_service_stop($pService)` | `pService->stop();` |
| `seeed_rpcble_server_connected_count` | Value | VAR(field_variable) | `seeed_rpcble_server_connected_count($pServer)` | `pServer->getConnectedCount()` |
| `seeed_rpcble_server_set_callbacks` | Statement | VAR(field_variable), ON_CONNECT(input_statement), ON_DISCONNECT(input_statement) | `seeed_rpcble_server_set_callbacks($pServer)` | `pServer->setCallbacks(new SeeedRpcBleServerCallbacks_pServer());` |
| `seeed_rpcble_create_characteristic` | Statement | SERVICE(field_variable), CHAR_VAR(field_input), UUID(input_value), PROPERTIES(dropdown) | `seeed_rpcble_create_characteristic($pService, "pCharacteristic", text("value"), BLECharacteristic::PROPERTY_READ)` | `pCharacteristic = pService->createCharacteristic(String("value").c_str(), BLECharacteristic::PROPERTY_READ);` |
| `seeed_rpcble_characteristic_set_permissions` | Statement | VAR(field_variable), PERMISSIONS(dropdown) | `seeed_rpcble_characteristic_set_permissions($pCharacteristic, GATT_PERM_READ)` | `pCharacteristic->setAccessPermissions(GATT_PERM_READ);` |
| `seeed_rpcble_characteristic_add_notify_descriptor` | Statement | VAR(field_variable) | `seeed_rpcble_characteristic_add_notify_descriptor($pCharacteristic)` | `pCharacteristic->addDescriptor(new BLE2902());` |
| `seeed_rpcble_characteristic_add_descriptor` | Statement | VAR(field_variable), UUID(input_value), FLAGS(dropdown), PERMISSIONS(dropdown), MAX_LEN(input_value) | `seeed_rpcble_characteristic_add_descriptor($pCharacteristic, text("value"), "ATTRIB_FLAG_VOID &#124; ATTRIB_FLAG_ASCII_Z", GATT_PERM_READ, math_number(0))` | `pCharacteristic->createDescriptor(String("value").c_str(), ATTRIB_FLAG_VOID &#124; ATTRIB_FLAG_ASCII_Z, GATT_PERM_READ, 1);` |
| `seeed_rpcble_characteristic_set_value` | Statement | VAR(field_variable), VALUE(input_value) | `seeed_rpcble_characteristic_set_value($pCharacteristic, text("value"))` | `pCharacteristic->setValue(std::string(String("value").c_str()));` |
| `seeed_rpcble_characteristic_set_byte` | Statement | VAR(field_variable), VALUE(input_value) | `seeed_rpcble_characteristic_set_byte($pCharacteristic, math_number(0))` | `{ ↵ uint8_t seeedRpcBleByteValue = (uint8_t)(1); ↵ pCharacteristic->setValue(&seeedRpcBleByteValue, 1); ↵ }` |
| `seeed_rpcble_characteristic_get_value` | Value | VAR(field_variable) | `seeed_rpcble_characteristic_get_value($pCharacteristic)` | `String(pCharacteristic->getValue().c_str())` |
| `seeed_rpcble_characteristic_notify` | Statement | VAR(field_variable) | `seeed_rpcble_characteristic_notify($pCharacteristic)` | `pCharacteristic->notify();` |
| `seeed_rpcble_characteristic_indicate` | Statement | VAR(field_variable) | `seeed_rpcble_characteristic_indicate($pCharacteristic)` | `pCharacteristic->indicate();` |
| `seeed_rpcble_characteristic_set_callbacks` | Statement | VAR(field_variable), HANDLER(input_statement) | `seeed_rpcble_characteristic_set_callbacks($pCharacteristic)` | `pCharacteristic->setCallbacks(new SeeedRpcBleCharacteristicCallbacks_pCharacteristic());` |
| `seeed_rpcble_characteristic_received_value` | Value | VAR(field_variable) | `seeed_rpcble_characteristic_received_value($pCharacteristic)` | `seeed_rpcble_received_pCharacteristic` |
| `seeed_rpcble_advertising_add_service_uuid` | Statement | UUID(input_value) | `seeed_rpcble_advertising_add_service_uuid(text("value"))` | `BLEDevice::getAdvertising()->addServiceUUID(String("value").c_str());` |
| `seeed_rpcble_advertising_set_scan_response` | Statement | ENABLE(dropdown) | `seeed_rpcble_advertising_set_scan_response(TRUE)` | `BLEDevice::getAdvertising()->setScanResponse(true);` |
| `seeed_rpcble_advertising_set_preferred` | Statement | MIN(input_value), MAX(input_value) | `seeed_rpcble_advertising_set_preferred(math_number(0), math_number(0))` | `BLEDevice::getAdvertising()->setMinPreferred(1); ↵ BLEDevice::getAdvertising()->setMaxPreferred(1);` |
| `seeed_rpcble_start_advertising` | Statement | (none) | `seeed_rpcble_start_advertising()` | `BLEDevice::startAdvertising();` |
| `seeed_rpcble_stop_advertising` | Statement | (none) | `seeed_rpcble_stop_advertising()` | `BLEDevice::stopAdvertising();` |
| `seeed_rpcble_scan_create` | Statement | VAR(field_input) | `seeed_rpcble_scan_create("pBLEScan")` | `pBLEScan = BLEDevice::getScan();` |
| `seeed_rpcble_scan_set_active` | Statement | VAR(field_variable), ACTIVE(dropdown) | `seeed_rpcble_scan_set_active($pBLEScan, TRUE)` | `pBLEScan->setActiveScan(true);` |
| `seeed_rpcble_scan_set_interval` | Statement | VAR(field_variable), INTERVAL(input_value) | `seeed_rpcble_scan_set_interval($pBLEScan, math_number(1000))` | `pBLEScan->setInterval(1);` |
| `seeed_rpcble_scan_set_window` | Statement | VAR(field_variable), WINDOW(input_value) | `seeed_rpcble_scan_set_window($pBLEScan, math_number(0))` | `pBLEScan->setWindow(1);` |
| `seeed_rpcble_scan_start` | Statement | SCAN(field_variable), DURATION(input_value), RESULT_VAR(field_input), CONTINUE(dropdown) | `seeed_rpcble_scan_start($pBLEScan, math_number(1000), "foundDevices", FALSE)` | `foundDevices = pBLEScan->start(1, false);` |
| `seeed_rpcble_scan_stop` | Statement | VAR(field_variable) | `seeed_rpcble_scan_stop($pBLEScan)` | `pBLEScan->stop();` |
| `seeed_rpcble_scan_clear_results` | Statement | VAR(field_variable) | `seeed_rpcble_scan_clear_results($pBLEScan)` | `pBLEScan->clearResults();` |
| `seeed_rpcble_scan_results_count` | Value | VAR(field_variable) | `seeed_rpcble_scan_results_count($foundDevices)` | `foundDevices.getCount()` |
| `seeed_rpcble_scan_result_name` | Value | VAR(field_variable), INDEX(input_value) | `seeed_rpcble_scan_result_name($foundDevices, math_number(0))` | `seeedRpcBleScanResultName(foundDevices, 1)` |
| `seeed_rpcble_scan_result_address` | Value | VAR(field_variable), INDEX(input_value) | `seeed_rpcble_scan_result_address($foundDevices, math_number(0))` | `seeedRpcBleScanResultAddress(foundDevices, 1)` |
| `seeed_rpcble_scan_result_rssi` | Value | VAR(field_variable), INDEX(input_value) | `seeed_rpcble_scan_result_rssi($foundDevices, math_number(0))` | `seeedRpcBleScanResultRssi(foundDevices, 1)` |
| `seeed_rpcble_scan_result_service_uuid` | Value | VAR(field_variable), INDEX(input_value) | `seeed_rpcble_scan_result_service_uuid($foundDevices, math_number(0))` | `seeedRpcBleScanResultServiceUUID(foundDevices, 1)` |
| `seeed_rpcble_scan_result_info` | Value | VAR(field_variable), INDEX(input_value) | `seeed_rpcble_scan_result_info($foundDevices, math_number(0))` | `seeedRpcBleScanResultInfo(foundDevices, 1)` |
| `seeed_rpcble_scan_result_has_service` | Value | VAR(field_variable), INDEX(input_value), UUID(input_value) | `seeed_rpcble_scan_result_has_service($foundDevices, math_number(0), text("value"))` | `seeedRpcBleScanResultHasService(foundDevices, 1, String("value"))` |
| `seeed_rpcble_create_client` | Statement | VAR(field_input) | `seeed_rpcble_create_client("pClient")` | `pClient = BLEDevice::createClient();` |
| `seeed_rpcble_client_connect` | Statement | VAR(field_variable), ADDRESS(input_value), ADDRESS_TYPE(dropdown) | `seeed_rpcble_client_connect($pClient, text("value"), GAP_REMOTE_ADDR_LE_PUBLIC)` | `pClient->connect(BLEAddress(String("value").c_str()), GAP_REMOTE_ADDR_LE_PUBLIC);` |
| `seeed_rpcble_client_disconnect` | Statement | VAR(field_variable) | `seeed_rpcble_client_disconnect($pClient)` | `pClient->disconnect();` |
| `seeed_rpcble_client_is_connected` | Value | VAR(field_variable) | `seeed_rpcble_client_is_connected($pClient)` | `pClient->isConnected()` |
| `seeed_rpcble_client_rssi` | Value | VAR(field_variable) | `seeed_rpcble_client_rssi($pClient)` | `pClient->getRssi()` |
| `seeed_rpcble_client_get_service` | Statement | CLIENT(field_variable), SERVICE_VAR(field_input), UUID(input_value) | `seeed_rpcble_client_get_service($pClient, "pRemoteService", text("value"))` | `pRemoteService = pClient->getService(String("value").c_str());` |
| `seeed_rpcble_remote_service_get_characteristic` | Statement | SERVICE(field_variable), CHAR_VAR(field_input), UUID(input_value) | `seeed_rpcble_remote_service_get_characteristic($pRemoteService, "pRemoteCharacteristic", text("value"))` | `pRemoteCharacteristic = pRemoteService->getCharacteristic(String("value").c_str());` |
| `seeed_rpcble_remote_characteristic_read` | Value | VAR(field_variable) | `seeed_rpcble_remote_characteristic_read($pRemoteCharacteristic)` | `String(pRemoteCharacteristic->readValue().c_str())` |
| `seeed_rpcble_remote_characteristic_write` | Statement | VAR(field_variable), VALUE(input_value), RESPONSE(dropdown) | `seeed_rpcble_remote_characteristic_write($pRemoteCharacteristic, text("value"), FALSE)` | `pRemoteCharacteristic->writeValue(std::string(String("value").c_str()), false);` |
| `seeed_rpcble_remote_characteristic_can_read` | Value | VAR(field_variable) | `seeed_rpcble_remote_characteristic_can_read($pRemoteCharacteristic)` | `pRemoteCharacteristic->canRead()` |
| `seeed_rpcble_remote_characteristic_can_write` | Value | VAR(field_variable) | `seeed_rpcble_remote_characteristic_can_write($pRemoteCharacteristic)` | `pRemoteCharacteristic->canWrite()` |
| `seeed_rpcble_remote_characteristic_can_notify` | Value | VAR(field_variable) | `seeed_rpcble_remote_characteristic_can_notify($pRemoteCharacteristic)` | `pRemoteCharacteristic->canNotify()` |
| `seeed_rpcble_remote_characteristic_register_notify` | Statement | VAR(field_variable), NOTIFY(dropdown), HANDLER(input_statement) | `seeed_rpcble_remote_characteristic_register_notify($pRemoteCharacteristic, TRUE)` | `pRemoteCharacteristic->registerForNotify(seeedRpcBleNotify_pRemoteCharacteristic, true);` |
| `seeed_rpcble_remote_notify_value` | Value | VAR(field_variable) | `seeed_rpcble_remote_notify_value($pRemoteCharacteristic)` | `seeed_rpcble_notify_pRemoteCharacteristic` |
| `seeed_rpcble_uart_begin` | Statement | NAME(input_value) | `seeed_rpcble_uart_begin(text("value"))` | `BLEDevice::init(String("value").c_str()); ↵ seeed_rpcble_uart_server = BLEDevice::createServer(); ↵ seeed_rpcble_uart_server->setCallbacks(new SeeedRpcBleUartServerCallbacks()); ↵ BLEService* seeed_rpcble_uart_service = seeed_rpcble_uart_server->createService("6E400001-B5A3-F393-E0A9-E50E24DCCA9E"); ↵ seeed_rpcble_uart_tx = seeed_rpcble_uart_service->createCharacteristic("6E400003-B5A3-F393-E0A9-E50E24DCCA9E", BLECharacteristic::PROPERTY_NOTIFY &#124; BLECharacteristic::PROPERTY_READ); ↵ seeed_rpcble_uart_tx->setAccessPermissions(GATT_PERM_READ); ↵ seeed_rpcble_uart_tx->addDescriptor(new BLE2902()); ↵ seeed_rpcble_uart_rx = seeed_rpcble_uart_service->createCharacteristic("6E400002-B5A3-F393-E0A9-E50E24DCCA9E", BLECharacteristic::PROPERTY_WRITE); ↵ seeed_rpcble_uart_rx->setAccessPermissions(GATT_PERM_READ &#124; GATT_PERM_WRITE); ↵ seeed_rpcble_uart_rx->setCallbacks(new SeeedRpcBleUartRxCallbacks()); ↵ seeed_rpcble_uart_service->start(); ↵ seeed_rpcble_uart_server->getAdvertising()->addServiceUUID("6E400001-B5A3-F393-E0A9-E50E24DCCA9E"); ↵ seeed_rpcble_uart_server->getAdvertising()->setScanResponse(true); ↵ seeed_rpcble_uart_server->getAdvertising()->start();` |
| `seeed_rpcble_uart_send` | Statement | DATA(input_value) | `seeed_rpcble_uart_send(text("value"))` | `seeedRpcBleUartSend(String("value"));` |
| `seeed_rpcble_uart_connected` | Value | (none) | `seeed_rpcble_uart_connected()` | `seeed_rpcble_uart_connected` |
| `seeed_rpcble_uart_received` | Value | (none) | `seeed_rpcble_uart_received()` | `seeed_rpcble_uart_received` |
| `seeed_rpcble_uart_on_receive` | Statement | HANDLER(input_statement) | `seeed_rpcble_uart_on_receive()` | `seeed_rpcble_uart_rx->setCallbacks(new SeeedRpcBleUartRxCallbacksWithHandler());` |
| `seeed_rpcble_web_battery_begin` | Statement | NAME(input_value), LEVEL(input_value) | `seeed_rpcble_web_battery_begin(text("value"), math_number(0))` | `BLEDevice::init(String("value").c_str()); ↵ seeed_rpcble_battery_server = BLEDevice::createServer(); ↵ seeed_rpcble_battery_server->setCallbacks(new SeeedRpcBleBatteryServerCallbacks()); ↵ BLEService* seeed_rpcble_battery_service = seeed_rpcble_battery_server->createService(BLEUUID((uint16_t)0x180F)); ↵ seeed_rpcble_battery_char = seeed_rpcble_battery_service->createCharacteristic(BLEUUID((uint16_t)0x2A19), BLECharacteristic::PROPERTY_READ &#124; BLECharacteristic::PROPERTY_WRITE &#124; BLECharacteristic::PROPERTY_NOTIFY); ↵ seeed_rpcble_battery_char->setAccessPermissions(GATT_PERM_READ &#124; GATT_PERM_WRITE); ↵ seeed_rpcble_battery_char->addDescriptor(new BLE2902()); ↵ seeed_rpcble_battery_service->start(); ↵ seeed_rpcble_battery_server->getAdvertising()->addServiceUUID(BLEUUID((uint16_t)0x180F)); ↵ seeed_rpcble_battery_server->getAdvertising()->start(); ↵ seeedRpcBleBatterySetLevel((uint8_t)(1), false);` |
| `seeed_rpcble_web_battery_set_level` | Statement | LEVEL(input_value), NOTIFY(dropdown) | `seeed_rpcble_web_battery_set_level(math_number(0), TRUE)` | `seeedRpcBleBatterySetLevel((uint8_t)(1), true);` |
| `seeed_rpcble_web_battery_level` | Value | (none) | `seeed_rpcble_web_battery_level()` | `seeed_rpcble_battery_level` |
| `seeed_rpcble_web_battery_connected` | Value | (none) | `seeed_rpcble_web_battery_connected()` | `seeed_rpcble_battery_connected` |
| `seeed_rpcble_ibeacon_begin` | Statement | NAME(input_value), UUID(input_value), MAJOR(input_value), MINOR(input_value), MANUFACTURER(input_value), POWER(input_value), INFO(input_value), ADV_TYPE(dropdown) | `seeed_rpcble_ibeacon_begin(text("value"), text("value"), math_number(0), math_number(0), math_number(0), math_number(0), text("value"), NONCONN)` | `BLEDevice::init(String("value").c_str()); ↵ seeed_rpcble_beacon_advertising = BLEDevice::getAdvertising(); ↵ seeedRpcBleStartIBeacon(String("value"), (uint16_t)(1), (uint16_t)(1), (uint16_t)(1), (int8_t)(1), String("value"), String("value"), false);` |
| `seeed_rpcble_ibeacon_stop` | Statement | (none) | `seeed_rpcble_ibeacon_stop()` | `if (seeed_rpcble_beacon_advertising != NULL) { ↵ seeed_rpcble_beacon_advertising->stop(); ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PROPERTIES | BLECharacteristic::PROPERTY_READ, BLECharacteristic::PROPERTY_WRITE, BLECharacteristic::PROPERTY_NOTIFY, BLECharacteristic::PROPERTY_READ &#124; BLECharacteristic::PROPERTY_WRITE, BLECharacteristic::PROPERTY_READ &#124; BLEChar... | seeed_rpcble_create_characteristic |
| PERMISSIONS | GATT_PERM_READ, GATT_PERM_WRITE, GATT_PERM_READ &#124; GATT_PERM_WRITE, 0 | seeed_rpcble_characteristic_set_permissions |
| FLAGS | ATTRIB_FLAG_VOID &#124; ATTRIB_FLAG_ASCII_Z, ATTRIB_FLAG_VOID | seeed_rpcble_characteristic_add_descriptor |
| PERMISSIONS | GATT_PERM_READ, GATT_PERM_WRITE, GATT_PERM_READ &#124; GATT_PERM_WRITE | seeed_rpcble_characteristic_add_descriptor |
| ENABLE | TRUE, FALSE | seeed_rpcble_advertising_set_scan_response |
| ACTIVE | TRUE, FALSE | seeed_rpcble_scan_set_active |
| CONTINUE | FALSE, TRUE | seeed_rpcble_scan_start |
| ADDRESS_TYPE | GAP_REMOTE_ADDR_LE_PUBLIC, GAP_REMOTE_ADDR_LE_RANDOM | seeed_rpcble_client_connect |
| RESPONSE | FALSE, TRUE | seeed_rpcble_remote_characteristic_write |
| NOTIFY | TRUE, FALSE | seeed_rpcble_remote_characteristic_register_notify, seeed_rpcble_web_battery_set_level |
| ADV_TYPE | NONCONN, SCAN_IND | seeed_rpcble_ibeacon_begin |

## ABS Examples

### Basic Usage
```
arduino_setup()
    seeed_rpcble_init(text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, seeed_rpcble_is_initialized())
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `seeed_rpcble_create_server("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
