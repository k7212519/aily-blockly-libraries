# RadioLib LoRa Radio

Universal wireless communication library supporting LoRa (SX127x/SX126x/SX128x/LLCC68) and other RF modules

## Library Info
- **Name**: @aily-project/lib-radiolib
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `radiolib_lora_init` | Statement | CHIP(dropdown), VAR(field_input), CS(input_value), IRQ(input_value), RST(input_value), GPIO(input_value), FREQ(input_value), POWER(input_value) | `radiolib_lora_init(SX1278, "radio", math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `{ ↵ int _rl_state = radio.begin(1); ↵ if (_rl_state != RADIOLIB_ERR_NONE) { ↵ Serial.print(F("[RadioLib] Init failed, code: ")); ↵ Serial.println(_rl_state); ↵ while (true) { delay(10); } ↵ } ↵ radio.setOutputPower(1); ↵ }` |
| `radiolib_set_bandwidth` | Statement | VAR(field_variable), BW(dropdown) | `radiolib_set_bandwidth($radio, "7.8")` | `radio.setBandwidth(7.8);` |
| `radiolib_set_spreading_factor` | Statement | VAR(field_variable), SF(dropdown) | `radiolib_set_spreading_factor($radio, "6")` | `radio.setSpreadingFactor(6);` |
| `radiolib_set_coding_rate` | Statement | VAR(field_variable), CR(dropdown) | `radiolib_set_coding_rate($radio, "5")` | `radio.setCodingRate(5);` |
| `radiolib_set_frequency` | Statement | VAR(field_variable), FREQ(input_value) | `radiolib_set_frequency($radio, math_number(0))` | `radio.setFrequency(1);` |
| `radiolib_set_power` | Statement | VAR(field_variable), POWER(input_value) | `radiolib_set_power($radio, math_number(0))` | `radio.setOutputPower(1);` |
| `radiolib_set_sync_word` | Statement | VAR(field_variable), SYNC(input_value) | `radiolib_set_sync_word($radio, math_number(0))` | `radio.setSyncWord(1);` |
| `radiolib_transmit` | Statement | VAR(field_variable), MESSAGE(input_value) | `radiolib_transmit($radio, text("value"))` | `radio.transmit("value");` |
| `radiolib_receive` | Value | VAR(field_variable) | `radiolib_receive($radio)` | `_rl_recv_radio()` |
| `radiolib_on_receive` | Hat | VAR(field_variable), HANDLER(input_statement) | `radiolib_on_receive($radio)` | `volatile bool _rl_rxFlag_radio = false; ↵ String _rl_data_radio; ↵ float _rl_rssi_radio = 0; ↵ float _rl_snr_radio = 0; ↵ #if defined(ESP8266) &#124;&#124; defined(ESP32) ↵ ICACHE_RAM_ATTR ↵ #endif ↵ void _rl_isr_radio(void) { ↵ _rl_rxFlag_radio = true; ↵ } ↵ radio.setPacketReceivedAction(_rl_isr_radio); ↵ radio.startReceive(); ↵ if (_rl_rxFlag_radio) { ↵ _rl_rxFlag_radio = false; ↵ String _rl_str; ↵ int _rl_state = radio.readData(_rl_str); ↵ if (_rl_state == RADIOLIB_ERR_NONE) { ↵ _rl_data_radio = _rl_str; ↵ _rl_rssi_radio = radio.getRSSI(); ↵ _rl_snr_radio = radio.getSNR(); ↵ } ↵ radio.startReceive(); ↵ }` |
| `radiolib_start_receive` | Statement | VAR(field_variable) | `radiolib_start_receive($radio)` | `radio.startReceive();` |
| `radiolib_received_data` | Value | VAR(field_variable) | `radiolib_received_data($radio)` | `_rl_data_radio` |
| `radiolib_received_rssi` | Value | VAR(field_variable) | `radiolib_received_rssi($radio)` | `_rl_rssi_radio` |
| `radiolib_received_snr` | Value | VAR(field_variable) | `radiolib_received_snr($radio)` | `_rl_snr_radio` |
| `radiolib_get_rssi` | Value | VAR(field_variable) | `radiolib_get_rssi($radio)` | `radio.getRSSI()` |
| `radiolib_get_snr` | Value | VAR(field_variable) | `radiolib_get_snr($radio)` | `radio.getSNR()` |
| `radiolib_sleep` | Statement | VAR(field_variable) | `radiolib_sleep($radio)` | `radio.sleep();` |
| `radiolib_standby` | Statement | VAR(field_variable) | `radiolib_standby($radio)` | `radio.standby();` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CHIP | SX1278, SX1276, SX1262, SX1268, LLCC68, SX1280 | radiolib_lora_init |
| BW | 7.8, 10.4, 15.6, 20.8, 31.25, 41.7, 62.5, 125.0, 250.0, 500.0 | radiolib_set_bandwidth |
| SF | 6, 7, 8, 9, 10, 11, 12 | radiolib_set_spreading_factor |
| CR | 5, 6, 7, 8 | radiolib_set_coding_rate |

## ABS Examples

### Basic Usage
```
arduino_setup()
    radiolib_lora_init(SX1278, "radio", math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, radiolib_receive($radio))
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `radiolib_lora_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
