# MAX30102血氧心率传感器

MAX30102 Blockly库，封装MAX30102_by_RF的初始化、批量采样和RF算法计算。用于生成能读取SpO2、心率、温度、原始红光/红外值和质量指标的Arduino代码。

## Library Info
- **Name**: @aily-project/lib-max30102
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `max30102_init` | Statement | SDA_PIN, SCL_PIN, INT_PIN(dropdown from board.digitalPins) | `max30102_init(0,0,0)` | `ailyMax30102Begin(0,0,0);` |
| `max30102_measure` | Statement | TIMEOUT(input Number) | `max30102_measure(5000)` | `ailyMax30102Measure(5000);` |
| `max30102_get_value` | Value Number | VALUE(dropdown) | `max30102_get_value(SPO2)` | result global |
| `max30102_is_valid` | Value Boolean | TARGET(dropdown) | `max30102_is_valid(MEASURE)` | validity global |
| `max30102_reset` | Statement | none | `max30102_reset()` | `maxim_max30102_reset();` |
| `max30102_set_led_amplitude` | Statement | LED1(input Number), LED2(input Number) | `max30102_set_led_amplitude(36,36)` | LED amplitude setters |
| `max30102_config_spo2` | Statement | AVERAGING, ADC_RANGE, SAMPLE_RATE, PULSE_WIDTH(dropdown) | `max30102_config_spo2(AVG_4,ADC_RANGE_4096,SPO2_RATE_100,PW_411)` | config setters |

## Parameter Options

| Parameter | Values |
|-----------|--------|
| VALUE | SPO2, HEART_RATE, TEMPERATURE, RED, IR, RATIO, CORRELATION |
| TARGET | MEASURE, SPO2, HEART_RATE, FINGER |
| AVERAGING | NO_AVERAGING, AVG_2, AVG_4, AVG_8, AVG_16, AVG_32 |
| ADC_RANGE | ADC_RANGE_2048, ADC_RANGE_4096, ADC_RANGE_8192, ADC_RANGE_16384 |
| SAMPLE_RATE | SPO2_RATE_50, SPO2_RATE_100, SPO2_RATE_200, SPO2_RATE_400, SPO2_RATE_800, SPO2_RATE_1000, SPO2_RATE_1600, SPO2_RATE_3200 |
| PULSE_WIDTH | PW_69, PW_118, PW_215, PW_411 |

## ABS Examples

```
arduino_setup()
    serial_begin(Serial, 115200)
    max30102_init(0, 0, 0)

arduino_loop()
    max30102_measure(5000)
    controls_if(max30102_is_valid(MEASURE))
        serial_println(Serial, max30102_get_value(SPO2))
        serial_println(Serial, max30102_get_value(HEART_RATE))
    time_delay(1000)
```

## Notes

1. The library uses global helper state; no Blockly variable is required.
2. `max30102_measure` must run before value blocks return fresh data.
3. SDA, SCL, and INT must be connected. ESP32 code uses `Wire.begin(SDA, SCL)`; non-ESP32 cores use default `Wire.begin()`.
4. Avoid AVR boards with very small SRAM because the algorithm keeps two 100-sample buffers.
