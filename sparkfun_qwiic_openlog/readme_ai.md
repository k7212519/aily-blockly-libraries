# SparkFun Qwiic OpenLog

Blockly wrapper for SparkFun Qwiic OpenLog (I2C data logger to microSD).

## Library Info
- **Name**: @aily-project/lib-sparkfun-qwiic-openlog
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `qwiic_openlog_init` | Statement | VAR(field_input) | `qwiic_openlog_init("logger")` | `logger.begin();` |
| `qwiic_openlog_append` | Statement | VAR(field_variable), FILENAME(input_value) | `qwiic_openlog_append($logger, text("value"))` | `logger.append("value");` |
| `qwiic_openlog_print` | Statement | VAR(field_variable), DATA(input_value) | `qwiic_openlog_print($logger, math_number(0))` | `logger.print(1);` |
| `qwiic_openlog_println` | Statement | VAR(field_variable), DATA(input_value) | `qwiic_openlog_println($logger, math_number(0))` | `logger.println(1);` |
| `qwiic_openlog_sync` | Statement | VAR(field_variable) | `qwiic_openlog_sync($logger)` | `logger.syncFile();` |
| `qwiic_openlog_mkdir` | Statement | VAR(field_variable), DIRNAME(input_value) | `qwiic_openlog_mkdir($logger, text("value"))` | `logger.makeDirectory("value");` |
| `qwiic_openlog_cd` | Statement | VAR(field_variable), DIRNAME(input_value) | `qwiic_openlog_cd($logger, text("value"))` | `logger.changeDirectory("value");` |

## ABS Examples

### Basic Usage
```
arduino_setup()
    qwiic_openlog_init("logger")
    serial_begin(Serial, 9600)

arduino_loop()
    qwiic_openlog_append($logger, text("value"))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `qwiic_openlog_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
