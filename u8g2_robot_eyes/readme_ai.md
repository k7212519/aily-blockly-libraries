# U8g2 Robot Eyes

Animated square or round robot eyes for full-buffer U8g2 displays.

## Library Info
- **Name**: @aily-project/lib-u8g2-robot-eyes
- **Version**: 1.2.16

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `u8g2_robot_eyes_init` | Statement | VAR(field_input), DISPLAY(field_input), STYLE(dropdown), WIDTH(input_value), HEIGHT(input_value), FPS(input_value), AUTO_UPDATE(field_checkbox) | `u8g2_robot_eyes_init("eyes", "u8g2", U8G2_ROBOT_EYES_STYLE_SQUARE, math_number(128), math_number(64), math_number(40), TRUE)` | `eyes.begin(1, 1, 1);` |
| `u8g2_robot_eyes_set_expression` | Statement | VAR(field_variable), EXPRESSION(dropdown), DURATION(input_value) | `u8g2_robot_eyes_set_expression($eyes, HAPPY, math_number(280))` | `eyes.setExpression(U8g2RobotEyes::NEUTRAL, 1);` |
| `u8g2_robot_eyes_blink` | Statement | VAR(field_variable), DURATION(input_value) | `u8g2_robot_eyes_blink($eyes, math_number(180))` | `eyes.blink(1);` |
| `u8g2_robot_eyes_set_gaze` | Statement | VAR(field_variable), X(input_value), Y(input_value), DURATION(input_value) | `u8g2_robot_eyes_set_gaze($eyes, math_number(-6), math_number(3), math_number(180))` | `eyes.setGaze(1, 1, 1);` |
| `u8g2_robot_eyes_center_gaze` | Statement | VAR(field_variable), DURATION(input_value) | `u8g2_robot_eyes_center_gaze($eyes, math_number(180))` | `eyes.centerGaze(1);` |
| `u8g2_robot_eyes_set_auto_blink` | Statement | VAR(field_variable), ENABLED(input_value), INTERVAL(input_value), VARIATION(input_value) | `u8g2_robot_eyes_set_auto_blink($eyes, logic_boolean(TRUE), math_number(3200), math_number(1800))` | `eyes.setAutoBlink(true, 1, 1);` |
| `u8g2_robot_eyes_set_idle` | Statement | VAR(field_variable), ENABLED(input_value), INTERVAL(input_value) | `u8g2_robot_eyes_set_idle($eyes, logic_boolean(TRUE), math_number(1800))` | `eyes.setIdle(true, 1);` |
| `u8g2_robot_eyes_render` | Statement | VAR(field_variable), MODE(dropdown) | `u8g2_robot_eyes_render($eyes, DRAW_TO_BUFFER)` | `eyes.update();` |
| `u8g2_robot_eyes_expression` | Value | VAR(field_variable) | `u8g2_robot_eyes_expression($eyes)` | `(uint8_t)eyes.expression()` |
| `u8g2_robot_eyes_is_animating` | Value | VAR(field_variable) | `u8g2_robot_eyes_is_animating($eyes)` | `eyes.isAnimating()` |
| `u8g2_robot_eyes_style` | Value | VAR(field_variable) | `u8g2_robot_eyes_style($eyes)` | `(uint8_t)eyes.eyeStyle()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| STYLE | U8G2_ROBOT_EYES_STYLE_SQUARE, U8G2_ROBOT_EYES_STYLE_ROUND | Compile-time square or round theme; one theme per program. |
| EXPRESSION | NEUTRAL, HAPPY, SAD, ANGRY, SURPRISED, SLEEPY, SUSPICIOUS, EXCITED, SCARED, THINKING, LOVE, WINK, LAUGHING, CRYING, BORED, DETERMINED, DIZZY, EMBARRASSED, CURIOUS, EVIL | Target expression, numbered 0..19 in this order. |
| AUTO_UPDATE | TRUE, FALSE | Add `eyes.update()` automatically to the main loop. |
| MODE | UPDATE, DRAW, DRAW_TO_BUFFER | Limited frame update/send, immediate draw/send, or buffer-only composition. |

## ABS Examples

### Automatic rendering

```abs
arduino_setup()
    u8g2_begin(SSD1306, FULL_BUFFER, 128X64_NONAME, _HW_I2C, U8X8_PIN_NONE)
    u8g2_robot_eyes_init("eyes", "u8g2", U8G2_ROBOT_EYES_STYLE_ROUND, math_number(128), math_number(64), math_number(40), TRUE)
    u8g2_robot_eyes_set_auto_blink($eyes, logic_boolean(TRUE), math_number(3200), math_number(1800))
    u8g2_robot_eyes_set_idle($eyes, logic_boolean(TRUE), math_number(1800))
    u8g2_robot_eyes_set_expression($eyes, HAPPY, math_number(300))

arduino_loop()
```

### Shared U8g2 buffer

```abs
arduino_setup()
    u8g2_begin(SSD1306, FULL_BUFFER, 128X64_NONAME, _HW_I2C, U8X8_PIN_NONE)
    u8g2_robot_eyes_init("eyes", "u8g2", U8G2_ROBOT_EYES_STYLE_SQUARE, math_number(128), math_number(64), math_number(40), FALSE)

arduino_loop()
    u8g2_clear_buffer()
    u8g2_robot_eyes_render($eyes, DRAW_TO_BUFFER)
    u8g2_draw_str(math_number(0), math_number(12), text("status"))
    u8g2_send_buffer()
    time_delay(math_number(25))
```

## Notes

1. **Display prerequisite**: create and initialize a full-buffer U8g2 object before calling `u8g2_robot_eyes_init`.
2. **Variable**: `u8g2_robot_eyes_init("eyes", ...)` creates `$eyes`; pass `$eyes` directly to `field_variable` slots.
3. **Theme scope**: the upstream library selects its theme with a preprocessor macro, so all eye objects in one program share the selected style.
4. **Rendering**: automatic update clears and sends the U8g2 buffer. Set AUTO_UPDATE to FALSE for shared-buffer layouts and call DRAW_TO_BUFFER between the U8g2 clear/send blocks.
5. **Gaze range**: use X from -8 to 8 and Y from -7 to 7 for intended motion.
6. **Non-blocking**: animations do not call `delay()`.
7. **Parameter order**: follows `block.json` `args0` exactly.
