# logic control

Core library for logic control

## Library Info
- **Name**: @aily-project/lib-core-logic
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `controls_if` | Statement | IF0(input_value), DO0(input_statement); runtime variants: simple-if: (none); one-else-if: IF1(input_value), DO1(input_statement); else-only: ELSE(input_statement); one-else-if-and-else: IF1(input_value), DO1(input_statement), ELSE(input_statement) | `controls_if(math_number(0))` | `if (1) { ↵ }` |
| `controls_ifelse` | Statement | IF0(input_value), DO0(input_statement), ELSE(input_statement); runtime variants: if-else: (none); one-else-if-and-else: IF1(input_value), DO1(input_statement) | `controls_ifelse(math_number(0))` | `if (1) { ↵ } else { ↵ }` |
| `controls_switch` | Statement | SWITCH(input_value), CASE0(input_value), DO0(input_statement), DEFAULT(input_statement); runtime variants: one-case: (none); two-cases: CASE1(input_value), DO1(input_statement) | `controls_switch(math_number(0), math_number(0))` | `switch (1) { ↵ case 1: ↵ break; ↵ default: ↵ break; ↵ }` |
| `logic_compare` | Value | A(input_value), OP(dropdown), B(input_value) | `logic_compare(math_number(0), EQ, math_number(0))` | `1 == 1` |
| `logic_operation` | Value | A(input_value), OP(dropdown), B(input_value) | `logic_operation(math_number(0), AND, math_number(0))` | `1 && 1` |
| `logic_negate` | Value | BOOL(input_value) | `logic_negate(logic_boolean(TRUE))` | `!1` |
| `logic_boolean` | Value | BOOL(dropdown) | `logic_boolean(true)` | `true` |
| `logic_ternary` | Value | IF(input_value), THEN(input_value), ELSE(input_value) | `logic_ternary(logic_boolean(TRUE), math_number(0), math_number(0))` | `true ? 1 : 1` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| OP | EQ, NEQ, LT, GT, GTE, LTE | logic_compare |
| OP | AND, OR | logic_operation |
| BOOL | true, false | logic_boolean |

## ABS Examples

### Basic Usage
```
arduino_loop()
    controls_if(math_number(0))
        @IF0: logic_compare(math_number(1), EQ, math_number(1))
        @DO0:
            serial_println(Serial, text("condition matched"))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **Runtime shape**: conditional blocks add named branch inputs `IF1...`, statement markers `@DO1:...`, and optional `@ELSE:`; `controls_switch` similarly adds `CASE1...` and `@DO1:...`. `logic_operation` and `logic_ternary` only change UI behavior and keep static ABS signatures.

## Runtime Variant Examples

### Runtime Variant: controls_if/one-else-if
```abs
arduino_loop()
    controls_if(math_number(0), logic_boolean(false))
        @DO1:
            serial_println(Serial, text("else-if"))
```

### Runtime Variant: controls_if/else-only
```abs
arduino_loop()
    controls_if(math_number(0))
        @ELSE:
            serial_println(Serial, text("else"))
```

### Runtime Variant: controls_if/one-else-if-and-else
```abs
arduino_loop()
    controls_if(math_number(0), logic_boolean(false))
        @DO1:
            serial_println(Serial, text("else-if"))
        @ELSE:
            serial_println(Serial, text("else"))
```

### Runtime Variant: controls_ifelse/one-else-if-and-else
```abs
arduino_loop()
    controls_ifelse(math_number(0), logic_boolean(false))
        @DO1:
            serial_println(Serial, text("else-if"))
```

### Runtime Variant: controls_switch/two-cases
```abs
arduino_loop()
    controls_switch(math_number(0), math_number(0), math_number(1))
        @DO1:
            serial_println(Serial, text("case 1"))
```
