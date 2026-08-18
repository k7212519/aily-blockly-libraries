# ESP32 NetBIOS

Provides ESP32 NetBIOS name service so devices on the local network can discover the board by hostname.

## Library Info

- **Name**: `@aily-project/lib-esp32-netbios`
- **Version**: 0.0.1

## Scope and Requirements

- Establish Wi-Fi or Ethernet connectivity before starting NetBIOS.
- Use a hostname that is valid on the local network.
- The generator adds the required ESP32 SDK header and shared service object.

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|-------------------------------|------------|----------------|
| `esp32_netbios_begin` | Value | NAME(input_value) | `esp32_netbios_begin(text("value"))` | `NBNS.begin("value")` |
| `esp32_netbios_end` | Statement | (none) | `esp32_netbios_end()` | `NBNS.end();` |

## ABS Examples

```abs
arduino_setup()
    serial_begin(Serial, 115200)
    serial_println(Serial, esp32_netbios_begin(text("my-device")))
```

## Notes

1. Call `esp32_netbios_begin` after the network connection is ready.
2. Call `esp32_netbios_end` before intentionally shutting down or replacing the service.
