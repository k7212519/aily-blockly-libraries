# TinyGPS++ GPS定位模块

基于TinyGPS++库的GPS定位模块Blockly控制库，用于解析NMEA协议获取定位信息。

## 库信息

| 字段 | 值 |
|------|-----|
| 包名 | @aily-project/lib-tiny-gps-plus |
| 版本 | 0.0.1 |
| 作者 | ailyProject |
| 原始库 | https://github.com/mikalhart/TinyGPSPlus |
| 许可证 | LGPL-2.1 |

## 支持的开发板

所有Arduino兼容开发板（Arduino UNO、Mega、ESP32、ESP8266等）

## 说明

TinyGPS++是一个小巧高效的GPS NMEA协议解析库，通过串口与GPS模块通信，可获取经纬度、日期时间、速度、海拔、航向、卫星数等信息。还支持两点间距离和航向的计算。

## 快速入门

1. 将GPS模块的TX引脚连接到开发板的串口RX引脚
2. 在setup中使用"初始化GPS模块"积木块，选择对应串口和波特率（通常9600）
3. 在loop中放置"读取GPS数据"积木块
4. 使用各种数据读取积木块获取位置、时间等信息
