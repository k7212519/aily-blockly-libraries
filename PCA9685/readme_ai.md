# PCA9685 舵机扩展模块

Adafruit PCA9685 16通道12位PWM舵机驱动板，I2C接口控制。

## 库信息
- **库名**: @aily-project/lib-pca9685
- **版本**: 1.0.0
- **兼容**: arduino:avr, esp32:esp32

## 块定义

| 块类型 | 连接 | 字段/输入 | .abi格式 | 生成代码 |
|--------|------|----------|----------|----------|
| `pca9685_create` | 语句块 | VAR(field_variable), ADDR(field_dropdown) | `"VAR":{"id":"var_id"}, "ADDR":"0x40"` | `Adafruit_PWMServoDriver pwm(0x40);` |
| `pca9685_begin` | 语句块 | VAR(field_variable) | `"VAR":{"id":"var_id"}` | `pwm.begin();` |
| `pca9685_set_pwm_freq` | 语句块 | VAR(field_variable), FREQ(input) | `"VAR":{"id":"var_id"}, "inputs":{"FREQ":{"block":{...}}}` | `pwm.setPWMFreq(50);` |
| `pca9685_set_pwm` | 语句块 | VAR(field_variable), CHANNEL(field_dropdown), ON(input), OFF(input) | `"VAR":{"id":"var_id"}, "CHANNEL":"0"` | `pwm.setPWM(0, 0, 2048);` |
| `pca9685_set_servo_angle` | 语句块 | VAR(field_variable), CHANNEL(field_dropdown), ANGLE(input) | `"VAR":{"id":"var_id"}, "CHANNEL":"0"` | `pwm.setPWM(0, 0, pca9685_angle_to_pulse(90));` |
| `pca9685_set_pin` | 语句块 | VAR(field_variable), CHANNEL(field_dropdown), VALUE(input) | `"VAR":{"id":"var_id"}, "CHANNEL":"0"` | `pwm.setPin(0, 2048);` |
| `pca9685_write_microseconds` | 语句块 | VAR(field_variable), CHANNEL(field_dropdown), MICROSECONDS(input) | `"VAR":{"id":"var_id"}, "CHANNEL":"0"` | `pwm.writeMicroseconds(0, 1500);` |
| `pca9685_sleep` | 语句块 | VAR(field_variable) | `"VAR":{"id":"var_id"}` | `pwm.sleep();` |
| `pca9685_wakeup` | 语句块 | VAR(field_variable) | `"VAR":{"id":"var_id"}` | `pwm.wakeup();` |
| `pca9685_set_oscillator_freq` | 语句块 | VAR(field_variable), FREQ(field_dropdown) | `"VAR":{"id":"var_id"}, "FREQ":"25000000"` | `pwm.setOscillatorFrequency(25000000);` |

## 字段类型映射

| 类型 | .abi格式 | 示例 |
|------|----------|------|
| field_variable | 对象 | `"VAR": {"id": "var_id"}` |
| field_dropdown | 字符串 | `"ADDR": "0x40"`, `"CHANNEL": "0"` |
| field_dropdown(振荡器) | 字符串 | `"FREQ": "25000000"` |
| input_value | 块连接 | `"inputs": {"FREQ": {"block": {...}}}` |

## 连接规则

- **语句块**: 有previousStatement/nextStatement，通过`next`字段连接
- **变量类型**: PCA9685，使用field_variable选择已创建的对象
- **创建块(pca9685_create)**: 使用field_dropdown选择I2C地址(0x40~0x4F)
- **通道选择**: field_dropdown，值为"0"~"15"的字符串

## 使用示例

### 基本舵机控制
```json
{
  "type": "pca9685_create",
  "id": "create_1",
  "fields": {
    "VAR": {"id": "var_pwm_1"},
    "ADDR": "0x40"
  },
  "next": {
    "block": {
      "type": "pca9685_begin",
      "id": "begin_1",
      "fields": {"VAR": {"id": "var_pwm_1"}},
      "next": {
        "block": {
          "type": "pca9685_set_pwm_freq",
          "id": "freq_1",
          "fields": {"VAR": {"id": "var_pwm_1"}},
          "inputs": {
            "FREQ": {
              "shadow": {
                "type": "math_number",
                "id": "freq_num_1",
                "fields": {"NUM": 50}
              }
            }
          },
          "next": {
            "block": {
              "type": "pca9685_set_servo_angle",
              "id": "angle_1",
              "fields": {
                "VAR": {"id": "var_pwm_1"},
                "CHANNEL": "0"
              },
              "inputs": {
                "ANGLE": {
                  "shadow": {
                    "type": "math_number",
                    "id": "angle_num_1",
                    "fields": {"NUM": 90}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### variables数组
```json
[
  {"name": "pwm", "id": "var_pwm_1", "type": "PCA9685"}
]
```

## 重要规则

1. **必须先创建再初始化**: pca9685_create → pca9685_begin → 其他操作
2. **变量类型**: PCA9685类型的变量通过pca9685_create块创建
3. **通道范围**: 0~15，共16个通道
4. **PWM范围**: 0~4095（12位分辨率）
5. **舵机角度**: 0~180度，内部映射到pulse宽度(150~600)
6. **默认脉宽**: SERVOMIN=150, SERVOMAX=600
7. **需要依赖库**: Adafruit_PWMServoDriver, Adafruit_BusIO, Wire