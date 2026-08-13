# Cycore IoT generation notes

- Always create exactly one `cycore_iot_begin` block.
- Use the dashboard widget `bindingKey` verbatim in callback/report blocks.
- Never expose MQTT host, port, shared credentials, TLS or base topic as Blockly inputs. The shared MQTT connection settings are maintained internally by the library.
- Put every report item inside one `cycore_iot_report_container`. Its `INTERVAL` dropdown supports 1000, 2000, 3000, 4000 or 5000 ms and defaults to 2000 ms. Report items only record fields; the container queues all recorded fields in one telemetry message and accepts at most 64 fields.
- A report container owns a local `CycoreIoT::Telemetry`, so containers may run concurrently in FreeRTOS tasks. `Telemetry::publish()` only enqueues a serialized message.
- `cycoreIoT.loop()` is injected automatically, must run frequently, and must be called from only one task because it is the sole owner of MQTT I/O.
- The device subscribes only to its own command topic and publishes only its own telemetry, event, status and ack topics.
