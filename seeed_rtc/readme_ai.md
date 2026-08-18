# Seeed RTC

Blockly wrapper for Seeed SAMD21/SAMD51 internal RTC with time setting, DateTime reading, alarms, and interrupt callbacks.

## Library Info
- **Name**: @aily-project/lib-seeed-rtc
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_rtc_init` | Statement | VAR(field_input) | `seeed_rtc_init("rtc")` | `rtc.begin();` |
| `seeed_rtc_datetime` | Value | YEAR(input_value), MONTH(input_value), DAY(input_value), HOUR(input_value), MINUTE(input_value), SECOND(input_value) | `seeed_rtc_datetime(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `DateTime(1, 1, 1, 1, 1, 1)` |
| `seeed_rtc_build_time` | Value | (none) | `seeed_rtc_build_time()` | `DateTime(F(__DATE__), F(__TIME__))` |
| `seeed_rtc_set_time` | Statement | VAR(field_variable), DATETIME(input_value) | `seeed_rtc_set_time($rtc, math_number(1000))` | `rtc.adjust(1);` |
| `seeed_rtc_now` | Value | VAR(field_variable) | `seeed_rtc_now($rtc)` | `rtc.now()` |
| `seeed_rtc_datetime_get` | Value | TIME(input_value), PART(dropdown) | `seeed_rtc_datetime_get(math_number(1000), YEAR)` | `(1).year()` |
| `seeed_rtc_timestamp` | Value | TIME(input_value), FORMAT(dropdown) | `seeed_rtc_timestamp(math_number(1000), FULL)` | `(1).timestamp(DateTime::TIMESTAMP_FULL)` |
| `seeed_rtc_is_valid` | Value | TIME(input_value) | `seeed_rtc_is_valid(math_number(1000))` | `(1).isValid()` |
| `seeed_rtc_set_alarm` | Statement | VAR(field_variable), ALARM_ID(dropdown), DATETIME(input_value) | `seeed_rtc_set_alarm($rtc, "0", math_number(1000))` | `seeedRtcSetAlarm(rtc, 0, 1);` |
| `seeed_rtc_get_alarm` | Value | VAR(field_variable), ALARM_ID(dropdown) | `seeed_rtc_get_alarm($rtc, "0")` | `seeedRtcGetAlarm(rtc, 0)` |
| `seeed_rtc_enable_alarm` | Statement | VAR(field_variable), ALARM_ID(dropdown), MATCH(dropdown) | `seeed_rtc_enable_alarm($rtc, "0", MATCH_OFF)` | `seeedRtcEnableAlarm(rtc, 0, SeeedRTC::MATCH_OFF);` |
| `seeed_rtc_disable_alarm` | Statement | VAR(field_variable), ALARM_ID(dropdown) | `seeed_rtc_disable_alarm($rtc, "0")` | `seeedRtcDisableAlarm(rtc, 0);` |
| `seeed_rtc_on_alarm` | Hat | VAR(field_variable), HANDLER(input_statement) | `seeed_rtc_on_alarm($rtc)` | `void seeedRtcSetAlarm(SeeedRTC& rtc, uint8_t id, const DateTime& dt) { ↵ #if defined(__SAMD51__) ↵ rtc.setAlarm(id, dt); ↵ #else ↵ (void)id; ↵ rtc.setAlarm(dt); ↵ #endif ↵ } ↵ DateTime seeedRtcGetAlarm(SeeedRTC& rtc, uint8_t id) { ↵ #if defined(__SAMD51__) ↵ return rtc.alarm(id); ↵ #else ↵ (void)id; ↵ return rtc.alarm(); ↵ #endif ↵ } ↵ void seeedRtcEnableAlarm(SeeedRTC& rtc, uint8_t id, SeeedRTC::Alarm_Match match) { ↵ #if defined(__SAMD51__) ↵ rtc.enableAlarm(id, match); ↵ #else ↵ (void)id; ↵ rtc.enableAlarm(match); ↵ #endif ↵ } ↵ void seeedRtcDisableAlarm(SeeedRTC& rtc, uint8_t id) { ↵ #if defined(__SAMD51__) ↵ rtc.disableAlarm(id); ↵ #else ↵ (void)id; ↵ rtc.disableAlarm(); ↵ #endif ↵ } ↵ volatile uint32_t seeed_rtc_alarm_flag = 0; ↵ #if defined(__SAMD51__) ↵ void seeedRtcAlarm_rtc(uint32_t flag) { ↵ seeed_rtc_alarm_flag = flag; ↵ } ↵ #else ↵ void seeedRtcAlarm_rtc() { ↵ seeed_rtc_alarm_flag = 1; ↵ } ↵ #endif ↵ rtc.attachInterrupt(seeedRtcAlarm_rtc);` |
| `seeed_rtc_alarm_flag` | Value | (none) | `seeed_rtc_alarm_flag()` | `seeed_rtc_alarm_flag` |
| `seeed_rtc_detach_alarm` | Statement | VAR(field_variable) | `seeed_rtc_detach_alarm($rtc)` | `rtc.detachInterrupt();` |
| `seeed_rtc_standby` | Statement | VAR(field_variable) | `seeed_rtc_standby($rtc)` | `rtc.standbyMode();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PART | YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, DAY_OF_WEEK, TWELVE_HOUR, IS_PM, UNIXTIME, SECONDSTIME | seeed_rtc_datetime_get |
| FORMAT | FULL, TIME, DATE | seeed_rtc_timestamp |
| ALARM_ID | 0, 1 | seeed_rtc_set_alarm, seeed_rtc_get_alarm, seeed_rtc_enable_alarm |
| MATCH | MATCH_OFF, MATCH_SS, MATCH_MMSS, MATCH_HHMMSS, MATCH_DHHMMSS, MATCH_MMDDHHMMSS, MATCH_YYMMDDHHMMSS | seeed_rtc_enable_alarm |

## ABS Examples

### Basic Usage
```
arduino_setup()
    seeed_rtc_init("rtc")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, seeed_rtc_datetime(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `seeed_rtc_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
