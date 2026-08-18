# Wisdom spectrum AI

Zhipu AI GLM large language model API library supports text dialogue, in-depth thinking, picture understanding and other functions, and is suitable for ESP32 and other WiFi-enabled development boards.

## Library Info
- **Name**: @aily-project/lib-zhipu-glm
- **Version**: 0.0.2

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `zhipu_glm_config` | Statement | API_KEY(input_value), BASE_URL(input_value) | `zhipu_glm_config(text("value"), text("value"))` | `String zhipu_api_key = "value"; ↵ String zhipu_base_url = "value"; ↵ String zhipu_system_prompt = ""; ↵ bool zhipu_last_success = false; ↵ String zhipu_last_error = ""; ↵ String zhipu_stream_chunk = ""; ↵ void (*zhipu_stream_callback)(void) = NULL; ↵ String zhipu_history = ""; ↵ String zhipu_escape_json(String input) { ↵ input.replace("\\", "\\\\"); ↵ input.replace("\"", "\\\""); ↵ input.replace("\n", "\\n"); ↵ input.replace("\r", "\\r"); ↵ return input; ↵ } ↵ String zhipu_simple_request(String model, String message, bool enableThinking, bool useHistory) { ↵ Serial.println("=== 智谱AI API调用开始(流式) ==="); ↵ Serial.println("模型: " + model); ↵ Serial.println("消息: " + message); ↵ if (WiFi.status() != WL_CONNECTED) { ↵ Serial.println("错误: WiFi未连接"); ↵ zhipu_last_success = false; ↵ zhipu_last_error = "WiFi not connected"; ↵ return ""; ↵ } ↵ HTTPClient http; ↵ String url = zhipu_base_url + "/chat/completions"; ↵ http.begin(url); ↵ http.setTimeout(60000); ↵ http.addHeader("Content-Type", "application/json"); ↵ http.addHeader("Authorization", "Bearer " + zhipu_api_key); ↵ String messages = ""; ↵ messages.reserve(zhipu_system_prompt.length() + zhipu_history.length() + message.length() + 256); ↵ bool hasAny = false; ↵ if (zhipu_system_prompt.length() > 0) { ↵ messages += "{\"role\":\"system\",\"content\":\"" + zhipu_escape_json(zhipu_system_prompt) + "\"}"; ↵ hasAny = true; ↵ } ↵ if (useHistory && zhipu_history.length() > 0) { ↵ if (hasAny) messages += ","; ↵ messages += zhipu_history; ↵ hasAny = true; ↵ } ↵ if (hasAny) messages += ","; ↵ messages += "{\"role\":\"user\",\"content\":\"" + zhipu_escape_json(message) + "\"}"; ↵ String requestBody = "{\"model\":\"" + model + "\",\"messages\":[" + messages + "]"; ↵ requestBody.reserve(requestBody.length() + 256); ↵ requestBody += ",\"stream\":true"; ↵ if (enableThinking) { ↵ requestBody += ",\"thinking\":{\"type\":\"enabled\"}"; ↵ requestBody += ",\"max_tokens\":65536"; ↵ requestBody += ",\"temperature\":1.0"; ↵ } ↵ requestBody += "}"; ↵ Serial.println("发送流式请求..."); ↵ int httpResponseCode = http.POST(requestBody); ↵ Serial.println("HTTP响应码: " + String(httpResponseCode)); ↵ String response = ""; ↵ if (httpResponseCode == 200) { ↵ WiFiClient* stream = http.getStreamPtr(); ↵ String fullContent = ""; ↵ String buffer = ""; ↵ while (http.connected() &#124;&#124; stream->available()) { ↵ if (stream->available()) { ↵ char c = stream->read(); ↵ buffer += c; ↵ // 检查是否收到完整的一行 ↵ if (c == '\n') { ↵ buffer.trim(); ↵ if (buffer.startsWith("data:")) { ↵ String data = buffer.substring(5); ↵ data.trim(); ↵ if (data == "[DONE]") { ↵ Serial.println(); ↵ Serial.println("流式传输完成"); ↵ break; ↵ } ↵ // 解析JSON中的content ↵ int contentStart = data.indexOf("\"content\":\""); ↵ if (contentStart >= 0) { ↵ contentStart += 11; ↵ int contentEnd = data.indexOf("\"", contentStart); ↵ if (contentEnd > contentStart) { ↵ String content = data.substring(contentStart, contentEnd); ↵ Serial.print(content); // 实时输出 ↵ fullContent += content; ↵ // 调用流式回调 ↵ if (zhipu_stream_callback != NULL) { ↵ zhipu_stream_chunk = content; ↵ zhipu_stream_callback(); ↵ } ↵ } ↵ } ↵ } ↵ buffer = ""; ↵ } ↵ } ↵ delay(1); ↵ } ↵ if (fullContent.length() > 0) { ↵ response = fullContent; ↵ if (useHistory) { ↵ String safeUser = zhipu_escape_json(message); ↵ String safeAssistant = zhipu_escape_json(fullContent); ↵ if (zhipu_history.length() > 0) { ↵ zhipu_history += ","; ↵ } ↵ zhipu_history += "{\"role\":\"user\",\"content\":\"" + safeUser + "\"},{\"role\":\"assistant\",\"content\":\"" + safeAssistant + "\"}"; ↵ } ↵ zhipu_last_success = true; ↵ zhipu_last_error = ""; ↵ } else { ↵ Serial.println("流式解析失败"); ↵ zhipu_last_success = false; ↵ zhipu_last_error = "Stream parse error"; ↵ } ↵ } else { ↵ String errorResponse = http.getString(); ↵ Serial.println("HTTP错误: " + errorResponse); ↵ zhipu_last_success = false; ↵ zhipu_last_error = "HTTP " + String(httpResponseCode); ↵ } ↵ http.end(); ↵ Serial.println("=== 智谱AI API调用结束 ==="); ↵ return response; ↵ }` |
| `zhipu_glm_chat` | Value | MESSAGE(input_value), MODEL(dropdown) | `zhipu_glm_chat(text("value"), glm-5.1)` | `zhipu_simple_request("glm-5.1", "value", false, false)` |
| `zhipu_glm_chat_with_thinking` | Value | MESSAGE(input_value), MODEL(dropdown) | `zhipu_glm_chat_with_thinking(text("value"), glm-5.1)` | `zhipu_simple_request("glm-5.1", "value", true, false)` |
| `zhipu_glm_chat_with_history` | Value | MESSAGE(input_value), MODEL(dropdown) | `zhipu_glm_chat_with_history(text("value"), glm-5.1)` | `zhipu_simple_request("glm-5.1", "value", false, true)` |
| `zhipu_glm_clear_history` | Statement | (none) | `zhipu_glm_clear_history()` | `zhipu_history = "";` |
| `zhipu_glm_set_system_prompt` | Statement | SYSTEM_PROMPT(input_value) | `zhipu_glm_set_system_prompt(text("value"))` | `zhipu_system_prompt = "value";` |
| `zhipu_glm_get_response_status` | Value | (none) | `zhipu_glm_get_response_status()` | `zhipu_last_success` |
| `zhipu_glm_get_error_message` | Value | (none) | `zhipu_glm_get_error_message()` | `zhipu_last_error` |
| `zhipu_glm_set_stream_callback` | Statement | CALLBACK(input_statement) | `zhipu_glm_set_stream_callback()` | `zhipu_stream_callback = zhipu_user_stream_callback;` |
| `zhipu_glm_get_stream_chunk` | Value | (none) | `zhipu_glm_get_stream_chunk()` | `zhipu_stream_chunk` |
| `zhipu_glm_clear_stream_callback` | Statement | (none) | `zhipu_glm_clear_stream_callback()` | `zhipu_stream_callback = NULL;` |
| `zhipu_glm_vision_chat` | Value | IMAGE(input_value), MESSAGE(input_value), MODEL(dropdown) | `zhipu_glm_vision_chat(text("value"), text("value"), glm-5v-turbo)` | `zhipu_vision_request("glm-5v-turbo", "value", "value")` |
| `zhipu_glm_vision_chat_direct_capture` | Value | MESSAGE(input_value), MODEL(dropdown) | `zhipu_glm_vision_chat_direct_capture(text("value"), glm-5v-turbo)` | `zhipu_vision_direct_capture_request("glm-5v-turbo", "value")` |
| `zhipu_glm_vision_url_chat` | Value | IMAGE_URL(input_value), MESSAGE(input_value), MODEL(dropdown) | `zhipu_glm_vision_url_chat(text("value"), text("value"), glm-5v-turbo)` | `zhipu_vision_url_request("glm-5v-turbo", "value", "value")` |
| `zhipu_glm_image_generate` | Value | PROMPT(input_value), MODEL(dropdown), SIZE(dropdown) | `zhipu_glm_image_generate(text("value"), glm-image, "1024x1024")` | `zhipu_image_generate("glm-image", "value", "1024x1024")` |
| `zhipu_glm_image_generate_simple` | Value | PROMPT(input_value) | `zhipu_glm_image_generate_simple(text("value"))` | `zhipu_image_generate("glm-image", "value", "1024x1024")` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODEL | glm-5.1, glm-5, glm-5-turbo, glm-5-air, glm-4.7, glm-4.7-flash, glm-4.7-flashx, glm-4.5-flash | zhipu_glm_chat, zhipu_glm_chat_with_history |
| MODEL | glm-5.1, glm-5, glm-5-air, glm-4.7 | zhipu_glm_chat_with_thinking |
| MODEL | glm-5v-turbo, glm-4.6v, glm-4.6v-flash, glm-4.6v-flashx | zhipu_glm_vision_chat, zhipu_glm_vision_chat_direct_capture, zhipu_glm_vision_url_chat |
| MODEL | glm-image, cogview-4-250304, cogview-4, cogview-3-flash | zhipu_glm_image_generate |
| SIZE | 1024x1024, 768x1344, 1344x768, 864x1152, 1152x864, 1440x720, 720x1440 | zhipu_glm_image_generate |

## ABS Examples

### Basic Usage
```
arduino_setup()
    zhipu_glm_config(text("value"), text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, zhipu_glm_chat(text("value"), glm-5.1))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
