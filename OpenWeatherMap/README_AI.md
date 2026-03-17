# OpenWeatherMap

访问 OpenWeatherMap API 获取天气数据，支持当前天气、5天预报、空气质量和地理编码。

## Library Info
- **Name**: @aily-project/lib-openweathermap
- **Version**: 1.0.0

## Block Definitions

### Initialization & Configuration

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `owm_init` | Statement | VAR(field_input), API_KEY(input_value) | `owm_init("weather", text("your-api-key"))` | `weather.begin(apiKey);` |
| `owm_set_units` | Statement | VAR(field_variable), UNITS(dropdown) | `owm_set_units($weather, OWM_UNITS_METRIC)` | `weather.setUnits(OWM_UNITS_METRIC);` |
| `owm_set_language` | Statement | VAR(field_variable), LANG(dropdown) | `owm_set_language($weather, zh_cn)` | `weather.setLanguage("zh_cn");` |
| `owm_set_debug` | Statement | VAR(field_variable), DEBUG(dropdown) | `owm_set_debug($weather, true)` | `weather.setDebug(true);` |

### Current Weather

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `owm_get_weather_by_city` | Statement | VAR(field_variable), CITY(input_value), COUNTRY(input_value) | `owm_get_weather_by_city($weather, text("Shanghai"), text("CN"))` | `result = weather.getCurrentWeatherByCity(...);` |
| `owm_get_weather_by_coords` | Statement | VAR(field_variable), LAT(input_value), LON(input_value) | `owm_get_weather_by_coords($weather, math_number(31.23), math_number(121.47))` | `result = weather.getCurrentWeather(...);` |
| `owm_request_success` | Value(Boolean) | VAR(field_variable) | `owm_request_success($weather)` | `_owm_result_weather` |
| `owm_weather_data` | Value | VAR(field_variable), DATA(dropdown) | `owm_weather_data($weather, temp)` | `_owm_weather_weather.main.temp` |

### Forecast

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `owm_get_forecast` | Statement | VAR(field_variable), LAT(input_value), LON(input_value), COUNT(input_value) | `owm_get_forecast($weather, math_number(31.23), math_number(121.47), math_number(8))` | `result = weather.getForecast(...);` |
| `owm_get_forecast_by_city` | Statement | VAR(field_variable), CITY(input_value), COUNTRY(input_value), COUNT(input_value) | `owm_get_forecast_by_city($weather, text("Shanghai"), text("CN"), math_number(8))` | `result = weather.getForecastByCity(...);` |
| `owm_forecast_request_success` | Value(Boolean) | VAR(field_variable) | `owm_forecast_request_success($weather)` | `_owm_forecast_result_weather` |
| `owm_forecast_count` | Value(Number) | VAR(field_variable) | `owm_forecast_count($weather)` | `_owm_forecast_weather.cnt` |
| `owm_forecast_data` | Value | VAR(field_variable), INDEX(input_value), DATA(dropdown) | `owm_forecast_data($weather, math_number(0), temp)` | `_owm_forecast_weather.items[0].main.temp` |

### Air Pollution

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `owm_get_air_pollution` | Statement | VAR(field_variable), LAT(input_value), LON(input_value) | `owm_get_air_pollution($weather, math_number(31.23), math_number(121.47))` | `result = weather.getAirPollution(...);` |
| `owm_air_pollution_request_success` | Value(Boolean) | VAR(field_variable) | `owm_air_pollution_request_success($weather)` | `_owm_air_result_weather` |
| `owm_air_pollution_data` | Value(Number) | VAR(field_variable), DATA(dropdown) | `owm_air_pollution_data($weather, aqi)` | `_owm_air_weather.aqi` |
| `owm_aqi_description` | Value(String) | AQI(input_value) | `owm_aqi_description(math_number(3))` | `OpenWeatherMap::getAQIDescription(3)` |

### Geocoding

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `owm_get_coords_by_city` | Statement | VAR(field_variable), CITY(input_value), COUNTRY(input_value) | `owm_get_coords_by_city($weather, text("Shanghai"), text("CN"))` | `result = (weather.getCoordinatesByName(...) > 0);` |
| `owm_get_coords_by_zip` | Statement | VAR(field_variable), ZIP(input_value), COUNTRY(input_value) | `owm_get_coords_by_zip($weather, text("200000"), text("CN"))` | `result = weather.getCoordinatesByZip(...);` |
| `owm_get_location_by_coords` | Statement | VAR(field_variable), LAT(input_value), LON(input_value) | `owm_get_location_by_coords($weather, math_number(31.23), math_number(121.47))` | `result = (weather.getLocationByCoordinates(...) > 0);` |
| `owm_geo_request_success` | Value(Boolean) | VAR(field_variable) | `owm_geo_request_success($weather)` | `_owm_geo_result_weather` |
| `owm_geo_data` | Value | VAR(field_variable), DATA(dropdown) | `owm_geo_data($weather, name)` | `_owm_geo_weather.name` |

