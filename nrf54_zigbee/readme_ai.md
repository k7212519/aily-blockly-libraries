# nRF54 Zigbee Home Automation

Zigbee Home Automation library for nRF54L15, supporting multiple HA device types with secure commissioning and attribute reporting.

## Library Info
- **Name**: @aily-project/lib-nrf54-zigbee
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `zigbee_init` | Statement | VAR(field_input), ROLE(dropdown), DEVICE_TYPE(dropdown), CHANNEL(input_value), PAN_ID(input_value) | `zigbee_init("zigbee", END_DEVICE, ON_OFF_LIGHT, math_number(15), math_number(4660))` | Initializes radio, device, store, commissioning state, and persistent state restore |
| `zigbee_set_basic_info` | Statement | VAR(field_variable), MANUFACTURER(input_value), MODEL(input_value), VERSION(input_value) | `zigbee_set_basic_info($zigbee, text("Aily"), text("Light"), text("1.0"))` | Sets manufacturer, model, SW version global variables |
| `zigbee_set_install_code` | Statement | VAR(field_variable), INSTALL_CODE(input_value) | `zigbee_set_install_code($zigbee, text("10AC..."))` | Parses hex install code and derives link key |
| `zigbee_start` | Statement | VAR(field_variable) | `zigbee_start($zigbee)` | `radio.begin(ch, 8); requestNetworkSteering();` |
| `zigbee_loop` | Statement | VAR(field_variable) | `zigbee_loop($zigbee)` | `processLoop(); device.updateIdentify(millis());` |
| `zigbee_is_joined` | Value(Boolean) | VAR(field_variable) | `zigbee_is_joined($zigbee)` | `network.joined` |
| `zigbee_set_on_off` | Statement | VAR(field_variable), STATE(dropdown) | `zigbee_set_on_off($zigbee, TRUE)` | `device.setOnOff(true);` |
| `zigbee_get_on_off` | Value(Boolean) | VAR(field_variable) | `zigbee_get_on_off($zigbee)` | `device.onOff()` |
| `zigbee_set_level` | Statement | VAR(field_variable), LEVEL(input_value) | `zigbee_set_level($zigbee, math_number(128))` | `device.setLevel(128);` |
| `zigbee_get_level` | Value(Number) | VAR(field_variable) | `zigbee_get_level($zigbee)` | `device.level()` |
| `zigbee_set_color_hs` | Statement | VAR(field_variable), HUE(input_value), SATURATION(input_value) | `zigbee_set_color_hs($zigbee, math_number(0), math_number(254))` | `device.setColorHueSaturation(0, 254);` |
| `zigbee_set_color_temp` | Statement | VAR(field_variable), COLOR_TEMP(input_value) | `zigbee_set_color_temp($zigbee, math_number(250))` | `device.setColorTemperatureMireds(250);` |
| `zigbee_set_temperature` | Statement | VAR(field_variable), TEMPERATURE(input_value) | `zigbee_set_temperature($zigbee, math_number(25))` | `device.setTemperatureState((int16_t)(25*100), -4000, 8500, 10);` |
| `zigbee_set_humidity` | Statement | VAR(field_variable), HUMIDITY(input_value) | `zigbee_set_humidity($zigbee, math_number(50))` | `device.setHumidityState((uint16_t)(50*100), 0, 10000, 10);` |
| `zigbee_set_battery` | Statement | VAR(field_variable), VOLTAGE(input_value), PERCENTAGE(input_value) | `zigbee_set_battery($zigbee, math_number(30), math_number(100))` | `device.setBatteryStatus(30, 200);` |
| `zigbee_is_identifying` | Value(Boolean) | VAR(field_variable) | `zigbee_is_identifying($zigbee)` | `device.identifying()` |
| `zigbee_configure_reporting` | Statement | VAR(field_variable), CLUSTER(dropdown), ATTR_ID(input_value), MIN_INTERVAL(input_value), MAX_INTERVAL(input_value) | `zigbee_configure_reporting($zigbee, ON_OFF, math_number(0), math_number(1), math_number(30))` | `device.configureReporting(0x0006, 0, kBoolean, 1, 30, 0);` |
| `zigbee_on_state_change` | Hat | VAR(field_variable), DO(input_statement) | `zigbee_on_state_change($zigbee) @DO: action()` | Generates callback function and polling check |
| `zigbee_on_level_change` | Hat | VAR(field_variable), DO(input_statement) | `zigbee_on_level_change($zigbee) @DO: action()` | Generates callback function and polling check |
| `zigbee_on_color_change` | Hat | VAR(field_variable), DO(input_statement) | `zigbee_on_color_change($zigbee) @DO: action()` | Generates callback function and polling check |
| `zigbee_on_join` | Hat | VAR(field_variable), DO(input_statement) | `zigbee_on_join($zigbee) @DO: action()` | Generates callback for join event |
| `zigbee_persist_save` | Statement | VAR(field_variable) | `zigbee_persist_save($zigbee)` | Saves network state, reporting configs, bindings to flash |
| `zigbee_persist_clear` | Statement | VAR(field_variable) | `zigbee_persist_clear($zigbee)` | `store.clear();` |
| `zigbee_rejoin` | Statement | VAR(field_variable) | `zigbee_rejoin($zigbee)` | `requestSecureRejoin(&network);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| ROLE | END_DEVICE, ROUTER | Device role in Zigbee network |
| DEVICE_TYPE | ON_OFF_LIGHT, DIMMABLE_LIGHT, COLOR_LIGHT, EXTENDED_COLOR_LIGHT, ON_OFF_SWITCH, TEMPERATURE_SENSOR, TEMPERATURE_HUMIDITY_SENSOR | HA device type |
| STATE | TRUE, FALSE | On/Off state |
| CLUSTER | ON_OFF, LEVEL_CONTROL, COLOR_CONTROL, TEMPERATURE, HUMIDITY, POWER_CONFIG | Zigbee cluster for attribute reporting |

## ABS Examples

### On/Off Light (End Device)
```
arduino_setup()
    zigbee_init("zigbee", END_DEVICE, ON_OFF_LIGHT, math_number(15), math_number(4660))
    zigbee_set_basic_info(variables_get($zigbee), text("Aily"), text("PorchLight"), text("1.0.0"))
    zigbee_start(variables_get($zigbee))

