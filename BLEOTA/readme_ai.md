# BLEOTA

ESP32 BLE firmware and filesystem OTA update blocks.

## Library Info
- **Name**: @aily-project/lib-bleota
- **Version**: 1.0.6

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bleota_begin_auto` | Statement | (none) | `bleota_begin_auto()` | `BLEDevice::init(""); ↵ pServer = BLEDevice::createServer(); ↵ pServer->setCallbacks(new BLEOTAServerCallbacks_pServer()); ↵ BLEOTA.begin(pServer, false); ↵ BLEOTA.init(); ↵ BLEDevice::getAdvertising()->addServiceUUID(BLEOTA.getBLEOTAuuid()); ↵ BLEDevice::getAdvertising()->setScanResponse(true); ↵ BLEDevice::getAdvertising()->setMinPreferred(0x0); ↵ BLEDevice::startAdvertising();` |
| `bleota_setup` | Statement | VAR(field_input), SERVER_VAR(field_input), DEVICE_NAME(input_value), SECURE(dropdown) | `bleota_setup("BLEOTA", "pServer", text("ESP32-BLE-OTA"), false)` | `BLEDevice::init("value"); ↵ pServer = BLEDevice::createServer(); ↵ pServer->setCallbacks(new BLEOTAServerCallbacks_pServer()); ↵ BLEOTA.begin(pServer, false);` |
| `bleota_set_public_key` | Statement | VAR(field_variable), KEY(input_value) | `bleota_set_public_key($BLEOTA, text("public key"))` | `bleota_set_public_key(BLEOTA, "value");` |
| `bleota_set_device_info` | Statement | VAR(field_variable), INFO(dropdown), VALUE(input_value) | `bleota_set_device_info($BLEOTA, FW_VERSION, text("1.0.0"))` | `BLEOTA.setModel("value");` |
| `bleota_init` | Statement | VAR(field_input), SCAN_RESPONSE(dropdown) | `bleota_init("BLEOTA", false)` | `BLEOTA.init(); ↵ BLEDevice::getAdvertising()->addServiceUUID(BLEOTA.getBLEOTAuuid()); ↵ BLEDevice::getAdvertising()->setScanResponse(false); ↵ BLEDevice::getAdvertising()->setMinPreferred(0x0); ↵ BLEDevice::startAdvertising();` |
| `bleota_start_service` | Statement | VAR(field_variable), SERVER(field_variable), SCAN_RESPONSE(dropdown), AUTO_RESET(dropdown) | `bleota_start_service($BLEOTA, $pServer, false, true)` | `BLEOTA.init(); ↵ BLEDevice::getAdvertising()->addServiceUUID(BLEOTA.getBLEOTAuuid()); ↵ BLEDevice::getAdvertising()->setScanResponse(false); ↵ BLEDevice::getAdvertising()->setMinPreferred(0x0); ↵ BLEDevice::startAdvertising();` |
| `bleota_process` | Statement | VAR(field_variable), RESET(dropdown) | `bleota_process($BLEOTA, true)` | `BLEOTA.process(true);` |
| `bleota_abort` | Statement | VAR(field_variable) | `bleota_abort($BLEOTA)` | `BLEOTA.abort();` |
| `bleota_is_running` | Value | VAR(field_variable) | `bleota_is_running($BLEOTA)` | `BLEOTA.isRunning()` |
| `bleota_progress` | Value | VAR(field_variable) | `bleota_progress($BLEOTA)` | `BLEOTA.progress()` |
| `bleota_uuid` | Value | VAR(field_variable) | `bleota_uuid($BLEOTA)` | `BLEOTA.getBLEOTAuuid()` |
| `bleota_on_events` | Hat | VAR(field_variable), BEFORE_OTA(input_statement), BEFORE_SPIFFS(input_statement), AFTER_STOP(input_statement), AFTER_ABORT(input_statement) | `bleota_on_events($BLEOTA)` | `class BLEOTAEventCallbacks_BLEOTA : public BLEOTACallbacks { ↵ public: ↵ void beforeStartOTA() { ↵ } ↵ void beforeStartSPIFFS() { ↵ } ↵ void afterStop() { ↵ } ↵ void afterAbort() { ↵ } ↵ }; ↵ BLEOTA.setCallbacks(new BLEOTAEventCallbacks_BLEOTA());` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SECURE | `false`, `true` | Enable signed update verification |
| INFO | `MODEL`, `SERIAL_NUMBER`, `FW_VERSION`, `HW_VERSION`, `MANUFACTURER` | DIS device information field |
| SCAN_RESPONSE | `false`, `true` | BLE advertising scan response |
| AUTO_RESET / RESET | `true`, `false` | Reboot automatically after a successful update |

## ABS Examples

### Basic Usage
```
arduino_setup()
    bleota_begin_auto()

arduino_loop()
    time_delay(math_number(20))
```

### Secure Usage
```
arduino_setup()
    bleota_setup("BLEOTA", "pServer", text("ESP32-Secure-OTA"), true)
    bleota_set_public_key($BLEOTA, text("-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"))
    bleota_set_device_info($BLEOTA, FW_VERSION, text("1.0.0"))
    bleota_start_service($BLEOTA, $pServer, false, true)
```

### Manual Polling Usage
```
arduino_setup()
    bleota_setup("BLEOTA", "pServer", text("ESP32-BLE-OTA"), false)
    bleota_init("BLEOTA", false)

arduino_loop()
    bleota_process($BLEOTA, true)
```

## Notes

1. Place setup/start blocks in `arduino_setup()`.
2. `bleota_begin_auto` is the one-block quick start and auto-adds a loop helper.
3. `bleota_init` only initializes the service and advertising; use `bleota_process` in `arduino_loop()` for manual polling.
4. `bleota_start_service` keeps the automatic loop helper for advanced flows that still want auto processing.
5. Secure mode requires a public key and signed `.bin` image.
6. The upstream method name `setManufactuer` keeps the original library spelling.
