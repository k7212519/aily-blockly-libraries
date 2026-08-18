# nRF54 Zigbee Home Automation

Zigbee Home Automation library for nRF54L15, supporting End Device and Router roles with On/Off Light, Dimmable Light, Color Light, Temperature Sensor, Humidity Sensor device types, featuring secure commissioning, att...

## Library Info
- **Name**: @aily-project/lib-nrf54-zigbee
- **Version**: 0.6.81

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `zigbee_init` | Statement | VAR(field_input), ROLE(dropdown), DEVICE_TYPE(dropdown), CHANNEL(input_value), PAN_ID(input_value) | `zigbee_init("zigbee", END_DEVICE, ON_OFF_LIGHT, math_number(0), math_number(0))` | `// 读取设备IEEE地址 ↵ if (zigbee_localIeee == 0ULL) zigbee_localIeee = zigbeeFactoryEui64(); ↵ // 初始化入网状态 ↵ ZigbeeCommissioning::initializeEndDeviceState(&zigbee_network, ↵ zigbee_commissioningPolicy(), zigbee_channel, zigbee_panId, ↵ zigbee_tempShort, zigbee_coordShort, zigbee_logicalType); ↵ // 初始化持久化存储 ↵ zigbee_store.begin("zigbee"); ↵ { ↵ ZigbeePersistentState state{}; ↵ if (zigbee_store.load(&state) && state.ieeeAddress == zigbee_localIeee) { ↵ ZigbeeCommissioning::restoreEndDeviceState(&zigbee_network, state, zigbee_localIeee); ↵ } ↵ } ↵ // 配置设备 ↵ zigbee_configureDevice();` |
| `zigbee_set_basic_info` | Statement | VAR(field_variable), MANUFACTURER(input_value), MODEL(input_value), VERSION(input_value) | `zigbee_set_basic_info($zigbee, text("value"), text("value"), text("value"))` | `const char* zigbee_manufacturer = "value"; ↵ const char* zigbee_model = "value"; ↵ const char* zigbee_version = "value";` |
| `zigbee_set_install_code` | Statement | VAR(field_variable), INSTALL_CODE(input_value) | `zigbee_set_install_code($zigbee, text("value"))` | `zigbee_parseInstallCode("value", zigbee_installCodeBytes, &zigbee_installCodeLen); ↵ zigbee_hasInstallCode = ZigbeeSecurity::deriveInstallCodeLinkKey(zigbee_installCodeBytes, zigbee_installCodeLen, zigbee_installCodeKey);` |
| `zigbee_start` | Statement | VAR(field_variable) | `zigbee_start($zigbee)` | `// 启动Zigbee无线电 ↵ zigbee_radio.begin(zigbee_channel, 8); ↵ // 请求入网 ↵ if (!zigbee_network.joined) { ↵ ZigbeeCommissioning::requestNetworkSteering(&zigbee_network); ↵ }` |
| `zigbee_loop` | Statement | VAR(field_variable) | `zigbee_loop($zigbee)` | `zigbee_processLoop(); ↵ zigbee_device.updateIdentify(millis());` |
| `zigbee_is_joined` | Value | VAR(field_variable) | `zigbee_is_joined($zigbee)` | `zigbee_network.joined` |
| `zigbee_set_on_off` | Statement | VAR(field_variable), STATE(dropdown) | `zigbee_set_on_off($zigbee, TRUE)` | `zigbee_device.setOnOff(true);` |
| `zigbee_get_on_off` | Value | VAR(field_variable) | `zigbee_get_on_off($zigbee)` | `zigbee_device.onOff()` |
| `zigbee_set_level` | Statement | VAR(field_variable), LEVEL(input_value) | `zigbee_set_level($zigbee, math_number(0))` | `zigbee_device.setLevel(1);` |
| `zigbee_get_level` | Value | VAR(field_variable) | `zigbee_get_level($zigbee)` | `zigbee_device.level()` |
| `zigbee_set_color_hs` | Statement | VAR(field_variable), HUE(input_value), SATURATION(input_value) | `zigbee_set_color_hs($zigbee, math_number(0), math_number(0))` | `zigbee_device.setColorHueSaturation(1, 1);` |
| `zigbee_set_color_temp` | Statement | VAR(field_variable), COLOR_TEMP(input_value) | `zigbee_set_color_temp($zigbee, math_number(0))` | `zigbee_device.setColorTemperatureMireds(1);` |
| `zigbee_set_temperature` | Statement | VAR(field_variable), TEMPERATURE(input_value) | `zigbee_set_temperature($zigbee, math_number(0))` | `zigbee_device.setTemperatureState((int16_t)(1 * 100), -4000, 8500, 10);` |
| `zigbee_set_humidity` | Statement | VAR(field_variable), HUMIDITY(input_value) | `zigbee_set_humidity($zigbee, math_number(0))` | `zigbee_device.setHumidityState((uint16_t)(1 * 100), 0, 10000, 10);` |
| `zigbee_set_battery` | Statement | VAR(field_variable), VOLTAGE(input_value), PERCENTAGE(input_value) | `zigbee_set_battery($zigbee, math_number(0), math_number(0))` | `zigbee_device.setBatteryStatus(1, (uint8_t)(1 * 2));` |
| `zigbee_is_identifying` | Value | VAR(field_variable) | `zigbee_is_identifying($zigbee)` | `zigbee_device.identifying()` |
| `zigbee_configure_reporting` | Statement | VAR(field_variable), CLUSTER(dropdown), ATTR_ID(input_value), MIN_INTERVAL(input_value), MAX_INTERVAL(input_value) | `zigbee_configure_reporting($zigbee, ON_OFF, math_number(0), math_number(1000), math_number(1000))` | `zigbee_device.configureReporting(0x0006, 1, ZigbeeZclDataType::kBoolean, 1, 1, 0);` |
| `zigbee_on_state_change` | Hat | VAR(field_variable), DO(input_statement) | `zigbee_on_state_change($zigbee)` | `void zigbee_onStateChange() { ↵ } ↵ void zigbee_checkStateChange() { ↵ bool currentOnOff = zigbee_device.onOff(); ↵ if (currentOnOff != zigbee_prevOnOff) { ↵ zigbee_prevOnOff = currentOnOff; ↵ zigbee_onStateChange(); ↵ } ↵ }` |
| `zigbee_on_level_change` | Hat | VAR(field_variable), DO(input_statement) | `zigbee_on_level_change($zigbee)` | `void zigbee_onLevelChange() { ↵ } ↵ void zigbee_checkLevelChange() { ↵ uint8_t currentLevel = zigbee_device.level(); ↵ if (currentLevel != zigbee_prevLevel) { ↵ zigbee_prevLevel = currentLevel; ↵ zigbee_onLevelChange(); ↵ } ↵ }` |
| `zigbee_on_color_change` | Hat | VAR(field_variable), DO(input_statement) | `zigbee_on_color_change($zigbee)` | `void zigbee_onColorChange() { ↵ } ↵ void zigbee_checkColorChange() { ↵ const ZigbeeHomeAutomationConfig& cfg = zigbee_device.config(); ↵ uint8_t h = cfg.colorControl.currentHue; ↵ uint8_t s = cfg.colorControl.currentSaturation; ↵ if (h != zigbee_prevHue &#124;&#124; s != zigbee_prevSat) { ↵ zigbee_prevHue = h; ↵ zigbee_prevSat = s; ↵ zigbee_onColorChange(); ↵ } ↵ }` |
| `zigbee_on_join` | Hat | VAR(field_variable), DO(input_statement) | `zigbee_on_join($zigbee)` | `void zigbee_onJoin() { ↵ } ↵ void zigbee_checkJoinChange() { ↵ bool currentJoined = zigbee_network.joined; ↵ if (currentJoined && !zigbee_joined) { ↵ zigbee_joined = true; ↵ zigbee_onJoin(); ↵ } else if (!currentJoined) { ↵ zigbee_joined = false; ↵ } ↵ }` |
| `zigbee_persist_save` | Statement | VAR(field_variable) | `zigbee_persist_save($zigbee)` | `zigbee_persistState();` |
| `zigbee_persist_clear` | Statement | VAR(field_variable) | `zigbee_persist_clear($zigbee)` | `zigbee_store.clear();` |
| `zigbee_rejoin` | Statement | VAR(field_variable) | `zigbee_rejoin($zigbee)` | `ZigbeeCommissioning::requestSecureRejoin(&zigbee_network);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ROLE | END_DEVICE, ROUTER | zigbee_init |
| DEVICE_TYPE | ON_OFF_LIGHT, DIMMABLE_LIGHT, COLOR_LIGHT, EXTENDED_COLOR_LIGHT, ON_OFF_SWITCH, TEMPERATURE_SENSOR, TEMPERATURE_HUMIDITY_SENSOR | zigbee_init |
| STATE | TRUE, FALSE | zigbee_set_on_off |
| CLUSTER | ON_OFF, LEVEL_CONTROL, COLOR_CONTROL, TEMPERATURE, HUMIDITY, POWER_CONFIG | zigbee_configure_reporting |

## ABS Examples

### Basic Usage
```
arduino_setup()
    zigbee_init("zigbee", END_DEVICE, ON_OFF_LIGHT, math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, zigbee_is_joined($zigbee))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `zigbee_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
