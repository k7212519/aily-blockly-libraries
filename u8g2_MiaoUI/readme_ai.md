# MiaoUI OLED Menu

Animated monochrome OLED menu UI based on U8g2.

## Library Info
- **Name**: @aily-project/lib-miaoui
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `miaoui_init` | Statement | VAR(field_input), DISPLAY(field_input), FIRST_ITEM(field_variable), INIT_DISPLAY(field_checkbox), MENU(input_statement), PARAMETERS(input_statement), TEXTS(input_statement) | `miaoui_init("menu", "u8g2", $mainHeader, TRUE)` | `(void)menu.begin(&mainHeader, true);` |
| `miaoui_add_page` | Statement | PAGE(field_input), TITLE(field_input), TYPE(dropdown) | `miaoui_add_page("mainPage", "[Main]", UI_PAGE_TEXT)` | `AddPage("[Main]", &mainPage, UI_PAGE_TEXT);` |
| `miaoui_add_item` | Statement | ITEM(field_input), LABEL(field_input), PAGE(field_variable), TYPE(dropdown), IMAGE(field_input) | `miaoui_add_item("mainHeader", "[Main]", $mainPage, UI_ITEM_ONCE_FUNCTION, "nullptr")` | `AddItem("[Main]", UI_ITEM_ONCE_FUNCTION, nullptr, &mainHeader, &mainPage, nullptr, nullptr);` |
| `miaoui_add_navigation_item` | Statement | ITEM(field_input), LABEL(field_input), PAGE(field_variable), TYPE(dropdown), TARGET_PAGE(field_variable), IMAGE(field_input) | `miaoui_add_navigation_item("settingsItem", "Settings", $mainPage, UI_ITEM_PARENTS, $settingsPage, "nullptr")` | `AddItem("Settings", UI_ITEM_PARENTS, nullptr, &settingsItem, &mainPage, &settingsPage, nullptr);` |
| `miaoui_add_action_item` | Statement | ITEM(field_input), LABEL(field_input), PAGE(field_variable), TYPE(dropdown), IMAGE(field_input), DO(input_statement) | `miaoui_add_action_item("actionItem", "Action", $mainPage, UI_ITEM_ONCE_FUNCTION, "nullptr")` | `AddItem("Action", UI_ITEM_ONCE_FUNCTION, nullptr, &actionItem, &mainPage, nullptr, miaoui_actionItem_callback);` |
| `miaoui_bind_number` | Statement | ITEM(field_variable), DATA_VAR(field_input), DATA_TYPE(dropdown), ACCESS(dropdown), INITIAL(input_value), MIN(input_value), MAX(input_value), STEP(input_value), CALLBACK_MODE(dropdown), DO(input_statement) | `miaoui_bind_number($valueItem, "menuValue", INT, UI_DATA_ACTION_RW, math_number(0), math_number(0), math_number(0), math_number(0), NONE)` | `menuValue = (int)(1); ↵ miaoui_valueItem_data.name = "menuValue"; ↵ miaoui_valueItem_data.ptr = &menuValue; ↵ miaoui_valueItem_data.function = nullptr; ↵ miaoui_valueItem_data.functionType = UI_DATA_FUNCTION_EXIT_EXECUTE; ↵ miaoui_valueItem_data.dataType = UI_DATA_INT; ↵ miaoui_valueItem_data.actionType = UI_DATA_ACTION_RW; ↵ miaoui_valueItem_data.min = (int)(1); ↵ miaoui_valueItem_data.max = (int)(1); ↵ miaoui_valueItem_data.step = (float)(1); ↵ miaoui_valueItem_element.data = &miaoui_valueItem_data; ↵ Create_element(&valueItem, &miaoui_valueItem_element);` |
| `miaoui_bind_switch` | Statement | ITEM(field_variable), DATA_VAR(field_input), INITIAL(input_value), ACCESS(dropdown), CALLBACK_MODE(dropdown), DO(input_statement) | `miaoui_bind_switch($switchItem, "menuSwitch", logic_boolean(TRUE), UI_DATA_ACTION_RW, NONE)` | `menuSwitch = (true) ? 1 : 0; ↵ miaoui_switchItem_data.name = "menuSwitch"; ↵ miaoui_switchItem_data.ptr = &menuSwitch; ↵ miaoui_switchItem_data.function = nullptr; ↵ miaoui_switchItem_data.functionType = UI_DATA_FUNCTION_EXIT_EXECUTE; ↵ miaoui_switchItem_data.dataType = UI_DATA_SWITCH; ↵ miaoui_switchItem_data.actionType = UI_DATA_ACTION_RW; ↵ miaoui_switchItem_element.data = &miaoui_switchItem_data; ↵ Create_element(&switchItem, &miaoui_switchItem_element);` |
| `miaoui_bind_text` | Statement | ITEM(field_variable), TEXT(field_multilinetext) | `miaoui_bind_text($aboutItem, "MiaoUI animated OLED menu.")` | `miaoui_aboutItem_text.ptr = "MiaoUI animated OLED menu."; ↵ miaoui_aboutItem_text.font = UI_FONT; ↵ miaoui_aboutItem_text.fontHight = UI_FONT_HIGHT; ↵ miaoui_aboutItem_text.fontWidth = UI_FONT_WIDTH; ↵ miaoui_aboutItem_text_element.text = &miaoui_aboutItem_text; ↵ Create_element(&aboutItem, &miaoui_aboutItem_text_element);` |
| `miaoui_set_buttons` | Statement | VAR(field_variable), UP_PIN(input_value), DOWN_PIN(input_value), ENTER_PIN(input_value), ACTIVE_LEVEL(dropdown), PIN_MODE(dropdown) | `miaoui_set_buttons($menu, math_number(2), math_number(2), math_number(2), Low, INPUT_PULLUP)` | `menu.setButtons(1, 1, 1, MiaoUIButtonActiveLevel::Low, INPUT_PULLUP);` |
| `miaoui_set_debounce` | Statement | VAR(field_variable), MILLISECONDS(input_value) | `miaoui_set_debounce($menu, math_number(0))` | `menu.setDebounceTime(1);` |
| `miaoui_set_button_repeat` | Statement | VAR(field_variable), DELAY(input_value), INTERVAL(input_value) | `miaoui_set_button_repeat($menu, math_number(1000), math_number(1000))` | `menu.setButtonRepeat(1, 1);` |
| `miaoui_push_action` | Statement | VAR(field_variable), ACTION(dropdown) | `miaoui_push_action($menu, UI_ACTION_UP)` | `(void)menu.pushAction(UI_ACTION_UP);` |
| `miaoui_try_push_action` | Value | VAR(field_variable), ACTION(dropdown) | `miaoui_try_push_action($menu, UI_ACTION_UP)` | `menu.pushAction(UI_ACTION_UP)` |
| `miaoui_update` | Statement | VAR(field_variable) | `miaoui_update($menu)` | `menu.update();` |
| `miaoui_set_background` | Statement | VAR(field_variable), INVERTED(input_value) | `miaoui_set_background($menu, logic_boolean(TRUE))` | `menu.state().bgColor = (true) ? 1 : 0;` |
| `miaoui_is_begun` | Value | VAR(field_variable) | `miaoui_is_begun($menu)` | `menu.isBegun()` |
| `miaoui_last_error_code` | Value | VAR(field_variable) | `miaoui_last_error_code($menu)` | `static_cast<uint8_t>(menu.lastError())` |
| `miaoui_last_error_message` | Value | VAR(field_variable) | `miaoui_last_error_message($menu)` | `menu.lastErrorMessage()` |
| `miaoui_current_item_name` | Value | VAR(field_variable) | `miaoui_current_item_name($menu)` | `(menu.state().nowItem == nullptr ? "" : menu.state().nowItem->itemName)` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| TYPE | UI_PAGE_TEXT, UI_PAGE_ICON | miaoui_add_page |
| TYPE | UI_ITEM_ONCE_FUNCTION, UI_ITEM_DATA, UI_ITEM_WORD, UI_ITEM_WAVE | miaoui_add_item |
| TYPE | UI_ITEM_PARENTS, UI_ITEM_RETURN | miaoui_add_navigation_item |
| TYPE | UI_ITEM_ONCE_FUNCTION, UI_ITEM_LOOP_FUNCTION | miaoui_add_action_item |
| DATA_TYPE | INT, FLOAT | miaoui_bind_number |
| ACCESS | UI_DATA_ACTION_RW, UI_DATA_ACTION_RO | miaoui_bind_number, miaoui_bind_switch |
| CALLBACK_MODE | NONE, UI_DATA_FUNCTION_STEP_EXECUTE, UI_DATA_FUNCTION_EXIT_EXECUTE | miaoui_bind_number, miaoui_bind_switch |
| ACTIVE_LEVEL | Low, High | miaoui_set_buttons |
| PIN_MODE | INPUT_PULLUP, INPUT | miaoui_set_buttons |
| ACTION | UI_ACTION_UP, UI_ACTION_DOWN, UI_ACTION_ENTER | miaoui_push_action, miaoui_try_push_action |

