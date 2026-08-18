# DFPlayer

DFPlayer control library, used to control the DFPlayer Mini module to implement audio playback, pause, volume adjustment and other functions (the test can also be used for the MP3-TF-16P module)

## Library Info
- **Name**: @aily-project/lib-dfplayer
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `dfplayer_begin` | Statement | VAR(field_input), RX(input_value), TX(input_value) | `dfplayer_begin("dfplayer", math_number(0), math_number(0))` | `DFRobotDFPlayerMini dfplayer; ↵ SoftwareSerial dfplayerSerial(1, 1); ↵ dfplayerSerial.begin(9600); ↵ if (!dfplayer.begin(dfplayerSerial)) { ↵ Serial.println(F("Unable to begin:")); ↵ Serial.println(F("1.Please recheck the connection!")); ↵ Serial.println(F("2.Please insert the SD card!")); ↵ } ↵ dfplayer.volume(10);` |
| `dfplayer_play` | Statement | VAR(field_variable), FILE(input_value) | `dfplayer_play($dfplayer, math_number(0))` | `dfplayer.play(1);` |
| `dfplayer_pause` | Statement | VAR(field_variable) | `dfplayer_pause($dfplayer)` | `dfplayer.pause();` |
| `dfplayer_start` | Statement | VAR(field_variable) | `dfplayer_start($dfplayer)` | `dfplayer.start();` |
| `dfplayer_stop` | Statement | VAR(field_variable) | `dfplayer_stop($dfplayer)` | `dfplayer.stop();` |
| `dfplayer_next` | Statement | VAR(field_variable) | `dfplayer_next($dfplayer)` | `dfplayer.next();` |
| `dfplayer_previous` | Statement | VAR(field_variable) | `dfplayer_previous($dfplayer)` | `dfplayer.previous();` |
| `dfplayer_volume` | Statement | VAR(field_variable), VOLUME(input_value) | `dfplayer_volume($dfplayer, math_number(0))` | `dfplayer.volume(1);` |
| `dfplayer_volume_up` | Statement | VAR(field_variable) | `dfplayer_volume_up($dfplayer)` | `dfplayer.volumeUp();` |
| `dfplayer_volume_down` | Statement | VAR(field_variable) | `dfplayer_volume_down($dfplayer)` | `dfplayer.volumeDown();` |
| `dfplayer_eq` | Statement | VAR(field_variable), EQ(dropdown) | `dfplayer_eq($dfplayer, "0")` | `dfplayer.EQ(0);` |
| `dfplayer_output_device` | Statement | VAR(field_variable), DEVICE(dropdown) | `dfplayer_output_device($dfplayer, "1")` | `dfplayer.outputDevice(1);` |
| `dfplayer_loop` | Statement | VAR(field_variable), FILE(input_value) | `dfplayer_loop($dfplayer, math_number(0))` | `dfplayer.loop(1);` |
| `dfplayer_play_folder` | Statement | VAR(field_variable), FOLDER(input_value), FILE(input_value) | `dfplayer_play_folder($dfplayer, math_number(0), math_number(0))` | `dfplayer.playFolder(1, 1);` |
| `dfplayer_enable_loop_all` | Statement | VAR(field_variable) | `dfplayer_enable_loop_all($dfplayer)` | `dfplayer.enableLoopAll();` |
| `dfplayer_disable_loop_all` | Statement | VAR(field_variable) | `dfplayer_disable_loop_all($dfplayer)` | `dfplayer.disableLoopAll();` |
| `dfplayer_play_mp3_folder` | Statement | VAR(field_variable), FILE(input_value) | `dfplayer_play_mp3_folder($dfplayer, math_number(0))` | `dfplayer.playMp3Folder(1);` |
| `dfplayer_advertise` | Statement | VAR(field_variable), FILE(input_value) | `dfplayer_advertise($dfplayer, math_number(0))` | `dfplayer.advertise(1);` |
| `dfplayer_stop_advertise` | Statement | VAR(field_variable) | `dfplayer_stop_advertise($dfplayer)` | `dfplayer.stopAdvertise();` |
| `dfplayer_play_large_folder` | Statement | VAR(field_variable), FOLDER(input_value), FILE(input_value) | `dfplayer_play_large_folder($dfplayer, math_number(0), math_number(0))` | `dfplayer.playLargeFolder(1, 1);` |
| `dfplayer_loop_folder` | Statement | VAR(field_variable), FOLDER(input_value) | `dfplayer_loop_folder($dfplayer, math_number(0))` | `dfplayer.loopFolder(1);` |
| `dfplayer_random_all` | Statement | VAR(field_variable) | `dfplayer_random_all($dfplayer)` | `dfplayer.randomAll();` |
| `dfplayer_enable_loop` | Statement | VAR(field_variable) | `dfplayer_enable_loop($dfplayer)` | `dfplayer.enableLoop();` |
| `dfplayer_disable_loop` | Statement | VAR(field_variable) | `dfplayer_disable_loop($dfplayer)` | `dfplayer.disableLoop();` |
| `dfplayer_read_state` | Value | VAR(field_variable) | `dfplayer_read_state($dfplayer)` | `dfplayer.readState()` |
| `dfplayer_read_volume` | Value | VAR(field_variable) | `dfplayer_read_volume($dfplayer)` | `dfplayer.readVolume()` |
| `dfplayer_read_eq` | Value | VAR(field_variable) | `dfplayer_read_eq($dfplayer)` | `dfplayer.readEQ()` |
| `dfplayer_read_file_counts` | Value | VAR(field_variable) | `dfplayer_read_file_counts($dfplayer)` | `dfplayer.readFileCounts()` |
| `dfplayer_read_current_file_number` | Value | VAR(field_variable) | `dfplayer_read_current_file_number($dfplayer)` | `dfplayer.readCurrentFileNumber()` |
| `dfplayer_read_file_counts_in_folder` | Value | VAR(field_variable), FOLDER(input_value) | `dfplayer_read_file_counts_in_folder($dfplayer, math_number(0))` | `dfplayer.readFileCountsInFolder(1)` |
| `dfplayer_available` | Value | VAR(field_variable) | `dfplayer_available($dfplayer)` | `dfplayer.available()` |
| `dfplayer_read_type` | Value | VAR(field_variable) | `dfplayer_read_type($dfplayer)` | `dfplayer.readType()` |
| `dfplayer_read` | Value | VAR(field_variable) | `dfplayer_read($dfplayer)` | `dfplayer.read()` |
| `dfplayer_simple_play` | Statement | RX(input_value), TX(input_value), FILE(input_value) | `dfplayer_simple_play(math_number(0), math_number(0), math_number(0))` | `myDFPlayer.play(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| EQ | 0, 1, 2, 3, 4, 5 | dfplayer_eq |
| DEVICE | 1, 2 | dfplayer_output_device |

## ABS Examples

### Basic Usage
```
arduino_setup()
    dfplayer_begin("dfplayer", math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, dfplayer_read_state($dfplayer))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `dfplayer_begin("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
