# ES8311 音频编解码库

ES8311 I2S 音频编解码器驱动，支持 ESP32 平台的录音、播放、音量调节与 WAV 文件保存。

## Library Info
- **Name**: @aily-project/lib-es8311
- **Version**: 1.0.0
- **Compatibility**: ESP32 only (requires I2S peripheral)

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `es8311_init` | Statement | VAR(field_input), WIRE(dropdown) + SDA,SCL,MCLK,BCLK,LRCK(input_value) + DIN,DOUT(input_value), SAMPLE_RATE(dropdown), RECORD_SECONDS(input_value) | `es8311_init("es8311", Wire, math_number(41), math_number(42), math_number(46), math_number(39), math_number(2), math_number(38), math_number(40), 16000, math_number(3))` | Wire.begin(); ES8311 register init; I2S init; audio buffer alloc |
| `es8311_record` | Statement | VAR(field_variable) | `es8311_record(variables_get($es8311))` | `es8311_record();` |
| `es8311_play` | Statement | VAR(field_variable) | `es8311_play(variables_get($es8311))` | `es8311_play();` |
| `es8311_set_volume` | Statement | VAR(field_variable), VOLUME(input_value) | `es8311_set_volume(variables_get($es8311), math_number(191))` | `es8311_writeReg(0x32, vol);` |
| `es8311_set_mic_gain` | Statement | VAR(field_variable), GAIN(input_value) | `es8311_set_mic_gain(variables_get($es8311), math_number(4))` | `es8311_readReg(0x16) + writeReg` |
| `es8311_save_wav` | Statement | VAR(field_variable), PATH(input_value) | `es8311_save_wav(variables_get($es8311), text("/rec_001.wav"))` | `es8311_saveWav(path);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| WIRE | `${board.i2c}` (Wire, Wire1, ...) | I2C 总线选择 |
| SAMPLE_RATE | 16000, 22050, 44100, 48000 | 音频采样率 (Hz) |
| VOLUME | 0-255 | DAC 输出音量寄存器值，默认 191 |
| GAIN | 0-8 | 麦克风 PGA 增益步进 |

## ABS Examples

### 基本录放
```abs
arduino_setup()
    es8311_init("es8311", Wire, math_number(41), math_number(42), math_number(46), math_number(39), math_number(2), math_number(38), math_number(40), 16000, math_number(3))
    es8311_set_volume(variables_get($es8311), math_number(191))

arduino_loop()
    es8311_record(variables_get($es8311))
    time_delay(math_number(100))
    es8311_play(variables_get($es8311))
    time_delay(math_number(2000))
```

### 录音并保存 WAV 文件
```abs
arduino_setup()
    es8311_init("es8311", Wire, math_number(41), math_number(42), math_number(46), math_number(39), math_number(2), math_number(38), math_number(40), 16000, math_number(3))

arduino_loop()
    es8311_record(variables_get($es8311))
    es8311_save_wav(variables_get($es8311), text("/rec_001.wav"))
    es8311_play(variables_get($es8311))
    time_delay(math_number(5000))
```

## Notes

1. **初始化**: `es8311_init` 必须在 `arduino_setup()` 中调用，会自动扫描 I2C 地址（0x18/0x30）
2. **ESP32 专用**: 本库依赖 ESP32 I2S 外设，仅支持 ESP32/ESP32-S3 开发板
3. **引脚配置**: 需根据实际硬件连接设置 SDA、SCL、MCLK、BCLK、LRCK、DIN、DOUT 引脚
4. **内存要求**: 录音缓冲区按 `采样率 × 秒数 × 2字节` 分配，16kHz/3秒约需 96KB
5. **变量引用**: `es8311_init` 创建变量后，其他块通过 `variables_get($es8311)` 引用
6. **文件系统**: `es8311_save_wav` 自动选择 SPIFFS 或 SD 卡存储
