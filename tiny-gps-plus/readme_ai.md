# GPS Module

GPS module control library based on TinyGPS++, supports NMEA protocol parsing to obtain latitude/longitude, date/time, speed, altitude, course, satellite count and more. Includes distance and course calculation betwee...

## Library Info
- **Name**: @aily-project/lib-tiny-gps-plus
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `gps_init` | Statement | VAR(field_input), SERIAL(dropdown), BAUD(dropdown) | `gps_init("gps", SERIAL, "9600")` | `TinyGPSPlus gps; ↵ SERIAL.begin(9600);` |
| `gps_update` | Statement | VAR(field_variable) | `gps_update($gps)` | `while (0.available() > 0) { ↵ gps.encode(0.read()); ↵ }` |
| `gps_location` | Value | VAR(field_variable), COORD(dropdown) | `gps_location($gps, LAT)` | `gps.location.lat()` |
| `gps_date` | Value | VAR(field_variable), PART(dropdown) | `gps_date($gps, YEAR)` | `gps.date.year()` |
| `gps_time` | Value | VAR(field_variable), PART(dropdown) | `gps_time($gps, HOUR)` | `gps.time.hour()` |
| `gps_speed` | Value | VAR(field_variable), UNIT(dropdown) | `gps_speed($gps, KMPH)` | `gps.speed.kmph()` |
| `gps_altitude` | Value | VAR(field_variable), UNIT(dropdown) | `gps_altitude($gps, METERS)` | `gps.altitude.meters()` |
| `gps_satellites` | Value | VAR(field_variable) | `gps_satellites($gps)` | `gps.satellites.value()` |
| `gps_course` | Value | VAR(field_variable) | `gps_course($gps)` | `gps.course.deg()` |
| `gps_hdop` | Value | VAR(field_variable) | `gps_hdop($gps)` | `gps.hdop.hdop()` |
| `gps_is_valid` | Value | VAR(field_variable), TYPE(dropdown) | `gps_is_valid($gps, LOCATION)` | `gps.location.isValid()` |
| `gps_distance_between` | Value | LAT1(input_value), LNG1(input_value), LAT2(input_value), LNG2(input_value) | `gps_distance_between(math_number(0), math_number(0), math_number(0), math_number(0))` | `TinyGPSPlus::distanceBetween(1, 1, 1, 1)` |
| `gps_course_to` | Value | LAT1(input_value), LNG1(input_value), LAT2(input_value), LNG2(input_value) | `gps_course_to(math_number(0), math_number(0), math_number(0), math_number(0))` | `TinyGPSPlus::courseTo(1, 1, 1, 1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BAUD | 9600, 4800, 19200, 38400, 57600, 115200 | gps_init |
| COORD | LAT, LNG | gps_location |
| PART | YEAR, MONTH, DAY | gps_date |
| PART | HOUR, MINUTE, SECOND | gps_time |
| UNIT | KMPH, MPH, MPS, KNOTS | gps_speed |
| UNIT | METERS, KM, FEET | gps_altitude |
| TYPE | LOCATION, DATE, TIME | gps_is_valid |

## ABS Examples

### Basic Usage
```
arduino_setup()
    gps_init("gps", SERIAL, "9600")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, gps_location($gps, LAT))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `gps_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
