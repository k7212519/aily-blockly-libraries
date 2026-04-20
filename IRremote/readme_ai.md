# 红外遥控

基于 Arduino-IRremote 的红外遥控接收与发送库，提供 IrReceiver/IrSender 初始化、解码结果读取、调试打印、常见协议发送及 Raw/Pronto 发送块。

## Library Info
- **Name**: @aily-project/lib-irremote
- **Version**: 0.0.4

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `irremote_library_config` | Statement | RAW_LENGTH(input_value), UNIVERSAL(field_checkbox), EXOTIC(field_checkbox) | `irremote_library_config(math_number(200), TRUE, TRUE)` | `#define RAW_BUFFER_LENGTH 200` |
| `irremote_receiver_begin` | Statement | PIN(input_value), LED_FEEDBACK(field_checkbox) | `irremote_receiver_begin(math_number(2), TRUE)` | `IrReceiver.begin(2, ENABLE_LED_FEEDBACK);` |
| `irremote_sender_begin` | Statement | PIN(input_value) | `irremote_sender_begin(math_number(3))` | `IrSender.begin(3);` |
| `irremote_on_receive` | Statement | IGNORE_REPEAT(field_checkbox), DO(input_statement) | `irremote_on_receive(TRUE) @DO: ...` | `if (IrReceiver.decode()) { if (!(flags & REPEAT)) { ... } IrReceiver.resume(); }` |
| `irremote_print_result` | Statement | FORMAT(dropdown: SHORT/SEND_USAGE/RAW) | `irremote_print_result(SHORT)` | `IrReceiver.printIRResultShort(&Serial);` |
| `irremote_receiver_available` | Value(Boolean) | (none) | `irremote_receiver_available()` | `IrReceiver.available()` |
| `irremote_get_value` | Value(Number) | FIELD(dropdown) | `irremote_get_value(COMMAND)` | `IrReceiver.decodedIRData.command` |
| `irremote_get_protocol` | Value(String/Number) | FORMAT(dropdown) | `irremote_get_protocol(NAME)` | `String(IrReceiver.getProtocolString())` |
| `irremote_command_equals` | Value(Boolean) | VALUE(input_value) | `irremote_command_equals(math_number(34))` | `(IrReceiver.decodedIRData.command == 34)` |
| `irremote_check_flag` | Value(Boolean) | FLAG(dropdown) | `irremote_check_flag(REPEAT)` | `(flags & IRDATA_FLAGS_IS_REPEAT) != 0` |
| `irremote_is_preset_key` | Value(Boolean) | KEY(dropdown) | `irremote_is_preset_key(69)` | `(IrReceiver.decodedIRData.command == 69)` |
| `irremote_get_preset_name` | Value(String) | (none) | `irremote_get_preset_name()` | `String(ailyIrremoteGetPresetKeyName(...))` |
| `irremote_resume` | Statement | (none) | `irremote_resume()` | `IrReceiver.resume();` |
| `irremote_send_nec` | Statement | ADDRESS(input_value), COMMAND(input_value), REPEAT(input_value) | `irremote_send_nec(math_number(0), math_number(34), math_number(0))` | `IrSender.sendNEC(0, 34, 0);` |
| `irremote_send_command` | Statement | PROTOCOL(dropdown), ADDRESS(input_value), COMMAND(input_value), REPEAT(input_value) | `irremote_send_command(NEC, math_number(0), math_number(0), math_number(0))` | `IrSender.write(NEC, 0, 0, 0);` |
| `irremote_send_raw` | Statement | DATA(input_value/String), FREQ(input_value/Number) | `irremote_send_raw(text("9000,4500,560"), math_number(38))` | `IrSender.sendRaw(data, len, 38);` |
| `irremote_send_pronto` | Statement | CODE(input_value/String), REPEAT(input_value/Number) | `irremote_send_pronto(text("0000 006D ..."), math_number(0))` | `IrSender.sendPronto(F("..."), 0);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| FIELD | ADDRESS, COMMAND, EXTRA, RAW, BITS, FLAGS | 地址 / 命令 / 附加值 / 原始码 / 位数 / 标志位 |
| FORMAT (protocol) | NAME, ID | 名称 / 枚举值 |
| FORMAT (print) | SHORT, SEND_USAGE, RAW | 摘要 / 发送代码 / 原始时序 |
| FLAG | REPEAT, AUTO_REPEAT, PARITY, TOGGLE, DIFF_REPEAT, EXTRA_INFO | 重复帧 / 自动重复 / 校验失败 / 切换位 / 不同重发 / 附加信息 |
| KEY | 69(CH-), 70(CH), 71(CH+), 68(PREV), 64(NEXT), 67(PLAY), 7(VOL-), 21(VOL+), 9(EQ), 22(0), 12(1), 24(2), 94(3), 8(4), 28(5), 90(6), 66(7), 82(8), 74(9) | Arduino套件NEC迷你遥控器按键 |
| PROTOCOL | NEC, NEC2, SAMSUNG, SAMSUNG48, SAMSUNGLG, SONY, PANASONIC, DENON, SHARP, LG, JVC, RC5, RC6, KASEIKYO_JVC, KASEIKYO_DENON, KASEIKYO_SHARP, KASEIKYO_MITSUBISHI, ONKYO, APPLE, BOSEWAVE, FAST, LEGO_PF | 红外协议 |

## ABS Examples

### 接收红外信号并打印调试信息
```
arduino_setup()
    irremote_receiver_begin(math_number(2), TRUE)
    serial_begin(Serial, 9600)

arduino_loop()
    irremote_on_receive(TRUE)
        @DO:
            irremote_print_result(SHORT)
            irremote_print_result(SEND_USAGE)
```

### 接收并判断命令值
```
arduino_setup()
    irremote_receiver_begin(math_number(2), TRUE)

arduino_loop()
    irremote_on_receive(TRUE)
        @DO:
            controls_if()
                @IF0: irremote_command_equals(math_number(34))
                @DO0:
                    io_digitalwrite(math_number(13), HIGH)
                @ELSE:
                    io_digitalwrite(math_number(13), LOW)
```

### 发送NEC红外信号
```
arduino_setup()
    irremote_sender_begin(math_number(3))

arduino_loop()
    irremote_send_nec(math_number(0), math_number(34), math_number(0))
    time_delay(math_number(2000))
```

## Notes

1. **初始化**：`irremote_receiver_begin` 和 `irremote_sender_begin` 放在 `arduino_setup()` 中
2. **调试推荐**：新手先用 `irremote_print_result(SHORT)` 在串口查看接收到的协议、地址、命令
3. **忽略重复帧**：默认开启，防止遥控器按一次触发多次
4. **LED反馈**：默认开启，接收到信号时板载LED闪烁，方便确认接线正确
5. **预置按键**：仅适用于Arduino套件附带的NEC迷你红外遥控器，其他遥控器请用 `irremote_command_equals`
6. **Raw发送**：数据格式为逗号分隔的微秒值，如 "9000,4500,560,560,560,1690"
7. **Pronto发送**：Pronto码格式为空格分隔的十六进制值，可从网上红外码数据库获取
