# ESP32Cam camera

Blockly bindings for the `yoursunny/esp32cam` OV2640 camera library.

## Library Info
- **Name**: @aily-project/lib-esp32cam
- **Version**: 1.0.0
- **Frame variable type**: `Esp32camFrame`
- **Web server variable type**: `WebServer`

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|---|---|---|---|---|
| `esp32cam_init` | Statement | PINS(dropdown), RESOLUTION(dropdown), FORMAT(dropdown), QUALITY(input_value), BUFFER_COUNT(input_value) | `esp32cam_init(AiThinker, "320,240", JPEG, math_number(80), math_number(2))` | `{ ↵ esp32cam::Config esp32camConfig; ↵ esp32camConfig.setPins(esp32cam::pins::AiThinker); ↵ esp32camConfig.setResolution(esp32cam::Resolution::find(320, 240)); ↵ esp32camConfig.setBufferCount(1); ↵ esp32camConfig.setJpeg(1); ↵ _ailyEsp32camReady = esp32cam::Camera.begin(esp32camConfig); ↵ }` |
| `esp32cam_end` | Statement | (none) | `esp32cam_end()` | `esp32cam::Camera.end(); ↵ _ailyEsp32camReady = false;` |
| `esp32cam_is_ready` | Value Boolean | (none) | `esp32cam_is_ready()` | `_ailyEsp32camReady` |
| `esp32cam_set_logger` | Statement | SERIAL(dropdown) | `esp32cam_set_logger(Serial)` | `esp32cam::setLogger(SERIAL);` |
| `esp32cam_update_resolution` | Statement | RESOLUTION(dropdown) | `esp32cam_update_resolution("640,480")` | `esp32cam::Camera.update([&](esp32cam::Settings& settings) { ↵ settings.resolution = esp32cam::Resolution::find(160, 120); ↵ }, 500);` |
| `esp32cam_update_image` | Statement | BRIGHTNESS(input_value), CONTRAST(input_value), SATURATION(input_value) | `esp32cam_update_image(math_number(0), math_number(0), math_number(0))` | `esp32cam::Camera.update([&](esp32cam::Settings& settings) { ↵ settings.brightness = 1; ↵ settings.contrast = 1; ↵ settings.saturation = 1; ↵ });` |
| `esp32cam_update_gain` | Statement | GAIN(input_value) | `esp32cam_update_gain(math_number(-2))` | `esp32cam::Camera.update([&](esp32cam::Settings& settings) { ↵ settings.gain = 1; ↵ });` |
| `esp32cam_update_light_mode` | Statement | MODE(dropdown) | `esp32cam_update_light_mode(AUTO)` | `esp32cam::Camera.update([&](esp32cam::Settings& settings) { ↵ settings.lightMode = esp32cam::LightMode::NONE; ↵ });` |
| `esp32cam_update_special_effect` | Statement | EFFECT(dropdown) | `esp32cam_update_special_effect(NONE)` | `esp32cam::Camera.update([&](esp32cam::Settings& settings) { ↵ settings.specialEffect = esp32cam::SpecialEffect::NONE; ↵ });` |
| `esp32cam_update_flip` | Statement | HMIRROR(field_checkbox), VFLIP(field_checkbox) | `esp32cam_update_flip(FALSE, FALSE)` | `esp32cam::Camera.update([&](esp32cam::Settings& settings) { ↵ settings.hmirror = false; ↵ settings.vflip = false; ↵ });` |
| `esp32cam_update_corrections` | Statement | RAW_GMA(field_checkbox), LENS_CORRECTION(field_checkbox) | `esp32cam_update_corrections(TRUE, TRUE)` | `esp32cam::Camera.update([&](esp32cam::Settings& settings) { ↵ settings.rawGma = true; ↵ settings.lensCorrection = true; ↵ });` |
| `esp32cam_status_number` | Value Number | PROPERTY(dropdown) | `esp32cam_status_number(WIDTH)` | `esp32cam::Camera.status().resolution.getWidth()` |
| `esp32cam_status_boolean` | Value Boolean | PROPERTY(dropdown) | `esp32cam_status_boolean(HMIRROR)` | `esp32cam::Camera.status().hmirror` |
| `esp32cam_frame_create` | Statement | VAR(field_input) | `esp32cam_frame_create("frame")` | `frame.reset();` |
| `esp32cam_frame_capture` | Statement | VAR(field_variable) | `esp32cam_frame_capture($frame)` | `frame = esp32cam::capture();` |
| `esp32cam_frame_available` | Value Boolean | VAR(field_variable) | `esp32cam_frame_available($frame)` | `static_cast<bool>(frame)` |
| `esp32cam_frame_info` | Value Number | VAR(field_variable), PROPERTY(dropdown) | `esp32cam_frame_info($frame, WIDTH)` | `(frame ? frame->getWidth() : 0)` |
| `esp32cam_frame_format_is` | Value Boolean | VAR(field_variable), FORMAT(dropdown) | `esp32cam_frame_format_is($frame, JPEG)` | `(frame && frame->isJpeg())` |
| `esp32cam_frame_convert` | Statement | VAR(field_variable), FORMAT(dropdown), QUALITY(input_value) | `esp32cam_frame_convert($frame, JPEG, math_number(80))` | `if (frame) { ↵ frame->toJpeg(1); ↵ }` |
| `esp32cam_frame_write_serial` | Value Boolean | VAR(field_variable), SERIAL(dropdown), TIMEOUT(input_value) | `esp32cam_frame_write_serial($frame, Serial, math_number(10000))` | `(frame ? frame->writeTo(SERIAL, 1) : false)` |
| `esp32cam_frame_release` | Statement | VAR(field_variable) | `esp32cam_frame_release($frame)` | `frame.reset();` |
| `esp32cam_webserver_send_frame` | Statement | SERVER(field_variable), VAR(field_variable), TIMEOUT(input_value) | `esp32cam_webserver_send_frame($server, $frame, math_number(10000))` | `if (frame) { ↵ server.setContentLength(frame->size()); ↵ server.send(200, frame->isBmp() ? "image/bmp" : (frame->isJpeg() ? "image/jpeg" : "application/octet-stream")); ↵ frame->writeTo(server.client(), 1); ↵ }` |
| `esp32cam_webserver_stream_mjpeg` | Value Number | SERVER(field_variable), MIN_INTERVAL(input_value), MAX_FRAMES(input_value), FRAME_TIMEOUT(input_value) | `esp32cam_webserver_stream_mjpeg($server, math_number(0), math_number(-1), math_number(10000))` | `esp32camStreamMjpeg(server, 1, 1, 1)` |

