# Xiaomi MiMo AI

ABS reference for Xiaomi MiMo V2.5 text, multimodal, speech, ESP32 camera, microphone, and ES8311 workflows.

## Library Info
- **Name**: @aily-project/lib-xiaomi-mimo
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mimo_init` | Statement | VAR(field_input), API_KEY(input_value), PLAN(dropdown) | `mimo_init("mimo", text("key"), PAYG)` | `mimo.begin(String("value"), "https://api.xiaomimimo.com/v1");` |
| `mimo_set_ca_certificate` | Statement | VAR(field_variable), CERT(input_value) | `mimo_set_ca_certificate($mimo, text("PEM"))` | `mimo.setCACertificate(String("value"));` |
| `mimo_set_model` | Statement | VAR(field_variable), MODEL(dropdown) | `mimo_set_model($mimo, mimo-v2.5-pro)` | `mimo.setModel("mimo-v2.5");` |
| `mimo_set_system_prompt` | Statement | VAR(field_variable), PROMPT(input_value) | `mimo_set_system_prompt($mimo, text("You are..."))` | `mimo.setSystemPrompt(String("value"));` |
| `mimo_set_generation` | Statement | VAR(field_variable), MAX_TOKENS(input_value), THINKING(dropdown), TEMPERATURE(input_value), TOP_P(input_value) | `mimo_set_generation($mimo, math_number(1024), enabled, math_number(1), math_number(0.95))` | `mimo.setGeneration(1, "enabled", 1, 1);` |
| `mimo_set_json_mode` | Statement | VAR(field_variable), ENABLED(input_value) | `mimo_set_json_mode($mimo, logic_boolean(TRUE))` | `mimo.setJsonMode(true);` |
| `mimo_clear_messages` | Statement | VAR(field_variable) | `mimo_clear_messages($mimo)` | `mimo.clearMessages();` |
| `mimo_add_user_message` | Statement | VAR(field_variable), TEXT(input_value) | `mimo_add_user_message($mimo, text("Hi"))` | `mimo.addUserMessage(String("value"));` |
| `mimo_add_assistant_message` | Statement | VAR(field_variable), TEXT(input_value) | `mimo_add_assistant_message($mimo, text("Hello"))` | `mimo.addAssistantMessage(String("value"));` |
| `mimo_chat` | Value String | VAR(field_variable), PROMPT(input_value) | `mimo_chat($mimo, text("Hello"))` | `mimo.chat(String("value"))` |
| `mimo_chat_with_tools` | Value String | VAR(field_variable), TOOLS(input_value), PROMPT(input_value) | `mimo_chat_with_tools($mimo, text("[]"), text("Weather?"))` | `mimo.chatWithTools(String("value"), String("value"))` |
| `mimo_continue_tool` | Value String | VAR(field_variable), RESULT(input_value) | `mimo_continue_tool($mimo, text("25 C"))` | `mimo.continueTool(String("value"))` |
| `mimo_when_tool_called` | Hybrid | VAR(field_variable), NAME(input_value), HANDLER(input_statement) | `mimo_when_tool_called($mimo, text("weather"))` | `if (mimo.hasToolCall() && mimo.toolName() == String("value")) { ↵ }` |
| `mimo_tool_arguments` | Value String | VAR(field_variable) | `mimo_tool_arguments($mimo)` | `mimo.toolArguments()` |
| `mimo_web_search` | Value String | VAR(field_variable), PROMPT(input_value), FORCE(input_value), MAX_KEYWORD(input_value), LIMIT(input_value), COUNTRY(input_value), REGION(input_value), CITY(input_value) | `mimo_web_search($mimo, text("weather"), logic_boolean(TRUE), math_number(3), math_number(1), text("China"), text(""), text("Wuhan"))` | `mimo.webSearch(String("value"), true, 1, 1, String("value"), String("value"), String("value"))` |
| `mimo_image_url` | Value String | VAR(field_variable), URL(input_value), PROMPT(input_value) | `mimo_image_url($mimo, text("https://..."), text("Describe"))` | `mimo.imageUrl(String("value"), String("value"))` |
| `mimo_image_base64` | Value String | VAR(field_variable), DATA(input_value), MIME(input_value), PROMPT(input_value) | `mimo_image_base64($mimo, variables_get($data), text("image/jpeg"), text("Describe"))` | `mimo.imageBase64(String("value"), String("value"), String("value"))` |
| `mimo_audio_url` | Value String | VAR(field_variable), URL(input_value), PROMPT(input_value) | `mimo_audio_url($mimo, text("https://..."), text("Describe"))` | `mimo.audioUrl(String("value"), String("value"))` |
| `mimo_audio_base64` | Value String | VAR(field_variable), DATA(input_value), MIME(input_value), PROMPT(input_value) | `mimo_audio_base64($mimo, variables_get($data), text("audio/wav"), text("Describe"))` | `mimo.audioBase64(String("value"), String("value"), String("value"))` |
| `mimo_video_url` | Value String | VAR(field_variable), URL(input_value), PROMPT(input_value), FPS(input_value), RESOLUTION(dropdown) | `mimo_video_url($mimo, text("https://..."), text("Describe"), math_number(2), default)` | `mimo.videoUrl(String("value"), String("value"), 1, "default")` |
| `mimo_video_base64` | Value String | VAR(field_variable), DATA(input_value), MIME(input_value), PROMPT(input_value), FPS(input_value), RESOLUTION(dropdown) | `mimo_video_base64($mimo, variables_get($data), text("video/mp4"), text("Describe"), math_number(2), default)` | `mimo.videoBase64(String("value"), String("value"), String("value"), 1, "default")` |
| `mimo_asr_base64` | Value String | VAR(field_variable), DATA(input_value), MIME(input_value), LANGUAGE(dropdown) | `mimo_asr_base64($mimo, variables_get($data), text("audio/wav"), auto)` | `mimo.transcribeBase64(String("value"), String("value"), "auto")` |
| `mimo_tts_preset` | Value String | VAR(field_variable), TEXT(input_value), STYLE(input_value), VOICE(dropdown), FORMAT(dropdown) | `mimo_tts_preset($mimo, text("Hello"), text("Warm"), Chloe, wav)` | `mimo.synthesizePreset(String("value"), String("value"), "mimo_default", "wav")` |
| `mimo_speaker_init_i2s` | Statement | VAR(field_input), BCLK(input_value), LRC(input_value), DIN(input_value) | `mimo_speaker_init_i2s("speaker", math_number(39), math_number(40), math_number(38))` | `speaker.beginI2S(1, 1, 1);` |
| `mimo_speaker_tone` | Statement | VAR(field_variable), FREQ(input_value), MS(input_value) | `mimo_speaker_tone($speaker, math_number(880), math_number(180))` | `speaker.playTone(1, 1);` |
| `mimo_tts_speak_i2s` | Statement | CLIENT(field_variable), SPEAKER(field_variable), TEXT(input_value), STYLE(input_value), VOICE(dropdown) | `mimo_tts_speak_i2s($mimo, $speaker, text("你好"), text("快速清楚朗读。"), mimo_default)` | `mimo.speakPreset(speaker, String("value"), String("value"), "mimo_default");` |
| `mimo_es8311_init` | Statement | VAR(field_input), SDA(input_value), SCL(input_value), ADDRESS(dropdown), MCK(input_value), BCK(input_value), WS(input_value), DOUT(input_value), DIN(input_value), DURATION(input_value), PA_EN(input_value) | `mimo_es8311_init("es8311", math_number(8), math_number(9), 0, math_number(16), math_number(4), math_number(5), math_number(6), math_number(7), math_number(5), math_number(-1))` | `es8311.begin(Wire, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1);` |
| `mimo_es8311_set_volume` | Statement | VAR(field_variable), VOLUME(input_value) | `mimo_es8311_set_volume($es8311, math_number(75))` | `es8311.setVolume(1);` |
| `mimo_es8311_set_mic_gain` | Statement | VAR(field_variable), GAIN(input_value) | `mimo_es8311_set_mic_gain($es8311, math_number(4))` | `es8311.setMicGain(1);` |
| `mimo_es8311_tone` | Statement | VAR(field_variable), FREQ(input_value), MS(input_value) | `mimo_es8311_tone($es8311, math_number(880), math_number(180))` | `es8311.playTone(1, 1);` |
| `mimo_es8311_record` | Value String | VAR(field_variable), SECONDS(input_value) | `mimo_es8311_record($es8311, math_number(3))` | `es8311.recordWavBase64(1)` |
| `mimo_es8311_transcribe` | Value String | CLIENT(field_variable), AUDIO(field_variable), SECONDS(input_value), LANGUAGE(dropdown) | `mimo_es8311_transcribe($mimo, $es8311, math_number(3), auto)` | `mimo.transcribeES8311(es8311, 1, "auto")` |
| `mimo_tts_speak_es8311` | Statement | CLIENT(field_variable), AUDIO(field_variable), TEXT(input_value), STYLE(input_value), VOICE(dropdown) | `mimo_tts_speak_es8311($mimo, $es8311, text("你好"), text("快速清楚朗读。"), mimo_default)` | `mimo.speakPreset(es8311, String("value"), String("value"), "mimo_default");` |
| `mimo_es8311_end` | Statement | VAR(field_variable) | `mimo_es8311_end($es8311)` | `es8311.end();` |
| `mimo_tts_voice_design` | Value String | VAR(field_variable), DESCRIPTION(input_value), TEXT(input_value), OPTIMIZE(input_value), FORMAT(dropdown) | `mimo_tts_voice_design($mimo, text("Young voice"), text("Hello"), logic_boolean(TRUE), wav)` | `mimo.synthesizeVoiceDesign(String("value"), String("value"), true, "wav")` |
| `mimo_tts_voice_clone` | Value String | VAR(field_variable), SAMPLE(input_value), MIME(input_value), TEXT(input_value), STYLE(input_value), FORMAT(dropdown) | `mimo_tts_voice_clone($mimo, variables_get($sample), text("audio/wav"), text("Hello"), text("Natural"), wav)` | `mimo.synthesizeVoiceClone(String("value"), String("value"), String("value"), String("value"), "wav")` |
| `mimo_camera_init_profile` | Statement | VAR(field_input), PROFILE(dropdown), FRAME_SIZE(dropdown), QUALITY(input_value) | `mimo_camera_init_profile("camera", ESP32S3_RGB565, FRAMESIZE_QVGA, math_number(12))` | `camera.beginProfile("ESP32S3_RGB565", FRAMESIZE_QVGA, 1);` |
| `mimo_camera_init_custom` | Statement | VAR(field_input), FRAME_SIZE(dropdown), QUALITY(input_value), PWDN(input_value), RESET(input_value), XCLK(input_value), SIOD(input_value), SIOC(input_value), Y2(input_value), Y3(input_value), Y4(input_value), Y5(input_value), Y6(input_value), Y7(input_value), Y8(input_value), Y9(input_value), VSYNC(input_value), HREF(input_value), PCLK(input_value) | `mimo_camera_init_custom("camera", FRAMESIZE_QVGA, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `camera.beginCustom(AilyMiMoCameraPins{1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}, FRAMESIZE_QVGA, 1);` |
| `mimo_camera_capture` | Value String | VAR(field_variable) | `mimo_camera_capture($camera)` | `camera.captureBase64()` |
| `mimo_camera_ask` | Value String | CLIENT(field_variable), CAMERA(field_variable), PROMPT(input_value) | `mimo_camera_ask($mimo, $camera, text("Describe"))` | `mimo.imageBase64(camera.captureBase64(), "image/jpeg", String("value"))` |
| `mimo_camera_end` | Statement | VAR(field_variable) | `mimo_camera_end($camera)` | `camera.end();` |
| `mimo_mic_init_i2s_preset` | Statement | VAR(field_input), MODEL(dropdown), BCLK(input_value), WS(input_value), DATA(input_value), RATE(input_value) | `mimo_mic_init_i2s_preset("microphone", COMMON_I2S, math_number(41), math_number(42), math_number(2), math_number(16000))` | `microphone.beginPreset("COMMON_I2S", 1, 1, 1, 1);` |
| `mimo_mic_init_i2s` | Statement | VAR(field_input), BCLK(input_value), WS(input_value), DATA(input_value), RATE(input_value), CHANNEL(dropdown), GAIN(input_value) | `mimo_mic_init_i2s("microphone", math_number(41), math_number(42), math_number(2), math_number(16000), LEFT, math_number(4))` | `microphone.beginI2S(1, 1, 1, 1, false, 1);` |
| `mimo_mic_init_pdm` | Statement | VAR(field_input), CLK(input_value), DATA(input_value), RATE(input_value) | `mimo_mic_init_pdm("microphone", math_number(42), math_number(41), math_number(16000))` | `microphone.beginPDM(1, 1, 1);` |
| `mimo_mic_record` | Value String | VAR(field_variable), SECONDS(input_value) | `mimo_mic_record($microphone, math_number(3))` | `microphone.recordWavBase64(1)` |
| `mimo_mic_transcribe` | Value String | CLIENT(field_variable), MIC(field_variable), SECONDS(input_value), LANGUAGE(dropdown) | `mimo_mic_transcribe($mimo, $microphone, math_number(3), auto)` | `mimo.transcribeMicrophone(microphone, 1, "auto")` |
| `mimo_mic_analyze` | Value String | CLIENT(field_variable), MIC(field_variable), SECONDS(input_value), PROMPT(input_value) | `mimo_mic_analyze($mimo, $microphone, math_number(3), text("Describe"))` | `mimo.audioBase64(microphone.recordWavBase64(1), "audio/wav", String("value"))` |
| `mimo_mic_end` | Statement | VAR(field_variable) | `mimo_mic_end($microphone)` | `microphone.end();` |
| `mimo_ok` | Value Boolean | VAR(field_variable) | `mimo_ok($mimo)` | `mimo.ok()` |
| `mimo_last_reasoning` | Value String | VAR(field_variable) | `mimo_last_reasoning($mimo)` | `mimo.lastReasoning()` |
| `mimo_last_error` | Value String | VAR(field_variable) | `mimo_last_error($mimo)` | `mimo.lastError()` |
| `mimo_http_status` | Value Number | VAR(field_variable) | `mimo_http_status($mimo)` | `mimo.httpStatus()` |
| `mimo_token_usage` | Value Number | VAR(field_variable), METRIC(dropdown) | `mimo_token_usage($mimo, TOTAL)` | `mimo.promptTokens()` |
| `mimo_raw_response` | Value String | VAR(field_variable) | `mimo_raw_response($mimo)` | `mimo.lastResponse()` |
| `mimo_camera_ready` | Value Boolean | VAR(field_variable) | `mimo_camera_ready($camera)` | `camera.ready()` |
| `mimo_camera_error` | Value String | VAR(field_variable) | `mimo_camera_error($camera)` | `camera.lastError()` |
| `mimo_mic_ready` | Value Boolean | VAR(field_variable) | `mimo_mic_ready($microphone)` | `microphone.ready()` |
| `mimo_mic_error` | Value String | VAR(field_variable) | `mimo_mic_error($microphone)` | `microphone.lastError()` |
| `mimo_speaker_ready` | Value Boolean | VAR(field_variable) | `mimo_speaker_ready($speaker)` | `speaker.ready()` |
| `mimo_speaker_error` | Value String | VAR(field_variable) | `mimo_speaker_error($speaker)` | `speaker.lastError()` |
| `mimo_es8311_ready` | Value Boolean | VAR(field_variable) | `mimo_es8311_ready($es8311)` | `es8311.ready()` |
| `mimo_es8311_error` | Value String | VAR(field_variable) | `mimo_es8311_error($es8311)` | `es8311.lastError()` |
| `mimo_es8311_sound_level` | Value Number | VAR(field_variable) | `mimo_es8311_sound_level($es8311)` | `es8311.soundLevel()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PLAN | `PAYG`, `TOKEN_PLAN` | Official pay-as-you-go or subscription Base URL |
| MODEL | `mimo-v2.5-pro`, `mimo-v2.5` | Text model; media blocks force `mimo-v2.5` |
| THINKING | `enabled`, `disabled` | Deep reasoning mode |
| LANGUAGE | `auto`, `zh`, `en` | ASR language detection or fixed language |
| MODEL | `COMMON_I2S`, `MSM261S4030H0R`, `INMP441`, `ICS43434`, `SPH0645LM4H` | Common I2S microphone presets; all use 32-bit stereo slot capture |
| CHANNEL | `LEFT`, `RIGHT` | I2S microphone slot to use; MSM261S4030H0R with L/R tied to GND uses LEFT |
| RESOLUTION | `default`, `max` | Video frame analysis detail |
| PROFILE | `ESP32S3_RGB565`, `AI_THINKER`, `XIAO_ESP32S3`, `ESP32S3_EYE` | Camera pin profile |
| FRAME_SIZE | `FRAMESIZE_QVGA`, `FRAMESIZE_VGA`, `FRAMESIZE_SVGA`, `FRAMESIZE_XGA` | JPEG dimensions |
| FORMAT | `wav`, `pcm16` | Returned TTS audio encoding |
| VOICE | `mimo_default`, `冰糖`, `茉莉`, `苏打`, `白桦`, `Mia`, `Chloe`, `Milo`, `Dean` | Preset TTS voice ID |
| METRIC | `PROMPT`, `COMPLETION`, `TOTAL` | Token usage field |
| ADDRESS | `0`, `0x18`, `0x30` | ES8311 I2C address; `0` scans common addresses |

## ABS Example

Toolbox examples are editable stacked recipes split into `变量声明`, `初始化`, and `loop`; use core Serial/WiFi/variables/IO/logic/time blocks with MiMo blocks.

```text
arduino_setup()
    wifi_connect(text("ssid"), text("password"))
    mimo_init("mimo", text("API_KEY"), PAYG)
    mimo_set_generation($mimo, math_number(512), enabled, math_number(1), math_number(0.95))
    mimo_camera_init_profile("camera", ESP32S3_RGB565, FRAMESIZE_QVGA, math_number(12))
    serial_println(Serial, mimo_camera_ask($mimo, $camera, text("画面中有什么？")))

    mimo_mic_init_i2s_preset("microphone", COMMON_I2S, math_number(41), math_number(42), math_number(2), math_number(16000))
    mimo_es8311_init("es8311", math_number(8), math_number(9), 0, math_number(16), math_number(4), math_number(5), math_number(6), math_number(7), math_number(5), math_number(-1))

arduino_loop()
    time_delay(math_number(10000))
```

## Notes

- Init blocks create typed variables. Connect Wi-Fi before MiMo requests; calls block, so keep outputs short.
- Examples are stacked blocks for the matching Aily section; no outer Arduino wrapper blocks are included.
- Camera capture returns JPEG Base64; non-JPEG sensors use QQVGA RGB565 plus frame2jpg().
- I2S mic presets still require correct BCLK/WS/DATA wiring; short 1-10 s recordings are best.
- ES8311 uses one `MiMoES8311` object for mic and speaker. Fill SDA/SCL/MCK/BCK/WS/DOUT/DIN from wiring; address `0` scans 0x18/0x30. Set PA_EN to the amplifier-enable GPIO, or `-1` when unused.
- TLS is insecure unless a CA is set. ESP32 Arduino Core supplies HTTPS, cJSON, Base64, camera, and I2S.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    mimo_init("mimo", text("key"), PAYG)
```
