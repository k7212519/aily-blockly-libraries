# TFT屏幕库 (TFT Screen)

ST7735 TFT屏幕简化库：一键初始化(引脚预设)，绘图/文字/颜色/图片/动画/TF卡流式动画/屏幕信息

## Library Info
- **Name**: @aily-project/lib-tft-screen
- **Version**: 1.0.4

## Pin Configuration (预设，不可更改)

| 引脚 | GPIO | 说明 |
|------|------|------|
| MOSI | 23 | SPI数据输出 |
| SCLK | 18 | SPI时钟 |
| CS   | 5   | 片选 |
| DC   | 4   | 数据/命令 |
| RST  | 19  | 复位 |
| MISO | 19  | SPI数据输入(本屏未用) |

- 驱动: ST7735_DRIVER | 分辨率: 128x160 | SPI: 27MHz | 旋转: 3(横屏) | 颜色: RGB

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tftscr_init` | Statement | (none) | `tftscr_init()` | `tft.init(); ↵ tft.setRotation(3);` |
| `tftscr_fill_screen` | Statement | COLOR(input_value) | `tftscr_fill_screen(tftscr_color(TFT_BLACK))` | `tft.fillScreen(1);` |
| `tftscr_draw_pixel` | Statement | X(input_value), Y(input_value), COLOR(input_value) | `tftscr_draw_pixel(math_number(0), math_number(0), tftscr_color(TFT_WHITE))` | `tft.drawPixel(1, 1, 1);` |
| `tftscr_draw_line` | Statement | X1(input_value), Y1(input_value), X2(input_value), Y2(input_value), COLOR(input_value) | `tftscr_draw_line(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawLine(1, 1, 1, 1, 1);` |
| `tftscr_draw_rect` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), COLOR(input_value) | `tftscr_draw_rect(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawRect(1, 1, 1, 1, 1);` |
| `tftscr_fill_rect` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), COLOR(input_value) | `tftscr_fill_rect(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.fillRect(1, 1, 1, 1, 1);` |
| `tftscr_draw_circle` | Statement | X(input_value), Y(input_value), R(input_value), COLOR(input_value) | `tftscr_draw_circle(math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.drawCircle(1, 1, 1, 1);` |
| `tftscr_fill_circle` | Statement | X(input_value), Y(input_value), R(input_value), COLOR(input_value) | `tftscr_fill_circle(math_number(0), math_number(0), math_number(0), math_number(0))` | `tft.fillCircle(1, 1, 1, 1);` |
| `tftscr_draw_string` | Statement | X(input_value), Y(input_value), TEXT(input_value) | `tftscr_draw_string(math_number(0), math_number(0), text("Hello"))` | `tft.setCursor(1, 1); ↵ tft.print("value");` |
| `tftscr_set_text_color` | Statement | COLOR(input_value) | `tftscr_set_text_color(tftscr_color(TFT_WHITE))` | `tft.setTextColor(1);` |
| `tftscr_set_text_size` | Statement | SIZE(dropdown) | `tftscr_set_text_size(2)` | `tft.setTextSize(1);` |
| `tftscr_color` | Value (Number) | COLOR(dropdown) | `tftscr_color(TFT_RED)` | `TFT_BLACK` |
| `tftscr_color_rgb` | Value (Number) | R(input_value), G(input_value), B(input_value) | `tftscr_color_rgb(math_number(255), math_number(0), math_number(0))` | `tft.color565(1, 1, 1)` |
| `tftscr_width` | Value (Number) | (none) | `tftscr_width()` | `tft.width()` |
| `tftscr_height` | Value (Number) | (none) | `tftscr_height()` | `tft.height()` |
| `tftscr_image` | Value (TftScreenImage) | CUSTOM_IMAGE(field_tftespi_image) | `tftscr_image({"schemaVersion":1,"format":"rgb565","encoding":"rgb565-be","width":160,"height":120,"fps":10,"maxFrames":1,"frameCount":0,"frames":null})` | `#include <TFT_eSPI.h> ↵ #include <SPI.h>` |
| `tftscr_draw_image` | Statement | X(input_value), Y(input_value), IMAGE(input_value) | `tftscr_draw_image(math_number(0), math_number(0), tftscr_image())` | `// No TFT screen image data` |
| `tftscr_animation` | Value (TftScreenAnimation) | CUSTOM_ANIMATION(field_tftespi_animation) | `tftscr_animation({"schemaVersion":1,"format":"rgb565","encoding":"rgb565-be","width":160,"height":120,"fps":10,"maxFrames":10,"frameCount":0,"frames":null})` | `#include <TFT_eSPI.h> ↵ #include <SPI.h>` |
| `tftscr_play_animation` | Statement | X(input_value), Y(input_value), ANIMATION(input_value), PLAY_MODE(dropdown), LOOP(field_checkbox) | `tftscr_play_animation(math_number(0), math_number(0), tftscr_animation(), BLOCKING, FALSE)` | `// No TFT screen animation data` |
| `tftscr_play_tf_animation` | Statement | FILENAME(input_value), BUFFER_KB(input_value) | `tftscr_play_tf_animation(text("/animation.rgb565v"), math_number(48))` | `tftScreenPlayTfAnimation(tft, String("value"), (int32_t)(1));` |
| `tftscr_draw_animation_frame` | Statement | X(input_value), Y(input_value), ANIMATION(input_value), FRAME(input_value) | `tftscr_draw_animation_frame(math_number(0), math_number(0), tftscr_animation(), math_number(0))` | `// No TFT screen animation data` |
| `tftscr_animation_frame_count` | Value (Number) | ANIMATION(input_value) | `tftscr_animation_frame_count(tftscr_animation())` | `0` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SIZE | 1, 2, 3, 4, 5, 6, 7 | 文字大小 |
| COLOR | TFT_BLACK, TFT_WHITE, TFT_RED, TFT_GREEN, TFT_BLUE, TFT_YELLOW, TFT_CYAN, TFT_MAGENTA, TFT_ORANGE, TFT_LIGHTGREY, TFT_DARKGREY, TFT_NAVY, TFT_DARKGREEN, TFT_DARKCYAN, TFT_MAROON, TFT_PINK | 预设颜色 |
| PLAY_MODE | BLOCKING, NON_BLOCKING | 阻塞播放或在主循环中非阻塞播放 |

## Notes

1. **全局对象**: 库自动声明全局对象 `tft` (TFT_eSPI类型)
2. **引脚预设**: 初始化块无需任何参数，引脚配置已固化在编译宏中
3. **编译宏**: `tftscr_init` 自动设置 TFT_eSPI 所需的所有编译宏（TFT_MODEL/TFT_MOSI/TFT_SCLK等）
4. **与原tftespi_setup的区别**: 去掉了所有输入参数，驱动/频率/引脚/旋转全部预设，使用更简洁
5. **颜色块**: `tftscr_color` 提供常用预设色，`tftscr_color_rgb` 支持自定义RGB(0-255)
6. **图片数据**: `tftscr_image` 使用 `field_tftespi_image` 上传 PNG/JPEG/WebP/BMP，默认转换区域为160x120，支持RGB565和RGB332；`IMAGE` 输入需直接连接图片数据块
7. **动画数据**: `tftscr_animation` 使用 `field_tftespi_animation` 上传 GIF/MP4，默认转换区域为160x120，支持RGB565和RGB332
8. **动画连接**: 播放、单帧显示和总帧数块的 `ANIMATION` 输入需直接连接 `tftscr_animation` 数据块
9. **播放方式**: 阻塞模式一次播放完整动画；非阻塞模式应放在主循环中反复执行，并可选择循环播放
10. **TF-card animation**: `tftscr_play_tf_animation` requires the global `SD` filesystem to be initialized first by the `xueersi_esp32_sd` Blockly package. It never calls `SD.begin()`, `SD.end()`, or restarts SPI. GPIO19 is physically shared by panel RESET and TF MISO, so the generator sets `TFT_RST=-1` and relies on the ST7735 software-reset command; it must never drive GPIO19 as an output.
11. **High-FPS path**: ESP32 core 3.3.10 uses CMD18 multi-sector reads. Row-aligned large reads are used, and the default 48 KB buffer can hold a full native RGB565 frame. SD clock selection and mount fallback are owned by `xueersi_esp32_sd`.
12. **Shared-bus safety**: TF playback intentionally does not call TFT_eSPI `initDMA()` / `deInitDMA()`. That DMA implementation directly reinitializes and frees the same IDF HSPI host still owned by Arduino `SPIClass`/`SD`. RGB565 instead uses synchronous batched `pushImage()` calls, keeping card reads and LCD writes serialized without invalidating the mounted card.
13. **Scaling**: Oversized RGB565/RGB332 video is proportionally downscaled and centered. Native-size RGB565 remains preferable for FPS; scaling and MONO1_XBM use synchronous display transfers.
14. **ESP32-only wiring**: TFT and TF time-share the same HSPI instance. TFT CS is 5 and TF CS is 22.
15. **Visible failures**: Missing SD initialization, missing paths, open, AILY validation, frame-read, and allocation failures display a corresponding `TF ERR` instead of returning silently. Missing/open failures also print up to 32 root entries for diagnosis.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    tftscr_init()
```
