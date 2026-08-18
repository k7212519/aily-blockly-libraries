# OpenCodexMicro Controller

Unofficial Codex Micro BLE HID controller library for ESP32-S3 touch boards and Xueersi XiaoMiao keypads.

## Library Info
- **Name**: @aily-project/lib-open-codex-micro
- **Version**: 1.0.0
- **Runtime**: ESP32/ESP32-S3, BLE HID + ArduinoJson RPC, TFT_eSPI display; S3 needs FT6336 + PSRAM full-frame sprite; XiaoMiao uses six keys + GPIO14 buzzer

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `opencodex_begin` | Statement | BOARD(dropdown) | `opencodex_begin(S3)` | `#define CODEX_BOARD_S3 1 ↵ #define USER_SETUP_LOADED 1 ↵ #define USE_HSPI_PORT 1 ↵ #define ST7789_DRIVER 1 ↵ #define TFT_RGB_ORDER TFT_BGR ↵ #define TFT_WIDTH 240 ↵ #define TFT_HEIGHT 320 ↵ #define TFT_INVERSION_OFF ↵ #define TFT_BL 8 ↵ #define TFT_BACKLIGHT_ON HIGH ↵ #define TFT_MISO 15 ↵ #define TFT_MOSI 17 ↵ #define TFT_SCLK 16 ↵ #define TFT_CS 5 ↵ #define TFT_DC 7 ↵ #define TFT_RST 6 ↵ #define TOUCH_CS -1 ↵ #define TOUCH_SDA 10 ↵ #define TOUCH_SCL 13 ↵ #define TOUCH_INT 12 ↵ #define TOUCH_RST 9 ↵ #define TOUCH_MAP_MODE 0 ↵ #define SPI_FREQUENCY 27000000 ↵ #define LOAD_GLCD 1 ↵ #define LOAD_FONT2 1 ↵ #define LOAD_FONT4 1 ↵ #define LOAD_FONT6 1 ↵ #define LOAD_FONT7 1 ↵ #define LOAD_FONT8 1 ↵ #define LOAD_GFXFF 1 ↵ #define SMOOTH_FONT 1 ↵ #define BOARD_HAS_PSRAM 1 ↵ SET_LOOP_TASK_STACK_SIZE(16 * 1024); ↵ Serial.begin(115200); ↵ openCodexBegin(); ↵ openCodexUpdate();` |
| `opencodex_connected` | Value | (none) | `opencodex_connected()` | `openCodexConnected()` |
| `opencodex_encrypted` | Value | (none) | `opencodex_encrypted()` | `openCodexEncrypted()` |
| `opencodex_host_ready` | Value | (none) | `opencodex_host_ready()` | `openCodexHostReady()` |
| `opencodex_set_page` | Statement | PAGE(dropdown) | `opencodex_set_page(Tasks)` | `openCodexSetPage(UiPage::Tasks);` |
| `opencodex_get_page` | Value | (none) | `opencodex_get_page()` | `static_cast<uint8_t>(openCodexGetPage())` |
| `opencodex_send_key` | Statement | KEY(dropdown), ACTION(dropdown), AGENT(input_value) | `opencodex_send_key(ACT06, 1, math_number(-1))` | `openCodexSendKey("AG00", 1, 1);` |
| `opencodex_send_joystick` | Statement | ANGLE(input_value), DISTANCE(input_value) | `opencodex_send_joystick(math_number(0), math_number(1))` | `openCodexSendJoystick(1, 1);` |
| `opencodex_set_battery` | Statement | PERCENT(input_value), CHARGING(input_value) | `opencodex_set_battery(math_number(100), logic_boolean(FALSE))` | `openCodexSetBattery(1, true);` |
| `opencodex_play_sound` | Statement | CUE(dropdown) | `opencodex_play_sound(Success)` | `openCodexPlaySound(BoardSoundCue::Success);` |
| `opencodex_stop_sound` | Statement | (none) | `opencodex_stop_sound()` | `openCodexStopSound();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| BOARD | S3, XUEERSI | S3=ST7789+FT6336 pins from reference N16R8 kit; XUEERSI=XiaoMiao ST7735+keys |
| PAGE | Tasks, Commands, Navigate | UI page enum |
| KEY | AG00..AG05, ACT06..ACT10, ACT12, ENC, ENC_CW, ENC_CC | Protocol key IDs |
| ACTION | 1, 0, 2 | press / release / encoder step |
| CUE | Success, Attention, Error, HighClick, LowClick | Board sound patterns |

## Notes
1. Always place `opencodex_begin` in `arduino_setup`. It injects board TFT macros, `SET_LOOP_TASK_STACK_SIZE(16*1024)`, Serial 115200, and auto loop update.
2. S3 full UI needs OPI PSRAM (N16R8 class). Without PSRAM, canvas allocation fails.
3. XiaoMiao gestures: A+B short cycles page; A+B long sends ACT12; Navigate maps A single/double to dial CW/CCW.
4. Status path: PAIR → LINK → ENC → LIVE (`host_ready`).
5. This library is independent/unofficial and is not affiliated with OpenAI or hardware vendors.
6. Do not write bare strings for `input_value` slots; use `text("")`, `math_number(n)`, `logic_boolean(TRUE|FALSE)`.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    opencodex_begin(S3)
```
