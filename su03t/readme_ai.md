# SU-03T speech recognition

SU-03T speech recognition module library supports voice command recognition and voice broadcast functions

## Library Info
- **Name**: @aily-project/lib-su03t
- **Version**: 1.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `su03t_init` | Statement | MODE(dropdown), RX_PIN(input_value), TX_PIN(input_value) | `su03t_init(software, math_number(2), math_number(2))` | `SoftwareSerial su03tSerial(1,1); ↵ volatile int su03tResult = 0; ↵ su03tSerial.begin(9600); ↵ su03tResult = 0; ↵ // SU-03T串口通信消息头 ↵ const unsigned char su03t_send_head[] = {0xaa, 0x55}; ↵ // SU-03T串口通信消息尾 ↵ const unsigned char su03t_send_foot[] = {0x55, 0xaa}; ↵ // SU-03T串口发送消息最大长度 ↵ #define SU03T_UART_SEND_MAX 32 ↵ #define SU03T_UART_MSG_HEAD_LEN 2 ↵ #define SU03T_UART_MSG_FOOT_LEN 2 ↵ // SU-03T串口发送消息号 ↵ #define SU03T_MSG_SPEAK_INTEGER 1 ↵ #define SU03T_MSG_SPEAK_DECIMAL 2 ↵ #define SU03T_MSG_SPEAK_TEXT1 3 ↵ #define SU03T_MSG_SPEAK_TEXT2 4 ↵ #define SU03T_MSG_SPEAK_TEXT3 5 ↵ #define SU03T_MSG_SPEAK_TEXT4 6 ↵ #define SU03T_MSG_SPEAK_TEXT5 7 ↵ #define SU03T_MSG_SPEAK_TEXT6 8 ↵ #define SU03T_MSG_SPEAK_TEXT7 9 ↵ #define SU03T_MSG_SPEAK_TEXT8 10 ↵ #define SU03T_MSG_SPEAK_TEXT9 11 ↵ #define SU03T_MSG_SPEAK_TEXT10 12 ↵ #define SU03T_MSG_SPEAK_TEXT11 13 ↵ #define SU03T_MSG_SPEAK_TEXT12 14 ↵ #define SU03T_MSG_SPEAK_TEXT13 15 ↵ #define SU03T_MSG_SPEAK_TEXT14 16 ↵ #define SU03T_MSG_SPEAK_TEXT15 17 ↵ #define SU03T_MSG_SPEAK_TEXT16 18 ↵ #define SU03T_MSG_SPEAK_TEXT17 19 ↵ #define SU03T_MSG_SPEAK_TEXT18 20 ↵ #define SU03T_MSG_SPEAK_TEXT19 21 ↵ #define SU03T_MSG_SPEAK_TEXT20 22 ↵ #define SU03T_MSG_SPEAK_TEXT21 23 ↵ #define SU03T_MSG_SPEAK_TEXT22 24 ↵ #define SU03T_MSG_SPEAK_TEXT23 25 ↵ #define SU03T_MSG_SPEAK_TEXT24 26 ↵ #define SU03T_MSG_SPEAK_TEXT25 27 ↵ #define SU03T_MSG_SPEAK_TEXT26 28 ↵ #define SU03T_MSG_SPEAK_TEXT27 29 ↵ #define SU03T_MSG_SPEAK_TEXT28 30 ↵ #define SU03T_MSG_SPEAK_TEXT29 31 ↵ #define SU03T_MSG_SPEAK_TEXT30 32 ↵ #define SU03T_MSG_SPEAK_TEXT31 33 ↵ #define SU03T_MSG_SPEAK_TEXT32 34 ↵ #define SU03T_MSG_SPEAK_TEXT33 35 ↵ #define SU03T_MSG_SPEAK_TEXT34 36 ↵ // SU-03T串口消息参数类型 ↵ typedef union { ↵ double d_double; ↵ int d_int; ↵ unsigned char d_ucs[8]; ↵ char d_char; ↵ unsigned char d_uchar; ↵ unsigned long d_long; ↵ short d_short; ↵ float d_float; ↵ } su03t_uart_param_t; ↵ // SU-03T串口发送函数实现 ↵ void su03t_uart_send_impl(unsigned char* buff, int len) { ↵ for(int i = 0; i < len; i++) { ↵ su03tSerial.write(buff[i]); ↵ } ↵ } ↵ // SU-03T十六位整数转32位整数 ↵ void su03t_int16_to_int32(su03t_uart_param_t* param) { ↵ if (sizeof(int) >= 4) return; ↵ unsigned long value = param->d_long; ↵ unsigned long sign = (value >> 15) & 1; ↵ unsigned long v = value; ↵ if (sign) v = 0xFFFF0000 &#124; value; ↵ su03t_uart_param_t p; ↵ p.d_long = v; ↵ param->d_ucs[0] = p.d_ucs[0]; ↵ param->d_ucs[1] = p.d_ucs[1]; ↵ param->d_ucs[2] = p.d_ucs[2]; ↵ param->d_ucs[3] = p.d_ucs[3]; ↵ } ↵ // SU-03T浮点数转双精度 ↵ void su03t_float_to_double(su03t_uart_param_t* param) { ↵ if (sizeof(int) >= 4) return; ↵ unsigned long value = param->d_long; ↵ unsigned long sign = value >> 31; ↵ unsigned long M = value & 0x007FFFFF; ↵ unsigned long e = ((value >> 23) & 0xFF) - 127 + 1023; ↵ su03t_uart_param_t p0, p1; ↵ p1.d_long = ((sign & 1) << 31) &#124; ((e & 0x7FF) << 20) &#124; (M >> 3); ↵ param->d_ucs[0] = p0.d_ucs[0]; ↵ param->d_ucs[1] = p0.d_ucs[1]; ↵ param->d_ucs[2] = p0.d_ucs[2]; ↵ param->d_ucs[3] = p0.d_ucs[3]; ↵ param->d_ucs[4] = p1.d_ucs[0]; ↵ param->d_ucs[5] = p1.d_ucs[1]; ↵ param->d_ucs[6] = p1.d_ucs[2]; ↵ param->d_ucs[7] = p1.d_ucs[3]; ↵ }` |
| `su03t_refresh` | Statement | MODE(dropdown) | `su03t_refresh(software)` | `if (su03tSerial.available() > 0) { ↵ su03tResult = su03tSerial.read(); ↵ Serial.println(su03tResult, HEX); ↵ }` |
| `su03t_clear_result` | Statement | (none) | `su03t_clear_result()` | `su03tResult = 0;` |
| `su03t_recognized` | Value | COMMAND(input_value) | `su03t_recognized(math_number(0))` | `su03tResult == 1` |
| `su03t_command` | Value | COMMAND(dropdown) | `su03t_command("1")` | `1` |
| `su03t_speak_integer` | Statement | VALUE(input_value) | `su03t_speak_integer(math_number(0))` | `su03t_speak_integer(1);` |
| `su03t_speak_decimal` | Statement | VALUE(input_value) | `su03t_speak_decimal(math_number(0))` | `su03t_speak_decimal(1);` |
| `su03t_speak_text` | Statement | TEXT(dropdown) | `su03t_speak_text("1")` | `su03t_speak_text_1();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | software, hardware | su03t_init, su03t_refresh |
| COMMAND | 1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 32, ... | su03t_command |
| TEXT | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ... | su03t_speak_text |

## ABS Examples

### Basic Usage
```
arduino_setup()
    su03t_init(software, math_number(2), math_number(2))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, su03t_recognized(math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
