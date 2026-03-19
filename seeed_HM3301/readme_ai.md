# HM3301 PM2.5传感器

HM3301激光粉尘传感器，I2C通讯，可检测PM1.0、PM2.5、PM10颗粒物浓度

## Library Info
- **Name**: @aily-project/lib-seeed-hm3301
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `hm3301_init` | Statement | (none, ESP32 has SDA_PIN/SCL_PIN) | `hm3301_init()` | `hm3301_sensor.init();` |
| `hm3301_read` | Value | TYPE(dropdown) | `hm3301_read(PM2_5_STD)` | `hm3301_read_value(3)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | PM1_0_STD, PM2_5_STD, PM10_STD, PM1_0_ATM, PM2_5_ATM, PM10_ATM | PM1.0/PM2.5/PM10 标准颗粒物或大气环境浓度 |

## ABS Examples

### Basic Usage
```
arduino_setup()
    hm3301_init()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_print(Serial, text("PM2.5: "))
    serial_println(Serial, hm3301_read(PM2_5_STD))
    serial_print(Serial, text("PM10: "))
    serial_println(Serial, hm3301_read(PM10_STD))
    time_delay(math_number(5000))
```

## Notes

1. **Initialization**: Place `hm3301_init` inside `arduino_setup()`
2. **I2C Address**: Fixed at 0x40, no configuration needed
3. **Board Adaptation**: ESP32 allows SDA/SCL pin selection; UNO/Mega use fixed I2C pins
4. **Data Types**: Standard (CF=1) for lab calibration; Atmospheric for real environment readings
5. **Read Interval**: Recommended minimum 5 seconds between readings
