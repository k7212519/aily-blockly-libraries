# SparkFun TTL Fingerprint Scanner

Blockly wrapper for GT-511C3/GT-521F TTL fingerprint scanners.

## Library Info
- **Name**: @aily-project/lib-sparkfun-fingerprint-scanner-ttl
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `fps_init` | Statement | VAR(field_input), RX(field_number), TX(field_number) | `fps_init("fps", 4, 5)` | `fps.Open();` |
| `fps_led` | Statement | VAR(field_variable), STATE(dropdown) | `fps_led($fps, true)` | `fps.SetLED(true);` |
| `fps_enroll_count` | Value | VAR(field_variable) | `fps_enroll_count($fps)` | `fps.GetEnrollCount()` |
| `fps_is_pressed` | Value | VAR(field_variable) | `fps_is_pressed($fps)` | `fps.IsPressFinger()` |
| `fps_capture` | Value | VAR(field_variable), QUALITY(dropdown) | `fps_capture($fps, true)` | `fps.CaptureFinger(true)` |
| `fps_identify` | Value | VAR(field_variable) | `fps_identify($fps)` | `fps.Identify1_N()` |
| `fps_verify` | Value | VAR(field_variable), ID(input_value) | `fps_verify($fps, math_number(0))` | `fps.Verify1_1(1)` |
| `fps_check_enrolled` | Value | VAR(field_variable), ID(input_value) | `fps_check_enrolled($fps, math_number(0))` | `fps.CheckEnrolled(1)` |
| `fps_enroll_start` | Value | VAR(field_variable), ID(input_value) | `fps_enroll_start($fps, math_number(0))` | `fps.EnrollStart(1)` |
| `fps_enroll_step` | Value | VAR(field_variable), STEP(dropdown) | `fps_enroll_step($fps, Enroll1)` | `fps.Enroll1()` |
| `fps_delete_id` | Statement | VAR(field_variable), ID(input_value) | `fps_delete_id($fps, math_number(0))` | `fps.DeleteID(1);` |
| `fps_delete_all` | Statement | VAR(field_variable) | `fps_delete_all($fps)` | `fps.DeleteAll();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| STATE | true, false | fps_led |
| QUALITY | true, false | fps_capture |
| STEP | Enroll1, Enroll2, Enroll3 | fps_enroll_step |

## ABS Examples

### Basic Usage
```
arduino_setup()
    fps_init("fps", 4, 5)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, fps_enroll_count($fps))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `fps_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
