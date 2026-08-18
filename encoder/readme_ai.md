# Arduino Rotary Encoder Library

The Arduino rotary encoder driver library supports I2C communication, rotation direction recognition, step counting, and key detection (with key encoder). It has fast response speed and is compatible with a variety of...

## Library Info
- **Name**: @aily-project/lib-encoder
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `encoder_init` | Statement | ENCODER(field_variable), PIN_A(dropdown), PIN_B(dropdown) | `encoder_init($encoder1, PIN_A, PIN_B)` | `long lastEncoderPosition = 0; ↵ long currentEncoderPosition = 0; ↵ int encoderDirection = 0; // 0=无变化, 1=右转, -1=左转 ↵ long encoderUpperLimit = 100; ↵ long encoderLowerLimit = -100; ↵ bool encoderAboveLimit = false; ↵ bool encoderBelowLimit = false; ↵ Encoder encoder1(PIN_A, PIN_B); ↵ // 更新编码器状态 ↵ currentEncoderPosition = encoder1.read(); ↵ // 检测变化 ↵ if (currentEncoderPosition != lastEncoderPosition) { ↵ // 更新方向 ↵ if (currentEncoderPosition > lastEncoderPosition) { ↵ encoderDirection = 1; // 右转 ↵ } else if (currentEncoderPosition < lastEncoderPosition) { ↵ encoderDirection = -1; // 左转 ↵ } ↵ // 检查上下限 ↵ if (currentEncoderPosition > encoderUpperLimit) { ↵ encoderAboveLimit = true; ↵ encoder1.write(encoderUpperLimit); ↵ currentEncoderPosition = encoderUpperLimit; ↵ } else { ↵ encoderAboveLimit = false; ↵ } ↵ if (currentEncoderPosition < encoderLowerLimit) { ↵ encoderBelowLimit = true; ↵ encoder1.write(encoderLowerLimit); ↵ currentEncoderPosition = encoderLowerLimit; ↵ } else { ↵ encoderBelowLimit = false; ↵ } ↵ lastEncoderPosition = currentEncoderPosition; ↵ } else { ↵ encoderDirection = 0; ↵ }` |
| `encoder_set_property` | Statement | ENCODER(field_variable), PROPERTY(dropdown), VALUE(input_value) | `encoder_set_property($encoder1, position, math_number(0))` | `currentEncoderPosition = 1; ↵ encoder1.write(1);` |
| `encoder_value_changed` | Value | (none) | `encoder_value_changed()` | `encoderDirection != 0` |
| `encoder_state_change` | Statement | STATE(dropdown), DO(input_statement) | `encoder_state_change(LEFT)` | `if (encoderDirection == -1) { ↵ }` |
| `encoder_get_property` | Value | ENCODER(field_variable), PROPERTY(dropdown) | `encoder_get_property($encoder1, POSITION)` | `encoder1.read()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| PROPERTY | position, upper_limit, lower_limit | encoder_set_property |
| STATE | LEFT, RIGHT, ABOVE_LIMIT, BELOW_LIMIT | encoder_state_change |
| PROPERTY | POSITION, DIRECTION, UPPER_LIMIT, LOWER_LIMIT | encoder_get_property |

## ABS Examples

### Basic Usage
```
arduino_setup()
    encoder_init($encoder1, PIN_A, PIN_B)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, encoder_value_changed())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