## ABS Examples

### Basic Usage
```
arduino_setup()
    u8g2_begin(SSD1306, FULL_BUFFER, 128X64_NONAME, _HW_I2C, U8X8_PIN_NONE)
    miaoui_set_buttons($menu, math_number(3), math_number(18), math_number(8), Low, INPUT_PULLUP)
    miaoui_init("menu", "u8g2", $mainHeader, FALSE)
        @MENU:
            miaoui_add_page("mainPage", "[Main]", UI_PAGE_TEXT)
            miaoui_add_item("mainHeader", "[Main]", $mainPage, UI_ITEM_ONCE_FUNCTION, "nullptr")
            miaoui_add_item("valueItem", " Value", $mainPage, UI_ITEM_DATA, "nullptr")
            miaoui_add_item("aboutItem", " About", $mainPage, UI_ITEM_WORD, "nullptr")
        @PARAMETERS:
            miaoui_bind_number($valueItem, "menuValue", INT, UI_DATA_ACTION_RW, math_number(50), math_number(0), math_number(100), math_number(5), NONE)
        @TEXTS:
            miaoui_bind_text($aboutItem, "MiaoUI animated OLED menu.")
```

The exact `u8g2_begin` arguments depend on the selected display controller and
bus. MiaoUI requires the U8g2 full-buffer mode and a 128x64 resolution.

