# R4 real time clock

RTC library for Arduino UNO R4, providing precise time tracking, timed callbacks and time formatting functions

## Library Info
- **Name**: @aily-project/lib-r4-rtc
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `renesas_rtc_begin` | Statement | (none) | `renesas_rtc_begin()` | `RTC.begin();` |
| `renesas_rtc_is_running` | Value | (none) | `renesas_rtc_is_running()` | `RTC.isRunning()` |
| `renesas_rtc_set_time` | Statement | YEAR(input_value), MONTH(input_value), DAY(input_value), HOUR(input_value), MINUTE(input_value), SECOND(input_value), DAYOFWEEK(input_value) | `renesas_rtc_set_time(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `RTCTime time(1, Month::JANUARY, 1, 1, 1, 1, DayOfWeek::MONDAY, SaveLight::SAVING_TIME_INACTIVE); ↵ RTC.setTime(time);` |
| `renesas_rtc_get_time` | Statement | VAR(field_input) | `renesas_rtc_get_time("rtc_current_time")` | `RTCTime rtc_current_time; ↵ RTC.getTime(rtc_current_time);` |
| `renesas_rtc_time_get_day` | Value | VAR(field_variable) | `renesas_rtc_time_get_day($rtc_current_time)` | `rtc_current_time.getDayOfMonth()` |
| `renesas_rtc_time_get_month` | Value | VAR(field_variable) | `renesas_rtc_time_get_month($rtc_current_time)` | `Month2int(rtc_current_time.getMonth())` |
| `renesas_rtc_time_get_year` | Value | VAR(field_variable) | `renesas_rtc_time_get_year($rtc_current_time)` | `rtc_current_time.getYear()` |
| `renesas_rtc_time_get_hour` | Value | VAR(field_variable) | `renesas_rtc_time_get_hour($rtc_current_time)` | `rtc_current_time.getHour()` |
| `renesas_rtc_time_get_minute` | Value | VAR(field_variable) | `renesas_rtc_time_get_minute($rtc_current_time)` | `rtc_current_time.getMinutes()` |
| `renesas_rtc_time_get_second` | Value | VAR(field_variable) | `renesas_rtc_time_get_second($rtc_current_time)` | `rtc_current_time.getSeconds()` |
| `renesas_rtc_time_get_day_of_week` | Value | VAR(field_variable) | `renesas_rtc_time_get_day_of_week($rtc_current_time)` | `DayOfWeek2int(rtc_current_time.getDayOfWeek(), false)` |
| `renesas_rtc_set_periodic_callback` | Hat | PERIOD(dropdown), HANDLER(input_statement) | `renesas_rtc_set_periodic_callback(ONCE_EVERY_2_SEC)` | `void rtc_periodic_callback() { ↵ } ↵ RTC.setPeriodicCallback(rtc_periodic_callback, Period::ONCE_EVERY_2_SEC);` |
| `renesas_rtc_set_alarm_callback` | Hat | SECOND(input_value), HANDLER(input_statement) | `renesas_rtc_set_alarm_callback(math_number(0))` | `void rtc_alarm_callback() { ↵ } ↵ RTCTime alarmtime; ↵ alarmtime.setSecond(1); ↵ AlarmMatch am; ↵ am.addMatchSecond(); ↵ RTC.setAlarmCallback(rtc_alarm_callback, alarmtime, am);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PERIOD | ONCE_EVERY_2_SEC, ONCE_EVERY_1_SEC, N2_TIMES_EVERY_SEC, N4_TIMES_EVERY_SEC, N8_TIMES_EVERY_SEC, N16_TIMES_EVERY_SEC, N32_TIMES_EVERY_SEC, N64_TIMES_EVERY_SEC, N128_TIMES_EVERY_SEC, N256_TIMES_EVERY_SEC | renesas_rtc_set_periodic_callback |

## ABS Examples

### Basic Usage
```
arduino_setup()
    renesas_rtc_begin()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, renesas_rtc_is_running())
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `renesas_rtc_get_time("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
