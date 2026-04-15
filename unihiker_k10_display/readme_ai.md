# K10屏幕显示

UNIHIKER K10 屏幕显示库，支持绘制点、线、圆、矩形、文字、图片和二维码。

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-display
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_init_screen` | Statement | DIR(dropdown) | `k10_init_screen(2)` | `k10.initScreen(dir); k10.creatCanvas();` |
| `k10_set_background` | Statement | COLOR(field_colour) | `k10_set_background()` | `k10.setScreenBackground(0xFFFFFF);` |
| `k10_draw_point` | Statement | X(input_value), Y(input_value), COLOR(field_colour) | `k10_draw_point(math_number(120), math_number(160))` | `k10.canvas->canvasPoint(x, y, color);` |
| `k10_draw_line` | Statement | X1(input_value), Y1(input_value), X2(input_value), Y2(input_value), COLOR(field_colour) | `k10_draw_line(math_number(0), math_number(0), math_number(240), math_number(320))` | `k10.canvas->canvasLine(x1, y1, x2, y2, color);` |
| `k10_set_line_width` | Statement | WIDTH(field_number) | `k10_set_line_width()` | `k10.canvas->canvasSetLineWidth(w);` |
| `k10_draw_circle` | Statement | X(input_value), Y(input_value), R(input_value), BORDER_COLOR(field_colour), FILL_COLOR(field_colour), FILLED(field_checkbox) | `k10_draw_circle(math_number(120), math_number(160), math_number(40))` | `k10.canvas->canvasCircle(x, y, r, border, fill, filled);` |
| `k10_draw_rectangle` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value), BORDER_COLOR(field_colour), FILL_COLOR(field_colour), FILLED(field_checkbox) | `k10_draw_rectangle(math_number(40), math_number(40), math_number(160), math_number(240))` | `k10.canvas->canvasRectangle(x, y, w, h, border, fill, filled);` |
| `k10_draw_text_simple` | Statement | TEXT(input_value), SIZE(dropdown), COLOR(field_colour) | `k10_draw_text_simple(text("Hello K10"), 2)` | `k10.canvas->canvasText(text, size, color);` |
| `k10_draw_text` | Statement | TEXT(input_value), X(input_value), Y(input_value), COLOR(field_colour), FONT(dropdown), LINE_WIDTH(field_number) | `k10_draw_text(text("Hello"), math_number(0), math_number(0), eCNAndENFont16, 50)` | `k10.canvas->canvasText(text, x, y, color, font, lineWidth, true);` |
| `k10_draw_bitmap` | Statement | X(input_value), Y(input_value), W(input_value), H(input_value) | `k10_draw_bitmap(math_number(0), math_number(0), math_number(100), math_number(100))` | `k10.canvas->canvasDrawBitmap(x, y, w, h, image_data1);` |
| `k10_draw_image` | Statement | PATH(input_value), X(input_value), Y(input_value) | `k10_draw_image(text("S:/photo.bmp"), math_number(0), math_number(0))` | `k10.canvas->canvasDrawImage(x, y, path);` |
| `k10_draw_qrcode` | Statement | CONTENT(input_value) | `k10_draw_qrcode(text("https://www.unihiker.com.cn"))` | `k10.canvasDrawCode(content);` |
| `k10_update_canvas` | Statement | (none) | `k10_update_canvas()` | `k10.canvas->updateCanvas();` |
| `k10_clear_canvas` | Statement | MODE(dropdown) | `k10_clear_canvas(0)` | `k10.canvas->canvasClear();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DIR | 2(正向), 0(反向), 1(左横屏), 3(右横屏) | 屏幕方向 |
| SIZE | 1(小), 2(中), 3(大) | 简化文字字号 |
| FONT | eCNAndENFont16, eCNAndENFont24 | 文字字体大小 |
| MODE | 0(清除全部), 1(清除文字层) | 画布清除模式 |

## ABS Examples

### 在屏幕上画圆并显示文字
```
arduino_setup()
    k10_init_screen(2)

arduino_loop()
    k10_set_background()
    k10_draw_circle(math_number(120), math_number(160), math_number(50))
    k10_draw_text_simple(text("Hello K10"), 2)
    k10_update_canvas()
    time_delay(math_number(1000))
```

### 显示TF卡图片和二维码
```
arduino_setup()
    k10_init_screen(2)

arduino_loop()
    k10_draw_image(text("S:/photo.bmp"), math_number(0), math_number(0))
    k10_draw_qrcode(text("https://www.unihiker.com.cn"))
    k10_update_canvas()
```

## Notes

1. **初始化**: `k10_init_screen` 必须放在 `arduino_setup()` 中，会自动初始化屏幕和画布
2. **刷新机制**: 绘制内容后需调用 `k10_update_canvas()` 才会显示到屏幕（使用摄像头时自动刷新）
3. **画布清除**: `k10_clear_canvas(0)` 清除全部，`k10_clear_canvas(1)` 仅清除文字层
4. **屏幕分辨率**: 竖屏 240×320，横屏 320×240
5. **颜色字段**: COLOR/BORDER_COLOR/FILL_COLOR 为颜色选择器，生成代码自动转换为 0xRRGGBB 格式
