# ESP32 camera web server

ESP32 camera network server library supports multiple ESP32 development boards to stream camera images through WiFi

## Library Info
- **Name**: @aily-project/lib-esp32-camera-webserver
- **Version**: 1.2.5

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_camera_webserver_init` | Statement | MODEL(dropdown), RESOLUTION(dropdown), PIXEL_FORMAT(dropdown) | `esp32_camera_webserver_init(CAMERA_MODEL_AI_THINKER, FRAMESIZE_UXGA, PIXFORMAT_JPEG)` | `camera_config_t config; ↵ config.ledc_channel = LEDC_CHANNEL_0; ↵ config.ledc_timer = LEDC_TIMER_0; ↵ config.pin_d0 = Y2_GPIO_NUM; ↵ config.pin_d1 = Y3_GPIO_NUM; ↵ config.pin_d2 = Y4_GPIO_NUM; ↵ config.pin_d3 = Y5_GPIO_NUM; ↵ config.pin_d4 = Y6_GPIO_NUM; ↵ config.pin_d5 = Y7_GPIO_NUM; ↵ config.pin_d6 = Y8_GPIO_NUM; ↵ config.pin_d7 = Y9_GPIO_NUM; ↵ config.pin_xclk = XCLK_GPIO_NUM; ↵ config.pin_pclk = PCLK_GPIO_NUM; ↵ config.pin_vsync = VSYNC_GPIO_NUM; ↵ config.pin_href = HREF_GPIO_NUM; ↵ config.pin_sccb_sda = SIOD_GPIO_NUM; ↵ config.pin_sccb_scl = SIOC_GPIO_NUM; ↵ config.pin_pwdn = PWDN_GPIO_NUM; ↵ config.pin_reset = RESET_GPIO_NUM; ↵ config.xclk_freq_hz = 20000000; ↵ config.frame_size = FRAMESIZE_UXGA; ↵ config.pixel_format = PIXFORMAT_JPEG; ↵ config.grab_mode = CAMERA_GRAB_WHEN_EMPTY; ↵ config.fb_location = CAMERA_FB_IN_PSRAM; ↵ config.jpeg_quality = 12; ↵ config.fb_count = 1; ↵ if(config.pixel_format == PIXFORMAT_JPEG){ ↵ if(psramFound()){ ↵ config.jpeg_quality = 10; ↵ config.fb_count = 2; ↵ config.grab_mode = CAMERA_GRAB_LATEST; ↵ } else { ↵ config.frame_size = FRAMESIZE_SVGA; ↵ config.fb_location = CAMERA_FB_IN_DRAM; ↵ } ↵ } else { ↵ if(!psramFound()){ ↵ config.fb_location = CAMERA_FB_IN_DRAM; ↵ } ↵ #if CONFIG_IDF_TARGET_ESP32S3 ↵ config.fb_count = 2; ↵ #endif ↵ } ↵ #if defined(CAMERA_MODEL_ESP_EYE) ↵ pinMode(13, INPUT_PULLUP); ↵ pinMode(14, INPUT_PULLUP); ↵ #endif ↵ esp32_camera_print_pin_diagnostics(&config, "CAMERA_MODEL_AI_THINKER"); ↵ esp_err_t err = esp_camera_init(&config); ↵ if (err != ESP_OK) { ↵ Serial.printf("Camera init failed with error 0x%x\n", err); ↵ esp32_camera_print_error_diagnostics(err); ↵ return; ↵ } ↵ sensor_t * s = esp_camera_sensor_get(); ↵ esp32_camera_print_sensor_diagnostics(); ↵ // 检查用户是否设置了翻转参数，如果没有则应用默认值 ↵ // 注意：我们通过检查sensor的默认值来判断用户是否进行了设置 ↵ if (s->id.PID == OV3660_PID) { ↵ // 仅在用户未设置时应用默认值 ↵ if(s->status.vflip == 0 && s->status.hmirror == 0) { ↵ s->set_vflip(s, 1); ↵ } ↵ s->set_brightness(s, 1); ↵ s->set_saturation(s, -2); ↵ } ↵ // 使用用户在初始化块中设置的分辨率，不再强制修改为QVGA ↵ #if defined(CAMERA_MODEL_M5STACK_WIDE) &#124;&#124; defined(CAMERA_MODEL_M5STACK_ESP32CAM) ↵ // 仅在用户未设置时应用默认值 ↵ if(s->status.vflip == 0) { ↵ s->set_vflip(s, 1); ↵ } ↵ if(s->status.hmirror == 0) { ↵ s->set_hmirror(s, 1); ↵ } ↵ #endif ↵ #if defined(CAMERA_MODEL_ESP32S3_EYE) ↵ // 仅在用户未设置时应用默认值 ↵ if(s->status.vflip == 0) { ↵ s->set_vflip(s, 1); ↵ } ↵ #endif ↵ int ledPin = -1; ↵ #if defined(LED_GPIO_NUM) ↵ ledPin = LED_GPIO_NUM; ↵ #endif ↵ startCameraServer(ledPin); ↵ Serial.println("Camera initialized successfully"); ↵ Serial.print("Camera Ready! Use 'http://"); ↵ Serial.print(WiFi.localIP()); ↵ Serial.println("' to connect");` |
| `esp32_camera_print_diagnostics` | Statement | (none) | `esp32_camera_print_diagnostics()` | `esp32_camera_print_sensor_diagnostics();` |
| `esp32_camera_custom_pins` | Statement | DATA_PINS(input_value), XCLK(input_value), PCLK(input_value), VSYNC(input_value), HREF(input_value), SDA(input_value), SCL(input_value), PWDN(input_value), RESET(input_value) | `esp32_camera_custom_pins(text("value"), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `String dataPinsStr = "value"; ↵ int dataPins[8]; ↵ int pinIndex = 0; ↵ int startPos = 0; ↵ for(int i = 0; i <= dataPinsStr.length(); i++){ ↵ if(i == dataPinsStr.length() &#124;&#124; dataPinsStr[i] == ','){ ↵ dataPins[pinIndex++] = dataPinsStr.substring(startPos, i).toInt(); ↵ startPos = i + 1; ↵ } ↵ }` |
| `esp32_camera_set_quality` | Statement | QUALITY(field_number) | `esp32_camera_set_quality(10)` | `{ ↵ sensor_t * s = esp_camera_sensor_get(); ↵ s->set_quality(s, 10); ↵ }` |
| `esp32_camera_set_flip` | Statement | VFLIP(field_checkbox), HMIRROR(field_checkbox) | `esp32_camera_set_flip(FALSE, FALSE)` | `{ ↵ sensor_t * s = esp_camera_sensor_get(); ↵ s->set_vflip(s, 0); ↵ s->set_hmirror(s, 0); ↵ }` |
| `esp32_camera_set_brightness` | Statement | BRIGHTNESS(field_number), CONTRAST(field_number), SATURATION(field_number) | `esp32_camera_set_brightness(0, 0, 0)` | `{ ↵ sensor_t * s = esp_camera_sensor_get(); ↵ s->set_brightness(s, 0); ↵ s->set_contrast(s, 0); ↵ s->set_saturation(s, 0); ↵ }` |
| `esp32_camera_capture` | Value | (none) | `esp32_camera_capture()` | `((unsigned long)esp_camera_fb_get())` |
| `esp32_camera_frame_buffer` | Value | FRAME(input_value) | `esp32_camera_frame_buffer(math_number(0))` | `(1 ? ((camera_fb_t*)1)->buf : NULL)` |
| `esp32_camera_frame_len` | Value | FRAME(input_value) | `esp32_camera_frame_len(math_number(0))` | `(1 ? ((camera_fb_t*)1)->len : 0)` |
| `esp32_camera_frame_width` | Value | FRAME(input_value) | `esp32_camera_frame_width(math_number(0))` | `(1 ? ((camera_fb_t*)1)->width : 0)` |
| `esp32_camera_frame_height` | Value | FRAME(input_value) | `esp32_camera_frame_height(math_number(0))` | `(1 ? ((camera_fb_t*)1)->height : 0)` |
| `esp32_camera_release` | Statement | FRAME(input_value) | `esp32_camera_release(math_number(0))` | `if(1) { ↵ camera_fb_t* _fb = (camera_fb_t*)1; ↵ // 额外的安全检查 ↵ if(_fb->buf && _fb->len > 0) { ↵ esp_camera_fb_return(_fb); ↵ } ↵ }` |
| `esp32_camera_send_serial` | Statement | FRAME(input_value) | `esp32_camera_send_serial(math_number(0))` | `camera_fb_t* _fb = (camera_fb_t*)1; ↵ if(_fb) { ↵ if(_fb->buf && _fb->len > 0) { ↵ uint8_t* _jpg_buf = _fb->buf; ↵ size_t _jpg_len = _fb->len; ↵ bool _jpg_allocated = false; ↵ if(_fb->format != PIXFORMAT_JPEG) { ↵ _jpg_buf = NULL; ↵ _jpg_len = 0; ↵ _jpg_allocated = frame2jpg(_fb, 80, &_jpg_buf, &_jpg_len); ↵ } ↵ if(_jpg_buf && _jpg_len > 0) { ↵ // 发送帧开始标识 ↵ Serial.println("===FRAME_START==="); ↵ // 发送帧长度信息 ↵ Serial.print("LEN:"); ↵ Serial.println(_jpg_len); ↵ // 发送JPEG数据 ↵ Serial.write(_jpg_buf, _jpg_len); ↵ // 发送帧结束标识 ↵ Serial.println("===FRAME_END==="); ↵ Serial.flush(); ↵ } ↵ if(_jpg_allocated && _jpg_buf) { ↵ free(_jpg_buf); ↵ } ↵ } ↵ // 自动释放帧内存 ↵ esp_camera_fb_return(_fb); ↵ }` |
| `esp32_camera_capture_and_encode_base64` | Value | (none) | `esp32_camera_capture_and_encode_base64()` | `capture_and_encode_base64()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODEL | CAMERA_MODEL_AI_THINKER, CAMERA_MODEL_M5STACK_PSRAM, CAMERA_MODEL_M5STACK_WIDE, CAMERA_MODEL_ESP_EYE, CAMERA_MODEL_DFRobot_FireBeetle2_ESP32S3, CAMERA_MODEL_ESP32S3_EYE, CAMERA_MODEL_XIAO_ESP32S3, CAMERA_MODEL_ESP32S3_WROOM_CAM, CAMERA_MODEL_ESP32_AIOT_KIT, CAMERA_MODEL_ESP32_AIOT_KIT_GC2145, CUSTOM | esp32_camera_webserver_init |
| RESOLUTION | FRAMESIZE_UXGA, FRAMESIZE_SXGA, FRAMESIZE_XGA, FRAMESIZE_SVGA, FRAMESIZE_VGA, FRAMESIZE_CIF, FRAMESIZE_QVGA, FRAMESIZE_HQVGA, FRAMESIZE_QQVGA | esp32_camera_webserver_init |
| PIXEL_FORMAT | PIXFORMAT_JPEG, PIXFORMAT_RGB565, PIXFORMAT_YUV422, PIXFORMAT_GRAYSCALE | esp32_camera_webserver_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_camera_webserver_init(CAMERA_MODEL_AI_THINKER, FRAMESIZE_UXGA, PIXFORMAT_JPEG)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_camera_capture())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.

## GC2145 Note

`CAMERA_MODEL_ESP32_AIOT_KIT_GC2145` uses `PIXFORMAT_RGB565` and `FRAMESIZE_VGA` because GC2145 does not support native JPEG output. Streaming still works through software JPEG conversion in the web server.

## ESP32_AIOT_Kit GC2145 Pins

`CAMERA_MODEL_ESP32_AIOT_KIT_GC2145` uses D0-D7: `16,17,18,12,8,9,10,11`, XCLK `15`, PCLK `13`, VSYNC `6`, HREF `7`, SIOD/SIOC `4/5`.
