# AVR FreeRTOS

AVR Arduino 使用的 FreeRTOS Blockly 库，支持任务、队列、信号量、任务通知、中断和运行状态查询。

## 库信息

| 字段 | 值 |
|---|---|
| 包名 | @aily-project/lib-avr-freertos |
| 版本 | 1.0.0 |
| 作者 | aily-project |
| 原始库 | https://github.com/feilipu/Arduino_FreeRTOS_Library |
| 适配核心 | arduino:avr |

## 块定义

| 块类型 | 连接 | 字段/输入 | .abi格式 | 生成代码 |
|---|---|---|---|---|
| avr_freertos_task_create | Statement | VAR, STACK_SIZE, PRIORITY | avr_freertos_task_create("TaskBlink",128,1) | xTaskCreate(...) |
| avr_freertos_task_function | Hat | VAR, TASK_CODE | avr_freertos_task_function($TaskBlink) | void TaskBlink(...) |
| avr_freertos_task_delay_ms | Statement | MS | avr_freertos_task_delay_ms(math_number(1000)) | vTaskDelay(ms / portTICK_PERIOD_MS) |
| avr_freertos_task_delay_ticks | Statement | TICKS | avr_freertos_task_delay_ticks(math_number(1)) | vTaskDelay(ticks) |
| avr_freertos_task_suspend/resume/delete | Statement | VAR | avr_freertos_task_suspend($TaskBlink) | vTaskSuspend/Resume/Delete(handle) |
| avr_freertos_task_notify | Statement | VAR | avr_freertos_task_notify($TaskBlink) | xTaskNotifyGive(handle) |
| avr_freertos_task_wait_notification | Value | WAIT_MODE, WAIT_MS | avr_freertos_task_wait_notification(MS,math_number(1000)) | ulTaskNotifyTake(...) > 0 |
| avr_freertos_queue_create | Statement | VAR, QUEUE_LENGTH, DATA_TYPE | avr_freertos_queue_create("sensorQueue",10,int) | xQueueCreate(...) |
| avr_freertos_queue_send | Statement | VAR, DATA, DATA_TYPE, WAIT_MODE, WAIT_MS | avr_freertos_queue_send($sensorQueue,math_number(1),int,MS,math_number(1000)) | xQueueSend(...) |
| avr_freertos_queue_receive_do | Statement | VAR, DATA_TYPE, ITEM_VAR, WAIT_MODE, WAIT_MS, HANDLER | avr_freertos_queue_receive_do($sensorQueue,int,"queueValue",MS,math_number(1000)) | if (xQueueReceive(...)) {...} |
| avr_freertos_queue_messages_waiting | Value | VAR | avr_freertos_queue_messages_waiting($sensorQueue) | uxQueueMessagesWaiting(queue) |
| avr_freertos_semaphore_create | Statement | VAR, TYPE, MAX_COUNT, INITIAL_COUNT | avr_freertos_semaphore_create("syncSem",BINARY,10,0) | xSemaphoreCreate... |
| avr_freertos_semaphore_take | Value | VAR, WAIT_MODE, WAIT_MS | avr_freertos_semaphore_take($syncSem,MS,math_number(1000)) | xSemaphoreTake(...) == pdTRUE |
| avr_freertos_semaphore_give | Statement | VAR | avr_freertos_semaphore_give($syncSem) | xSemaphoreGive(sem) |
| avr_freertos_attach_interrupt | Hat | PIN, MODE, ISR_CODE | avr_freertos_attach_interrupt(2,LOW) | attachInterrupt(...) |
| avr_freertos_get_tick_count/task_count/task_name | Value | 可选 VAR | avr_freertos_get_tick_count() | xTaskGetTickCount() |

## 字段类型映射

| 类型 | 用途 |
|---|---|
| field_input VAR | 创建任务、队列、信号量变量 |
| field_variable VAR | 选择已创建的 FreeRTOS 任务、队列、信号量 |
| input_value | 延时、等待时间、发送数据 |
| input_statement | 任务循环体、队列接收成功体、中断处理体 |

## 连接规则

创建块放在 setup 中；任务函数和中断配置为 Hat 块；延时、发送、释放等为 Statement；状态读取和等待结果为 Value。队列发送和接收的数据类型必须与创建队列时选择的类型保持一致。

## 使用示例

```text
arduino_setup()
    avr_freertos_task_create("TaskBlink", 128, 1)

avr_freertos_task_function($TaskBlink)
    io_digitalwrite(...)
    avr_freertos_task_delay_ms(math_number(1000))
```

## 重要规则

1. 仅用于 `arduino:avr`，不适用于 UNO R4 的 Renesas FreeRTOS。
2. AVR SRAM 很小，UNO/Nano 推荐每个任务栈从 128 开始，任务数量不要过多。
3. 队列数据类型限 int、long、float、byte、char、bool，避免在队列中按字节复制复杂对象。
4. 二进制信号量创建后默认为空，需要先释放一次才会变为可获取。
5. 中断处理里应只放 FromISR 通知/信号量释放等短操作。