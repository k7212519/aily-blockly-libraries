# MPR121 touch sensor

Adafruit MPR121 12-channel capacitive touch sensor library with support for I2C communication, touch detection and threshold setting

## Library Info
- **Name**: @aily-project/lib-adafruit-mpr121
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mpr121_init` | Statement | I2C_ADDR(dropdown) | `mpr121_init("0x5A")` | `// 初始化MPR121电容触摸传感器 ↵ if (!cap.begin(0x5A, &Wire)) { ↵ Serial.println("警告: MPR121传感器初始化失败，请检查接线!"); ↵ while (1); ↵ } ↵ Serial.println("MPR121传感器初始化成功!"); ↵ cap.setAutoconfig(true);` |
| `mpr121_init_advanced` | Statement | I2C_ADDR(dropdown), TOUCH_THRESHOLD(field_number), RELEASE_THRESHOLD(field_number) | `mpr121_init_advanced("0x5A", 12, 6)` | `// 初始化MPR121电容触摸传感器(高级设置) ↵ if (!cap.begin(0x5A, &Wire)) { ↵ Serial.println("警告: MPR121传感器初始化失败，请检查接线!"); ↵ while (1); ↵ } ↵ Serial.println("MPR121传感器初始化成功!"); ↵ cap.setThresholds(12, 6);` |
| `mpr121_is_touched` | Value | CHANNEL(dropdown) | `mpr121_is_touched("0")` | `(cap.touched() & _BV(0))` |
| `mpr121_get_touched` | Value | (none) | `mpr121_get_touched()` | `cap.touched()` |
| `mpr121_get_filtered_data` | Value | CHANNEL(dropdown) | `mpr121_get_filtered_data("0")` | `cap.filteredData(0)` |
| `mpr121_get_baseline_data` | Value | CHANNEL(dropdown) | `mpr121_get_baseline_data("0")` | `cap.baselineData(0)` |
| `mpr121_set_thresholds` | Statement | TOUCH_THRESHOLD(input_value), RELEASE_THRESHOLD(input_value) | `mpr121_set_thresholds(math_number(0), math_number(0))` | `cap.setThresholds(1, 1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| I2C_ADDR | 0x5A, 0x5B, 0x5C, 0x5D | mpr121_init, mpr121_init_advanced |
| CHANNEL | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 | mpr121_is_touched, mpr121_get_filtered_data, mpr121_get_baseline_data |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mpr121_init("0x5A")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mpr121_is_touched("0"))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
