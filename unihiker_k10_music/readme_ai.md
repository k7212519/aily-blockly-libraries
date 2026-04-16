# K10音乐/音频

UNIHIKER K10 音乐与音频库，支持内置音乐、音调播放、TF 卡录音和播放。

## Library Info
- **Name**: @aily-project/lib-unihiker-k10-music
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `k10_music_play_builtin` | Statement | MUSIC(dropdown) | `k10_music_play_builtin(birthday)` | `music.playMusic(birthday);` |
| `k10_music_play_tone` | Statement | FREQ(input_value), DURATION(input_value) | `k10_music_play_tone(math_number(440), math_number(500))` | `music.playTone(freq, duration);` |
| `k10_music_record` | Statement | CMD(dropdown), FILENAME(input_value) | `k10_music_record(start, text("record.wav"))` | `music.recordSaveToTFCard(path, seconds);` |
| `k10_music_play_tf` | Statement | FILENAME(input_value) | `k10_music_play_tf(text("record.wav"))` | `music.playTFCardAudio(path);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MUSIC | birthday(生日快乐), littlestar(小星星), jinglebells(铃儿响叮当), odeTojoy(欢乐颂) | 内置音乐曲目 |
| CMD | start(开始), stop(停止) | 录音控制命令 |

## ABS Examples

### 播放内置音乐
```
arduino_setup()
    k10_music_play_builtin(birthday)
```

### 播放自定义音调序列
```
arduino_setup()
    k10_music_play_tone(math_number(262), math_number(500))
    k10_music_play_tone(math_number(294), math_number(500))
    k10_music_play_tone(math_number(330), math_number(500))
    k10_music_play_tone(math_number(349), math_number(500))
    k10_music_play_tone(math_number(392), math_number(1000))
```

### TF 卡录音和播放
```
arduino_setup()
    k10_music_record(start, text("record.wav"))
    time_delay(math_number(5000))
    k10_music_record(stop, text("record.wav"))
    k10_music_play_tf(text("record.wav"))
```

## Notes

1. **无需额外初始化**: 使用音乐积木时自动初始化 K10 和 Music 对象
2. **内置音乐**: 后台播放，不阻塞程序执行
3. **音调播放**: `k10_music_play_tone(freq, duration)` 中 duration 单位为毫秒
4. **TF 卡录音**: 需要插入 TF 卡，会自动初始化 SD 文件系统
5. **音频格式**: TF 卡录音和播放使用 WAV 格式
