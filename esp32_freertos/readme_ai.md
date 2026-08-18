# ESP32 FreeRTOS

FreeRTOS multitasking support for ESP32 Arduino

## Library Info
- **Name**: @aily-project/lib-esp32-freertos
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_freertos_task_create` | Statement | VAR(field_input), STACK_SIZE(field_number), PRIORITY(field_number), CORE(dropdown) | `esp32_freertos_task_create("TaskBlink", 4096, 1, AUTO)` | `xTaskCreate( ↵ TaskBlink, ↵ "TaskBlink", ↵ 4096, ↵ NULL, ↵ 1, ↵ &TaskBlinkHandle ↵ );` |
| `esp32_freertos_task_function` | Hat | VAR(field_variable), TASK_CODE(input_statement) | `esp32_freertos_task_function($TaskBlink)` | `void TaskBlink(void *pvParameters) { ↵ (void) pvParameters; ↵ for (;;) { ↵ } ↵ }` |
| `esp32_freertos_task_delay_ms` | Statement | MS(input_value) | `esp32_freertos_task_delay_ms(math_number(1000))` | `vTaskDelay(pdMS_TO_TICKS(1));` |
| `esp32_freertos_task_delay_ticks` | Statement | TICKS(input_value) | `esp32_freertos_task_delay_ticks(math_number(0))` | `vTaskDelay(1);` |
| `esp32_freertos_task_suspend` | Statement | VAR(field_variable) | `esp32_freertos_task_suspend($TaskBlink)` | `vTaskSuspend(TaskBlinkHandle);` |
| `esp32_freertos_task_resume` | Statement | VAR(field_variable) | `esp32_freertos_task_resume($TaskBlink)` | `vTaskResume(TaskBlinkHandle);` |
| `esp32_freertos_task_delete` | Statement | VAR(field_variable) | `esp32_freertos_task_delete($TaskBlink)` | `vTaskDelete(TaskBlinkHandle); ↵ TaskBlinkHandle = NULL;` |
| `esp32_freertos_task_delete_current` | Statement | (none) | `esp32_freertos_task_delete_current()` | `vTaskDelete(NULL);` |
| `esp32_freertos_task_notify` | Statement | VAR(field_variable) | `esp32_freertos_task_notify($TaskBlink)` | `xTaskNotifyGive(TaskBlinkHandle);` |
| `esp32_freertos_task_notify_from_isr` | Statement | VAR(field_variable) | `esp32_freertos_task_notify_from_isr($TaskBlink)` | `{ ↵ BaseType_t xHigherPriorityTaskWoken = pdFALSE; ↵ vTaskNotifyGiveFromISR(TaskBlinkHandle, &xHigherPriorityTaskWoken); ↵ if (xHigherPriorityTaskWoken == pdTRUE) { ↵ portYIELD_FROM_ISR(); ↵ } ↵ }` |
| `esp32_freertos_task_wait_notification` | Value | WAIT_MODE(dropdown), WAIT_MS(input_value) | `esp32_freertos_task_wait_notification(MS, math_number(1000))` | `(ulTaskNotifyTake(pdTRUE, pdMS_TO_TICKS(1)) > 0)` |
| `esp32_freertos_queue_create` | Statement | VAR(field_input), QUEUE_LENGTH(field_number), DATA_TYPE(dropdown) | `esp32_freertos_queue_create("sensorQueue", 10, int)` | `sensorQueue = xQueueCreate(10, sizeof(int));` |
| `esp32_freertos_queue_send` | Statement | VAR(field_variable), DATA(input_value), DATA_TYPE(dropdown), WAIT_MODE(dropdown), WAIT_MS(input_value) | `esp32_freertos_queue_send($sensorQueue, math_number(0), int, MS, math_number(1000))` | `{ ↵ int esp32FreeRTOSQueueItem_sensorQueue = 1; ↵ xQueueSend(sensorQueue, &esp32FreeRTOSQueueItem_sensorQueue, pdMS_TO_TICKS(1)); ↵ }` |
| `esp32_freertos_queue_receive_do` | Statement | VAR(field_variable), DATA_TYPE(dropdown), ITEM_VAR(field_input), WAIT_MODE(dropdown), WAIT_MS(input_value), HANDLER(input_statement) | `esp32_freertos_queue_receive_do($sensorQueue, int, "queueValue", MS, math_number(1000))` | `{ ↵ int queueValue; ↵ if (xQueueReceive(sensorQueue, &queueValue, pdMS_TO_TICKS(1)) == pdPASS) { ↵ } ↵ }` |
| `esp32_freertos_queue_messages_waiting` | Value | VAR(field_variable) | `esp32_freertos_queue_messages_waiting($sensorQueue)` | `uxQueueMessagesWaiting(sensorQueue)` |
| `esp32_freertos_semaphore_create` | Statement | VAR(field_input), SEMAPHORE_TYPE(dropdown), MAX_COUNT(field_number), INITIAL_COUNT(field_number) | `esp32_freertos_semaphore_create("syncSem", BINARY, 10, 0)` | `syncSem = xSemaphoreCreateBinary();` |
| `esp32_freertos_semaphore_take` | Value | VAR(field_variable), WAIT_MODE(dropdown), WAIT_MS(input_value) | `esp32_freertos_semaphore_take($syncSem, MS, math_number(1000))` | `(xSemaphoreTake(syncSem, pdMS_TO_TICKS(1)) == pdTRUE)` |
| `esp32_freertos_semaphore_give` | Statement | VAR(field_variable) | `esp32_freertos_semaphore_give($syncSem)` | `xSemaphoreGive(syncSem);` |
| `esp32_freertos_semaphore_give_from_isr` | Statement | VAR(field_variable) | `esp32_freertos_semaphore_give_from_isr($syncSem)` | `{ ↵ BaseType_t xHigherPriorityTaskWoken = pdFALSE; ↵ xSemaphoreGiveFromISR(syncSem, &xHigherPriorityTaskWoken); ↵ if (xHigherPriorityTaskWoken == pdTRUE) { ↵ portYIELD_FROM_ISR(); ↵ } ↵ }` |
| `esp32_freertos_attach_interrupt` | Hat | PIN(field_number), MODE(dropdown), ISR_CODE(input_statement) | `esp32_freertos_attach_interrupt(2, LOW)` | `void esp32FreeRTOSInterruptPin_2() { ↵ } ↵ pinMode(2, INPUT_PULLUP); ↵ attachInterrupt(digitalPinToInterrupt(2), esp32FreeRTOSInterruptPin_2, LOW);` |
| `esp32_freertos_get_tick_count` | Value | (none) | `esp32_freertos_get_tick_count()` | `xTaskGetTickCount()` |
| `esp32_freertos_get_task_count` | Value | (none) | `esp32_freertos_get_task_count()` | `uxTaskGetNumberOfTasks()` |
| `esp32_freertos_get_task_name` | Value | VAR(field_variable) | `esp32_freertos_get_task_name($TaskBlink)` | `pcTaskGetName(TaskBlinkHandle)` |
| `esp32_freertos_get_current_task_name` | Value | (none) | `esp32_freertos_get_current_task_name()` | `pcTaskGetName(NULL)` |
| `esp32_freertos_get_stack_high_water_mark` | Value | VAR(field_variable) | `esp32_freertos_get_stack_high_water_mark($TaskBlink)` | `uxTaskGetStackHighWaterMark(TaskBlinkHandle)` |
| `esp32_freertos_get_current_stack_high_water_mark` | Value | (none) | `esp32_freertos_get_current_stack_high_water_mark()` | `uxTaskGetStackHighWaterMark(NULL)` |
| `esp32_freertos_get_free_heap_size` | Value | (none) | `esp32_freertos_get_free_heap_size()` | `xPortGetFreeHeapSize()` |
| `esp32_freertos_get_current_core` | Value | (none) | `esp32_freertos_get_current_core()` | `xPortGetCoreID()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CORE | AUTO, 0, 1 | esp32_freertos_task_create |
| WAIT_MODE | MS, FOREVER | esp32_freertos_task_wait_notification, esp32_freertos_queue_send, esp32_freertos_queue_receive_do |
| DATA_TYPE | int, long, uint32_t, int32_t, float, double, uint8_t, bool | esp32_freertos_queue_create, esp32_freertos_queue_send, esp32_freertos_queue_receive_do |
| SEMAPHORE_TYPE | BINARY, MUTEX, COUNTING | esp32_freertos_semaphore_create |
| MODE | LOW, RISING, FALLING, CHANGE | esp32_freertos_attach_interrupt |

## ABS Examples

### Basic Usage
```
arduino_setup()
    esp32_freertos_task_create("TaskBlink", 4096, 1, AUTO)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, esp32_freertos_task_wait_notification(MS, math_number(1000)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `esp32_freertos_task_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
