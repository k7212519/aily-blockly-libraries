# Seeed FreeRTOS

FreeRTOS multitasking support for Seeed SAMD boards and Wio Terminal.

## Library Info
- **Name**: @aily-project/lib-seeed-freertos
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `seeed_freertos_task_create` | Statement | VAR(field_input), STACK_SIZE(field_number), PRIORITY(field_number) | `seeed_freertos_task_create("TaskBlink", 256, 2)` | `xTaskCreate( ↵ TaskBlink, ↵ "TaskBlink", ↵ 256, ↵ NULL, ↵ tskIDLE_PRIORITY + 2, ↵ &TaskBlinkHandle ↵ );` |
| `seeed_freertos_task_function` | Hat | VAR(field_variable), TASK_CODE(input_statement) | `seeed_freertos_task_function($TaskBlink)` | `void TaskBlink(void *pvParameters) { ↵ (void) pvParameters; ↵ for (;;) { ↵ } ↵ }` |
| `seeed_freertos_start_scheduler` | Statement | (none) | `seeed_freertos_start_scheduler()` | `vNopDelayMS(1000); ↵ vTaskStartScheduler();` |
| `seeed_freertos_start_tinyusb_task` | Statement | (none) | `seeed_freertos_start_tinyusb_task()` | `#if defined(USE_TINYUSB) ↵ tinyusb_task(); ↵ #endif` |
| `seeed_freertos_task_delay_ms` | Statement | MS(input_value) | `seeed_freertos_task_delay_ms(math_number(1000))` | `vTaskDelay(pdMS_TO_TICKS(1));` |
| `seeed_freertos_task_delay_ticks` | Statement | TICKS(input_value) | `seeed_freertos_task_delay_ticks(math_number(1))` | `vTaskDelay(1);` |
| `seeed_freertos_nop_delay_ms` | Statement | MS(input_value) | `seeed_freertos_nop_delay_ms(math_number(1000))` | `vNopDelayMS(1);` |
| `seeed_freertos_task_suspend` | Statement | VAR(field_variable) | `seeed_freertos_task_suspend($TaskBlink)` | `vTaskSuspend(TaskBlinkHandle);` |
| `seeed_freertos_task_resume` | Statement | VAR(field_variable) | `seeed_freertos_task_resume($TaskBlink)` | `vTaskResume(TaskBlinkHandle);` |
| `seeed_freertos_task_delete` | Statement | VAR(field_variable) | `seeed_freertos_task_delete($TaskBlink)` | `vTaskDelete(TaskBlinkHandle); ↵ TaskBlinkHandle = NULL;` |
| `seeed_freertos_task_delete_current` | Statement | (none) | `seeed_freertos_task_delete_current()` | `vTaskDelete(NULL);` |
| `seeed_freertos_task_notify` | Statement | VAR(field_variable) | `seeed_freertos_task_notify($TaskBlink)` | `xTaskNotifyGive(TaskBlinkHandle);` |
| `seeed_freertos_task_notify_from_isr` | Statement | VAR(field_variable) | `seeed_freertos_task_notify_from_isr($TaskBlink)` | `{ ↵ BaseType_t xHigherPriorityTaskWoken = pdFALSE; ↵ vTaskNotifyGiveFromISR(TaskBlinkHandle, &xHigherPriorityTaskWoken); ↵ portYIELD_FROM_ISR(xHigherPriorityTaskWoken); ↵ }` |
| `seeed_freertos_task_wait_notification` | Value | WAIT_MODE(dropdown), WAIT_MS(input_value) | `seeed_freertos_task_wait_notification(MS, math_number(1000))` | `(ulTaskNotifyTake(pdTRUE, pdMS_TO_TICKS(1)) > 0)` |
| `seeed_freertos_queue_create` | Statement | VAR(field_input), QUEUE_LENGTH(field_number), DATA_TYPE(dropdown) | `seeed_freertos_queue_create("sensorQueue", 10, int)` | `sensorQueue = xQueueCreate(10, sizeof(int));` |
| `seeed_freertos_queue_send` | Statement | VAR(field_variable), DATA(input_value), DATA_TYPE(dropdown), WAIT_MODE(dropdown), WAIT_MS(input_value) | `seeed_freertos_queue_send($sensorQueue, math_number(0), int, MS, math_number(1000))` | `{ ↵ int seeedFreeRTOSQueueItem_sensorQueue = 1; ↵ xQueueSend(sensorQueue, &seeedFreeRTOSQueueItem_sensorQueue, pdMS_TO_TICKS(1)); ↵ }` |
| `seeed_freertos_queue_receive_do` | Statement | VAR(field_variable), DATA_TYPE(dropdown), ITEM_VAR(field_input), WAIT_MODE(dropdown), WAIT_MS(input_value), HANDLER(input_statement) | `seeed_freertos_queue_receive_do($sensorQueue, int, "queueValue", MS, math_number(1000))` | `{ ↵ int queueValue; ↵ if (xQueueReceive(sensorQueue, &queueValue, pdMS_TO_TICKS(1)) == pdPASS) { ↵ } ↵ }` |
| `seeed_freertos_queue_messages_waiting` | Value | VAR(field_variable) | `seeed_freertos_queue_messages_waiting($sensorQueue)` | `uxQueueMessagesWaiting(sensorQueue)` |
| `seeed_freertos_semaphore_create` | Statement | VAR(field_input), SEMAPHORE_TYPE(dropdown), MAX_COUNT(field_number), INITIAL_COUNT(field_number) | `seeed_freertos_semaphore_create("syncSem", BINARY, 10, 0)` | `syncSem = xSemaphoreCreateBinary();` |
| `seeed_freertos_semaphore_take` | Value | VAR(field_variable), WAIT_MODE(dropdown), WAIT_MS(input_value) | `seeed_freertos_semaphore_take($syncSem, MS, math_number(1000))` | `(xSemaphoreTake(syncSem, pdMS_TO_TICKS(1)) == pdTRUE)` |
| `seeed_freertos_semaphore_give` | Statement | VAR(field_variable) | `seeed_freertos_semaphore_give($syncSem)` | `xSemaphoreGive(syncSem);` |
| `seeed_freertos_semaphore_give_from_isr` | Statement | VAR(field_variable) | `seeed_freertos_semaphore_give_from_isr($syncSem)` | `{ ↵ BaseType_t xHigherPriorityTaskWoken = pdFALSE; ↵ xSemaphoreGiveFromISR(syncSem, &xHigherPriorityTaskWoken); ↵ portYIELD_FROM_ISR(xHigherPriorityTaskWoken); ↵ }` |
| `seeed_freertos_attach_interrupt` | Hat | PIN(field_number), MODE(dropdown), ISR_CODE(input_statement) | `seeed_freertos_attach_interrupt(2, RISING)` | `void seeedFreeRTOSInterruptPin_2() { ↵ } ↵ pinMode(2, INPUT_PULLUP); ↵ attachInterrupt(digitalPinToInterrupt(2), seeedFreeRTOSInterruptPin_2, LOW);` |
| `seeed_freertos_set_error_serial` | Statement | SERIAL(dropdown), BAUD(field_number) | `seeed_freertos_set_error_serial(Serial, 115200)` | `vSetErrorSerial(&SERIAL);` |
| `seeed_freertos_set_error_led` | Statement | PIN(field_number), ACTIVE_STATE(dropdown) | `seeed_freertos_set_error_led(13, HIGH)` | `vSetErrorLed(13, HIGH);` |
| `seeed_freertos_get_tick_count` | Value | (none) | `seeed_freertos_get_tick_count()` | `xTaskGetTickCount()` |
| `seeed_freertos_get_task_count` | Value | (none) | `seeed_freertos_get_task_count()` | `uxTaskGetNumberOfTasks()` |
| `seeed_freertos_get_task_name` | Value | VAR(field_variable) | `seeed_freertos_get_task_name($TaskBlink)` | `pcTaskGetName(TaskBlinkHandle)` |
| `seeed_freertos_get_current_task_name` | Value | (none) | `seeed_freertos_get_current_task_name()` | `pcTaskGetName(NULL)` |
| `seeed_freertos_get_stack_high_water_mark` | Value | VAR(field_variable) | `seeed_freertos_get_stack_high_water_mark($TaskBlink)` | `uxTaskGetStackHighWaterMark(TaskBlinkHandle)` |
| `seeed_freertos_get_idle_stack_high_water_mark` | Value | (none) | `seeed_freertos_get_idle_stack_high_water_mark()` | `uxTaskGetStackHighWaterMark(xTaskGetIdleTaskHandle())` |
| `seeed_freertos_get_free_heap_size` | Value | (none) | `seeed_freertos_get_free_heap_size()` | `xPortGetFreeHeapSize()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| WAIT_MODE | MS, FOREVER | Convert milliseconds to ticks, or wait forever with `portMAX_DELAY`. |
| DATA_TYPE | int, long, uint32_t, int32_t, float, double, uint8_t, bool | Queue item type. Use the same type for create, send, and receive. |
| SEMAPHORE_TYPE | BINARY, MUTEX, COUNTING | Semaphore creation mode. MAX_COUNT and INITIAL_COUNT only apply to COUNTING. |
| MODE | LOW, RISING, FALLING, CHANGE | Arduino external interrupt trigger mode. |
| ACTIVE_STATE | HIGH, LOW | Active level for the FreeRTOS error LED. |

## ABS Examples

### Two Tasks
```
arduino_setup()
    seeed_freertos_task_create("TaskA", 256, 2)
    seeed_freertos_task_create("TaskB", 256, 1)

