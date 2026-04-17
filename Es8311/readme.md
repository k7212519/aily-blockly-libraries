# ES8311 音频编解码器

ESP32 I2S 音频录音与播放 Blockly 库，基于 ES8311Audio 类库封装。

## 库信息
- **库名**: `@aily-project/lib-es8311`
- **兼容**: ESP32 / ESP32-S3

## 块定义（摘要表格）
| 块类型 | 连接 | 字段/输入 | .abi格式 | 生成代码 |
|---|---|---|---|---|
| `es8311_init` | 语句块 | `VAR`(field_input), `WIRE`(field_dropdown动态), `ADDRESS`(field_dropdown) | `"fields":{"VAR":"audio","WIRE":"Wire","ADDRESS":"0x18"}` | `ES8311Audio audio; audio.beginI2C(Wire, 0x18);` |
| `es8311_i2s_config` | 语句块 | `VAR`(field_input), `MCK/BCK/WS/DOUT/DIN`(field_dropdown动态), `DURATION`(input_value) | `"fields":{"VAR":"audio",...},"inputs":{"DURATION":{...}}` | `audio.beginI2S(46,39,2,38,40,5);` |
| `es8311_record` | 语句块 | `VAR`(field_variable) | `"fields":{"VAR":{"id":"..."}}` | `audio.record();` |
| `es8311_play` | 语句块 | `VAR`(field_variable) | `"fields":{"VAR":{"id":"..."}}` | `audio.play();` |
| `es8311_play_loop` | 语句块 | `VAR`(field_variable) | `"fields":{"VAR":{"id":"..."}}` | `audio.playLoop();` |
| `es8311_stop` | 语句块 | `VAR`(field_variable) | `"fields":{"VAR":{"id":"..."}}` | `audio.stop();` |
| `es8311_has_recording` | 值块(Boolean) | `VAR`(field_variable) | `"fields":{"VAR":{"id":"..."}}` | `audio.hasRecording()` |
| `es8311_set_volume` | 语句块 | `VAR`(field_variable), `VOLUME`(field_number) | `"fields":{"VAR":{"id":"..."},"VOLUME":80}` | `audio.setVolume(80);` |
| `es8311_set_mic_gain` | 语句块 | `VAR`(field_variable), `GAIN`(field_dropdown) | `"fields":{"VAR":{"id":"..."},"GAIN":"3"}` | `audio.setMicGain(3);` |
| `es8311_mute` | 语句块 | `VAR`(field_variable), `MODE`(field_dropdown) | `"fields":{"VAR":{"id":"..."},"MODE":"1"}` | `audio.mute(1);` |
| `es8311_alc_enable` | 语句块 | `VAR`(field_variable), `ENABLE`(field_dropdown) | `"fields":{"VAR":{"id":"..."},"ENABLE":"true"}` | `audio.alcEnable(true);` |
| `es8311_sound_detected` | 值块(Boolean) | `VAR`(field_variable), `THRESHOLD`(field_number) | `"fields":{"VAR":{"id":"..."},"THRESHOLD":30}` | `audio.soundDetected(30)` |
| `es8311_record_slot` | 语句块 | `VAR`(field_variable), `SLOT`(field_dropdown) | `"fields":{"VAR":{"id":"..."},"SLOT":"0"}` | `audio.recordSlot(0);` |
| `es8311_play_slot` | 语句块 | `VAR`(field_variable), `SLOT`(field_dropdown) | `"fields":{"VAR":{"id":"..."},"SLOT":"0"}` | `audio.playSlot(0);` |
| `es8311_play_tone` | 语句块 | `VAR`(field_variable), `FREQ`(field_number), `DURATION`(field_number) | `"fields":{"VAR":{"id":"..."},"FREQ":1000,"DURATION":500}` | `audio.playTone(1000, 500);` |

## 字段类型映射
| 类型 | .abi 格式 | 说明 |
|---|---|---|
| `field_input` | 字符串 | 直接写入字段值，如 `"VAR":"audio"` |
| `field_variable` | 对象 | 推荐 `{"id":"var_id"}` 以保证唯一性 |
| `field_dropdown` | 字符串 | 下拉 value 在 `block.json` 中定义（GAIN / MODE / SLOT 等） |
| `field_dropdown(动态)` | 字符串 | 从 `board.i2c` 或 `board.digitalPins` 获取 |
| `input_value` | 嵌套 block 对象 | `"inputs":{"VOLUME":{"block":{...}}}` |

## 连接规则与生成器行为
- 语句块使用 `previousStatement`/`nextStatement`，在 `.abi` 中通过 `next` 字段表示链式连接。
- 值块有 `output`，作为表达式嵌入 `inputs`，无 `next` 字段。
- `es8311_init` 使用 `field_input` 创建变量名，其他块使用 `field_variable`(variableTypes=["ES8311"]) 引用。
- 初始化需两步：先 `es8311_init`(I2C) 再 `es8311_i2s_config`(I2S)，库自动处理 Wire.begin()

## 使用示例
### 初始化（I2C + I2S 两步）
```json
{
  "type": "es8311_init",
  "fields": {"VAR": "audio", "WIRE": "Wire", "ADDRESS": "0x18"},
  "next": {
    "block": {
      "type": "es8311_i2s_config",
      "fields": {"VAR": "audio", "MCK": "46", "BCK": "39", "WS": "2", "DOUT": "38", "DIN": "40"},
      "inputs": {
        "DURATION": {"block": {"type": "math_number", "fields": {"NUM": "5"}}}
      }
    }
  }
}
```

### 声音检测（值块嵌入 inputs）
```json
{
  "type": "es8311_sound_detected",
  "fields": {"VAR": {"id": "audio_var_id"}, "THRESHOLD": 30}
}
```

## 重要规则
1. 必须先执行 `es8311_init`(I2C) + `es8311_i2s_config`(I2S) 再使用其他 ES8311 块。
2. 块 ID 与变量 ID 必须唯一，避免在 `.abi` 中冲突。
3. 值块（`es8311_has_recording`、`es8311_sound_detected`）只能嵌入 `inputs`，不能使用 `next` 连接。

## 支持的参数选项
- **GAIN**: 0(0dB), 1(+6dB), 2(+12dB), 3(+18dB), 4(+24dB), 5(+30dB), 6(+36dB), 7(+42dB)
- **MODE**: 0(取消静音), 1(输出静音), 2(麦克风静音), 3(全部静音)
- **ENABLE**: true(开启ALC), false(关闭ALC)
- **SLOT**: 0, 1, 2, 3
- **WIRE**: 从board.json的i2c字段获取(如"Wire","Wire1")
- **ADDRESS**: "0x18"(默认), "0x30"