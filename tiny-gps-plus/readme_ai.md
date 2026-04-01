# TinyGPS++ GPS Module

GPS positioning module library based on TinyGPS++, parses NMEA protocol for location data.

## Library Info
- **Name**: @aily-project/lib-tiny-gps-plus
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `gps_init` | Statement | VAR(field_input), SERIAL(dropdown), BAUD(dropdown) | `gps_init("gps", Serial1, 9600)` | `TinyGPSPlus gps; Serial1.begin(9600);` |
| `gps_update` | Statement | VAR(field_variable) | `gps_update($gps)` | `while(Serial1.available()>0){gps.encode(Serial1.read());}` |
| `gps_location` | Value(Number) | VAR(field_variable), COORD(dropdown) | `gps_location($gps, LAT)` | `gps.location.lat()` |
| `gps_date` | Value(Number) | VAR(field_variable), PART(dropdown) | `gps_date($gps, YEAR)` | `gps.date.year()` |
| `gps_time` | Value(Number) | VAR(field_variable), PART(dropdown) | `gps_time($gps, HOUR)` | `gps.time.hour()` |
| `gps_speed` | Value(Number) | VAR(field_variable), UNIT(dropdown) | `gps_speed($gps, KMPH)` | `gps.speed.kmph()` |
| `gps_altitude` | Value(Number) | VAR(field_variable), UNIT(dropdown) | `gps_altitude($gps, METERS)` | `gps.altitude.meters()` |
| `gps_satellites` | Value(Number) | VAR(field_variable) | `gps_satellites($gps)` | `gps.satellites.value()` |
| `gps_course` | Value(Number) | VAR(field_variable) | `gps_course($gps)` | `gps.course.deg()` |
| `gps_hdop` | Value(Number) | VAR(field_variable) | `gps_hdop($gps)` | `gps.hdop.hdop()` |
| `gps_is_valid` | Value(Boolean) | VAR(field_variable), TYPE(dropdown) | `gps_is_valid($gps, LOCATION)` | `gps.location.isValid()` |
| `gps_distance_between` | Value(Number) | LAT1(input_value), LNG1(input_value), LAT2(input_value), LNG2(input_value) | `gps_distance_between(math_number(31.2), math_number(121.5), math_number(39.9), math_number(116.4))` | `TinyGPSPlus::distanceBetween(31.2,121.5,39.9,116.4)` |
| `gps_course_to` | Value(Number) | LAT1(input_value), LNG1(input_value), LAT2(input_value), LNG2(input_value) | `gps_course_to(math_number(31.2), math_number(121.5), math_number(39.9), math_number(116.4))` | `TinyGPSPlus::courseTo(31.2,121.5,39.9,116.4)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SERIAL | ${board.serialPort} | Serial port connected to GPS module |
| BAUD | 9600, 4800, 19200, 38400, 57600, 115200 | GPS baud rate |
| COORD | LAT, LNG | Latitude or Longitude |
| PART (date) | YEAR, MONTH, DAY | Date component |
| PART (time) | HOUR, MINUTE, SECOND | Time component |
| UNIT (speed) | KMPH, MPH, MPS, KNOTS | Speed unit |
| UNIT (altitude) | METERS, KM, FEET | Altitude unit |
| TYPE | LOCATION, DATE, TIME | Data validity type |

## ABS Examples

### Basic GPS Reading
```
arduino_setup()
    gps_init("gps", Serial1, 9600)
    serial_begin(Serial, 115200)

arduino_loop()
    gps_update($gps)
    controls_if()
        @IF0: gps_is_valid($gps, LOCATION)
        @DO0:
            serial_println(Serial, gps_location($gps, LAT))
            serial_println(Serial, gps_location($gps, LNG))
    time_delay(math_number(1000))
```

### Full GPS Data Display
```
arduino_setup()
    gps_init("gps", Serial2, 9600)
    serial_begin(Serial, 115200)

arduino_loop()
    gps_update($gps)
    controls_if()
        @IF0: gps_is_valid($gps, LOCATION)
        @DO0:
            serial_println(Serial, gps_location($gps, LAT))
            serial_println(Serial, gps_location($gps, LNG))
            serial_println(Serial, gps_altitude($gps, METERS))
            serial_println(Serial, gps_speed($gps, KMPH))
            serial_println(Serial, gps_satellites($gps))
    time_delay(math_number(1000))
```

## Notes

1. **Initialization**: Place `gps_init` in `arduino_setup()`, select the serial port your GPS module is connected to
2. **Data reading**: `gps_update` must be called repeatedly in `arduino_loop()` to continuously parse GPS data
3. **Validity check**: Always check `gps_is_valid` before reading data — GPS needs time to acquire satellite fix
4. **Serial port**: Choose the correct serial port matching your wiring. On ESP32, Serial1/Serial2 are common choices. Do not use Serial (USB) for GPS
5. **Variable**: `gps_init("gps", ...)` creates variable `$gps`; reference it with `variables_get($gps)` in other blocks
