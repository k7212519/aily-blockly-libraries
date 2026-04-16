# MAG3110 三轴磁力计

SparkFun MAG3110三轴磁力计传感器控制库，通过I2C读取三轴磁场数据，支持校准和航向角计算。

## Library Info
- **Name**: @aily-project/lib-sparkfun-mag3110
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mag3110_init` | Statement | VAR(field_input), WIRE(dropdown) | `mag3110_init("mag", Wire)` | `MAG3110 mag; ... mag.initialize(); mag.start();` |
| `mag3110_data_ready` | Value(Boolean) | VAR(field_variable) | `mag3110_data_ready($mag)` | `mag.dataReady()` |
| `mag3110_read_axis` | Value(Number) | VAR(field_variable), AXIS(dropdown) | `mag3110_read_axis($mag, X)` | `(_mag3110_read_mag(), _mag3110_read_mag_x)` |
| `mag3110_read_microtesla` | Value(Number) | VAR(field_variable), AXIS(dropdown) | `mag3110_read_microtesla($mag, X)` | `(_mag3110_ut_mag(), _mag3110_ut_mag_x)` |
| `mag3110_read_heading` | Value(Number) | VAR(field_variable) | `mag3110_read_heading($mag)` | `mag.readHeading()` |
| `mag3110_enter_cal_mode` | Statement | VAR(field_variable) | `mag3110_enter_cal_mode($mag)` | `mag.enterCalMode();` |
| `mag3110_calibrate` | Statement | VAR(field_variable) | `mag3110_calibrate($mag)` | `mag.calibrate();` |
| `mag3110_is_calibrated` | Value(Boolean) | VAR(field_variable) | `mag3110_is_calibrated($mag)` | `mag.isCalibrated()` |
| `mag3110_is_calibrating` | Value(Boolean) | VAR(field_variable) | `mag3110_is_calibrating($mag)` | `mag.isCalibrating()` |
| `mag3110_read_temperature` | Value(Number) | VAR(field_variable) | `mag3110_read_temperature($mag)` | `(int8_t)mag.readRegister(0x0F)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| AXIS | X, Y, Z | 磁场轴向 |
| WIRE | Wire, Wire1, ... | I2C总线（由开发板决定） |

## ABS Examples

### 基本读取磁场值
```
arduino_setup()
    mag3110_init("mag", Wire)
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: mag3110_data_ready($mag)
        @DO0:
            serial_print(Serial, text("X: "))
            serial_println(Serial, mag3110_read_axis($mag, X))
    time_delay(math_number(100))
```

### 校准并读取航向角
```
arduino_setup()
    mag3110_init("mag", Wire)
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: logic_negate(mag3110_is_calibrated($mag))
        @DO0:
            controls_if()
                @IF0: logic_negate(mag3110_is_calibrating($mag))
                @DO0:
                    mag3110_enter_cal_mode($mag)
            controls_if()
                @IF0: mag3110_is_calibrating($mag)
                @DO0:
                    mag3110_calibrate($mag)
    controls_if()
        @IF0: mag3110_is_calibrated($mag)
        @DO0:
            serial_println(Serial, mag3110_read_heading($mag))
```

## Notes

1. **Variable Creation**: `mag3110_init("varName", ...)` creates variable `$varName`; reference with `$varName`
2. **Initialization**: Place init block inside `arduino_setup()`
3. **Calibration**: Must call `mag3110_calibrate` in loop until `mag3110_is_calibrated` returns true before using `mag3110_read_heading`
4. **I2C Address**: Fixed at 0x0E, no configuration needed
