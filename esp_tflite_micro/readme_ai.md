# ESP TFLite Micro

ESP TensorFlow Lite Micro model setup, tensors, quantization, and inference.

## Library Info
- **Name**: @aily-project/lib-esp-tflite-micro
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp_tflite_init` | Statement | VAR(field_input), HEADER(field_input), MODEL(field_input), ARENA(field_number) | `esp_tflite_init("tflm", "model.h", "g_model", 65536)` | `int _ailyTfliteElementCount(const TfLiteTensor *tensor) { ↵ if (!tensor &#124;&#124; !tensor->dims) return 0; ↵ int count = 1; ↵ for (int i = 0; i < tensor->dims->size; ++i) count *= tensor->dims->data[i]; ↵ return count; ↵ } ↵ const tflite::Model *tflm_model = nullptr; ↵ tflite::MicroMutableOpResolver<16> tflm_resolver; ↵ alignas(16) uint8_t tflm_arena[65536]; ↵ tflite::MicroInterpreter *tflm_interpreter = nullptr; ↵ TfLiteTensor *tflm_input = nullptr; ↵ TfLiteTensor *tflm_output = nullptr; ↵ bool tflm_ready = false; ↵ tflm_resolver.AddFullyConnected(); ↵ tflm_resolver.AddConv2D(); ↵ tflm_resolver.AddDepthwiseConv2D(); ↵ tflm_resolver.AddMaxPool2D(); ↵ tflm_resolver.AddAveragePool2D(); ↵ tflm_resolver.AddReshape(); ↵ tflm_resolver.AddSoftmax(); ↵ tflm_resolver.AddQuantize(); ↵ tflm_resolver.AddDequantize(); ↵ tflm_resolver.AddAdd(); ↵ tflm_resolver.AddMul(); ↵ tflm_model = tflite::GetModel(g_model); ↵ if (tflm_model && tflm_model->version() == TFLITE_SCHEMA_VERSION) { ↵ tflm_interpreter = new tflite::MicroInterpreter(tflm_model, tflm_resolver, tflm_arena, sizeof(tflm_arena)); ↵ tflm_ready = (tflm_interpreter->AllocateTensors() == kTfLiteOk); ↵ if (tflm_ready) { tflm_input = tflm_interpreter->input(0); tflm_output = tflm_interpreter->output(0); } ↵ }` |
| `esp_tflite_input_set` | Statement | VAR(field_variable), INDEX(input_value), TYPE(dropdown), VALUE(input_value) | `esp_tflite_input_set($tflm, math_number(0), float, math_number(0))` | `if (tflm_ready) tflm_input->data.f[1] = (float)(1);` |
| `esp_tflite_invoke` | Value | VAR(field_variable) | `esp_tflite_invoke($tflm)` | `(tflm_ready && tflm_interpreter->Invoke() == kTfLiteOk)` |
| `esp_tflite_output_get` | Value | VAR(field_variable), INDEX(input_value), TYPE(dropdown) | `esp_tflite_output_get($tflm, math_number(0), float)` | `(tflm_ready ? tflm_output->data.f[1] : 0)` |
| `esp_tflite_tensor_info` | Value | VAR(field_variable), TENSOR(dropdown), INFO(dropdown) | `esp_tflite_tensor_info($tflm, input, bytes)` | `(tflm_ready ? tflm_input->bytes : 0)` |
| `esp_tflite_ready` | Value | VAR(field_variable) | `esp_tflite_ready($tflm)` | `tflm_ready` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | float, int8, uint8, quantized | esp_tflite_input_set |
| TYPE | float, int8, uint8, dequantized | esp_tflite_output_get |
| TENSOR | input, output | esp_tflite_tensor_info |
| INFO | bytes, count, type, scale, zero_point | esp_tflite_tensor_info |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp_tflite_init("tflm", "model.h", "g_model", 65536)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp_tflite_invoke($tflm))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp_tflite_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
