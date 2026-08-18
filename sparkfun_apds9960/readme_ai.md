# SparkFun APDS9960 RGB gesture sensor

Blockly wrapper for the SparkFun APDS9960 RGB, proximity and gesture sensor.

## Library Info
- **Name**: @aily-project/lib-sparkfun-apds9960
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `apds9960_init` | Statement | VAR(field_input) | `apds9960_init("apds9960")` | `Wire.begin(); ↵ apds9960_ready = apds9960.init(); ↵ if (apds9960_ready) apds9960.enablePower();` |
| `apds9960_is_ready` | Value | VAR(field_variable) | `apds9960_is_ready($apds9960)` | `apds9960_ready` |
| `apds9960_enable_light` | Statement | VAR(field_variable), INTERRUPT(dropdown) | `apds9960_enable_light($apds9960, false)` | `apds9960.enableLightSensor(false);` |
| `apds9960_enable_proximity` | Statement | VAR(field_variable), INTERRUPT(dropdown) | `apds9960_enable_proximity($apds9960, false)` | `apds9960.enableProximitySensor(false);` |
| `apds9960_enable_gesture` | Statement | VAR(field_variable), INTERRUPT(dropdown) | `apds9960_enable_gesture($apds9960, true)` | `apds9960.enableGestureSensor(true);` |
| `apds9960_read_light` | Value | VAR(field_variable), CHANNEL(dropdown) | `apds9960_read_light($apds9960, "0")` | `apds9960ReadLight(apds9960, 0)` |
| `apds9960_read_proximity` | Value | VAR(field_variable) | `apds9960_read_proximity($apds9960)` | `apds9960ReadProximity(apds9960)` |
| `apds9960_gesture_available` | Value | VAR(field_variable) | `apds9960_gesture_available($apds9960)` | `apds9960.isGestureAvailable()` |
| `apds9960_read_gesture` | Value | VAR(field_variable) | `apds9960_read_gesture($apds9960)` | `apds9960.readGesture()` |
| `apds9960_set_ambient_gain` | Statement | VAR(field_variable), GAIN(dropdown) | `apds9960_set_ambient_gain($apds9960, AGAIN_1X)` | `apds9960.setAmbientLightGain(AGAIN_1X);` |
| `apds9960_set_proximity_gain` | Statement | VAR(field_variable), GAIN(dropdown) | `apds9960_set_proximity_gain($apds9960, PGAIN_1X)` | `apds9960.setProximityGain(PGAIN_1X);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| INTERRUPT | false, true | apds9960_enable_light, apds9960_enable_proximity |
| INTERRUPT | true, false | apds9960_enable_gesture |
| CHANNEL | 0, 1, 2, 3 | apds9960_read_light |
| GAIN | AGAIN_1X, AGAIN_4X, AGAIN_16X, AGAIN_64X | apds9960_set_ambient_gain |
| GAIN | PGAIN_1X, PGAIN_2X, PGAIN_4X, PGAIN_8X | apds9960_set_proximity_gain |

## ABS Examples

### Basic Usage
```
arduino_setup()
    apds9960_init("apds9960")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, apds9960_is_ready($apds9960))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `apds9960_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
