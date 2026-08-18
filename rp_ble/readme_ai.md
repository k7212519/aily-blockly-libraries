# Pico BLE

Raspberry Pi Pico BLE Bluetooth library, implemented based on BTstackLib. Supports BLE peripheral mode, central mode, iBeacon, GATT service, device scanning and connection management.

## Library Info
- **Name**: @aily-project/lib-rp-ble
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `rp_ble_setup` | Statement | NAME(input_value) | `rp_ble_setup(text("value"))` | `BTstack.setup("value");` |
| `rp_ble_setup_simple` | Statement | (none) | `rp_ble_setup_simple()` | `BTstack.setup();` |
| `rp_ble_start_advertising` | Statement | (none) | `rp_ble_start_advertising()` | `BTstack.startAdvertising();` |
| `rp_ble_stop_advertising` | Statement | (none) | `rp_ble_stop_advertising()` | `BTstack.stopAdvertising();` |
| `rp_ble_ibeacon_configure` | Statement | UUID(input_value), MAJOR(input_value), MINOR(input_value) | `rp_ble_ibeacon_configure(text("value"), math_number(0), math_number(0))` | `BTstack.iBeaconConfigure(&_ibeacon_uuid, 1, 1);` |
| `rp_ble_start_scanning` | Statement | (none) | `rp_ble_start_scanning()` | `BTstack.bleStartScanning();` |
| `rp_ble_stop_scanning` | Statement | (none) | `rp_ble_stop_scanning()` | `BTstack.bleStopScanning();` |
| `rp_ble_on_advertisement` | Hat | ADV_VAR(field_input), HANDLER(input_statement) | `rp_ble_on_advertisement("bleAdv")` | `void ble_advertisement_callback(BLEAdvertisement *bleAdv) { ↵ } ↵ BTstack.setBLEAdvertisementCallback(ble_advertisement_callback);` |
| `rp_ble_adv_get_address` | Value | ADV_VAR(field_variable) | `rp_ble_adv_get_address($bleAdv)` | `bleAdv->getBdAddr()->getAddressString()` |
| `rp_ble_adv_get_rssi` | Value | ADV_VAR(field_variable) | `rp_ble_adv_get_rssi($bleAdv)` | `bleAdv->getRssi()` |
| `rp_ble_adv_is_ibeacon` | Value | ADV_VAR(field_variable) | `rp_ble_adv_is_ibeacon($bleAdv)` | `bleAdv->isIBeacon()` |
| `rp_ble_adv_name_has_prefix` | Value | ADV_VAR(field_variable), PREFIX(input_value) | `rp_ble_adv_name_has_prefix($bleAdv, text("value"))` | `bleAdv->nameHasPrefix("value")` |
| `rp_ble_add_service` | Statement | UUID(input_value) | `rp_ble_add_service(text("value"))` | `BTstack.addGATTService(new UUID("value"));` |
| `rp_ble_add_characteristic` | Statement | UUID(input_value), PROPS(dropdown), VALUE(input_value) | `rp_ble_add_characteristic(text("value"), ATT_PROPERTY_READ, text("value"))` | `BTstack.addGATTCharacteristic(new UUID("value"), ATT_PROPERTY_READ, "value");` |
| `rp_ble_add_characteristic_dynamic` | Statement | UUID(input_value), PROPS(dropdown), CHAR_ID(input_value) | `rp_ble_add_characteristic_dynamic(text("value"), ATT_PROPERTY_READ, math_number(0))` | `BTstack.addGATTCharacteristicDynamic(new UUID("value"), ATT_PROPERTY_READ, 1);` |
| `rp_ble_on_device_connected` | Hat | DEV_VAR(field_input), HANDLER(input_statement) | `rp_ble_on_device_connected("bleDevice")` | `void ble_device_connected_callback(BLEStatus status, BLEDevice *bleDevice) { ↵ if (status == BLE_STATUS_OK) { ↵ } ↵ } ↵ BTstack.setBLEDeviceConnectedCallback(ble_device_connected_callback);` |
| `rp_ble_on_device_disconnected` | Hat | HANDLER(input_statement) | `rp_ble_on_device_disconnected()` | `void ble_device_disconnected_callback(BLEDevice *device) { ↵ } ↵ BTstack.setBLEDeviceDisconnectedCallback(ble_device_disconnected_callback);` |
| `rp_ble_on_characteristic_read` | Hat | CHAR_ID_VAR(field_input), BUFFER_VAR(field_input), SIZE_VAR(field_input), HANDLER(input_statement), RETURN_SIZE(input_value) | `rp_ble_on_characteristic_read("charId", "buffer", "bufferSize", math_number(0))` | `uint16_t ble_gatt_read_callback(uint16_t charId, uint8_t * buffer, uint16_t bufferSize) { ↵ return 1; ↵ } ↵ BTstack.setGATTCharacteristicRead(ble_gatt_read_callback);` |
| `rp_ble_on_characteristic_write` | Hat | CHAR_ID_VAR(field_input), DATA_VAR(field_input), LEN_VAR(field_input), HANDLER(input_statement) | `rp_ble_on_characteristic_write("charId", "data", "dataLen")` | `int ble_gatt_write_callback(uint16_t charId, uint8_t *data, uint16_t dataLen) { ↵ return 0; ↵ } ↵ BTstack.setGATTCharacteristicWrite(ble_gatt_write_callback);` |
| `rp_ble_write_buffer` | Statement | BUFFER_VAR(field_variable), DATA(input_value) | `rp_ble_write_buffer($buffer, text("value"))` | `if (buffer) { memcpy(buffer, "value", strlen("value")); }` |
| `rp_ble_connect` | Statement | ADDRESS(input_value), TIMEOUT(input_value) | `rp_ble_connect(text("value"), math_number(1000))` | `BTstack.bleConnect(PUBLIC_ADDRESS, "value", 1);` |
| `rp_ble_connect_adv` | Statement | ADV_VAR(field_variable), TIMEOUT(input_value) | `rp_ble_connect_adv($bleAdv, math_number(1000))` | `BTstack.bleConnect(bleAdv, 1);` |
| `rp_ble_disconnect` | Statement | DEV_VAR(field_variable) | `rp_ble_disconnect($bleDevice)` | `BTstack.bleDisconnect(bleDevice);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PROPS | ATT_PROPERTY_READ, ATT_PROPERTY_WRITE, ATT_PROPERTY_READ &#124; ATT_PROPERTY_WRITE, ATT_PROPERTY_NOTIFY, ATT_PROPERTY_READ &#124; ATT_PROPERTY_NOTIFY, ATT_PROPERTY_READ &#124; ATT_PROPERTY_WRITE &#124; ATT_PROPERTY_NOTIFY | rp_ble_add_characteristic, rp_ble_add_characteristic_dynamic |

## ABS Examples

### Basic Usage
```
arduino_setup()
    rp_ble_setup(text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, rp_ble_adv_get_address($bleAdv))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