arduino_loop()
    zigbee_loop(variables_get($zigbee))
    controls_if()
        @IF0: zigbee_is_joined(variables_get($zigbee))
        @DO0:
            controls_if()
                @IF0: zigbee_get_on_off(variables_get($zigbee))
                @DO0:
                    io_digitalwrite(LED_BUILTIN, HIGH)
                @ELSE:
                    io_digitalwrite(LED_BUILTIN, LOW)

zigbee_on_state_change(variables_get($zigbee))
    @DO:
        serial_println(Serial, text("Light state changed"))
```

### Temperature Sensor (Router)
```
arduino_setup()
    zigbee_init("zigbee", ROUTER, TEMPERATURE_SENSOR, math_number(15), math_number(4660))
    zigbee_set_basic_info(variables_get($zigbee), text("Aily"), text("TempSensor"), text("1.0.0"))
    zigbee_configure_reporting(variables_get($zigbee), TEMPERATURE, math_number(0), math_number(5), math_number(60))
    zigbee_start(variables_get($zigbee))

arduino_loop()
    zigbee_loop(variables_get($zigbee))
    zigbee_set_temperature(variables_get($zigbee), math_number(25))
    time_delay(math_number(10000))
```

### Dimmable Light with Color
```
arduino_setup()
    zigbee_init("zigbee", END_DEVICE, COLOR_LIGHT, math_number(15), math_number(4660))
    zigbee_start(variables_get($zigbee))

arduino_loop()
    zigbee_loop(variables_get($zigbee))

zigbee_on_level_change(variables_get($zigbee))
    @DO:
        io_analogwrite(LED_BUILTIN, zigbee_get_level(variables_get($zigbee)))

zigbee_on_color_change(variables_get($zigbee))
    @DO:
        serial_println(Serial, text("Color changed"))
```

## Notes

1. **Initialization**: Place `zigbee_init` inside `arduino_setup()`. It must be called before `zigbee_start`.
2. **Loop required**: Must place `zigbee_loop` inside `arduino_loop()` for network communication.
3. **Variable**: `zigbee_init("varName", ...)` creates variable `$varName` of type `ZigbeeDevice`; reference it in other blocks with `variables_get($varName)`.
4. **Device types**: Choose the device type that matches your hardware. Light types support on/off, dimming, and color control respectively. Sensor types support temperature and humidity reporting.
5. **Reporting**: Configure attribute reporting for values you want to automatically push to the coordinator (e.g., temperature readings every 60 seconds).
6. **Persistence**: Use `zigbee_persist_save` to save network state to flash. The device will auto-restore on reboot.
7. **Install code**: Optional security feature. If not set, the device uses the Zigbee Alliance well-known key for commissioning.
8. **Event callbacks**: Hat blocks (`zigbee_on_*`) use polling to detect state changes from the Zigbee network. They must be placed outside the main program flow.
