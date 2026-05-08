# AVR FreeRTOS

AVR Arduino FreeRTOS Blockly library for task scheduling, queues, semaphores, notifications, interrupts, and runtime status.

## Library Info
- **Name**: @aily-project/lib-avr-freertos
- **Version**: 1.0.0
- **Core**: arduino:avr

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `avr_freertos_task_create` | Statement | VAR(field_input), STACK_SIZE(field_number), PRIORITY(field_number) | `avr_freertos_task_create("TaskBlink", 128, 1)` | `xTaskCreate(TaskBlink, "TaskBlink", 128, NULL, 1, &TaskBlinkHandle);` |
| `avr_freertos_task_function` | Hat | VAR(field_variable), TASK_CODE(input_statement) | `avr_freertos_task_function(variables_get($TaskBlink)) @TASK_CODE: ...` | `void TaskBlink(void *pvParameters) { for (;;) { ... } }` |
| `avr_freertos_task_delay_ms` | Statement | MS(input_value) | `avr_freertos_task_delay_ms(math_number(1000))` | `vTaskDelay(ms / portTICK_PERIOD_MS);` |
| `avr_freertos_task_delay_ticks` | Statement | TICKS(input_value) | `avr_freertos_task_delay_ticks(math_number(1))` | `vTaskDelay(ticks);` |
| `avr_freertos_task_suspend` | Statement | VAR(field_variable) | `avr_freertos_task_suspend(variables_get($TaskBlink))` | `vTaskSuspend(TaskBlinkHandle);` |
| `avr_freertos_task_resume` | Statement | VAR(field_variable) | `avr_freertos_task_resume(variables_get($TaskBlink))` | `vTaskResume(TaskBlinkHandle);` |
| `avr_freertos_task_delete` | Statement | VAR(field_variable) | `avr_freertos_task_delete(variables_get($TaskBlink))` | `vTaskDelete(TaskBlinkHandle);` |
| `avr_freertos_task_delete_current` | Statement | none | `avr_freertos_task_delete_current()` | `vTaskDelete(NULL);` |
| `avr_freertos_task_notify` | Statement | VAR(field_variable) | `avr_freertos_task_notify(variables_get($TaskBlink))` | `xTaskNotifyGive(TaskBlinkHandle);` |
| `avr_freertos_task_notify_from_isr` | Statement | VAR(field_variable) | `avr_freertos_task_notify_from_isr(variables_get($TaskBlink))` | `vTaskNotifyGiveFromISR(...); taskYIELD();` |
| `avr_freertos_task_wait_notification` | Value | WAIT_MODE(dropdown), WAIT_MS(input_value) | `avr_freertos_task_wait_notification(MS, math_number(1000))` | `(ulTaskNotifyTake(pdTRUE, ticks) > 0)` |
| `avr_freertos_queue_create` | Statement | VAR(field_input), QUEUE_LENGTH(field_number), DATA_TYPE(dropdown) | `avr_freertos_queue_create("sensorQueue", 10, int)` | `sensorQueue = xQueueCreate(10, sizeof(int));` |
| `avr_freertos_queue_send` | Statement | VAR(field_variable), DATA(input_value), DATA_TYPE(dropdown), WAIT_MODE(dropdown), WAIT_MS(input_value) | `avr_freertos_queue_send(variables_get($sensorQueue), math_number(42), int, MS, math_number(1000))` | `xQueueSend(queue, &temp, ticks);` |
| `avr_freertos_queue_receive_do` | Statement | VAR(field_variable), DATA_TYPE(dropdown), ITEM_VAR(field_input), WAIT_MODE(dropdown), WAIT_MS(input_value), HANDLER(input_statement) | `avr_freertos_queue_receive_do(variables_get($sensorQueue), int, "queueValue", MS, math_number(1000)) @HANDLER: ...` | `if (xQueueReceive(..., &queueValue, ticks) == pdPASS) { ... }` |
| `avr_freertos_queue_messages_waiting` | Value | VAR(field_variable) | `avr_freertos_queue_messages_waiting(variables_get($sensorQueue))` | `uxQueueMessagesWaiting(sensorQueue)` |
| `avr_freertos_semaphore_create` | Statement | VAR(field_input), SEMAPHORE_TYPE(dropdown), MAX_COUNT(field_number), INITIAL_COUNT(field_number) | `avr_freertos_semaphore_create("syncSem", BINARY, 10, 0)` | `syncSem = xSemaphoreCreateBinary();` |
| `avr_freertos_semaphore_take` | Value | VAR(field_variable), WAIT_MODE(dropdown), WAIT_MS(input_value) | `avr_freertos_semaphore_take(variables_get($syncSem), MS, math_number(1000))` | `(xSemaphoreTake(syncSem, ticks) == pdTRUE)` |
| `avr_freertos_semaphore_give` | Statement | VAR(field_variable) | `avr_freertos_semaphore_give(variables_get($syncSem))` | `xSemaphoreGive(syncSem);` |
| `avr_freertos_semaphore_give_from_isr` | Statement | VAR(field_variable) | `avr_freertos_semaphore_give_from_isr(variables_get($syncSem))` | `xSemaphoreGiveFromISR(...); taskYIELD();` |
| `avr_freertos_attach_interrupt` | Hat | PIN(field_number), MODE(dropdown), ISR_CODE(input_statement) | `avr_freertos_attach_interrupt(2, LOW) @ISR_CODE: ...` | `attachInterrupt(digitalPinToInterrupt(2), handler, LOW);` |
| `avr_freertos_get_tick_count` | Value | none | `avr_freertos_get_tick_count()` | `xTaskGetTickCount()` |
| `avr_freertos_get_task_count` | Value | none | `avr_freertos_get_task_count()` | `uxTaskGetNumberOfTasks()` |
| `avr_freertos_get_task_name` | Value | VAR(field_variable) | `avr_freertos_get_task_name(variables_get($TaskBlink))` | `pcTaskGetName(TaskBlinkHandle)` |
| `avr_freertos_get_current_task_name` | Value | none | `avr_freertos_get_current_task_name()` | `pcTaskGetName(NULL)` |
| `avr_freertos_get_stack_high_water_mark` | Value | VAR(field_variable) | `avr_freertos_get_stack_high_water_mark(variables_get($TaskBlink))` | `uxTaskGetStackHighWaterMark(TaskBlinkHandle)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DATA_TYPE | int, long, float, byte, char, bool | Queue item C++ type; send/receive must match queue creation |
| WAIT_MODE | MS, FOREVER | Convert WAIT_MS to ticks, or use `portMAX_DELAY` |
| SEMAPHORE_TYPE | BINARY, MUTEX, COUNTING | Binary semaphore, mutex, or counting semaphore |
| MODE | LOW, RISING, FALLING, CHANGE | Arduino external interrupt trigger mode |

## ABS Examples

### Blink Task
```text
arduino_setup()
    avr_freertos_task_create("TaskBlink", 128, 1)

avr_freertos_task_function(variables_get($TaskBlink))
    io_digitalwrite(...)
    avr_freertos_task_delay_ms(math_number(1000))
```

### Queue Receive
```text
arduino_setup()
    avr_freertos_queue_create("sensorQueue", 10, int)
    avr_freertos_task_create("TaskRead", 128, 1)

avr_freertos_task_function(variables_get($TaskRead))
    avr_freertos_queue_receive_do(variables_get($sensorQueue), int, "queueValue", FOREVER, math_number(0))
        @HANDLER:
            serial_println(Serial, variables_get($queueValue))
```

## Notes

1. `avr_freertos_task_create("TaskBlink", ...)` creates Blockly variable `$TaskBlink` and C handle `TaskBlinkHandle`.
2. `avr_freertos_task_function` is a Hat block and returns no inline code; it registers the task function globally.
3. Queue send uses a typed temporary variable so literal inputs like `math_number(42)` compile correctly.
4. Queue item types are primitive scalar types only; avoid queuing C++ objects on AVR.
5. Binary semaphores are created empty. Use `avr_freertos_semaphore_give` once if the initial state should be available.
6. Use FromISR blocks only inside `avr_freertos_attach_interrupt` bodies.