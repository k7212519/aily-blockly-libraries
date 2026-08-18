# GPIO Viewer

Live ESP32 GPIO, ADC, touch, PWM, memory, and device information in a web UI.

## Library Info
- **Name**: @aily-project/lib-gpio-viewer
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `gpio_viewer_init` | Statement | VAR(field_input), PORT(input_value), INTERVAL(input_value), SKIP(field_checkbox) | `gpio_viewer_init("gpioViewer", math_number(0), math_number(1000), TRUE)` | `GPIOViewer gpioViewer; ↵ gpioViewer.setPort(1); ↵ gpioViewer.setSamplingInterval(1); ↵ gpioViewer.setSkipPeripheralPins(true); ↵ gpioViewer.begin();` |
| `gpio_viewer_wifi` | Statement | VAR(field_variable), SSID(input_value), PASSWORD(input_value) | `gpio_viewer_wifi($gpioViewer, text("value"), text("value"))` | `gpioViewer.connectToWifi(String("value").c_str(), String("value").c_str());` |
| `gpio_viewer_set` | Statement | VAR(field_variable), SETTING(dropdown), VALUE(input_value) | `gpio_viewer_set($gpioViewer, setPort, math_number(0))` | `gpioViewer.setPort(1);` |
| `gpio_viewer_begin` | Statement | VAR(field_variable) | `gpio_viewer_begin($gpioViewer)` | `gpioViewer.begin();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SETTING | setPort, setSamplingInterval, setSkipPeripheralPins | gpio_viewer_set |

## ABS Examples

### Basic Usage
```
arduino_setup()
    gpio_viewer_init("gpioViewer", math_number(0), math_number(1000), TRUE)
    serial_begin(Serial, 9600)

arduino_loop()
    gpio_viewer_wifi($gpioViewer, text("value"), text("value"))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `gpio_viewer_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
