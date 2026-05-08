# ESP32 FreeRTOS

ESP32 Arduino FreeRTOS Blockly library for tasks, core affinity, queues, binary/mutex/counting semaphores, task notifications, interrupts, and runtime status.

## Library Info
- **Name**: @aily-project/lib-esp32-freertos
- **Version**: 1.0.0
- **Core**: esp32:esp32, esp32:esp32s2, esp32:esp32s3, esp32:esp32c3, esp32:esp32c6, esp32:esp32h2

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_freertos_task_create` | Statement | VAR(field_input), STACK_SIZE(field_number), PRIORITY(field_number), CORE(dropdown) | `esp32_freertos_task_create("TaskBlink", 4096, 1, AUTO)` | `xTaskCreate(...)` or `xTaskCreatePinnedToCore(...)` |
| `esp32_freertos_task_function` | Hat | VAR(field_variable), TASK_CODE(input_statement) | `esp32_freertos_task_function(variables_get($TaskBlink)) @TASK_CODE: ...` | `void TaskBlink(void *pvParameters) { for (;;) { ... } }` |
| `esp32_freertos_task_delay_ms` | Statement | MS(input_value) | `esp32_freertos_task_delay_ms(math_number(1000))` | `vTaskDelay(pdMS_TO_TICKS(ms));` |
| `esp32_freertos_task_delay_ticks` | Statement | TICKS(input_value) | `esp32_freertos_task_delay_ticks(math_number(1))` | `vTaskDelay(ticks);` |
| `esp32_freertos_task_suspend` | Statement | VAR(field_variable) | `esp32_freertos_task_suspend(variables_get($TaskBlink))` | `vTaskSuspend(TaskBlinkHandle);` |
| `esp32_freertos_task_resume` | Statement | VAR(field_variable) | `esp32_freertos_task_resume(variables_get($TaskBlink))` | `vTaskResume(TaskBlinkHandle);` |
| `esp32_freertos_task_delete` | Statement | VAR(field_variable) | `esp32_freertos_task_delete(variables_get($TaskBlink))` | `vTaskDelete(TaskBlinkHandle); TaskBlinkHandle = NULL;` |
| `esp32_freertos_task_delete_current` | Statement | none | `esp32_freertos_task_delete_current()` | `vTaskDelete(NULL);` |
| `esp32_freertos_task_notify` | Statement | VAR(field_variable) | `esp32_freertos_task_notify(variables_get($TaskBlink))` | `xTaskNotifyGive(TaskBlinkHandle);` |
| `esp32_freertos_task_notify_from_isr` | Statement | VAR(field_variable) | `esp32_freertos_task_notify_from_isr(variables_get($TaskBlink))` | `vTaskNotifyGiveFromISR(...); portYIELD_FROM_ISR();` |
| `esp32_freertos_task_wait_notification` | Value | WAIT_MODE(dropdown), WAIT_MS(input_value) | `esp32_freertos_task_wait_notification(MS, math_number(1000))` | `(ulTaskNotifyTake(pdTRUE, ticks) > 0)` |
| `esp32_freertos_queue_create` | Statement | VAR(field_input), QUEUE_LENGTH(field_number), DATA_TYPE(dropdown) | `esp32_freertos_queue_create("sensorQueue", 10, int)` | `sensorQueue = xQueueCreate(10, sizeof(int));` |
| `esp32_freertos_queue_send` | Statement | VAR(field_variable), DATA(input_value), DATA_TYPE(dropdown), WAIT_MODE(dropdown), WAIT_MS(input_value) | `esp32_freertos_queue_send(variables_get($sensorQueue), math_number(42), int, MS, math_number(1000))` | `xQueueSend(queue, &temp, ticks);` |
| `esp32_freertos_queue_receive_do` | Statement | VAR(field_variable), DATA_TYPE(dropdown), ITEM_VAR(field_input), WAIT_MODE(dropdown), WAIT_MS(input_value), HANDLER(input_statement) | `esp32_freertos_queue_receive_do(variables_get($sensorQueue), int, "queueValue", FOREVER, math_number(0)) @HANDLER: ...` | `if (xQueueReceive(..., &queueValue, ticks) == pdPASS) { ... }` |
| `esp32_freertos_queue_messages_waiting` | Value | VAR(field_variable) | `esp32_freertos_queue_messages_waiting(variables_get($sensorQueue))` | `uxQueueMessagesWaiting(sensorQueue)` |
| `esp32_freertos_semaphore_create` | Statement | VAR(field_input), SEMAPHORE_TYPE(dropdown), MAX_COUNT(field_number), INITIAL_COUNT(field_number) | `esp32_freertos_semaphore_create("syncSem", COUNTING, 1, 0)` | `syncSem = xSemaphoreCreateCounting(1, 0);` |
| `esp32_freertos_semaphore_take` | Value | VAR(field_variable), WAIT_MODE(dropdown), WAIT_MS(input_value) | `esp32_freertos_semaphore_take(variables_get($syncSem), FOREVER, math_number(0))` | `(xSemaphoreTake(syncSem, ticks) == pdTRUE)` |
| `esp32_freertos_semaphore_give` | Statement | VAR(field_variable) | `esp32_freertos_semaphore_give(variables_get($syncSem))` | `xSemaphoreGive(syncSem);` |
| `esp32_freertos_semaphore_give_from_isr` | Statement | VAR(field_variable) | `esp32_freertos_semaphore_give_from_isr(variables_get($syncSem))` | `xSemaphoreGiveFromISR(...); portYIELD_FROM_ISR();` |
| `esp32_freertos_attach_interrupt` | Hat | PIN(field_number), MODE(dropdown), ISR_CODE(input_statement) | `esp32_freertos_attach_interrupt(2, RISING) @ISR_CODE: ...` | `attachInterrupt(digitalPinToInterrupt(2), handler, RISING);` |
| `esp32_freertos_get_tick_count` | Value | none | `esp32_freertos_get_tick_count()` | `xTaskGetTickCount()` |
| `esp32_freertos_get_task_count` | Value | none | `esp32_freertos_get_task_count()` | `uxTaskGetNumberOfTasks()` |
| `esp32_freertos_get_task_name` | Value | VAR(field_variable) | `esp32_freertos_get_task_name(variables_get($TaskBlink))` | `pcTaskGetName(TaskBlinkHandle)` |
| `esp32_freertos_get_current_task_name` | Value | none | `esp32_freertos_get_current_task_name()` | `pcTaskGetName(NULL)` |
| `esp32_freertos_get_stack_high_water_mark` | Value | VAR(field_variable) | `esp32_freertos_get_stack_high_water_mark(variables_get($TaskBlink))` | `uxTaskGetStackHighWaterMark(TaskBlinkHandle)` |
| `esp32_freertos_get_current_stack_high_water_mark` | Value | none | `esp32_freertos_get_current_stack_high_water_mark()` | `uxTaskGetStackHighWaterMark(NULL)` |
| `esp32_freertos_get_free_heap_size` | Value | none | `esp32_freertos_get_free_heap_size()` | `xPortGetFreeHeapSize()` |
| `esp32_freertos_get_current_core` | Value | none | `esp32_freertos_get_current_core()` | `xPortGetCoreID()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CORE | AUTO, 0, 1 | AUTO uses `xTaskCreate`; 0/1 use `xTaskCreatePinnedToCore`. Core 1 is only valid on dual-core ESP32 variants. |
| DATA_TYPE | int, long, uint32_t, int32_t, float, double, uint8_t, bool | Queue item C/C++ type; send/receive must match queue creation. |
| WAIT_MODE | MS, FOREVER | Convert WAIT_MS to ticks with `pdMS_TO_TICKS`, or use `portMAX_DELAY`. |
| SEMAPHORE_TYPE | BINARY, MUTEX, COUNTING | Binary semaphore, mutex, or counting semaphore. |
| MODE | LOW, RISING, FALLING, CHANGE | Arduino external interrupt trigger mode. |

## ABS Examples

### Blink Task
```text
arduino_setup()
    esp32_freertos_task_create("TaskBlink", 4096, 1, AUTO)

esp32_freertos_task_function(variables_get($TaskBlink))
    io_digitalwrite(...)
    esp32_freertos_task_delay_ms(math_number(1000))
```

### Pinned Task
```text
arduino_setup()
    esp32_freertos_task_create("TaskCore0", 4096, 1, 0)
```

## Notes

1. ESP32 Arduino already runs on FreeRTOS, so this library does not generate `vTaskStartScheduler()`.
2. ESP-IDF/ESP32 task stack size is specified in bytes, unlike many vanilla FreeRTOS ports that use stack words.
3. `esp32_freertos_task_create("TaskBlink", ...)` creates Blockly variable `$TaskBlink` and C handle `TaskBlinkHandle`.
4. Queue send uses a typed temporary variable so literal inputs compile correctly.
5. Queue item types are primitive scalar types only; avoid queuing C++ objects by value.
6. Binary semaphores are created empty. Use `esp32_freertos_semaphore_give` once if the initial state should be available.
7. Use FromISR blocks only inside interrupt handlers.
8. Pinning to core 1 should be used only on dual-core ESP32 boards.