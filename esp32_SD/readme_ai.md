# ESP32 SD

SPI-mode SD card blocks aligned with Arduino-ESP32 Core 3.3.10 `SD.h` and `FS.h`.

## Library Info

| Field | Value |
|---|---|
| Package | `@aily-project/lib-esp32-sd` |
| Version | `1.0.1` |
| Boards | ESP32 family |
| Protocol | SPI |

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|---|---|---|---|---|
| `esp32_sd_begin` | Statement | (none) | `esp32_sd_begin()` | `if (!SD.begin()) { ↵ Serial.println("SD card mount failed"); ↵ return; ↵ } ↵ if (SD.cardType() == CARD_NONE) { ↵ Serial.println("No SD card attached"); ↵ SD.end(); ↵ return; ↵ }` |
| `esp32_sd_begin_custom` | Statement | CS(input_value), SCK(input_value), MISO(input_value), MOSI(input_value), FREQUENCY(input_value) | `esp32_sd_begin_custom(math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `SPI.begin(1, 1, 1, 1); ↵ if (!SD.begin(1, SPI, ((uint32_t)((1) * 1000000.0)))) { ↵ Serial.println("SD card mount failed"); ↵ return; ↵ } ↵ if (SD.cardType() == CARD_NONE) { ↵ Serial.println("No SD card attached"); ↵ SD.end(); ↵ return; ↵ }` |
| `esp32_sd_init` | Statement | SPI(dropdown), SS(input_value), FREQUENCY(input_value) | `esp32_sd_init(SPI, math_number(0), math_number(0))` | `SPI.begin(); ↵ if (!SD.begin(1, SPI, ((uint32_t)((1) * 1000000.0)))) { ↵ Serial.println("SD card mount failed"); ↵ return; ↵ } ↵ if (SD.cardType() == CARD_NONE) { ↵ Serial.println("No SD card attached"); ↵ SD.end(); ↵ return; ↵ }` |
| `esp32_sd_begin_advanced` | Statement | SPI(dropdown), SS(input_value), FREQUENCY(input_value), MOUNT_POINT(field_input), MAX_FILES(input_value), FORMAT_IF_EMPTY(input_value) | `esp32_sd_begin_advanced(SPI, math_number(0), math_number(0), "/sd", math_number(0), logic_boolean(TRUE))` | `if (!SD.begin(1, SPI, ((uint32_t)((1) * 1000000.0)), "/sd", 1, true)) { ↵ Serial.println("SD card mount failed"); ↵ return; ↵ } ↵ if (SD.cardType() == CARD_NONE) { ↵ Serial.println("No SD card attached"); ↵ SD.end(); ↵ return; ↵ }` |
| `esp32_sd_end` | Statement | (none) | `esp32_sd_end()` | `SD.end();` |
| `esp32_sd_card_info` | Value | INFO(dropdown) | `esp32_sd_card_info(cardType)` | `SD.cardType()` |
| `esp32_sd_card_type_name` | Value | (none) | `esp32_sd_card_type_name()` | `String(esp32SdCardTypeName())` |
| `esp32_sd_mountpoint` | Value | (none) | `esp32_sd_mountpoint()` | `String(SD.mountpoint() ? SD.mountpoint() : "")` |
| `esp32_sd_file_exists` | Value | PATH(input_value) | `esp32_sd_file_exists(text("value"))` | `SD.exists("value")` |
| `esp32_sd_open_file` | Value | VAR(field_variable), PATH(input_value), MODE(dropdown) | `esp32_sd_open_file($file, text("value"), FILE_READ)` | `file = SD.open("value", FILE_READ)` |
| `esp32_sd_open_file_to` | Statement | VAR(field_variable), PATH(input_value), MODE(dropdown) | `esp32_sd_open_file_to($file, text("value"), FILE_READ)` | `file = SD.open("value", FILE_READ);` |
| `esp32_sd_close_file` | Statement | VAR(field_variable) | `esp32_sd_close_file($file)` | `file.close();` |
| `esp32_sd_file_is_open` | Value | VAR(field_variable) | `esp32_sd_file_is_open($file)` | `((bool)file)` |
| `esp32_sd_write_file` | Statement | VAR(field_variable), CONTENT(input_value) | `esp32_sd_write_file($file, text("value"))` | `file.print(String("value"));` |
| `esp32_sd_read_file` | Value | VAR(field_variable) | `esp32_sd_read_file($file)` | `esp32SdReadRemaining(file)` |
| `esp32_sd_read_file_bytes` | Value | VAR(field_variable), LENGTH(input_value) | `esp32_sd_read_file_bytes($file, math_number(0))` | `esp32SdReadBytes(file, 1)` |
| `esp32_sd_read_byte` | Value | VAR(field_variable) | `esp32_sd_read_byte($file)` | `file.read()` |
| `esp32_sd_peek_byte` | Value | VAR(field_variable) | `esp32_sd_peek_byte($file)` | `file.peek()` |
| `esp32_sd_file_available` | Value | VAR(field_variable) | `esp32_sd_file_available($file)` | `(file.available() > 0)` |
| `esp32_sd_file_available_bytes` | Value | VAR(field_variable) | `esp32_sd_file_available_bytes($file)` | `file.available()` |
| `esp32_sd_file_size` | Value | VAR(field_variable) | `esp32_sd_file_size($file)` | `file.size()` |
| `esp32_sd_file_position` | Value | VAR(field_variable) | `esp32_sd_file_position($file)` | `file.position()` |
| `esp32_sd_seek_file` | Value | VAR(field_variable), POSITION(input_value), MODE(dropdown) | `esp32_sd_seek_file($file, math_number(0), SeekSet)` | `file.seek(1, SeekSet)` |
| `esp32_sd_flush_file` | Statement | VAR(field_variable) | `esp32_sd_flush_file($file)` | `file.flush();` |
| `esp32_sd_write_file_quick` | Statement | PATH(input_value), CONTENT(input_value) | `esp32_sd_write_file_quick(text("value"), text("value"))` | `esp32SdWriteFile("value", String("value"));` |
| `esp32_sd_read_file_quick` | Value | PATH(input_value) | `esp32_sd_read_file_quick(text("value"))` | `esp32SdReadFile("value")` |
| `esp32_sd_append_file` | Statement | PATH(input_value), CONTENT(input_value) | `esp32_sd_append_file(text("value"), text("value"))` | `esp32SdAppendFile("value", String("value"));` |
| `esp32_sd_delete_file` | Statement | PATH(input_value) | `esp32_sd_delete_file(text("value"))` | `if (!SD.remove("value")) { ↵ Serial.println("Delete failed"); ↵ }` |
| `esp32_sd_rename_file` | Statement | OLD_PATH(input_value), NEW_PATH(input_value) | `esp32_sd_rename_file(text("value"), text("value"))` | `if (!SD.rename("value", "value")) { ↵ Serial.println("Rename failed"); ↵ }` |
| `esp32_sd_create_dir` | Statement | PATH(input_value) | `esp32_sd_create_dir(text("value"))` | `if (!SD.mkdir("value")) { ↵ Serial.println("mkdir failed"); ↵ }` |
| `esp32_sd_remove_dir` | Statement | PATH(input_value) | `esp32_sd_remove_dir(text("value"))` | `if (!SD.rmdir("value")) { ↵ Serial.println("rmdir failed"); ↵ }` |
| `esp32_sd_list_dir` | Statement | PATH(input_value), LEVELS(input_value) | `esp32_sd_list_dir(text("value"), math_number(0))` | `esp32SdListDir(SD, "value", 1);` |

## Parameter Options

| Parameter | Values | Notes |
|---|---|---|
| `INFO` | `cardType`, `cardSize`, `totalBytes`, `usedBytes`, `numSectors`, `sectorSize` | Capacity values use MiB; sector size uses bytes |
| File `MODE` | `FILE_READ`, `FILE_WRITE`, `FILE_APPEND` | Write truncates; append preserves existing data |
| Seek `MODE` | `SeekSet`, `SeekCur`, `SeekEnd` | Origin for `File.seek` |
| `FORMAT_IF_EMPTY` | `false`, `true` | `true` can format a card with no mountable FAT filesystem |
| `FREQUENCY` | MHz, default `4` | Multiplied by `1,000,000` for `SD.begin` |

## Notes

- Mount blocks reject `CARD_NONE`. The advanced block emits `SD.begin(ss, spi, frequency, mountpoint, max_files, format_if_empty)`.
- Frequency inputs are displayed in MHz and multiplied by `1,000,000` for `SD.begin`.
- `esp32_sd_open_file` stays defined for saved workspaces but is intentionally absent from the toolbox; use `esp32_sd_open_file_to` for new projects.
- Whole-file reads return `String` and are intended for small text files. Use byte or bounded reads for large or binary files.
- Generated helpers use `esp32Sd...` names to avoid collisions with other filesystem packages.
- `readRAW`/`writeRAW` are intentionally not exposed because they require a correctly sized mutable buffer and raw writes can corrupt the filesystem.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    esp32_sd_begin()
```
