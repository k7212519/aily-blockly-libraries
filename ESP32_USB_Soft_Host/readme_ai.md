# ESP32 USB Soft Host

Software USB low-speed host blocks for ESP32 GPIO pins.

## Library Info
- **Name**: @aily-project/lib-esp32-usb-soft-host
- **Version**: 0.1.5

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `esp32_usb_soft_host_begin` | Statement | DP0(input_value), DM0(input_value), DP1(input_value), DM1(input_value), DP2(input_value), DM2(input_value), DP3(input_value), DM3(input_value) | `esp32_usb_soft_host_begin(math_number(16), math_number(17), math_number(-1), math_number(-1), math_number(-1), math_number(-1), math_number(-1), math_number(-1))` | `usb_pins_config_t ailyUsbSoftHostPins = {1, 1, 1, 1, 1, 1, 1, 1}; ↵ USH.init(ailyUsbSoftHostPins);` |
| `esp32_usb_soft_host_task_options` | Statement | CORE(dropdown), PRIORITY(input_value), BLINK_PIN(input_value), ISR_FLAG(dropdown) | `esp32_usb_soft_host_task_options(1, math_number(5), math_number(22), ESP_INTR_FLAG_IRAM)` | `USH.setTaskCore(0); ↵ USH.setTaskPriority(1); ↵ USH.setBlinkPin((gpio_num_t)1); ↵ USH.setISRAllocFlag(ESP_INTR_FLAG_IRAM);` |
| `esp32_usb_soft_host_descriptor_log` | Statement | (none) | `esp32_usb_soft_host_descriptor_log()` | `USH.setOnConfigDescCB(Default_USB_ConfigDescCB); ↵ USH.setOnIfaceDescCb(Default_USB_IfaceDescCb); ↵ USH.setOnHIDDevDescCb(Default_USB_HIDDevDescCb); ↵ USH.setOnEPDescCb(Default_USB_EPDescCb);` |
| `esp32_usb_soft_host_on_detect` | Statement | PORT_VAR(field_input), VENDOR_VAR(field_input), PRODUCT_VAR(field_input), CLASS_VAR(field_input), HANDLER(input_statement) | `esp32_usb_soft_host_on_detect("usbPort", "usbVendorId", "usbProductId", "usbDeviceClass")` | `USH.setOndetectCb(ailyUsbSoftHostOnDetect);` |
| `esp32_usb_soft_host_on_disconnect` | Statement | PORT_VAR(field_input), HANDLER(input_statement) | `esp32_usb_soft_host_on_disconnect("usbPort")` | `USH.setOndisconnectCb(ailyUsbSoftHostOnDisconnect);` |
| `esp32_usb_soft_host_on_data` | Statement | PORT_VAR(field_input), LEN_VAR(field_input), HEX_VAR(field_input), HANDLER(input_statement) | `esp32_usb_soft_host_on_data("usbPort", "usbDataLength", "usbDataHex")` | `USH.setPrintCb(ailyUsbSoftHostOnData);` |
| `esp32_usb_soft_host_on_tick` | Statement | HANDLER(input_statement) | `esp32_usb_soft_host_on_tick()` | `USH.setTaskTicker(ailyUsbSoftHostOnTick);` |
| `esp32_usb_soft_host_timer` | Statement | ACTION(dropdown) | `esp32_usb_soft_host_timer(PAUSE)` | `USH.TimerPause();` |
| `esp32_usb_soft_host_last_value` | Value Number | VALUE(dropdown) | `esp32_usb_soft_host_last_value(PORT)` | `ailyUsbSoftHostLastPort` |
| `esp32_usb_soft_host_last_data_hex` | Value String | (none) | `esp32_usb_soft_host_last_data_hex()` | `ailyUsbSoftHostLastDataHex` |
| `esp32_usb_soft_host_data_byte` | Value Number | INDEX(input_value) | `esp32_usb_soft_host_data_byte(math_number(0))` | `ailyUsbSoftHostDataByte(1)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CORE | `0`, `1` | FreeRTOS core for the USB host task |
| ISR_FLAG | `ESP_INTR_FLAG_IRAM`, `ESP_INTR_FLAG_LEVEL1`, `ESP_INTR_FLAG_LEVEL2`, `ESP_INTR_FLAG_LEVEL3` | Interrupt allocation flag |
| ACTION | `PAUSE`, `RESUME` | Timer control action |
| VALUE | `PORT`, `LENGTH`, `VENDOR`, `PRODUCT`, `CLASS` | Last-event state field |

## ABS Examples

```text
arduino_setup()
    esp32_usb_soft_host_on_data("usbPort", "usbDataLength", "usbDataHex")
        @HANDLER:
            serial_println(Serial, variables_get($usbDataHex))
    esp32_usb_soft_host_begin(math_number(16), math_number(17), math_number(-1), math_number(-1), math_number(-1), math_number(-1), math_number(-1), math_number(-1))
```

## Notes

Use `-1` for unused D+/D- pairs. Event blocks should be placed before initialization when possible.
