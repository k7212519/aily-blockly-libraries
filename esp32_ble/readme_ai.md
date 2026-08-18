# ESP32 BLE

ESP32 Bluetooth Low Energy (BLE) library supports server, client, scanning and UART communication functions

## Library Info
- **Name**: @aily-project/lib-esp32-ble
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_ble_init` | Statement | NAME(input_value) | `esp32_ble_init(text("value"))` | `BLEDevice::init("value");` |
| `esp32_ble_deinit` | Statement | RELEASE_MEMORY(dropdown) | `esp32_ble_deinit(false)` | `BLEDevice::deinit(false);` |
| `esp32_ble_get_address` | Value | (none) | `esp32_ble_get_address()` | `BLEDevice::getAddress().toString().c_str()` |
| `esp32_ble_set_mtu` | Statement | MTU(input_value) | `esp32_ble_set_mtu(math_number(0))` | `BLEDevice::setMTU(1);` |
| `esp32_ble_get_mtu` | Value | (none) | `esp32_ble_get_mtu()` | `BLEDevice::getMTU()` |
| `esp32_ble_create_server` | Statement | VAR(field_input) | `esp32_ble_create_server("pServer")` | `pServer = BLEDevice::createServer();` |
| `esp32_ble_server_create_service` | Statement | SERVER(field_variable), SERVICE_VAR(field_input), UUID(input_value) | `esp32_ble_server_create_service($pServer, "pService", text("value"))` | `pService = pServer->createService("value");` |
| `esp32_ble_service_start` | Statement | SERVICE(field_variable) | `esp32_ble_service_start($pService)` | `pService->start();` |
| `esp32_ble_service_stop` | Statement | SERVICE(field_variable) | `esp32_ble_service_stop($pService)` | `pService->stop();` |
| `esp32_ble_create_characteristic` | Statement | SERVICE(field_variable), CHAR_VAR(field_input), UUID(input_value), PROPERTIES(dropdown) | `esp32_ble_create_characteristic($pService, "pCharacteristic", text("value"), BLECharacteristic::PROPERTY_READ)` | `pCharacteristic = pService->createCharacteristic("value", BLECharacteristic::PROPERTY_READ);` |
| `esp32_ble_characteristic_set_value` | Statement | CHAR(field_variable), VALUE(input_value) | `esp32_ble_characteristic_set_value($pCharacteristic, math_number(0))` | `pCharacteristic->setValue(1);` |
| `esp32_ble_characteristic_get_value` | Value | CHAR(field_variable) | `esp32_ble_characteristic_get_value($pCharacteristic)` | `pCharacteristic->getValue()` |
| `esp32_ble_characteristic_notify` | Statement | CHAR(field_variable) | `esp32_ble_characteristic_notify($pCharacteristic)` | `pCharacteristic->notify();` |
| `esp32_ble_characteristic_indicate` | Statement | CHAR(field_variable) | `esp32_ble_characteristic_indicate($pCharacteristic)` | `pCharacteristic->indicate();` |
| `esp32_ble_add_descriptor` | Statement | CHAR(field_variable) | `esp32_ble_add_descriptor($pCharacteristic)` | `pCharacteristic->addDescriptor(new BLE2902());` |
| `esp32_ble_start_advertising` | Statement | (none) | `esp32_ble_start_advertising()` | `BLEDevice::startAdvertising();` |
| `esp32_ble_stop_advertising` | Statement | (none) | `esp32_ble_stop_advertising()` | `BLEDevice::stopAdvertising();` |
| `esp32_ble_advertising_add_service_uuid` | Statement | UUID(input_value) | `esp32_ble_advertising_add_service_uuid(text("value"))` | `BLEDevice::getAdvertising()->addServiceUUID("value");` |
| `esp32_ble_advertising_set_scan_response` | Statement | ENABLED(dropdown) | `esp32_ble_advertising_set_scan_response(true)` | `BLEDevice::getAdvertising()->setScanResponse(true);` |
| `esp32_ble_on_connect` | Hat | SERVER(field_variable), HANDLER(input_statement) | `esp32_ble_on_connect($pServer)` | `class BLEServerCallbacksOnConnect_pServer : public BLEServerCallbacks { ↵ void onConnect(BLEServer* pServer) { ↵ } ↵ void onDisconnect(BLEServer* pServer) {} ↵ }; ↵ pServer->setCallbacks(new BLEServerCallbacksOnConnect_pServer());` |
| `esp32_ble_on_disconnect` | Hat | SERVER(field_variable), HANDLER(input_statement) | `esp32_ble_on_disconnect($pServer)` | `class BLEServerCallbacksOnDisconnect_pServer : public BLEServerCallbacks { ↵ void onConnect(BLEServer* pServer) {} ↵ void onDisconnect(BLEServer* pServer) { ↵ } ↵ }; ↵ pServer->setCallbacks(new BLEServerCallbacksOnDisconnect_pServer());` |
| `esp32_ble_on_write` | Hat | CHAR(field_variable), HANDLER(input_statement) | `esp32_ble_on_write($pCharacteristic)` | `String ble_received_value_pCharacteristic = ""; ↵ class BLECharacteristicCallbacksOnWrite_pCharacteristic : public BLECharacteristicCallbacks { ↵ void onWrite(BLECharacteristic* pCharacteristic) { ↵ ble_received_value_pCharacteristic = pCharacteristic->getValue(); ↵ } ↵ }; ↵ pCharacteristic->setCallbacks(new BLECharacteristicCallbacksOnWrite_pCharacteristic());` |
| `esp32_ble_server_connected_count` | Value | SERVER(field_variable) | `esp32_ble_server_connected_count($pServer)` | `pServer->getConnectedCount()` |
| `esp32_ble_create_client` | Statement | VAR(field_input) | `esp32_ble_create_client("pClient")` | `pClient = BLEDevice::createClient();` |
| `esp32_ble_client_connect` | Statement | CLIENT(field_variable), ADDRESS(input_value) | `esp32_ble_client_connect($pClient, text("value"))` | `pClient->connect(BLEAddress("value"));` |
| `esp32_ble_client_disconnect` | Statement | CLIENT(field_variable) | `esp32_ble_client_disconnect($pClient)` | `pClient->disconnect();` |
| `esp32_ble_client_is_connected` | Value | CLIENT(field_variable) | `esp32_ble_client_is_connected($pClient)` | `pClient->isConnected()` |
| `esp32_ble_client_get_service` | Statement | CLIENT(field_variable), SERVICE_VAR(field_input), UUID(input_value) | `esp32_ble_client_get_service($pClient, "pRemoteService", text("value"))` | `pRemoteService = pClient->getService("value");` |
| `esp32_ble_remote_service_get_characteristic` | Statement | SERVICE(field_variable), CHAR_VAR(field_input), UUID(input_value) | `esp32_ble_remote_service_get_characteristic($pRemoteService, "pRemoteCharacteristic", text("value"))` | `pRemoteCharacteristic = pRemoteService->getCharacteristic("value");` |
| `esp32_ble_remote_characteristic_read` | Value | CHAR(field_variable) | `esp32_ble_remote_characteristic_read($pRemoteCharacteristic)` | `pRemoteCharacteristic->readValue()` |
| `esp32_ble_remote_characteristic_write` | Statement | CHAR(field_variable), VALUE(input_value) | `esp32_ble_remote_characteristic_write($pRemoteCharacteristic, math_number(0))` | `pRemoteCharacteristic->writeValue(1);` |
| `esp32_ble_remote_characteristic_can_read` | Value | CHAR(field_variable) | `esp32_ble_remote_characteristic_can_read($pRemoteCharacteristic)` | `pRemoteCharacteristic->canRead()` |
| `esp32_ble_remote_characteristic_can_notify` | Value | CHAR(field_variable) | `esp32_ble_remote_characteristic_can_notify($pRemoteCharacteristic)` | `pRemoteCharacteristic->canNotify()` |
| `esp32_ble_get_scan` | Statement | VAR(field_input) | `esp32_ble_get_scan("pBLEScan")` | `pBLEScan = BLEDevice::getScan();` |
| `esp32_ble_scan_set_active` | Statement | SCAN(field_variable), ACTIVE(dropdown) | `esp32_ble_scan_set_active($pBLEScan, true)` | `pBLEScan->setActiveScan(true);` |
| `esp32_ble_scan_set_interval` | Statement | SCAN(field_variable), INTERVAL(input_value) | `esp32_ble_scan_set_interval($pBLEScan, math_number(1000))` | `pBLEScan->setInterval(1);` |
| `esp32_ble_scan_set_window` | Statement | SCAN(field_variable), WINDOW(input_value) | `esp32_ble_scan_set_window($pBLEScan, math_number(0))` | `pBLEScan->setWindow(1);` |
| `esp32_ble_scan_start` | Statement | SCAN(field_variable), DURATION(input_value) | `esp32_ble_scan_start($pBLEScan, math_number(1000))` | `bleScanResults = pBLEScan->start(1, false);` |
| `esp32_ble_scan_stop` | Statement | SCAN(field_variable) | `esp32_ble_scan_stop($pBLEScan)` | `pBLEScan->stop();` |
| `esp32_ble_scan_get_results` | Value | SCAN(field_variable) | `esp32_ble_scan_get_results($pBLEScan)` | `pBLEScan->getResults()` |
| `esp32_ble_scan_results_count` | Value | RESULTS(input_value) | `esp32_ble_scan_results_count(math_number(0))` | `1->getCount()` |
| `esp32_ble_scan_results_get_device` | Value | RESULTS(input_value), INDEX(input_value) | `esp32_ble_scan_results_get_device(math_number(0), math_number(0))` | `1->getDevice(1)` |
| `esp32_ble_advertised_device_name` | Value | DEVICE(input_value) | `esp32_ble_advertised_device_name(math_number(0))` | `1.getName().c_str()` |
| `esp32_ble_advertised_device_address` | Value | DEVICE(input_value) | `esp32_ble_advertised_device_address(math_number(0))` | `1.getAddress().toString().c_str()` |
| `esp32_ble_advertised_device_rssi` | Value | DEVICE(input_value) | `esp32_ble_advertised_device_rssi(math_number(0))` | `1.getRSSI()` |
| `esp32_ble_scan_clear_results` | Statement | SCAN(field_variable) | `esp32_ble_scan_clear_results($pBLEScan)` | `pBLEScan->clearResults();` |
| `esp32_ble_uart_server_quick` | Statement | NAME(input_value) | `esp32_ble_uart_server_quick(text("value"))` | `BLEDevice::init("value"); ↵ ble_uart_server = BLEDevice::createServer(); ↵ ble_uart_server->setCallbacks(new BLEUartServerCallbacks()); ↵ BLEService* ble_uart_service = ble_uart_server->createService("6E400001-B5A3-F393-E0A9-E50E24DCCA9E"); ↵ ble_uart_tx_char = ble_uart_service->createCharacteristic("6E400003-B5A3-F393-E0A9-E50E24DCCA9E", BLECharacteristic::PROPERTY_NOTIFY); ↵ ble_uart_tx_char->addDescriptor(new BLE2902()); ↵ ble_uart_rx_char = ble_uart_service->createCharacteristic("6E400002-B5A3-F393-E0A9-E50E24DCCA9E", BLECharacteristic::PROPERTY_WRITE); ↵ ble_uart_rx_char->setCallbacks(new BLEUartRxCallbacks()); ↵ ble_uart_service->start(); ↵ ble_uart_server->getAdvertising()->addServiceUUID("6E400001-B5A3-F393-E0A9-E50E24DCCA9E"); ↵ ble_uart_server->getAdvertising()->setScanResponse(true); ↵ ble_uart_server->getAdvertising()->start();` |
| `esp32_ble_uart_send` | Statement | DATA(input_value) | `esp32_ble_uart_send(math_number(0))` | `if (ble_uart_connected) { ↵ ble_uart_tx_char->setValue(String(1).c_str()); ↵ ble_uart_tx_char->notify(); ↵ }` |
| `esp32_ble_uart_on_receive` | Hat | HANDLER(input_statement) | `esp32_ble_uart_on_receive()` | `String ble_uart_received_data = ""; ↵ class BLEUartRxCallbacksWithHandler : public BLECharacteristicCallbacks { ↵ void onWrite(BLECharacteristic* pCharacteristic) { ↵ ble_uart_received_data = pCharacteristic->getValue(); ↵ } ↵ }; ↵ ble_uart_rx_char->setCallbacks(new BLEUartRxCallbacksWithHandler());` |
| `esp32_ble_uart_received_data` | Value | (none) | `esp32_ble_uart_received_data()` | `ble_uart_received_data` |
| `esp32_ble_uart_is_connected` | Value | (none) | `esp32_ble_uart_is_connected()` | `ble_uart_connected` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| RELEASE_MEMORY | false, true | esp32_ble_deinit |
| PROPERTIES | BLECharacteristic::PROPERTY_READ, BLECharacteristic::PROPERTY_WRITE, BLECharacteristic::PROPERTY_NOTIFY, BLECharacteristic::PROPERTY_READ &#124; BLECharacteristic::PROPERTY_WRITE, BLECharacteristic::PROPERTY_READ &#124; BLEChar... | esp32_ble_create_characteristic |
| ENABLED | true, false | esp32_ble_advertising_set_scan_response |
| ACTIVE | true, false | esp32_ble_scan_set_active |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_ble_init(text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_ble_get_address())
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_ble_create_server("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
