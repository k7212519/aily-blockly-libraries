# K10按键

UNIHIKER K10 板载按键库，支持 A/B 按键轮询和回调。

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-button
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_button_pressed` | Value(Boolean) | BTN(dropdown) | `k10_button_pressed(BtnA)` | `(k10.buttonA->isPressed())` |
| `k10_button_callback` | Hat | BTN(dropdown), EVENT(dropdown), DO(input_statement) | `k10_button_callback(BtnA, pressed) @DO: action()` | `void onK10_BtnA_Pressed() { ... }` + `k10.buttonA->setPressedCallback(...)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BTN | BtnA, BtnB | 按键选择 |
| EVENT | pressed(按下), released(释放) | 触发事件 |

## ABS Examples

### 轮询按键状态
```
arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: k10_button_pressed(BtnA)
        @DO0:
            serial_println(Serial, text("Button A pressed"))
    time_delay(math_number(100))
```

### 按键回调
```
k10_button_callback(BtnA, pressed)
    @DO:
        serial_println(Serial, text("Button A!"))
```

## Notes

1. **无需额外初始化**: 使用按键积木时自动初始化 K10 开发板
2. **回调机制**: `k10_button_callback` 会自动生成回调函数并在 `setup()` 中注册
3. **按键名映射**: BtnA → `k10.buttonA`, BtnB → `k10.buttonB`
