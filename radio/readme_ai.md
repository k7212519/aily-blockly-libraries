# RadioLib LoRa Radio

Universal LoRa wireless communication library supporting SX127x, SX126x, SX128x and LLCC68 radio modules.

## Library Info
- **Name**: @aily-project/lib-radiolib
- **Version**: 7.6.0

## Block Definitions

| Block Type | Connection | Parameters (args0 order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `radiolib_lora_init` | Statement | CHIP(dropdown), VAR(field_input), CS(input_value), IRQ(input_value), RST(input_value), GPIO(input_value), FREQ(input_value), POWER(input_value) | `radiolib_lora_init(SX1278, "radio", math_number(5), math_number(2), math_number(14), math_number(4), math_number(433.0), math_number(10))` | `SX1278 radio = new Module(5, 2, 14, 4); radio.begin(433.0); radio.setOutputPower(10);` |
| `radiolib_set_bandwidth` | Statement | VAR(field_variable), BW(dropdown) | `radiolib_set_bandwidth($radio, 125.0)` | `radio.setBandwidth(125.0);` |
| `radiolib_set_spreading_factor` | Statement | VAR(field_variable), SF(dropdown) | `radiolib_set_spreading_factor($radio, 9)` | `radio.setSpreadingFactor(9);` |
| `radiolib_set_coding_rate` | Statement | VAR(field_variable), CR(dropdown) | `radiolib_set_coding_rate($radio, 7)` | `radio.setCodingRate(7);` |
| `radiolib_set_frequency` | Statement | VAR(field_variable), FREQ(input_value) | `radiolib_set_frequency($radio, math_number(868.0))` | `radio.setFrequency(868.0);` |
| `radiolib_set_power` | Statement | VAR(field_variable), POWER(input_value) | `radiolib_set_power($radio, math_number(17))` | `radio.setOutputPower(17);` |
| `radiolib_set_sync_word` | Statement | VAR(field_variable), SYNC(input_value) | `radiolib_set_sync_word($radio, math_number(18))` | `radio.setSyncWord(18);` |
| `radiolib_transmit` | Statement | VAR(field_variable), MESSAGE(input_value) | `radiolib_transmit($radio, text("Hello"))` | `radio.transmit("Hello");` |
| `radiolib_receive` | Value(String) | VAR(field_variable) | `radiolib_receive($radio)` | `_rl_recv_radio()` → helper returns received string or "" |
| `radiolib_on_receive` | Hat | VAR(field_variable), HANDLER(input_statement) | `radiolib_on_receive($radio) @HANDLER: action()` | ISR + loop flag check + readData |
| `radiolib_start_receive` | Statement | VAR(field_variable) | `radiolib_start_receive($radio)` | `radio.startReceive();` |
| `radiolib_received_data` | Value(String) | VAR(field_variable) | `radiolib_received_data($radio)` | `_rl_data_radio` |
| `radiolib_received_rssi` | Value(Number) | VAR(field_variable) | `radiolib_received_rssi($radio)` | `_rl_rssi_radio` |
| `radiolib_received_snr` | Value(Number) | VAR(field_variable) | `radiolib_received_snr($radio)` | `_rl_snr_radio` |
| `radiolib_get_rssi` | Value(Number) | VAR(field_variable) | `radiolib_get_rssi($radio)` | `radio.getRSSI()` |
| `radiolib_get_snr` | Value(Number) | VAR(field_variable) | `radiolib_get_snr($radio)` | `radio.getSNR()` |
| `radiolib_sleep` | Statement | VAR(field_variable) | `radiolib_sleep($radio)` | `radio.sleep();` |
| `radiolib_standby` | Statement | VAR(field_variable) | `radiolib_standby($radio)` | `radio.standby();` |

**Variable**: `radiolib_lora_init("varName", ...)` creates variable `$varName` of type RadioLib; reference it later with `variables_get($varName)`.

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| CHIP | SX1278, SX1276, SX1262, SX1268, LLCC68, SX1280 | Radio chip type |
| BW | 7.8, 10.4, 15.6, 20.8, 31.25, 41.7, 62.5, 125.0, 250.0, 500.0 | Bandwidth in kHz |
| SF | 6, 7, 8, 9, 10, 11, 12 | Spreading factor |
| CR | 5 (4/5), 6 (4/6), 7 (4/7), 8 (4/8) | Coding rate denominator |

## ABS Examples

### Blocking Transmitter
```
arduino_setup()
    radiolib_lora_init(SX1278, "radio", math_number(5), math_number(2), math_number(14), math_number(4), math_number(433.0), math_number(10))
    serial_begin(Serial, 9600)

arduino_loop()
    radiolib_transmit($radio, text("Hello LoRa!"))
    time_delay(math_number(2000))
```

### Blocking Receiver
```
arduino_setup()
    radiolib_lora_init(SX1278, "radio", math_number(5), math_number(2), math_number(14), math_number(4), math_number(433.0), math_number(10))
    serial_begin(Serial, 9600)

arduino_loop()
    variables_set($msg, radiolib_receive($radio))
    controls_if()
        @IF0: logic_compare(variables_get($msg), NEQ, text(""))
        @DO0:
            serial_println(Serial, variables_get($msg))
            serial_println(Serial, radiolib_get_rssi($radio))
```

### Interrupt Receiver
```
arduino_setup()
    radiolib_lora_init(SX1278, "radio", math_number(5), math_number(2), math_number(14), math_number(4), math_number(433.0), math_number(10))
    serial_begin(Serial, 9600)

radiolib_on_receive($radio)
    @HANDLER:
        serial_println(Serial, radiolib_received_data($radio))
        serial_println(Serial, radiolib_received_rssi($radio))
        serial_println(Serial, radiolib_received_snr($radio))
```

## Notes

1. **Pin mapping**: SX127x: IRQ=DIO0, GPIO=DIO1(optional); SX126x: IRQ=DIO1, GPIO=BUSY(required)
2. **Matching config**: Both transmitter and receiver must use the same frequency, bandwidth, spreading factor, and coding rate
3. **Sync word**: Default is 0x12 (decimal 18). LoRaWAN uses 0x34. Both sides must match
4. **Frequency ranges**: SX127x: 137-525MHz, SX126x: 150-960MHz, SX1280: 2400-2500MHz
5. **Power ranges**: SX127x: 2-17dBm (PA_BOOST), SX126x: -9 to 22dBm
6. **Blocking vs Interrupt**: Use blocking mode for simple send/receive. Use interrupt mode (`radiolib_on_receive`) for non-blocking continuous reception
7. **Callback context**: `radiolib_received_data/rssi/snr` blocks only work inside `radiolib_on_receive` callback
