# text manipulation

Text related functions

## Library Info
- **Name**: @aily-project/lib-core-text
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `string_add_string` | Value | STRING1(input_value), STRING2(input_value) | `string_add_string(text("value"), text("value"))` | `String(1) + String(1)` |
| `array_get_dataAt` | Value | ARRAY(input_value), INDEX(input_value) | `array_get_dataAt(math_number(0), math_number(0))` | `1[1]` |
| `number_to` | Value | NUM(input_value) | `number_to(math_number(0))` | `char(1)` |
| `toascii` | Value | CHAR(input_value) | `toascii(text("value"))` | `(int)("value")` |
| `number_to_string` | Value | NUM(input_value) | `number_to_string(math_number(0))` | `String(1)` |
| `char` | Value | CHAR(field_input) | `char("CHAR")` | `'v'` |
| `text` | Value | TEXT(field_input) | `text("TEXT")` | `"value"` |
| `text_join` | Value | (none); variadic: ADD{0...}(input_value) | `text_join(ADD0=text("part"), ADD1=text("part"))` | `""` |
| `text_length` | Value | VALUE(input_value) | `text_length(text("value"))` | `String("value").length()` |
| `text_isEmpty` | Value | VALUE(input_value) | `text_isEmpty(text("value"))` | `String("value").length() == 0` |
| `text_indexOf` | Value | VALUE(input_value), END(dropdown), FIND(input_value) | `text_indexOf(text("value"), FIRST, text("value"))` | `String("value").indexOf("value")` |
| `string_endsWith` | Value | TEXT(input_value), SUFFIX(input_value) | `string_endsWith(text("value"), text("value"))` | `String("value").endsWith("value")` |
| `string_startsWith` | Value | TEXT(input_value), PREFIX(input_value) | `string_startsWith(text("value"), text("value"))` | `String("value").startsWith("value")` |
| `text_charAt` | Value | VALUE(input_value), WHERE(dropdown); runtime variants: indexed: AT(input_value); implicit-position: (none) | `text_charAt(text("value"), FROM_START, math_number(0))` | `String("value").charAt(1)` |
| `tt_getSubstring` | Value | STRING(input_value), WHERE1(dropdown), WHERE2(dropdown); runtime variants: indexed-to-indexed: AT1_VALUE(input_value), AT2_VALUE(input_value); indexed-to-last: AT1_VALUE(input_value); first-to-indexed: AT2_VALUE(input_value); first-to-last: (none) | `tt_getSubstring(text("value"), FROM_START, FROM_START, math_number(0), math_number(3))` | `String("value").substring(1, 1)` |
| `text_changeCase` | Value | CASE(dropdown), TEXT(input_value) | `text_changeCase(UPPERCASE, text("value"))` | `textToUpper("value")` |
| `text_trim` | Value | MODE(dropdown), TEXT(input_value) | `text_trim(BOTH, text("value"))` | `textTrim("value")` |
| `text_count` | Value | SUB(input_value), TEXT(input_value) | `text_count(text("value"), text("value"))` | `textCount("value", "value")` |
| `text_replace` | Value | TEXT(input_value), FROM(input_value), TO(input_value) | `text_replace(text("value"), math_number(0), math_number(0))` | `textReplaceAll(1, 1, 1)` |
| `text_reverse` | Value | TEXT(input_value) | `text_reverse(text("value"))` | `textReverse(1)` |
| `string_to_something` | Value | TEXT(input_value), TYPE(dropdown) | `string_to_something(text("value"), toInt)` | `String("value").toInt()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| END | FIRST, LAST | text_indexOf |
| WHERE | FROM_START, FROM_END, FIRST, LAST, RANDOM | text_charAt |
| WHERE1 | FROM_START, FROM_END, FIRST | tt_getSubstring |
| WHERE2 | FROM_START, FROM_END, LAST | tt_getSubstring |
| CASE | UPPERCASE, LOWERCASE, TITLECASE | text_changeCase |
| MODE | BOTH, LEFT, RIGHT | text_trim |
| TYPE | toInt, toLong, toFloat, toDouble, c_str, charAt0, toUpper, toLower | string_to_something |

## ABS Examples

### Basic Usage
```
arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, string_add_string(text("hello "), text("world")))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **Runtime shape**: `text_join` accepts named indexed inputs `ADD0`, `ADD1`, and so on; `text_charAt` adds `AT` only for indexed positions; `tt_getSubstring` adds `AT1_VALUE` and/or `AT2_VALUE` only for indexed endpoints. The `char` and `text` extensions are validation/UI-only.

## Runtime Variant Examples

### Runtime Variant: text_charAt/implicit-position
```abs
arduino_loop()
    serial_println(Serial, text_charAt(text("value"), FIRST))
```

### Runtime Variant: tt_getSubstring/indexed-to-last
```abs
arduino_loop()
    serial_println(Serial, tt_getSubstring(text("value"), FROM_START, LAST, math_number(0)))
```

### Runtime Variant: tt_getSubstring/first-to-indexed
```abs
arduino_loop()
    serial_println(Serial, tt_getSubstring(text("value"), FIRST, FROM_START, math_number(3)))
```

### Runtime Variant: tt_getSubstring/first-to-last
```abs
arduino_loop()
    serial_println(Serial, tt_getSubstring(text("value"), FIRST, LAST))
```
