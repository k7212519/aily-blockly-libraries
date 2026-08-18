# DeepSeek AI 积木库说明

这是 Aily 的 DeepSeek 官方 API Blockly 库。

## Library Info
- **Name**: @aily-project/lib-deepseek-ai
- **Version**: 0.0.1

## 必要配置

先使用：

- `deepseek_ai_config`

该积木会生成 ESP32 HTTPS 请求所需的 `WiFi.h`、`HTTPClient.h`、`WiFiClientSecure.h` 引用，以及 API Key、Base URL、状态、历史、流式回调等全局变量。

默认 Base URL：

```text
https://api.deepseek.com
```

## 主要积木

- `deepseek_ai_chat`：非流式单轮对话，返回 `String`
- `deepseek_ai_thinking_chat`：非流式思考模式，返回最终回答，思考内容通过 `deepseek_ai_get_reasoning` 获取
- `deepseek_ai_history_chat`：非流式多轮对话，自动追加 user/assistant 历史
- `deepseek_ai_json_chat`：非流式 JSON 输出模式，提示词必须说明输出 JSON
- `deepseek_ai_stream_chat`：流式对话，触发流式回调
- `deepseek_ai_set_stream_callback`：设置流式片段到达时执行的代码
- `deepseek_ai_get_stream_chunk`：读取当前流式片段
- `deepseek_ai_get_response_status`：读取上次请求成功状态
- `deepseek_ai_get_error_message`：读取上次错误
- `deepseek_ai_clear_history`：清空多轮历史

## 生成逻辑

非流式请求使用：

```cpp
deepseek_ai_request(model, message, enableThinking, reasoningEffort, useHistory, jsonMode)
```

流式请求使用：

```cpp
deepseek_ai_stream_request(model, message, enableThinking, reasoningEffort, useHistory, jsonMode)
```

两者分开，避免流式和非流式行为互相影响。

## 注意

