# Dust sensor driver library

Read the value of the GP2Y1010AU0F dust sensor and calculate and print the dust concentration

## Library Info
- **Name**: @aily-project/lib-gp2y1010au0f
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `gp2y1010au0f_init` | Statement | LED_PIN(dropdown), MEASURE_PIN(dropdown) | `gp2y1010au0f_init(LED_PIN, MEASURE_PIN)` | `GP2Y1010AU0F dustSensor(LED_PIN, MEASURE_PIN); ↵ dustSensor.begin();` |
| `gp2y1010au0f_read` | Value | (none) | `gp2y1010au0f_read()` | `dustSensor.read()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| LED_PIN | ${board.digitalPins} | gp2y1010au0f_init |
| MEASURE_PIN | ${board.digitalPins} | gp2y1010au0f_init |

## ABS Examples

### Basic Usage
```
arduino_setup()
    gp2y1010au0f_init(LED_PIN, MEASURE_PIN)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, gp2y1010au0f_read())
    time_delay(math_number(1000))
```

## Notes

1. **Parameter order**: ABS parameters follow `block.json` args order.
2. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
