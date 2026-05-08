# ESP32 FreeRTOS

ESP32 Arduino 使用的 FreeRTOS Blockly 库，支持任务、核心亲和性、队列、二进制/互斥/计数信号量、任务通知、中断和运行状态查询。

## 库信息

| 字段 | 值 |
|---|---|
| 包名 | @aily-project/lib-esp32-freertos |
| 版本 | 1.0.0 |
| 作者 | Espressif |
| 原始库 | ESP32 Arduino Core 内置 FreeRTOS |
| 适配核心 | esp32:esp32, esp32:esp32s2, esp32:esp32s3, esp32:esp32c3, esp32:esp32c6, esp32:esp32h2 |

## 块定义

| 块类型 | 连接 | 字段/输入 | .abi格式 | 生成代码 |
|---|---|---|---|---|
| `esp32_freertos_task_create` | 语句 | VAR, STACK_SIZE, PRIORITY, CORE | `esp32_freertos_task_create("TaskBlink",4096,1,AUTO)` | `xTaskCreate(...)` 或 `xTaskCreatePinnedToCore(...)` |
| `esp32_freertos_task_function` | 帽子 | VAR, TASK_CODE | `esp32_freertos_task_function($TaskBlink)` | `void TaskBlink(void *pvParameters)` |
| `esp32_freertos_task_delay_ms/ticks` | 语句 | MS 或 TICKS | `esp32_freertos_task_delay_ms(math_number(1000))` | `vTaskDelay(...)` |
| `esp32_freertos_task_suspend/resume/delete` | 语句 | VAR | `esp32_freertos_task_suspend($TaskBlink)` | `vTaskSuspend/Resume/Delete(handle)` |
| `esp32_freertos_task_notify/_from_isr` | 语句 | VAR | `esp32_freertos_task_notify($TaskBlink)` | `xTaskNotifyGive(...)` |
| `esp32_freertos_task_wait_notification` | 值 | WAIT_MODE, WAIT_MS | `esp32_freertos_task_wait_notification(MS,math_number(1000))` | `ulTaskNotifyTake(...) > 0` |
| `esp32_freertos_queue_create` | 语句 | VAR, QUEUE_LENGTH, DATA_TYPE | `esp32_freertos_queue_create("sensorQueue",10,int)` | `xQueueCreate(...)` |
| `esp32_freertos_queue_send/receive_do` | 语句 | VAR, DATA_TYPE, WAIT_MODE, WAIT_MS | `esp32_freertos_queue_send($sensorQueue,...)` | `xQueueSend/Receive(...)` |
| `esp32_freertos_queue_messages_waiting` | 值 | VAR | `esp32_freertos_queue_messages_waiting($sensorQueue)` | `uxQueueMessagesWaiting(queue)` |
| `esp32_freertos_semaphore_create` | 语句 | VAR, SEMAPHORE_TYPE, MAX_COUNT, INITIAL_COUNT | `esp32_freertos_semaphore_create("syncSem",BINARY,10,0)` | `xSemaphoreCreate...` |
| `esp32_freertos_semaphore_take` | 值 | VAR, WAIT_MODE, WAIT_MS | `esp32_freertos_semaphore_take($syncSem,MS,math_number(1000))` | `xSemaphoreTake(...) == pdTRUE` |
| `esp32_freertos_semaphore_give/_from_isr` | 语句 | VAR | `esp32_freertos_semaphore_give($syncSem)` | `xSemaphoreGive(...)` |
| `esp32_freertos_attach_interrupt` | 帽子 | PIN, MODE, ISR_CODE | `esp32_freertos_attach_interrupt(2,RISING)` | `attachInterrupt(...)` |
| `esp32_freertos_get_*` | 值 | 可选 VAR | `esp32_freertos_get_tick_count()` | `xTaskGetTickCount()` 等 |

## 字段类型映射

| 类型 | 用途 |
|---|---|
| `field_input VAR` | 创建任务、队列、信号量变量 |
| `field_variable VAR` | 选择已创建的 FreeRTOS 任务、队列、信号量 |
| `field_dropdown` | 选择核心、队列数据类型、等待模式、信号量类型和中断触发方式 |
| `field_number` | 设置栈大小、优先级、队列长度、计数信号量计数和中断引脚 |
| `input_value` | 延时、等待时间和队列发送数据 |
| `input_statement` | 任务循环体、队列接收成功体和中断处理体 |

## 连接规则

任务函数和中断配置是帽子块，不接入普通流程；任务、队列、信号量创建块通常放在 `arduino_setup()` 中；延时、发送、释放、通知等为语句块；等待通知、获取信号量和系统状态为值块。队列发送和接收的数据类型必须与创建队列时选择的类型保持一致。

## 使用示例

```text
arduino_setup()
    esp32_freertos_task_create("TaskBlink", 4096, 1, AUTO)

esp32_freertos_task_function(variables_get($TaskBlink))
    io_digitalwrite(...)
    esp32_freertos_task_delay_ms(math_number(1000))
```

## 重要规则

1. ESP32 任务栈大小按字节填写，默认 4096 字节。
2. 运行核心选择“自动”时生成 `xTaskCreate()`；选择核心 0/1 时生成 `xTaskCreatePinnedToCore()`。
3. ESP32-S2、ESP32-C3、ESP32-C6、ESP32-H2 等单核芯片不要固定到核心 1。
4. 队列发送和接收的数据类型必须与创建队列时选择的类型一致。
5. 队列按字节复制数据，建议只传递基础标量类型，避免按值传递复杂 C++ 对象。
6. 二进制信号量创建后默认为空，需要先释放一次才会变为可获取。
7. 中断处理里应只放 FromISR 通知/信号量释放等短操作。