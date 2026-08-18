# NimBLEBluetooth

ESP32 Bluetooth Low Energy (BLE) library supports server and client modes

## Library Info
- **Name**: @aily-project/lib-nimble
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `nimble_init` | Statement | NAME(input_value) | `nimble_init(text("value"))` | `NimBLEDevice::init("value");` |
| `nimble_deinit` | Statement | CLEAR_ALL(field_checkbox) | `nimble_deinit(FALSE)` | `NimBLEDevice::deinit(false);` |
| `nimble_create_server` | Statement | VAR(field_input) | `nimble_create_server("pServer")` | `pServer = NimBLEDevice::createServer();` |
| `nimble_server_create_service` | Statement | SERVER(field_variable), UUID(input_value), SERVICE_VAR(field_input) | `nimble_server_create_service($pServer, text("value"), "pService")` | `pService = pServer->createService("value");` |
| `nimble_service_create_characteristic` | Statement | SERVICE(field_variable), UUID(input_value), CHAR_VAR(field_input) | `nimble_service_create_characteristic($pService, text("value"), "pCharacteristic")` | `pCharacteristic = pService->createCharacteristic("value");` |
| `nimble_service_create_characteristic_props` | Statement | SERVICE(field_variable), UUID(input_value), PROPERTIES(dropdown), CHAR_VAR(field_input) | `nimble_service_create_characteristic_props($pService, text("value"), READ_WRITE, "pCharacteristic")` | `pCharacteristic = pService->createCharacteristic("value", NIMBLE_PROPERTY::READ &#124; NIMBLE_PROPERTY::WRITE);` |
| `nimble_characteristic_set_value` | Statement | CHAR(field_variable), VALUE(input_value) | `nimble_characteristic_set_value($pCharacteristic, math_number(0))` | `pCharacteristic->setValue(1);` |
| `nimble_characteristic_get_value` | Value | CHAR(field_variable) | `nimble_characteristic_get_value($pCharacteristic)` | `String(pCharacteristic->getValue().c_str())` |
| `nimble_characteristic_notify` | Statement | CHAR(field_variable) | `nimble_characteristic_notify($pCharacteristic)` | `pCharacteristic->notify();` |
| `nimble_service_start` | Statement | SERVICE(field_variable) | `nimble_service_start($pService)` | `pService->start();` |
| `nimble_start_advertising` | Statement | (none) | `nimble_start_advertising()` | `NimBLEDevice::startAdvertising();` |
| `nimble_stop_advertising` | Statement | (none) | `nimble_stop_advertising()` | `NimBLEDevice::getAdvertising()->stop();` |
| `nimble_advertising_add_service` | Statement | UUID(input_value) | `nimble_advertising_add_service(text("value"))` | `NimBLEDevice::getAdvertising()->addServiceUUID("value");` |
| `nimble_advertising_set_name` | Statement | NAME(input_value) | `nimble_advertising_set_name(text("value"))` | `NimBLEDevice::getAdvertising()->setName("value");` |
| `nimble_server_connected_count` | Value | SERVER(field_variable) | `nimble_server_connected_count($pServer)` | `pServer->getConnectedCount()` |
| `nimble_on_connect` | Hat | SERVER(field_variable), HANDLER(input_statement) | `nimble_on_connect($pServer)` | `NimBLEServerCallbacks_pServer pServer_callbacks; ↵ class NimBLEServerCallbacks_pServer : public NimBLEServerCallbacks { ↵ void onConnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo) override { ↵ } ↵ }; ↵ pServer->setCallbacks(&pServer_callbacks);` |
| `nimble_on_disconnect` | Hat | SERVER(field_variable), HANDLER(input_statement) | `nimble_on_disconnect($pServer)` | `NimBLEServerDisconnectCallbacks_pServer pServer_disconnect_callbacks; ↵ class NimBLEServerDisconnectCallbacks_pServer : public NimBLEServerCallbacks { ↵ void onDisconnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo, int reason) override { ↵ } ↵ }; ↵ pServer->setCallbacks(&pServer_disconnect_callbacks);` |
| `nimble_on_characteristic_write` | Hat | CHAR(field_variable), HANDLER(input_statement) | `nimble_on_characteristic_write($pCharacteristic)` | `NimBLECharWriteCallbacks_pCharacteristic pCharacteristic_callbacks; ↵ class NimBLECharWriteCallbacks_pCharacteristic : public NimBLECharacteristicCallbacks { ↵ void onWrite(NimBLECharacteristic* pCharacteristic, NimBLEConnInfo& connInfo) override { ↵ } ↵ }; ↵ pCharacteristic->setCallbacks(&pCharacteristic_callbacks);` |
| `nimble_start_scan` | Statement | DURATION(input_value) | `nimble_start_scan(math_number(1000))` | `NimBLEDevice::getScan()->start(1 * 1000);` |
| `nimble_stop_scan` | Statement | (none) | `nimble_stop_scan()` | `NimBLEDevice::getScan()->stop();` |
| `nimble_is_scanning` | Value | (none) | `nimble_is_scanning()` | `NimBLEDevice::getScan()->isScanning()` |
| `nimble_on_scan_result` | Hat | HANDLER(input_statement) | `nimble_on_scan_result()` | `NimBLEScanCallbacks_custom nimbleScanCallbacks; ↵ class NimBLEScanCallbacks_custom : public NimBLEScanCallbacks { ↵ void onResult(const NimBLEAdvertisedDevice* advertisedDevice) override { ↵ const NimBLEAdvertisedDevice* scanDevice = advertisedDevice; ↵ } ↵ }; ↵ NimBLEDevice::getScan()->setScanCallbacks(&nimbleScanCallbacks);` |
| `nimble_scan_device_name` | Value | (none) | `nimble_scan_device_name()` | `String(scanDevice->getName().c_str())` |
| `nimble_scan_device_address` | Value | (none) | `nimble_scan_device_address()` | `String(scanDevice->getAddress().toString().c_str())` |
| `nimble_scan_device_rssi` | Value | (none) | `nimble_scan_device_rssi()` | `scanDevice->getRSSI()` |
| `nimble_scan_device_has_service` | Value | UUID(input_value) | `nimble_scan_device_has_service(text("value"))` | `scanDevice->isAdvertisingService(NimBLEUUID("value"))` |
| `nimble_create_client` | Statement | VAR(field_input) | `nimble_create_client("pClient")` | `pClient = NimBLEDevice::createClient();` |
| `nimble_client_connect_address` | Value | CLIENT(field_variable), ADDRESS(input_value) | `nimble_client_connect_address($pClient, text("value"))` | `pClient->connect(NimBLEAddress("value", BLE_ADDR_PUBLIC))` |
| `nimble_client_connect_device` | Value | CLIENT(field_variable) | `nimble_client_connect_device($pClient)` | `pClient->connect(scanDevice)` |
| `nimble_client_disconnect` | Statement | CLIENT(field_variable) | `nimble_client_disconnect($pClient)` | `pClient->disconnect();` |
| `nimble_client_is_connected` | Value | CLIENT(field_variable) | `nimble_client_is_connected($pClient)` | `pClient->isConnected()` |
| `nimble_client_get_service` | Statement | CLIENT(field_variable), UUID(input_value), SERVICE_VAR(field_input) | `nimble_client_get_service($pClient, text("value"), "pRemoteService")` | `pRemoteService = pClient->getService("value");` |
| `nimble_remote_service_get_characteristic` | Statement | SERVICE(field_variable), UUID(input_value), CHAR_VAR(field_input) | `nimble_remote_service_get_characteristic($pRemoteService, text("value"), "pRemoteChar")` | `pRemoteChar = pRemoteService->getCharacteristic("value");` |
| `nimble_remote_char_read` | Value | CHAR(field_variable) | `nimble_remote_char_read($pRemoteChar)` | `String(pRemoteChar->readValue().c_str())` |
| `nimble_remote_char_write` | Statement | CHAR(field_variable), VALUE(input_value) | `nimble_remote_char_write($pRemoteChar, math_number(0))` | `pRemoteChar->writeValue(1);` |
| `nimble_remote_char_subscribe` | Hat | CHAR(field_variable), HANDLER(input_statement) | `nimble_remote_char_subscribe($pRemoteChar)` | `pRemoteChar->subscribe(true, nimble_notify_pRemoteChar_callback);` |
| `nimble_notify_data` | Value | (none) | `nimble_notify_data()` | `notifyData` |
| `nimble_get_address` | Value | (none) | `nimble_get_address()` | `String(NimBLEDevice::getAddress().toString().c_str())` |
| `nimble_set_mtu` | Statement | MTU(input_value) | `nimble_set_mtu(math_number(0))` | `NimBLEDevice::setMTU(1);` |
| `nimble_set_power` | Statement | POWER(dropdown) | `nimble_set_power("-12")` | `NimBLEDevice::setPower(-12);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PROPERTIES | READ_WRITE, READ, WRITE, READ_NOTIFY, READ_WRITE_NOTIFY, READ_WRITE_INDICATE | nimble_service_create_characteristic_props |
| POWER | -12, -9, -6, -3, 0, 3, 6, 9 | nimble_set_power |

## ABS Examples

### Basic Usage
```
arduino_setup()
    nimble_init(text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, nimble_characteristic_get_value($pCharacteristic))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `nimble_create_server("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
