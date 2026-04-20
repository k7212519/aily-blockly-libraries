# Seeed BGT24LTR11 Doppler Radar

24GHz Doppler radar sensor for detecting target motion state and speed via UART.

## Library Info
- **Name**: @aily-project/lib-seeed-dopplerradar
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `doppler_radar_init` | Statement | VAR(field_input), SERIAL(dropdown), MODE(dropdown) | `doppler_radar_init("BGT", Serial1, 0)` | `BGT24LTR11<HardwareSerial> BGT; Serial1.begin(115200); BGT.init(Serial1); while(!BGT.setMode(0));` |
| `doppler_radar_set_mode` | Statement | VAR(field_variable), MODE(dropdown) | `doppler_radar_set_mode($BGT, 0)` | `BGT.setMode(0);` |
| `doppler_radar_target_is` | Value(Boolean) | VAR(field_variable), STATE(dropdown) | `doppler_radar_target_is($BGT, APPROACH)` | `(BGT.getTargetState() == 0x02)` |
| `doppler_radar_get_speed` | Value(Number) | VAR(field_variable) | `doppler_radar_get_speed($BGT)` | `BGT.getSpeed()` |
| `doppler_radar_set_threshold` | Statement | VAR(field_variable), THRESHOLD(input_value) | `doppler_radar_set_threshold($BGT, math_number(1024))` | `BGT.setThreshold(1024);` |
| `doppler_radar_get_threshold` | Value(Number) | VAR(field_variable) | `doppler_radar_get_threshold($BGT)` | `BGT.getThreshold()` |
| `doppler_radar_set_speed_scope` | Statement | VAR(field_variable), MAX_SPEED(input_value), MIN_SPEED(input_value) | `doppler_radar_set_speed_scope($BGT, math_number(512), math_number(0))` | `BGT.setSpeedScope(512, 0);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | 0, 1 | 0=Target detection mode, 1=I/Q ADC mode |
| STATE | APPROACH, LEAVE, NONE | Target approaching(0x02), leaving(0x01), no target(0x00) |
| SERIAL | Serial, Serial1, Serial2... | Board serial port (auto-populated) |

## ABS Examples

### Basic Target Detection
```
arduino_setup()
    doppler_radar_init("BGT", Serial1, 0)
    serial_begin(Serial, 9600)

arduino_loop()
    controls_if()
        @IF0: doppler_radar_target_is(variables_get($BGT), APPROACH)
        @DO0:
            serial_println(Serial, text("Target approaching!"))
            serial_println(Serial, doppler_radar_get_speed(variables_get($BGT)))
    time_delay(math_number(500))
```

### Configure Detection Range
```
arduino_setup()
    doppler_radar_init("BGT", Serial1, 0)
    doppler_radar_set_threshold(variables_get($BGT), math_number(1024))
    doppler_radar_set_speed_scope(variables_get($BGT), math_number(512), math_number(0))
```

## Notes

1. **Serial port**: The radar communicates at 115200 baud, automatically configured during init
2. **Variable**: `doppler_radar_init("BGT", ...)` creates variable `$BGT`; reference with `variables_get($BGT)`
3. **Target states**: APPROACH=0x02 (approaching), LEAVE=0x01 (leaving), NONE=0x00 (no target)
4. **Board adaptation**: Serial type (HardwareSerial/Uart/SerialUART) is auto-detected based on board
5. **Mode**: Use mode 0 (target detection) for speed/state readings; mode 1 (I/Q ADC) for raw signal data
