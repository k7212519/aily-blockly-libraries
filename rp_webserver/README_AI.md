# Pico Web Server

Raspberry Pi Pico W WebServer library for creating a simple web server to handle HTTP requests

## Library Info
- **Name**: @aily-project/lib-rp-webserver
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `rp_webserver_create` | Statement | VAR(field_input), PORT(field_number) | `rp_webserver_create("server", 80)` | `WebServer server(80);` |
| `rp_webserver_begin` | Statement | VAR(field_variable) | `rp_webserver_begin($server)` | `server.begin();` |
| `rp_webserver_handle_client` | Statement | VAR(field_variable) | `rp_webserver_handle_client($server)` | `server.handleClient();` |
| `rp_webserver_on` | Hat | VAR(field_variable), METHOD(dropdown), PATH(input_value), HANDLER(input_statement) | `rp_webserver_on($server, HTTP_ANY, text("value"))` | `void handle_server_value_any() { ↵ } ↵ server.on("value", handle_server_value_any);` |
| `rp_webserver_on_not_found` | Hat | VAR(field_variable), HANDLER(input_statement) | `rp_webserver_on_not_found($server)` | `void handle_server_not_found() { ↵ } ↵ server.onNotFound(handle_server_not_found);` |
| `rp_webserver_send` | Statement | VAR(field_variable), CODE(input_value), CONTENT_TYPE(dropdown), CONTENT(input_value) | `rp_webserver_send($server, math_number(0), "text/plain", text("value"))` | `server.send(1, "text/plain", "value");` |
| `rp_webserver_send_custom_type` | Statement | VAR(field_variable), CODE(input_value), CONTENT_TYPE(input_value), CONTENT(input_value) | `rp_webserver_send_custom_type($server, math_number(0), text("value"), text("value"))` | `server.send(1, "value", "value");` |
| `rp_webserver_send_header` | Statement | VAR(field_variable), NAME(input_value), VALUE(input_value) | `rp_webserver_send_header($server, text("value"), text("value"))` | `server.sendHeader("value", "value");` |
| `rp_webserver_uri` | Value | VAR(field_variable) | `rp_webserver_uri($server)` | `server.uri()` |
| `rp_webserver_method` | Value | VAR(field_variable) | `rp_webserver_method($server)` | `httpMethodToString(server.method())` |
| `rp_webserver_method_is` | Value | VAR(field_variable), METHOD(dropdown) | `rp_webserver_method_is($server, HTTP_GET)` | `(server.method() == HTTP_GET)` |
| `rp_webserver_arg_by_name` | Value | VAR(field_variable), NAME(input_value) | `rp_webserver_arg_by_name($server, text("value"))` | `server.arg("value")` |
| `rp_webserver_arg_by_index` | Value | VAR(field_variable), INDEX(input_value) | `rp_webserver_arg_by_index($server, math_number(0))` | `server.arg(1)` |
| `rp_webserver_arg_name` | Value | VAR(field_variable), INDEX(input_value) | `rp_webserver_arg_name($server, math_number(0))` | `server.argName(1)` |
| `rp_webserver_args_count` | Value | VAR(field_variable) | `rp_webserver_args_count($server)` | `server.args()` |
| `rp_webserver_has_arg` | Value | VAR(field_variable), NAME(input_value) | `rp_webserver_has_arg($server, text("value"))` | `server.hasArg("value")` |
| `rp_webserver_header` | Value | VAR(field_variable), NAME(input_value) | `rp_webserver_header($server, text("value"))` | `server.header("value")` |
| `rp_webserver_has_header` | Value | VAR(field_variable), NAME(input_value) | `rp_webserver_has_header($server, text("value"))` | `server.hasHeader("value")` |
| `rp_webserver_host_header` | Value | VAR(field_variable) | `rp_webserver_host_header($server)` | `server.hostHeader()` |
| `rp_webserver_collect_headers` | Statement | VAR(field_variable), HEADERS(input_value) | `rp_webserver_collect_headers($server, text("value"))` | `server.collectHeaders("value");` |
| `rp_webserver_enable_cors` | Statement | VAR(field_variable) | `rp_webserver_enable_cors($server)` | `server.enableCORS(true);` |
| `rp_webserver_stop` | Statement | VAR(field_variable) | `rp_webserver_stop($server)` | `server.stop();` |
| `rp_webserver_authenticate` | Value | VAR(field_variable), USERNAME(input_value), PASSWORD(input_value) | `rp_webserver_authenticate($server, text("value"), text("value"))` | `server.authenticate("value", "value")` |
| `rp_webserver_request_authentication` | Statement | VAR(field_variable), REALM(input_value) | `rp_webserver_request_authentication($server, text("value"))` | `server.requestAuthentication(BASIC_AUTH, "value");` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| METHOD | HTTP_ANY, HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE, HTTP_PATCH | rp_webserver_on |
| CONTENT_TYPE | text/plain, text/html, application/json, application/xml | rp_webserver_send |
| METHOD | HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE, HTTP_PATCH | rp_webserver_method_is |

## ABS Examples

### Basic Usage
```
arduino_setup()
    rp_webserver_create("server", 80)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, rp_webserver_uri($server))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `rp_webserver_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
