# Arduino R4 FreeRTOS

Arduino UNO R4 使用的 FreeRTOS Blockly 库，支持任务、队列、二进制/计数信号量、任务通知、中断和基础运行状态查询。

## 库信息

| 字段 | 值 |
|---|---|
| 包名 | @aily-project/lib-arduino-freertos |
| 版本 | 1.0.0 |
| 作者 | Arduino |
| 原始库 | Arduino_FreeRTOS |
| 适配核心 | renesas_uno:minima, renesas_uno:unor4wifi |

## 块定义

| 块类型 | 连接 | 字段/输入 | .abi格式 | 生成代码 |
|---|---|---|---|---|
| `r4_freertos_task_create` | 语句 | 任务名、栈深度、优先级 | `r4_freertos_task_create("TaskBlink", 128, 1)` | `xTaskCreate(...)` |
| `r4_freertos_task_function` | 帽子 | 任务变量、任务代码 | `r4_freertos_task_function($TaskBlink)` | `void TaskBlink(...)` |
| `r4_freertos_queue_create/send/receive_do` | 语句 | 队列、类型、等待时间 | 见 readme_ai.md | `xQueueCreate/Send/Receive` |
| `r4_freertos_semaphore_create/take/give` | 语句/值 | 信号量、等待时间 | 见 readme_ai.md | `xSemaphore...` |
| `r4_freertos_attach_interrupt` | 帽子 | 引脚、触发方式、中断代码 | 见 readme_ai.md | `attachInterrupt(...)` |
| `r4_freertos_get_*` | 值 | 可选任务变量 | 见 readme_ai.md | `xTaskGetTickCount()` 等 |

## 字段类型映射

初始化块使用 `field_input` 创建 Blockly 变量；任务、队列、信号量操作块使用 `field_variable` 选择已创建对象；毫秒、tick 和数据值使用 `input_value` 并在 toolbox 中提供影子块。

## 连接规则

任务函数和中断配置是帽子块，不接入普通流程；创建、延时、发送、释放等为语句块；等待通知、获取信号量和系统状态为值块。

## 使用示例

```text
arduino_setup()
    r4_freertos_task_create("TaskBlink", 128, 1)

r4_freertos_task_function(variables_get($TaskBlink))
    io_digitalwrite(...)
    r4_freertos_task_delay_ms(math_number(1000))
```

## 重要规则

任务创建会自动在 setup 末尾生成 `vTaskStartScheduler()`；调度器启动后普通 `loop()` 不再按传统 Arduino 流程运行。R4 默认未启用 FreeRTOS mutex、栈高水位和 idle task handle API，所以本库不提供这些块。
