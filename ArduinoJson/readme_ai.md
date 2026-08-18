# ArduinoJson

ArduinoJson library, supports the parsing and generation of JSON data

## Library Info
- **Name**: @aily-project/lib-arduinojson
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `json_document_init` | Statement | NAME(field_input) | `json_document_init("doc")` | `JsonDocument doc;` |
| `json_document_add_value` | Statement | VAR(field_variable), KEY(field_input), VALUE(input_value) | `json_document_add_value($doc, "key", text("value"))` | `doc["key"] = "value";` |
| `json_document_add_array` | Statement | VAR(field_variable), ARRAY_NAME(field_input) | `json_document_add_array($doc, "array")` | `JsonArray array = doc["array"].to<JsonArray>();` |
| `json_document_add_array_value` | Statement | VAR(field_variable), VALUE(input_value) | `json_document_add_array_value($array, text("value"))` | `array.add("value");` |
| `json_document_get_value` | Value | VAR(field_variable), KEY(field_input) | `json_document_get_value($doc, "key")` | `doc["key"]` |
| `json_document_get_value_type` | Value | VAR(field_variable), KEY(field_input), TYPE(dropdown) | `json_document_get_value_type($doc, "key", bool)` | `doc["key"].as<bool>()` |
| `json_document_get_array` | Value | VAR(field_variable), ARRAY_NAME(field_input), INDEX(input_value) | `json_document_get_array($doc, "array", math_number(0))` | `doc["array"][1]` |
| `json_document_serialize_to_somewhere` | Statement | VAR(field_variable), OUTPUT(input_value) | `json_document_serialize_to_somewhere($doc, math_number(0))` | `serializeJson(doc, 1);` |
| `json_document_deserialize_from_somewhere` | Statement | VAR(field_input), INPUT(input_value) | `json_document_deserialize_from_somewhere("doc", math_number(0))` | `JsonDocument doc; ↵ DeserializationError error = deserializeJson(doc, 1); ↵ if (error) { ↵ Serial.print(F("deserializeJson() failed: ")); ↵ Serial.println(error.f_str()); ↵ return; ↵ }` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | bool, int, unsigned int, long, unsigned long, float, double, const char*, String, JsonArrayConst, JsonObjectConst | json_document_get_value_type |

## ABS Examples

### Basic Usage
```
arduino_setup()
    json_document_init("doc")
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, json_document_get_value($doc, "key"))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `json_document_deserialize_from_somewhere("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