seeed_freertos_task_function($TaskA)
    serial_println(Serial, text("A"))
    seeed_freertos_task_delay_ms(math_number(500))

seeed_freertos_task_function($TaskB)
    serial_println(Serial, text("B"))
    seeed_freertos_task_delay_ms(math_number(2000))
```

### Queue Between Tasks
```
arduino_setup()
    seeed_freertos_queue_create("sensorQueue", 10, int)
    seeed_freertos_task_create("Producer", 256, 2)
    seeed_freertos_task_create("Consumer", 256, 1)

seeed_freertos_task_function($Producer)
    seeed_freertos_queue_send($sensorQueue, math_number(42), int, MS, math_number(0))
    seeed_freertos_task_delay_ms(math_number(1000))

seeed_freertos_task_function($Consumer)
    seeed_freertos_queue_receive_do($sensorQueue, int, "queueValue", FOREVER, math_number(0))
        serial_println(Serial, variables_get($queueValue))
```

## Notes

1. **Variable**: `seeed_freertos_task_create("TaskName", ...)` creates `$TaskName`; pass `$TaskName` directly to task `field_variable` slots. `variables_get($queueValue)` remains valid because `queueValue` is ordinary data used in an `input_value` slot.
2. **Scheduler**: creating a task automatically adds `vNopDelayMS(1000);` and `vTaskStartScheduler();` at setup end.
3. **Priority**: the priority field is generated as `tskIDLE_PRIORITY + value`.
4. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
