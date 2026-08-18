# Adafruit MQTT communication library

Connect to MQTT brokers and publish or subscribe with the Adafruit MQTT library

## Library Info
- **Name**: @aily-project/lib-adafruit-mqtt
- **Version**: 2.6.4

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `adafruit_mqtt_create` | Statement | VAR(field_input), SERVER(field_input), PORT(field_number), USERNAME(field_input), PASSWORD(field_input), CLIENT_ID(field_input) | `adafruit_mqtt_create("mqtt", "io.adafruit.com", 1883, "username", "aio_key", "CLIENT_ID")` | `int8_t _adafruit_mqtt_mqtt_last_error = 0; ↵ WiFiClient mqtt_wifiClient; ↵ Adafruit_MQTT_Client mqtt(&mqtt_wifiClient, "io.adafruit.com", 1883, "value", "username", "aio_key");` |
| `adafruit_mqtt_set_keep_alive` | Statement | VAR(field_variable), INTERVAL(input_value) | `adafruit_mqtt_set_keep_alive($mqtt, math_number(1000))` | `mqtt.setKeepAliveInterval((uint16_t)(1));` |
| `adafruit_mqtt_set_will` | Statement | VAR(field_variable), TOPIC(input_value), PAYLOAD(input_value), QOS(dropdown), RETAIN(dropdown) | `adafruit_mqtt_set_will($mqtt, text("value"), text("value"), "0", false)` | `_adafruit_mqtt_mqtt_will_topic = String("value"); ↵ _adafruit_mqtt_mqtt_will_payload = String("value"); ↵ mqtt.will(_adafruit_mqtt_mqtt_will_topic.c_str(), _adafruit_mqtt_mqtt_will_payload.c_str(), 0, false);` |
| `adafruit_mqtt_connect` | Statement | VAR(field_variable), RETRIES(input_value), DELAY(input_value) | `adafruit_mqtt_connect($mqtt, math_number(0), math_number(1000))` | `{ ↵ if (!mqtt.connected()) { ↵ int8_t adafruitMqttResult = 0; ↵ uint8_t adafruitMqttRetries = (uint8_t)(1); ↵ while ((adafruitMqttResult = mqtt.connect()) != 0) { ↵ _adafruit_mqtt_mqtt_last_error = adafruitMqttResult; ↵ Serial.println(mqtt.connectErrorString(adafruitMqttResult)); ↵ mqtt.disconnect(); ↵ if (adafruitMqttRetries == 0) { ↵ break; ↵ } ↵ adafruitMqttRetries--; ↵ if (adafruitMqttRetries == 0) { ↵ break; ↵ } ↵ delay(1); ↵ } ↵ if (adafruitMqttResult == 0) { ↵ _adafruit_mqtt_mqtt_last_error = 0; ↵ } ↵ } ↵ }` |
| `adafruit_mqtt_disconnect` | Statement | VAR(field_variable) | `adafruit_mqtt_disconnect($mqtt)` | `mqtt.disconnect();` |
| `adafruit_mqtt_connected` | Value | VAR(field_variable) | `adafruit_mqtt_connected($mqtt)` | `mqtt.connected()` |
| `adafruit_mqtt_last_error_code` | Value | VAR(field_variable) | `adafruit_mqtt_last_error_code($mqtt)` | `_adafruit_mqtt_mqtt_last_error` |
| `adafruit_mqtt_last_error_text` | Value | VAR(field_variable) | `adafruit_mqtt_last_error_text($mqtt)` | `String(mqtt.connectErrorString(_adafruit_mqtt_mqtt_last_error))` |
| `adafruit_mqtt_ping` | Value | VAR(field_variable), COUNT(input_value) | `adafruit_mqtt_ping($mqtt, math_number(0))` | `mqtt.ping((uint8_t)(1))` |
| `adafruit_mqtt_create_publisher` | Statement | VAR(field_input), MQTT(field_variable), TOPIC(field_input), QOS(dropdown) | `adafruit_mqtt_create_publisher("publisher", $mqtt, "username/feeds/data", "0")` | `Adafruit_MQTT_Publish publisher(&mqtt, "username/feeds/data", 0);` |
| `adafruit_mqtt_publish_text` | Statement | VAR(field_variable), PAYLOAD(input_value), RETAIN(dropdown) | `adafruit_mqtt_publish_text($publisher, text("value"), false)` | `publisher.publish(String("value").c_str(), false);` |
| `adafruit_mqtt_publish_number` | Statement | VAR(field_variable), VALUE(input_value), PRECISION(input_value), RETAIN(dropdown) | `adafruit_mqtt_publish_number($publisher, math_number(0), math_number(0), false)` | `publisher.publish((double)(1), (uint8_t)(1), false);` |
| `adafruit_mqtt_publish_bytes` | Statement | VAR(field_variable), BUFFER(input_value), LENGTH(input_value), RETAIN(dropdown) | `adafruit_mqtt_publish_bytes($publisher, math_number(0), math_number(0), false)` | `publisher.publish((uint8_t *)(1), (uint16_t)(1), false);` |
| `adafruit_mqtt_publish_topic` | Statement | VAR(field_variable), TOPIC(input_value), PAYLOAD(input_value), QOS(dropdown), RETAIN(dropdown) | `adafruit_mqtt_publish_topic($mqtt, text("value"), text("value"), "0", false)` | `mqtt.publish(String("value").c_str(), String("value").c_str(), 0, false);` |
| `adafruit_mqtt_create_subscriber` | Statement | VAR(field_input), MQTT(field_variable), TOPIC(field_input), QOS(dropdown) | `adafruit_mqtt_create_subscriber("subscriber", $mqtt, "username/feeds/control", "0")` | `mqtt.subscribe(&subscriber);` |
| `adafruit_mqtt_subscribe` | Statement | MQTT(field_variable), VAR(field_variable) | `adafruit_mqtt_subscribe($mqtt, $subscriber)` | `mqtt.subscribe(&subscriber);` |
| `adafruit_mqtt_unsubscribe` | Statement | MQTT(field_variable), VAR(field_variable) | `adafruit_mqtt_unsubscribe($mqtt, $subscriber)` | `mqtt.unsubscribe(&subscriber);` |
| `adafruit_mqtt_read_subscription` | Statement | MQTT(field_variable), VAR(field_variable), TIMEOUT(input_value), HANDLER(input_statement) | `adafruit_mqtt_read_subscription($mqtt, $subscriber, math_number(1000))` | `{ ↵ Adafruit_MQTT_Subscribe *adafruitMqttSubscription = NULL; ↵ while ((adafruitMqttSubscription = mqtt.readSubscription(1))) { ↵ if (adafruitMqttSubscription == &subscriber) { ↵ } ↵ } ↵ }` |
| `adafruit_mqtt_on_message` | Hat | MQTT(field_variable), VAR(field_variable), TIMEOUT(input_value), HANDLER(input_statement) | `adafruit_mqtt_on_message($mqtt, $subscriber, math_number(1000))` | `void _adafruit_mqtt_subscriber_callback(char *data, uint16_t len) { ↵ (void)data; ↵ (void)len; ↵ } ↵ subscriber.setCallback(_adafruit_mqtt_subscriber_callback); ↵ mqtt.subscribe(&subscriber); ↵ mqtt.processPackets(1);` |
| `adafruit_mqtt_process_packets` | Statement | VAR(field_variable), TIMEOUT(input_value) | `adafruit_mqtt_process_packets($mqtt, math_number(1000))` | `mqtt.processPackets(1);` |
| `adafruit_mqtt_subscriber_payload` | Value | VAR(field_variable) | `adafruit_mqtt_subscriber_payload($subscriber)` | `String((char *)subscriber.lastread)` |
| `adafruit_mqtt_subscriber_payload_length` | Value | VAR(field_variable) | `adafruit_mqtt_subscriber_payload_length($subscriber)` | `subscriber.datalen` |
| `adafruit_mqtt_subscriber_has_message` | Value | VAR(field_variable) | `adafruit_mqtt_subscriber_has_message($subscriber)` | `subscriber.new_message` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| QOS | 0, 1 | adafruit_mqtt_set_will, adafruit_mqtt_create_publisher, adafruit_mqtt_publish_topic |
| RETAIN | false, true | adafruit_mqtt_set_will, adafruit_mqtt_publish_text, adafruit_mqtt_publish_number |

## ABS Examples

### Basic Usage
```
arduino_setup()
    adafruit_mqtt_create("mqtt", "io.adafruit.com", 1883, "username", "aio_key", "CLIENT_ID")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, adafruit_mqtt_connected($mqtt))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `adafruit_mqtt_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
