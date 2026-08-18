# 24GHz millimeter wave radar

Seeed 24GHz millimeter wave radar sensor library supports human presence detection, moving/stationary target recognition and distance measurement

## Library Info
- **Name**: @aily-project/lib-seeed-mmwave
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `mmwave_init` | Statement | VAR(field_input), SERIAL_TYPE(dropdown); runtime variants: software-serial-pins: RX_PIN(dropdown), TX_PIN(dropdown); hardware-serial: (none) | `mmwave_init("radar", SOFTWARE, 2, 3)` | `SoftwareSerial radarSerial(RX_PIN, TX_PIN); ↵ Seeed_HSP24 radar(radarSerial); ↵ radarSerial.begin(9600); ↵ Seeed_HSP24::RadarStatus radar_status;` |
| `mmwave_update_status` | Statement | VAR(field_variable) | `mmwave_update_status($radar)` | `radar_status = radar.getStatus();` |
| `mmwave_target_is` | Value | VAR(field_variable), STATUS(dropdown) | `mmwave_target_is($radar, NoTarget)` | `(radar_status.targetStatus == Seeed_HSP24::TargetStatus::NoTarget)` |
| `mmwave_target_status` | Value | VAR(field_variable) | `mmwave_target_status($radar)` | `String(mmwave_targetStatusToString(radar_status.targetStatus))` |
| `mmwave_distance` | Value | VAR(field_variable) | `mmwave_distance($radar)` | `radar_status.distance` |
| `mmwave_set_detection` | Statement | VAR(field_variable), DISTANCE(input_value), DURATION(input_value) | `mmwave_set_detection($radar, math_number(0), math_number(1000))` | `radar.enableConfigMode(); ↵ radar.setDetectionDistance(1, 1); ↵ radar.disableConfigMode();` |
| `mmwave_set_gate_sensitivity` | Statement | VAR(field_variable), GATE(input_value), MOVE_POWER(input_value), STATIC_POWER(input_value) | `mmwave_set_gate_sensitivity($radar, math_number(0), math_number(0), math_number(0))` | `radar.enableConfigMode(); ↵ radar.setGatePower(1, 1, 1); ↵ radar.disableConfigMode();` |
| `mmwave_set_resolution` | Statement | VAR(field_variable), RESOLUTION(dropdown) | `mmwave_set_resolution($radar, "0")` | `radar.enableConfigMode(); ↵ radar.setResolution(0); ↵ radar.disableConfigMode();` |
| `mmwave_get_version` | Value | VAR(field_variable) | `mmwave_get_version($radar)` | `radar.getVersion()` |
| `mmwave_reboot` | Statement | VAR(field_variable) | `mmwave_reboot($radar)` | `radar.enableConfigMode(); ↵ radar.rebootRadar();` |
| `mmwave_factory_reset` | Statement | VAR(field_variable) | `mmwave_factory_reset($radar)` | `radar.enableConfigMode(); ↵ radar.refactoryRadar();` |
| `mmwave_engineering_mode` | Statement | VAR(field_variable), MODE(dropdown) | `mmwave_engineering_mode($radar, ENABLE)` | `radar.enableConfigMode(); ↵ radar.enableEngineeringModel(); ↵ radar.disableConfigMode();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SERIAL_TYPE | SOFTWARE, SERIAL1, SERIAL2 | mmwave_init |
| STATUS | NoTarget, MovingTarget, StaticTarget, BothTargets | mmwave_target_is |
| RESOLUTION | 0, 1 | mmwave_set_resolution |
| MODE | ENABLE, DISABLE | mmwave_engineering_mode |

## ABS Examples

### Basic Usage
```
arduino_setup()
    mmwave_init("radar", SOFTWARE, 2, 3)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, mmwave_target_is($radar, NoTarget))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `mmwave_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **Runtime shape**: `mmwave_init` adds `RX_PIN` and `TX_PIN` only for `SOFTWARE`; hardware serial modes use the shorter signature.

## Runtime Variant Examples

### Runtime Variant: mmwave_init/hardware-serial
```abs
arduino_setup()
    mmwave_init("radar", SERIAL1)
```
