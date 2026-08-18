# ESP32 web server

ESP32 web server library, supporting HTTP server, routing processing, request response and identity authentication

## Library Info
- **Name**: @aily-project/lib-esp32-webserver
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_webserver_create` | Statement | VAR(field_input), PORT(field_number) | `esp32_webserver_create("server", 80)` | `WebServer server(80);` |
| `esp32_webserver_begin` | Statement | VAR(field_variable) | `esp32_webserver_begin($server)` | `server.begin();` |
| `esp32_webserver_stop` | Statement | VAR(field_variable) | `esp32_webserver_stop($server)` | `server.stop();` |
| `esp32_webserver_handle_client` | Statement | VAR(field_variable) | `esp32_webserver_handle_client($server)` | `server.handleClient();` |
| `esp32_webserver_on` | Statement | VAR(field_variable), METHOD(dropdown), PATH(input_value), HANDLER(input_statement) | `esp32_webserver_on($server, HTTP_ANY, text("value"))` | `void handle_server_value_http_any() { ↵ } ↵ server.on("value", handle_server_value_http_any);` |
| `esp32_webserver_on_not_found` | Statement | VAR(field_variable), HANDLER(input_statement) | `esp32_webserver_on_not_found($server)` | `void handle_server_notfound() { ↵ } ↵ server.onNotFound(handle_server_notfound);` |
| `esp32_webserver_send` | Statement | VAR(field_variable), CODE(input_value), TYPE(input_value), CONTENT(input_value) | `esp32_webserver_send($server, math_number(0), text("value"), text("value"))` | `server.send(1, "value", "value");` |
| `esp32_webserver_send_simple` | Statement | VAR(field_variable), CONTENT(input_value) | `esp32_webserver_send_simple($server, text("value"))` | `server.send(200, "text/plain", "value");` |
| `esp32_webserver_send_html` | Statement | VAR(field_variable), CONTENT(input_value) | `esp32_webserver_send_html($server, text("value"))` | `server.send(200, "text/html", "value");` |
| `esp32_webserver_send_json` | Statement | VAR(field_variable), CONTENT(input_value) | `esp32_webserver_send_json($server, text("value"))` | `server.send(200, "application/json", "value");` |
| `esp32_webserver_send_error` | Statement | VAR(field_variable), CODE(dropdown), MESSAGE(input_value) | `esp32_webserver_send_error($server, "400", text("value"))` | `server.send(400, "text/plain", "value");` |
| `esp32_webserver_send_header` | Statement | VAR(field_variable), NAME(input_value), VALUE(input_value) | `esp32_webserver_send_header($server, text("value"), text("value"))` | `server.sendHeader("value", "value");` |
| `esp32_webserver_uri` | Value | VAR(field_variable) | `esp32_webserver_uri($server)` | `server.uri()` |
| `esp32_webserver_method` | Value | VAR(field_variable) | `esp32_webserver_method($server)` | `httpMethodToString(server.method())` |
| `esp32_webserver_arg` | Value | VAR(field_variable), NAME(input_value) | `esp32_webserver_arg($server, text("value"))` | `server.arg("value")` |
| `esp32_webserver_has_arg` | Value | VAR(field_variable), NAME(input_value) | `esp32_webserver_has_arg($server, text("value"))` | `server.hasArg("value")` |
| `esp32_webserver_args_count` | Value | VAR(field_variable) | `esp32_webserver_args_count($server)` | `server.args()` |
| `esp32_webserver_arg_by_index` | Value | VAR(field_variable), INDEX(input_value) | `esp32_webserver_arg_by_index($server, math_number(0))` | `server.arg(1)` |
| `esp32_webserver_arg_name` | Value | VAR(field_variable), INDEX(input_value) | `esp32_webserver_arg_name($server, math_number(0))` | `server.argName(1)` |
| `esp32_webserver_header` | Value | VAR(field_variable), NAME(input_value) | `esp32_webserver_header($server, text("value"))` | `server.header("value")` |
| `esp32_webserver_has_header` | Value | VAR(field_variable), NAME(input_value) | `esp32_webserver_has_header($server, text("value"))` | `server.hasHeader("value")` |
| `esp32_webserver_collect_headers` | Statement | VAR(field_variable) | `esp32_webserver_collect_headers($server)` | `server.collectAllHeaders();` |
| `esp32_webserver_host_header` | Value | VAR(field_variable) | `esp32_webserver_host_header($server)` | `server.hostHeader()` |
| `esp32_webserver_path_arg` | Value | VAR(field_variable), INDEX(input_value) | `esp32_webserver_path_arg($server, math_number(0))` | `server.pathArg(1)` |
| `esp32_webserver_authenticate` | Value | VAR(field_variable), USERNAME(input_value), PASSWORD(input_value) | `esp32_webserver_authenticate($server, text("value"), text("value"))` | `server.authenticate("value", "value")` |
| `esp32_webserver_request_authentication` | Statement | VAR(field_variable), METHOD(dropdown) | `esp32_webserver_request_authentication($server, BASIC_AUTH)` | `server.requestAuthentication(BASIC_AUTH);` |
| `esp32_webserver_enable_cors` | Statement | VAR(field_variable), ENABLE(field_checkbox) | `esp32_webserver_enable_cors($server, TRUE)` | `server.enableCORS(true);` |
| `esp32_webserver_client_ip` | Value | VAR(field_variable) | `esp32_webserver_client_ip($server)` | `server.client().remoteIP().toString()` |
| `esp32_webserver_content_length` | Value | VAR(field_variable) | `esp32_webserver_content_length($server)` | `server.clientContentLength()` |
| `esp32_webserver_serve_static` | Statement | VAR(field_variable), URI(input_value), FS(dropdown), PATH(input_value) | `esp32_webserver_serve_static($server, text("value"), SPIFFS, text("value"))` | `server.serveStatic("value", SPIFFS, "value");` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| METHOD | HTTP_ANY, HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE, HTTP_PATCH, HTTP_OPTIONS | esp32_webserver_on |
| CODE | 400, 401, 403, 404, 500, 503 | esp32_webserver_send_error |
| METHOD | BASIC_AUTH, DIGEST_AUTH | esp32_webserver_request_authentication |
| FS | SPIFFS, LittleFS, SD | esp32_webserver_serve_static |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_webserver_create("server", 80)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_webserver_uri($server))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_webserver_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
