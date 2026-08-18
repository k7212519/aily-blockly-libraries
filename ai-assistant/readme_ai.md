# ai-assistant

The module communicates with the motherboard through the UART interface. The module comes with its own audio codec and microphone array to realize speech recognition, natural language processing and speech synthesis....

## Library Info
- **Name**: @aily-project/lib-ai-assistant
- **Version**: 0.0.8

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ai_assistant_config` | Statement | SERIAL(dropdown), SPEED(dropdown) | `ai_assistant_config(SERIAL, SPEED)` | `String receivedCommand = ""; ↵ int cmdCount = 0; ↵ unsigned long lastCmdTime = 0; ↵ SERIAL.begin(SPEED); ↵ // 从SERIAL获取AI-assistant命令 ↵ if (SERIAL.available()) { ↵ String cmd = ""; ↵ unsigned long startTime = millis(); ↵ // 最多等待100ms来读取全部数据 ↵ while (millis() - startTime < 100) { ↵ if (SERIAL.available()) { ↵ char c = SERIAL.read(); ↵ if (c == 10 &#124;&#124; c == 13) { ↵ break; ↵ } ↵ cmd += c; ↵ delay(2); ↵ } ↵ } ↵ // 清空串口缓冲区的残留换行符 ↵ delay(10); ↵ while (SERIAL.available()) { ↵ char c = SERIAL.peek(); ↵ if (c == 10 &#124;&#124; c == 13) { ↵ SERIAL.read(); ↵ } else { ↵ break; ↵ } ↵ } ↵ if (cmd.length() > 0) { ↵ receivedCommand = cmd; ↵ } ↵ }` |
| `serial_command_handler` | Value | ACTION(dropdown) | `serial_command_handler(MOVE_FORWARD)` | `(receivedCommand.indexOf("MOVE F") >= 0)` |
| `serial_custom_command` | Value | CUSTOM_CMD(field_input) | `serial_custom_command("computer")` | `(receivedCommand.indexOf("computer") >= 0)` |
| `serial_clear_command` | Statement | (none) | `serial_clear_command()` | `receivedCommand = "";` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ACTION | MOVE_FORWARD, MOVE_BACKWARD, TURN_LEFT, TURN_RIGHT, STOP, LED_ON, LED_OFF, LED_BLINK, SERVO_ROTATE, FAN_SPEED, FAN_ON, FAN_OFF, RGB_ON, RGB_OFF, RGB_BRIGHTNESS, RGB_GRADIENT, ARM_GRAB, ARM_RELEASE, ARM_DOWN, RELAY_ON,... | serial_command_handler |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ai_assistant_config(SERIAL, SPEED)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, serial_command_handler(MOVE_FORWARD))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
