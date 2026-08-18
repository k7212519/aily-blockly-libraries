# ESP32 HTTPClient

ESP32 HTTP client library, supporting HTTP/HTTPS request and response processing

## Library Info
- **Name**: @aily-project/lib-esp32-httpclient
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_httpclient_create` | Statement | VAR(field_input) | `esp32_httpclient_create("http")` | `HTTPClient http;` |
| `esp32_httpclient_begin_url` | Statement | VAR(field_variable), URL(input_value) | `esp32_httpclient_begin_url($http, text("value"))` | `http.begin("value");` |
| `esp32_httpclient_begin_host` | Statement | VAR(field_variable), HOST(input_value), PORT(input_value), URI(input_value) | `esp32_httpclient_begin_host($http, text("value"), math_number(0), text("value"))` | `http.begin("value", 1, "value");` |
| `esp32_httpclient_begin_secure` | Statement | VAR(field_variable), URL(input_value), CA_CERT(input_value) | `esp32_httpclient_begin_secure($http, text("value"), text("value"))` | `http.begin("value", "value");` |
| `esp32_httpclient_begin_secure_full` | Statement | VAR(field_variable), URL(input_value), CA_CERT(input_value), CLIENT_CERT(input_value), CLIENT_KEY(input_value) | `esp32_httpclient_begin_secure_full($http, text("value"), text("value"), text("value"), text("value"))` | `http.begin("value", "value", "value", "value");` |
| `esp32_httpclient_end` | Statement | VAR(field_variable) | `esp32_httpclient_end($http)` | `http.end();` |
| `esp32_httpclient_set_user_agent` | Statement | VAR(field_variable), USER_AGENT(input_value) | `esp32_httpclient_set_user_agent($http, text("value"))` | `http.setUserAgent("value");` |
| `esp32_httpclient_set_authorization` | Statement | VAR(field_variable), USER(input_value), PASSWORD(input_value) | `esp32_httpclient_set_authorization($http, text("value"), text("value"))` | `http.setAuthorization("value", "value");` |
| `esp32_httpclient_set_authorization_token` | Statement | VAR(field_variable), TOKEN(input_value) | `esp32_httpclient_set_authorization_token($http, text("value"))` | `http.setAuthorization("value");` |
| `esp32_httpclient_set_timeout` | Statement | VAR(field_variable), TIMEOUT(input_value) | `esp32_httpclient_set_timeout($http, math_number(1000))` | `http.setTimeout(1);` |
| `esp32_httpclient_set_connect_timeout` | Statement | VAR(field_variable), TIMEOUT(input_value) | `esp32_httpclient_set_connect_timeout($http, math_number(1000))` | `http.setConnectTimeout(1);` |
| `esp32_httpclient_set_reuse` | Statement | VAR(field_variable), REUSE(dropdown) | `esp32_httpclient_set_reuse($http, true)` | `http.setReuse(true);` |
| `esp32_httpclient_set_follow_redirects` | Statement | VAR(field_variable), FOLLOW(dropdown) | `esp32_httpclient_set_follow_redirects($http, HTTPC_DISABLE_FOLLOW_REDIRECTS)` | `http.setFollowRedirects(HTTPC_DISABLE_FOLLOW_REDIRECTS);` |
| `esp32_httpclient_set_redirect_limit` | Statement | VAR(field_variable), LIMIT(input_value) | `esp32_httpclient_set_redirect_limit($http, math_number(0))` | `http.setRedirectLimit(1);` |
| `esp32_httpclient_add_header` | Statement | VAR(field_variable), NAME(input_value), VALUE(input_value) | `esp32_httpclient_add_header($http, text("value"), text("value"))` | `http.addHeader("value", "value");` |
| `esp32_httpclient_get` | Statement | VAR(field_variable) | `esp32_httpclient_get($http)` | `int httpCode = http.GET();` |
| `esp32_httpclient_post` | Statement | VAR(field_variable), DATA(input_value) | `esp32_httpclient_post($http, text("value"))` | `int httpCode = http.POST("value");` |
| `esp32_httpclient_put` | Statement | VAR(field_variable), DATA(input_value) | `esp32_httpclient_put($http, text("value"))` | `int httpCode = http.PUT("value");` |
| `esp32_httpclient_patch` | Statement | VAR(field_variable), DATA(input_value) | `esp32_httpclient_patch($http, text("value"))` | `int httpCode = http.PATCH("value");` |
| `esp32_httpclient_get_response_code` | Value | (none) | `esp32_httpclient_get_response_code()` | `httpCode` |
| `esp32_httpclient_code_list` | Value | CODE(dropdown) | `esp32_httpclient_code_list(HTTP_CODE_CONTINUE)` | `HTTP_CODE_CONTINUE` |
| `esp32_httpclient_get_size` | Value | VAR(field_variable) | `esp32_httpclient_get_size($http)` | `http.getSize()` |
| `esp32_httpclient_get_string` | Value | VAR(field_variable) | `esp32_httpclient_get_string($http)` | `http.getString()` |
| `esp32_httpclient_get_header` | Value | VAR(field_variable), NAME(input_value) | `esp32_httpclient_get_header($http, text("value"))` | `http.header("value".c_str())` |
| `esp32_httpclient_get_location` | Value | VAR(field_variable) | `esp32_httpclient_get_location($http)` | `http.getLocation()` |
| `esp32_httpclient_get_stream` | Value | VAR(field_variable) | `esp32_httpclient_get_stream($http)` | `http.getStream()` |
| `esp32_httpclient_connected` | Value | VAR(field_variable) | `esp32_httpclient_connected($http)` | `http.connected()` |
| `esp32_httpclient_error_to_string` | Value | VAR(field_variable), ERROR_CODE(input_value) | `esp32_httpclient_error_to_string($http, math_number(0))` | `http.errorToString(1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| REUSE | true, false | esp32_httpclient_set_reuse |
| FOLLOW | HTTPC_DISABLE_FOLLOW_REDIRECTS, HTTPC_STRICT_FOLLOW_REDIRECTS, HTTPC_FORCE_FOLLOW_REDIRECTS | esp32_httpclient_set_follow_redirects |
| CODE | HTTP_CODE_CONTINUE, HTTP_CODE_SWITCHING_PROTOCOLS, HTTP_CODE_PROCESSING, HTTP_CODE_OK, HTTP_CODE_CREATED, HTTP_CODE_ACCEPTED, HTTP_CODE_NON_AUTHORITATIVE_INFORMATION, HTTP_CODE_NO_CONTENT, HTTP_CODE_RESET_CONTENT, HTT... | esp32_httpclient_code_list |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_httpclient_create("http")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_httpclient_get_response_code())
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_httpclient_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
