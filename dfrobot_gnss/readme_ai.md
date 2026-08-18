# GNSS北斗定位模块

DFRobot Gravity GNSS北斗定位模块，支持GPS/北斗/GLONASS多卫星系统定位。

## Library Info
- **名称**: @aily-project/lib-dfrobot-gnss
- **版本**: 0.0.1

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|--------|------|-----------------|---------|----------|
| `gnss_i2c_init` | 语句块 | (none) | `gnss_i2c_init()` | `DFRobot_GNSS_I2C gnss(&Wire, GNSS_DEVICE_ADDR); ↵ while(!gnss.begin()) { ↵ Serial.println("NO Devices!"); ↵ delay(1000); ↵ } ↵ gnss.enablePower(); ↵ gnss.setGnss(eGPS_BeiDou_GLONASS); ↵ gnss.setRgbOn();` |
| `gnss_hs_init` | 语句块 | HS(dropdown), RX(dropdown), TX(dropdown) | `gnss_hs_init(Serial1, 0, 1)` | `DFRobot_GNSS_UART gnss(&Serial1, 9600, RX, TX); ↵ gnss.begin();` |
| `gnss_ss_init` | 语句块 | SS(dropdown), RX(dropdown), TX(dropdown) | `gnss_ss_init(SoftwareSerial, 0, 1)` | `SoftwareSerial mySerial(RX, TX); ↵ DFRobot_GNSS_UART gnss(&mySerial, 9600); ↵ gnss.begin();` |
| `gnss_read_data` | 语句块 | (none) | `gnss_read_data()` | `sTim_t utc = gnss.getUTC(); ↵ sTim_t date = gnss.getDate(); ↵ sLonLat_t lat = gnss.getLat(); ↵ sLonLat_t lon = gnss.getLon(); ↵ double high = gnss.getAlt(); ↵ uint8_t starUserd = gnss.getNumSatUsed(); ↵ double sog = gnss.getSog(); ↵ double cog = gnss.getCog();` |
| `gnss_get_utc_date` | 值块 | DATE(dropdown) | `gnss_get_utc_date(YMD)` | `(String(date.year)+"/"+String(date.month)+"/"+String(date.date))` |
| `gnss_get_utc_time` | 值块 | TIME(dropdown) | `gnss_get_utc_time(HMS)` | `(String(utc.hour)+":"+String(utc.minute)+":"+String(utc.second))` |
| `gnss_get_location` | 值块 | DATA(dropdown) | `gnss_get_location(LAT)` | `String(lat.latitudeDegree)` |

## Parameter Options

| 参数 | 可选值 | 说明 |
|------|--------|------|
| HS | Serial1, Serial2 | 硬串口选择 |
| SS | SoftwareSerial | 软串口 |
| DATE | YMD, YEAR, MONTH, DAY | UTC日期格式 |
| TIME | HMS, HOUR, MINUTE, SECOND | UTC时间格式 |
| DATA | LAT, LAT_DIR, LON, LON_DIR, ALT, SAT_NUM, SOG, COG | 定位数据类型 |

## ABS Examples

### 基本用法
```
arduino_setup()
    gnss_i2c_init()
    serial_begin(Serial, 115200)

arduino_loop()
    gnss_read_data()
    serial_println(Serial, gnss_get_location(LAT))
    serial_println(Serial, gnss_get_location(LON))
    time_delay(math_number(1000))
```

### 硬串口模式
```
arduino_setup()
    gnss_hs_init(Serial1, 0, 1)
    serial_begin(Serial, 115200)

arduino_loop()
    gnss_read_data()
    serial_println(Serial, gnss_get_utc_date(YMD))
    serial_println(Serial, gnss_get_utc_time(HMS))
    time_delay(math_number(1000))
```

## 注意事项

1. **初始化**: 在 `arduino_setup()` 内调用初始化块
2. **数据读取**: 必须先调用 `gnss_read_data()` 再获取数据
3. **串口模式**: I2C模式地址固定为0x20，串口波特率固定为9600
4. **卫星系统**: 默认启用GPS+北斗+GLONASS
