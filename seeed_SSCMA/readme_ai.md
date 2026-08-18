# Seeed SSCMA AI

Seeed SSCMA AI vision sensor communication library reads the inference results of AI vision modules such as Grove Vision AI V2 and XIAO ESP32S3 Sense through the I2C/UART/SPI protocol. Supports multiple pre-training m...

## Library Info
- **Name**: @aily-project/lib-seeed-sscma
- **Version**: 1.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `sscma_begin_i2c` | Statement | VAR(field_input), WIRE(dropdown), RST(input_value), ADDRESS(input_value) | `sscma_begin_i2c("ai", WIRE, math_number(0), math_number(0))` | `ai.begin(&WIRE, 1, 1);` |
| `sscma_begin_serial` | Statement | VAR(field_input), SERIAL(dropdown), RST(input_value), BAUD(input_value) | `sscma_begin_serial("ai", SERIAL, math_number(0), math_number(9600))` | `SSCMA ai;` |
| `sscma_begin_spi` | Statement | VAR(field_input), SPI(dropdown), CS(input_value), SYNC(input_value), RST(input_value), CLOCK(input_value) | `sscma_begin_spi("ai", SPI, math_number(0), math_number(0), math_number(0), math_number(0))` | `SSCMA ai; ↵ SPI.begin(); // 初始化SPI SPI ↵ ai.begin(&SPI, 1, 1, 1, ((uint32_t)((1) * 1000000.0)));` |
| `sscma_invoke` | Value | VAR(field_variable), TIMES(field_number), FILTER(dropdown), SHOW(dropdown) | `sscma_invoke($ai, 1, true, false)` | `ai.invoke(1, true, false)` |
| `sscma_return_status` | Value | STATUS(dropdown) | `sscma_return_status(CMD_OK)` | `CMD_OK` |
| `sscma_get_boxes_count` | Value | VAR(field_variable) | `sscma_get_boxes_count($ai)` | `ai.boxes().size()` |
| `sscma_get_box_info` | Value | VAR(field_variable), INDEX(input_value), PROPERTY(dropdown) | `sscma_get_box_info($ai, math_number(0), x)` | `ai.boxes()[1].x` |
| `sscma_get_classes_count` | Value | VAR(field_variable) | `sscma_get_classes_count($ai)` | `ai.classes().size()` |
| `sscma_get_class_info` | Value | VAR(field_variable), INDEX(input_value), PROPERTY(dropdown) | `sscma_get_class_info($ai, math_number(0), score)` | `ai.classes()[1].score` |
| `sscma_get_points_count` | Value | VAR(field_variable) | `sscma_get_points_count($ai)` | `ai.points().size()` |
| `sscma_get_point_info` | Value | VAR(field_variable), INDEX(input_value), PROPERTY(dropdown) | `sscma_get_point_info($ai, math_number(0), x)` | `ai.points()[1].x` |
| `sscma_check_last_image` | Value | VAR(field_variable) | `sscma_check_last_image($ai)` | `ai.last_image().length() > 0` |
| `sscma_get_last_image` | Value | VAR(field_variable) | `sscma_get_last_image($ai)` | `ai.last_image()` |
| `sscma_get_performance` | Value | VAR(field_variable), STAGE(dropdown) | `sscma_get_performance($ai, prepocess)` | `ai.perf().prepocess` |
| `sscma_available` | Value | VAR(field_variable) | `sscma_available($ai)` | `ai.available()` |
| `sscma_read` | Statement | VAR(field_variable), ARRAY(input_value), LENGTH(input_value) | `sscma_read($ai, math_number(0), math_number(0))` | `ai.read(1, 1);` |
| `sscma_write` | Statement | VAR(field_variable), ARRAY(input_value), LENGTH(input_value) | `sscma_write($ai, math_number(0), math_number(0))` | `ai.write(1, 1) ↵ ;` |
| `sscma_get_device_id` | Value | VAR(field_variable) | `sscma_get_device_id($ai)` | `ai.ID()` |
| `sscma_get_device_name` | Value | VAR(field_variable) | `sscma_get_device_name($ai)` | `ai.name()` |
| `sscma_get_device_info` | Value | VAR(field_variable) | `sscma_get_device_info($ai)` | `ai.info()` |
| `sscma_reset` | Statement | VAR(field_variable) | `sscma_reset($ai)` | `ai.reset();` |
| `sscma_save_jpeg` | Statement | VAR(field_variable) | `sscma_save_jpeg($ai)` | `ai.save_jpeg();` |
| `sscma_clean_actions` | Statement | VAR(field_variable) | `sscma_clean_actions($ai)` | `ai.clean_actions();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| FILTER | true, false | sscma_invoke |
| SHOW | false, true | sscma_invoke |
| STATUS | CMD_OK, CMD_AGAIN, CMD_ELOG, CMD_ETIMEDOUT, CMD_EIO, CMD_EINVAL, CMD_ENOMEM, CMD_EBUSY, CMD_ENOTSUP, CMD_EPERM, CMD_EUNKNOWN | sscma_return_status |
| PROPERTY | x, y, w, h, score, target | sscma_get_box_info |
| PROPERTY | score, target | sscma_get_class_info |
| PROPERTY | x, y, score, target | sscma_get_point_info |
| STAGE | prepocess, inference, postprocess | sscma_get_performance |

## ABS Examples

### Basic Usage
```
arduino_setup()
    sscma_begin_i2c("ai", WIRE, math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, sscma_invoke($ai, 1, true, false))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `sscma_begin_i2c("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
