# ESP32 timer

ESP32 timer library (Ticker) supports periodic or one-time scheduled execution of tasks, suitable for ESP32 series development boards

## Library Info
- **Name**: @aily-project/lib-esp32-ticker
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ticker_attach_ms` | Statement | TICKER(field_input), INTERVAL(input_value), CALLBACK(input_statement) | `ticker_attach_ms("ticker1", math_number(1000))` | `ticker1.attach_ms(1, ticker_callback_1);` |
| `ticker_once_ms` | Statement | TICKER(field_input), INTERVAL(input_value), CALLBACK(input_statement) | `ticker_once_ms("ticker1", math_number(1000))` | `ticker1.once_ms(1, ticker_callback_2);` |
| `ticker_detach` | Statement | TICKER(field_variable) | `ticker_detach($ticker1)` | `ticker1.detach();` |
| `ticker_active` | Value | TICKER(field_variable) | `ticker_active($ticker1)` | `ticker1.active()` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ticker_attach_ms("ticker1", math_number(1000))
        @CALLBACK:
            serial_println(Serial, text("tick"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ticker_active($ticker1))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
