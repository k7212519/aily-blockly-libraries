# ES8311 音频编解码器

ESP32 上的 ES8311 录音、播放与云端音频理解 Blockly 库。除了本地录音/播放、音量与麦克风增益控制、声音检测、多槽位录音外，还支持把当前录音上传到通义千问 Omni，实时播放语音回复并保存文本结果。

## 库信息
- **库名**: `@aily-project/lib-es8311`
- **兼容**: ESP32 / ESP32-S3
- **前置条件**: AI 语音理解功能需要先使用现有 WiFi 积木完成联网，本库不提供 WiFi 配置或连接块

## 块定义

| 块类型 | 连接 | 字段/输入 | 作用 |
|---|---|---|---|
| `es8311_init` | 语句块 | `VAR`(field_input), `WIRE`(field_dropdown动态), `ADDRESS`(field_dropdown) | 初始化 ES8311 的 I2C 控制 |
| `es8311_i2s_config` | 语句块 | `VAR`(field_input), `MCK/BCK/WS/DOUT/DIN`(field_dropdown动态), `DURATION`(input_value) | 配置 I2S 引脚与录音时长 |
| `es8311_record` | 语句块 | `VAR`(field_variable) | 开始录音 |
| `es8311_play` | 语句块 | `VAR`(field_variable) | 播放当前录音 |
| `es8311_play_loop` | 语句块 | `VAR`(field_variable) | 循环播放当前录音 |
| `es8311_stop` | 语句块 | `VAR`(field_variable) | 停止当前录音/播放，也会中断 AI 语音回复播放 |
| `es8311_has_recording` | 值块(Boolean) | `VAR`(field_variable) | 检查是否已有录音 |
| `es8311_set_volume` | 语句块 | `VAR`(field_variable), `VOLUME`(field_number) | 设置输出音量 |
| `es8311_set_mic_gain` | 语句块 | `VAR`(field_variable), `GAIN`(field_dropdown) | 设置麦克风模拟增益 |
| `es8311_mute` | 语句块 | `VAR`(field_variable), `MODE`(field_dropdown) | 控制静音状态 |
| `es8311_alc_enable` | 语句块 | `VAR`(field_variable), `ENABLE`(field_dropdown) | 开关自动增益控制 |
| `es8311_sound_detected` | 值块(Boolean) | `VAR`(field_variable), `THRESHOLD`(field_number) | 检测环境声音是否超过阈值 |
| `es8311_record_slot` | 语句块 | `VAR`(field_variable), `SLOT`(field_dropdown) | 录音到指定槽位 |
| `es8311_play_slot` | 语句块 | `VAR`(field_variable), `SLOT`(field_dropdown) | 播放指定槽位录音 |
| `es8311_play_tone` | 语句块 | `VAR`(field_variable), `FREQ`(field_number), `DURATION`(field_number) | 播放提示音 |
| `es8311_qwen_config` | 语句块 | `API_KEY`(input_value), `BASE_URL`(input_value) | 配置 DashScope API Key 与兼容模式 Base URL |
| `es8311_qwen_audio_chat` | 语句块 | `VAR`(field_variable), `PROMPT`(input_value), `MODEL`(field_dropdown) | 上传当前录音到 Qwen Omni，实时播放语音回复并保存文本结果 |
| `es8311_qwen_get_last_text` | 值块(String) | 无 | 获取最近一次云端音频理解的完整文本结果 |
| `es8311_qwen_get_last_success` | 值块(Boolean) | 无 | 获取最近一次云端音频理解是否成功 |
| `es8311_qwen_get_last_error` | 值块(String) | 无 | 获取最近一次云端音频理解的错误信息 |

## 使用示例

### 本地录音与播放
```json
{
  "type": "es8311_init",
  "fields": {"VAR": "audio", "WIRE": "Wire", "ADDRESS": "0x18"},
  "next": {
    "block": {
      "type": "es8311_i2s_config",
      "fields": {"VAR": "audio", "MCK": "46", "BCK": "39", "WS": "2", "DOUT": "38", "DIN": "40"},
      "inputs": {
        "DURATION": {
          "shadow": {"type": "math_number", "fields": {"NUM": "5"}}
        }
      }
    }
  }
}
```

### 云端音频理解
```json
{
  "type": "es8311_qwen_audio_chat",
  "fields": {
    "VAR": {"id": "audio_var_id"},
    "MODEL": "qwen3.5-omni-plus"
  },
  "inputs": {
    "PROMPT": {
      "shadow": {"type": "text", "fields": {"TEXT": "这段音频在说什么"}}
    }
  }
}
```

## 重要规则

1. 必须先执行 `es8311_init` 与 `es8311_i2s_config`，再使用其他 ES8311 块。
2. AI 语音理解前，必须先通过现有 WiFi 积木完成联网；本库不会生成 `WiFi.begin(...)`。
3. `es8311_qwen_audio_chat` 只消费当前已录好的音频，不会自动重新录音。
4. 云端返回的语音回复会实时播放，但不会缓存为可二次重放的录音。
5. `es8311_stop` 会同时中断本地录音/播放和正在进行的 AI 语音回复播放。
