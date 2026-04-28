# STM32 FreeRTOS

STM32 Arduino FreeRTOS Blockly library for tasks, queues, semaphores, notifications, interrupts, and runtime status.

## Library Info
- **Name**: @aily-project/lib-stm32-freertos
- **Version**: 1.0.0
- **Core**: STMicroelectronics:stm32

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `stm32_freertos_task_create` | Statement | VAR(field_input), STACK_SIZE(field_number), PRIORITY(field_number) | `stm32_freertos_task_create("TaskBlink", 256, 2)` | `xTaskCreate(TaskBlink, "TaskBlink", 256, NULL, 2, &TaskBlinkHandle);` |
| `stm32_freertos_task_function` | Hat | VAR(field_variable), TASK_CODE(input_statement) | `stm32_freertos_task_function(variables_get($TaskBlink)) @TASK_CODE: ...` | `void TaskBlink(void *pvParameters) { for (;;) { ... } }` |
| `stm32_freertos_start_scheduler` | Statement | none | `stm32_freertos_start_scheduler()` | `vTaskStartScheduler();` |
| `stm32_freertos_task_delay_ms` | Statement | MS(input_value) | `stm32_freertos_task_delay_ms(math_number(1000))` | `vTaskDelay(pdMS_TO_TICKS(ms));` |
| `stm32_freertos_task_delay_ticks` | Statement | TICKS(input_value) | `stm32_freertos_task_delay_ticks(math_number(1))` | `vTaskDelay(ticks);` |
| `stm32_freertos_task_suspend` | Statement | VAR(field_variable) | `stm32_freertos_task_suspend(variables_get($TaskBlink))` | `vTaskSuspend(TaskBlinkHandle);` |
| `stm32_freertos_task_resume` | Statement | VAR(field_variable) | `stm32_freertos_task_resume(variables_get($TaskBlink))` | `vTaskResume(TaskBlinkHandle);` |
| `stm32_freertos_task_delete` | Statement | VAR(field_variable) | `stm32_freertos_task_delete(variables_get($TaskBlink))` | `vTaskDelete(TaskBlinkHandle); TaskBlinkHandle = NULL;` |
| `stm32_freertos_task_delete_current` | Statement | none | `stm32_freertos_task_delete_current()` | `vTaskDelete(NULL);` |
| `stm32_freertos_task_notify` | Statement | VAR(field_variable) | `stm32_freertos_task_notify(variables_get($TaskBlink))` | `xTaskNotifyGive(TaskBlinkHandle);` |
| `stm32_freertos_task_notify_from_isr` | Statement | VAR(field_variable) | `stm32_freertos_task_notify_from_isr(variables_get($TaskBlink))` | `vTaskNotifyGiveFromISR(...); portYIELD_FROM_ISR(...);` |
| `stm32_freertos_task_wait_notification` | Value | WAIT_MODE(dropdown), WAIT_MS(input_value) | `stm32_freertos_task_wait_notification(MS, math_number(1000))` | `(ulTaskNotifyTake(pdTRUE, ticks) > 0)` |
| `stm32_freertos_queue_create` | Statement | VAR(field_input), QUEUE_LENGTH(field_number), DATA_TYPE(dropdown) | `stm32_freertos_queue_create("sensorQueue", 10, int)` | `sensorQueue = xQueueCreate(10, sizeof(int));` |
| `stm32_freertos_queue_send` | Statement | VAR(field_variable), DATA(input_value), DATA_TYPE(dropdown), WAIT_MODE(dropdown), WAIT_MS(input_value) | `stm32_freertos_queue_send(variables_get($sensorQueue), math_number(42), int, MS, math_number(1000))` | `xQueueSend(queue, &temp, ticks);` |
| `stm32_freertos_queue_receive_do` | Statement | VAR(field_variable), DATA_TYPE(dropdown), ITEM_VAR(field_input), WAIT_MODE(dropdown), WAIT_MS(input_value), HANDLER(input_statement) | `stm32_freertos_queue_receive_do(variables_get($sensorQueue), int, "queueValue", FOREVER, math_number(0)) @HANDLER: ...` | `if (xQueueReceive(..., &queueValue, ticks) == pdPASS) { ... }` |
| `stm32_freertos_queue_messages_waiting` | Value | VAR(field_variable) | `stm32_freertos_queue_messages_waiting(variables_get($sensorQueue))` | `uxQueueMessagesWaiting(sensorQueue)` |
| `stm32_freertos_semaphore_create` | Statement | VAR(field_input), SEMAPHORE_TYPE(dropdown), MAX_COUNT(field_number), INITIAL_COUNT(field_number) | `stm32_freertos_semaphore_create("syncSem", COUNTING, 1, 0)` | `syncSem = xSemaphoreCreateCounting(1, 0);` |
| `stm32_freertos_semaphore_take` | Value | VAR(field_variable), WAIT_MODE(dropdown), WAIT_MS(input_value) | `stm32_freertos_semaphore_take(variables_get($syncSem), FOREVER, math_number(0))` | `(xSemaphoreTake(syncSem, ticks) == pdTRUE)` |
| `stm32_freertos_semaphore_give` | Statement | VAR(field_variable) | `stm32_freertos_semaphore_give(variables_get($syncSem))` | `xSemaphoreGive(syncSem);` |
| `stm32_freertos_semaphore_give_from_isr` | Statement | VAR(field_variable) | `stm32_freertos_semaphore_give_from_isr(variables_get($syncSem))` | `xSemaphoreGiveFromISR(...); portYIELD_FROM_ISR(...);` |
| `stm32_freertos_attach_interrupt` | Hat | PIN(field_number), MODE(dropdown), ISR_CODE(input_statement) | `stm32_freertos_attach_interrupt(2, RISING) @ISR_CODE: ...` | `attachInterrupt(digitalPinToInterrupt(2), handler, RISING);` |
| `stm32_freertos_get_tick_count` | Value | none | `stm32_freertos_get_tick_count()` | `xTaskGetTickCount()` |
| `stm32_freertos_get_task_count` | Value | none | `stm32_freertos_get_task_count()` | `uxTaskGetNumberOfTasks()` |
| `stm32_freertos_get_task_name` | Value | VAR(field_variable) | `stm32_freertos_get_task_name(variables_get($TaskBlink))` | `pcTaskGetName(TaskBlinkHandle)` |
| `stm32_freertos_get_current_task_name` | Value | none | `stm32_freertos_get_current_task_name()` | `pcTaskGetName(NULL)` |
| `stm32_freertos_get_stack_high_water_mark` | Value | VAR(field_variable) | `stm32_freertos_get_stack_high_water_mark(variables_get($TaskBlink))` | `uxTaskGetStackHighWaterMark(TaskBlinkHandle)` |
| `stm32_freertos_get_idle_stack_high_water_mark` | Value | none | `stm32_freertos_get_idle_stack_high_water_mark()` | `uxTaskGetStackHighWaterMark(xTaskGetIdleTaskHandle())` |
| `stm32_freertos_get_free_heap_size` | Value | none | `stm32_freertos_get_free_heap_size()` | `xPortGetFreeHeapSize()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DATA_TYPE | int, long, uint32_t, int32_t, float, double, uint8_t, bool | Queue item C/C++ type; send/receive must match queue creation |
| WAIT_MODE | MS, FOREVER | Convert WAIT_MS to ticks with `pdMS_TO_TICKS`, or use `portMAX_DELAY` |
| SEMAPHORE_TYPE | BINARY, MUTEX, COUNTING | Binary semaphore, mutex, or counting semaphore |
| MODE | LOW, RISING, FALLING, CHANGE | Arduino external interrupt trigger mode |

## ABS Examples

### Blink Task
```text
arduino_setup()
    stm32_freertos_task_create("TaskBlink", 256, 2)

