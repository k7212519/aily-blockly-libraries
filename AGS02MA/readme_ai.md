# AGS02MA TVOC sensor

AGS02MA TVOC gas sensor control library is suitable for development boards such as Arduino and ESP32. It uses the I2C interface to read TVOC concentration and output a digital quantity in PPB units.

## Library Info
- **Name**: @aily-project/lib-ags02ma
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ags02ma_init` | Statement | WIRE(dropdown) | `ags02ma_init(WIRE)` | `AGS02MA ags02ma(0x1A, &WIRE); ↵ // 配置I2C引脚并初始化AGS02MA TVOC传感器 ↵ Serial.println("AGS02MA TVOC传感器初始化..."); ↵ WIRE.begin(); ↵ Serial.println("WIRE使用默认引脚"); ↵ if (ags02ma.begin()) { ↵ Serial.println("AGS02MA传感器初始化成功!"); ↵ ags02ma.setPPBMode(); ↵ Serial.println("传感器设置完成，开始测量!"); ↵ } else { ↵ Serial.println("警告: AGS02MA传感器初始化失败!"); ↵ Serial.println("请检查:"); ↵ Serial.println("1. 传感器地址是否为0x1A"); ↵ Serial.println("2. I2C接线是否正确"); ↵ Serial.println("3. 传感器供电是否正常"); ↵ }` |
| `ags02ma_read_tvoc_ppb` | Value | (none) | `ags02ma_read_tvoc_ppb()` | `ags02ma.readPPB()` |
| `ags02ma_read_tvoc_ugm3` | Value | (none) | `ags02ma_read_tvoc_ugm3()` | `ags02ma_read_ugm3_converted()` |
| `ags02ma_reset` | Statement | (none) | `ags02ma_reset()` | `ags02ma.reset();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| WIRE | ${board.i2c} | ags02ma_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ags02ma_init(WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ags02ma_read_tvoc_ppb())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **UI-only extension**: `ags02ma_init` reads board metadata and an existing `WIRE` selection; it does not add ABS arguments.
