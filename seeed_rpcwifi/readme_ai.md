# Seeed RPC WiFi

Blockly wrapper for Seeed Wio Terminal RPC WiFi, including WiFi connection, scan, AP mode, TCP/UDP, HTTP, WebServer, and DNS.

## Library Info
- **Name**: @aily-project/lib-seeed-rpcwifi
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_rpcwifi_set_mode` | Statement | MODE(dropdown) | `seeed_rpcwifi_set_mode(WIFI_STA)` | `WiFi.mode(WIFI_STA);` |
| `seeed_rpcwifi_begin` | Statement | SSID(input_value), PASSWORD(input_value) | `seeed_rpcwifi_begin(text("value"), text("value"))` | `WiFi.begin(String("value").c_str(), String("value").c_str());` |
| `seeed_rpcwifi_connect_wait` | Statement | SSID(input_value), PASSWORD(input_value), TIMEOUT(input_value) | `seeed_rpcwifi_connect_wait(text("value"), text("value"), math_number(1000))` | `seeedRpcWiFiConnectWait(String("value"), String("value"), 1);` |
| `seeed_rpcwifi_disconnect` | Statement | WIFI_OFF(dropdown), ERASE_AP(dropdown) | `seeed_rpcwifi_disconnect(FALSE, FALSE)` | `WiFi.disconnect(false, false);` |
| `seeed_rpcwifi_reconnect` | Value | (none) | `seeed_rpcwifi_reconnect()` | `WiFi.reconnect()` |
| `seeed_rpcwifi_status` | Value | (none) | `seeed_rpcwifi_status()` | `WiFi.status()` |
| `seeed_rpcwifi_status_type` | Value | STATUS(dropdown) | `seeed_rpcwifi_status_type(WL_IDLE_STATUS)` | `WL_IDLE_STATUS` |
| `seeed_rpcwifi_is_connected` | Value | (none) | `seeed_rpcwifi_is_connected()` | `WiFi.isConnected()` |
| `seeed_rpcwifi_wait_for_connect_result` | Value | (none) | `seeed_rpcwifi_wait_for_connect_result()` | `WiFi.waitForConnectResult()` |
| `seeed_rpcwifi_local_ip` | Value | (none) | `seeed_rpcwifi_local_ip()` | `WiFi.localIP().toString()` |
| `seeed_rpcwifi_mac_address` | Value | (none) | `seeed_rpcwifi_mac_address()` | `WiFi.macAddress()` |
| `seeed_rpcwifi_current_ssid` | Value | (none) | `seeed_rpcwifi_current_ssid()` | `WiFi.SSID()` |
| `seeed_rpcwifi_rssi` | Value | (none) | `seeed_rpcwifi_rssi()` | `WiFi.RSSI()` |
| `seeed_rpcwifi_set_auto_reconnect` | Statement | ENABLE(dropdown) | `seeed_rpcwifi_set_auto_reconnect(TRUE)` | `WiFi.setAutoReconnect(true);` |
| `seeed_rpcwifi_mode_value` | Value | MODE(dropdown) | `seeed_rpcwifi_mode_value(WIFI_MODE_STA)` | `WIFI_MODE_STA` |
| `seeed_rpcwifi_firmware_version` | Value | (none) | `seeed_rpcwifi_firmware_version()` | `seeedRpcWiFiFirmwareVersion()` |
| `seeed_rpcwifi_scan_networks` | Value | ASYNC(dropdown), SHOW_HIDDEN(dropdown) | `seeed_rpcwifi_scan_networks(FALSE, FALSE)` | `WiFi.scanNetworks(false, false)` |
| `seeed_rpcwifi_scan_complete` | Value | (none) | `seeed_rpcwifi_scan_complete()` | `WiFi.scanComplete()` |
| `seeed_rpcwifi_scan_delete` | Statement | (none) | `seeed_rpcwifi_scan_delete()` | `WiFi.scanDelete();` |
| `seeed_rpcwifi_scanned_ssid` | Value | INDEX(input_value) | `seeed_rpcwifi_scanned_ssid(math_number(0))` | `WiFi.SSID(1)` |
| `seeed_rpcwifi_scanned_rssi` | Value | INDEX(input_value) | `seeed_rpcwifi_scanned_rssi(math_number(0))` | `WiFi.RSSI(1)` |
| `seeed_rpcwifi_scanned_encryption` | Value | INDEX(input_value) | `seeed_rpcwifi_scanned_encryption(math_number(0))` | `WiFi.encryptionType(1)` |
| `seeed_rpcwifi_scanned_channel` | Value | INDEX(input_value) | `seeed_rpcwifi_scanned_channel(math_number(0))` | `WiFi.channel(1)` |
| `seeed_rpcwifi_encryption_type` | Value | TYPE(dropdown) | `seeed_rpcwifi_encryption_type(WIFI_AUTH_OPEN)` | `WIFI_AUTH_OPEN` |
| `seeed_rpcwifi_multi_create` | Statement | VAR(field_input) | `seeed_rpcwifi_multi_create("wifiMulti")` | `WiFiMulti wifiMulti;` |
| `seeed_rpcwifi_multi_add_ap` | Statement | VAR(field_variable), SSID(input_value), PASSWORD(input_value) | `seeed_rpcwifi_multi_add_ap($wifiMulti, text("value"), text("value"))` | `wifiMulti.addAP(String("value").c_str(), String("value").c_str());` |
| `seeed_rpcwifi_multi_run` | Value | VAR(field_variable), TIMEOUT(input_value) | `seeed_rpcwifi_multi_run($wifiMulti, math_number(1000))` | `wifiMulti.run(1)` |
| `seeed_rpcwifi_softap` | Statement | SSID(input_value), PASSWORD(input_value), CHANNEL(input_value), HIDDEN(dropdown), MAX_CONN(input_value) | `seeed_rpcwifi_softap(text("value"), text("value"), math_number(0), FALSE, math_number(0))` | `WiFi.softAP(String("value").c_str(), String("value").c_str(), 1, 0, 1);` |
| `seeed_rpcwifi_softap_config` | Statement | IP(field_input), GATEWAY(field_input), SUBNET(field_input) | `seeed_rpcwifi_softap_config("192.168.1.1", "192.168.1.1", "255.255.255.0")` | `WiFi.softAPConfig(IPAddress(192, 168, 1, 1), IPAddress(192, 168, 1, 1), IPAddress(255, 255, 255, 0));` |
| `seeed_rpcwifi_softap_disconnect` | Statement | WIFI_OFF(dropdown) | `seeed_rpcwifi_softap_disconnect(FALSE)` | `WiFi.softAPdisconnect(false);` |
| `seeed_rpcwifi_softap_station_count` | Value | (none) | `seeed_rpcwifi_softap_station_count()` | `WiFi.softAPgetStationNum()` |
| `seeed_rpcwifi_softap_ip` | Value | (none) | `seeed_rpcwifi_softap_ip()` | `WiFi.softAPIP().toString()` |
| `seeed_rpcwifi_client_create` | Statement | VAR(field_input), SECURE(dropdown) | `seeed_rpcwifi_client_create("client", NORMAL)` | `WiFiClient client;` |
| `seeed_rpcwifi_client_connect` | Value | VAR(field_variable), HOST(input_value), PORT(input_value) | `seeed_rpcwifi_client_connect($client, text("value"), math_number(0))` | `client.connect(String("value").c_str(), 1)` |
| `seeed_rpcwifi_secure_set_ca` | Statement | VAR(field_variable), CA_CERT(input_value) | `seeed_rpcwifi_secure_set_ca($secureClient, text("value"))` | `secureClient.setCACert(String("value").c_str());` |
| `seeed_rpcwifi_client_print` | Statement | VAR(field_variable), DATA(input_value), NEWLINE(dropdown) | `seeed_rpcwifi_client_print($client, math_number(0), TRUE)` | `client.println(1);` |
| `seeed_rpcwifi_client_available` | Value | VAR(field_variable) | `seeed_rpcwifi_client_available($client)` | `client.available()` |
| `seeed_rpcwifi_client_read_string` | Value | VAR(field_variable) | `seeed_rpcwifi_client_read_string($client)` | `client.readString()` |
| `seeed_rpcwifi_client_connected` | Value | VAR(field_variable) | `seeed_rpcwifi_client_connected($client)` | `client.connected()` |
| `seeed_rpcwifi_client_stop` | Statement | VAR(field_variable) | `seeed_rpcwifi_client_stop($client)` | `client.stop();` |
| `seeed_rpcwifi_udp_create` | Statement | VAR(field_input) | `seeed_rpcwifi_udp_create("udp")` | `WiFiUDP udp;` |
| `seeed_rpcwifi_udp_begin` | Statement | VAR(field_variable), PORT(input_value) | `seeed_rpcwifi_udp_begin($udp, math_number(0))` | `udp.begin(1);` |
| `seeed_rpcwifi_udp_send` | Statement | VAR(field_variable), HOST(input_value), PORT(input_value), DATA(input_value) | `seeed_rpcwifi_udp_send($udp, text("value"), math_number(0), math_number(0))` | `seeedRpcWiFiUdpSend(udp, String("value"), 1, String(1));` |
| `seeed_rpcwifi_udp_parse_packet` | Value | VAR(field_variable) | `seeed_rpcwifi_udp_parse_packet($udp)` | `udp.parsePacket()` |
| `seeed_rpcwifi_udp_read_string` | Value | VAR(field_variable) | `seeed_rpcwifi_udp_read_string($udp)` | `seeedRpcWiFiUdpReadString(udp)` |
| `seeed_rpcwifi_http_create` | Statement | VAR(field_input) | `seeed_rpcwifi_http_create("http")` | `HTTPClient http;` |
| `seeed_rpcwifi_http_begin` | Statement | VAR(field_variable), URL(input_value) | `seeed_rpcwifi_http_begin($http, text("value"))` | `http.begin(String("value"));` |
| `seeed_rpcwifi_http_begin_https` | Statement | VAR(field_variable), URL(input_value), CA_CERT(input_value) | `seeed_rpcwifi_http_begin_https($http, text("value"), text("value"))` | `http.begin(String("value"), String("value").c_str());` |
| `seeed_rpcwifi_http_add_header` | Statement | VAR(field_variable), NAME(input_value), VALUE(input_value) | `seeed_rpcwifi_http_add_header($http, text("value"), text("value"))` | `http.addHeader(String("value"), String("value"));` |
| `seeed_rpcwifi_http_request` | Value | VAR(field_variable), METHOD(dropdown), DATA(input_value) | `seeed_rpcwifi_http_request($http, GET, math_number(0))` | `http.GET()` |
| `seeed_rpcwifi_http_get_string` | Value | VAR(field_variable) | `seeed_rpcwifi_http_get_string($http)` | `String(http.getString())` |
| `seeed_rpcwifi_http_end` | Statement | VAR(field_variable) | `seeed_rpcwifi_http_end($http)` | `http.end();` |
| `seeed_rpcwifi_webserver_create` | Statement | VAR(field_input), PORT(field_number) | `seeed_rpcwifi_webserver_create("server", 80)` | `WebServer server(80);` |
| `seeed_rpcwifi_webserver_begin` | Statement | VAR(field_variable) | `seeed_rpcwifi_webserver_begin($server)` | `server.begin();` |
| `seeed_rpcwifi_webserver_on` | Statement | VAR(field_variable), PATH(input_value), METHOD(dropdown), HANDLER(input_statement) | `seeed_rpcwifi_webserver_on($server, text("value"), HTTP_GET)` | `void seeedRpcWiFiHandle_server_value_http_get() { ↵ } ↵ server.on("value", HTTP_GET, seeedRpcWiFiHandle_server_value_http_get);` |
| `seeed_rpcwifi_webserver_send` | Statement | VAR(field_variable), CODE(input_value), TYPE(input_value), CONTENT(input_value) | `seeed_rpcwifi_webserver_send($server, math_number(0), text("value"), text("value"))` | `server.send(1, String("value"), String("value"));` |
| `seeed_rpcwifi_webserver_handle_client` | Statement | VAR(field_variable) | `seeed_rpcwifi_webserver_handle_client($server)` | `server.handleClient();` |
| `seeed_rpcwifi_dns_create` | Statement | VAR(field_input) | `seeed_rpcwifi_dns_create("dns")` | `DNSServer dns;` |
| `seeed_rpcwifi_dns_start` | Statement | VAR(field_variable), PORT(input_value), DOMAIN(input_value), IP(input_value) | `seeed_rpcwifi_dns_start($dns, math_number(0), text("value"), text("value"))` | `dns.start(1, String("value"), seeedRpcWiFiParseIP(String("value")));` |
| `seeed_rpcwifi_dns_start_captive` | Statement | VAR(field_variable) | `seeed_rpcwifi_dns_start_captive($dns)` | `dns.start(53, "*", WiFi.softAPIP());` |
| `seeed_rpcwifi_dns_process` | Statement | VAR(field_variable) | `seeed_rpcwifi_dns_process($dns)` | `dns.processNextRequest();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | WIFI_STA, WIFI_AP, WIFI_AP_STA, WIFI_OFF | seeed_rpcwifi_set_mode |
| WIFI_OFF | FALSE, TRUE | seeed_rpcwifi_disconnect, seeed_rpcwifi_softap_disconnect |
| ERASE_AP | FALSE, TRUE | seeed_rpcwifi_disconnect |
| STATUS | WL_IDLE_STATUS, WL_NO_SSID_AVAIL, WL_SCAN_COMPLETED, WL_CONNECTED, WL_CONNECT_FAILED, WL_CONNECTION_LOST, WL_DISCONNECTED, WL_NO_SHIELD | seeed_rpcwifi_status_type |
| ENABLE | TRUE, FALSE | seeed_rpcwifi_set_auto_reconnect |
| MODE | WIFI_MODE_STA, WIFI_MODE_AP, WIFI_MODE_APSTA, WIFI_MODE_NULL | seeed_rpcwifi_mode_value |
| ASYNC | FALSE, TRUE | seeed_rpcwifi_scan_networks |
| SHOW_HIDDEN | FALSE, TRUE | seeed_rpcwifi_scan_networks |
| TYPE | WIFI_AUTH_OPEN, WIFI_AUTH_WEP, WIFI_AUTH_WPA_PSK, WIFI_AUTH_WPA2_PSK, WIFI_AUTH_WPA_WPA2_PSK, WIFI_AUTH_WPA2_ENTERPRISE | seeed_rpcwifi_encryption_type |
| HIDDEN | FALSE, TRUE | seeed_rpcwifi_softap |
| SECURE | NORMAL, SECURE | seeed_rpcwifi_client_create |
| NEWLINE | TRUE, FALSE | seeed_rpcwifi_client_print |
| METHOD | GET, POST, PUT, PATCH | seeed_rpcwifi_http_request |
| METHOD | HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE, HTTP_ANY | seeed_rpcwifi_webserver_on |

## ABS Examples

### Basic Usage
```
arduino_setup()
    seeed_rpcwifi_begin(text("value"), text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, seeed_rpcwifi_reconnect())
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `seeed_rpcwifi_multi_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
