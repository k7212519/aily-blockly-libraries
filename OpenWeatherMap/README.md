# OpenWeatherMap

访问 OpenWeatherMap API 获取天气数据，支持当前天气、5天预报、空气质量和地理编码。

## Library Info

| Field | Value |
|-------|-------|
| Package | @aily-project/lib-openweathermap |
| Version | 1.0.0 |
| Author | 奈何col |
| Source | https://openweathermap.org/api |
| License | MIT |

## Supported Boards

ESP32, ESP32-S2, ESP32-S3, ESP32-C3, ESP32-C6, Arduino UNO R4 WiFi

## Description

OpenWeatherMap 库封装了 OpenWeatherMap API，支持通过城市名称或地理坐标获取当前天气、5天/3小时天气预报、空气质量指数以及地理编码（正向与反向）。需要有效的 API 密钥和 WiFi 连接。

## Quick Start

1. 在 openweathermap.org 注册并获取免费 API 密钥
2. 确保设备已连接 WiFi
3. 使用初始化块设置 API 密钥，然后调用天气请求块获取数据
`aqi`, `co`, `no`, `no2`, `o3`, `so2`, `pm2_5`, `pm10`, `nh3`

### 位置DATA选项
`name`, `country`, `state`, `lat`, `lon`

## 使用示例

### 初始化配置
```json
{
  "type": "owm_init",
  "id": "init_id",
  "fields": {"VAR": "weather"},
  "inputs": {
    "API_KEY": {
      "shadow": {"type": "text", "id": "api_shadow", "fields": {"TEXT": "your-api-key"}}
    }
  },
  "next": {
    "block": {
      "type": "owm_set_units",
      "id": "units_id",
      "fields": {"VAR": {"id": "weather_var_id"}, "UNITS": "OWM_UNITS_METRIC"}
    }
  }
}
```

### 请求天气并判断成功
```json
{
  "type": "owm_get_weather_by_city",
  "id": "get_id",
  "fields": {"VAR": {"id": "weather_var_id"}},
  "inputs": {
    "CITY": {"shadow": {"type": "text", "id": "city_id", "fields": {"TEXT": "Shanghai"}}},
    "COUNTRY": {"shadow": {"type": "text", "id": "country_id", "fields": {"TEXT": "CN"}}}
  },
  "next": {
    "block": {
      "type": "controls_if",
      "id": "if_id",
      "inputs": {
        "IF0": {
          "block": {
            "type": "owm_request_success",
            "id": "success_id",
            "fields": {"VAR": {"id": "weather_var_id"}}
          }
        },
        "DO0": {
          "block": {
            "type": "serial_println",
            "id": "print_id",
            "inputs": {
              "VAR": {
                "block": {
                  "type": "owm_weather_data",
                  "id": "data_id",
                  "fields": {"VAR": {"id": "weather_var_id"}, "DATA": "temp"}
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## 重要规则

1. **必须先初始化**: 使用`owm_init`初始化后才能调用其他方法
2. **需要WiFi连接**: 调用API前必须确保WiFi已连接
3. **API密钥**: 需要在 https://openweathermap.org/api 获取免费API密钥
4. **变量引用**: 初始化块使用`field_input`(字符串)，其他块使用`field_variable`(对象)
5. **先请求再读取**: 必须先调用请求块，再用`xxx_request_success`判断成功后，才能读取数据
6. **每类数据独立判断**: 天气/预报/空气质量/地理编码各有独立的请求成功判断块

## 支持的板卡

- ESP32系列 (ESP32, ESP32-S2, ESP32-S3, ESP32-C3, ESP32-C6)
- Arduino UNO R4 WiFi
