# HomeSpan

HomeKit Accessory Protocol implementation for ESP32 on Arduino.

## Library Info

- **Name**: @aily-project/lib-homespan
- **Version**: 1.0.0
- **Upstream Version**: 2.1.8
- **Source**: https://github.com/HomeSpan/HomeSpan

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `homespan_begin` | Statement | CATEGORY(dropdown), NAME(input_value), SERIAL(field_checkbox) | `homespan_begin(Category::Lighting, text("value"), TRUE)` | `homeSpan.begin(Category::Lighting, "value");` |
| `homespan_poll` | Statement | (none) | `homespan_poll()` | `homeSpan.poll();` |
| `homespan_accessory_info` | Statement | NAME(input_value), MANUFACTURER(input_value), MODEL(input_value) | `homespan_accessory_info(text("value"), text("value"), text("value"))` | `new SpanAccessory(); ↵ new Service::AccessoryInformation(); ↵ new Characteristic::Identify(); ↵ new Characteristic::Name("value"); ↵ new Characteristic::Manufacturer("value"); ↵ new Characteristic::Model("value");` |
| `homespan_lightbulb_service` | Statement | ON(field_checkbox) | `homespan_lightbulb_service(FALSE)` | `new Service::LightBulb(); ↵ new Characteristic::On(false);` |
| `homespan_led_lightbulb_service` | Statement | PIN(input_value) | `homespan_led_lightbulb_service(math_number(1))` | `new AilyHomeSpanLED(1);` |
| `homespan_outlet_service` | Statement | ON(field_checkbox) | `homespan_outlet_service(FALSE)` | `new Service::Outlet(); ↵ new Characteristic::On(false); ↵ new Characteristic::OutletInUse(true);` |
| `homespan_set_pairing_code` | Statement | CODE(field_input) | `homespan_set_pairing_code("11122333")` | `homeSpan.setPairingCode("11122333");` |
| `homespan_set_qr_id` | Statement | QRID(field_input) | `homespan_set_qr_id("HSPN")` | `homeSpan.setQRID("HSPN");` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CATEGORY | Category::Lighting, Bridges, Fans, Outlets, Sensors, Switches | HomeKit accessory category. |

## Notes

1. HomeSpan is ESP32-only.
2. Create at least one accessory information block before service blocks in each accessory.
3. The LED lightbulb helper implements update() and writes On state to the selected pin.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    homespan_begin(Category::Lighting, text("value"), TRUE)
```
