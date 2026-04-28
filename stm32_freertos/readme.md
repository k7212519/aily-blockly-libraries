# STM32 FreeRTOS

STM32 Arduino 使用的 FreeRTOS Blockly 库，支持任务、队列、信号量、任务通知、中断和运行状态查询。

## 库信息

| 字段 | 值 |
|---|---|
| 包名 | @aily-project/lib-stm32-freertos |
| 版本 | 1.0.0 |
| 作者 | stm32duino |
| 原始库 | https://github.com/stm32duino/STM32FreeRTOS |
| 适配核心 | STMicroelectronics:stm32 |

## 支持板卡

适用于基于 Arduino_Core_STM32 的 STM32 开发板，如 Nucleo、Discovery 和常见 STM32duino 兼容板。

## 功能

提供 FreeRTOS 任务创建与任务函数、毫秒/tick 延时、队列通信、二进制/互斥/计数信号量、任务通知、中断 FromISR 操作，以及 tick、任务数、栈高水位和空闲堆内存查询。

## 快速开始

在 `arduino_setup()` 中创建任务、队列或信号量；用任务函数块编写任务循环。任务创建块会自动在 setup 末尾生成 `vTaskStartScheduler()`。任务中的等待应使用 FreeRTOS 任务延时，不要在 idle loop 中阻塞。
