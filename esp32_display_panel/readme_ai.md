# ESP32 Display Panel

Blockly conversion of Espressif `ESP32_Display_Panel` v1.0.4.

## Library Info

- **Name**: @aily-project/lib-esp32-display-panel
- **Version**: 1.0.4
- **Author**: Espressif Systems (Shanghai) Co., Ltd.
- **Source**: https://github.com/esp-arduino-libs/ESP32_Display_Panel
- **License**: Apache-2.0
- **Core**: esp32:esp32; Arduino-ESP32 >= 3.1.0
- **Bundled dependencies**: ESP32_IO_Expander 1.1.1, esp-lib-utils 0.2.3

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp_panel_board_init` | Statement | VAR(field_input), MODEL(dropdown), WIDTH(field_input), HEIGHT(field_input), MISO(field_input), MOSI(field_input), SCLK(field_input), CS(field_input), DC(field_input), RST(field_input), BL(field_input), BL_LEVEL(dropdown), COLOR_MODE(dropdown), FREQUENCY(dropdown) | `esp_panel_board_init("panel", "ST7789", 240, 320, -1, 11, 12, 10, 9, 8, 7, true, false, 40000000)` | `panel.del(); ↵ panel.bus = new esp_panel::drivers::BusSPI(-1, -1, -1, -1, -1); ↵ panel.bus->configSPI_FreqHz(10000000); ↵ panel.lcd = new esp_panel::drivers::LCD_ST7789(panel.bus, 240, 320, 16, -1); ↵ panel.lcd->configColorRGB_Order(false); ↵ if ((-1) >= 0) { ↵ panel.backlight = new esp_panel::drivers::BacklightPWM_LEDC(-1, true); ↵ if (!panel.backlight->begin()) { ↵ delete panel.backlight; ↵ panel.backlight = nullptr; ↵ } else { ↵ panel.backlight->off(); ↵ } ↵ } ↵ panel.ready = panel.lcd->begin(); ↵ if (panel.ready) { ↵ panel.lcd->setDisplayOnOff(true); ↵ if (panel.backlight != nullptr) panel.backlight->on(); ↵ }` |
| `esp_panel_board_delete` | Statement | VAR(field_variable) | `esp_panel_board_delete($panel)` | `panel.del();` |
| `esp_panel_board_ready` | Value | VAR(field_variable) | `esp_panel_board_ready($panel)` | `panel.isReady()` |
| `esp_panel_has_device` | Value | VAR(field_variable), DEVICE(dropdown) | `esp_panel_has_device($panel, LCD)` | `panel.getLCD() != nullptr` |
| `esp_panel_lcd_color_bar` | Statement | VAR(field_variable) | `esp_panel_lcd_color_bar($panel)` | `if (panel.getLCD() != nullptr) panel.getLCD()->colorBarTest();` |
| `esp_panel_lcd_display` | Statement | VAR(field_variable), STATE(dropdown) | `esp_panel_lcd_display($panel, true)` | `if (panel.getLCD() != nullptr) panel.getLCD()->setDisplayOnOff(true);` |
| `esp_panel_lcd_invert` | Statement | VAR(field_variable), STATE(dropdown) | `esp_panel_lcd_invert($panel, true)` | `if (panel.getLCD() != nullptr) panel.getLCD()->invertColor(true);` |
| `esp_panel_lcd_transform` | Statement | VAR(field_variable), OP(dropdown), STATE(dropdown) | `esp_panel_lcd_transform($panel, mirrorX, true)` | `if (panel.getLCD() != nullptr) panel.getLCD()->mirrorX(true);` |
| `esp_panel_lcd_set_gap` | Statement | VAR(field_variable), X(input_value), Y(input_value) | `esp_panel_lcd_set_gap($panel, 0, 0)` | `if (panel.getLCD() != nullptr) { ↵ panel.getLCD()->setGapX(1); ↵ panel.getLCD()->setGapY(1); ↵ }` |
| `esp_panel_bitmap_data` | Value | DATA(field_input) | `esp_panel_bitmap_data("rgb565_data")` | `rgb565_data` |
| `esp_panel_lcd_draw_bitmap` | Statement | VAR(field_variable), X(input_value), Y(input_value), W(input_value), H(input_value), DATA(input_value), TIMEOUT(input_value) | `esp_panel_lcd_draw_bitmap($panel, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(1000))` | `if (panel.getLCD() != nullptr) panel.getLCD()->drawBitmap(1, 1, 1, 1, reinterpret_cast<const uint8_t *>(1), 1);` |
| `esp_panel_lcd_fill_screen` | Statement | VAR(field_variable), COLOR(input_value) | `esp_panel_lcd_fill_screen($panel, 0)` | `if (panel.getLCD() != nullptr) espPanelFillRect(panel.getLCD(), 0, 0, panel.getLCD()->getFrameWidth(), panel.getLCD()->getFrameHeight(), 1);` |
| `esp_panel_lcd_fill_rect` | Statement | VAR(field_variable), X(input_value), Y(input_value), W(input_value), H(input_value), COLOR(input_value) | `esp_panel_lcd_fill_rect($panel, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `espPanelFillRect(panel.getLCD(), 1, 1, 1, 1, 1);` |
| `esp_panel_rgb565` | Value | R(input_value), G(input_value), B(input_value) | `esp_panel_rgb565(255, 255, 255)` | `espPanelRgb565(1, 1, 1)` |
| `esp_panel_lcd_info` | Value | VAR(field_variable), INFO(dropdown) | `esp_panel_lcd_info($panel, WIDTH)` | `(panel.getLCD() != nullptr ? panel.getLCD()->getFrameWidth() : -1)` |
| `esp_panel_touch_read` | Value | VAR(field_variable), TIMEOUT(input_value) | `esp_panel_touch_read($panel, 0)` | `espPanelReadTouch(panel.getTouch(), 1)` |
| `esp_panel_touch_value` | Value | VALUE(dropdown) | `esp_panel_touch_value(x)` | `esp_panel_last_touch_point.x` |
| `esp_panel_touch_transform` | Statement | VAR(field_variable), OP(dropdown), STATE(dropdown) | `esp_panel_touch_transform($panel, mirrorX, true)` | `if (panel.getTouch() != nullptr) panel.getTouch()->mirrorX(true);` |
| `esp_panel_touch_interrupt` | Value | VAR(field_variable) | `esp_panel_touch_interrupt($panel)` | `(panel.getTouch() != nullptr && panel.getTouch()->isInterruptEnabled())` |
| `esp_panel_touch_button` | Value | VAR(field_variable), INDEX(input_value), TIMEOUT(input_value) | `esp_panel_touch_button($panel, 0, 0)` | `(panel.getTouch() != nullptr ? panel.getTouch()->readButtonState(1, 1) : -1)` |
| `esp_panel_backlight_set` | Statement | VAR(field_variable), BRIGHTNESS(input_value) | `esp_panel_backlight_set($panel, 100)` | `if (panel.getBacklight() != nullptr) panel.getBacklight()->setBrightness(1);` |
| `esp_panel_backlight_switch` | Statement | VAR(field_variable), STATE(dropdown) | `esp_panel_backlight_switch($panel, on)` | `if (panel.getBacklight() != nullptr) panel.getBacklight()->on();` |
| `esp_panel_backlight_get` | Value | VAR(field_variable) | `esp_panel_backlight_get($panel)` | `(panel.getBacklight() != nullptr ? panel.getBacklight()->getBrightness() : -1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODEL | AXS15231B, GC9A01, GC9B71, ILI9341, NV3022B, SH8601, SPD2010, ST7789, ST7796, ST77916, ST77922 | Compile-time LCD driver selection; use one init block. |
| WIDTH / HEIGHT | Positive pixel counts | Native LCD resolution. |
| MISO / MOSI / SCLK / CS / DC / RST / BL | ESP32 GPIO numbers; `-1` means unused where supported | SPI, reset and backlight pin assignment. |
| BL_LEVEL | true / false | `true` means HIGH turns the backlight on; `false` means LOW turns it on. |
| COLOR_MODE | false / true | `false` selects RGB order; `true` selects BGR order. |
| FREQUENCY | 10, 20, 27, 40, 55 or 80 MHz | SPI clock frequency. |
| DEVICE | LCD, TOUCH, BACKLIGHT, EXPANDER | Device availability query. |
| OP | mirrorX, mirrorY, swapXY | LCD/touch coordinate transform. |
| STATE | true/false or on/off | Enables, disables or switches a feature. |
| INFO | WIDTH, HEIGHT, COLOR_BITS | LCD frame information. |
| VALUE | x, y, strength | Cached first touch point field. |

## ABS Example

```text
arduino_setup()
    esp_panel_board_init("panel", "ST7789", 240, 320, -1, 11, 12, 10, 9, 8, 7, true, false, 40000000)
    esp_panel_lcd_color_bar($panel)
    esp_panel_backlight_set($panel, 80)

arduino_loop()
    if esp_panel_touch_read($panel, 0)
        serial_print(Serial, esp_panel_touch_value("x"))
        serial_print(Serial, esp_panel_touch_value("y"))
```

## Generation and Configuration Notes

1. The selected LCD controller is a compile-time setting. Use one `esp_panel_board_init` block per project.
2. The generator adds the SPI bus, selected LCD driver and PWM-backlight macros both to generated code and through the project build-macro service so bundled library translation units use the same configuration.
3. The source block initializes a global `AilyESPPanel` wrapper that owns `BusSPI`, the selected `LCD_*` instance and the optional PWM backlight.
4. All device operations guard `getLCD()`, `getTouch()`, or `getBacklight()` against `nullptr`.
5. `esp_panel_lcd_fill_screen` and `esp_panel_lcd_fill_rect` require a 16-bit RGB565 LCD. They return without drawing for other color depths.
6. `esp_panel_lcd_draw_bitmap` accepts a raw buffer symbol. Timeout `0` is asynchronous; use `-1` before reusing or freeing the buffer.
7. Touch X/Y/strength values are valid after `esp_panel_touch_read` returns true. A failed read resets them to `-1`.
8. LCD and touch coordinate transforms are independent; update both when the application needs aligned coordinates.
9. The custom SPI initialization block does not create a touch controller or IO expander. Their availability checks return false until a dedicated configuration block is added.
10. Some panels require manufacturer-specific LCD initialization commands even when the controller model matches. Those command tables are outside the TFT_eSPI-style basic pin configuration.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    esp_panel_board_init("panel", "ST7789", 240, 320, -1, 11, 12, 10, 9, 8, 7, true, false, 40000000)
```
