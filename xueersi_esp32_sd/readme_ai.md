# Xueersi ESP32 TF Card

Board-specific TF card blocks based on `esp32_SD`, using HSPI independently or sharing TFT_eSPI's instance when available.

## Library Info

| Field | Value |
|---|---|
| Package | `@aily-project/lib-xueersi-esp32-sd` |
| Version | `1.0.3` |
| Boards | Xueersi ESP32 handheld |
| Protocol | Shared HSPI |

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|---|---|---|---|---|
| `xueersi_esp32_sd_init` | Statement | (none) | `xueersi_esp32_sd_init()` | `xueersiEsp32SdBegin();` |
| `xueersi_esp32_sd_end` | Statement | (none) | `xueersi_esp32_sd_end()` | `SD.end();` |
| `xueersi_esp32_sd_card_info` | Value | INFO(dropdown) | `xueersi_esp32_sd_card_info(cardType)` | `SD.cardType()` |
| `xueersi_esp32_sd_card_type_name` | Value | (none) | `xueersi_esp32_sd_card_type_name()` | `String(xueersiEsp32SdCardTypeName())` |
| `xueersi_esp32_sd_mountpoint` | Value | (none) | `xueersi_esp32_sd_mountpoint()` | `String(SD.mountpoint() ? SD.mountpoint() : "")` |
| `xueersi_esp32_sd_file_exists` | Value | PATH(input_value) | `xueersi_esp32_sd_file_exists(text("value"))` | `SD.exists("value")` |
| `xueersi_esp32_sd_open_file_to` | Statement | VAR(field_variable), PATH(input_value), MODE(dropdown) | `xueersi_esp32_sd_open_file_to($file, text("value"), FILE_READ)` | `file = SD.open("value", FILE_READ);` |
| `xueersi_esp32_sd_close_file` | Statement | VAR(field_variable) | `xueersi_esp32_sd_close_file($file)` | `file.close();` |
| `xueersi_esp32_sd_file_is_open` | Value | VAR(field_variable) | `xueersi_esp32_sd_file_is_open($file)` | `((bool)file)` |
| `xueersi_esp32_sd_write_file` | Statement | VAR(field_variable), CONTENT(input_value) | `xueersi_esp32_sd_write_file($file, text("value"))` | `file.print(String("value"));` |
| `xueersi_esp32_sd_read_file` | Value | VAR(field_variable) | `xueersi_esp32_sd_read_file($file)` | `xueersiEsp32SdReadRemaining(file)` |
| `xueersi_esp32_sd_read_file_bytes` | Value | VAR(field_variable), LENGTH(input_value) | `xueersi_esp32_sd_read_file_bytes($file, math_number(0))` | `xueersiEsp32SdReadBytes(file, 1)` |
| `xueersi_esp32_sd_read_byte` | Value | VAR(field_variable) | `xueersi_esp32_sd_read_byte($file)` | `file.read()` |
| `xueersi_esp32_sd_peek_byte` | Value | VAR(field_variable) | `xueersi_esp32_sd_peek_byte($file)` | `file.peek()` |
| `xueersi_esp32_sd_file_available` | Value | VAR(field_variable) | `xueersi_esp32_sd_file_available($file)` | `(file.available() > 0)` |
| `xueersi_esp32_sd_file_available_bytes` | Value | VAR(field_variable) | `xueersi_esp32_sd_file_available_bytes($file)` | `file.available()` |
| `xueersi_esp32_sd_file_size` | Value | VAR(field_variable) | `xueersi_esp32_sd_file_size($file)` | `file.size()` |
| `xueersi_esp32_sd_file_position` | Value | VAR(field_variable) | `xueersi_esp32_sd_file_position($file)` | `file.position()` |
| `xueersi_esp32_sd_seek_file` | Value | VAR(field_variable), POSITION(input_value), MODE(dropdown) | `xueersi_esp32_sd_seek_file($file, math_number(0), SeekSet)` | `file.seek(1, SeekSet)` |
| `xueersi_esp32_sd_flush_file` | Statement | VAR(field_variable) | `xueersi_esp32_sd_flush_file($file)` | `file.flush();` |
| `xueersi_esp32_sd_write_file_quick` | Statement | PATH(input_value), CONTENT(input_value) | `xueersi_esp32_sd_write_file_quick(text("value"), text("value"))` | `xueersiEsp32SdWriteFile("value", String("value"));` |
| `xueersi_esp32_sd_read_file_quick` | Value | PATH(input_value) | `xueersi_esp32_sd_read_file_quick(text("value"))` | `xueersiEsp32SdReadFile("value")` |
| `xueersi_esp32_sd_append_file` | Statement | PATH(input_value), CONTENT(input_value) | `xueersi_esp32_sd_append_file(text("value"), text("value"))` | `xueersiEsp32SdAppendFile("value", String("value"));` |
| `xueersi_esp32_sd_delete_file` | Statement | PATH(input_value) | `xueersi_esp32_sd_delete_file(text("value"))` | `if (!SD.remove("value")) { ↵ Serial.println("Delete failed"); ↵ }` |
| `xueersi_esp32_sd_rename_file` | Statement | OLD_PATH(input_value), NEW_PATH(input_value) | `xueersi_esp32_sd_rename_file(text("value"), text("value"))` | `if (!SD.rename("value", "value")) { ↵ Serial.println("Rename failed"); ↵ }` |
| `xueersi_esp32_sd_create_dir` | Statement | PATH(input_value) | `xueersi_esp32_sd_create_dir(text("value"))` | `if (!SD.mkdir("value")) { ↵ Serial.println("mkdir failed"); ↵ }` |
| `xueersi_esp32_sd_remove_dir` | Statement | PATH(input_value) | `xueersi_esp32_sd_remove_dir(text("value"))` | `if (!SD.rmdir("value")) { ↵ Serial.println("rmdir failed"); ↵ }` |
| `xueersi_esp32_sd_list_dir` | Statement | PATH(input_value), LEVELS(input_value) | `xueersi_esp32_sd_list_dir(text("value"), math_number(0))` | `xueersiEsp32SdListDir(SD, "value", 1);` |

