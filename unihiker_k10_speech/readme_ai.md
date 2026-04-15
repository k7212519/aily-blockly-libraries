# K10语音识别/合成

UNIHIKER K10 语音识别与合成库，支持语音唤醒、命令词识别和 TTS 播报。

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-speech
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_asr_init` | Statement | (none) | `k10_asr_init()` | `asr.asrInit(CONTINUOUS, lang, timeout);` |
| `k10_asr_add_command` | Statement | ID(input_value), KEYWORD(input_value) | `k10_asr_add_command(math_number(1), text("开灯"))` | `asr.addASRCommand(id, keyword);` |
| `k10_asr_is_wakeup` | Value(Boolean) | (none) | `k10_asr_is_wakeup()` | `asr.isWakeUp()` |
| `k10_asr_is_detected` | Value(Boolean) | ID(input_value) | `k10_asr_is_detected(math_number(1))` | `asr.isDetectCmdID(id)` |
| `k10_asr_speak` | Statement | TEXT(input_value) | `k10_asr_speak(text("你好"))` | `asr.speak(text);` |
| `k10_asr_set_speed` | Statement | SPEED(dropdown) | `k10_asr_set_speed(5)` | `asr.setAsrSpeed(speed);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SPEED | 1(很慢), 3(慢), 5(正常), 7(快), 9(很快) | TTS 播报速度 |

## ABS Examples

### 语音命令控制
```
arduino_setup()
    k10_asr_init()
    k10_asr_add_command(math_number(1), text("开灯"))
    k10_asr_add_command(math_number(2), text("关灯"))
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: k10_asr_is_wakeup()
        @DO0:
            controls_if()
                @IF0: k10_asr_is_detected(math_number(1))
                @DO0:
                    serial_println(Serial, text("开灯"))
                    k10_asr_speak(text("好的，已开灯"))
    time_delay(math_number(100))
```

### TTS 语音播报
```
arduino_setup()
    k10_asr_init()
    k10_asr_set_speed(5)
    k10_asr_speak(text("你好，欢迎使用行空板K10"))
```

## Notes

1. **初始化**: `k10_asr_init` 放在 `arduino_setup()` 中，会初始化 ASR 模块并等待就绪
2. **唤醒机制**: 需先通过 `k10_asr_is_wakeup()` 检测唤醒，再检测命令词
3. **命令词**: 使用 `k10_asr_add_command(ID, keyword)` 注册，ID 为数字标识，keyword 为中文或英文关键词
4. **TTS 播报**: `k10_asr_speak` 支持中英文文字转语音播报
5. **播报速度**: 通过 `k10_asr_set_speed` 设置，范围 1-9，默认 5（正常）
