# matrix keyboard

Emakefun matrix keyboard module library supports 4x4 matrix keyboard key detection

## Library Info
- **Name**: @aily-project/lib-emakefun-matrix-keyboard
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `matrix_keyboard_init` | Statement | VAR(field_input), I2C_ADDR(field_input) | `matrix_keyboard_init("keyboard", "0x65")` | `Wire.begin(); ↵ if (keyboard.Initialize() != emakefun::MatrixKeyboard::ErrorCode::kOK) { ↵ Serial.println("Matrix keyboard initialization failed!"); ↵ while(1); ↵ } ↵ Serial.println("Matrix keyboard initialized successfully");` |
| `matrix_keyboard_tick` | Statement | VAR(field_variable) | `matrix_keyboard_tick($keyboard)` | `keyboard.Tick();` |
| `matrix_keyboard_get_current_key` | Value | VAR(field_variable) | `matrix_keyboard_get_current_key($keyboard)` | `keyboard.GetCurrentPressedKey()` |
| `matrix_keyboard_key_pressed` | Value | VAR(field_variable), KEY(dropdown) | `matrix_keyboard_key_pressed($keyboard, kKey0)` | `keyboard.Pressed(emakefun::MatrixKeyboard::kKey0)` |
| `matrix_keyboard_key_pressing` | Value | VAR(field_variable), KEY(dropdown) | `matrix_keyboard_key_pressing($keyboard, kKey0)` | `keyboard.Pressing(emakefun::MatrixKeyboard::kKey0)` |
| `matrix_keyboard_key_released` | Value | VAR(field_variable), KEY(dropdown) | `matrix_keyboard_key_released($keyboard, kKey0)` | `keyboard.Released(emakefun::MatrixKeyboard::kKey0)` |
| `matrix_keyboard_key_idle` | Value | VAR(field_variable), KEY(dropdown) | `matrix_keyboard_key_idle($keyboard, kKey0)` | `keyboard.Idle(emakefun::MatrixKeyboard::kKey0)` |
| `matrix_keyboard_get_key_state` | Value | VAR(field_variable), KEY(dropdown) | `matrix_keyboard_get_key_state($keyboard, kKey0)` | `(int)keyboard.GetKeyState(emakefun::MatrixKeyboard::kKey0)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| KEY | kKey0, kKey1, kKey2, kKey3, kKey4, kKey5, kKey6, kKey7, kKey8, kKey9, kKeyA, kKeyB, kKeyC, kKeyD, kKeyAsterisk, kKeyNumberSign | matrix_keyboard_key_pressed, matrix_keyboard_key_pressing, matrix_keyboard_key_released |

## ABS Examples

### Basic Usage
```
arduino_setup()
    matrix_keyboard_init("keyboard", "0x65")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, matrix_keyboard_get_current_key($keyboard))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `matrix_keyboard_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
