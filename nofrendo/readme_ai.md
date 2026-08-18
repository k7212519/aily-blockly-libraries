# NES模拟器 (Nofrendo)

基于arduino-nofrendo的NES红白机模拟器，支持ESP32 + ST7789屏幕 + SD卡ROM加载

## Library Info
- **Name**: @aily-project/lib-nofrendo
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `nofrendo_start` | Statement | ROM_PATH(input_value) | `nofrendo_start(text("/sdcard/game.nes"))` | `// ===NES launch=== ↵ i2s_audio_stop();i2s_driver_uninstall(I2S_NUM_0);delay(50); ↵ { ↵ const char* _romPath="value".c_str(); ↵ Serial.printf("[NES] launching: %s\n",_romPath); ↵ String _chosenLower=_romPath;_chosenLower.toLowerCase();bool isZip=_chosenLower.endsWith(".zip"); ↵ File _nf=SD.open(_romPath); ↵ if(!_nf&#124;&#124;_nf.size()==0){tft.fillScreen(TFT_RED);_nes_print(40,100,"打开失败!",TFT_WHITE,TFT_RED);delay(2000);} ↵ else{ ↵ size_t _nfs=_nf.size(); ↵ uint8_t *_nfb=(uint8_t*)heap_caps_malloc(_nfs,MALLOC_CAP_SPIRAM&#124;MALLOC_CAP_8BIT); ↵ if(!_nfb){tft.fillScreen(TFT_RED);_nes_print(40,100,"内存不足!",TFT_WHITE,TFT_RED);delay(3000);} ↵ else{ ↵ _nf.read(_nfb,_nfs);_nf.close(); ↵ if(isZip){ ↵ uint8_t *_unzipped=NULL;uint32_t _uzsize=0; ↵ int zr=zip_extract_nes(&_unzipped,&_uzsize,_nfb,_nfs); ↵ free(_nfb); ↵ if(zr!=0&#124;&#124;!_unzipped){tft.fillScreen(TFT_RED);_nes_print(40,80,"ZIP解压失败!",TFT_WHITE,TFT_RED);delay(5000);} ↵ else{_nfb=_unzipped;_nfs=_uzsize; ↵ _nofrendo_preloaded_fp=fmemopen(_nfb,_nfs,"rb");_nofrendo_preloaded_buf=_nfb; ↵ _nes_launch_info(_romPath,_nfb); ↵ Serial.println("[NES] launching nofrendo_main...");_nofrendo_request_exit=false; ↵ SD.mkdir("/roms/nes/saves");esp_wifi_deinit();esp_task_wdt_deinit(); ↵ char _pathBuf[128];strncpy(_pathBuf,_romPath,127);_pathBuf[127]=0; ↵ char *_na[2];_na[0]=_pathBuf;_na[1]=NULL; ↵ if(setjmp(_nes_exit_buf)==0){nofrendo_main(1,_na);} ↵ Serial.println("[NES] exited, force cleanup..."); ↵ osd_force_cleanup(); ↵ _nes_return_from_game=1;_nofrendo_preloaded_buf=NULL;_nofrendo_preloaded_fp=NULL;if(_nfb){free(_nfb);_nfb=NULL;} ↵ tft.fillScreen(TFT_BLACK);SD.end();delay(50);SD.begin(22,TFT_eSPI::getSPIinstance()); ↵ esp_task_wdt_config_t wdt_cfg={.timeout_ms=5000,.idle_core_mask=0x3,.trigger_panic=true};esp_task_wdt_init(&wdt_cfg); ↵ } ↵ } else{ ↵ _nofrendo_preloaded_fp=fmemopen(_nfb,_nfs,"rb");_nofrendo_preloaded_buf=_nfb; ↵ _nes_launch_info(_romPath,_nfb); ↵ Serial.println("[NES] launching nofrendo_main...");_nofrendo_request_exit=false; ↵ SD.mkdir("/roms/nes/saves");esp_wifi_deinit();esp_task_wdt_deinit(); ↵ char _pathBuf[128];strncpy(_pathBuf,_romPath,127);_pathBuf[127]=0; ↵ char *_na[2];_na[0]=_pathBuf;_na[1]=NULL; ↵ if(setjmp(_nes_exit_buf)==0){nofrendo_main(1,_na);} ↵ Serial.println("[NES] exited, force cleanup..."); ↵ osd_force_cleanup(); ↵ _nes_return_from_game=1;_nofrendo_preloaded_buf=NULL;_nofrendo_preloaded_fp=NULL;if(_nfb){free(_nfb);_nfb=NULL;} ↵ tft.fillScreen(TFT_BLACK);SD.end();delay(50);SD.begin(22,TFT_eSPI::getSPIinstance()); ↵ esp_task_wdt_config_t wdt_cfg={.timeout_ms=5000,.idle_core_mask=0x3,.trigger_panic=true};esp_task_wdt_init(&wdt_cfg); ↵ } ↵ } ↵ } ↵ }` |
| `nofrendo_find_rom` | Value | (none) | `nofrendo_find_rom()` | `nofrendo_find_rom_file()` |
| `nofrendo_browser` | Value | (none) | `nofrendo_browser()` | `_nes_browser()` |
| `nes_audio_config` | Statement | BCK(input_value), WS(input_value), DOUT(input_value) | `nes_audio_config(math_number(0), math_number(0), math_number(0))` | `nes_i2s_set_pins(1, 1, 1);` |
| `nes_volume_set` | Statement | VOL(input_value) | `nes_volume_set(math_number(0))` | `g_nes_volume = constrain(1, 0, 8); ↵ nes_volume_save(g_nes_volume);` |
| `nes_volume_get` | Value | (none) | `nes_volume_get()` | `g_nes_volume` |
| `nes_scanline_set` | Statement | MODE(dropdown) | `nes_scanline_set(0)` | `g_nes_scanline = 0; ↵ nes_scanline_save(g_nes_scanline);` |
| `nes_scanline_get` | Value | (none) | `nes_scanline_get()` | `g_nes_scanline` |
| `nes_fullscreen_set` | Statement | MODE(dropdown) | `nes_fullscreen_set(0)` | `g_nes_fullscreen = 0; ↵ nes_fullscreen_save(g_nes_fullscreen);` |
| `nes_fullscreen_get` | Value | (none) | `nes_fullscreen_get()` | `g_nes_fullscreen` |
| `nes_speed_set` | Statement | SPEED(dropdown) | `nes_speed_set(0)` | `g_nes_speed = 0; ↵ nes_speed_save(g_nes_speed);` |
| `nes_speed_get` | Value | (none) | `nes_speed_get()` | `g_nes_speed` |
| `nes_overclock_set` | Statement | FREQ(dropdown) | `nes_overclock_set(0)` | `g_nes_overclock = 0; ↵ nes_overclock_save(g_nes_overclock); ↵ setCpuFrequencyMhz(240);` |
| `nes_overclock_get` | Value | (none) | `nes_overclock_get()` | `g_nes_overclock` |
| `nes_color_set` | Statement | COLOR(dropdown) | `nes_color_set(0)` | `g_nes_color = 0; ↵ nes_color_save(g_nes_color); ↵ nes_color_rebuild();` |
| `nes_color_get` | Value | (none) | `nes_color_get()` | `g_nes_color` |
| `nes_playtime_get` | Value | (none) | `nes_playtime_get()` | `nes_play_time_get()` |
| `nes_flush_sram` | Statement | (none) | `nes_flush_sram()` | `nes_flush_sram();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ROM_PATH | Any String | Full path to .nes file on SD card, e.g. "/sdcard/game.nes" |

## ABS Examples

### Basic Usage
```
arduino_setup()
    tftscr_init()
    serial_begin(Serial, 115200)
    nofrendo_start(text("/sdcard/game.nes"))

arduino_loop()
```

### Auto-find ROM
```
arduino_setup()
    tftscr_init()
    serial_begin(Serial, 115200)
    nofrendo_start(nofrendo_find_rom())

arduino_loop()
```

## Notes

1. **Prerequisites**: Must call `tftscr_init()` before `nofrendo_start`. Screen must be ST7789 320x240 landscape.
2. **ROM placement**: Place .nes files on TF card root directory.
3. **WiFi**: Emulator automatically disables WiFi to free memory.
4. **Blocking**: `nofrendo_start` blocks forever (emulator runs its own loop). Code after it will not execute.
5. **Audio**: Currently no audio output (hardware has no I2S/DAC connected).
6. **Buttons**: 6 buttons mapped — Up/Down/Left/Right/A/B. Select/Start not available on this board.
7. **PSRAM**: Requires PSRAM enabled in board config for ROM loading.