stm32_freertos_task_function(variables_get($TaskBlink))
    io_digitalwrite(...)
    stm32_freertos_task_delay_ms(math_number(1000))
```

### Semaphore Signal
```text
arduino_setup()
    stm32_freertos_semaphore_create("syncSem", COUNTING, 1, 0)
    stm32_freertos_task_create("TaskWait", 256, 2)

stm32_freertos_task_function(variables_get($TaskWait))
    controls_if()
        @IF0: stm32_freertos_semaphore_take(variables_get($syncSem), FOREVER, math_number(0))
        @DO0:
            serial_println(Serial, text("signal"))
```

## Notes

1. `stm32_freertos_task_create("TaskBlink", ...)` creates Blockly variable `$TaskBlink` and C handle `TaskBlinkHandle`.
2. Task creation automatically adds `vTaskStartScheduler()` at the end of `setup()`; the explicit scheduler block uses the same dedupe key.
3. `stm32_freertos_task_function` and `stm32_freertos_attach_interrupt` are Hat blocks and return no inline code.
4. Queue send uses a typed temporary variable so literal inputs compile correctly.
5. Binary semaphores are created empty. Use `stm32_freertos_semaphore_give` once if the initial state should be available.
6. Use FromISR blocks only inside interrupt handlers.
7. STM32 idle loop has a small stack; keep `arduino_loop()` empty or non-blocking after the scheduler starts.
