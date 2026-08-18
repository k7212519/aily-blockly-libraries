# HT16K33 four-digit seven-segment digital tube

HT16K33 four-digit seven-segment digital tube driver library supports number, time, date display, brightness and flicker control, and includes practical combination functions such as sensor display and digital clock.

## Library Info
- **Name**: @aily-project/lib-ht16k33
- **Version**: 1.2.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ht16k33_init` | Statement | ADDRESS(dropdown) | `ht16k33_init("0x70")` | `HT16K33 seg(0x70); ↵ Wire.begin(); ↵ Wire.setClock(100000); ↵ seg.begin(); ↵ seg.displayOn(); ↵ seg.setBrightness(8);` |
| `ht16k33_simple_display` | Statement | VALUE(input_value) | `ht16k33_simple_display(math_number(0))` | `// 自动选择显示格式 ↵ if (1 == (int)1 && 1 >= -999 && 1 <= 9999) { ↵ seg.displayInt(1); ↵ } else { ↵ seg.displayFloat(1, 2); ↵ }` |
| `ht16k33_display_temperature` | Statement | TEMP(input_value) | `ht16k33_display_temperature(math_number(0))` | `seg.displayFloat(1, 1); ↵ delay(1000); ↵ seg.displayClear(); ↵ delay(200); ↵ // 显示度数符号 ↵ uint8_t degreeSegments[4] = {0x63, 0x00, 0x00, 0x38}; // °C ↵ seg.displayRaw(degreeSegments); ↵ delay(1000);` |
| `ht16k33_display_voltage` | Statement | VOLTAGE(input_value) | `ht16k33_display_voltage(math_number(0))` | `seg.displayFloat(1, 2);` |
| `ht16k33_clock_display` | Statement | HOUR(input_value), MINUTE(input_value), BLINK(field_checkbox) | `ht16k33_clock_display(math_number(0), math_number(0), TRUE)` | `// 时钟显示（带闪烁冒号和参数验证） ↵ int clockHour = constrain(1, 0, 23); ↵ int clockMinute = constrain(1, 0, 59); ↵ seg.displayTime(clockHour, clockMinute, true); ↵ delay(500); ↵ seg.displayTime(clockHour, clockMinute, false); ↵ delay(500);` |
| `ht16k33_countdown` | Statement | SECONDS(input_value) | `ht16k33_countdown(math_number(0))` | `// 倒计时显示（带参数验证） ↵ int countdownSeconds = constrain(1, 0, 5999); // 最大99:59 ↵ seg.displaySeconds(countdownSeconds, true);` |
| `ht16k33_display_int` | Statement | VALUE(input_value) | `ht16k33_display_int(math_number(0))` | `seg.displayInt(1);` |
| `ht16k33_display_float` | Statement | VALUE(input_value), DECIMALS(dropdown) | `ht16k33_display_float(math_number(0), "1")` | `seg.displayFloat(1, 1);` |
| `ht16k33_display_hex` | Statement | VALUE(input_value) | `ht16k33_display_hex(math_number(0))` | `seg.displayHex(1);` |
| `ht16k33_display_time` | Statement | HOUR(input_value), MINUTE(input_value), COLON(field_checkbox) | `ht16k33_display_time(math_number(0), math_number(0), TRUE)` | `// 显示时间（带参数验证） ↵ int displayHour = constrain(1, 0, 23); ↵ int displayMinute = constrain(1, 0, 59); ↵ seg.displayTime(displayHour, displayMinute, true);` |
| `ht16k33_display_date` | Statement | MONTH(input_value), DAY(input_value) | `ht16k33_display_date(math_number(0), math_number(0))` | `// 显示日期（带参数验证） ↵ int displayMonth = constrain(1, 1, 12); ↵ int displayDay = constrain(1, 1, 31); ↵ seg.displayDate(displayMonth, displayDay);` |
| `ht16k33_display_clear` | Statement | (none) | `ht16k33_display_clear()` | `seg.displayClear();` |
| `ht16k33_set_brightness` | Statement | BRIGHTNESS(input_value) | `ht16k33_set_brightness(math_number(0))` | `int brightness = constrain(1, 0, 15); ↵ seg.setBrightness(brightness);` |
| `ht16k33_set_blink` | Statement | BLINK(dropdown) | `ht16k33_set_blink("0")` | `seg.setBlink(0);` |
| `ht16k33_display_on_off` | Statement | STATE(dropdown) | `ht16k33_display_on_off(ON)` | `seg.displayOn();` |
| `ht16k33_display_colon` | Statement | STATE(dropdown) | `ht16k33_display_colon(true)` | `seg.displayColon(true);` |
| `ht16k33_display_test` | Statement | DELAY(input_value) | `ht16k33_display_test(math_number(1000))` | `seg.displayTest(1);` |
| `ht16k33_sensor_display` | Statement | VALUE(input_value), LABEL(dropdown) | `ht16k33_sensor_display(math_number(0), temp)` | `// 显示温度值 ↵ seg.displayFloat(1, 1); ↵ delay(2000); ↵ seg.displayClear(); ↵ delay(200); ↵ // 显示°C符号 ↵ uint8_t tempSegments[4] = {0x63, 0x38, 0x00, 0x00}; // °C ↵ seg.displayRaw(tempSegments); ↵ delay(1500);` |
| `ht16k33_digital_clock` | Statement | TIME_SOURCE(dropdown) | `ht16k33_digital_clock(millis)` | `// 基于系统时间的数字时钟 ↵ unsigned long currentTime = millis(); ↵ if (currentTime - lastUpdate >= 1000) { ↵ lastUpdate = currentTime; ↵ clockSecond++; ↵ if (clockSecond >= 60) { ↵ clockSecond = 0; ↵ clockMinute++; ↵ if (clockMinute >= 60) { ↵ clockMinute = 0; ↵ clockHour++; ↵ if (clockHour >= 24) { ↵ clockHour = 0; ↵ } ↵ } ↵ } ↵ // 每秒切换冒号状态 ↵ colonState = !colonState; ↵ seg.displayTime(clockHour, clockMinute, colonState); ↵ }` |
| `ht16k33_score_display` | Statement | SCORE(input_value) | `ht16k33_score_display(math_number(0))` | `// 显示游戏得分 ↵ int displayScore = constrain(1, 0, 9999); ↵ seg.displayInt(displayScore);` |
| `ht16k33_counter_display` | Statement | OPERATION(dropdown), STEP(input_value) | `ht16k33_counter_display(inc, math_number(0))` | `// 计数器递增 ↵ displayCounter += 1; ↵ if (displayCounter > 9999) displayCounter = 9999; ↵ seg.displayInt(displayCounter);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ADDRESS | 0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77 | ht16k33_init |
| DECIMALS | 1, 2, 3 | ht16k33_display_float |
| BLINK | 0, 1, 2, 3 | ht16k33_set_blink |
| STATE | ON, OFF | ht16k33_display_on_off |
| STATE | true, false | ht16k33_display_colon |
| LABEL | temp, humi, volt, curr, dist, light, none | ht16k33_sensor_display |
| TIME_SOURCE | millis, manual, rtc | ht16k33_digital_clock |
| OPERATION | inc, dec, reset | ht16k33_counter_display |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ht16k33_init("0x70")
    serial_begin(Serial, 9600)

arduino_loop()
    ht16k33_simple_display(math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
