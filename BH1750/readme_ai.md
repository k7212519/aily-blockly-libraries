# BH1750 light sensor

BH1750 digital light intensity sensor control library, suitable for Arduino, ESP32 and other development boards. Use the I2C interface to read the light intensity value, convert the ambient light into a digital signal...

## Library Info
- **Name**: @aily-project/lib-bh1750
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bh1750_init_with_wire` | Statement | VAR(field_input), MODE(dropdown), ADDRESS(dropdown), WIRE(dropdown) | `bh1750_init_with_wire("lightMeter", CONTINUOUS_HIGH_RES_MODE, "0x23", WIRE)` | `// 初始化BH1750光照传感器 lightMeter ↵ if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE, 0x23, &WIRE)) { ↵ Serial.println("BH1750传感器 lightMeter 初始化成功!"); ↵ } else { ↵ Serial.println("警告: BH1750传感器 lightMeter 初始化失败，请检查接线!"); ↵ }` |
| `bh1750_read_light_level` | Value | VAR(field_variable) | `bh1750_read_light_level($lightMeter)` | `lightMeter.readLightLevel()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | CONTINUOUS_HIGH_RES_MODE, CONTINUOUS_HIGH_RES_MODE_2, CONTINUOUS_LOW_RES_MODE, ONE_TIME_HIGH_RES_MODE, ONE_TIME_HIGH_RES_MODE_2, ONE_TIME_LOW_RES_MODE, UNCONFIGURED | bh1750_init_with_wire |
| ADDRESS | 0x23, 0x5C | bh1750_init_with_wire |

## ABS Examples

### Basic Usage
```
arduino_setup()
    bh1750_init_with_wire("lightMeter", CONTINUOUS_HIGH_RES_MODE, "0x23", WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, bh1750_read_light_level($lightMeter))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `bh1750_init_with_wire("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **UI-only extension**: `bh1750_init_with_wire` refreshes board/I2C presentation only; it does not add ABS arguments.
