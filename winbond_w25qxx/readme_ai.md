# Winbond W25Qxx

Cross-controller SPI blocks for common Winbond W25Qxx NOR flash devices.

## Library Info
- **Name**: @aily-project/lib-winbond-w25qxx
- **Version**: 0.1.0
- **Author**: Winbond / Aily Project
- **Source**: https://github.com/LibDriver/w25qxx
- **License**: MIT

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `winbond_w25qxx_init` | Statement | VAR(field_input), CS(dropdown) | `winbond_w25qxx_init(VAR, CS)` | `AilyW25QXX w25qxx(CS, &SPI); ↵ while (!(w25qxx.begin())) { delay(100); }` |
| `winbond_w25qxx_read` | Value | VAR(field_variable), DATA(dropdown), INDEX(input_value) | `winbond_w25qxx_read($w25qxx, byte, math_number(0))` | `w25qxx.readByte((uint32_t)1)` |
| `winbond_w25qxx_action` | Statement | VAR(field_variable), ACTION(dropdown) | `winbond_w25qxx_action($w25qxx, erase_chip)` | `w25qxx.eraseChip();` |
| `winbond_w25qxx_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `winbond_w25qxx_set($w25qxx, erase_sector, math_number(0))` | `w25qxx.eraseSector((uint32_t)1);` |
| `winbond_w25qxx_write` | Statement | VAR(field_variable), INDEX(input_value), VALUE(input_value) | `winbond_w25qxx_write($w25qxx, INDEX, VALUE)` | `w25qxx.writeByte((uint32_t)1, (uint8_t)1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| winbond_w25qxx_init.CS | board-provided options | Selects the generated API option. |
| winbond_w25qxx_read.DATA | byte, busy, jedec | Selects the generated API option. |
| winbond_w25qxx_action.ACTION | erase_chip, sleep, wake | Selects the generated API option. |
| winbond_w25qxx_set.SETTING | erase_sector | Selects the generated API option. |

## ABS Examples

### Basic Usage

```
arduino_setup()
    winbond_w25qxx_init("w25qxx", CS)
```

## Notes

1. The init block registers a typed Blockly variable and emits the required driver include and object declaration.
2. Input value sockets include numeric shadow blocks.
3. The package is marked untested until verified on physical hardware.
