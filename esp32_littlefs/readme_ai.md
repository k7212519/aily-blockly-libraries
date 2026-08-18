# ESP32 LittleFS file system

ESP32 LittleFS file system supports operations such as reading, writing, and deleting files and directories.

## Library Info
- **Name**: @aily-project/lib-esp32-littlefs
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_littlefs_begin` | Statement | FORMAT(dropdown) | `esp32_littlefs_begin(true)` | `if (!LittleFS.begin(true)) { ↵ Serial.println("LittleFS Mount Failed"); ↵ return; ↵ }` |
| `esp32_littlefs_end` | Statement | (none) | `esp32_littlefs_end()` | `LittleFS.end();` |
| `esp32_littlefs_format` | Statement | (none) | `esp32_littlefs_format()` | `LittleFS.format();` |
| `esp32_littlefs_info` | Value | INFO(dropdown) | `esp32_littlefs_info(totalBytes)` | `LittleFS.totalBytes()` |
| `esp32_littlefs_write_file` | Statement | PATH(input_value), CONTENT(input_value) | `esp32_littlefs_write_file(text("value"), text("value"))` | `littlefs_writeFile("value", String("value").c_str());` |
| `esp32_littlefs_append_file` | Statement | PATH(input_value), CONTENT(input_value) | `esp32_littlefs_append_file(text("value"), text("value"))` | `littlefs_appendFile("value", String("value").c_str());` |
| `esp32_littlefs_read_file` | Value | PATH(input_value) | `esp32_littlefs_read_file(text("value"))` | `littlefs_readFile("value")` |
| `esp32_littlefs_delete_file` | Statement | PATH(input_value) | `esp32_littlefs_delete_file(text("value"))` | `LittleFS.remove("value");` |
| `esp32_littlefs_exists` | Value | PATH(input_value) | `esp32_littlefs_exists(text("value"))` | `LittleFS.exists("value")` |
| `esp32_littlefs_rename` | Statement | OLD_PATH(input_value), NEW_PATH(input_value) | `esp32_littlefs_rename(text("value"), text("value"))` | `LittleFS.rename("value", "value");` |
| `esp32_littlefs_mkdir` | Statement | PATH(input_value) | `esp32_littlefs_mkdir(text("value"))` | `LittleFS.mkdir("value");` |
| `esp32_littlefs_rmdir` | Statement | PATH(input_value) | `esp32_littlefs_rmdir(text("value"))` | `LittleFS.rmdir("value");` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| FORMAT | true, false | esp32_littlefs_begin |
| INFO | totalBytes, usedBytes | esp32_littlefs_info |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_littlefs_begin(true)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_littlefs_info(totalBytes))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
