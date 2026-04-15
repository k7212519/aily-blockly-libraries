# nRF54 Low Power Management Library

低功耗管理库，适用于 XIAO nRF54L15 开发板。

## 功能概述

基于 nRF54L15 芯片的低功耗特性，提供以下 Blockly 积木块：

### 电源配置
| 积木块 | 说明 |
|--------|------|
| 初始化低功耗模式 | 设置 CPU 频率 (64/128 MHz) 和功耗延迟模式 |
| 进入最低功耗板级状态 | 关闭板级供电轨，用于进入 System OFF 前 |
| 设置CPU频率 | 运行时动态切换 CPU 频率 |

### 休眠模式
| 积木块 | 说明 | 典型功耗 |
|--------|------|----------|
| WFI 空闲等待 | CPU 空闲直到中断唤醒 (System ON) | ~20-50 µA |
| 低功耗WFI休眠 | 基于 WFI 循环的低功耗延时 | ~20-50 µA |
| 定时 System OFF | 最深休眠，定时冷启动唤醒 | ~1 µA |
| System OFF 按钮唤醒 | 最深休眠，按钮唤醒 | ~1 µA |
| 进入 System OFF | 最深休眠，需预配置唤醒源 | ~1 µA |

### LPCOMP 低功耗比较器
| 积木块 | 说明 |
|--------|------|
| 初始化LPCOMP | 配置模拟引脚电压阈值监测 |
| LPCOMP 检测到上升越限？ | 轮询电压上升越限事件 |
| LPCOMP 当前高于阈值？ | 即时采样比较结果 |
| 清除 LPCOMP 事件 | 清除事件标志防止误触发 |

### 看门狗
| 积木块 | 说明 |
|--------|------|
| 初始化看门狗 | 配置超时和休眠暂停选项 |
| 喂看门狗 | 重置定时器防止复位 |

### 唤醒与复位
| 积木块 | 说明 |
|--------|------|
| 唤醒来源是…？ | 判断 GPIO/GRTC/LPCOMP/看门狗唤醒 |
| 复位原因值 | 读取复位原因寄存器 |
| 清除复位原因 | 清除复位原因避免误判 |
| 写/读保持寄存器 | GPREGRET 寄存器在 System OFF 期间保持 |

## 使用示例

### 定时低功耗闪烁 (最低功耗)

```
setup:
  进入最低功耗板级状态

loop:
  digitalWrite(LED, LOW)    // LED 亮
  delay(80)
  digitalWrite(LED, HIGH)   // LED 灭
  定时 System OFF 休眠 920 毫秒
```

### 按钮唤醒

```
setup:
  初始化低功耗模式 CPU 64MHz 低功耗
  如果 唤醒来源是 GPIO ？
    串口打印 "从按钮唤醒"
  清除复位原因
  延时 5000
  System OFF 按钮唤醒
```

### LPCOMP 模拟唤醒

```
setup:
  初始化LPCOMP A0 VDD=3300mV 阈值=200mV 迟滞=开启 检测=上升沿
  清除 LPCOMP 事件
  进入 System OFF 不保留RAM

-- 当 A0 电压超过 200mV 时自动唤醒 --
```

## 参考

- [nRF54L15 数据手册](https://docs.nordicsemi.com/bundle/ps_nrf54L15)
- [Nrf54L15-Clean-Implementation](https://github.com/xiao-nrf54l15/Nrf54L15-Clean-Implementation)

## 兼容性

- 开发板: XIAO nRF54L15 (nrf54l15clean:nrf54l15clean)
- 电压: 3.3V
