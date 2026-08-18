# AI voice interaction

Arduino version of Xiaozhi AI, AI Vox voice interaction engine support library, used for ESP32 series development boards.

## Library Info
- **Name**: @aily-project/lib-ai-vox
- **Version**: 2.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `aivox3_init_wifi` | Statement | MODE(dropdown); runtime variants: manual-credentials: SSID(input_value), PSWD(input_value) | `aivox3_init_wifi(Manual, text("Your WiFi SSID"), text("Your WiFi Password"))` | `constexpr smartconfig_type_t kSmartConfigType = SC_TYPE_ESPTOUCH; ↵ #define WIFI_SSID 1 ↵ #define WIFI_PASSWORD 1 ↵ auto wifi_configurator = std::make_unique<WifiConfigurator>(WiFi, kSmartConfigType); ↵ wifi_configurator->Start(WIFI_SSID, WIFI_PASSWORD);` |
| `aivox3_wifi_state` | Value | STATE(dropdown) | `aivox3_wifi_state(kConnecting)` | `wifi_configurator->WaitStateChanged() == WifiConfigurator::State::kConnecting` |
| `aivox3_init_es8311` | Statement | (none); runtime variants: es8311-pins-and-bus: ES8311_SDA(dropdown), ES8311_SCL(dropdown), ES8311_MCLK(dropdown), ES8311_SCLK(dropdown), ES8311_LRCK(dropdown), ES8311_DSDIN(dropdown), ES8311_DSDOUT(dropdown), ES8311_I2C_ADDRESS(input_value), ES8311_RATE(input_value), ES8311_IIC_PORT(dropdown) | `aivox3_init_es8311(0, 1, 2, 3, 8, 7, 9, math_number(48), math_number(16000), 0)` | `i2c_master_bus_handle_t g_i2c_master_bus_handle = nullptr; ↵ std::shared_ptr<ai_vox::AudioDeviceEs8311> g_audio_output_device; ↵ std::shared_ptr<ai_vox::AudioDeviceEs8311> g_audio_input_device; ↵ void InitI2cBus() { ↵ const i2c_master_bus_config_t i2c_master_bus_config = { ↵ .i2c_port = ES8311_IIC_PORT, ↵ .sda_io_num = GPIO_NUM_ES8311_SDA, ↵ .scl_io_num = GPIO_NUM_ES8311_SCL, ↵ .clk_source = I2C_CLK_SRC_DEFAULT, ↵ .glitch_ignore_cnt = 7, ↵ .intr_priority = 0, ↵ .trans_queue_depth = 0, ↵ .flags = ↵ { ↵ .enable_internal_pullup = 1, ↵ .allow_pd = 0, ↵ }, ↵ }; ↵ ESP_ERROR_CHECK(i2c_new_master_bus(&i2c_master_bus_config, &g_i2c_master_bus_handle)); ↵ } ↵ InitI2cBus(); ↵ g_audio_output_device = std::make_shared<ai_vox::AudioDeviceEs8311>(g_i2c_master_bus_handle, 1, I2C_NUM_1, 1, GPIO_NUM_ES8311_MCLK, GPIO_NUM_ES8311_SCLK, GPIO_NUM_ES8311_LRCK, GPIO_NUM_ES8311_DSDOUT, GPIO_NUM_ES8311_DSDIN);` |
| `aivox3_set_es8311_volume` | Statement | aivox3_es8311_volume(input_value) | `aivox3_set_es8311_volume(math_number(0))` | `g_audio_output_device->set_volume(1);` |
| `aivox3_set_screen_light` | Statement | aivox3_screen_light(input_value) | `aivox3_set_screen_light(math_number(0))` | `if (kDisplayBacklightPin != GPIO_NUM_NC) { ↵ analogWrite(kDisplayBacklightPin, 1); ↵ }` |
| `aivox_init_mic` | Statement | (none); runtime variants: standard-i2s-microphone: MIC_BCLK(dropdown), MIC_WS(dropdown), MIC_DIN(dropdown) | `aivox_init_mic(4, 5, 6)` | `auto g_observer = std::make_shared<ai_vox::Observer>(); ↵ constexpr gpio_num_t kMicPinBclk = GPIO_NUM_MIC_BCLK; ↵ constexpr gpio_num_t kMicPinWs = GPIO_NUM_MIC_WS; ↵ constexpr gpio_num_t kMicPinDin = GPIO_NUM_MIC_DIN; ↵ auto g_audio_input_device = std::make_shared<AudioInputDeviceSph0645>(kMicPinBclk, kMicPinWs, kMicPinDin); ↵ auto& ai_vox_engine = ai_vox::Engine::GetInstance();` |
| `aivox_init_audio` | Statement | (none); runtime variants: standard-i2s-speaker: SPK_BCLK(dropdown), SPK_WS(dropdown), SPK_DOUT(dropdown) | `aivox_init_audio(13, 14, 1)` | `auto g_observer = std::make_shared<ai_vox::Observer>(); ↵ constexpr gpio_num_t kSpeakerPinBclk = GPIO_NUM_SPK_BCLK; ↵ constexpr gpio_num_t kSpeakerPinWs = GPIO_NUM_SPK_WS; ↵ constexpr gpio_num_t kSpeakerPinDout = GPIO_NUM_SPK_DOUT; ↵ auto g_audio_output_device = std::make_shared<ai_vox::AudioOutputDeviceI2sStd>(kSpeakerPinBclk, kSpeakerPinWs, kSpeakerPinDout); ↵ auto& ai_vox_engine = ai_vox::Engine::GetInstance();` |
| `aivox_init_lcd` | Statement | backLight(dropdown), MOSI(dropdown), CLK(dropdown), DC(dropdown), RST(dropdown), CS(dropdown) | `aivox_init_lcd("16", "21", "17", "14", "-1", "15")` | `constexpr gpio_num_t kDisplayBacklightPin = GPIO_NUM_16; ↵ constexpr uint32_t kDisplayWidth = 240; ↵ constexpr uint32_t kDisplayHeight = 240; ↵ constexpr bool kDisplayMirrorX = false; ↵ constexpr bool kDisplayMirrorY = false; ↵ constexpr bool kDisplayInvertColor = true; ↵ constexpr bool kDisplaySwapXY = false; ↵ constexpr auto kDisplayRgbElementOrder = LCD_RGB_ELEMENT_ORDER_RGB; ↵ std::unique_ptr<Display> g_display; ↵ button_handle_t g_button_boot_handle = nullptr; ↵ void InitDisplay() { ↵ pinMode(kDisplayBacklightPin, OUTPUT); ↵ analogWrite(kDisplayBacklightPin, 255); ↵ spi_bus_config_t buscfg{ ↵ .mosi_io_num = GPIO_NUM_21, ↵ .miso_io_num = GPIO_NUM_NC, ↵ .sclk_io_num = GPIO_NUM_17, ↵ .quadwp_io_num = GPIO_NUM_NC, ↵ .quadhd_io_num = GPIO_NUM_NC, ↵ .data4_io_num = GPIO_NUM_NC, ↵ .data5_io_num = GPIO_NUM_NC, ↵ .data6_io_num = GPIO_NUM_NC, ↵ .data7_io_num = GPIO_NUM_NC, ↵ .data_io_default_level = false, ↵ .max_transfer_sz = kDisplayWidth * kDisplayHeight * sizeof(uint16_t), ↵ .flags = 0, ↵ .isr_cpu_id = ESP_INTR_CPU_AFFINITY_AUTO, ↵ .intr_flags = 0, ↵ }; ↵ ESP_ERROR_CHECK(spi_bus_initialize(SPI3_HOST, &buscfg, SPI_DMA_CH_AUTO)); ↵ esp_lcd_panel_io_handle_t panel_io = nullptr; ↵ esp_lcd_panel_handle_t panel = nullptr; ↵ esp_lcd_panel_io_spi_config_t io_config = {}; ↵ io_config.cs_gpio_num = GPIO_NUM_15; ↵ io_config.dc_gpio_num = GPIO_NUM_14; ↵ io_config.spi_mode = 0; ↵ io_config.pclk_hz = 40 * 1000 * 1000; ↵ io_config.trans_queue_depth = 10; ↵ io_config.lcd_cmd_bits = 8; ↵ io_config.lcd_param_bits = 8; ↵ ESP_ERROR_CHECK(esp_lcd_new_panel_io_spi(SPI3_HOST, &io_config, &panel_io)); ↵ // 初始化液晶屏驱动芯片 ↵ // ESP_LOGD(TAG, "Install LCD driver"); ↵ esp_lcd_panel_dev_config_t panel_config = {}; ↵ panel_config.reset_gpio_num = -1; ↵ panel_config.rgb_ele_order = LCD_RGB_ELEMENT_ORDER_RGB; ↵ panel_config.bits_per_pixel = 16; ↵ ESP_ERROR_CHECK(esp_lcd_new_panel_st7789(panel_io, &panel_config, &panel)); ↵ esp_lcd_panel_reset(panel); ↵ esp_lcd_panel_init(panel); ↵ esp_lcd_panel_invert_color(panel, kDisplayInvertColor); ↵ esp_lcd_panel_swap_xy(panel, kDisplaySwapXY); ↵ esp_lcd_panel_mirror(panel, kDisplayMirrorX, kDisplayMirrorY); ↵ g_display = std::make_unique<Display>(panel_io, panel, kDisplayWidth, kDisplayHeight, 0, 0, kDisplayMirrorX, kDisplayMirrorY, kDisplaySwapXY); ↵ g_display->Start(); ↵ } ↵ const button_config_t aivox_button_cfg = { ↵ .long_press_time = 1000, ↵ .short_press_time = 50, ↵ }; ↵ const button_gpio_config_t aivox_button_gpio_cfg = { ↵ .gpio_num = GPIO_NUM_0, ↵ .active_level = 0, ↵ .enable_power_save = false, ↵ .disable_pull = false, ↵ }; ↵ ESP_ERROR_CHECK(iot_button_new_gpio_device(&aivox_button_cfg, &aivox_button_gpio_cfg, &g_button_boot_handle)); ↵ InitDisplay();` |
| `aivox_display_mode` | Statement | display_mode(dropdown) | `aivox_display_mode(normal)` | `No direct code emitted; updates display-mode generator state used by later blocks.` |
| `aivox_lcd_show_status` | Statement | location(dropdown), ai_vox_content(input_value) | `aivox_lcd_show_status(ShowStatus, math_number(0))` | `g_display->ShowStatus(1);` |
| `aivox_config_ota_url` | Statement | ai_vox_ota_url(input_value) | `aivox_config_ota_url(text("value"))` | `ai_vox_engine.SetObserver(g_observer); ↵ ai_vox_engine.SetOtaUrl(1);` |
| `aivox_config_websocket` | Statement | ai_vox_websocket_url(input_value), ai_vox_websocket_param(input_value) | `aivox_config_websocket(text("value"), math_number(0))` | `ai_vox_engine.ConfigWebsocket(1, 1);` |
| `aivox3_start_engine` | Statement | (none) | `aivox3_start_engine()` | `if (g_button_boot_handle == nullptr) { ↵ const button_config_t aivox_button_cfg = { ↵ .long_press_time = 1000, ↵ .short_press_time = 50, ↵ }; ↵ const button_gpio_config_t aivox_button_gpio_cfg = { ↵ .gpio_num = GPIO_NUM_0, ↵ .active_level = 0, ↵ .enable_power_save = false, ↵ .disable_pull = false, ↵ }; ↵ ESP_ERROR_CHECK(iot_button_new_gpio_device( ↵ &aivox_button_cfg, ↵ &aivox_button_gpio_cfg, ↵ &g_button_boot_handle)); ↵ } ↵ ai_vox_engine.Start(g_audio_input_device, g_audio_output_device); ↵ if (g_button_boot_handle != nullptr) { ↵ ESP_ERROR_CHECK(iot_button_register_cb( ↵ g_button_boot_handle, ↵ BUTTON_PRESS_DOWN, ↵ nullptr, ↵ [](void* button_handle, void* usr_data) { ↵ printf("boot button pressed\n"); ↵ ai_vox::Engine::GetInstance().Advance(); ↵ }, ↵ nullptr)); ↵ }` |
| `aivox_mcp_register_control_command` | Statement | NAME(input_value), INPUT0(input_value); variadic: INPUT{1...}(input_value) | `aivox_mcp_register_control_command(math_number(0), math_number(0), INPUT1=aivox_mcp_control_param("level", Number, math_number(0), math_number(100)))` | `auto& ai_vox_engine = ai_vox::Engine::GetInstance(); ↵ ai_vox_engine.SetObserver(g_observer); ↵ ai_vox_engine.AddMcpTool("self..set", // tool name ↵ "", ↵ { ↵ } ↵ ); ↵ ai_vox_engine.AddMcpTool("self..get", // tool name ↵ "", ↵ { ↵ } ↵ );` |
| `aivox_mcp_control` | Value | VAR(field_input), DESC(input_value) | `aivox_mcp_control("led", math_number(0))` | `"led", 1` |
| `aivox_mcp_control_param` | Value | VAR(field_input), TYPE(dropdown); runtime variants: boolean-parameter: (none); number-parameter: MIN(input_value), MAX(input_value) | `aivox_mcp_control_param("state", Boolean)` | `"state", ai_vox::ParamSchema<bool>{.default_value = std::nullopt},` |
| `aivox_loop_activation` | Hat | DO(input_statement) | `aivox_loop_activation()` | `AIVOXEventCore aivoxEventCore; ↵ auto g_observer = std::make_shared<ai_vox::Observer>(); ↵ void OnActivation(const std::string& code, const std::string& message){ ↵ } ↵ aivoxEventCore.onActivation(OnActivation); ↵ aivoxEventCore.update(g_observer);` |
| `get_aivox_activation_message` | Value | activation_type(dropdown) | `get_aivox_activation_message(code)` | `code` |
| `aivox_loop_emotion` | Hat | DO(input_statement) | `aivox_loop_emotion()` | `AIVOXEventCore aivoxEventCore; ↵ auto g_observer = std::make_shared<ai_vox::Observer>(); ↵ void OnEmotion(const std::string& emotion){ ↵ } ↵ aivoxEventCore.onEmotion(OnEmotion); ↵ aivoxEventCore.update(g_observer);` |
| `get_aivox_emotion_result` | Value | (none) | `get_aivox_emotion_result()` | `emotion.c_str()` |
| `aivox_emotion` | Value | emotion(dropdown) | `aivox_emotion(happy)` | `emotion == "happy"` |
| `aivox_emotion_list` | Value | emotion(dropdown) | `aivox_emotion_list(happy)` | `"happy"` |
| `aivox_loop_state_change` | Hat | chat_state(dropdown), DO(input_statement) | `aivox_loop_state_change(Idle)` | `AIVOXEventCore aivoxEventCore; ↵ auto g_observer = std::make_shared<ai_vox::Observer>(); ↵ void OnStateIdle(ai_vox::ChatState state){ ↵ if(state == ai_vox::ChatState::kIdle) { ↵ } ↵ } ↵ aivoxEventCore.onStateIdle(OnStateIdle); ↵ aivoxEventCore.update(g_observer);` |
| `aivox_loop_chat_message` | Hat | DO(input_statement) | `aivox_loop_chat_message()` | `AIVOXEventCore aivoxEventCore; ↵ auto g_observer = std::make_shared<ai_vox::Observer>(); ↵ std::string chatRole ; ↵ void OnChatMessage(const std::string& role, const std::string& message){ ↵ chatRole = role; ↵ } ↵ aivoxEventCore.onChatMessage(OnChatMessage); ↵ aivoxEventCore.update(g_observer);` |
| `aivox_loop_chat_message_role_var` | Value | chat_role(dropdown) | `aivox_loop_chat_message_role_var(assistant)` | `role == "assistant"` |
| `aivox_loop_chat_message_msg_var` | Value | (none) | `aivox_loop_chat_message_msg_var()` | `message` |
| `aivox_loop_mcp` | Hat | DO(input_statement) | `aivox_loop_mcp()` | `AIVOXEventCore aivoxEventCore; ↵ auto g_observer = std::make_shared<ai_vox::Observer>(); ↵ void OnMcpControl(const std::int64_t& id, const std::string& name, const std::map<std::string, std::variant<std::string, int64_t, bool>>& param){ ↵ } ↵ aivoxEventCore.onMcpToolCall(OnMcpControl); ↵ aivoxEventCore.update(g_observer);` |
| `aivox_get_iot_message_event_name_new` | Value | VAR(field_variable) | `aivox_get_iot_message_event_name_new($led)` | `"self.led.set" == name` |
| `aivox_control_message_event_fuction` | Value | VAR(field_variable), PVAR(field_variable) | `aivox_control_message_event_fuction($led, $state)` | `std::get<bool>(param.at("state"))` |
| `aivox_response_mcp_control_result_new` | Statement | VAR(field_variable) | `aivox_response_mcp_control_result_new($led)` | `ai_vox_engine.SendMcpCallResponse(id, true);` |
| `aivox_update_mcp_control_state_new` | Statement | VAR(field_variable), PVAR(field_variable), STATE(input_value) | `aivox_update_mcp_control_state_new($led, $state, math_number(0))` | `if ("self.led.get" == name) { ↵ ai_vox_engine.SendMcpCallResponse(id, 1); ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | Manual | aivox3_init_wifi |
| STATE | kConnecting, kFinished | aivox3_wifi_state |
| backLight | 16, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, ... | aivox_init_lcd |
| MOSI | 21, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, ... | aivox_init_lcd |
| CLK | 17, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, ... | aivox_init_lcd |
| DC | 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, ... | aivox_init_lcd |
| RST | -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, ... | aivox_init_lcd |
| CS | 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, ... | aivox_init_lcd |
| display_mode | normal, wechat | aivox_display_mode |
| location | ShowStatus, SetEmotion, SetChatMessage | aivox_lcd_show_status |
| TYPE | Boolean, Number | aivox_mcp_control_param |
| activation_type | code, message | get_aivox_activation_message |
| emotion | happy, cool, laughing, funny, sad, angry, crying, loving, embarrassed, surprised, shocked, thinking, winking, relaxed, delicious, kissy, confident, sleepy, silly, confused | aivox_emotion, aivox_emotion_list |
| chat_state | Idle, Initted, Loading, LoadingFailed, Standby, Connecting, Listening, Speaking | aivox_loop_state_change |
| chat_role | assistant, user | aivox_loop_chat_message_role_var |

## ABS Examples

### Basic Usage
```
arduino_setup()
    aivox3_init_wifi(Manual, text("Your WiFi SSID"), text("Your WiFi Password"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, aivox3_wifi_state(kConnecting))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `aivox_mcp_control("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. **Runtime shape**: manual WiFi adds `SSID`/`PSWD`; standard I2S mic/speaker modes add their pin inputs; ES8311 adds its pin, address, rate, and I2C-port inputs; numeric MCP parameters add `MIN`/`MAX`; MCP command registration uses named indexed inputs `INPUT1`, `INPUT2`, and so on.

## Runtime Variant Examples

### Runtime Variant: aivox_mcp_control_param/number-parameter
```abs
arduino_loop()
    serial_println(Serial, aivox_mcp_control_param("state", Number, math_number(0), math_number(100)))
```
