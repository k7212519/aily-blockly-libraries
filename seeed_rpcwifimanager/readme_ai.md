# Seeed RPC WiFiManager

Seeed Wio Terminal WiFi configuration portal library

## Library Info
- **Name**: @aily-project/lib-seeed-rpcwifimanager
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_rpcwifimanager_create` | Statement | VAR(field_input) | `seeed_rpcwifimanager_create("wifiManager")` | `WiFiManager wifiManager;` |
| `seeed_rpcwifimanager_auto_connect` | Value | VAR(field_variable), AP_NAME(input_value), AP_PASSWORD(input_value) | `seeed_rpcwifimanager_auto_connect($wifiManager, text("value"), text("value"))` | `wifiManager.autoConnect(String("value").c_str(), String("value").c_str())` |
| `seeed_rpcwifimanager_auto_connect_default` | Value | VAR(field_variable) | `seeed_rpcwifimanager_auto_connect_default($wifiManager)` | `wifiManager.autoConnect()` |
| `seeed_rpcwifimanager_start_portal` | Value | VAR(field_variable), AP_NAME(input_value), AP_PASSWORD(input_value) | `seeed_rpcwifimanager_start_portal($wifiManager, text("value"), text("value"))` | `wifiManager.startConfigPortal(String("value").c_str(), String("value").c_str())` |
| `seeed_rpcwifimanager_start_portal_default` | Value | VAR(field_variable) | `seeed_rpcwifimanager_start_portal_default($wifiManager)` | `wifiManager.startConfigPortal()` |
| `seeed_rpcwifimanager_reset_settings` | Statement | VAR(field_variable) | `seeed_rpcwifimanager_reset_settings($wifiManager)` | `wifiManager.resetSettings();` |
| `seeed_rpcwifimanager_set_portal_timeout` | Statement | VAR(field_variable), SECONDS(input_value) | `seeed_rpcwifimanager_set_portal_timeout($wifiManager, math_number(0))` | `wifiManager.setConfigPortalTimeout(1);` |
| `seeed_rpcwifimanager_set_connect_timeout` | Statement | VAR(field_variable), SECONDS(input_value) | `seeed_rpcwifimanager_set_connect_timeout($wifiManager, math_number(0))` | `wifiManager.setConnectTimeout(1);` |
| `seeed_rpcwifimanager_set_debug_output` | Statement | VAR(field_variable), ENABLE(dropdown) | `seeed_rpcwifimanager_set_debug_output($wifiManager, TRUE)` | `wifiManager.setDebugOutput(true);` |
| `seeed_rpcwifimanager_set_min_quality` | Statement | VAR(field_variable), QUALITY(input_value) | `seeed_rpcwifimanager_set_min_quality($wifiManager, math_number(0))` | `wifiManager.setMinimumSignalQuality(1);` |
| `seeed_rpcwifimanager_set_remove_duplicate_aps` | Statement | VAR(field_variable), REMOVE(dropdown) | `seeed_rpcwifimanager_set_remove_duplicate_aps($wifiManager, TRUE)` | `wifiManager.setRemoveDuplicateAPs(true);` |
| `seeed_rpcwifimanager_set_break_after_save` | Statement | VAR(field_variable), ENABLE(dropdown) | `seeed_rpcwifimanager_set_break_after_save($wifiManager, TRUE)` | `wifiManager.setBreakAfterConfig(true);` |
| `seeed_rpcwifimanager_set_ap_static_ip` | Statement | VAR(field_variable), IP(input_value), GATEWAY(input_value), SUBNET(input_value) | `seeed_rpcwifimanager_set_ap_static_ip($wifiManager, text("value"), text("value"), text("value"))` | `wifiManager.setAPStaticIPConfig(seeedRpcWiFiManagerParseIP(String("value")), seeedRpcWiFiManagerParseIP(String("value")), seeedRpcWiFiManagerParseIP(String("value")));` |
| `seeed_rpcwifimanager_set_sta_static_ip` | Statement | VAR(field_variable), IP(input_value), GATEWAY(input_value), SUBNET(input_value) | `seeed_rpcwifimanager_set_sta_static_ip($wifiManager, text("value"), text("value"), text("value"))` | `wifiManager.setSTAStaticIPConfig(seeedRpcWiFiManagerParseIP(String("value")), seeedRpcWiFiManagerParseIP(String("value")), seeedRpcWiFiManagerParseIP(String("value")));` |
| `seeed_rpcwifimanager_set_custom_head` | Statement | VAR(field_variable), HTML(field_input) | `seeed_rpcwifimanager_set_custom_head($wifiManager, "<style>body{font-family:sans-serif;}</style>")` | `wifiManager.setCustomHeadElement(seeedRpcWiFiManagerHead_wifiManager);` |
| `seeed_rpcwifimanager_get_portal_ssid` | Value | VAR(field_variable) | `seeed_rpcwifimanager_get_portal_ssid($wifiManager)` | `wifiManager.getConfigPortalSSID()` |
| `seeed_rpcwifimanager_get_ssid` | Value | VAR(field_variable) | `seeed_rpcwifimanager_get_ssid($wifiManager)` | `wifiManager.getSSID()` |
| `seeed_rpcwifimanager_get_password` | Value | VAR(field_variable) | `seeed_rpcwifimanager_get_password($wifiManager)` | `wifiManager.getPassword()` |
| `seeed_rpcwifimanager_parameter_create` | Statement | VAR(field_input), ID(field_input), LABEL(field_input), DEFAULT_VALUE(field_input), LENGTH(field_number) | `seeed_rpcwifimanager_parameter_create("mqttServerParam", "server", "MQTT server", "iot.eclipse.org", 40)` | `WiFiManagerParameter mqttServerParam("server", "MQTT server", "iot.eclipse.org", 40);` |
| `seeed_rpcwifimanager_parameter_create_html` | Statement | VAR(field_input), HTML(field_input) | `seeed_rpcwifimanager_parameter_create_html("noticeParam", "<p>Device settings</p>")` | `WiFiManagerParameter noticeParam("<p>Device settings</p>");` |
| `seeed_rpcwifimanager_add_parameter` | Statement | MANAGER(field_variable), PARAM(field_variable) | `seeed_rpcwifimanager_add_parameter($wifiManager, $mqttServerParam)` | `wifiManager.addParameter(&mqttServerParam);` |
| `seeed_rpcwifimanager_parameter_value` | Value | PARAM(field_variable) | `seeed_rpcwifimanager_parameter_value($mqttServerParam)` | `String(mqttServerParam.getValue())` |
| `seeed_rpcwifimanager_parameter_id` | Value | PARAM(field_variable) | `seeed_rpcwifimanager_parameter_id($mqttServerParam)` | `String(mqttServerParam.getID())` |
| `seeed_rpcwifimanager_parameter_placeholder` | Value | PARAM(field_variable) | `seeed_rpcwifimanager_parameter_placeholder($mqttServerParam)` | `String(mqttServerParam.getPlaceholder())` |
| `seeed_rpcwifimanager_parameter_length` | Value | PARAM(field_variable) | `seeed_rpcwifimanager_parameter_length($mqttServerParam)` | `mqttServerParam.getValueLength()` |
| `seeed_rpcwifimanager_on_portal_start` | Hat | VAR(field_variable), HANDLER(input_statement) | `seeed_rpcwifimanager_on_portal_start($wifiManager)` | `void seeedRpcWiFiManagerPortal_wifiManager(WiFiManager *manager) { ↵ (void)manager; ↵ } ↵ wifiManager.setAPCallback(seeedRpcWiFiManagerPortal_wifiManager);` |
| `seeed_rpcwifimanager_on_save_success` | Hat | VAR(field_variable), HANDLER(input_statement) | `seeed_rpcwifimanager_on_save_success($wifiManager)` | `void seeedRpcWiFiManagerSave_wifiManager() { ↵ } ↵ wifiManager.setSaveConfigCallback(seeedRpcWiFiManagerSave_wifiManager);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ENABLE | TRUE, FALSE | seeed_rpcwifimanager_set_debug_output, seeed_rpcwifimanager_set_break_after_save |
| REMOVE | TRUE, FALSE | seeed_rpcwifimanager_set_remove_duplicate_aps |

## ABS Examples

### Basic Usage
```
arduino_setup()
    seeed_rpcwifimanager_create("wifiManager")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, seeed_rpcwifimanager_auto_connect($wifiManager, text("value"), text("value")))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `seeed_rpcwifimanager_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
