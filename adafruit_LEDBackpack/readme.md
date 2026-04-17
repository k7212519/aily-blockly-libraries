# Adafruit LED Backpack

基于HT16K33芯片的多种LED显示模块（I2C接口）的Blockly积木库。支持4位7段数码管、4位14段字符数码管、8x8/8x16点阵、双色点阵和24段条形图。

## 库信息

| 字段 | 值 |
|------|-----|
| Package | @aily-project/lib-adafruit-ledbackpack |
| Version | 1.5.1 |
| Author | Adafruit |
| Source | https://github.com/adafruit/Adafruit_LED_Backpack |
| License | MIT / BSD |

## 支持的开发板

Arduino UNO, Mega, Leonardo, ESP32, ESP8266, SAMD 等支持I2C的开发板。依赖 `Adafruit GFX Library` 与 `Adafruit BusIO`。

## 说明

通过I2C与HT16K33驱动芯片通信，选择不同的显示类型（7段/14段/点阵/条形图）后即可使用统一的亮度、闪烁控制，以及每种显示特有的打印/绘图积木。

## 快速开始

1. 将模块的 SDA/SCL 连接到开发板的 I2C 引脚（地址默认 0x70）
2. 使用"初始化LED Backpack"积木选择显示类型
3. 调用对应显示类型的绘制/打印积木，必要时使用"刷新显示缓冲"
