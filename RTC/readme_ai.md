# RTC real time clock

Real-time clock library that supports multiple RTC chips of DS3231/DS1307/DS1302/PCF8563, providing time reading, setting, formatting and chip-specific functions

## Library Info
- **Name**: @aily-project/lib-rtc
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `rtc_init` | Statement | VAR(field_input), CHIP_TYPE(dropdown); runtime variants: fixed-i2c-pins: (none); ds1302-three-wire: DAT_PIN(dropdown), CLK_PIN(dropdown), RST_PIN(dropdown); esp32-custom-i2c-pins: SDA_PIN(dropdown), SCL_PIN(dropdown) | `rtc_init("rtc", DS3231)` | `rtc.Begin();` |
| `rtc_set_datetime` | Statement | VAR(field_variable), YEAR(input_value), MONTH(input_value), DAY(input_value), HOUR(input_value), MINUTE(input_value), SECOND(input_value) | `rtc_set_datetime($rtc, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `rtc.SetDateTime(RtcDateTime(1, 1, 1, 1, 1, 1));` |
| `rtc_set_compile_datetime` | Statement | VAR(field_variable) | `rtc_set_compile_datetime($rtc)` | `rtc.SetDateTime(RtcDateTime(__DATE__, __TIME__));` |
| `rtc_get_datetime` | Value | VAR(field_variable) | `rtc_get_datetime($rtc)` | `rtc.GetDateTime()` |
| `rtc_is_datetime_valid` | Value | VAR(field_variable) | `rtc_is_datetime_valid($rtc)` | `rtc.IsDateTimeValid()` |
| `rtc_get_is_running` | Value | VAR(field_variable) | `rtc_get_is_running($rtc)` | `rtc.GetIsRunning()` |
| `rtc_set_is_running` | Statement | VAR(field_variable), RUNNING(dropdown) | `rtc_set_is_running($rtc, TRUE)` | `rtc.SetIsRunning(true);` |
| `rtc_get_year` | Value | TIME(input_value) | `rtc_get_year(math_number(1000))` | `1.Year()` |
| `rtc_get_month` | Value | TIME(input_value) | `rtc_get_month(math_number(1000))` | `1.Month()` |
| `rtc_get_day` | Value | TIME(input_value) | `rtc_get_day(math_number(1000))` | `1.Day()` |
| `rtc_get_hour` | Value | TIME(input_value) | `rtc_get_hour(math_number(1000))` | `1.Hour()` |
| `rtc_get_minute` | Value | TIME(input_value) | `rtc_get_minute(math_number(1000))` | `1.Minute()` |
| `rtc_get_second` | Value | TIME(input_value) | `rtc_get_second(math_number(1000))` | `1.Second()` |
| `rtc_get_day_of_week` | Value | TIME(input_value) | `rtc_get_day_of_week(math_number(1000))` | `1.DayOfWeek()` |
| `rtc_format_datetime` | Value | TIME(input_value) | `rtc_format_datetime(math_number(1000))` | `rtcFormatDateTime(1)` |
| `rtc_ds3231_get_temperature` | Value | VAR(field_variable), UNIT(dropdown) | `rtc_ds3231_get_temperature($rtc, C)` | `rtc.GetTemperature().AsFloatDegC()` |
| `rtc_ds1302_set_write_protect` | Statement | VAR(field_variable), ENABLE(dropdown) | `rtc_ds1302_set_write_protect($rtc, TRUE)` | `rtc.SetIsWriteProtected(true);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CHIP_TYPE | DS3231, DS1307, DS1302, PCF8563 | rtc_init |
| RUNNING | TRUE, FALSE | rtc_set_is_running |
| UNIT | C, F | rtc_ds3231_get_temperature |
| ENABLE | TRUE, FALSE | rtc_ds1302_set_write_protect |

## ABS Examples

### Basic Usage
```
arduino_setup()
    rtc_init("rtc", DS3231)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, rtc_get_datetime($rtc))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `rtc_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **Runtime shape**: `rtc_init` adds `DAT_PIN`/`CLK_PIN`/`RST_PIN` for DS1302, or `SDA_PIN`/`SCL_PIN` for custom-pin ESP32 I2C RTCs; fixed-pin I2C boards use the shorter signature.

## Runtime Variant Examples

### Runtime Variant: rtc_init/ds1302-three-wire
```abs
arduino_setup()
    rtc_init("rtc", DS1302, 4, 5, 2)
```

### Runtime Variant: rtc_init/esp32-custom-i2c-pins
```abs
arduino_setup()
    rtc_init("rtc", DS3231, 21, 22)
```
