# STM32 FreeRTOS

FreeRTOS multitasking support for STM32 Arduino

## Library Info
- **Name**: @aily-project/lib-stm32-freertos
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `stm32_freertos_task_create` | Statement | VAR(field_input), STACK_SIZE(field_number), PRIORITY(field_number) | `stm32_freertos_task_create("TaskBlink", 256, 2)` | `xTaskCreate( ↵ TaskBlink, ↵ "TaskBlink", ↵ 256, ↵ NULL, ↵ 2, ↵ &TaskBlinkHandle ↵ );` |
| `stm32_freertos_task_function` | Hat | VAR(field_variable), TASK_CODE(input_statement) | `stm32_freertos_task_function($TaskBlink)` | `void TaskBlink(void *pvParameters) { ↵ (void) pvParameters; ↵ for (;;) { ↵ } ↵ }` |
| `stm32_freertos_start_scheduler` | Statement | (none) | `stm32_freertos_start_scheduler()` | `vTaskStartScheduler();` |
| `stm32_freertos_task_delay_ms` | Statement | MS(input_value) | `stm32_freertos_task_delay_ms(math_number(1000))` | `vTaskDelay(pdMS_TO_TICKS(1));` |
| `stm32_freertos_task_delay_ticks` | Statement | TICKS(input_value) | `stm32_freertos_task_delay_ticks(math_number(0))` | `vTaskDelay(1);` |
| `stm32_freertos_task_suspend` | Statement | VAR(field_variable) | `stm32_freertos_task_suspend($TaskBlink)` | `vTaskSuspend(TaskBlinkHandle);` |
| `stm32_freertos_task_resume` | Statement | VAR(field_variable) | `stm32_freertos_task_resume($TaskBlink)` | `vTaskResume(TaskBlinkHandle);` |
| `stm32_freertos_task_delete` | Statement | VAR(field_variable) | `stm32_freertos_task_delete($TaskBlink)` | `vTaskDelete(TaskBlinkHandle); ↵ TaskBlinkHandle = NULL;` |
| `stm32_freertos_task_delete_current` | Statement | (none) | `stm32_freertos_task_delete_current()` | `vTaskDelete(NULL);` |
| `stm32_freertos_task_notify` | Statement | VAR(field_variable) | `stm32_freertos_task_notify($TaskBlink)` | `xTaskNotifyGive(TaskBlinkHandle);` |
| `stm32_freertos_task_notify_from_isr` | Statement | VAR(field_variable) | `stm32_freertos_task_notify_from_isr($TaskBlink)` | `{ ↵ BaseType_t xHigherPriorityTaskWoken = pdFALSE; ↵ vTaskNotifyGiveFromISR(TaskBlinkHandle, &xHigherPriorityTaskWoken); ↵ portYIELD_FROM_ISR(xHigherPriorityTaskWoken); ↵ }` |
| `stm32_freertos_task_wait_notification` | Value | WAIT_MODE(dropdown), WAIT_MS(input_value) | `stm32_freertos_task_wait_notification(MS, math_number(1000))` | `(ulTaskNotifyTake(pdTRUE, pdMS_TO_TICKS(1)) > 0)` |
| `stm32_freertos_queue_create` | Statement | VAR(field_input), QUEUE_LENGTH(field_number), DATA_TYPE(dropdown) | `stm32_freertos_queue_create("sensorQueue", 10, int)` | `sensorQueue = xQueueCreate(10, sizeof(int));` |
| `stm32_freertos_queue_send` | Statement | VAR(field_variable), DATA(input_value), DATA_TYPE(dropdown), WAIT_MODE(dropdown), WAIT_MS(input_value) | `stm32_freertos_queue_send($sensorQueue, math_number(0), int, MS, math_number(1000))` | `{ ↵ int stm32FreeRTOSQueueItem_sensorQueue = 1; ↵ xQueueSend(sensorQueue, &stm32FreeRTOSQueueItem_sensorQueue, pdMS_TO_TICKS(1)); ↵ }` |
| `stm32_freertos_queue_receive_do` | Statement | VAR(field_variable), DATA_TYPE(dropdown), ITEM_VAR(field_input), WAIT_MODE(dropdown), WAIT_MS(input_value), HANDLER(input_statement) | `stm32_freertos_queue_receive_do($sensorQueue, int, "queueValue", MS, math_number(1000))` | `{ ↵ int queueValue; ↵ if (xQueueReceive(sensorQueue, &queueValue, pdMS_TO_TICKS(1)) == pdPASS) { ↵ } ↵ }` |
| `stm32_freertos_queue_messages_waiting` | Value | VAR(field_variable) | `stm32_freertos_queue_messages_waiting($sensorQueue)` | `uxQueueMessagesWaiting(sensorQueue)` |
| `stm32_freertos_semaphore_create` | Statement | VAR(field_input), SEMAPHORE_TYPE(dropdown), MAX_COUNT(field_number), INITIAL_COUNT(field_number) | `stm32_freertos_semaphore_create("syncSem", BINARY, 10, 0)` | `syncSem = xSemaphoreCreateBinary();` |
| `stm32_freertos_semaphore_take` | Value | VAR(field_variable), WAIT_MODE(dropdown), WAIT_MS(input_value) | `stm32_freertos_semaphore_take($syncSem, MS, math_number(1000))` | `(xSemaphoreTake(syncSem, pdMS_TO_TICKS(1)) == pdTRUE)` |
| `stm32_freertos_semaphore_give` | Statement | VAR(field_variable) | `stm32_freertos_semaphore_give($syncSem)` | `xSemaphoreGive(syncSem);` |
| `stm32_freertos_semaphore_give_from_isr` | Statement | VAR(field_variable) | `stm32_freertos_semaphore_give_from_isr($syncSem)` | `{ ↵ BaseType_t xHigherPriorityTaskWoken = pdFALSE; ↵ xSemaphoreGiveFromISR(syncSem, &xHigherPriorityTaskWoken); ↵ portYIELD_FROM_ISR(xHigherPriorityTaskWoken); ↵ }` |
| `stm32_freertos_attach_interrupt` | Hat | PIN(field_number), MODE(dropdown), ISR_CODE(input_statement) | `stm32_freertos_attach_interrupt(2, LOW)` | `void stm32FreeRTOSInterruptPin_2() { ↵ } ↵ pinMode(2, INPUT_PULLUP); ↵ attachInterrupt(digitalPinToInterrupt(2), stm32FreeRTOSInterruptPin_2, LOW);` |
| `stm32_freertos_get_tick_count` | Value | (none) | `stm32_freertos_get_tick_count()` | `xTaskGetTickCount()` |
| `stm32_freertos_get_task_count` | Value | (none) | `stm32_freertos_get_task_count()` | `uxTaskGetNumberOfTasks()` |
| `stm32_freertos_get_task_name` | Value | VAR(field_variable) | `stm32_freertos_get_task_name($TaskBlink)` | `pcTaskGetName(TaskBlinkHandle)` |
| `stm32_freertos_get_current_task_name` | Value | (none) | `stm32_freertos_get_current_task_name()` | `pcTaskGetName(NULL)` |
| `stm32_freertos_get_stack_high_water_mark` | Value | VAR(field_variable) | `stm32_freertos_get_stack_high_water_mark($TaskBlink)` | `uxTaskGetStackHighWaterMark(TaskBlinkHandle)` |
| `stm32_freertos_get_idle_stack_high_water_mark` | Value | (none) | `stm32_freertos_get_idle_stack_high_water_mark()` | `uxTaskGetStackHighWaterMark(xTaskGetIdleTaskHandle())` |
| `stm32_freertos_get_free_heap_size` | Value | (none) | `stm32_freertos_get_free_heap_size()` | `xPortGetFreeHeapSize()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| WAIT_MODE | MS, FOREVER | stm32_freertos_task_wait_notification, stm32_freertos_queue_send, stm32_freertos_queue_receive_do |
| DATA_TYPE | int, long, uint32_t, int32_t, float, double, uint8_t, bool | stm32_freertos_queue_create, stm32_freertos_queue_send, stm32_freertos_queue_receive_do |
| SEMAPHORE_TYPE | BINARY, MUTEX, COUNTING | stm32_freertos_semaphore_create |
| MODE | LOW, RISING, FALLING, CHANGE | stm32_freertos_attach_interrupt |

## ABS Examples

### Basic Usage
```
arduino_setup()
    stm32_freertos_task_create("TaskBlink", 256, 2)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, stm32_freertos_task_wait_notification(MS, math_number(1000)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `stm32_freertos_task_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