### Utilities

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `owm_get_icon_url` | Value(String) | ICON(input_value) | `owm_get_icon_url(text("01d"))` | `weather.getIconURL("01d", buf, 64)` |
| `owm_get_last_error` | Value(String) | VAR(field_variable) | `owm_get_last_error($weather)` | `weather.getLastError()` |
| `owm_get_http_code` | Value(Number) | VAR(field_variable) | `owm_get_http_code($weather)` | `weather.getLastHttpCode()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| UNITS | OWM_UNITS_METRIC, OWM_UNITS_IMPERIAL, OWM_UNITS_STANDARD | Unit system (Celsius/Fahrenheit/Kelvin) |
| LANG | zh_cn, en, ja, kr, de, fr, es, ru | Language for weather description |
| DEBUG | true, false | Debug output toggle |
| Weather DATA | name, country, weather_main, weather_description, weather_icon, temp, feels_like, temp_min, temp_max, humidity, pressure, wind_speed, wind_deg, clouds, visibility, sunrise, sunset | Current weather data fields |
| Forecast DATA | dt_txt, weather_main, weather_description, temp, feels_like, temp_min, temp_max, humidity, pressure, wind_speed, clouds, pop, rain_3h, snow_3h | Forecast data fields |
| Air DATA | aqi, co, no, no2, o3, so2, pm2_5, pm10, nh3 | Air pollution data fields |
| Geo DATA | name, country, state, lat, lon | Geocoding data fields |

## ABS Examples

### Get Current Weather by City
```
arduino_setup()
    serial_begin(Serial, 115200)
    esp32_wifi_begin(text("YourSSID"), text("YourPass"))
    owm_init("weather", text("your-api-key"))
    owm_set_units($weather, OWM_UNITS_METRIC)
    owm_set_language($weather, zh_cn)

arduino_loop()
    owm_get_weather_by_city($weather, text("Shanghai"), text("CN"))
    controls_if()
        @IF0: owm_request_success($weather)
        @DO0:
            serial_print(Serial, text("Temperature: "))
            serial_println(Serial, owm_weather_data($weather, temp))
            serial_print(Serial, text("Humidity: "))
            serial_println(Serial, owm_weather_data($weather, humidity))
            serial_print(Serial, text("Weather: "))
            serial_println(Serial, owm_weather_data($weather, weather_description))
    time_delay(math_number(60000))
```

### Get Forecast and Air Quality
```
arduino_setup()
    serial_begin(Serial, 115200)
    esp32_wifi_begin(text("YourSSID"), text("YourPass"))
    owm_init("weather", text("your-api-key"))
    owm_set_units($weather, OWM_UNITS_METRIC)

arduino_loop()
    owm_get_forecast($weather, math_number(31.23), math_number(121.47), math_number(5))
    controls_if()
        @IF0: owm_forecast_request_success($weather)
        @DO0:
            controls_for($i, math_number(0), owm_forecast_count($weather), math_number(1))
                serial_print(Serial, owm_forecast_data($weather, variables_get($i), dt_txt))
                serial_print(Serial, text(" "))
                serial_println(Serial, owm_forecast_data($weather, variables_get($i), temp))
    owm_get_air_pollution($weather, math_number(31.23), math_number(121.47))
    controls_if()
        @IF0: owm_air_pollution_request_success($weather)
        @DO0:
            serial_print(Serial, text("AQI: "))
            serial_println(Serial, owm_air_pollution_data($weather, aqi))
            serial_println(Serial, owm_aqi_description(owm_air_pollution_data($weather, aqi)))
    time_delay(math_number(300000))
```

## Notes

1. **Prerequisites**: WiFi must be connected before using this library. A valid OpenWeatherMap API key is required.
2. **Initialization**: `owm_init` must be called in `arduino_setup()` before any other blocks.
3. **Variable**: `owm_init("weather", ...)` creates variable `$weather`; reference it later with `$weather`.
4. **Request flow**: Always call a request block first, then check success with the corresponding `*_request_success` block before reading data.
5. **Rate limiting**: Free API keys have limited requests. Use appropriate delays (e.g. 60s+) between requests.
6. **Forecast index**: Forecast data indices start from 0. Each point represents a 3-hour interval, max 40 points (5 days).
