# ArduinoFFT

arduinoFFT blocks for sampling signals, running FFT, and reading frequency peaks.

## Library Info
- **Name**: @aily-project/lib-arduino-fft
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `arduino_fft_init` | Statement | VAR(field_input), DATA_TYPE(dropdown), SAMPLES(dropdown), SAMPLING_FREQUENCY(input_value) | `arduino_fft_init("fft", double, 64, math_number(5000))` | `fft_samplingFrequency = 1; ↵ fft = ArduinoFFT<double>(fft_real, fft_imag, fft_samples, fft_samplingFrequency);` |
| `arduino_fft_set_sample` | Statement | VAR(field_variable), INDEX(input_value), REAL(input_value), IMAG(input_value) | `arduino_fft_set_sample($fft, math_number(0), math_number(100), math_number(0))` | `{ ↵ uint16_t arduinoFFT_index = (uint16_t)(1); ↵ if (arduinoFFT_index < fft_samples) { ↵ fft_real[arduinoFFT_index] = 1; ↵ fft_imag[arduinoFFT_index] = 1; ↵ } ↵ }` |
| `arduino_fft_clear_samples` | Statement | VAR(field_variable) | `arduino_fft_clear_samples($fft)` | `for (uint16_t arduinoFFT_i = 0; arduinoFFT_i < fft_samples; arduinoFFT_i++) { ↵ fft_real[arduinoFFT_i] = 0; ↵ fft_imag[arduinoFFT_i] = 0; ↵ }` |
| `arduino_fft_sample_analog` | Statement | VAR(field_variable), PIN(input_value), OFFSET(input_value), SCALE(input_value) | `arduino_fft_sample_analog($fft, math_number(0), math_number(0), math_number(1))` | `arduinoFFT_sampleAnalog(fft_real, fft_imag, fft_samples, fft_samplingFrequency, 1, 1, 1);` |
| `arduino_fft_generate_tone` | Statement | VAR(field_variable), FREQUENCY(input_value), AMPLITUDE(input_value), OFFSET(input_value) | `arduino_fft_generate_tone($fft, math_number(1000), math_number(100), math_number(0))` | `arduinoFFT_generateTone(fft_real, fft_imag, fft_samples, fft_samplingFrequency, 1, 1, 1);` |
| `arduino_fft_dc_removal` | Statement | VAR(field_variable) | `arduino_fft_dc_removal($fft)` | `fft.dcRemoval();` |
| `arduino_fft_windowing` | Statement | VAR(field_variable), WINDOW_TYPE(dropdown), DIRECTION(dropdown), COMPENSATION(field_checkbox) | `arduino_fft_windowing($fft, FFT_WIN_TYP_HAMMING, FFT_FORWARD, FALSE)` | `fft.windowing(FFT_WIN_TYP_RECTANGLE, FFT_FORWARD, false);` |
| `arduino_fft_compute` | Statement | VAR(field_variable), DIRECTION(dropdown) | `arduino_fft_compute($fft, FFT_FORWARD)` | `fft.compute(FFT_FORWARD);` |
| `arduino_fft_complex_to_magnitude` | Statement | VAR(field_variable) | `arduino_fft_complex_to_magnitude($fft)` | `fft.complexToMagnitude();` |
| `arduino_fft_process` | Statement | VAR(field_variable), WINDOW_TYPE(dropdown), REMOVE_DC(field_checkbox), COMPENSATION(field_checkbox) | `arduino_fft_process($fft, FFT_WIN_TYP_HAMMING, TRUE, FALSE)` | `fft.dcRemoval(); ↵ fft.windowing(FFT_WIN_TYP_RECTANGLE, FFT_FORWARD, false); ↵ fft.compute(FFT_FORWARD); ↵ fft.complexToMagnitude();` |
| `arduino_fft_major_peak` | Value | VAR(field_variable) | `arduino_fft_major_peak($fft)` | `fft.majorPeak()` |
| `arduino_fft_major_peak_parabola` | Value | VAR(field_variable) | `arduino_fft_major_peak_parabola($fft)` | `fft.majorPeakParabola()` |
| `arduino_fft_peak_magnitude` | Value | VAR(field_variable) | `arduino_fft_peak_magnitude($fft)` | `arduinoFFT_peakMagnitude(fft)` |
| `arduino_fft_bin_frequency` | Value | VAR(field_variable), INDEX(input_value) | `arduino_fft_bin_frequency($fft, math_number(1))` | `arduinoFFT_binFrequency(fft_samples, fft_samplingFrequency, 1)` |
| `arduino_fft_bin_magnitude` | Value | VAR(field_variable), INDEX(input_value) | `arduino_fft_bin_magnitude($fft, math_number(1))` | `arduinoFFT_binMagnitude(fft_real, fft_samples, 1)` |
| `arduino_fft_band_magnitude` | Value | VAR(field_variable), BAND_INDEX(input_value), BAND_COUNT(dropdown) | `arduino_fft_band_magnitude($fft, math_number(0), 8)` | `arduinoFFT_bandMagnitude(fft_real, fft_samples, 1, 4)` |
| `arduino_fft_print_bins` | Statement | VAR(field_variable), SERIAL(dropdown), START_INDEX(input_value), END_INDEX(input_value) | `arduino_fft_print_bins($fft, Serial, math_number(1), math_number(32))` | `arduinoFFT_printBins(Serial, fft_real, fft_samples, fft_samplingFrequency, 1, 1);` |
| `arduino_fft_revision` | Value | (none) | `arduino_fft_revision()` | `FFT_LIB_REV` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DATA_TYPE | double, float | Numeric type for generated buffers and `ArduinoFFT<T>` object |
| SAMPLES | 16, 32, 64, 128, 256, 512, 1024 | FFT sample count; must be a power of two |
| WINDOW_TYPE | FFT_WIN_TYP_RECTANGLE, FFT_WIN_TYP_HAMMING, FFT_WIN_TYP_HANN, FFT_WIN_TYP_TRIANGLE, FFT_WIN_TYP_NUTTALL, FFT_WIN_TYP_BLACKMAN, FFT_WIN_TYP_BLACKMAN_NUTTALL, FFT_WIN_TYP_BLACKMAN_HARRIS, FFT_WIN_TYP_FLT_TOP, FFT_WIN_TYP_WELCH | arduinoFFT window function |
| DIRECTION | FFT_FORWARD, FFT_REVERSE | FFT transform direction |
| COMPENSATION | TRUE, FALSE | Apply window compensation factor |
| REMOVE_DC | TRUE, FALSE | Run `dcRemoval()` before the forward pipeline |
| BAND_COUNT | 4, 8, 16 | Number of coarse bands across the positive-frequency bins |
| SERIAL | Serial, Serial1, Serial2, Serial3 | Serial stream used by `arduino_fft_print_bins` |

