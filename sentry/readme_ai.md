# Sentry 智能视觉传感器

Sentry1、Sentry2、Sentry3 三型号独立的 Blockly 代码生成库。

## Library Info
- **Name**: @aily-project/lib-tosee-sentry
- **Version**: 2.0.0

## Variable Types

| 初始化积木 | 自动创建变量 | 类型 |
|---|---|---|
| `sentry1_init_i2c` / `sentry1_init_uart` | `$sentry1` | `Sentry1Device` |
| `sentry2_init_i2c` / `sentry2_init_uart` | `$sentry2` | `Sentry2Device` |
| `sentry3_init_i2c` / `sentry3_init_uart` | `$sentry3` | `Sentry3Device` |

不同类型不可互换。初始化的 `VAR` 是引号字符串；后续 `VAR` 参数使用 `$变量名`。

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|---|---|---|---|---|
| `sentry1_init_i2c` | Statement | VAR(field_input), ADDRESS(input_value) | `sentry1_init_i2c("sentry1", math_number(0))` | `Sentry1 sentry1(1); ↵ Wire.begin(); ↵ while (SENTRY_OK != sentry1.begin(&Wire)) { yield(); }` |
| `sentry1_init_uart` | Statement | VAR(field_input), SERIAL(dropdown), BAUD(input_value) | `sentry1_init_uart("sentry1", SERIAL, math_number(9600))` | `Sentry1 sentry1; ↵ SERIAL.begin(1); ↵ while (SENTRY_OK != sentry1.begin(&SERIAL)) { yield(); }` |
| `sentry1_set_led` | Statement | VAR(field_variable), DETECTED(dropdown), UNDETECTED(dropdown), LEVEL(input_value) | `sentry1_set_led($sentry1, kLedClose, kLedClose, math_number(0))` | `sentry1.LedSetColor(kLedClose, kLedClose, constrain(1, 0, 15));` |
| `sentry1_vision_control` | Statement | VAR(field_variable), ACTION(dropdown), VISION(dropdown) | `sentry1_vision_control($sentry1, BEGIN, 1)` | `static_cast<SentryFactory&>(sentry1).VisionBegin(1);` |
| `sentry1_set_region_param` | Statement | VAR(field_variable), ID(input_value), X(input_value), Y(input_value), WIDTH(input_value), HEIGHT(input_value) | `sentry1_set_region_param($sentry1, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `{ ↵ sentry_object_t p = {}; ↵ p.x_value = 1; ↵ p.y_value = 1; ↵ p.width = 1; ↵ p.height = 1; ↵ static_cast<SentryFactory&>(sentry1).SetParam(1, &p, 1); ↵ }` |
| `sentry1_set_blob_param` | Statement | VAR(field_variable), ID(input_value), WIDTH(input_value), HEIGHT(input_value), COLOR(dropdown) | `sentry1_set_blob_param($sentry1, math_number(0), math_number(0), math_number(0), 1)` | `{ ↵ sentry_object_t p = {}; ↵ p.width = 1; ↵ p.height = 1; ↵ p.label = 1; ↵ static_cast<SentryFactory&>(sentry1).SetParam(2, &p, 1); ↵ }` |
| `sentry1_camera_awb` | Statement | VAR(field_variable), AWB(dropdown) | `sentry1_camera_awb($sentry1, kAutoWhiteBalance)` | `sentry1.CameraSetAwb(kAutoWhiteBalance);` |
| `sentry1_vision_default` | Statement | VAR(field_variable), VISION(dropdown) | `sentry1_vision_default($sentry1, 1)` | `static_cast<SentryFactory&>(sentry1).VisionSetDefault(1);` |
| `sentry1_restart` | Statement | VAR(field_variable) | `sentry1_restart($sentry1)` | `sentry1.SensorSetRestart();` |
| `sentry1_sensor_default` | Statement | VAR(field_variable), VISION_ONLY(input_value) | `sentry1_sensor_default($sentry1, logic_boolean(TRUE))` | `sentry1.SensorSetDefault(true);` |
| `sentry1_detected_count` | Value | VAR(field_variable), VISION(dropdown) | `sentry1_detected_count($sentry1, 1)` | `static_cast<SentryFactory&>(sentry1).GetValue(1, kStatus, 1)` |
| `sentry1_get_value` | Value | VAR(field_variable), VISION(dropdown), ID(input_value), INFO(dropdown) | `sentry1_get_value($sentry1, 1, math_number(0), kXValue)` | `static_cast<SentryFactory&>(sentry1).GetValue(1, kXValue, 1)` |
| `sentry1_detected_label` | Value | VAR(field_variable), VISION(dropdown), ID(input_value), LABEL(input_value) | `sentry1_detected_label($sentry1, 1, math_number(0), math_number(0))` | `(static_cast<SentryFactory&>(sentry1).GetValue(1, kLabel, 1) == 1)` |
| `sentry1_get_qrcode` | Value | VAR(field_variable) | `sentry1_get_qrcode($sentry1)` | `String(sentry1.GetQrCodeValue() ? sentry1.GetQrCodeValue() : "")` |
| `sentry1_vision_status` | Value | VAR(field_variable), VISION(dropdown) | `sentry1_vision_status($sentry1, 1)` | `static_cast<SentryFactory&>(sentry1).VisionGetStatus(1)` |
| `sentry1_update_result` | Value | VAR(field_variable), VISION(dropdown) | `sentry1_update_result($sentry1, 1)` | `static_cast<SentryFactory&>(sentry1).UpdateResult(1)` |
| `sentry2_init_i2c` | Statement | VAR(field_input), ADDRESS(input_value) | `sentry2_init_i2c("sentry2", math_number(0))` | `Sentry2 sentry2(1); ↵ Wire.begin(); ↵ while (SENTRY_OK != sentry2.begin(&Wire)) { yield(); }` |
| `sentry2_init_uart` | Statement | VAR(field_input), SERIAL(dropdown), BAUD(input_value) | `sentry2_init_uart("sentry2", SERIAL, math_number(9600))` | `Sentry2 sentry2; ↵ SERIAL.begin(1); ↵ while (SENTRY_OK != sentry2.begin(&SERIAL)) { yield(); }` |
| `sentry2_set_led` | Statement | VAR(field_variable), DETECTED(dropdown), UNDETECTED(dropdown), LEVEL(input_value) | `sentry2_set_led($sentry2, kLedClose, kLedClose, math_number(0))` | `sentry2.LedSetColor(kLedClose, kLedClose, constrain(1, 0, 15));` |
| `sentry2_vision_control` | Statement | VAR(field_variable), ACTION(dropdown), VISION(dropdown) | `sentry2_vision_control($sentry2, BEGIN, 1)` | `static_cast<SentryFactory&>(sentry2).VisionBegin(1);` |
| `sentry2_set_param_num` | Statement | VAR(field_variable), VISION(dropdown), COUNT(input_value) | `sentry2_set_param_num($sentry2, 1, math_number(0))` | `static_cast<SentryFactory&>(sentry2).SetParamNum(1, 1);` |
| `sentry2_set_region_param` | Statement | VAR(field_variable), ID(input_value), X(input_value), Y(input_value), WIDTH(input_value), HEIGHT(input_value) | `sentry2_set_region_param($sentry2, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `{ ↵ sentry_object_t p = {}; ↵ p.x_value = 1; ↵ p.y_value = 1; ↵ p.width = 1; ↵ p.height = 1; ↵ static_cast<SentryFactory&>(sentry2).SetParam(1, &p, 1); ↵ }` |
| `sentry2_set_blob_param` | Statement | VAR(field_variable), ID(input_value), WIDTH(input_value), HEIGHT(input_value), COLOR(dropdown) | `sentry2_set_blob_param($sentry2, math_number(0), math_number(0), math_number(0), 1)` | `{ ↵ sentry_object_t p = {}; ↵ p.width = 1; ↵ p.height = 1; ↵ p.label = 1; ↵ static_cast<SentryFactory&>(sentry2).SetParam(2, &p, 1); ↵ }` |
| `sentry2_set_label_param` | Statement | VAR(field_variable), VISION(dropdown), ID(input_value), LABEL(input_value) | `sentry2_set_label_param($sentry2, 1, math_number(0), math_number(0))` | `{ ↵ sentry_object_t p = {}; ↵ p.label = 1; ↵ static_cast<SentryFactory&>(sentry2).SetParam(1, &p, 1); ↵ }` |
| `sentry2_set_mode` | Statement | VAR(field_variable), VISION(dropdown), MODE(input_value) | `sentry2_set_mode($sentry2, 1, math_number(0))` | `static_cast<SentryFactory&>(sentry2).VisionSetMode(1, 1);` |
| `sentry2_set_apriltag_mode` | Statement | VAR(field_variable), MODE(dropdown) | `sentry2_set_apriltag_mode($sentry2, 0)` | `static_cast<SentryFactory&>(sentry2).VisionSetMode(3, 0);` |
| `sentry2_set_level` | Statement | VAR(field_variable), VISION(dropdown), LEVEL(dropdown) | `sentry2_set_level($sentry2, 1, kLevelDefault)` | `static_cast<SentryFactory&>(sentry2).VisionSetLevel(1, kLevelDefault);` |
| `sentry2_camera_zoom` | Statement | VAR(field_variable), ZOOM(dropdown) | `sentry2_camera_zoom($sentry2, kZoomDefault)` | `sentry2.CameraSetZoom(kZoomDefault);` |
| `sentry2_camera_awb` | Statement | VAR(field_variable), AWB(dropdown) | `sentry2_camera_awb($sentry2, kAutoWhiteBalance)` | `sentry2.CameraSetAwb(kAutoWhiteBalance);` |
| `sentry2_set_coordinate` | Statement | VAR(field_variable), COORDINATE(dropdown) | `sentry2_set_coordinate($sentry2, kAbsoluteCoordinate)` | `sentry2.SeneorSetCoordinateType(kAbsoluteCoordinate);` |
| `sentry2_vision_default` | Statement | VAR(field_variable), VISION(dropdown) | `sentry2_vision_default($sentry2, 1)` | `static_cast<SentryFactory&>(sentry2).VisionSetDefault(1);` |
| `sentry2_screen_config` | Statement | VAR(field_variable), ENABLE(input_value), USER_ONLY(input_value) | `sentry2_screen_config($sentry2, logic_boolean(TRUE), logic_boolean(TRUE))` | `sentry2.ScreenConfig(true, true);` |
| `sentry2_screen_fill` | Statement | VAR(field_variable), IMAGE_ID(input_value), RED(input_value), GREEN(input_value), BLUE(input_value) | `sentry2_screen_fill($sentry2, math_number(0), math_number(0), math_number(0), math_number(0))` | `sentry2.ScreenFill(1, 1, 1, 1);` |
| `sentry2_snapshot` | Statement | VAR(field_variable), DEST(dropdown), SOURCE(dropdown), FORMAT(dropdown) | `sentry2_snapshot($sentry2, kSnapshot2SD, kSnapshotFromCamera, kSnapshotTypeRGB565)` | `sentry2.Snapshot(kSnapshot2SD, kSnapshotFromCamera, kSnapshotTypeRGB565);` |
| `sentry2_restart` | Statement | VAR(field_variable) | `sentry2_restart($sentry2)` | `sentry2.SensorSetRestart();` |
| `sentry2_sensor_default` | Statement | VAR(field_variable), VISION_ONLY(input_value) | `sentry2_sensor_default($sentry2, logic_boolean(TRUE))` | `sentry2.SensorSetDefault(true);` |
| `sentry2_detected_count` | Value | VAR(field_variable), VISION(dropdown) | `sentry2_detected_count($sentry2, 1)` | `static_cast<SentryFactory&>(sentry2).GetValue(1, kStatus, 1)` |
| `sentry2_get_value` | Value | VAR(field_variable), VISION(dropdown), ID(input_value), INFO(dropdown) | `sentry2_get_value($sentry2, 1, math_number(0), kXValue)` | `static_cast<SentryFactory&>(sentry2).GetValue(1, kXValue, 1)` |
| `sentry2_detected_label` | Value | VAR(field_variable), VISION(dropdown), ID(input_value), LABEL(input_value) | `sentry2_detected_label($sentry2, 1, math_number(0), math_number(0))` | `(static_cast<SentryFactory&>(sentry2).GetValue(1, kLabel, 1) == 1)` |
| `sentry2_get_qrcode` | Value | VAR(field_variable) | `sentry2_get_qrcode($sentry2)` | `String(sentry2.GetQrCodeValue() ? sentry2.GetQrCodeValue() : "")` |
| `sentry2_vision_status` | Value | VAR(field_variable), VISION(dropdown) | `sentry2_vision_status($sentry2, 1)` | `static_cast<SentryFactory&>(sentry2).VisionGetStatus(1)` |
| `sentry2_update_result` | Value | VAR(field_variable), VISION(dropdown) | `sentry2_update_result($sentry2, 1)` | `static_cast<SentryFactory&>(sentry2).UpdateResult(1)` |
| `sentry2_image_rows` | Value | VAR(field_variable) | `sentry2_image_rows($sentry2)` | `sentry2.rows()` |
| `sentry2_image_cols` | Value | VAR(field_variable) | `sentry2_image_cols($sentry2)` | `sentry2.cols()` |
| `sentry3_init_i2c` | Statement | VAR(field_input), ADDRESS(input_value) | `sentry3_init_i2c("sentry3", math_number(0))` | `Sentry3 sentry3(1); ↵ Wire.begin(); ↵ while (SENTRY_OK != sentry3.begin(&Wire)) { yield(); }` |
| `sentry3_init_uart` | Statement | VAR(field_input), SERIAL(dropdown), BAUD(input_value) | `sentry3_init_uart("sentry3", SERIAL, math_number(9600))` | `Sentry3 sentry3; ↵ SERIAL.begin(1); ↵ while (SENTRY_OK != sentry3.begin(&SERIAL)) { yield(); }` |
| `sentry3_set_led` | Statement | VAR(field_variable), DETECTED(dropdown), UNDETECTED(dropdown), LEVEL(input_value) | `sentry3_set_led($sentry3, kLedClose, kLedClose, math_number(0))` | `sentry3.LedSetColor(kLedClose, kLedClose, constrain(1, 0, 15));` |
| `sentry3_vision_control` | Statement | VAR(field_variable), ACTION(dropdown), VISION(dropdown) | `sentry3_vision_control($sentry3, BEGIN, 1)` | `static_cast<SentryFactory&>(sentry3).VisionBegin(1);` |
| `sentry3_set_param_num` | Statement | VAR(field_variable), VISION(dropdown), COUNT(input_value) | `sentry3_set_param_num($sentry3, 1, math_number(0))` | `static_cast<SentryFactory&>(sentry3).SetParamNum(1, 1);` |
| `sentry3_set_region_param` | Statement | VAR(field_variable), ID(input_value), X(input_value), Y(input_value), WIDTH(input_value), HEIGHT(input_value) | `sentry3_set_region_param($sentry3, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `{ ↵ sentry_object_t p = {}; ↵ p.x_value = 1; ↵ p.y_value = 1; ↵ p.width = 1; ↵ p.height = 1; ↵ static_cast<SentryFactory&>(sentry3).SetParam(1, &p, 1); ↵ }` |
| `sentry3_set_blob_param` | Statement | VAR(field_variable), ID(input_value), WIDTH(input_value), HEIGHT(input_value), COLOR(dropdown) | `sentry3_set_blob_param($sentry3, math_number(0), math_number(0), math_number(0), 1)` | `{ ↵ sentry_object_t p = {}; ↵ p.width = 1; ↵ p.height = 1; ↵ p.label = 1; ↵ static_cast<SentryFactory&>(sentry3).SetParam(2, &p, 1); ↵ }` |
| `sentry3_set_label_param` | Statement | VAR(field_variable), VISION(dropdown), ID(input_value), LABEL(input_value) | `sentry3_set_label_param($sentry3, 1, math_number(0), math_number(0))` | `{ ↵ sentry_object_t p = {}; ↵ p.label = 1; ↵ static_cast<SentryFactory&>(sentry3).SetParam(1, &p, 1); ↵ }` |
| `sentry3_set_mode` | Statement | VAR(field_variable), VISION(dropdown), MODE(input_value) | `sentry3_set_mode($sentry3, 1, math_number(0))` | `static_cast<SentryFactory&>(sentry3).VisionSetMode(1, 1);` |
| `sentry3_set_apriltag_mode` | Statement | VAR(field_variable), MODE(dropdown) | `sentry3_set_apriltag_mode($sentry3, 0)` | `static_cast<SentryFactory&>(sentry3).VisionSetMode(3, 0);` |
| `sentry3_set_barcode_mode` | Statement | VAR(field_variable), MODE(dropdown) | `sentry3_set_barcode_mode($sentry3, 2)` | `static_cast<SentryFactory&>(sentry3).VisionSetMode(10, 2);` |
| `sentry3_set_ocr_mode` | Statement | VAR(field_variable), MODE(dropdown) | `sentry3_set_ocr_mode($sentry3, 0)` | `static_cast<SentryFactory&>(sentry3).VisionSetMode(12, 0);` |
| `sentry3_set_face_mode` | Statement | VAR(field_variable), MODE(dropdown) | `sentry3_set_face_mode($sentry3, 1)` | `static_cast<SentryFactory&>(sentry3).VisionSetMode(7, 1);` |
| `sentry3_set_level` | Statement | VAR(field_variable), VISION(dropdown), LEVEL(dropdown) | `sentry3_set_level($sentry3, 1, kLevelDefault)` | `static_cast<SentryFactory&>(sentry3).VisionSetLevel(1, kLevelDefault);` |
| `sentry3_camera_zoom` | Statement | VAR(field_variable), ZOOM(dropdown) | `sentry3_camera_zoom($sentry3, kZoomDefault)` | `sentry3.CameraSetZoom(kZoomDefault);` |
| `sentry3_camera_awb` | Statement | VAR(field_variable), AWB(dropdown) | `sentry3_camera_awb($sentry3, kAutoWhiteBalance)` | `sentry3.CameraSetAwb(kAutoWhiteBalance);` |
| `sentry3_set_coordinate` | Statement | VAR(field_variable), COORDINATE(dropdown) | `sentry3_set_coordinate($sentry3, kAbsoluteCoordinate)` | `sentry3.SeneorSetCoordinateType(kAbsoluteCoordinate);` |
| `sentry3_vision_default` | Statement | VAR(field_variable), VISION(dropdown) | `sentry3_vision_default($sentry3, 1)` | `static_cast<SentryFactory&>(sentry3).VisionSetDefault(1);` |
| `sentry3_screen_config` | Statement | VAR(field_variable), ENABLE(input_value), USER_ONLY(input_value) | `sentry3_screen_config($sentry3, logic_boolean(TRUE), logic_boolean(TRUE))` | `sentry3.ScreenConfig(true, true);` |
| `sentry3_screen_fill` | Statement | VAR(field_variable), IMAGE_ID(input_value), RED(input_value), GREEN(input_value), BLUE(input_value) | `sentry3_screen_fill($sentry3, math_number(0), math_number(0), math_number(0), math_number(0))` | `sentry3.ScreenFill(1, 1, 1, 1);` |
| `sentry3_snapshot` | Statement | VAR(field_variable), DEST(dropdown), SOURCE(dropdown), FORMAT(dropdown) | `sentry3_snapshot($sentry3, kSnapshot2SD, kSnapshotFromCamera, kSnapshotTypeRGB565)` | `sentry3.Snapshot(kSnapshot2SD, kSnapshotFromCamera, kSnapshotTypeRGB565);` |
| `sentry3_restart` | Statement | VAR(field_variable) | `sentry3_restart($sentry3)` | `sentry3.SensorSetRestart();` |
| `sentry3_sensor_default` | Statement | VAR(field_variable), VISION_ONLY(input_value) | `sentry3_sensor_default($sentry3, logic_boolean(TRUE))` | `sentry3.SensorSetDefault(true);` |
| `sentry3_detected_count` | Value | VAR(field_variable), VISION(dropdown) | `sentry3_detected_count($sentry3, 1)` | `static_cast<SentryFactory&>(sentry3).GetValue(1, kStatus, 1)` |
| `sentry3_get_value` | Value | VAR(field_variable), VISION(dropdown), ID(input_value), INFO(dropdown) | `sentry3_get_value($sentry3, 1, math_number(0), kXValue)` | `static_cast<SentryFactory&>(sentry3).GetValue(1, kXValue, 1)` |
| `sentry3_detected_label` | Value | VAR(field_variable), VISION(dropdown), ID(input_value), LABEL(input_value) | `sentry3_detected_label($sentry3, 1, math_number(0), math_number(0))` | `(static_cast<SentryFactory&>(sentry3).GetValue(1, kLabel, 1) == 1)` |
| `sentry3_get_string` | Value | VAR(field_variable), VISION(dropdown), ID(input_value) | `sentry3_get_string($sentry3, 7, math_number(0))` | `ailySentry3String(sentry3, 7, 1)` |
| `sentry3_vision_status` | Value | VAR(field_variable), VISION(dropdown) | `sentry3_vision_status($sentry3, 1)` | `static_cast<SentryFactory&>(sentry3).VisionGetStatus(1)` |
| `sentry3_update_result` | Value | VAR(field_variable), VISION(dropdown) | `sentry3_update_result($sentry3, 1)` | `static_cast<SentryFactory&>(sentry3).UpdateResult(1)` |
| `sentry3_image_rows` | Value | VAR(field_variable) | `sentry3_image_rows($sentry3)` | `sentry3.rows()` |
| `sentry3_image_cols` | Value | VAR(field_variable) | `sentry3_image_cols($sentry3)` | `sentry3.cols()` |
| `sentry3_wifi_connect` | Statement | VAR(field_variable), SSID(input_value), PASSWORD(input_value) | `sentry3_wifi_connect($sentry3, text("value"), text("value"))` | `while (SENTRY_OK != sentry3.WiFiConfig(String("value").c_str(), String("value").c_str())) { yield(); } ↵ while (SENTRY_OK != sentry3.WiFiConnectWithMode(kWiFiModeCloudAlgorithm)) { yield(); } ↵ while (SENTRY_OK != sentry3.WiFiIsConnected()) { yield(); }` |
| `sentry3_wifi_close` | Statement | VAR(field_variable) | `sentry3_wifi_close($sentry3)` | `sentry3.WiFiConnectWithMode(kWiFiModeClose);` |
| `sentry3_llm_mode` | Statement | VAR(field_variable), MODE(dropdown) | `sentry3_llm_mode($sentry3, kModeClose)` | `if (sentry3.LLM()) { sentry3.LLM()->SetMode(SentryLLM::kModeClose); }` |
| `sentry3_llm_model` | Statement | VAR(field_variable), MODEL(input_value) | `sentry3_llm_model($sentry3, text("value"))` | `if (sentry3.LLM()) { sentry3.LLM()->SetModel(String("value").c_str()); }` |
| `sentry3_llm_api_key` | Statement | VAR(field_variable), KEY(input_value) | `sentry3_llm_api_key($sentry3, text("value"))` | `if (sentry3.LLM()) { sentry3.LLM()->SetAPIKey(String("value").c_str()); }` |
| `sentry3_llm_prompt` | Statement | VAR(field_variable), PROMPT(input_value) | `sentry3_llm_prompt($sentry3, text("value"))` | `if (sentry3.LLM()) { sentry3.LLM()->SetSystemPrompt(String("value").c_str()); }` |
| `sentry3_llm_voice` | Statement | VAR(field_variable), VOICE(input_value) | `sentry3_llm_voice($sentry3, text("value"))` | `if (sentry3.LLM()) { sentry3.LLM()->SetVoice(String("value").c_str()); }` |
| `sentry3_llm_thinking` | Statement | VAR(field_variable), ENABLE(input_value) | `sentry3_llm_thinking($sentry3, logic_boolean(TRUE))` | `if (sentry3.LLM()) { sentry3.LLM()->EnableThinking(true); }` |
| `sentry3_llm_chat` | Value | VAR(field_variable), TEXT(input_value) | `sentry3_llm_chat($sentry3, text("value"))` | `ailySentry3Chat(sentry3, String("value"))` |
| `sentry3_llm_tts` | Statement | VAR(field_variable), TEXT(input_value) | `sentry3_llm_tts($sentry3, text("value"))` | `if (sentry3.LLM()) { sentry3.LLM()->TextToSpeech(String("value").c_str()); }` |

## Sentry1 Blocks

| Block Type | Connection | Purpose |
|---|---|---|
| `sentry1_init_i2c` | Statement | I2C initialization |
| `sentry1_init_uart` | Statement | UART initialization |
| `sentry1_set_led` | Statement | Indicator colors |
| `sentry1_vision_control` | Statement | Start/stop supported algorithm |
| `sentry1_set_region_param` | Statement | Color sampling region |
| `sentry1_set_blob_param` | Statement | Blob size and color |
| `sentry1_camera_awb` | Statement | White balance |
| `sentry1_vision_default` | Statement | Restore algorithm defaults |
| `sentry1_restart` | Statement | Restart sensor |
| `sentry1_sensor_default` | Statement | Restore sensor defaults |
| `sentry1_detected_count` | Value(Number) | Detected target count |
| `sentry1_get_value` | Value(Number) | Numeric result field |
| `sentry1_detected_label` | Value(Boolean) | Label comparison |
| `sentry1_get_qrcode` | Value(String) | QR text |
| `sentry1_vision_status` | Value(Boolean) | Algorithm enabled state |
| `sentry1_update_result` | Value(Number) | Explicit result update |

Sentry1 algorithms: `1` 颜色, `2` 色块, `3` 球体, `4` 线条, `6` 卡片, `7` 人体, `9` 二维码, `11` 运动。Sentry1 只支持单个检测结果。

## Sentry2 Blocks

| Block Type | Connection | Purpose |
|---|---|---|
| `sentry2_init_i2c`, `sentry2_init_uart` | Statement | Initialization |
| `sentry2_set_led`, `sentry2_vision_control` | Statement | Indicator and algorithm control |
| `sentry2_set_param_num` | Statement | Maximum result count |
| `sentry2_set_region_param`, `sentry2_set_blob_param`, `sentry2_set_label_param` | Statement | Color/blob/label parameters |
| `sentry2_set_mode`, `sentry2_set_apriltag_mode`, `sentry2_set_level` | Statement | Algorithm mode and performance |
| `sentry2_camera_zoom`, `sentry2_camera_awb` | Statement | Camera setup |
| `sentry2_set_coordinate` | Statement | Pixel/percentage coordinates |
| `sentry2_vision_default`, `sentry2_restart`, `sentry2_sensor_default` | Statement | Maintenance |
| `sentry2_screen_config`, `sentry2_screen_fill`, `sentry2_snapshot` | Statement | Screen and image capture |
| `sentry2_detected_count`, `sentry2_get_value` | Value(Number) | Numeric results |
| `sentry2_detected_label`, `sentry2_vision_status` | Value(Boolean) | Result/status checks |
| `sentry2_get_qrcode` | Value(String) | QR text |
| `sentry2_update_result`, `sentry2_image_rows`, `sentry2_image_cols` | Value(Number) | Update and image dimensions |

Sentry2 algorithms: `1` 颜色, `2` 色块, `3` 标签, `4` 线条, `5` 深度学习, `6` 卡片, `7` 人脸, `8` 20类物体, `9` 二维码, `10` 自定义功能, `11` 运动。

## Sentry3 Blocks

| Block Type | Connection | Purpose |
|---|---|---|
| `sentry3_init_i2c`, `sentry3_init_uart` | Statement | Initialization |
| `sentry3_set_led`, `sentry3_vision_control` | Statement | Indicator and algorithm control |
| `sentry3_set_param_num` | Statement | Maximum result count |
| `sentry3_set_region_param`, `sentry3_set_blob_param`, `sentry3_set_label_param` | Statement | Color/blob/label parameters |
| `sentry3_set_mode`, `sentry3_set_apriltag_mode`, `sentry3_set_barcode_mode` | Statement | General, tag, and barcode modes |
| `sentry3_set_ocr_mode`, `sentry3_set_face_mode`, `sentry3_set_level` | Statement | OCR, face, and performance modes |
| `sentry3_camera_zoom`, `sentry3_camera_awb`, `sentry3_set_coordinate` | Statement | Camera/result setup |
| `sentry3_vision_default`, `sentry3_restart`, `sentry3_sensor_default` | Statement | Maintenance |
| `sentry3_screen_config`, `sentry3_screen_fill`, `sentry3_snapshot` | Statement | Screen and image capture |
| `sentry3_detected_count`, `sentry3_get_value` | Value(Number) | Numeric results |
| `sentry3_detected_label`, `sentry3_vision_status` | Value(Boolean) | Result/status checks |
| `sentry3_get_string` | Value(String) | Face/QR/barcode/OCR/license text |
| `sentry3_update_result`, `sentry3_image_rows`, `sentry3_image_cols` | Value(Number) | Update and dimensions |
| `sentry3_wifi_connect`, `sentry3_wifi_close` | Statement | Cloud WiFi connection |
| `sentry3_llm_mode`, `sentry3_llm_model`, `sentry3_llm_api_key` | Statement | Large-model access |
| `sentry3_llm_prompt`, `sentry3_llm_voice`, `sentry3_llm_thinking` | Statement | Large-model behavior |
| `sentry3_llm_chat` | Value(String) | Send text and return answer |
| `sentry3_llm_tts` | Statement | Text-to-speech |

Sentry3 algorithms: `1` 颜色, `2` 色块, `3` 标签, `4` 线条, `5` 深度学习, `7` 人脸, `8` 80类物体, `9` 二维码, `10` 条形码, `12` 文字, `13` 手势姿态, `14` 车牌。卡片与人体姿态未加入，因为官方资料标记为待集成。

## Options

| Parameter | Values |
|---|---|
| ACTION | `BEGIN`, `END` |
| INFO | `kXValue`, `kYValue`, `kWidthValue`, `kHeightValue`, `kLabel`, `kRValue`, `kGValue`, `kBValue` |
| COLOR | `1` black, `2` white, `3` red, `4` green, `5` blue, `6` yellow |
| LEVEL | `kLevelDefault`, `kLevelSpeed`, `kLevelBalance`, `kLevelAccuracy` |
| LLM MODE | `kModeClose`, `kModeChat`, `kModeImage`, `kModeTalk`, `kModeASR`, `kModeTTS` |

## Example

```text
arduino_setup()
    sentry3_init_uart("sentry3", Serial, math_number(115200))
    sentry3_vision_control($sentry3, BEGIN, 10)

arduino_loop()
    controls_if()
        @IF0: logic_compare(sentry3_detected_count($sentry3, 10), GT, math_number(0))
        @DO0:
            serial_println(Serial, sentry3_get_string($sentry3, 10, math_number(1)))
```

All `input_value` parameters require nested value blocks such as `math_number`, `text`, or `logic_boolean`; do not use bare literals in value slots.
## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SERIAL | ${board.serialPort} | sentry1_init_uart |
| DETECTED | kLedClose, kLedRed, kLedGreen, kLedYellow, kLedBlue, kLedPurple, kLedCyan, kLedWhite | sentry1_set_led |
| UNDETECTED | kLedClose, kLedRed, kLedGreen, kLedYellow, kLedBlue, kLedPurple, kLedCyan, kLedWhite | sentry1_set_led |
| ACTION | BEGIN, END | sentry1_vision_control |
| VISION | 1, 2, 3, 4, 6, 7, 9, 11 | sentry1_vision_control |
| COLOR | 1, 2, 3, 4, 5, 6 | sentry1_set_blob_param |
| AWB | kAutoWhiteBalance, kLockWhiteBalance, kWhiteLight, kYellowLight | sentry1_camera_awb |
| INFO | kXValue, kYValue, kWidthValue, kHeightValue, kLabel, kRValue, kGValue, kBValue | sentry1_get_value |
| VISION | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 | sentry2_vision_control |
| MODE | 0, 1, 2 | sentry2_set_apriltag_mode |
| LEVEL | kLevelDefault, kLevelSpeed, kLevelBalance, kLevelAccuracy | sentry2_set_level |
| ZOOM | kZoomDefault, kZoom1, kZoom2, kZoom3, kZoom4, kZoom5 | sentry2_camera_zoom |
| COORDINATE | kAbsoluteCoordinate, kPercentageCoordinate | sentry2_set_coordinate |
| DEST | kSnapshot2SD, kSnapshot2Uart, kSnapshot2Usb, kSnapshot2Wifi | sentry2_snapshot |
| SOURCE | kSnapshotFromCamera, kSnapshotFromScreen | sentry2_snapshot |
| FORMAT | kSnapshotTypeRGB565, kSnapshotTypeJPEG, kSnapshotTypeJPEGBase64 | sentry2_snapshot |
| VISION | 1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14 | sentry3_vision_control |
| MODE | 0, 1, 2, 3, 4 | sentry3_set_apriltag_mode |
| MODE | 2, 4, 8, 14 | sentry3_set_barcode_mode |
| MODE | 0, 1 | sentry3_set_ocr_mode |
| MODE | 1, 2, 4, 7 | sentry3_set_face_mode |
| VISION | 7, 9, 10, 12, 14 | sentry3_get_string |
| MODE | kModeClose, kModeChat, kModeImage, kModeTalk, kModeASR, kModeTTS | sentry3_llm_mode |

## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    sentry1_init_i2c("sentry1", math_number(0))
```
