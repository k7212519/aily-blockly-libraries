# Cycore NES AI usage notes

- Target `esp32:esp32:wifiduino32s3` with OPI PSRAM and `app3M_fat9M_16MB`.
- `cycore_nes_embed_rom` stores a selected iNES file as a PROGMEM byte array in APP and calls `installEmbeddedRom()` to copy/update it under `/nes` in FFat. Identical files are not rewritten. A single preset ROM is limited to 1.75 MB; the sum of presets must fit the 3 MB APP together with the firmware.
- `cycore_nes_wifi_upload` starts a temporary access point and blocking upload page at `http://192.168.4.1`. A zero timeout waits until the page's Done button is pressed. WiFi-uploaded ROMs occupy FFat only.
- Place `cycore_nes_flash_begin` before preset/WiFi import, or rely on either import method to mount FFat automatically. Initialize the display before WiFi upload if on-screen connection instructions are wanted.
- Configure six active-low buttons with `cycore_nes_buttons`. A+B opens the in-game menu; Left+Right is Select and Up+Down is Start.
- The usual setup flow is flash -> preset ROM block(s) -> display/buttons/audio -> optional WiFi upload -> browser. The launch flow is browser String result -> start.
- Preset ROMs occupy both APP and FFat. WiFi-uploaded ROMs occupy FFat only. Saves stay in `/nes/saves`.
- Each boot reaches WiFi upload again if the WiFi block is unconditional. Put it behind a boot-button condition or give it a timeout when direct game boot is desired.
- Game indexes are zero-based. The FFat capacity is about 9.9 MB, not the whole 16 MB Flash.
