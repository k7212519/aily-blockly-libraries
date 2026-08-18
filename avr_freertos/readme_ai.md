# AVR FreeRTOS

FreeRTOS for AVR Arduino multitasking

## Library Info
- **Name**: @aily-project/lib-avr-freertos
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `avr_freertos_task_create` | Statement | VAR(field_input), STACK_SIZE(field_number), PRIORITY(field_number) | `avr_freertos_task_create("TaskBlink", 128, 1)` | `xTaskCreate( ↵ TaskBlink, ↵ "TaskBlink", ↵ 128, ↵ NULL, ↵ 1, ↵ &TaskBlinkHandle ↵ );` |
| `avr_freertos_task_function` | Hat | VAR(field_variable), TASK_CODE(input_statement) | `avr_freertos_task_function($TaskBlink)` | `void TaskBlink(void *pvParameters) { ↵ (void) pvParameters; ↵ for (;;) { ↵ } ↵ }` |
| `avr_freertos_task_delay_ms` | Statement | MS(input_value) | `avr_freertos_task_delay_ms(math_number(1000))` | `vTaskDelay(1 / portTICK_PERIOD_MS);` |
| `avr_freertos_task_delay_ticks` | Statement | TICKS(input_value) | `avr_freertos_task_delay_ticks(math_number(0))` | `vTaskDelay(1);` |
| `avr_freertos_task_suspend` | Statement | VAR(field_variable) | `avr_freertos_task_suspend($TaskBlink)` | `vTaskSuspend(TaskBlinkHandle);` |
| `avr_freertos_task_resume` | Statement | VAR(field_variable) | `avr_freertos_task_resume($TaskBlink)` | `vTaskResume(TaskBlinkHandle);` |
| `avr_freertos_task_delete` | Statement | VAR(field_variable) | `avr_freertos_task_delete($TaskBlink)` | `vTaskDelete(TaskBlinkHandle); ↵ TaskBlinkHandle = NULL;` |
| `avr_freertos_task_delete_current` | Statement | (none) | `avr_freertos_task_delete_current()` | `vTaskDelete(NULL);` |
| `avr_freertos_task_notify` | Statement | VAR(field_variable) | `avr_freertos_task_notify($TaskBlink)` | `xTaskNotifyGive(TaskBlinkHandle);` |
| `avr_freertos_task_notify_from_isr` | Statement | VAR(field_variable) | `avr_freertos_task_notify_from_isr($TaskBlink)` | `{ ↵ BaseType_t xHigherPriorityTaskWoken = pdFALSE; ↵ vTaskNotifyGiveFromISR(TaskBlinkHandle, &xHigherPriorityTaskWoken); ↵ if (xHigherPriorityTaskWoken == pdTRUE) { ↵ taskYIELD(); ↵ } ↵ }` |
| `avr_freertos_task_wait_notification` | Value | WAIT_MODE(dropdown), WAIT_MS(input_value) | `avr_freertos_task_wait_notification(MS, math_number(1000))` | `(ulTaskNotifyTake(pdTRUE, (1 / portTICK_PERIOD_MS)) > 0)` |
| `avr_freertos_queue_create` | Statement | VAR(field_input), QUEUE_LENGTH(field_number), DATA_TYPE(dropdown) | `avr_freertos_queue_create("sensorQueue", 10, int)` | `sensorQueue = xQueueCreate(10, sizeof(int));` |
| `avr_freertos_queue_send` | Statement | VAR(field_variable), DATA(input_value), DATA_TYPE(dropdown), WAIT_MODE(dropdown), WAIT_MS(input_value) | `avr_freertos_queue_send($sensorQueue, math_number(0), int, MS, math_number(1000))` | `{ ↵ int avrFreeRTOSQueueItem_sensorQueue = 1; ↵ xQueueSend(sensorQueue, &avrFreeRTOSQueueItem_sensorQueue, (1 / portTICK_PERIOD_MS)); ↵ }` |
| `avr_freertos_queue_receive_do` | Statement | VAR(field_variable), DATA_TYPE(dropdown), ITEM_VAR(field_input), WAIT_MODE(dropdown), WAIT_MS(input_value), HANDLER(input_statement) | `avr_freertos_queue_receive_do($sensorQueue, int, "queueValue", MS, math_number(1000))` | `{ ↵ int queueValue; ↵ if (xQueueReceive(sensorQueue, &queueValue, (1 / portTICK_PERIOD_MS)) == pdPASS) { ↵ } ↵ }` |
| `avr_freertos_queue_messages_waiting` | Value | VAR(field_variable) | `avr_freertos_queue_messages_waiting($sensorQueue)` | `uxQueueMessagesWaiting(sensorQueue)` |
| `avr_freertos_semaphore_create` | Statement | VAR(field_input), SEMAPHORE_TYPE(dropdown), MAX_COUNT(field_number), INITIAL_COUNT(field_number) | `avr_freertos_semaphore_create("syncSem", BINARY, 10, 0)` | `syncSem = xSemaphoreCreateBinary();` |
| `avr_freertos_semaphore_take` | Value | VAR(field_variable), WAIT_MODE(dropdown), WAIT_MS(input_value) | `avr_freertos_semaphore_take($syncSem, MS, math_number(1000))` | `(xSemaphoreTake(syncSem, (1 / portTICK_PERIOD_MS)) == pdTRUE)` |
| `avr_freertos_semaphore_give` | Statement | VAR(field_variable) | `avr_freertos_semaphore_give($syncSem)` | `xSemaphoreGive(syncSem);` |
| `avr_freertos_semaphore_give_from_isr` | Statement | VAR(field_variable) | `avr_freertos_semaphore_give_from_isr($syncSem)` | `{ ↵ BaseType_t xHigherPriorityTaskWoken = pdFALSE; ↵ xSemaphoreGiveFromISR(syncSem, &xHigherPriorityTaskWoken); ↵ if (xHigherPriorityTaskWoken == pdTRUE) { ↵ taskYIELD(); ↵ } ↵ }` |
| `avr_freertos_attach_interrupt` | Hat | PIN(field_number), MODE(dropdown), ISR_CODE(input_statement) | `avr_freertos_attach_interrupt(2, LOW)` | `void avrFreeRTOSInterruptPin2() { ↵ } ↵ pinMode(2, INPUT_PULLUP); ↵ attachInterrupt(digitalPinToInterrupt(2), avrFreeRTOSInterruptPin2, LOW);` |
| `avr_freertos_get_tick_count` | Value | (none) | `avr_freertos_get_tick_count()` | `xTaskGetTickCount()` |
| `avr_freertos_get_task_count` | Value | (none) | `avr_freertos_get_task_count()` | `uxTaskGetNumberOfTasks()` |
| `avr_freertos_get_task_name` | Value | VAR(field_variable) | `avr_freertos_get_task_name($TaskBlink)` | `pcTaskGetName(TaskBlinkHandle)` |
| `avr_freertos_get_current_task_name` | Value | (none) | `avr_freertos_get_current_task_name()` | `pcTaskGetName(NULL)` |
| `avr_freertos_get_stack_high_water_mark` | Value | VAR(field_variable) | `avr_freertos_get_stack_high_water_mark($TaskBlink)` | `uxTaskGetStackHighWaterMark(TaskBlinkHandle)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| WAIT_MODE | MS, FOREVER | avr_freertos_task_wait_notification, avr_freertos_queue_send, avr_freertos_queue_receive_do |
| DATA_TYPE | int, long, float, byte, char, bool | avr_freertos_queue_create, avr_freertos_queue_send, avr_freertos_queue_receive_do |
| SEMAPHORE_TYPE | BINARY, MUTEX, COUNTING | avr_freertos_semaphore_create |
| MODE | LOW, RISING, FALLING, CHANGE | avr_freertos_attach_interrupt |

## ABS Examples

### Basic Usage
```
arduino_setup()
    avr_freertos_task_create("TaskBlink", 128, 1)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, avr_freertos_task_wait_notification(MS, math_number(1000)))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `avr_freertos_task_create("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
