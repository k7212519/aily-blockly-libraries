# TinyGSM

A small Arduino client library for GSM, LTE, NB-IoT, and WiFi AT modems.

## Library Info

- **Name**: @aily-project/lib-tinygsm
- **Version**: 1.0.0
- **Upstream Version**: 0.12.0
- **Source**: https://github.com/vshymanskyy/TinyGSM

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `tinygsm_setup` | Statement | MODEM(dropdown), SERIAL(dropdown), BAUD(input_value) | `tinygsm_setup(TINY_GSM_MODEM_SIM800, SERIAL, math_number(9600))` | `SerialAT.begin(1);` |
| `tinygsm_restart` | Statement | (none) | `tinygsm_restart()` | `modem.restart();` |
| `tinygsm_wait_network` | Value | TIMEOUT(input_value) | `tinygsm_wait_network(math_number(1))` | `modem.waitForNetwork(1)` |
| `tinygsm_gprs_connect` | Value | APN(input_value), USER(input_value), PASS(input_value) | `tinygsm_gprs_connect(text("value"), text("value"), text("value"))` | `modem.gprsConnect("value", "value", "value")` |
| `tinygsm_is_network_connected` | Value | (none) | `tinygsm_is_network_connected()` | `modem.isNetworkConnected()` |
| `tinygsm_is_gprs_connected` | Value | (none) | `tinygsm_is_gprs_connected()` | `modem.isGprsConnected()` |
| `tinygsm_modem_info` | Value | (none) | `tinygsm_modem_info()` | `modem.getModemInfo()` |
| `tinygsm_local_ip` | Value | (none) | `tinygsm_local_ip()` | `modem.localIP().toString()` |
| `tinygsm_client_connect` | Value | HOST(input_value), PORT(input_value) | `tinygsm_client_connect(text("value"), math_number(1))` | `tinyGsmClient.connect("value", 1)` |
| `tinygsm_client_print` | Statement | TEXT(input_value) | `tinygsm_client_print(text("value"))` | `tinyGsmClient.print("value");` |
| `tinygsm_client_available` | Value | (none) | `tinygsm_client_available()` | `tinyGsmClient.available()` |
| `tinygsm_client_read` | Value | (none) | `tinygsm_client_read()` | `tinyGsmClient.read()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODEM | SIM800, SIM7600, SIM7000, SIM7080, A7672X, BG96, ESP8266 AT | TinyGSM modem macro. |
| SERIAL | ${board.serialPort} | Serial port connected to the modem AT interface. |

## Notes

1. The setup block must be generated before TinyGsmClient.h so it adds modem macros as includes.
2. Power/reset pins are hardware-specific and should be configured with normal GPIO blocks if needed.
3. TCP blocks use a shared TinyGsmClient named tinyGsmClient.
## ABS Examples

### Minimal Executable Usage

```abs
arduino_setup()
    tinygsm_setup(TINY_GSM_MODEM_SIM800, SERIAL, math_number(9600))
```
