# VL53L0X laser ranging sensor

The VL53L0X laser ranging sensor driver library uses I2C communication, supports millimeter-level distance detection, has fast measurement speed, strong resistance to ambient light interference, is small in size, and...

## Library Info
- **Name**: @aily-project/lib-adafruit-vl53l0x
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `vl53l0x_init_with_wire` | Statement | SENSOR(field_variable), WIRE(dropdown) | `vl53l0x_init_with_wire($sensor, WIRE)` | `// 初始化VL53L0X激光测距传感器 ↵ if (sensor.begin(0x29, false, &WIRE)) { ↵ Serial.println("VL53L0X传感器初始化成功!"); ↵ } else { ↵ Serial.println("警告: VL53L0X传感器初始化失败，请检查接线!"); ↵ }` |
| `vl53l0x_ranging_test` | Statement | SENSOR(field_variable), MEASURE(field_variable) | `vl53l0x_ranging_test($sensor, $measure)` | `// 获取距离数据（单位：毫米） ↵ sensor.rangingTest(&measure, false); // 进行一次测量` |
| `vl53l0x_check_range_valid` | Value | MEASURE(field_variable) | `vl53l0x_check_range_valid($measure)` | `measure.RangeStatus != 4` |
| `vl53l0x_get_range_mm` | Value | MEASURE(field_variable) | `vl53l0x_get_range_mm($measure)` | `measure.RangeMilliMeter` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    vl53l0x_init_with_wire($sensor, WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, vl53l0x_check_range_valid($measure))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **UI-only extensions**: `vl53l0x_init_with_wire` refreshes board/I2C presentation only; it does not add ABS arguments.
