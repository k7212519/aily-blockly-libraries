# AstraUI OLED Menu

Allocation-free animated OLED menu framework based on U8g2.

## Library Info
- **Name**: @aily-project/lib-astraui
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `astraui_init` | Statement | VAR(field_input), DISPLAY(field_input), ROOT(field_variable), DISPLAY_READY(field_checkbox), CONTENT(input_statement) | `astraui_init("ui", "u8g2", $rootPage, TRUE)` | `ui.config().behavior.beginDisplay = false; ↵ (void)ui.begin(rootPage);` |
| `astraui_create_page` | Statement | VAR(field_input), TITLE(field_input), LAYOUT(dropdown), ID(field_number) | `astraui_create_page("rootPage", "Main", List, 0)` | `astra::Page rootPage("Main", astra::Layout::List, 0);` |
| `astraui_create_action` | Statement | VAR(field_input), PAGE(field_variable), LABEL(field_input), ID(field_number), DO(input_statement) | `astraui_create_action("actionItem", $rootPage, "Action", 0)` | `rootPage.add(actionItem);` |
| `astraui_create_submenu` | Statement | VAR(field_input), PAGE(field_variable), LABEL(field_input), TARGET(field_variable), ID(field_number) | `astraui_create_submenu("settingsLink", $rootPage, "Settings", $settingsPage, 0)` | `rootPage.add(settingsLink);` |
| `astraui_create_toggle` | Statement | VAR(field_input), PAGE(field_variable), LABEL(field_input), DATA_VAR(field_input), INITIAL(field_checkbox), ID(field_number), DO(input_statement) | `astraui_create_toggle("toggleItem", $rootPage, "Enabled", "enabled", TRUE, 0)` | `rootPage.add(toggleItem);` |
| `astraui_create_slider` | Statement | VAR(field_input), PAGE(field_variable), LABEL(field_input), DATA_VAR(field_input), ID(field_number), INITIAL(input_value), MIN(input_value), MAX(input_value), STEP(input_value), SUFFIX(field_input), DO(input_statement) | `astraui_create_slider("sliderItem", $rootPage, "Level", "level", 0, math_number(0), math_number(0), math_number(0), math_number(0), "%")` | `rootPage.add(sliderItem);` |
| `astraui_create_choice` | Statement | VAR(field_input), PAGE(field_variable), LABEL(field_input), DATA_VAR(field_input), ID(field_number), OPTIONS(field_input), INITIAL(input_value), DO(input_statement) | `astraui_create_choice("choiceItem", $rootPage, "Mode", "mode", 0, "Eco,Balanced,Performance", math_number(0))` | `rootPage.add(choiceItem);` |
| `astraui_create_value` | Statement | VAR(field_input), PAGE(field_variable), LABEL(field_input), DATA_VAR(field_input), DATA_TYPE(dropdown), INITIAL(input_value), SUFFIX(field_input), ID(field_number) | `astraui_create_value("valueItem", $rootPage, "Value", "statusValue", int32_t, math_number(0), "SUFFIX", 0)` | `rootPage.add(valueItem);` |
| `astraui_create_separator` | Statement | VAR(field_input), PAGE(field_variable), LABEL(field_input), ID(field_number) | `astraui_create_separator("separatorItem", $rootPage, "Status", 0)` | `rootPage.add(separatorItem);` |
| `astraui_set_data_value` | Statement | DATA_VAR(field_variable), VALUE(input_value), VAR(field_variable) | `astraui_set_data_value($statusValue, math_number(0), $ui)` | `statusValue = 1; ↵ ui.invalidate();` |
| `astraui_data_value` | Value | DATA_VAR(field_variable) | `astraui_data_value($statusValue)` | `statusValue` |
| `astraui_set_item_state` | Statement | ITEM(field_variable), PROPERTY(dropdown), STATE(input_value), VAR(field_variable) | `astraui_set_item_state($actionItem, setEnabled, logic_boolean(TRUE), $ui)` | `actionItem.setEnabled(true); ↵ ui.invalidate();` |
| `astraui_set_item_label` | Statement | ITEM(field_variable), LABEL(field_input), VAR(field_variable) | `astraui_set_item_label($actionItem, "New label", $ui)` | `actionItem.setLabel("New label"); ↵ ui.invalidate();` |
| `astraui_set_item_icon` | Statement | ITEM(field_variable), BITMAP(field_input), WIDTH(input_value), HEIGHT(input_value), VAR(field_variable) | `astraui_set_item_icon($actionItem, "iconBitmap", math_number(0), math_number(0), $ui)` | `actionItem.setIcon(iconBitmap, 1, 1); ↵ ui.invalidate();` |
| `astraui_set_page_options` | Statement | PAGE(field_variable), SHOW_TITLE(dropdown), WRAP(dropdown) | `astraui_set_page_options($rootPage, GLOBAL, GLOBAL)` | `rootPage.useGlobalTitleSetting(); ↵ rootPage.useGlobalWrapSetting();` |
| `astraui_set_theme` | Statement | VAR(field_variable), MODE(dropdown), SHOW_TITLE(field_checkbox), SHOW_SCROLLBAR(field_checkbox), SHOW_TILE_FOOTER(field_checkbox), SELECTOR_WIDTH(dropdown) | `astraui_set_theme($ui, FALSE, TRUE, TRUE, TRUE, Text)` | `ui.config().theme.lightMode = false; ↵ ui.config().theme.showPageTitle = true; ↵ ui.config().theme.showScrollbar = true; ↵ ui.config().theme.showTileFooter = true; ↵ ui.config().theme.selectorWidth = astra::SelectorWidth::Text;` |
| `astraui_set_layout_metrics` | Statement | VAR(field_variable), PADDING(input_value), HEADER_HEIGHT(input_value), ROW_HEIGHT(input_value), TILE_WIDTH(input_value), ICON_WIDTH(input_value), ICON_HEIGHT(input_value) | `astraui_set_layout_metrics($ui, math_number(0), math_number(0), math_number(0), math_number(0), math_number(0), math_number(0))` | `ui.config().theme.screenPadding = 1; ↵ ui.config().theme.headerHeight = 1; ↵ ui.config().theme.listRowHeight = 1; ↵ ui.config().theme.tileCellWidth = 1; ↵ ui.config().theme.tileIconWidth = 1; ↵ ui.config().theme.tileIconHeight = 1;` |
| `astraui_set_motion` | Statement | VAR(field_variable), PRESET(dropdown) | `astraui_set_motion($ui, Gentle)` | `ui.config().useMotionPreset(astra::MotionPreset::Gentle);` |
| `astraui_set_behavior` | Statement | VAR(field_variable), WRAP(field_checkbox), SKIP_DISABLED(field_checkbox), REMEMBER_FOCUS(field_checkbox), CANCEL_EDIT(field_checkbox), CONTINUOUS(field_checkbox), IDLE_REFRESH(input_value), TOAST_DURATION(input_value) | `astraui_set_behavior($ui, TRUE, TRUE, TRUE, TRUE, FALSE, math_number(0), math_number(1000))` | `ui.config().behavior.wrapNavigation = true; ↵ ui.config().behavior.skipDisabled = true; ↵ ui.config().behavior.rememberFocus = true; ↵ ui.config().behavior.cancelEditOnBack = true; ↵ ui.config().behavior.continuousRendering = false; ↵ ui.config().behavior.idleRefreshMs = 1; ↵ ui.config().behavior.toastDurationMs = 1;` |
| `astraui_create_two_button` | Statement | VAR(field_input), UI(field_variable), PREVIOUS_PIN(input_value), NEXT_PIN(input_value), TRIGGER(dropdown), PIN_MODE(dropdown) | `astraui_create_two_button("buttons", $ui, math_number(2), math_number(2), LOW, INPUT_PULLUP)` | `buttons.begin();` |
| `astraui_create_three_button` | Statement | VAR(field_input), UI(field_variable), PREVIOUS_PIN(input_value), NEXT_PIN(input_value), SELECT_PIN(input_value), TRIGGER(dropdown), PIN_MODE(dropdown) | `astraui_create_three_button("buttons", $ui, math_number(2), math_number(2), math_number(2), LOW, INPUT_PULLUP)` | `buttons.begin();` |
| `astraui_set_button_timing` | Statement | VAR(field_variable), DEBOUNCE(input_value), LONG_PRESS(input_value), REPEAT_DELAY(input_value), REPEAT_INTERVAL(input_value) | `astraui_set_button_timing($buttons, math_number(0), math_number(0), math_number(1000), math_number(1000))` | `buttons.timing().debounceMs = 1; ↵ buttons.timing().longPressMs = 1; ↵ buttons.timing().repeatDelayMs = 1; ↵ buttons.timing().repeatIntervalMs = 1;` |
| `astraui_dispatch` | Statement | VAR(field_variable), ACTION(dropdown) | `astraui_dispatch($ui, Previous)` | `ui.dispatch(astra::InputAction::Previous);` |
| `astraui_show_toast` | Statement | VAR(field_variable), MESSAGE(input_value), DURATION(input_value) | `astraui_show_toast($ui, text("value"), math_number(1000))` | `ui.showToast("value", 1);` |
| `astraui_ui_command` | Statement | VAR(field_variable), COMMAND(dropdown) | `astraui_ui_command($ui, invalidate)` | `ui.invalidate();` |
| `astraui_open_page` | Statement | VAR(field_variable), PAGE(field_variable) | `astraui_open_page($ui, $settingsPage)` | `(void)ui.open(settingsPage);` |
| `astraui_focus` | Statement | VAR(field_variable), INDEX(input_value), ANIMATE(field_checkbox) | `astraui_focus($ui, math_number(0), TRUE)` | `(void)ui.focus(1, true);` |
| `astraui_set_power_save` | Statement | VAR(field_variable), ENABLED(input_value) | `astraui_set_power_save($ui, logic_boolean(TRUE))` | `ui.setPowerSave(true);` |
| `astraui_status` | Value | VAR(field_variable), STATUS(dropdown) | `astraui_status($ui, isBegun)` | `ui.isBegun()` |
| `astraui_focus_index` | Value | VAR(field_variable) | `astraui_focus_index($ui)` | `ui.focusIndex()` |
| `astraui_navigation_depth` | Value | VAR(field_variable) | `astraui_navigation_depth($ui)` | `ui.navigationDepth()` |
| `astraui_current_item_id` | Value | VAR(field_variable) | `astraui_current_item_id($ui)` | `(ui.currentItem() == nullptr ? 0 : ui.currentItem()->id())` |
| `astraui_begin_result_message` | Value | VAR(field_variable) | `astraui_begin_result_message($ui)` | `astra::beginResultMessage(ui.beginResult())` |
| `astraui_when_event` | Hat | VAR(field_variable), DO(input_statement) | `astraui_when_event($ui)` | `void astraui_ui_event_handler(const astra::Event &event, void *context) { ↵ (void)context; ↵ } ↵ ui.setEventHandler(astraui_ui_event_handler);` |
| `astraui_event_is` | Value | EVENT(dropdown) | `astraui_event_is(FocusChanged)` | `event.type == astra::EventType::FocusChanged` |
| `astraui_event_value` | Value | (none) | `astraui_event_value()` | `event.value` |
| `astraui_event_item_id` | Value | (none) | `astraui_event_item_id()` | `(event.item == nullptr ? 0 : event.item->id())` |
| `astraui_event_page_id` | Value | (none) | `astraui_event_page_id()` | `(event.page == nullptr ? 0 : event.page->id())` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| LAYOUT | List, Tile | astraui_create_page |
| DATA_TYPE | int32_t, uint32_t | astraui_create_value |
| PROPERTY | setEnabled, setVisible, setFocusable | astraui_set_item_state |
| SHOW_TITLE | GLOBAL, TRUE, FALSE | astraui_set_page_options |
| WRAP | GLOBAL, TRUE, FALSE | astraui_set_page_options |
| MODE | FALSE, TRUE | astraui_set_theme |
| SELECTOR_WIDTH | Text, Row | astraui_set_theme |
| PRESET | Gentle, Snappy, Bouncy, Reduced | astraui_set_motion |
| TRIGGER | LOW, HIGH | astraui_create_two_button, astraui_create_three_button |
| PIN_MODE | INPUT_PULLUP, INPUT, INPUT_PULLDOWN | astraui_create_two_button, astraui_create_three_button |
| ACTION | Previous, Next, Activate, Back, Decrement, Increment, Home | astraui_dispatch |
| COMMAND | invalidate, renderNow, dismissToast, back, home | astraui_ui_command |
| STATUS | isBegun, editing, transitioning | astraui_status |
| EVENT | FocusChanged, Activated, ValueChanged, EditStarted, EditCommitted, EditCancelled, PageEntered, PageExited | astraui_event_is |

