# INA219 power meter

INA219 sensor driver library, suitable for esp32 and arduino, supports I2C communication, provides current, bus voltage, branch voltage, and power data acquisition functions, low drift and high accuracy, and is compat...

## Library Info
- **Name**: @aily-project/lib-adafruit-ina219
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ina219_init_with_wire` | Statement | VAR(field_input), ADDRESS(field_input), WIRE(dropdown) | `ina219_init_with_wire("ina219", "0x40", WIRE)` | `// 初始化INA219电流传感器 ina219 ↵ if (ina219.begin(&WIRE)) { ↵ Serial.println("INA219传感器 ina219 初始化成功!"); ↵ } else { ↵ Serial.println("警告: INA219传感器 ina219 初始化失败，请检查接线!"); ↵ }` |
| `ina219_read_value` | Value | VAR(field_variable), TYPE(dropdown) | `ina219_read_value($ina219, BUS_VOLTAGE)` | `ina219.getBusVoltage_V()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | BUS_VOLTAGE, SHUNT_VOLTAGE, CURRENT, POWER | ina219_read_value |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ina219_init_with_wire("ina219", "0x40", WIRE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ina219_read_value($ina219, BUS_VOLTAGE))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ina219_init_with_wire("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **UI-only extension**: `ina219_init_with_wire` refreshes board/I2C presentation only; it does not add ABS arguments.
