# Color recognition library

Color recognition sensor library, supports Arduino UNO, MEGA and other development boards

## Library Info
- **Name**: @aily-project/lib-tcs34725
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tcs34725_init` | Statement | TCS34725NAME(field_variable) | `tcs34725_init($tcs)` | `Adafruit_TCS34725 tcs= Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X); ↵ float red, green, blue; ↵ tcs.begin();` |
| `tcs34725_led_ctrl` | Statement | TCS34725NAME(field_variable), TCSLEDSTATE(dropdown) | `tcs34725_led_ctrl($tcs, false)` | `tcs.setInterrupt(false);` |
| `tcs34725_get_rgb` | Statement | TCS34725NAME(field_variable) | `tcs34725_get_rgb($tcs)` | `tcs.getRGB(&red, &green, &blue);` |
| `tcs34725_rgb_value` | Value | TCSRGBVALUE(dropdown) | `tcs34725_rgb_value(red)` | `red` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TCSLEDSTATE | false, true | tcs34725_led_ctrl |
| TCSRGBVALUE | red, green, blue | tcs34725_rgb_value |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tcs34725_init($tcs)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tcs34725_rgb_value(red))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
