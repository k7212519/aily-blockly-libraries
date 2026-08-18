# SimpleKeypad (矩阵键盘)

矩阵键盘扫描库，支持多种布局、去抖和多键检测。

## Library Info
- **Name**: @aily-project/lib-simple-keypad
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `simple_keypad_init` | Statement | VAR(field_input), LAYOUT(dropdown), KEYMAP(field_input); runtime variants: layout-4x4: ROW_0(dropdown), ROW_1(dropdown), ROW_2(dropdown), ROW_3(dropdown), COL_0(dropdown), COL_1(dropdown), COL_2(dropdown), COL_3(dropdown); layout-4x3: ROW_0(dropdown), ROW_1(dropdown), ROW_2(dropdown), ROW_3(dropdown), COL_0(dropdown), COL_1(dropdown), COL_2(dropdown); layout-3x4: ROW_0(dropdown), ROW_1(dropdown), ROW_2(dropdown), COL_0(dropdown), COL_1(dropdown), COL_2(dropdown), COL_3(dropdown); layout-3x3: ROW_0(dropdown), ROW_1(dropdown), ROW_2(dropdown), COL_0(dropdown), COL_1(dropdown), COL_2(dropdown); layout-3x1: ROW_0(dropdown), ROW_1(dropdown), ROW_2(dropdown), COL_0(dropdown); layout-1x3: ROW_0(dropdown), COL_0(dropdown), COL_1(dropdown), COL_2(dropdown) | `simple_keypad_init("keypad", "4x4", "123A456B789C*0#D", ROW_0=2, ROW_1=3, ROW_2=4, ROW_3=5, COL_0=6, COL_1=7, COL_2=8, COL_3=9)` | `char keypad_keys[] = "123A456B789C*0#D"; ↵ byte keypad_rowPins[] = {ROW_0, ROW_1, ROW_2, ROW_3}; ↵ byte keypad_colPins[] = {COL_0, COL_1, COL_2, COL_3}; ↵ SimpleKeypad keypad(keypad_keys, keypad_rowPins, keypad_colPins, 4, 4);` |
| `simple_keypad_get_key` | Value | VAR(field_variable) | `simple_keypad_get_key($keypad)` | `simpleKeypadGetKeyStr(keypad)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| LAYOUT | 4x4, 4x3, 3x4, 3x3, 3x1, 1x3 | 键盘行列布局 |
| KEYMAP | 自定义字符串 | 按键字符映射，按行优先排列，长度需匹配布局（如 4×4 需 16 个字符） |

## Dynamic Fields

**`simple_keypad_init`**: 根据 LAYOUT 下拉值动态显示对应数量的行引脚 (ROW_0..ROW_n) 和列引脚 (COL_0..COL_m) 选择器。切换布局时自动更新。

## ABS Examples

### Basic Usage
```abs
arduino_setup()
    simple_keypad_init("keypad", "4x4", "123A456B789C*0#D", ROW_0=2, ROW_1=3, ROW_2=4, ROW_3=5, COL_0=6, COL_1=7, COL_2=8, COL_3=9)
    serial_begin(Serial, 115200)

arduino_loop()
    serial_println(Serial, simple_keypad_get_key($keypad))
    time_delay(math_number(100))
```

### 4×3 Keypad
```abs
arduino_setup()
    simple_keypad_init("kpad", "4x3", "123456789*0#", ROW_0=2, ROW_1=3, ROW_2=4, ROW_3=5, COL_0=6, COL_1=7, COL_2=8)

arduino_loop()
    serial_println(Serial, simple_keypad_get_key($kpad))
    time_delay(math_number(50))
```

### Other Runtime Layouts

```abs
simple_keypad_init("keypad34", "3x4", "1234567890AB", ROW_0=2, ROW_1=3, ROW_2=4, COL_0=5, COL_1=6, COL_2=7, COL_3=8)
simple_keypad_init("keypad33", "3x3", "123456789", ROW_0=2, ROW_1=3, ROW_2=4, COL_0=5, COL_1=6, COL_2=7)
simple_keypad_init("keypad31", "3x1", "123", ROW_0=2, ROW_1=3, ROW_2=4, COL_0=5)
simple_keypad_init("keypad13", "1x3", "123", ROW_0=2, COL_0=3, COL_1=4, COL_2=5)
```

## Notes

1. **Variable**: `simple_keypad_init("varName", ...)` creates variable `$varName`; reference it later with `$varName` in value slots.
2. **Keymap**: Characters are arranged row-major. For 4×4 default: `123A456B789C*0#D`.
3. **Return type**: `simple_keypad_get_key` returns a `String` — empty string if no key is pressed.
4. **Scanning**: The library internally scans every 2ms with 10ms debounce; just call `getKey()` in loop.