## ABS Examples

### Basic Usage
```
arduino_setup()
    u8g2_begin(SSD1306, FULL_BUFFER, 128X64_NONAME, _HW_I2C, U8X8_PIN_NONE)
    astraui_init("ui", "u8g2", $rootPage, TRUE)
        @CONTENT:
            astraui_create_page("rootPage", "Main", List, 1)
            astraui_create_page("settingsPage", "Settings", List, 2)
            astraui_create_submenu("settingsLink", $rootPage, "Settings", $settingsPage, 10)
            astraui_create_action("helloItem", $rootPage, "Hello", 11)
                @DO:
                    astraui_show_toast($ui, text("Hello from AstraUI"), math_number(0))
            astraui_create_toggle("enabledItem", $settingsPage, "Enabled", "enabled", TRUE, 20)
            astraui_create_slider("levelItem", $settingsPage, "Level", "level", 21, math_number(50), math_number(0), math_number(100), math_number(5), "%")
            astraui_create_three_button("buttons", $ui, math_number(2), math_number(3), math_number(4), LOW, INPUT_PULLUP)
            astraui_set_motion($ui, Gentle)
```

The exact `u8g2_begin` arguments depend on the display controller and bus.
`DISPLAY_READY=TRUE` means the preceding U8g2 block already calls
`u8g2.begin()`; AstraUI then prepares the canvas without reinitializing it.

