# TLx493D 3D Magnetic Sensor

Blockly library for Infineon XENSIV TLx493D 3D magnetic sensor family, reading 3-axis magnetic field and temperature via I2C.

## Library Info
- **Name**: @aily-project/lib-infineon-tlx493d
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tlx493d_init` | Statement | VAR(field_input), TYPE(dropdown), ADDRESS(dropdown), WIRE(dropdown) | `tlx493d_init("mag", P3B6, TLx493D_IIC_ADDR_A0_e, Wire)` | `TLx493D_P3B6 mag(Wire, TLx493D_IIC_ADDR_A0_e);` + `mag.begin();` |
| `tlx493d_get_temperature` | Value(Number) | VAR(field_variable) | `tlx493d_get_temperature(variables_get($mag))` | `_tlx493d_getTemp_mag()` |
| `tlx493d_get_magnetic_field` | Value(Number) | VAR(field_variable), AXIS(dropdown) | `tlx493d_get_magnetic_field(variables_get($mag), X)` | `_tlx493d_getMagX_mag()` |
| `tlx493d_set_sensitivity` | Statement | VAR(field_variable), RANGE(dropdown) | `tlx493d_set_sensitivity(variables_get($mag), TLx493D_FULL_RANGE_e)` | `mag.setSensitivity(TLx493D_FULL_RANGE_e);` |
| `tlx493d_set_power_mode` | Statement | VAR(field_variable), MODE(dropdown) | `tlx493d_set_power_mode(variables_get($mag), TLx493D_FAST_MODE_e)` | `mag.setPowerMode(TLx493D_FAST_MODE_e);` |
| `tlx493d_has_valid_data` | Value(Boolean) | VAR(field_variable) | `tlx493d_has_valid_data(variables_get($mag))` | `mag.hasValidData()` |
| `tlx493d_software_reset` | Statement | VAR(field_variable) | `tlx493d_software_reset(variables_get($mag))` | `mag.softwareReset();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | A1B6, A2B6, A2BW, P2B6, W2B6, W2BW, P3B6 | Sensor type/model |
| ADDRESS | TLx493D_IIC_ADDR_A0_e, TLx493D_IIC_ADDR_A1_e, TLx493D_IIC_ADDR_A2_e, TLx493D_IIC_ADDR_A3_e | I2C address |
| WIRE | Wire, Wire1, ... | I2C bus (board-dependent) |
| AXIS | X, Y, Z | Magnetic field axis |
| RANGE | TLx493D_FULL_RANGE_e, TLx493D_SHORT_RANGE_e, TLx493D_EXTRA_SHORT_RANGE_e | Sensitivity range |
| MODE | TLx493D_FAST_MODE_e, TLx493D_LOW_POWER_MODE_e, TLx493D_ULTRA_LOW_POWER_MODE_e, TLx493D_MASTER_CONTROLLED_MODE_e, TLx493D_POWER_DOWN_MODE_e | Power mode |

## ABS Examples

### Basic Usage — Read magnetic field and temperature
```
arduino_setup()
    tlx493d_init("mag", P3B6, TLx493D_IIC_ADDR_A0_e, Wire)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, tlx493d_get_temperature(variables_get($mag)))
    serial_println(Serial, tlx493d_get_magnetic_field(variables_get($mag), X))
    serial_println(Serial, tlx493d_get_magnetic_field(variables_get($mag), Y))
    serial_println(Serial, tlx493d_get_magnetic_field(variables_get($mag), Z))
    time_delay(math_number(1000))
```

### Set sensitivity before reading
```
arduino_setup()
    tlx493d_init("mag", P3B6, TLx493D_IIC_ADDR_A0_e, Wire)
    tlx493d_set_sensitivity(variables_get($mag), TLx493D_SHORT_RANGE_e)
```

## Notes

1. **Initialization**: Call `tlx493d_init` inside `arduino_setup()`
2. **Variable**: `tlx493d_init("varName", ...)` creates variable `$varName`; reference it with `variables_get($varName)`
3. **Helper functions**: Temperature and magnetic field reads auto-generate helper functions that wrap the pointer-based C++ API
4. **Sensor type**: The TYPE parameter determines the C++ class used in the global declaration (e.g. `TLx493D_P3B6`)
5. **I2C**: Wire.begin() is auto-added to setup when using this library
