# Seeed BGT24LTR11 多普勒雷达

基于Seeed BGT24LTR11芯片的多普勒雷达传感器库，用于检测目标运动状态和速度。

## 库信息

| 字段 | 值 |
|------|------|
| 包名 | @aily-project/lib-seeed-dopplerradar |
| 版本 | 0.0.1 |
| 作者 | SeeedStudio |
| 来源 | https://github.com/Seeed-Studio/Seeed_Arduino_DopplerRadar |
| 许可证 | MIT |

## 支持的开发板

Arduino UNO, Arduino Mega, ESP32, SAMD, RP2040

## 说明

BGT24LTR11是一款24GHz多普勒雷达传感器模块，可检测目标的运动方向（接近/远离）和速度。通过串口（UART）通信，波特率固定为115200。支持目标检测模式和I/Q ADC模式，可配置检测阈值和速度范围。

## 快速开始

1. 将雷达模块的TX连接到开发板的RX引脚（对应所选串口），RX连接到TX引脚
2. 在Blockly中拖入"初始化多普勒雷达"模块，选择串口和模式
3. 使用"目标状态"和"目标速度"模块读取数据
