# BMV080 PM Sensor

DFRobot BMV080 particulate matter sensor blocks for ESP32.

## Library Info

- **Name**: `@aily-project/lib-dfrobot-bmv080`
- **Version**: `0.1.0`
- **Arduino class**: `DFRobot_BMV080`, `DFRobot_BMV080_I2C`, `DFRobot_BMV080_SPI`
- **Transport**: I2C or SPI. Upstream package uses precompiled ESP32 libraries.

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `bmv080_init_i2c` | Statement | VAR(field_input), WIRE(dropdown), ADDRESS(dropdown) | `bmv080_init_i2c("bmv080", Wire, "0x57")` | `while (bmv080.begin() != 0) { ↵ delay(1000); ↵ } ↵ while (bmv080.openBmv080() != 0) { ↵ delay(1000); ↵ }` |
| `bmv080_init_spi` | Statement | VAR(field_input), SPI(dropdown), CS(input_value) | `bmv080_init_spi("bmv080", SPI, math_number(17))` | `while (bmv080.begin() != 0) { ↵ delay(1000); ↵ } ↵ while (bmv080.openBmv080() != 0) { ↵ delay(1000); ↵ }` |
| `bmv080_set_mode` | Statement | VAR(field_variable), MODE(dropdown) | `bmv080_set_mode($bmv080, CONTINUOUS_MODE)` | `bmv080.setBmv080Mode(CONTINUOUS_MODE);` |
| `bmv080_set_duty_cycle` | Statement | VAR(field_variable), PERIOD(input_value), INTEGRATION(input_value) | `bmv080_set_duty_cycle($bmv080, math_number(20), math_number(10))` | `bmv080.setDutyCyclingPeriod(1); ↵ bmv080.setIntegrationTime(1);` |
| `bmv080_set_algorithm` | Statement | VAR(field_variable), ALGORITHM(dropdown) | `bmv080_set_algorithm($bmv080, BALANCED)` | `bmv080.setMeasurementAlgorithm(FAST_RESPONSE);` |
| `bmv080_set_feature` | Statement | VAR(field_variable), FEATURE(dropdown), STATE(dropdown) | `bmv080_set_feature($bmv080, OBSTRUCTION, true)` | `bmv080.setObstructionDetection(true);` |
| `bmv080_read_data` | Value Boolean | VAR(field_variable) | `bmv080_read_data($bmv080)` | `bmv080.getBmv080Data(&bmv080_pm1, &bmv080_pm25, &bmv080_pm10)` |
| `bmv080_pm_value` | Value Number | VAR(field_variable), DATA(dropdown) | `bmv080_pm_value($bmv080, PM25)` | `bmv080_pm1` |
| `bmv080_get_status` | Value Number | VAR(field_variable), DATA(dropdown) | `bmv080_get_status($bmv080, OBSTRUCTED)` | `bmv080.getMeasurementAlgorithm()` |
| `bmv080_command` | Statement | VAR(field_variable), COMMAND(dropdown) | `bmv080_command($bmv080, STOP)` | `bmv080.stopBmv080();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| `ADDRESS` | `0x57`, `0x56`, `0x55`, `0x54` | I2C address selected by CSB/MISO straps. |
| `MODE` | `CONTINUOUS_MODE`, `DUTY_CYCLE_MODE` | Measurement mode. |
| `ALGORITHM` | `FAST_RESPONSE`, `BALANCED`, `HIGH_PRECISION` | Measurement algorithm. |
| `FEATURE` | `OBSTRUCTION`, `VIBRATION` | Feature to configure. |
| `STATE` | `true`, `false` | Enable or disable selected feature. |
| `DATA` | `PM1`, `PM25`, `PM10`; status values | PM cached value or status/config getter. |
| `COMMAND` | `STOP`, `RESET`, `CLOSE` | Sensor command. |

## ABS Examples

```text
bmv080_init_i2c("bmv080", Wire, "0x57")
bmv080_set_feature($bmv080, OBSTRUCTION, true)
bmv080_set_feature($bmv080, VIBRATION, true)
bmv080_set_algorithm($bmv080, BALANCED)
bmv080_set_mode($bmv080, CONTINUOUS_MODE)
bmv080_read_data($bmv080)
bmv080_pm_value($bmv080, PM25)
```

## Notes

1. Initialization creates a typed Blockly variable. Use `$bmv080`/`variables_get($bmv080)` in later blocks.
2. `begin()` and `openBmv080()` succeed when they return `0`; the init blocks handle this.
3. The upstream examples require `SET_LOOP_TASK_STACK_SIZE(60 * 1024)`, which the generator adds automatically.
4. Duty-cycle mode should configure period and integration time before `bmv080_set_mode(DUTY_CYCLE_MODE)`.
5. `bmv080_read_data` should be called regularly; it returns true only when new PM data is ready.
