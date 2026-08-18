# Seeed SSCMA Core

Seeed SSCMA microcontroller AI inference core library, a local AI visual processing engine optimized for ESP32-S3. Supports a variety of AI algorithms such as target detection, image classification, key point detectio...

## Library Info
- **Name**: @aily-project/lib-sscma-micro-core
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `sscma_core_begin` | Statement | (none) | `sscma_core_begin()` | `MA_RETURN_IF_UNEXPECTED(camera.begin(SSCMAMicroCore::VideoCapture::DefaultCameraConfigXIAOS3)); ↵ MA_RETURN_IF_UNEXPECTED(ai.begin(SSCMAMicroCore::Config::DefaultConfig));` |
| `sscma_core_set_loop_task_stack_size` | Statement | SIZE(input_value) | `sscma_core_set_loop_task_stack_size(math_number(0))` | `SET_LOOP_TASK_STACK_SIZE(1);` |
| `sscma_core_invoke` | Statement | FRAME(input_value) | `sscma_core_invoke(math_number(0))` | `MA_RETURN_IF_UNEXPECTED(ai.invoke(1));` |
| `sscma_core_get_managed_frame` | Value | (none) | `sscma_core_get_managed_frame()` | `camera.getManagedFrame()` |
| `sscma_core_register_boxes_callback` | Hat | HANDLER(input_statement) | `sscma_core_register_boxes_callback()` | `void sscma_core_boxes_ai(const std::vector<SSCMAMicroCore::Box>& boxes, void* user_context) { ↵ } ↵ ai.registerBoxesCallback(sscma_core_boxes_ai);` |
| `sscma_core_register_classes_callback` | Hat | HANDLER(input_statement) | `sscma_core_register_classes_callback()` | `void sscma_core_classes_ai(const std::vector<SSCMAMicroCore::Class>& classes, void* user_context) { ↵ } ↵ ai.registerClassesCallback(sscma_core_classes_ai);` |
| `sscma_core_register_points_callback` | Hat | HANDLER(input_statement) | `sscma_core_register_points_callback()` | `void sscma_core_points_ai(const std::vector<SSCMAMicroCore::Point>& points, void* user_context) { ↵ } ↵ ai.registerPointsCallback(sscma_core_points_ai);` |
| `sscma_core_register_keypoints_callback` | Hat | HANDLER(input_statement) | `sscma_core_register_keypoints_callback()` | `void sscma_core_keypoints_ai(const std::vector<SSCMAMicroCore::Keypoints>& keypoints, void* user_context) { ↵ } ↵ ai.registerKeypointsCallback(sscma_core_keypoints_ai);` |
| `sscma_core_register_perf_callback` | Statement | HANDLER(input_statement) | `sscma_core_register_perf_callback()` | `void sscma_core_perf_ai(const SSCMAMicroCore::Perf& perf, void* user_context) { ↵ } ↵ ai.registerPerfCallback(sscma_core_perf_ai);` |
| `sscma_core_get_boxes` | Statement | HANDLER(input_statement) | `sscma_core_get_boxes()` | `for (const auto& box : ai.getBoxes()) { ↵ // 处理每个边界框 box ↵ }` |
| `sscma_core_get_boxes_info` | Value | PROPERTY(dropdown) | `sscma_core_get_boxes_info(x)` | `box.x` |
| `sscma_core_get_classes` | Statement | HANDLER(input_statement) | `sscma_core_get_classes()` | `for (const auto& cls : ai.getClasses()) { ↵ // 处理每个分类结果 cls ↵ }` |
| `sscma_core_get_classes_info` | Value | PROPERTY(dropdown) | `sscma_core_get_classes_info(score)` | `cls.score` |
| `sscma_core_get_points` | Statement | HANDLER(input_statement) | `sscma_core_get_points()` | `for (const auto& point : ai.getPoints()) { ↵ // 处理每个点检测结果 point ↵ }` |
| `sscma_core_get_points_info` | Value | PROPERTY(dropdown) | `sscma_core_get_points_info(x)` | `point.x` |
| `sscma_core_get_keypoints` | Statement | HANDLER(input_statement) | `sscma_core_get_keypoints()` | `for (const auto& kp : ai.getKeypoints()) { ↵ // 处理每个关键点 keypoint ↵ }` |
| `sscma_core_get_keypoints_info` | Value | PROPERTY(dropdown) | `sscma_core_get_keypoints_info(x)` | `kp.box.x` |
| `sscma_core_get_keypoints_points` | Statement | HANDLER(input_statement) | `sscma_core_get_keypoints_points()` | `for (const auto& point : kp.points) { ↵ // 处理每个点 point ↵ }` |
| `sscma_core_get_keypoints_points_info` | Value | PROPERTY(dropdown) | `sscma_core_get_keypoints_points_info(x)` | `point.x` |
| `sscma_core_get_perf` | Statement | VAR(field_input) | `sscma_core_get_perf("perf")` | `auto perf = ai.getPerf();` |
| `sscma_core_get_perf_info` | Value | VAR(field_variable), PROPERTY(dropdown) | `sscma_core_get_perf_info($perf, preprocess)` | `perf.preprocess` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PROPERTY | x, y, w, h, score, target | sscma_core_get_boxes_info |
| PROPERTY | score, target | sscma_core_get_classes_info |
| PROPERTY | x, y, z, score, target | sscma_core_get_points_info, sscma_core_get_keypoints_points_info |
| PROPERTY | x, y, h, w, score, target | sscma_core_get_keypoints_info |
| PROPERTY | preprocess, inference, postprocess | sscma_core_get_perf_info |

## ABS Examples

### Basic Usage
```
arduino_setup()
    sscma_core_begin()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, sscma_core_get_managed_frame())
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `sscma_core_get_perf("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
