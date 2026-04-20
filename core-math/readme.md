# Math Support

Core library providing mathematical operations, trigonometry, rounding, random numbers, and bitwise operations for Arduino.

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-core-math |
| Version | 0.0.1 |
| Author | ailyProject |
| License | MIT |

## Supported Boards

Arduino AVR, ESP32 (3.3V / 5V)

## Description

Provides essential math blocks for Blockly-based Arduino programming: arithmetic (+, −, ×, ÷, mod, pow), single-operand functions (sqrt, abs, ln, log10, exp), trigonometric functions (sin/cos/tan and inverses with degree input), mathematical constants (π, e, φ, √2, ∞), number properties (even/odd/prime/whole/positive/negative), rounding, random numbers, value mapping, decimal precision, and a full set of bitwise operations (shift, AND/OR/XOR, NOT, bit read/write/set/clear, extract/combine bytes and words).

## Quick Start

All blocks are value blocks (return a number or boolean). Drag them into any expression slot that accepts a Number.

## 使用示例

### 基础数学运算
```json
{
  "type": "math_arithmetic",
  "id": "add_block",
  "fields": {"OP": "ADD"},
  "inputs": {
    "A": {"block": {"type": "math_number", "fields": {"NUM": "10"}}},
    "B": {"block": {"type": "math_number", "fields": {"NUM": "5"}}}
  }
}
```

### 进制转换与位操作
```json
{
  "type": "math_bitwise_logic",
  "id": "bit_and",
  "fields": {"OP": "AND"},
  "inputs": {
    "A": {"block": {"type": "math_number_base", "fields": {"BASE": "HEX", "NUM": "FF"}}},
    "B": {"block": {"type": "math_number_base", "fields": {"BASE": "BIN", "NUM": "11110000"}}}
  }
}
```

## 重要规则

1. **必须遵守**: 数学运算输入必须是Number类型，位操作结果为整数
3. **常见错误**: ❌ 三角函数输入弧度制，❌ 随机数范围包含上界

## 支持的字段选项
- **BASE(进制)**: "DEC", "HEX", "BIN"
- **OP(算术)**: "ADD", "MINUS", "MULTIPLY", "DIVIDE", "MODULO", "POWER"
- **OP(单项)**: "ROOT", "ABS", "NEG", "LN", "LOG10", "EXP", "POW10"
- **OP(三角)**: "SIN", "COS", "TAN", "ASIN", "ACOS", "ATAN"
- **CONSTANT(常量)**: "PI", "E", "GOLDEN_RATIO", "SQRT2", "SQRT1_2", "INFINITY"
- **PROPERTY(数字性质)**: "EVEN", "ODD", "PRIME", "WHOLE", "POSITIVE", "NEGATIVE", "DIVISIBLE_BY"
- **OP(舍入)**: "ROUND", "ROUNDUP", "ROUNDDOWN"
- **OP(位移)**: "LEFT", "RIGHT"
- **OP(位逻辑)**: "AND", "OR", "XOR"