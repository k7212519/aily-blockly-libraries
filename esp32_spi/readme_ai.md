# ESP32 SPI

ESP32 SPI communication support library, suitable for ESP32 series development boards

## Library Info
- **Name**: @aily-project/lib-esp32-spi
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_spi_begin` | Statement | VAR(field_input), BUS(dropdown) | `esp32_spi_begin("SPI", HSPI)` | `SPI.begin(); // 初始化SPI SPI` |
| `esp32_spi_begin_custom` | Statement | VAR(field_input), BUS(dropdown), SCK(input_value), MISO(input_value), MOSI(input_value), SS(input_value) | `esp32_spi_begin_custom("SPI", HSPI, math_number(0), math_number(0), math_number(0), math_number(0))` | `SPI.begin(1, 1, 1, 1); // 自定义SPI SPI` |
| `esp32_spi_settings` | Statement | SPI(dropdown), FREQUENCY(input_value), BIT_ORDER(dropdown), MODE(dropdown) | `esp32_spi_settings(SPI, math_number(0), MSBFIRST, "0")` | `SPI.setFrequency(((uint32_t)((1) * 1000000.0))); ↵ SPI.setBitOrder(MSBFIRST); ↵ SPI.setDataMode(0);` |
| `esp32_spi_begin_transaction` | Statement | SPI(dropdown), FREQUENCY(input_value), BIT_ORDER(dropdown), MODE(dropdown) | `esp32_spi_begin_transaction(SPI, math_number(0), MSBFIRST, "0")` | `SPI.beginTransaction(SPISettings(((uint32_t)((1) * 1000000.0)), MSBFIRST, SPI_MODE0));` |
| `esp32_spi_end_transaction` | Statement | SPI(dropdown) | `esp32_spi_end_transaction(SPI)` | `SPI.endTransaction();` |
| `esp32_spi_transfer` | Value | SPI(dropdown), DATA(input_value) | `esp32_spi_transfer(SPI, math_number(0))` | `SPI.transfer(1)` |
| `esp32_spi_transfer16` | Value | SPI(dropdown), DATA(input_value) | `esp32_spi_transfer16(SPI, math_number(0))` | `SPI.transfer16(1)` |
| `esp32_spi_write` | Statement | SPI(dropdown), DATA(input_value) | `esp32_spi_write(SPI, math_number(0))` | `SPI.write(1);` |
| `esp32_spi_write_bytes` | Statement | SPI(dropdown), DATA(input_value), LENGTH(input_value) | `esp32_spi_write_bytes(SPI, math_number(0), math_number(0))` | `SPI.writeBytes(1, 1);` |
| `esp32_spi_set_frequency` | Statement | SPI(dropdown), FREQUENCY(input_value) | `esp32_spi_set_frequency(SPI, math_number(0))` | `SPI.setFrequency(((uint32_t)((1) * 1000000.0)));` |
| `esp32_spi_set_bit_order` | Statement | SPI(dropdown), BIT_ORDER(dropdown) | `esp32_spi_set_bit_order(SPI, MSBFIRST)` | `SPI.setBitOrder(MSBFIRST);` |
| `esp32_spi_set_data_mode` | Statement | SPI(dropdown), MODE(dropdown) | `esp32_spi_set_data_mode(SPI, "0")` | `SPI.setDataMode(0);` |
| `esp32_spi_get_ss_pin` | Value | SPI(dropdown) | `esp32_spi_get_ss_pin(SPI)` | `SPI.pinSS()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BUS | HSPI, VSPI | esp32_spi_begin, esp32_spi_begin_custom |
| BIT_ORDER | MSBFIRST, LSBFIRST | esp32_spi_settings, esp32_spi_begin_transaction, esp32_spi_set_bit_order |
| MODE | 0, 1, 2, 3 | esp32_spi_settings, esp32_spi_begin_transaction, esp32_spi_set_data_mode |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_spi_begin("SPI", HSPI)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_spi_transfer(SPI, math_number(0)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_spi_begin("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **UI-only extensions**: these blocks refresh existing SPI instance dropdowns and board metadata; they do not add ABS arguments.
