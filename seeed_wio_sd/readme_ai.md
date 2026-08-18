# Wio Terminal SD Card Storage Library

SD card storage library dedicated to the Wio Terminal onboard SD slot. Supports file read/write, append, delete, rename, and directory management operations.

## Library Info
- **Name**: @aily-project/lib-seeed-wio-sd
- **Version**: 1.0.5

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_fs_sd_begin` | Statement | (none); runtime variants: current: (none); legacy-frequency: FREQUENCY(input_value) | `seeed_fs_sd_begin()` | `if (!SD.begin(SDCARD_SS_PIN, SDCARD_SPI, 24000000UL)) { ↵ Serial.println("Card Mount Failed"); ↵ return; ↵ } ↵ Serial.println("SD card initialized.");` |
| `seeed_fs_sd_card_info` | Value | INFO(dropdown) | `seeed_fs_sd_card_info(cardType)` | `SD.cardType()` |
| `seeed_fs_file_exists` | Value | PATH(input_value) | `seeed_fs_file_exists(text("value"))` | `SD.exists("value")` |
| `seeed_fs_open_file` | Value | VAR(field_variable), PATH(input_value), MODE(dropdown) | `seeed_fs_open_file($file, text("value"), FILE_READ)` | `file = SD.open("value", FILE_READ)` |
| `seeed_fs_close_file` | Statement | VAR(field_variable) | `seeed_fs_close_file($file)` | `file.close();` |
| `seeed_fs_write_file` | Statement | VAR(field_variable), CONTENT(input_value) | `seeed_fs_write_file($file, text("value"))` | `file.print(String("value").c_str());` |
| `seeed_fs_read_file` | Value | VAR(field_variable) | `seeed_fs_read_file($file)` | `seeedReadFileContent(file)` |
| `seeed_fs_file_available` | Value | VAR(field_variable) | `seeed_fs_file_available($file)` | `file.available()` |
| `seeed_fs_file_size` | Value | VAR(field_variable) | `seeed_fs_file_size($file)` | `file.size()` |
| `seeed_fs_write_quick` | Statement | PATH(input_value), CONTENT(input_value) | `seeed_fs_write_quick(text("value"), text("value"))` | `seeedWriteFile("value", String("value").c_str());` |
| `seeed_fs_read_quick` | Value | PATH(input_value) | `seeed_fs_read_quick(text("value"))` | `seeedReadFile("value")` |
| `seeed_fs_append_file` | Statement | PATH(input_value), CONTENT(input_value) | `seeed_fs_append_file(text("value"), text("value"))` | `seeedAppendFile("value", String("value").c_str());` |
| `seeed_fs_delete_file` | Statement | PATH(input_value) | `seeed_fs_delete_file(text("value"))` | `if (SD.remove("value")) { ↵ Serial.println("File deleted"); ↵ } else { ↵ Serial.println("Delete failed"); ↵ }` |
| `seeed_fs_rename_file` | Statement | OLD_PATH(input_value), NEW_PATH(input_value) | `seeed_fs_rename_file(text("value"), text("value"))` | `if (SD.rename("value", "value")) { ↵ Serial.println("File renamed"); ↵ } else { ↵ Serial.println("Rename failed"); ↵ }` |
| `seeed_fs_create_dir` | Statement | PATH(input_value) | `seeed_fs_create_dir(text("value"))` | `if (SD.mkdir("value")) { ↵ Serial.println("Dir created"); ↵ } else { ↵ Serial.println("mkdir failed"); ↵ }` |
| `seeed_fs_remove_dir` | Statement | PATH(input_value) | `seeed_fs_remove_dir(text("value"))` | `if (SD.rmdir("value")) { ↵ Serial.println("Dir removed"); ↵ } else { ↵ Serial.println("rmdir failed"); ↵ }` |
| `seeed_fs_list_dir` | Statement | PATH(input_value), LEVELS(input_value) | `seeed_fs_list_dir(text("value"), math_number(0))` | `seeedListDir(SD, "value", 1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| INFO | cardType, cardSize, totalBytes, usedBytes | seeed_fs_sd_card_info |

## ABS Examples

### Basic Usage
```
arduino_setup()
    seeed_fs_sd_begin()
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, seeed_fs_sd_card_info(cardType))
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
3. **Onboard SD initialization**: `seeed_fs_sd_begin()` is dedicated to the Wio Terminal onboard SD slot. It has no user frequency input and always generates `SD.begin(SDCARD_SS_PIN, SDCARD_SPI, 24000000UL)`. The HAL also clamps requests to at most 24 MHz.
4. **Legacy projects**: versions that saved a `FREQUENCY` value can still be restored through an invisible compatibility connection. That saved value is ignored and does not change the fixed 24 MHz clock.