## Parameter Options

| Parameter | Values | Notes |
|---|---|---|
| `INFO` | `cardType`, `cardSize`, `totalBytes`, `usedBytes`, `numSectors`, `sectorSize` | Capacity values use MiB; sector size uses bytes |
| File `MODE` | `FILE_READ`, `FILE_WRITE`, `FILE_APPEND` | Write truncates; append preserves existing data |
| Seek `MODE` | `SeekSet`, `SeekCur`, `SeekEnd` | Origin for `File.seek` |

## Notes

- The only initialization block has no inputs. It fixes TFT CS 5, TF CS 22, SCK 18, MISO 19, and MOSI 23.
- When the Xueersi `tftscr_init` block exists, initialization reuses `TFT_eSPI::getSPIinstance()`; otherwise it lazily creates a standalone HSPI instance, so TFT_eSPI is not required. It then tries the board-safe 25/20/16/10/4 MHz range, enumerates up to 32 root entries, reopens the first non-empty regular file by path, and reads 4 KiB samples at five positions before accepting a clock.
- TFT and TF initialization may appear in either order. When both are used, they share one HSPI instance and are separated by their CS pins.
- A mount or probe failure is logged without returning from `setup()`, so later peripheral initialization still runs.
- Whole-file reads return `String` and are intended for small text files. Use byte or bounded reads for large or binary files.
- Generated helpers and block types use `xueersiEsp32Sd...` / `xueersi_esp32_sd_...` names to avoid collisions with the generic `esp32_SD` package.
- `readRAW`/`writeRAW` are intentionally not exposed because they require a correctly sized mutable buffer and raw writes can corrupt the filesystem.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    xueersi_esp32_sd_init()
```
