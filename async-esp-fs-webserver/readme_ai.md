# ESP32 async filesystem web server

ESP32-only Blockly wrapper for AsyncFsWebServer.

## Library Info
- **Name**: @aily-project/lib-async-esp-fs-webserver
- **Version**: 1.0.0
- **Target**: ESP32

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `async_fs_webserver_create` | S | VAR(field_input), FS(dropdown), PORT(field_number), HOST(input_value) | `async_fs_webserver_create("server", LittleFS, 80, text("value"))` | `#if !defined(ESP32) ↵ #error "AsyncFsWebServer Blockly blocks require ESP32." ↵ #endif ↵ AsyncFsWebServer server(LittleFS, 80, "value");` |
| `async_fs_webserver_mount_fs` | S | VAR(field_variable), FS(dropdown), FORMAT(field_checkbox) | `async_fs_webserver_mount_fs($server, LittleFS, TRUE)` | `if (!LittleFS.begin(true)) { ↵ ESP.restart(); ↵ }` |
| `async_fs_webserver_connect_or_ap` | S | VAR(field_variable), TIMEOUT(input_value), SSID(input_value), PASSWORD(input_value), REDIRECT(input_value) | `async_fs_webserver_connect_or_ap($server, math_number(1000), text("value"), text("value"), text("value"))` | `if (!server.startWiFi(1)) { ↵ server.startCaptivePortal("value", "value", "value"); ↵ }` |
| `async_fs_webserver_start_wifi` | S | VAR(field_variable), TIMEOUT(input_value) | `async_fs_webserver_start_wifi($server, math_number(1000))` | `server.startWiFi(1);` |
| `async_fs_webserver_captive_portal` | S | VAR(field_variable), SSID(input_value), PASSWORD(input_value), REDIRECT(input_value) | `async_fs_webserver_captive_portal($server, text("value"), text("value"), text("value"))` | `server.startCaptivePortal("value", "value", "value");` |
| `async_fs_webserver_start_server` | S | VAR(field_variable) | `async_fs_webserver_start_server($server)` | `server.init();` |
| `async_fs_webserver_start_ws_server` | S | VAR(field_variable), HANDLER(input_statement) | `async_fs_webserver_start_ws_server($server)` | `server.init(_asyncfs_ws_event_1);` |
| `async_fs_webserver_file_editor` | S | VAR(field_variable) | `async_fs_webserver_file_editor($server)` | `server.enableFsCodeEditor();` |
| `async_fs_webserver_set_auth` | S | VAR(field_variable), USER(input_value), PASSWORD(input_value) | `async_fs_webserver_set_auth($server, text("value"), text("value"))` | `server.setAuthentication("value", "value");` |
| `async_fs_webserver_require_auth` | S | VAR(field_variable), REQUIRE(field_checkbox) | `async_fs_webserver_require_auth($server, TRUE)` | `server.requireAuthentication(true);` |
| `async_fs_webserver_page_title` | S | VAR(field_variable), TITLE(input_value) | `async_fs_webserver_page_title($server, text("value"))` | `server.setSetupPageTitle("value");` |
| `async_fs_webserver_firmware_version` | S | VAR(field_variable), VERSION(input_value) | `async_fs_webserver_firmware_version($server, text("value"))` | `server.setFirmwareVersion("value");` |
| `async_fs_webserver_option_box` | S | VAR(field_variable), TITLE(input_value) | `async_fs_webserver_option_box($server, text("value"))` | `server.addOptionBox("value");` |
| `async_fs_webserver_option_text` | S | VAR(field_variable), LABEL(input_value), VALUE(input_value) | `async_fs_webserver_option_text($server, text("value"), text("value"))` | `server.addOption("value", "value");` |
| `async_fs_webserver_option_number` | S | VAR(field_variable), LABEL(input_value), VALUE(input_value), MIN(input_value), MAX(input_value), STEP(input_value) | `async_fs_webserver_option_number($server, text("value"), math_number(0), math_number(0), math_number(0), math_number(0))` | `server.addOption("value", 1, 1, 1, 1);` |
| `async_fs_webserver_option_bool` | S | VAR(field_variable), LABEL(input_value), VALUE(field_checkbox) | `async_fs_webserver_option_bool($server, text("value"), FALSE)` | `server.addOption("value", false);` |
| `async_fs_webserver_option_comment` | S | VAR(field_variable), LABEL(input_value), COMMENT(input_value) | `async_fs_webserver_option_comment($server, text("value"), text("value"))` | `server.addComment("value", "value");` |
| `async_fs_webserver_route` | S | VAR(field_variable), PATH(input_value), METHOD(dropdown), HANDLER(input_statement) | `async_fs_webserver_route($server, text("value"), HTTP_GET)` | `server.on("value", HTTP_GET, _asyncfs_route_1);` |
| `async_fs_webserver_response` | S | STATUS(input_value), CONTENT_TYPE(input_value), BODY(input_value) | `async_fs_webserver_response(math_number(0), text("value"), text("value"))` | `if (_asyncfs_request != nullptr) { ↵ _asyncfs_request->send(1, "value", "value"); ↵ }` |
| `async_fs_webserver_response_ok` | S | (none) | `async_fs_webserver_response_ok()` | `if (_asyncfs_request != nullptr) { ↵ _asyncfs_request->send(200, "text/plain", "OK"); ↵ }` |
| `async_fs_webserver_request_arg` | V | NAME(input_value), SOURCE(dropdown) | `async_fs_webserver_request_arg(text("value"), false)` | `asyncfs_get_request_param(_asyncfs_request, "value", false)` |
| `async_fs_webserver_request_has_arg` | V | NAME(input_value), SOURCE(dropdown) | `async_fs_webserver_request_has_arg(text("value"), false)` | `asyncfs_has_request_param(_asyncfs_request, "value", false)` |
| `async_fs_webserver_request_path` | V | (none) | `async_fs_webserver_request_path()` | `(_asyncfs_request != nullptr ? _asyncfs_request->url() : String(""))` |
| `async_fs_webserver_ws_broadcast` | S | VAR(field_variable), MESSAGE(input_value) | `async_fs_webserver_ws_broadcast($server, text("value"))` | `server.wsBroadcast(String("value").c_str());` |
| `async_fs_webserver_ws_reply` | S | MESSAGE(input_value) | `async_fs_webserver_ws_reply(text("value"))` | `if (_asyncfs_ws_client != nullptr) { ↵ _asyncfs_ws_client->text(String("value")); ↵ }` |
| `async_fs_webserver_ws_event_is` | V | EVENT(dropdown) | `async_fs_webserver_ws_event_is(WS_EVT_CONNECT)` | `(_asyncfs_ws_type == WS_EVT_CONNECT)` |
| `async_fs_webserver_ws_message` | V | (none) | `async_fs_webserver_ws_message()` | `_asyncfs_ws_message` |
| `async_fs_webserver_ws_client_id` | V | (none) | `async_fs_webserver_ws_client_id()` | `(_asyncfs_ws_client != nullptr ? _asyncfs_ws_client->id() : 0)` |
| `async_fs_webserver_server_ip` | V | VAR(field_variable) | `async_fs_webserver_server_ip($server)` | `server.getServerIP().toString()` |
| `async_fs_webserver_is_ap_mode` | V | VAR(field_variable) | `async_fs_webserver_is_ap_mode($server)` | `server.isAccessPointMode()` |
| `async_fs_webserver_start_mdns` | S | VAR(field_variable) | `async_fs_webserver_start_mdns($server)` | `if (WiFi.status() == WL_CONNECTED) { ↵ (void)server.startMDNSResponder(); ↵ }` |
| `async_fs_webserver_clear_saved_settings` | S | VAR(field_variable) | `async_fs_webserver_clear_saved_settings($server)` | `server.clearConfigFile();` |
| `async_fs_webserver_settings_file_name` | V | VAR(field_variable) | `async_fs_webserver_settings_file_name($server)` | `String(server.getConfiFileName())` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| FS | `LittleFS`, `SPIFFS`, `FFat` | Filesystem object. |
| METHOD | `HTTP_GET`, `HTTP_POST`, `HTTP_PUT`, `HTTP_DELETE`, `HTTP_ANY` | Route method. |
| SOURCE | `false`, `true` | Query or POST form data. |
| EVENT | `WS_EVT_CONNECT`, `WS_EVT_DISCONNECT`, `WS_EVT_DATA`, `WS_EVT_ERROR` | WebSocket event. |

Route request/response blocks must be nested in `async_fs_webserver_route`. WebSocket reply/message/event blocks must be nested in `async_fs_webserver_start_ws_server`.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    async_fs_webserver_create("server", LittleFS, 80, text("value"))
```
