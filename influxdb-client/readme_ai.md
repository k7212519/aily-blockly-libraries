# InfluxDB Client

InfluxDB 2 measurements, tags, fields, writes, validation, and line protocol.

## Library Info
- **Name**: @aily-project/lib-influxdb-client
- **Version**: 0.1.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `influxdb_init` | Statement | VAR(field_input), URL(input_value), ORG(input_value), BUCKET(input_value), TOKEN(input_value) | `influxdb_init("influx", text("value"), text("value"), text("value"), text("value"))` | `InfluxDBClient influx("value", "value", "value", "value");` |
| `influxdb_point_init` | Statement | VAR(field_input), MEASUREMENT(input_value) | `influxdb_point_init("sensorPoint", text("value"))` | `Point sensorPoint("value");` |
| `influxdb_point_add` | Statement | VAR(field_variable), KIND(dropdown), KEY(input_value), VALUE(input_value) | `influxdb_point_add($sensorPoint, addTag, text("value"), math_number(0))` | `sensorPoint.addTag("value", 1);` |
| `influxdb_point_clear` | Statement | VAR(field_variable), KIND(dropdown) | `influxdb_point_clear($sensorPoint, clearFields)` | `sensorPoint.clearFields();` |
| `influxdb_write` | Value | CLIENT(field_variable), POINT(field_variable) | `influxdb_write($influx, $sensorPoint)` | `influx.writePoint(sensorPoint)` |
| `influxdb_validate` | Value | VAR(field_variable) | `influxdb_validate($influx)` | `influx.validateConnection()` |
| `influxdb_info` | Value | VAR(field_variable), INFO(dropdown) | `influxdb_info($influx, getLastErrorMessage)` | `influx.getLastErrorMessage()` |
| `influxdb_line_protocol` | Value | CLIENT(field_variable), POINT(field_variable) | `influxdb_line_protocol($influx, $sensorPoint)` | `influx.pointToLineProtocol(sensorPoint)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| KIND | addTag, addField | influxdb_point_add |
| KIND | clearFields, clearTags | influxdb_point_clear |
| INFO | getLastErrorMessage, getServerUrl | influxdb_info |

## ABS Examples

### Basic Usage
```
arduino_setup()
    influxdb_init("influx", text("value"), text("value"), text("value"), text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, influxdb_write($influx, $sensorPoint))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `influxdb_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
