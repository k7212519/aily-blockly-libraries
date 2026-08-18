# R4 watchdog

Watchdog library for Arduino UNO R4

## Library Info
- **Name**: @aily-project/lib-r4-wdt
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `wdt_begin` | Statement | TIMEOUT(field_number) | `wdt_begin(2000)` | `WDT.begin(2000);` |
| `wdt_refresh` | Statement | (none) | `wdt_refresh()` | `WDT.refresh();` |
| `wdt_gettimeout` | Value | (none) | `wdt_gettimeout()` | `WDT.getTimeout()` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    wdt_begin(2000)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, wdt_gettimeout())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