- ESP32 上默认跳过 TLS 证书校验，使用 `WiFiClientSecure::setInsecure()`，便于 Aily 积木直接运行。
- 为避免 ESP32 内存压力，默认设置 `max_tokens`：普通请求 2048，思考模式 4096。
- v4 模型在普通对话中会显式关闭 thinking；思考对话中会启用 thinking。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------|------------|----------------|
| `deepseek_ai_config` | Statement | API_KEY(input_value), BASE_URL(input_value) | `deepseek_ai_config(text("value"), text("value"))` | `String deepseek_ai_api_key = "value"; ↵ String deepseek_ai_base_url = "value"; ↵ String deepseek_ai_system_prompt = ""; ↵ String deepseek_ai_history = ""; ↵ bool deepseek_ai_last_success = false; ↵ String deepseek_ai_last_error = ""; ↵ String deepseek_ai_last_reasoning = ""; ↵ String deepseek_ai_stream_chunk = ""; ↵ void (*deepseek_ai_stream_callback)(void) = NULL; ↵ String deepseek_ai_escape_json(String input) { ↵ input.replace("\\", "\\\\"); ↵ input.replace("\"", "\\\""); ↵ input.replace("\n", "\\n"); ↵ input.replace("\r", "\\r"); ↵ input.replace("\t", "\\t"); ↵ return input; ↵ } ↵ int deepseek_ai_hex_value(char ch) { ↵ if (ch >= '0' && ch <= '9') return ch - '0'; ↵ if (ch >= 'a' && ch <= 'f') return ch - 'a' + 10; ↵ if (ch >= 'A' && ch <= 'F') return ch - 'A' + 10; ↵ return -1; ↵ } ↵ int deepseek_ai_read_hex4(String input, int pos) { ↵ if (pos < 0 &#124;&#124; pos + 3 >= (int)input.length()) return -1; ↵ int value = 0; ↵ for (int i = 0; i < 4; i++) { ↵ int nibble = deepseek_ai_hex_value(input.charAt(pos + i)); ↵ if (nibble < 0) return -1; ↵ value = (value << 4) &#124; nibble; ↵ } ↵ return value; ↵ } ↵ void deepseek_ai_append_utf8(String &out, unsigned long codepoint) { ↵ if (codepoint <= 0x7F) { ↵ out += (char)codepoint; ↵ } else if (codepoint <= 0x7FF) { ↵ out += (char)(0xC0 &#124; (codepoint >> 6)); ↵ out += (char)(0x80 &#124; (codepoint & 0x3F)); ↵ } else if (codepoint <= 0xFFFF) { ↵ out += (char)(0xE0 &#124; (codepoint >> 12)); ↵ out += (char)(0x80 &#124; ((codepoint >> 6) & 0x3F)); ↵ out += (char)(0x80 &#124; (codepoint & 0x3F)); ↵ } else { ↵ out += (char)(0xF0 &#124; (codepoint >> 18)); ↵ out += (char)(0x80 &#124; ((codepoint >> 12) & 0x3F)); ↵ out += (char)(0x80 &#124; ((codepoint >> 6) & 0x3F)); ↵ out += (char)(0x80 &#124; (codepoint & 0x3F)); ↵ } ↵ } ↵ String deepseek_ai_unescape_json_string(String input) { ↵ String out = ""; ↵ out.reserve(input.length()); ↵ bool escaped = false; ↵ for (int i = 0; i < (int)input.length(); i++) { ↵ char ch = input.charAt(i); ↵ if (escaped) { ↵ if (ch == 'n') { ↵ out += '\n'; ↵ } else if (ch == 'r') { ↵ out += '\r'; ↵ } else if (ch == 't') { ↵ out += '\t'; ↵ } else if (ch == 'b') { ↵ out += '\b'; ↵ } else if (ch == 'f') { ↵ out += '\f'; ↵ } else if (ch == '"' &#124;&#124; ch == '\\' &#124;&#124; ch == '/') { ↵ out += ch; ↵ } else if (ch == 'u') { ↵ int high = deepseek_ai_read_hex4(input, i + 1); ↵ if (high >= 0) { ↵ unsigned long codepoint = (unsigned long)high; ↵ if (high >= 0xD800 && high <= 0xDBFF && i + 10 < (int)input.length() && input.charAt(i + 5) == '\\' && input.charAt(i + 6) == 'u') { ↵ int low = deepseek_ai_read_hex4(input, i + 7); ↵ if (low >= 0xDC00 && low <= 0xDFFF) { ↵ codepoint = 0x10000UL + (((unsigned long)high - 0xD800UL) << 10) + ((unsigned long)low - 0xDC00UL); ↵ i += 10; ↵ } else { ↵ i += 4; ↵ } ↵ } else { ↵ i += 4; ↵ } ↵ deepseek_ai_append_utf8(out, codepoint); ↵ } else { ↵ out += "\\u"; ↵ } ↵ } else { ↵ out += ch; ↵ } ↵ escaped = false; ↵ } else if (ch == '\\') { ↵ escaped = true; ↵ } else { ↵ out += ch; ↵ } ↵ } ↵ if (escaped) out += '\\'; ↵ return out; ↵ } ↵ String deepseek_ai_extract_json_string(String json, String key, int fromIndex) { ↵ String pattern = "\"" + key + "\":\""; ↵ int start = json.indexOf(pattern, fromIndex); ↵ if (start < 0) return ""; ↵ start += pattern.length(); ↵ String raw = ""; ↵ raw.reserve(64); ↵ bool escaped = false; ↵ for (int i = start; i < (int)json.length(); i++) { ↵ char ch = json.charAt(i); ↵ if (escaped) { ↵ raw += '\\'; ↵ raw += ch; ↵ escaped = false; ↵ } else if (ch == '\\') { ↵ escaped = true; ↵ } else if (ch == '"') { ↵ return deepseek_ai_unescape_json_string(raw); ↵ } else { ↵ raw += ch; ↵ } ↵ } ↵ return ""; ↵ } ↵ String deepseek_ai_endpoint() { ↵ String base = deepseek_ai_base_url; ↵ base.trim(); ↵ while (base.endsWith("/")) { ↵ base.remove(base.length() - 1); ↵ } ↵ return base + "/chat/completions"; ↵ } ↵ void deepseek_ai_append_message_json(String &messages, String role, String content, bool &hasAny) { ↵ if (hasAny) messages += ","; ↵ messages += "{\"role\":\"" + role + "\",\"content\":\"" + deepseek_ai_escape_json(content) + "\"}"; ↵ hasAny = true; ↵ } ↵ void deepseek_ai_append_history_pair(String userMessage, String assistantMessage) { ↵ if (deepseek_ai_history.length() > 0) { ↵ deepseek_ai_history += ","; ↵ } ↵ deepseek_ai_history += "{\"role\":\"user\",\"content\":\"" + deepseek_ai_escape_json(userMessage) + "\"}"; ↵ deepseek_ai_history += ",{\"role\":\"assistant\",\"content\":\"" + deepseek_ai_escape_json(assistantMessage) + "\"}"; ↵ if (deepseek_ai_history.length() > 7000) { ↵ int cut = deepseek_ai_history.indexOf("},{", deepseek_ai_history.length() - 6000); ↵ if (cut > 0) { ↵ deepseek_ai_history = deepseek_ai_history.substring(cut + 2); ↵ } ↵ } ↵ } ↵ String deepseek_ai_build_body(String model, String message, bool enableThinking, String reasoningEffort, bool useHistory, bool jsonMode, bool streamMode) { ↵ String messages = ""; ↵ messages.reserve(deepseek_ai_system_prompt.length() + deepseek_ai_history.length() + message.length() + 256); ↵ bool hasAny = false; ↵ if (deepseek_ai_system_prompt.length() > 0) { ↵ deepseek_ai_append_message_json(messages, "system", deepseek_ai_system_prompt, hasAny); ↵ } ↵ if (useHistory && deepseek_ai_history.length() > 0) { ↵ if (hasAny) messages += ","; ↵ messages += deepseek_ai_history; ↵ hasAny = true; ↵ } ↵ deepseek_ai_append_message_json(messages, "user", message, hasAny); ↵ String requestBody = "{\"model\":\"" + model + "\",\"messages\":[" + messages + "]"; ↵ requestBody.reserve(requestBody.length() + 256); ↵ requestBody += ",\"stream\":"; ↵ requestBody += streamMode ? "true" : "false"; ↵ requestBody += ",\"max_tokens\":"; ↵ requestBody += String(enableThinking ? 4096 : 2048); ↵ if (model.startsWith("deepseek-v4")) { ↵ requestBody += ",\"thinking\":{\"type\":\""; ↵ requestBody += enableThinking ? "enabled" : "disabled"; ↵ requestBody += "\"}"; ↵ if (enableThinking && reasoningEffort.length() > 0) { ↵ requestBody += ",\"reasoning_effort\":\"" + deepseek_ai_escape_json(reasoningEffort) + "\""; ↵ } ↵ } ↵ if (jsonMode) { ↵ requestBody += ",\"response_format\":{\"type\":\"json_object\"}"; ↵ } ↵ requestBody += "}"; ↵ return requestBody; ↵ } ↵ bool deepseek_ai_prepare_http(HTTPClient &http, WiFiClientSecure &client) { ↵ if (WiFi.status() != WL_CONNECTED) { ↵ deepseek_ai_last_success = false; ↵ deepseek_ai_last_error = "WiFi not connected"; ↵ return false; ↵ } ↵ client.setInsecure(); ↵ if (!http.begin(client, deepseek_ai_endpoint())) { ↵ deepseek_ai_last_success = false; ↵ deepseek_ai_last_error = "HTTP begin failed"; ↵ return false; ↵ } ↵ http.setReuse(false); ↵ http.setTimeout(120000); ↵ http.addHeader("Content-Type", "application/json"); ↵ http.addHeader("Authorization", "Bearer " + deepseek_ai_api_key); ↵ return true; ↵ } ↵ String deepseek_ai_request(String model, String message, bool enableThinking, String reasoningEffort, bool useHistory, bool jsonMode) { ↵ deepseek_ai_last_success = false; ↵ deepseek_ai_last_error = ""; ↵ deepseek_ai_last_reasoning = ""; ↵ deepseek_ai_stream_chunk = ""; ↵ HTTPClient http; ↵ WiFiClientSecure client; ↵ if (!deepseek_ai_prepare_http(http, client)) { ↵ return ""; ↵ } ↵ String requestBody = deepseek_ai_build_body(model, message, enableThinking, reasoningEffort, useHistory, jsonMode, false); ↵ Serial.println("[DeepSeek] request start"); ↵ int httpCode = http.POST(requestBody); ↵ Serial.println("[DeepSeek] HTTP: " + String(httpCode)); ↵ String response = ""; ↵ if (httpCode == 200) { ↵ String body = http.getString(); ↵ deepseek_ai_last_reasoning = deepseek_ai_extract_json_string(body, "reasoning_content", 0); ↵ response = deepseek_ai_extract_json_string(body, "content", 0); ↵ if (response.length() > 0 &#124;&#124; deepseek_ai_last_reasoning.length() > 0) { ↵ deepseek_ai_last_success = true; ↵ if (useHistory && response.length() > 0) { ↵ deepseek_ai_append_history_pair(message, response); ↵ } ↵ } else { ↵ deepseek_ai_last_error = "No content in response"; ↵ } ↵ } else { ↵ String body = http.getString(); ↵ if (body.length() > 160) body = body.substring(0, 160); ↵ deepseek_ai_last_error = "HTTP " + String(httpCode) + ": " + body; ↵ } ↵ http.end(); ↵ return response; ↵ } ↵ String deepseek_ai_stream_request(String model, String message, bool enableThinking, String reasoningEffort, bool useHistory, bool jsonMode) { ↵ deepseek_ai_last_success = false; ↵ deepseek_ai_last_error = ""; ↵ deepseek_ai_last_reasoning = ""; ↵ deepseek_ai_stream_chunk = ""; ↵ HTTPClient http; ↵ WiFiClientSecure client; ↵ if (!deepseek_ai_prepare_http(http, client)) { ↵ return ""; ↵ } ↵ String requestBody = deepseek_ai_build_body(model, message, enableThinking, reasoningEffort, useHistory, jsonMode, true); ↵ Serial.println("[DeepSeek] stream request start"); ↵ int httpCode = http.POST(requestBody); ↵ Serial.println("[DeepSeek] HTTP: " + String(httpCode)); ↵ String fullContent = ""; ↵ if (httpCode == 200) { ↵ WiFiClient *stream = http.getStreamPtr(); ↵ String line = ""; ↵ line.reserve(256); ↵ bool done = false; ↵ unsigned long lastByteAt = millis(); ↵ while (http.connected() &#124;&#124; stream->available()) { ↵ if (stream->available()) { ↵ char ch = stream->read(); ↵ lastByteAt = millis(); ↵ if (ch == '\n') { ↵ line.trim(); ↵ if (line.startsWith("data:")) { ↵ String data = line.substring(5); ↵ data.trim(); ↵ if (data == "[DONE]") { ↵ done = true; ↵ break; ↵ } ↵ String reasoning = deepseek_ai_extract_json_string(data, "reasoning_content", 0); ↵ if (reasoning.length() > 0) { ↵ deepseek_ai_last_reasoning += reasoning; ↵ } ↵ String content = deepseek_ai_extract_json_string(data, "content", 0); ↵ if (content.length() > 0) { ↵ fullContent += content; ↵ deepseek_ai_stream_chunk = content; ↵ if (deepseek_ai_stream_callback != NULL) { ↵ deepseek_ai_stream_callback(); ↵ } ↵ } ↵ } ↵ line = ""; ↵ } else if (ch != '\r') { ↵ line += ch; ↵ if (line.length() > 2048) { ↵ line = ""; ↵ } ↵ } ↵ } else { ↵ if (millis() - lastByteAt > 60000) { ↵ deepseek_ai_last_error = "Stream timeout"; ↵ break; ↵ } ↵ delay(1); ↵ } ↵ } ↵ if (fullContent.length() > 0 &#124;&#124; deepseek_ai_last_reasoning.length() > 0) { ↵ deepseek_ai_last_success = true; ↵ if (!done && deepseek_ai_last_error.length() == 0) { ↵ deepseek_ai_last_error = "Stream ended before DONE"; ↵ } ↵ if (useHistory && fullContent.length() > 0) { ↵ deepseek_ai_append_history_pair(message, fullContent); ↵ } ↵ } else if (deepseek_ai_last_error.length() == 0) { ↵ deepseek_ai_last_error = "No stream content"; ↵ } ↵ } else { ↵ String body = http.getString(); ↵ if (body.length() > 160) body = body.substring(0, 160); ↵ deepseek_ai_last_error = "HTTP " + String(httpCode) + ": " + body; ↵ } ↵ http.end(); ↵ return fullContent; ↵ }` |
| `deepseek_ai_set_system_prompt` | Statement | SYSTEM_PROMPT(input_value) | `deepseek_ai_set_system_prompt(text("value"))` | `deepseek_ai_system_prompt = "value";` |
| `deepseek_ai_chat` | Value | MESSAGE(input_value), MODEL(dropdown) | `deepseek_ai_chat(text("value"), deepseek-v4-flash)` | `deepseek_ai_request("deepseek-v4-flash", "value", false, "", false, false)` |
| `deepseek_ai_thinking_chat` | Value | MESSAGE(input_value), MODEL(dropdown), EFFORT(dropdown) | `deepseek_ai_thinking_chat(text("value"), deepseek-v4-pro, high)` | `deepseek_ai_request("deepseek-v4-pro", "value", true, "high", false, false)` |
| `deepseek_ai_history_chat` | Value | MESSAGE(input_value), MODEL(dropdown) | `deepseek_ai_history_chat(text("value"), deepseek-v4-flash)` | `deepseek_ai_request("deepseek-v4-flash", "value", false, "", true, false)` |
| `deepseek_ai_json_chat` | Value | MESSAGE(input_value), MODEL(dropdown) | `deepseek_ai_json_chat(text("value"), deepseek-v4-pro)` | `deepseek_ai_request("deepseek-v4-pro", "value", false, "", false, true)` |
| `deepseek_ai_stream_chat` | Statement | MESSAGE(input_value), MODEL(dropdown) | `deepseek_ai_stream_chat(text("value"), deepseek-v4-flash)` | `deepseek_ai_stream_request("deepseek-v4-flash", "value", false, "", false, false);` |
| `deepseek_ai_set_stream_callback` | Statement | CALLBACK(input_statement) | `deepseek_ai_set_stream_callback()` | `deepseek_ai_stream_callback = deepseek_ai_user_stream_callback;` |
| `deepseek_ai_get_stream_chunk` | Value | (none) | `deepseek_ai_get_stream_chunk()` | `deepseek_ai_stream_chunk` |
| `deepseek_ai_clear_stream_callback` | Statement | (none) | `deepseek_ai_clear_stream_callback()` | `deepseek_ai_stream_callback = NULL;` |
| `deepseek_ai_clear_history` | Statement | (none) | `deepseek_ai_clear_history()` | `deepseek_ai_history = "";` |
| `deepseek_ai_get_response_status` | Value | (none) | `deepseek_ai_get_response_status()` | `deepseek_ai_last_success` |
| `deepseek_ai_get_error_message` | Value | (none) | `deepseek_ai_get_error_message()` | `deepseek_ai_last_error` |
| `deepseek_ai_get_reasoning` | Value | (none) | `deepseek_ai_get_reasoning()` | `deepseek_ai_last_reasoning` |
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODEL | deepseek-v4-flash, deepseek-v4-pro, deepseek-chat | deepseek_ai_chat |
| MODEL | deepseek-v4-pro, deepseek-v4-flash, deepseek-reasoner | deepseek_ai_thinking_chat |
| EFFORT | high, max | deepseek_ai_thinking_chat |
| MODEL | deepseek-v4-pro, deepseek-v4-flash | deepseek_ai_json_chat |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    deepseek_ai_config(text("value"), text("value"))
```
