# Arduino Math Library

Core library for mathematical operations, trigonometry, rounding, random numbers, and bitwise operations.

## Library Info
- **Name**: @aily-project/lib-core-math
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `math_number` | Value | NUM(field_number) | `math_number(42)` | `42` |
| `math_number_base` | Value | BASE(dropdown), NUM(field_input) | `math_number_base(HEX, "FF")` | `0xFF` |
| `math_arithmetic` | Value | A(input_value), OP(dropdown), B(input_value) | `math_arithmetic(math_number(5), ADD, math_number(3))` | `5 + 3` |
| `math_single` | Value | OP(dropdown), NUM(input_value) | `math_single(ROOT, math_number(16))` | `sqrt(16)` |
| `math_trig` | Value | OP(dropdown), NUM(input_value) | `math_trig(SIN, math_number(90))` | `sin(90 / 180 * PI)` |
| `math_constant` | Value | CONSTANT(dropdown) | `math_constant(PI)` | `PI` |
| `math_number_property` | Value | NUMBER_TO_CHECK(input_value), PROPERTY(dropdown) | `math_number_property(math_number(4), EVEN)` | `4 % 2 == 0` |
| `math_round` | Value | OP(dropdown), NUM(input_value) | `math_round(ROUND, math_number(3.7))` | `round(3.7)` |
| `math_modulo` | Value | DIVIDEND(input_value), DIVISOR(input_value) | `math_modulo(math_number(10), math_number(3))` | `10 % 3` |
| `math_constrain` | Value | VALUE(input_value), LOW(input_value), HIGH(input_value) | `math_constrain(math_number(15), math_number(0), math_number(10))` | `constrain(15, 0, 10)` |
| `math_random_int` | Value | FROM(input_value), TO(input_value) | `math_random_int(math_number(1), math_number(6))` | `random(1, 6 + 1)` |
| `math_random_float` | Value | (none) | `math_random_float()` | `(random(0, 1000) / 1000.0)` |
| `math_atan2` | Value | X(input_value), Y(input_value) | `math_atan2(math_number(1), math_number(1))` | `atan2(1, 1) * 180.0 / PI` |
| `math_round_to_decimal` | Value | NUMBER(input_value), DECIMALS(input_value) | `math_round_to_decimal(math_number(3.14159), math_number(2))` | `(round(3.14159 * pow(10, 2)) / pow(10, 2))` |
| `math_bitwise_not` | Value | NUM(input_value) | `math_bitwise_not(math_number(0xFF))` | `~0xFF` |
| `map_to` | Value | NUM(input_value), FIRST_START(input_value), FIRST_END(input_value), LAST_START(input_value), LAST_END(input_value) | `map_to(variables_get($val), math_number(0), math_number(1023), math_number(0), math_number(255))` | `map(val, 0, 1023, 0, 255)` |
| `math_bitwise_shift` | Value | A(input_value), OP(dropdown), B(input_value) | `math_bitwise_shift(math_number(1), LEFT, math_number(4))` | `1 << 4` |
| `math_bitwise_logic` | Value | A(input_value), OP(dropdown), B(input_value) | `math_bitwise_logic(math_number(0xF0), AND, math_number(0x0F))` | `0xF0 & 0x0F` |
| `math_extract_bits` | Value | OP(dropdown), NUM(input_value) | `math_extract_bits(HIGH_BYTE, math_number(0xFF00))` | `highByte(0xFF00)` |
| `math_bitread` | Value | NUM(input_value), BIT(input_value) | `math_bitread(variables_get($x), math_number(3))` | `bitRead(x, 3)` |
| `math_bitwrite` | Value | NUM(input_value), BIT(input_value), VALUE(input_value) | `math_bitwrite(variables_get($x), math_number(3), math_number(1))` | `((1) ? ((x) \| (1 << (3))) : ((x) & ~(1 << (3))))` |
| `math_bitset` | Value | NUM(input_value), BIT(input_value) | `math_bitset(variables_get($x), math_number(3))` | `(x \| (1 << 3))` |
| `math_bitclear` | Value | NUM(input_value), BIT(input_value) | `math_bitclear(variables_get($x), math_number(3))` | `(x & ~(1 << 3))` |
| `math_combine_bits` | Value | OP(dropdown), HIGH(input_value), LOW(input_value) | `math_combine_bits(MAKE_WORD, math_number(0x12), math_number(0x34))` | `word(0x12, 0x34)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| Arithmetic OP | ADD, MINUS, MULTIPLY, DIVIDE, MODULO, POWER | Basic arithmetic; POWER generates `pow(a, b)` |
| Single OP | ROOT, ABS, NEG, LN, LOG10, EXP, POW10 | sqrt, abs, negation, log, log10, exp, 10^x |
| Trig OP | SIN, COS, TAN, ASIN, ACOS, ATAN | Trig functions (input/output in degrees) |
| CONSTANT | PI, E, GOLDEN_RATIO, SQRT2, SQRT1_2, INFINITY | Mathematical constants |
| PROPERTY | EVEN, ODD, PRIME, WHOLE, POSITIVE, NEGATIVE, DIVISIBLE_BY | Number property checks (output Boolean) |
| Round OP | ROUND, ROUNDUP, ROUNDDOWN | round, ceil, floor |
| BASE | DEC, HEX, BIN | Number base for `math_number_base` |
| Shift OP | LEFT, RIGHT | `<<` or `>>` |
| Bitwise OP | AND, OR, XOR | `&`, `\|`, `^` |
| Extract OP | HIGH_BYTE, LOW_BYTE, HIGH_WORD, LOW_WORD | Extract byte/word from number |
| Combine OP | MAKE_WORD, MAKE_DWORD | Combine high/low into 16-bit or 32-bit |

## ABS Examples

### Arithmetic and Rounding
```
arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, math_arithmetic(math_number(10), ADD, math_number(5)))
    serial_println(Serial, math_round(ROUND, math_number(3.7)))
    serial_println(Serial, math_round_to_decimal(math_number(3.14159), math_number(2)))
    time_delay(math_number(1000))
```

### Sensor Value Mapping
```
arduino_setup()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, map_to(analog_read(math_number(0)), math_number(0), math_number(1023), math_number(0), math_number(255)))
    time_delay(math_number(500))
```

### Bitwise Operations
```
arduino_setup()
    serial_begin(Serial, 9600)
    serial_println(Serial, math_bitwise_shift(math_number(1), LEFT, math_number(4)))
    serial_println(Serial, math_bitwise_logic(math_number(0xF0), AND, math_number(0x0F)))
    serial_println(Serial, math_extract_bits(HIGH_BYTE, math_number(0xFF00)))
    serial_println(Serial, math_bitread(math_number(0b1010), math_number(1)))
    serial_println(Serial, math_combine_bits(MAKE_WORD, math_number(0x12), math_number(0x34)))
```

## Notes

1. **Trig units**: `math_trig` auto-converts degrees to radians; inverse functions return degrees.
2. **Random**: `math_random_int(FROM, TO)` is inclusive on both ends — generates `random(from, to + 1)`.
3. **DIVISIBLE_BY**: When PROPERTY is DIVISIBLE_BY, an extra DIVISOR input_value appears via mutator.
4. **PRIME**: Generates a helper function `mathIsPrime()` automatically.
5. **All blocks are Value blocks** — they return Number (except `math_number_property` returns Boolean).