## Notes

1. **Variable**: `astraui_init("varName", ...)` creates variable `$varName`; pass `$varName` directly to `field_variable` slots; use `variables_get($varName)` only for `input_value` slots.
2. **Parameter order**: ABS parameters follow `block.json` args order.
3. **Input values**: use `math_number(n)`, `text("s")`, `logic_boolean(TRUE/FALSE)`, variables, or nested value blocks.
4. AstraUI requires a U8g2 `_F_` full-buffer constructor. `_1_` and `_2_`
   page-buffer modes fail with `FullBufferRequired`.
5. Inside `astraui_init.CONTENT`, place all `astraui_create_page` blocks before
   controls, especially before a submenu whose constructor references a target
   page. Control block order is the visual order within each page.
6. `astraui_init` emits a global `astra::U8g2Canvas` and `astra::UI`, calls
   `ui.begin(rootPage)` after nested setup code, and adds `ui.tick()` to the
   beginning of `loop()`.
7. Two/three-button creation emits a global input object, calls `begin()`, and
   adds `buttons.update(ui)` before `ui.tick()` in `loop()`.
8. Pages, controls, button inputs, and backing values are registered as typed
   Blockly variables. Their generated C++ identifiers are sanitized and their
   declarations have sketch-wide lifetime.
9. Toggle data is `bool`, slider data is `int32_t`, choice data is `uint8_t`,
   and read-only value data is selectable `int32_t`/`uint32_t`.
10. `astraui_set_data_value` changes a registered backing value and invalidates
    the UI. `astraui_data_value` reads it. External state changes that bypass
    this block require `astraui_ui_command(..., invalidate)` or idle refresh.
11. Event value/type/item/page blocks are valid only inside action/value-change
    bodies or `astraui_when_event`. Item bodies install item-local callbacks;
    the hat block installs the global UI callback.
12. `INPUT_PULLDOWN` is emitted only when selected and must be supported by the
    chosen Arduino core; otherwise use `INPUT` with an external pulldown.
13. XBM icons must be global byte arrays whose lifetime covers the sketch.
