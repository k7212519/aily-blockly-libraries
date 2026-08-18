# SparkFun WiseChip HUD Display

Blockly wrapper for the SparkFun WiseChip HUD I2C head-up display.

## Library Info
- **Name**: @aily-project/lib-sparkfun-wisechip-hud
- **Version**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `wisechip_hud_init` | Statement | VAR(field_input) | `wisechip_hud_init("hud")` | `Wire.begin(); ↵ hud.begin();` |
| `wisechip_hud_icon_level` | Statement | VAR(field_variable), ICON(input_value), LEVEL(input_value) | `wisechip_hud_icon_level($hud, math_number(0), math_number(0))` | `hud.AdjustIconLevel(1, 1);` |
| `wisechip_hud_nav` | Statement | VAR(field_variable), CMD(dropdown) | `wisechip_hud_nav($hud, nav_TurnLeft)` | `hud.nav_TurnLeft(1);` |
| `wisechip_hud_compass` | Statement | VAR(field_variable), TYPE(dropdown), SELECT(input_value) | `wisechip_hud_compass($hud, compassCircle, math_number(0))` | `hud.compassCircle(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CMD | nav_TurnLeft, nav_TurnRight, nav_HardLeft, nav_HardRight, nav_KeepLeft, nav_KeepRight, nav_Group | wisechip_hud_nav |
| TYPE | compassCircle, compassArrows | wisechip_hud_compass |

## ABS Examples

### Basic Usage
```
arduino_setup()
    wisechip_hud_init("hud")
    serial_begin(Serial, 9600)

arduino_loop()
    wisechip_hud_icon_level($hud, math_number(0), math_number(0))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `wisechip_hud_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
