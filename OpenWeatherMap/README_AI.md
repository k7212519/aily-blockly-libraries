# Meteorological data

Access the OpenWeatherMap API for weather data, supporting current weather, 5-day forecasts, air quality and geocoding

## Library Info
- **Name**: @aily-project/lib-openweathermap
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `owm_init` | Statement | VAR(field_input), API_KEY(input_value) | `owm_init("weather", text("value"))` | `weather.begin("value");` |
| `owm_set_units` | Statement | VAR(field_variable), UNITS(dropdown) | `owm_set_units($weather, OWM_UNITS_METRIC)` | `weather.setUnits(OWM_UNITS_METRIC);` |
| `owm_set_language` | Statement | VAR(field_variable), LANG(dropdown) | `owm_set_language($weather, zh_cn)` | `weather.setLanguage("zh_cn");` |
| `owm_set_debug` | Statement | VAR(field_variable), DEBUG(dropdown) | `owm_set_debug($weather, true)` | `weather.setDebug(true);` |
| `owm_get_weather_by_city` | Statement | VAR(field_variable), CITY(input_value), COUNTRY(input_value) | `owm_get_weather_by_city($weather, text("value"), text("value"))` | `_owm_result_weather = weather.getCurrentWeatherByCity("value", "value", &_owm_weather_weather);` |
| `owm_get_weather_by_coords` | Statement | VAR(field_variable), LAT(input_value), LON(input_value) | `owm_get_weather_by_coords($weather, math_number(0), math_number(0))` | `_owm_result_weather = weather.getCurrentWeather(1, 1, &_owm_weather_weather);` |
| `owm_request_success` | Value | VAR(field_variable) | `owm_request_success($weather)` | `_owm_result_weather` |
| `owm_weather_data` | Value | VAR(field_variable), DATA(dropdown) | `owm_weather_data($weather, name)` | `_owm_weather_weather.name` |
| `owm_get_forecast` | Statement | VAR(field_variable), LAT(input_value), LON(input_value), COUNT(input_value) | `owm_get_forecast($weather, math_number(0), math_number(0), math_number(0))` | `_owm_forecast_result_weather = weather.getForecast(1, 1, &_owm_forecast_weather, 1);` |
| `owm_get_forecast_by_city` | Statement | VAR(field_variable), CITY(input_value), COUNTRY(input_value), COUNT(input_value) | `owm_get_forecast_by_city($weather, text("value"), text("value"), math_number(0))` | `_owm_forecast_result_weather = weather.getForecastByCity("value", "value", &_owm_forecast_weather, 1);` |
| `owm_forecast_request_success` | Value | VAR(field_variable) | `owm_forecast_request_success($weather)` | `_owm_forecast_result_weather` |
| `owm_forecast_count` | Value | VAR(field_variable) | `owm_forecast_count($weather)` | `_owm_forecast_weather.cnt` |
| `owm_forecast_data` | Value | VAR(field_variable), INDEX(input_value), DATA(dropdown) | `owm_forecast_data($weather, math_number(0), dt_txt)` | `_owm_forecast_weather.items[1].dt_txt` |
| `owm_get_air_pollution` | Statement | VAR(field_variable), LAT(input_value), LON(input_value) | `owm_get_air_pollution($weather, math_number(0), math_number(0))` | `_owm_air_result_weather = weather.getAirPollution(1, 1, &_owm_air_weather);` |
| `owm_air_pollution_request_success` | Value | VAR(field_variable) | `owm_air_pollution_request_success($weather)` | `_owm_air_result_weather` |
| `owm_air_pollution_data` | Value | VAR(field_variable), DATA(dropdown) | `owm_air_pollution_data($weather, aqi)` | `_owm_air_weather.aqi` |
| `owm_aqi_description` | Value | AQI(input_value) | `owm_aqi_description(math_number(0))` | `OpenWeatherMap::getAQIDescription(1)` |
| `owm_get_coords_by_city` | Statement | VAR(field_variable), CITY(input_value), COUNTRY(input_value) | `owm_get_coords_by_city($weather, text("value"), text("value"))` | `_owm_geo_result_weather = (weather.getCoordinatesByName("value", "value", NULL, &_owm_geo_weather, 1) > 0);` |
| `owm_get_coords_by_zip` | Statement | VAR(field_variable), ZIP(input_value), COUNTRY(input_value) | `owm_get_coords_by_zip($weather, text("value"), text("value"))` | `_owm_geo_result_weather = weather.getCoordinatesByZip("value", "value", &_owm_geo_weather);` |
| `owm_get_location_by_coords` | Statement | VAR(field_variable), LAT(input_value), LON(input_value) | `owm_get_location_by_coords($weather, math_number(0), math_number(0))` | `_owm_geo_result_weather = (weather.getLocationByCoordinates(1, 1, &_owm_geo_weather, 1) > 0);` |
| `owm_geo_request_success` | Value | VAR(field_variable) | `owm_geo_request_success($weather)` | `_owm_geo_result_weather` |
| `owm_geo_data` | Value | VAR(field_variable), DATA(dropdown) | `owm_geo_data($weather, name)` | `_owm_geo_weather.name` |
| `owm_get_icon_url` | Value | VAR(field_variable), ICON(input_value) | `owm_get_icon_url($weather, text("value"))` | `weather.getIconURL("value", _owm_icon_url_buffer, 64)` |
| `owm_get_last_error` | Value | VAR(field_variable) | `owm_get_last_error($weather)` | `weather.getLastError()` |
| `owm_get_http_code` | Value | VAR(field_variable) | `owm_get_http_code($weather)` | `weather.getLastHttpCode()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| UNITS | OWM_UNITS_METRIC, OWM_UNITS_IMPERIAL, OWM_UNITS_STANDARD | owm_set_units |
| LANG | zh_cn, en, ja, kr, de, fr, es, ru | owm_set_language |
| DEBUG | true, false | owm_set_debug |
| DATA | name, country, weather_main, weather_description, weather_icon, temp, feels_like, temp_min, temp_max, humidity, pressure, wind_speed, wind_deg, clouds, visibility, sunrise, sunset | owm_weather_data |
| DATA | dt_txt, weather_main, weather_description, temp, feels_like, temp_min, temp_max, humidity, pressure, wind_speed, clouds, pop, rain_3h, snow_3h | owm_forecast_data |
| DATA | aqi, co, no, no2, o3, so2, pm2_5, pm10, nh3 | owm_air_pollution_data |
| DATA | name, country, state, lat, lon | owm_geo_data |

## ABS Examples

### Basic Usage
```
arduino_setup()
    owm_init("weather", text("value"))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, owm_request_success($weather))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `owm_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
