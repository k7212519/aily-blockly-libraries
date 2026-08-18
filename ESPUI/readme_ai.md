# ESPUI Web UI

Create local ESP32 web control panels with buttons, sliders, graphs, and live updates

## Library Info
- **Name**: @aily-project/lib-espui
- **Version**: 2.2.4

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `espui_wifi_ap` | Statement | SSID(input_value), PASSWORD(input_value) | `espui_wifi_ap(text("value"), text("value"))` | `WiFi.mode(WIFI_AP); ↵ WiFi.softAP("value", "value");` |
| `espui_wifi_sta` | Statement | SSID(input_value), PASSWORD(input_value), TIMEOUT(input_value) | `espui_wifi_sta(text("value"), text("value"), math_number(1000))` | `WiFi.mode(WIFI_STA); ↵ WiFi.begin("value", "value"); ↵ { ↵ unsigned long espuiWiFiStart = millis(); ↵ while (WiFi.status() != WL_CONNECTED && (millis() - espuiWiFiStart) < (unsigned long)(1)) { ↵ delay(500); ↵ } ↵ }` |
| `espui_wifi_auto` | Statement | STA_SSID(input_value), STA_PASSWORD(input_value), AP_SSID(input_value), AP_PASSWORD(input_value), TIMEOUT(input_value) | `espui_wifi_auto(text("value"), text("value"), text("value"), text("value"), math_number(1000))` | `WiFi.mode(WIFI_STA); ↵ WiFi.begin("value", "value"); ↵ { ↵ unsigned long espuiWiFiStart = millis(); ↵ while (WiFi.status() != WL_CONNECTED && (millis() - espuiWiFiStart) < (unsigned long)(1)) { ↵ delay(500); ↵ } ↵ } ↵ if (WiFi.status() != WL_CONNECTED) { ↵ WiFi.mode(WIFI_AP); ↵ WiFi.softAP("value", "value"); ↵ }` |
| `espui_begin` | Statement | TITLE(input_value), MODE(dropdown), AUTH(dropdown), USERNAME(input_value), PASSWORD(input_value), PORT(input_value), SLIDER_CONTINUOUS(dropdown), CAPTIVE_PORTAL(dropdown) | `espui_begin(text("value"), MEMORY, FALSE, text("value"), text("value"), math_number(0), FALSE, TRUE)` | `ESPUI.sliderContinuous = false; ↵ ESPUI.captivePortal = true; ↵ ESPUI.setVerbosity(Verbosity::Quiet); ↵ ESPUI.begin("value", nullptr, nullptr, 1);` |
| `espui_prepare_filesystem` | Statement | FORMAT(dropdown) | `espui_prepare_filesystem(TRUE)` | `ESPUI.prepareFileSystem(true);` |
| `espui_no_parent` | Value | (none) | `espui_no_parent()` | `Control::noParent` |
| `espui_control_id` | Value | VAR(field_variable) | `espui_control_id($statusLabel)` | `statusLabel` |
| `espui_create_tab` | Statement | VAR(field_input), TITLE(input_value) | `espui_create_tab("mainTab", text("value"))` | `mainTab = ESPUI.addControl(ControlType::Tab, "value", "value", ControlColor::None);` |
| `espui_create_separator` | Statement | VAR(field_input), LABEL(input_value), PARENT(input_value) | `espui_create_separator("separator1", text("value"), math_number(0))` | `separator1 = ESPUI.addControl(ControlType::Separator, "value", "", ControlColor::Alizarin, 1);` |
| `espui_create_label` | Statement | VAR(field_input), LABEL(input_value), VALUE(input_value), COLOR(dropdown), PARENT(input_value) | `espui_create_label("statusLabel", text("value"), text("value"), Turquoise, math_number(0))` | `statusLabel = ESPUI.addControl(ControlType::Label, "value", String("value"), ControlColor::Turquoise, 1);` |
| `espui_create_button` | Statement | VAR(field_input), LABEL(input_value), VALUE(input_value), COLOR(dropdown), PARENT(input_value), DOWN(input_statement), UP(input_statement) | `espui_create_button("button1", text("value"), text("value"), Turquoise, math_number(0))` | `button1 = ESPUI.addControl(ControlType::Button, "value", String("value"), ControlColor::Turquoise, 1, espui_button_button1_generator_coverage_espui_create_button);` |
| `espui_create_switcher` | Statement | VAR(field_input), LABEL(input_value), STATE(dropdown), COLOR(dropdown), PARENT(input_value), ON(input_statement), OFF(input_statement) | `espui_create_switcher("switch1", text("value"), FALSE, Turquoise, math_number(0))` | `switch1 = ESPUI.addControl(ControlType::Switcher, "value", String(false ? "1" : "0"), ControlColor::Turquoise, 1, espui_switcher_switch1_generator_coverage_espui_create_switcher);` |
| `espui_create_slider` | Statement | VAR(field_input), LABEL(input_value), VALUE(input_value), MIN(input_value), MAX(input_value), COLOR(dropdown), PARENT(input_value), CHANGE(input_statement) | `espui_create_slider("slider1", text("value"), math_number(0), math_number(0), math_number(0), Turquoise, math_number(0))` | `slider1 = ESPUI.addControl(ControlType::Slider, "value", String(1), ControlColor::Turquoise, 1, espui_slider_slider1_generator_coverage_espui_create_slider); ↵ ESPUI.addControl(ControlType::Min, "", String(1), ControlColor::None, slider1); ↵ ESPUI.addControl(ControlType::Max, "", String(1), ControlColor::None, slider1);` |
| `espui_create_number` | Statement | VAR(field_input), LABEL(input_value), VALUE(input_value), MIN(input_value), MAX(input_value), COLOR(dropdown), PARENT(input_value), CHANGE(input_statement) | `espui_create_number("number1", text("value"), math_number(0), math_number(0), math_number(0), Turquoise, math_number(0))` | `number1 = ESPUI.addControl(ControlType::Number, "value", String(1), ControlColor::Turquoise, 1, espui_number_number1_generator_coverage_espui_create_number); ↵ ESPUI.addControl(ControlType::Min, "", String(1), ControlColor::None, number1); ↵ ESPUI.addControl(ControlType::Max, "", String(1), ControlColor::None, number1);` |
| `espui_create_text` | Statement | VAR(field_input), LABEL(input_value), VALUE(input_value), INPUT_TYPE(dropdown), COLOR(dropdown), PARENT(input_value), CHANGE(input_statement) | `espui_create_text("text1", text("value"), text("value"), text, Turquoise, math_number(0))` | `text1 = ESPUI.addControl(ControlType::Text, "value", String("value"), ControlColor::Turquoise, 1, espui_text_text1_generator_coverage_espui_create_text);` |
| `espui_create_select` | Statement | VAR(field_input), LABEL(input_value), VALUE(input_value), COLOR(dropdown), PARENT(input_value), CHANGE(input_statement) | `espui_create_select("select1", text("value"), text("value"), Turquoise, math_number(0))` | `select1 = ESPUI.addControl(ControlType::Select, "value", String("value"), ControlColor::Turquoise, 1, espui_select_select1_generator_coverage_espui_create_select);` |
| `espui_add_option` | Statement | SELECT(field_variable), LABEL(input_value), VALUE(input_value) | `espui_add_option($select1, text("value"), text("value"))` | `ESPUI.addControl(ControlType::Option, "value", String("value"), ControlColor::None, select1);` |
| `espui_create_pad` | Statement | VAR(field_input), LABEL(input_value), CENTER(dropdown), COLOR(dropdown), PARENT(input_value), EVENT(input_statement) | `espui_create_pad("pad1", text("value"), TRUE, Turquoise, math_number(0))` | `pad1 = ESPUI.addControl(ControlType::PadWithCenter, "value", "", ControlColor::Turquoise, 1, espui_pad_pad1_generator_coverage_espui_create_pad);` |
| `espui_create_graph` | Statement | VAR(field_input), LABEL(input_value), COLOR(dropdown), PARENT(input_value) | `espui_create_graph("graph1", text("value"), Turquoise, math_number(0))` | `graph1 = ESPUI.addControl(ControlType::Graph, "value", "", ControlColor::Turquoise, 1);` |
| `espui_create_gauge` | Statement | VAR(field_input), LABEL(input_value), VALUE(input_value), MIN(input_value), MAX(input_value), COLOR(dropdown), PARENT(input_value) | `espui_create_gauge("gauge1", text("value"), math_number(0), math_number(0), math_number(0), Turquoise, math_number(0))` | `gauge1 = ESPUI.addControl(ControlType::Gauge, "value", String(1), ControlColor::Turquoise, 1); ↵ ESPUI.addControl(ControlType::Min, "", String(1), ControlColor::None, gauge1); ↵ ESPUI.addControl(ControlType::Max, "", String(1), ControlColor::None, gauge1);` |
| `espui_create_file_display` | Statement | VAR(field_input), LABEL(input_value), FILENAME(input_value), COLOR(dropdown), PARENT(input_value) | `espui_create_file_display("fileView1", text("value"), text("value"), Turquoise, math_number(0))` | `fileView1 = ESPUI.addControl(ControlType::FileDisplay, "value", String("value"), ControlColor::Turquoise, 1);` |
| `espui_create_accelerometer` | Statement | VAR(field_input), LABEL(input_value), COLOR(dropdown), PARENT(input_value), CHANGE(input_statement) | `espui_create_accelerometer("accel1", text("value"), Turquoise, math_number(0))` | `accel1 = ESPUI.addControl(ControlType::Accel, "value", "", ControlColor::Turquoise, 1, espui_accelerometer_accel1_generator_coverage_espui_create_accelerometer);` |
| `espui_update_value` | Statement | VAR(field_variable), VALUE(input_value) | `espui_update_value($statusLabel, math_number(0))` | `ESPUI.updateControlValue(statusLabel, String(1));` |
| `espui_update_control_label` | Statement | VAR(field_variable), LABEL(input_value) | `espui_update_control_label($statusLabel, text("value"))` | `ESPUI.updateControlLabel(statusLabel, "value");` |
| `espui_update_switcher` | Statement | VAR(field_variable), STATE(input_value) | `espui_update_switcher($switch1, logic_boolean(TRUE))` | `ESPUI.updateSwitcher(switch1, true);` |
| `espui_update_number` | Statement | VAR(field_variable), VALUE(input_value) | `espui_update_number($slider1, math_number(0))` | `ESPUI.updateControlValue(slider1, String(1));` |
| `espui_add_graph_point` | Statement | VAR(field_variable), VALUE(input_value) | `espui_add_graph_point($graph1, math_number(0))` | `ESPUI.addGraphPoint(graph1, 1);` |
| `espui_clear_graph` | Statement | VAR(field_variable) | `espui_clear_graph($graph1)` | `ESPUI.clearGraph(graph1);` |
| `espui_set_enabled` | Statement | VAR(field_variable), ENABLED(input_value) | `espui_set_enabled($button1, logic_boolean(TRUE))` | `ESPUI.setEnabled(button1, true);` |
| `espui_set_visible` | Statement | VAR(field_variable), VISIBLE(input_value) | `espui_set_visible($statusLabel, logic_boolean(TRUE))` | `ESPUI.updateVisibility(statusLabel, true);` |
| `espui_set_layout` | Statement | VAR(field_variable), WIDE(input_value), VERTICAL(input_value) | `espui_set_layout($slider1, logic_boolean(TRUE), logic_boolean(TRUE))` | `ESPUI.setPanelWide(slider1, true); ↵ ESPUI.setVertical(slider1, true); ↵ ESPUI.updateControl(slider1);` |
| `espui_set_style` | Statement | VAR(field_variable), TARGET(dropdown), CSS(input_value) | `espui_set_style($statusLabel, PANEL, text("value"))` | `ESPUI.setPanelStyle(statusLabel, String("value"));` |
| `espui_set_input_type` | Statement | VAR(field_variable), INPUT_TYPE(dropdown) | `espui_set_input_type($text1, text)` | `ESPUI.setInputType(text1, "text");` |
| `espui_get_value` | Value | VAR(field_variable) | `espui_get_value($statusLabel)` | `espui_get_control_value(statusLabel)` |
| `espui_sender_value` | Value | (none) | `espui_sender_value()` | `sender->value` |
| `espui_sender_value_number` | Value | (none) | `espui_sender_value_number()` | `sender->value.toInt()` |
| `espui_sender_id` | Value | (none) | `espui_sender_id()` | `sender->id` |
| `espui_event_type` | Value | (none) | `espui_event_type()` | `type` |
| `espui_event_is` | Value | EVENT(dropdown) | `espui_event_is(B_DOWN)` | `(type == B_DOWN)` |
| `espui_if_event` | Statement | EVENT(dropdown), DO(input_statement) | `espui_if_event(B_DOWN)` | `if (type == B_DOWN) { ↵ }` |
| `espui_wifi_connected` | Value | (none) | `espui_wifi_connected()` | `(WiFi.status() == WL_CONNECTED)` |
| `espui_ip_address` | Value | MODE(dropdown) | `espui_ip_address(STA)` | `WiFi.localIP().toString()` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| MODE | MEMORY, LITTLEFS | espui_begin |
| AUTH | FALSE, TRUE | espui_begin |
| SLIDER_CONTINUOUS | FALSE, TRUE | espui_begin |
| CAPTIVE_PORTAL | TRUE, FALSE | espui_begin |
| FORMAT | TRUE, FALSE | espui_prepare_filesystem |
| COLOR | Turquoise, Emerald, Peterriver, Wetasphalt, Sunflower, Carrot, Alizarin, Dark, None | espui_create_label, espui_create_button, espui_create_switcher |
| STATE | FALSE, TRUE | espui_create_switcher |
| INPUT_TYPE | text, password, number, date, time, color, email | espui_create_text, espui_set_input_type |
| CENTER | TRUE, FALSE | espui_create_pad |
| TARGET | PANEL, ELEMENT | espui_set_style |
| EVENT | B_DOWN, B_UP, S_ACTIVE, S_INACTIVE, SL_VALUE, N_VALUE, T_VALUE, S_VALUE, P_LEFT_DOWN, P_LEFT_UP, P_RIGHT_DOWN, P_RIGHT_UP, P_FOR_DOWN, P_FOR_UP, P_BACK_DOWN, P_BACK_UP, P_CENTER_DOWN, P_CENTER_UP | espui_event_is, espui_if_event |
| MODE | STA, AP | espui_ip_address |

## ABS Examples

### Basic Usage
```
arduino_setup()
    espui_begin(text("value"), MEMORY, FALSE, text("value"), text("value"), math_number(0), FALSE, TRUE)
    serial_begin(Serial, 9600)

arduino_loop()
    serial_println(Serial, espui_no_parent())
    time_delay(math_number(1000))
```

## Notes

1. **Variable**: `espui_create_tab("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
