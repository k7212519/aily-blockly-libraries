# Home Assistant MQTT

Home Assistant MQTT integration library for discovering, reporting, and controlling Arduino or ESP device entities over MQTT.

## Library Info
- **Name**: @aily-project/lib-home-assistant
- **Version**: 2.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `ha_device_create` | Statement | VAR(field_input), UNIQUE_ID(field_input) | `ha_device_create("device", "ailyDevice")` | `HADevice device("ailyDevice");` |
| `ha_device_set_info` | Statement | VAR(field_variable), NAME(field_input), MANUFACTURER(field_input), MODEL(field_input), SOFTWARE(field_input), CONFIG_URL(field_input) | `ha_device_set_info($device, "Arduino", "ailyProject", "ESP32", "1.0.0", "CONFIG_URL")` | `device.setName("Arduino"); ↵ device.setManufacturer("ailyProject"); ↵ device.setModel("ESP32"); ↵ device.setSoftwareVersion("1.0.0"); ↵ device.setConfigurationUrl("value");` |
| `ha_device_enable_availability` | Statement | VAR(field_variable), SHARED(dropdown), LAST_WILL(dropdown) | `ha_device_enable_availability($device, true, true)` | `device.enableSharedAvailability(); ↵ device.enableLastWill();` |
| `ha_mqtt_create` | Statement | VAR(field_input), CLIENT(field_input), NETWORK(dropdown), DEVICE(field_variable), MAX_DEVICES(field_number) | `ha_mqtt_create("mqtt", "client", WIFI, $device, 24)` | `WiFiClient client; ↵ HAMqtt mqtt(client, device, 24); ↵ mqtt.loop();` |
| `ha_mqtt_begin` | Statement | VAR(field_variable), HOST(input_value), PORT(input_value), USERNAME(input_value), PASSWORD(input_value) | `ha_mqtt_begin($mqtt, text("value"), math_number(0), text("value"), text("value"))` | `_ha_mqtt_host = String("value"); ↵ _ha_mqtt_username = String("value"); ↵ _ha_mqtt_password = String("value"); ↵ mqtt.begin(_ha_mqtt_host.c_str(), (uint16_t)(1), (_ha_mqtt_username.length() ? _ha_mqtt_username.c_str() : nullptr), (_ha_mqtt_password.length() ? _ha_mqtt_password.c_str() : nullptr));` |
| `ha_mqtt_set_prefixes` | Statement | VAR(field_variable), DISCOVERY(field_input), DATA(field_input) | `ha_mqtt_set_prefixes($mqtt, "homeassistant", "aha")` | `mqtt.setDiscoveryPrefix("homeassistant"); ↵ mqtt.setDataPrefix("aha");` |
| `ha_mqtt_set_keep_alive` | Statement | VAR(field_variable), INTERVAL(input_value) | `ha_mqtt_set_keep_alive($mqtt, math_number(1000))` | `mqtt.setKeepAlive((uint16_t)(1));` |
| `ha_mqtt_set_buffer_size` | Statement | VAR(field_variable), SIZE(input_value) | `ha_mqtt_set_buffer_size($mqtt, math_number(0))` | `mqtt.setBufferSize((uint16_t)(1));` |
| `ha_mqtt_loop` | Statement | VAR(field_variable) | `ha_mqtt_loop($mqtt)` | `mqtt.loop();` |
| `ha_mqtt_connected` | Value | VAR(field_variable) | `ha_mqtt_connected($mqtt)` | `mqtt.isConnected()` |
| `ha_mqtt_state` | Value | VAR(field_variable) | `ha_mqtt_state($mqtt)` | `mqtt.getState()` |
| `ha_mqtt_publish` | Statement | VAR(field_variable), TOPIC(input_value), PAYLOAD(input_value), RETAIN(dropdown) | `ha_mqtt_publish($mqtt, text("value"), text("value"), false)` | `mqtt.publish(String("value").c_str(), String("value").c_str(), false);` |
| `ha_mqtt_subscribe` | Statement | VAR(field_variable), TOPIC(input_value) | `ha_mqtt_subscribe($mqtt, text("value"))` | `mqtt.subscribe(String("value").c_str());` |
| `ha_mqtt_disconnect` | Statement | VAR(field_variable) | `ha_mqtt_disconnect($mqtt)` | `mqtt.disconnect();` |
| `ha_mqtt_on_connected` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_mqtt_on_connected($mqtt)` | `void _ha_mqtt_connected() { ↵ } ↵ mqtt.onConnected(_ha_mqtt_connected);` |
| `ha_mqtt_on_message` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_mqtt_on_message($mqtt)` | `void _ha_mqtt_message(const char* topic, const uint8_t* payload, uint16_t length) { ↵ (void)topic; ↵ (void)payload; ↵ (void)length; ↵ } ↵ mqtt.onMessage(_ha_mqtt_message);` |
| `ha_mqtt_message_topic` | Value | (none) | `ha_mqtt_message_topic()` | `String(topic)` |
| `ha_mqtt_message_payload` | Value | (none) | `ha_mqtt_message_payload()` | `_ha_payload_to_string(payload, length)` |
| `ha_mqtt_message_length` | Value | (none) | `ha_mqtt_message_length()` | `length` |
| `ha_entity_set_info` | Statement | VAR(field_variable), NAME(field_input), OBJECT_ID(field_input), ICON(field_input) | `ha_entity_set_info($entity, "My Entity", "OBJECT_ID", "ICON")` | `entity.setName("My Entity"); ↵ entity.setObjectId("value"); ↵ entity.setIcon("value");` |
| `ha_entity_set_availability` | Statement | VAR(field_variable), ONLINE(input_value) | `ha_entity_set_availability($entity, logic_boolean(TRUE))` | `entity.setAvailability((bool)(true));` |
| `ha_sensor_create_text` | Statement | VAR(field_input), UNIQUE_ID(field_input), FEATURES(dropdown) | `ha_sensor_create_text("sensor", "textSensor", HASensor::DefaultFeatures)` | `HASensor sensor("textSensor", HASensor::DefaultFeatures);` |
| `ha_sensor_create_number` | Statement | VAR(field_input), UNIQUE_ID(field_input), PRECISION(dropdown), FEATURES(dropdown) | `ha_sensor_create_number("numSensor", "numSensor", HASensorNumber::PrecisionP0, HASensor::DefaultFeatures)` | `HASensorNumber numSensor("numSensor", HASensorNumber::PrecisionP0, HASensor::DefaultFeatures);` |
| `ha_sensor_settings` | Statement | VAR(field_variable), DEVICE_CLASS(field_input), STATE_CLASS(field_input), UNIT(field_input), EXPIRE_AFTER(input_value), FORCE_UPDATE(dropdown) | `ha_sensor_settings($sensor, "DEVICE_CLASS", "STATE_CLASS", "UNIT", math_number(0), false)` | `sensor.setDeviceClass("value"); ↵ sensor.setStateClass("value"); ↵ sensor.setUnitOfMeasurement("value"); ↵ sensor.setExpireAfter((uint16_t)(1)); ↵ sensor.setForceUpdate(false);` |
| `ha_sensor_set_value` | Statement | VAR(field_variable), VALUE(input_value) | `ha_sensor_set_value($sensor, text("value"))` | `sensor.setValue(String("value").c_str());` |
| `ha_sensor_set_json_attributes` | Statement | VAR(field_variable), JSON(input_value) | `ha_sensor_set_json_attributes($sensor, text("value"))` | `sensor.setJsonAttributes(String("value").c_str());` |
| `ha_sensor_number_set_value` | Statement | VAR(field_variable), VALUE(input_value), FORCE(dropdown) | `ha_sensor_number_set_value($numSensor, math_number(0), false)` | `numSensor.setValue((float)(1), false);` |
| `ha_binary_sensor_create` | Statement | VAR(field_input), UNIQUE_ID(field_input) | `ha_binary_sensor_create("binarySensor", "binarySensor")` | `HABinarySensor binarySensor("binarySensor");` |
| `ha_binary_sensor_settings` | Statement | VAR(field_variable), DEVICE_CLASS(field_input), EXPIRE_AFTER(input_value) | `ha_binary_sensor_settings($binarySensor, "DEVICE_CLASS", math_number(0))` | `binarySensor.setDeviceClass("value"); ↵ binarySensor.setExpireAfter((uint16_t)(1));` |
| `ha_binary_sensor_set_state` | Statement | VAR(field_variable), STATE(input_value), FORCE(dropdown) | `ha_binary_sensor_set_state($binarySensor, logic_boolean(TRUE), false)` | `binarySensor.setState((bool)(true), false);` |
| `ha_binary_sensor_get_state` | Value | VAR(field_variable) | `ha_binary_sensor_get_state($binarySensor)` | `binarySensor.getCurrentState()` |
| `ha_switch_create` | Statement | VAR(field_input), UNIQUE_ID(field_input) | `ha_switch_create("haSwitch", "switch")` | `HASwitch haSwitch("switch");` |
| `ha_switch_settings` | Statement | VAR(field_variable), DEVICE_CLASS(field_input), RETAIN(dropdown), OPTIMISTIC(dropdown) | `ha_switch_settings($haSwitch, "DEVICE_CLASS", false, false)` | `haSwitch.setDeviceClass("value"); ↵ haSwitch.setRetain(false); ↵ haSwitch.setOptimistic(false);` |
| `ha_switch_set_state` | Statement | VAR(field_variable), STATE(input_value), FORCE(dropdown) | `ha_switch_set_state($haSwitch, logic_boolean(TRUE), false)` | `haSwitch.setState((bool)(true), false);` |
| `ha_switch_get_state` | Value | VAR(field_variable) | `ha_switch_get_state($haSwitch)` | `haSwitch.getCurrentState()` |
| `ha_switch_on_command` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_switch_on_command($haSwitch)` | `void _ha_haSwitch_switch_command(bool state, HASwitch* sender) { ↵ (void)sender; ↵ } ↵ haSwitch.onCommand(_ha_haSwitch_switch_command);` |
| `ha_button_create` | Statement | VAR(field_input), UNIQUE_ID(field_input) | `ha_button_create("button", "button")` | `HAButton button("button");` |
| `ha_button_settings` | Statement | VAR(field_variable), DEVICE_CLASS(field_input), RETAIN(dropdown) | `ha_button_settings($button, "DEVICE_CLASS", false)` | `button.setDeviceClass("value"); ↵ button.setRetain(false);` |
| `ha_button_on_command` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_button_on_command($button)` | `void _ha_button_button_command(HAButton* sender) { ↵ (void)sender; ↵ } ↵ button.onCommand(_ha_button_button_command);` |
| `ha_light_create` | Statement | VAR(field_input), UNIQUE_ID(field_input), FEATURES(dropdown) | `ha_light_create("light", "light", HALight::DefaultFeatures)` | `HALight light("light", HALight::DefaultFeatures);` |
| `ha_light_settings` | Statement | VAR(field_variable), RETAIN(dropdown), OPTIMISTIC(dropdown), BRIGHTNESS_SCALE(input_value), MIN_MIREDS(input_value), MAX_MIREDS(input_value) | `ha_light_settings($light, false, false, math_number(0), math_number(0), math_number(0))` | `light.setRetain(false); ↵ light.setOptimistic(false); ↵ light.setBrightnessScale((uint8_t)(1)); ↵ light.setMinMireds((uint16_t)(1)); ↵ light.setMaxMireds((uint16_t)(1));` |
| `ha_light_set_state` | Statement | VAR(field_variable), STATE(input_value), FORCE(dropdown) | `ha_light_set_state($light, logic_boolean(TRUE), false)` | `light.setState((bool)(true), false);` |
| `ha_light_set_brightness` | Statement | VAR(field_variable), BRIGHTNESS(input_value), FORCE(dropdown) | `ha_light_set_brightness($light, math_number(0), false)` | `light.setBrightness((uint8_t)(1), false);` |
| `ha_light_set_color_temperature` | Statement | VAR(field_variable), TEMPERATURE(input_value), FORCE(dropdown) | `ha_light_set_color_temperature($light, math_number(0), false)` | `light.setColorTemperature((uint16_t)(1), false);` |
| `ha_light_set_rgb` | Statement | VAR(field_variable), RED(input_value), GREEN(input_value), BLUE(input_value), FORCE(dropdown) | `ha_light_set_rgb($light, math_number(0), math_number(0), math_number(0), false)` | `light.setRGBColor(HALight::RGBColor((uint8_t)(1), (uint8_t)(1), (uint8_t)(1)), false);` |
| `ha_light_get_state` | Value | VAR(field_variable) | `ha_light_get_state($light)` | `light.getCurrentState()` |
| `ha_light_get_brightness` | Value | VAR(field_variable) | `ha_light_get_brightness($light)` | `light.getCurrentBrightness()` |
| `ha_light_on_state_command` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_light_on_state_command($light)` | `void _ha_light_light_state(bool state, HALight* sender) { ↵ (void)sender; ↵ } ↵ light.onStateCommand(_ha_light_light_state);` |
| `ha_light_on_brightness_command` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_light_on_brightness_command($light)` | `void _ha_light_light_brightness(uint8_t brightness, HALight* sender) { ↵ (void)sender; ↵ } ↵ light.onBrightnessCommand(_ha_light_light_brightness);` |
| `ha_light_on_color_temperature_command` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_light_on_color_temperature_command($light)` | `void _ha_light_light_temperature(uint16_t temperature, HALight* sender) { ↵ (void)sender; ↵ } ↵ light.onColorTemperatureCommand(_ha_light_light_temperature);` |
| `ha_light_on_rgb_command` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_light_on_rgb_command($light)` | `void _ha_light_light_rgb(HALight::RGBColor color, HALight* sender) { ↵ (void)sender; ↵ } ↵ light.onRGBColorCommand(_ha_light_light_rgb);` |
| `ha_number_create` | Statement | VAR(field_input), UNIQUE_ID(field_input), PRECISION(dropdown) | `ha_number_create("number", "number", HANumber::PrecisionP0)` | `HANumber number("number", HANumber::PrecisionP0);` |
| `ha_number_settings` | Statement | VAR(field_variable), DEVICE_CLASS(field_input), UNIT(field_input), MODE(dropdown), MIN(input_value), MAX(input_value), STEP(input_value), RETAIN(dropdown), OPTIMISTIC(dropdown) | `ha_number_settings($number, "DEVICE_CLASS", "UNIT", HANumber::ModeAuto, math_number(0), math_number(0), math_number(0), false, false)` | `number.setDeviceClass("value"); ↵ number.setUnitOfMeasurement("value"); ↵ number.setMode(HANumber::ModeAuto); ↵ number.setMin((float)(1)); ↵ number.setMax((float)(1)); ↵ number.setStep((float)(1)); ↵ number.setRetain(false); ↵ number.setOptimistic(false);` |
| `ha_number_set_state` | Statement | VAR(field_variable), VALUE(input_value), FORCE(dropdown) | `ha_number_set_state($number, math_number(0), false)` | `number.setState((float)(1), false);` |
| `ha_number_get_state` | Value | VAR(field_variable) | `ha_number_get_state($number)` | `number.getCurrentState().toFloat()` |
| `ha_number_on_command` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_number_on_command($number)` | `void _ha_number_number_command(HANumeric number, HANumber* sender) { ↵ (void)sender; ↵ } ↵ number.onCommand(_ha_number_number_command);` |
| `ha_select_create` | Statement | VAR(field_input), UNIQUE_ID(field_input) | `ha_select_create("select", "select")` | `HASelect select("select");` |
| `ha_select_settings` | Statement | VAR(field_variable), OPTIONS(field_input), RETAIN(dropdown), OPTIMISTIC(dropdown) | `ha_select_settings($select, "Auto;Heat;Cool", false, false)` | `select.setOptions("Auto;Heat;Cool"); ↵ select.setRetain(false); ↵ select.setOptimistic(false);` |
| `ha_select_set_state` | Statement | VAR(field_variable), INDEX(input_value), FORCE(dropdown) | `ha_select_set_state($select, math_number(0), false)` | `select.setState((int8_t)(1), false);` |
| `ha_select_get_state` | Value | VAR(field_variable) | `ha_select_get_state($select)` | `select.getCurrentState()` |
| `ha_select_get_option` | Value | VAR(field_variable) | `ha_select_get_option($select)` | `String(select.getCurrentOption() ? select.getCurrentOption() : "")` |
| `ha_select_on_command` | Hat | VAR(field_variable), HANDLER(input_statement) | `ha_select_on_command($select)` | `void _ha_select_select_command(int8_t index, HASelect* sender) { ↵ (void)sender; ↵ } ↵ select.onCommand(_ha_select_select_command);` |
| `ha_command_bool_state` | Value | (none) | `ha_command_bool_state()` | `state` |
| `ha_command_brightness` | Value | (none) | `ha_command_brightness()` | `brightness` |
| `ha_command_color_temperature` | Value | (none) | `ha_command_color_temperature()` | `temperature` |
| `ha_command_rgb_red` | Value | (none) | `ha_command_rgb_red()` | `color.red` |
| `ha_command_rgb_green` | Value | (none) | `ha_command_rgb_green()` | `color.green` |
| `ha_command_rgb_blue` | Value | (none) | `ha_command_rgb_blue()` | `color.blue` |
| `ha_number_command_is_set` | Value | (none) | `ha_number_command_is_set()` | `number.isSet()` |
| `ha_number_command_value` | Value | (none) | `ha_number_command_value()` | `number.toFloat()` |
| `ha_select_command_index` | Value | (none) | `ha_select_command_index()` | `index` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SHARED | true, false | ha_device_enable_availability |
| LAST_WILL | true, false | ha_device_enable_availability |
| NETWORK | WIFI, ETHERNET | ha_mqtt_create |
| RETAIN | false, true | ha_mqtt_publish, ha_switch_settings, ha_button_settings |
| FEATURES | HASensor::DefaultFeatures, HASensor::JsonAttributesFeature | ha_sensor_create_text, ha_sensor_create_number |
| PRECISION | HASensorNumber::PrecisionP0, HASensorNumber::PrecisionP1, HASensorNumber::PrecisionP2, HASensorNumber::PrecisionP3 | ha_sensor_create_number |
| FORCE_UPDATE | false, true | ha_sensor_settings |
| FORCE | false, true | ha_sensor_number_set_value, ha_binary_sensor_set_state, ha_switch_set_state |
| OPTIMISTIC | false, true | ha_switch_settings, ha_light_settings, ha_number_settings |
| FEATURES | HALight::DefaultFeatures, HALight::BrightnessFeature, HALight::ColorTemperatureFeature, HALight::RGBFeature, HALight::BrightnessFeature &#124; HALight::RGBFeature, HALight::BrightnessFeature &#124; HALight::ColorTemperatureFeat... | ha_light_create |
| PRECISION | HANumber::PrecisionP0, HANumber::PrecisionP1, HANumber::PrecisionP2, HANumber::PrecisionP3 | ha_number_create |
| MODE | HANumber::ModeAuto, HANumber::ModeBox, HANumber::ModeSlider | ha_number_settings |

## ABS Examples

### Basic Usage
```
arduino_setup()
    ha_device_create("device", "ailyDevice")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, ha_mqtt_connected($mqtt))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `ha_device_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
