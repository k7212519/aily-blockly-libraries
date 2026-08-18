# Seeed SD Card File System Library

Seeed SD card file system operation library. Supports file read/write, append, delete, rename, and directory management on SD cards. Compatible with Seeed development boards (e.g. Wio Terminal, SAMD21) via SPI.

## Library Info
- **Name**: @aily-project/lib-seeed-fs
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_fs_sd_begin` | Statement | (none) | `seeed_fs_sd_begin()` | `if (!SD.begin(SDCARD_SS_PIN, SDCARD_SPI, 4000000UL)) { ↵ Serial.println("Card Mount Failed"); ↵ return; ↵ } ↵ Serial.println("SD card initialized.");` |
| `seeed_fs_sd_begin_spi` | Statement | SS(input_value), FREQUENCY(input_value) | `seeed_fs_sd_begin_spi(math_number(0), math_number(0))` | `if (!SD.begin(1, SPI, (1) * 1000000UL)) { ↵ Serial.println("Card Mount Failed"); ↵ return; ↵ } ↵ Serial.println("SD card initialized.");` |
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
| `seeed_sfud_fs_begin_qspi` | Statement | (none) | `seeed_sfud_fs_begin_qspi()` | `while (!SFUD.begin(104000000UL)) { ↵ Serial.println("Flash Mount Failed"); ↵ delay(500); ↵ } ↵ Serial.println("Flash initialized.");` |
| `seeed_sfud_fs_begin_spi` | Statement | SS(input_value), FREQUENCY(input_value) | `seeed_sfud_fs_begin_spi(math_number(0), math_number(0))` | `while (!SFUD.begin(1, SPI, (1) * 1000000UL)) { ↵ Serial.println("Flash Mount Failed"); ↵ delay(500); ↵ } ↵ Serial.println("Flash initialized.");` |
| `seeed_sfud_fs_flash_info` | Value | INFO(dropdown) | `seeed_sfud_fs_flash_info(flashSize)` | `((unsigned long)(SFUD.flashSize()))` |
| `seeed_sfud_fs_file_exists` | Value | PATH(input_value) | `seeed_sfud_fs_file_exists(text("value"))` | `SFUD.exists("value")` |
| `seeed_sfud_fs_open_file` | Value | VAR(field_variable), PATH(input_value), MODE(dropdown) | `seeed_sfud_fs_open_file($flashFile, text("value"), FILE_READ)` | `flashFile = SFUD.open("value", FILE_READ)` |
| `seeed_sfud_fs_write_quick` | Statement | PATH(input_value), CONTENT(input_value) | `seeed_sfud_fs_write_quick(text("value"), text("value"))` | `sfudWriteFile("value", String("value").c_str());` |
| `seeed_sfud_fs_read_quick` | Value | PATH(input_value) | `seeed_sfud_fs_read_quick(text("value"))` | `sfudReadFile("value")` |
| `seeed_sfud_fs_append_file` | Statement | PATH(input_value), CONTENT(input_value) | `seeed_sfud_fs_append_file(text("value"), text("value"))` | `sfudAppendFile("value", String("value").c_str());` |
| `seeed_sfud_fs_delete_file` | Statement | PATH(input_value) | `seeed_sfud_fs_delete_file(text("value"))` | `if (SFUD.remove("value")) { ↵ Serial.println("[SFUD] File deleted"); ↵ } else { ↵ Serial.println("[SFUD] Delete failed"); ↵ }` |
| `seeed_sfud_fs_rename_file` | Statement | OLD_PATH(input_value), NEW_PATH(input_value) | `seeed_sfud_fs_rename_file(text("value"), text("value"))` | `if (SFUD.rename("value", "value")) { ↵ Serial.println("[SFUD] File renamed"); ↵ } else { ↵ Serial.println("[SFUD] Rename failed"); ↵ }` |
| `seeed_sfud_fs_create_dir` | Statement | PATH(input_value) | `seeed_sfud_fs_create_dir(text("value"))` | `if (SFUD.mkdir("value")) { ↵ Serial.println("[SFUD] Dir created"); ↵ } else { ↵ Serial.println("[SFUD] mkdir failed"); ↵ }` |
| `seeed_sfud_fs_remove_dir` | Statement | PATH(input_value) | `seeed_sfud_fs_remove_dir(text("value"))` | `if (SFUD.rmdir("value")) { ↵ Serial.println("[SFUD] Dir removed"); ↵ } else { ↵ Serial.println("[SFUD] rmdir failed"); ↵ }` |
| `seeed_sfud_fs_list_dir` | Statement | PATH(input_value), LEVELS(input_value) | `seeed_sfud_fs_list_dir(text("value"), math_number(0))` | `seeedListDir(SFUD, "value", 1);` |
| `seeed_sfud_init` | Statement | (none) | `seeed_sfud_init()` | `while (sfud_init() != SFUD_SUCCESS) { ↵ Serial.println("SFUD init failed, retrying..."); ↵ delay(500); ↵ } ↵ #ifdef SFUD_USING_QSPI ↵ sfud_qspi_fast_read_enable(sfud_get_device(SFUD_W25Q32_DEVICE_INDEX), 2); ↵ #endif ↵ Serial.println("SFUD raw flash initialized.");` |
| `seeed_sfud_erase` | Statement | ADDR(input_value), SIZE(input_value) | `seeed_sfud_erase(math_number(0), math_number(0))` | `{ ↵ const sfud_flash *_sfud_flash = sfud_get_device_table() + 0; ↵ sfud_err _sfud_result = sfud_erase(_sfud_flash, 1, 1); ↵ if (_sfud_result == SFUD_SUCCESS) { ↵ Serial.println("SFUD: Erase done"); ↵ } else { ↵ Serial.println("SFUD: Erase failed"); ↵ } ↵ }` |
| `seeed_sfud_write_str` | Statement | ADDR(input_value), CONTENT(input_value) | `seeed_sfud_write_str(math_number(0), text("value"))` | `sfudWriteStr(1, String("value").c_str());` |
| `seeed_sfud_read_str` | Value | ADDR(input_value), LENGTH(input_value) | `seeed_sfud_read_str(math_number(0), math_number(0))` | `sfudReadStr(1, 1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| INFO | cardType, cardSize, totalBytes, usedBytes | seeed_fs_sd_card_info |
| MODE | FILE_READ, FILE_WRITE, FILE_APPEND | seeed_fs_open_file, seeed_sfud_fs_open_file |
| INFO | flashSize, totalBytes, usedBytes | seeed_sfud_fs_flash_info |

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
