# K10摄像头与AI识别

UNIHIKER K10 摄像头与 AI 识别库，支持拍照、人脸/猫脸检测、运动检测、二维码扫描和人脸识别。

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-camera-ai
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_camera_init` | Statement | (none) | `k10_camera_init()` | `k10.initBgCamerImage(); k10.creatCanvas(); k10.setBgCamerImage(true);` |
| `k10_camera_show` | Statement | (none) | `k10_camera_show()` | `k10.setBgCamerImage(show);` |
| `k10_photo_save` | Statement | FILENAME(input_value) | `k10_photo_save(text("photo.bmp"))` | `k10.photoSaveToTFCard(path);` |
| `k10_ai_init` | Statement | MODE(dropdown) | `k10_ai_init(DETECTION_FACE)` | `ai.initAi(); ai.switchAiMode(ai.DETECTION_FACE);` |
| `k10_ai_switch_mode` | Statement | MODE(dropdown) | `k10_ai_switch_mode(DETECTION_CAT)` | `ai.switchAiMode(ai.DETECTION_CAT);` |
| `k10_ai_is_detected` | Value(Boolean) | (none) | `k10_ai_is_detected()` | `ai.isDetectContent(AIRecognition::TYPE)` |
| `k10_ai_get_face_data` | Value(Number) | DATA(dropdown) | `k10_ai_get_face_data(x)` | `ai.getFaceData(AIRecognition::x)` |
| `k10_ai_get_cat_data` | Value(Number) | DATA(dropdown) | `k10_ai_get_cat_data(x)` | `ai.getCatData(AIRecognition::x)` |
| `k10_ai_get_qrcode` | Value(String) | (none) | `k10_ai_get_qrcode()` | `ai.getQrCodeContent()` |
| `k10_ai_set_motion_threshold` | Statement | THRESHOLD(input_value) | `k10_ai_set_motion_threshold(math_number(20))` | `ai.setMotinoThreshold(val);` |
| `k10_ai_face_recognized` | Value(Boolean) | (none) | `k10_ai_face_recognized()` | `ai.isRecognized()` |
| `k10_ai_get_face_id` | Value(Number) | (none) | `k10_ai_get_face_id()` | `ai.getRecognitionID()` |
| `k10_ai_face_cmd` | Statement | CMD(dropdown), ID(input_value) | `k10_ai_face_cmd(add, math_number(1))` | `ai.sendFaceCmd(cmd);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | DETECTION_FACE(人脸检测), DETECTION_CAT(猫脸检测), DETECTION_MOTION(运动检测), DETECTION_QRCODE(二维码识别), RECOGNITION_FACE(人脸识别) | AI 模式 |
| DATA | x(X坐标), y(Y坐标), w(宽度), h(高度), confidence(置信度) | 检测数据类型 |
| CMD | add(录入人脸), delete(删除人脸) | 人脸识别命令 |

## ABS Examples

### 人脸检测
```
arduino_setup()
    k10_ai_init(DETECTION_FACE)
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: k10_ai_is_detected()
        @DO0:
            serial_print(Serial, text("Face at X:"))
            serial_print(Serial, k10_ai_get_face_data(x))
            serial_print(Serial, text(" Y:"))
            serial_println(Serial, k10_ai_get_face_data(y))
    time_delay(math_number(100))
```

### 二维码扫描
```
arduino_setup()
    k10_ai_init(DETECTION_QRCODE)
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: k10_ai_is_detected()
        @DO0:
            serial_println(Serial, k10_ai_get_qrcode())
    time_delay(math_number(100))
```

### 人脸识别（录入与比对）
```
arduino_setup()
    k10_ai_init(RECOGNITION_FACE)
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: k10_ai_face_recognized()
        @DO0:
            serial_print(Serial, text("Recognized ID: "))
            serial_println(Serial, k10_ai_get_face_id())
    time_delay(math_number(100))
```

## Notes

1. **初始化**: `k10_ai_init` 会自动初始化摄像头、屏幕和 AI 模块，放在 `arduino_setup()` 中
2. **摄像头与AI关系**: 使用 AI 功能时会自动初始化摄像头，无需单独调用 `k10_camera_init`
3. **模式切换**: 运行时可用 `k10_ai_switch_mode` 切换不同的 AI 检测模式
4. **拍照**: `k10_photo_save` 需要 TF 卡，会自动初始化 SD 文件系统
5. **人脸识别**: 使用 `k10_ai_face_cmd(add, ID)` 录入人脸，之后可用 `k10_ai_face_recognized()` 和 `k10_ai_get_face_id()` 进行比对