## ABS Examples

### Detect a Simulated 1000 Hz Signal
```
arduino_setup()
    arduino_fft_init("fft", double, 64, math_number(5000))
    serial_begin(Serial, 115200)

arduino_loop()
    arduino_fft_generate_tone($fft, math_number(1000), math_number(100), math_number(0))
    arduino_fft_process($fft, FFT_WIN_TYP_HAMMING, TRUE, FALSE)
    serial_println(Serial, arduino_fft_major_peak($fft))
    time_delay(math_number(1000))
```

### Sample an Analog Input
```
arduino_setup()
    arduino_fft_init("fft", double, 64, math_number(1000))
    serial_begin(Serial, 115200)

arduino_loop()
    arduino_fft_sample_analog($fft, math_number(0), math_number(0), math_number(1))
    arduino_fft_process($fft, FFT_WIN_TYP_HAMMING, TRUE, FALSE)
    serial_println(Serial, arduino_fft_major_peak($fft))
```

## Notes

1. **Variable**: `arduino_fft_init("fft", ...)` creates `$fft`; later blocks reference it with `variables_get($fft)`.
2. **Buffers**: For `fft`, the generator creates `fft_real[]`, `fft_imag[]`, `fft_samples`, and `fft_samplingFrequency` automatically.
3. **Sample count**: arduinoFFT requires the sample count to be a power of two; use the dropdown values from `arduino_fft_init`.
4. **Processing order**: Fill samples first, then run `arduino_fft_process()` or the manual sequence `dc_removal -> windowing -> compute -> complex_to_magnitude`.
5. **Result bins**: Bin 0 is the DC component. Positive-frequency magnitudes usually live from bin 1 through `samples / 2 - 1`.
6. **Input values**: Use `math_number(n)` for numeric `input_value` slots, or a nested value block that generates a numeric expression.