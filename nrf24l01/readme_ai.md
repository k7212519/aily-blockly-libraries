# nRF24L01 Radio

RF24-based nRF24L01(+) 2.4 GHz radio blocks for configuration, addressing, transmit, and receive workflows.

## Library Info
- **Name**: @aily-project/lib-nrf24l01
- **Version**: 0.1.0
- **Author**: TMRh20 / Aily Project
- **Source**: https://github.com/nRF24/RF24
- **License**: GPL-2.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `nrf24l01_init` | Statement | VAR(field_input), CE(dropdown), CSN(dropdown) | `nrf24l01_init("radio", "7", "8")` | `radio.begin(); ↵ radio.setAddressWidth(5); ↵ radio.enableDynamicPayloads();` |
| `nrf24l01_set_radio_parameters` | Statement | VAR(field_variable), CHANNEL(input_value), DATA_RATE(dropdown), PA_LEVEL(dropdown) | `nrf24l01_set_radio_parameters($radio, math_number(76), RF24_1MBPS, RF24_PA_LOW)` | `radio.setChannel((uint8_t)(1)); ↵ radio.setDataRate(RF24_250KBPS); ↵ radio.setPALevel(RF24_PA_MIN);` |
| `nrf24l01_set_retries` | Statement | VAR(field_variable), DELAY(input_value), COUNT(input_value) | `nrf24l01_set_retries($radio, math_number(5), math_number(15))` | `radio.setRetries((uint8_t)(1), (uint8_t)(1));` |
| `nrf24l01_set_auto_ack` | Statement | VAR(field_variable), ENABLED(input_value) | `nrf24l01_set_auto_ack($radio, logic_boolean(TRUE))` | `radio.setAutoAck((bool)(true));` |
| `nrf24l01_open_writing_pipe` | Statement | VAR(field_variable), ADDRESS(input_value) | `nrf24l01_open_writing_pipe($radio, text("1Node"))` | `_nrf24l01_set_tx_address(radio, String("value"));` |
| `nrf24l01_open_reading_pipe` | Statement | VAR(field_variable), PIPE(field_number), ADDRESS(input_value) | `nrf24l01_open_reading_pipe($radio, 1, text("1Node"))` | `_nrf24l01_set_rx_address(radio, 1, String("value"));` |
| `nrf24l01_set_listening` | Statement | VAR(field_variable), MODE(dropdown) | `nrf24l01_set_listening($radio, START)` | `radio.startListening();` |
| `nrf24l01_send_text` | Statement | VAR(field_variable), TEXT(input_value) | `nrf24l01_send_text($radio, text("hello"))` | `_nrf24l01_last_send_radio = _nrf24l01_send_text(radio, String("value"));` |
| `nrf24l01_send_number` | Statement | VAR(field_variable), NUMBER(input_value) | `nrf24l01_send_number($radio, math_number(1.5))` | `_nrf24l01_last_send_radio = _nrf24l01_send_number(radio, (float)(1));` |
| `nrf24l01_available` | Value | VAR(field_variable) | `nrf24l01_available($radio)` | `radio.available(&_nrf24l01_received_pipe_radio)` |
| `nrf24l01_read_text` | Value | VAR(field_variable) | `nrf24l01_read_text($radio)` | `_nrf24l01_read_text(radio)` |
| `nrf24l01_read_number` | Value | VAR(field_variable) | `nrf24l01_read_number($radio)` | `_nrf24l01_read_number(radio)` |
| `nrf24l01_last_send_succeeded` | Value | VAR(field_variable) | `nrf24l01_last_send_succeeded($radio)` | `_nrf24l01_last_send_radio` |
| `nrf24l01_received_pipe` | Value | VAR(field_variable) | `nrf24l01_received_pipe($radio)` | `_nrf24l01_received_pipe_radio` |
| `nrf24l01_is_chip_connected` | Value | VAR(field_variable) | `nrf24l01_is_chip_connected($radio)` | `radio.isChipConnected()` |
| `nrf24l01_set_power_mode` | Statement | VAR(field_variable), MODE(dropdown) | `nrf24l01_set_power_mode($radio, DOWN)` | `radio.powerUp();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| DATA_RATE | RF24_250KBPS, RF24_1MBPS, RF24_2MBPS | Both peers must match. |
| PA_LEVEL | RF24_PA_MIN, RF24_PA_LOW, RF24_PA_HIGH, RF24_PA_MAX | Transmit power from -18 to 0 dBm. |
| MODE (listening) | START, STOP | Switches RX/TX mode. |
| MODE (power) | UP, DOWN | Wakes or powers down the radio. |
| PIPE | 0-5 | Receive pipe number; pipe 1 is recommended for simple links. |

## ABS Examples

### Receiver

```
arduino_setup()
    nrf24l01_init("radio", "7", "8")
    nrf24l01_set_radio_parameters($radio, math_number(76), RF24_1MBPS, RF24_PA_LOW)
    nrf24l01_open_reading_pipe($radio, 1, text("1Node"))
    nrf24l01_set_listening($radio, START)

arduino_loop()
    controls_if(nrf24l01_available($radio))
        serial_println(Serial, nrf24l01_read_text($radio))
```

## Notes

1. Address strings use their first 5 bytes; shorter values are padded with `0`.
2. Use matching text or number blocks on both peers. Reading consumes one payload.
3. Text is limited to 31 bytes plus a null terminator; RF24 payloads are at most 32 bytes.
4. Power the radio module from 3.3 V only.