## Parameter Options

- `PINS`: `AUTO`, `AiThinker`, `XiaoSense`, `S3N16R8`, `FreeNove`, `M5Camera`, `M5CameraLED`, `TTGO`.
- `FORMAT`: initialization supports `JPEG`, `RGB`, `YUV`, `GRAYSCALE`; frame conversion supports `JPEG`, `BMP`.
- `MODE`: `NONE`, `AUTO`, `SUNNY`, `CLOUDY`, `OFFICE`, `HOME`.
- `EFFECT`: `NONE`, `NEGATIVE`, `BLACKWHITE`, `REDDISH`, `GREENISH`, `BLUISH`, `ANTIQUE`.
- Status and frame-property dropdown values are documented by their visible labels.

## Notes

- JPEG quality: 0 worst to 100 best. Buffer count is clamped to at least 1.
- Runtime brightness, contrast, saturation: -2 to 2.
- Gain: manual 1..31, or AGC ceiling -2, -4, -8, -16, -32, -64, -128. Do not use 0.
- A runtime resolution must not exceed the initialization resolution.
- A captured frame owns scarce camera memory. Release it when no longer needed.
- MJPEG streaming is blocking and returns after the client disconnects or `MAX_FRAMES` is reached; `-1` is unlimited.

## Minimal ABS Example

```text
arduino_setup()
    esp32cam_frame_create("frame")
    esp32cam_init(AiThinker, "320,240", JPEG, math_number(80), math_number(2))

arduino_loop()
    esp32cam_frame_capture(variables_get($frame))
    controls_if(esp32cam_frame_available(variables_get($frame)))
        serial_println(Serial, esp32cam_frame_info(variables_get($frame), SIZE))
        esp32cam_frame_release(variables_get($frame))
```
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    esp32cam_init(AiThinker, "320,240", JPEG, math_number(80), math_number(2))
```