## Generation Model

1. `miaoui_init` declares `MiaoUI <VAR>(<DISPLAY>)` globally.
2. Blocks nested under `MENU`, `PARAMETERS`, and `TEXTS` generate the strong
   `Create_MenuTree`, `Create_Parameter`, and `Create_Text` hooks expected by
   the upstream library.
3. Page, item, data, text, and element structures are emitted at global scope so
   their lifetime covers the entire sketch.
4. Action bodies and data-change bodies become `static void callback(ui_t*)`
   functions. Empty or disabled data callbacks use `nullptr`.
5. `<VAR>.update()` is added to the beginning of `loop()` automatically.
6. Initialization, page, item, and backing-data names are registered with
   Blockly and follow variable renames. Generated C identifiers are sanitized.

## Notes

1. **Variable**: `miaoui_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. Create every page before adding items that reference it. Item order inside
   `MENU` is the visual order on its page.
5. `UI_ITEM_DATA`, `UI_ITEM_WAVE`, and `UI_ITEM_WORD` require matching number,
   switch, or text bindings. Wave data must be integer/float with `MAX > MIN`.
6. `UI_PAGE_ICON` uses fixed 30x30 XBM images. Set the image expression to a
   global byte-array identifier; `nullptr` selects the upstream fallback image.
7. When the U8g2 initialization block already calls `u8g2.begin()`, set
   `INIT_DISPLAY` to `FALSE` to avoid initializing the display twice.
8. MiaoUI's C engine and hook names are global; only one active `miaoui_init`
   block is supported per sketch.
9. `miaoui_try_push_action` returns `false` for an invalid action or a full
   eight-entry queue; the statement variant intentionally discards the result.
10. Error codes are `0=None`, `1=NullFirstItem`, `2=InvalidMenuTree`, and
    `3=DisplaySizeMismatch`.
