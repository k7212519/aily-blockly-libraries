# Cycore IoT generation notes

- Always create exactly one `cycore_iot_begin` block.
- Use the dashboard widget `bindingKey` verbatim in callback/report blocks.
- Never expose MQTT host, port, shared credentials, TLS or base topic as Blockly inputs. The shared MQTT connection settings are maintained internally by the library.
- Prefer batch telemetry when reporting several sensor values at the same interval; one message accepts at most 64 fields.
- `cycoreIoT.loop()` is injected automatically and must run frequently.
- The device subscribes only to its own command topic and publishes only its own telemetry, event, status and ack topics.
