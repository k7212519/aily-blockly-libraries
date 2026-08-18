// ESP32_Display_Panel v1.0.4 Blockly generator

const ESP_PANEL_PROJECT_MACROS = [
  'ESP_PANEL_BOARD_FILE_SKIP',
  'ESP_PANEL_DRIVERS_FILE_SKIP',
  'ESP_PANEL_DRIVERS_BUS_USE_SPI=1',
  'ESP_PANEL_DRIVERS_BUS_COMPILE_UNUSED_DRIVERS=0',
  'ESP_PANEL_DRIVERS_LCD_COMPILE_UNUSED_DRIVERS=0',
  'ESP_PANEL_DRIVERS_BACKLIGHT_USE_PWM_LEDC=1',
  'ESP_PANEL_DRIVERS_BACKLIGHT_COMPILE_UNUSED_DRIVERS=0'
];

const ESP_PANEL_PROJECT_MACRO_NAMES = [
  'ESP_PANEL_BOARD_FILE_SKIP',
  'ESP_PANEL_DRIVERS_FILE_SKIP',
  'ESP_PANEL_DRIVERS_BUS_USE_SPI',
  'ESP_PANEL_DRIVERS_BUS_COMPILE_UNUSED_DRIVERS',
  'ESP_PANEL_DRIVERS_LCD_COMPILE_UNUSED_DRIVERS',
  'ESP_PANEL_DRIVERS_BACKLIGHT_USE_PWM_LEDC',
  'ESP_PANEL_DRIVERS_BACKLIGHT_COMPILE_UNUSED_DRIVERS'
];

const ESP_PANEL_LCD_MODELS = new Set([
  'AXS15231B', 'GC9A01', 'GC9B71', 'ILI9341', 'NV3022B', 'SH8601',
  'SPD2010', 'ST7789', 'ST7796', 'ST77916', 'ST77922'
]);

function espPanelCleanValue(value) {
  if (typeof value === 'string') {
    return value.replace(/^\((.+)\)$/, '$1');
  }
  return value;
}

function espPanelValue(block, generator, name, fallback) {
  return espPanelCleanValue(generator.valueToCode(block, name, generator.ORDER_ATOMIC) || fallback);
}

function espPanelVariableName(block) {
  const field = block.getField('VAR');
  return field ? field.getText() : 'panel';
}

function espPanelAttachVariableMonitor(block) {
  if (block._espPanelVarMonitorAttached) return;
  block._espPanelVarMonitorAttached = true;
  block._espPanelVarLastName = block.getFieldValue('VAR') || 'panel';
  registerVariableToBlockly(block._espPanelVarLastName, 'ESPPanelBoard');

  const field = block.getField('VAR');
  if (!field) return;
  const originalFinishEditing = field.onFinishEditing_;
  field.onFinishEditing_ = function(newName) {
    if (typeof originalFinishEditing === 'function') {
      originalFinishEditing.call(this, newName);
    }
    const workspace = block.workspace ||
      (typeof Blockly !== 'undefined' && Blockly.getMainWorkspace && Blockly.getMainWorkspace());
    const oldName = block._espPanelVarLastName;
    if (workspace && newName && newName !== oldName) {
      renameVariableInBlockly(block, oldName, newName, 'ESPPanelBoard');
      block._espPanelVarLastName = newName;
    }
  };
}

function espPanelEnsureLibrary(generator) {
  generator.addLibrary('ESP32_Display_Panel', '#include <esp_display_panel.hpp>');
}

function espPanelAddBuildMacros(generator, lcdModel) {
  const lcdMacro = 'ESP_PANEL_DRIVERS_LCD_USE_' + lcdModel;
  generator.addMacro('ESP_PANEL_BOARD_FILE_SKIP', '#define ESP_PANEL_BOARD_FILE_SKIP');
  generator.addMacro('ESP_PANEL_DRIVERS_FILE_SKIP', '#define ESP_PANEL_DRIVERS_FILE_SKIP');
  generator.addMacro('ESP_PANEL_DRIVERS_BUS_USE_SPI', '#define ESP_PANEL_DRIVERS_BUS_USE_SPI 1');
  generator.addMacro(
    'ESP_PANEL_DRIVERS_BUS_COMPILE_UNUSED_DRIVERS',
    '#define ESP_PANEL_DRIVERS_BUS_COMPILE_UNUSED_DRIVERS 0'
  );
  generator.addMacro(lcdMacro, '#define ' + lcdMacro + ' 1');
  generator.addMacro(
    'ESP_PANEL_DRIVERS_LCD_COMPILE_UNUSED_DRIVERS',
    '#define ESP_PANEL_DRIVERS_LCD_COMPILE_UNUSED_DRIVERS 0'
  );
  generator.addMacro(
    'ESP_PANEL_DRIVERS_BACKLIGHT_USE_PWM_LEDC',
    '#define ESP_PANEL_DRIVERS_BACKLIGHT_USE_PWM_LEDC 1'
  );
  generator.addMacro(
    'ESP_PANEL_DRIVERS_BACKLIGHT_COMPILE_UNUSED_DRIVERS',
    '#define ESP_PANEL_DRIVERS_BACKLIGHT_COMPILE_UNUSED_DRIVERS 0'
  );
}

function espPanelSyncProjectMacros(lcdModel) {
  if (typeof window === 'undefined' || !window['projectService']) return;

  const service = window['projectService'];
  const lcdMacro = 'ESP_PANEL_DRIVERS_LCD_USE_' + lcdModel;
  const previousLCD = Arduino.esp_panel_selected_lcd_macro || '';
  let chain = Promise.resolve();

  if (previousLCD && previousLCD !== lcdMacro) {
    chain = chain.then(() => service.removeMacro(previousLCD));
  }
  ESP_PANEL_PROJECT_MACROS.concat([lcdMacro + '=1']).forEach(macro => {
    chain = chain.then(() => service.addMacro(macro));
  });
  chain
    .then(() => {
      Arduino.esp_panel_selected_lcd_macro = lcdMacro;
    })
    .catch(error => console.error('ESP32_Display_Panel macro configuration failed:', error));
}

function espPanelClearProjectMacros() {
  if (typeof window === 'undefined' || !window['projectService']) return;

  const service = window['projectService'];
  const lcdMacro = Arduino.esp_panel_selected_lcd_macro || '';
  let chain = Promise.resolve();
  if (lcdMacro) chain = chain.then(() => service.removeMacro(lcdMacro));
  ESP_PANEL_PROJECT_MACRO_NAMES.forEach(macro => {
    chain = chain.then(() => service.removeMacro(macro));
  });
  chain
    .then(() => {
      Arduino.esp_panel_selected_lcd_macro = '';
    })
    .catch(error => console.error('ESP32_Display_Panel macro cleanup failed:', error));
}

if (typeof Arduino.esp_panel_selected_lcd_macro === 'undefined') {
  Arduino.esp_panel_selected_lcd_macro = '';
}

if (typeof Blockly !== 'undefined' && Blockly.getMainWorkspace) {
  setTimeout(() => {
    const workspace = Blockly.getMainWorkspace();
    if (!workspace || workspace._espPanelDeleteListenerAdded) return;

    const deleteListener = event => {
      if (event.type === Blockly.Events.BLOCK_DELETE &&
          event.oldJson && event.oldJson.type === 'esp_panel_board_init') {
        espPanelClearProjectMacros();
      }
    };
    workspace.addChangeListener(deleteListener);
    workspace._espPanelDeleteListenerAdded = true;
  }, 100);
}

function espPanelAddDisplayObject(generator, variable) {
  generator.addObject('esp_panel_display_type', `struct AilyESPPanel {
  esp_panel::drivers::BusSPI *bus = nullptr;
  esp_panel::drivers::LCD *lcd = nullptr;
  esp_panel::drivers::Touch *touch = nullptr;
  esp_panel::drivers::Backlight *backlight = nullptr;
  esp_panel::drivers::IO_Expander *io_expander = nullptr;
  bool ready = false;

  esp_panel::drivers::LCD *getLCD() { return lcd; }
  esp_panel::drivers::Touch *getTouch() { return touch; }
  esp_panel::drivers::Backlight *getBacklight() { return backlight; }
  esp_panel::drivers::IO_Expander *getIO_Expander() { return io_expander; }
  bool isReady() const { return ready; }

  bool del() {
    ready = false;
    delete backlight;
    backlight = nullptr;
    delete touch;
    touch = nullptr;
    delete lcd;
    lcd = nullptr;
    delete bus;
    bus = nullptr;
    delete io_expander;
    io_expander = nullptr;
    return true;
  }

  ~AilyESPPanel() { del(); }
};`);
  generator.addObject('esp_panel_display_' + variable, 'AilyESPPanel ' + variable + ';');
}

function espPanelAddFillRectHelper(generator) {
  generator.addLibrary('esp_heap_caps', '#include <esp_heap_caps.h>');
  generator.addFunction('espPanelFillRect', `static bool espPanelFillRect(
    esp_panel::drivers::LCD *lcd, int x, int y, int width, int height, uint16_t color) {
  if ((lcd == nullptr) || (lcd->getFrameColorBits() != 16) || (width <= 0) || (height <= 0)) {
    return false;
  }
  uint16_t *line = static_cast<uint16_t *>(
      heap_caps_malloc(static_cast<size_t>(width) * sizeof(uint16_t), MALLOC_CAP_DMA | MALLOC_CAP_INTERNAL));
  if (line == nullptr) return false;
  for (int i = 0; i < width; ++i) line[i] = color;
  bool ok = true;
  for (int row = 0; row < height; ++row) {
    if (!lcd->drawBitmap(x, y + row, width, 1, reinterpret_cast<const uint8_t *>(line), -1)) {
      ok = false;
      break;
    }
  }
  heap_caps_free(line);
  return ok;
}`);
}

function espPanelAddTouchHelper(generator) {
  generator.addVariable(
    'esp_panel_last_touch_point',
    'static esp_panel::drivers::TouchPoint esp_panel_last_touch_point;'
  );
  generator.addFunction('espPanelReadTouch', `static bool espPanelReadTouch(
    esp_panel::drivers::Touch *touch, int timeout_ms) {
  if (touch == nullptr) {
    esp_panel_last_touch_point = esp_panel::drivers::TouchPoint();
    return false;
  }
  const int count = touch->readPoints(&esp_panel_last_touch_point, 1, timeout_ms);
  if (count > 0) return true;
  esp_panel_last_touch_point = esp_panel::drivers::TouchPoint();
  return false;
}`);
}

Arduino.forBlock['esp_panel_board_init'] = function(block, generator) {
  espPanelAttachVariableMonitor(block);
  const variable = block.getFieldValue('VAR') || 'panel';
  const requestedModel = block.getFieldValue('MODEL') || 'ST7789';
  const model = ESP_PANEL_LCD_MODELS.has(requestedModel) ? requestedModel : 'ST7789';
  const width = block.getFieldValue('WIDTH') || '240';
  const height = block.getFieldValue('HEIGHT') || '320';
  const miso = block.getFieldValue('MISO') || '-1';
  const mosi = block.getFieldValue('MOSI') || '-1';
  const sclk = block.getFieldValue('SCLK') || '-1';
  const cs = block.getFieldValue('CS') || '-1';
  const dc = block.getFieldValue('DC') || '-1';
  const rst = block.getFieldValue('RST') || '-1';
  const bl = block.getFieldValue('BL') || '-1';
  const blLevel = block.getFieldValue('BL_LEVEL') || 'true';
  const colorMode = block.getFieldValue('COLOR_MODE') || 'false';
  const frequency = block.getFieldValue('FREQUENCY') || '40000000';

  espPanelAddBuildMacros(generator, model);
  espPanelSyncProjectMacros(model);
  espPanelEnsureLibrary(generator);
  registerVariableToBlockly(variable, 'ESPPanelBoard');
  espPanelAddDisplayObject(generator, variable);

  return variable + '.del();\n' +
    variable + '.bus = new esp_panel::drivers::BusSPI(' + cs + ', ' + dc + ', ' + sclk + ', ' + mosi + ', ' + miso + ');\n' +
    variable + '.bus->configSPI_FreqHz(' + frequency + ');\n' +
    variable + '.lcd = new esp_panel::drivers::LCD_' + model +
      '(' + variable + '.bus, ' + width + ', ' + height + ', 16, ' + rst + ');\n' +
    variable + '.lcd->configColorRGB_Order(' + colorMode + ');\n' +
    'if ((' + bl + ') >= 0) {\n' +
    '  ' + variable + '.backlight = new esp_panel::drivers::BacklightPWM_LEDC(' + bl + ', ' + blLevel + ');\n' +
    '  if (!' + variable + '.backlight->begin()) {\n' +
    '    delete ' + variable + '.backlight;\n' +
    '    ' + variable + '.backlight = nullptr;\n' +
    '  } else {\n' +
    '    ' + variable + '.backlight->off();\n' +
    '  }\n' +
    '}\n' +
    variable + '.ready = ' + variable + '.lcd->begin();\n' +
    'if (' + variable + '.ready) {\n' +
    '  ' + variable + '.lcd->setDisplayOnOff(true);\n' +
    '  if (' + variable + '.backlight != nullptr) ' + variable + '.backlight->on();\n' +
    '}\n';
};

Arduino.forBlock['esp_panel_board_delete'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  return espPanelVariableName(block) + '.del();\n';
};

Arduino.forBlock['esp_panel_board_ready'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  return [variable + '.isReady()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['esp_panel_has_device'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const device = block.getFieldValue('DEVICE') || 'LCD';
  const getters = {
    LCD: 'getLCD',
    TOUCH: 'getTouch',
    BACKLIGHT: 'getBacklight',
    EXPANDER: 'getIO_Expander'
  };
  return [variable + '.' + getters[device] + '() != nullptr', generator.ORDER_RELATIONAL];
};

Arduino.forBlock['esp_panel_lcd_color_bar'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  return 'if (' + variable + '.getLCD() != nullptr) ' + variable + '.getLCD()->colorBarTest();\n';
};

Arduino.forBlock['esp_panel_lcd_display'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const state = block.getFieldValue('STATE') || 'true';
  return 'if (' + variable + '.getLCD() != nullptr) ' + variable + '.getLCD()->setDisplayOnOff(' + state + ');\n';
};

Arduino.forBlock['esp_panel_lcd_invert'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const state = block.getFieldValue('STATE') || 'true';
  return 'if (' + variable + '.getLCD() != nullptr) ' + variable + '.getLCD()->invertColor(' + state + ');\n';
};

Arduino.forBlock['esp_panel_lcd_transform'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const operation = block.getFieldValue('OP') || 'mirrorX';
  const state = block.getFieldValue('STATE') || 'true';
  return 'if (' + variable + '.getLCD() != nullptr) ' + variable + '.getLCD()->' + operation + '(' + state + ');\n';
};

Arduino.forBlock['esp_panel_lcd_set_gap'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const x = espPanelValue(block, generator, 'X', '0');
  const y = espPanelValue(block, generator, 'Y', '0');
  return 'if (' + variable + '.getLCD() != nullptr) {\n' +
    '  ' + variable + '.getLCD()->setGapX(' + x + ');\n' +
    '  ' + variable + '.getLCD()->setGapY(' + y + ');\n' +
    '}\n';
};

Arduino.forBlock['esp_panel_bitmap_data'] = function(block, generator) {
  const data = block.getFieldValue('DATA') || 'rgb565_data';
  const safeData = /^[A-Za-z_][A-Za-z0-9_]*(?:\[[^\]]+\])?$/.test(data) ? data : 'nullptr';
  return [safeData, generator.ORDER_ATOMIC];
};

Arduino.forBlock['esp_panel_lcd_draw_bitmap'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const x = espPanelValue(block, generator, 'X', '0');
  const y = espPanelValue(block, generator, 'Y', '0');
  const width = espPanelValue(block, generator, 'W', '0');
  const height = espPanelValue(block, generator, 'H', '0');
  const data = espPanelValue(block, generator, 'DATA', 'nullptr');
  const timeout = espPanelValue(block, generator, 'TIMEOUT', '-1');
  return 'if (' + variable + '.getLCD() != nullptr) ' + variable + '.getLCD()->drawBitmap(' +
    x + ', ' + y + ', ' + width + ', ' + height +
    ', reinterpret_cast<const uint8_t *>(' + data + '), ' + timeout + ');\n';
};

Arduino.forBlock['esp_panel_lcd_fill_screen'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  espPanelAddFillRectHelper(generator);
  const variable = espPanelVariableName(block);
  const color = espPanelValue(block, generator, 'COLOR', '0');
  return 'if (' + variable + '.getLCD() != nullptr) espPanelFillRect(' + variable + '.getLCD()' +
    ', 0, 0, ' + variable + '.getLCD()->getFrameWidth(), ' +
    variable + '.getLCD()->getFrameHeight(), ' + color + ');\n';
};

Arduino.forBlock['esp_panel_lcd_fill_rect'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  espPanelAddFillRectHelper(generator);
  const variable = espPanelVariableName(block);
  const x = espPanelValue(block, generator, 'X', '0');
  const y = espPanelValue(block, generator, 'Y', '0');
  const width = espPanelValue(block, generator, 'W', '0');
  const height = espPanelValue(block, generator, 'H', '0');
  const color = espPanelValue(block, generator, 'COLOR', '0');
  return 'espPanelFillRect(' + variable + '.getLCD(), ' + x + ', ' + y + ', ' + width + ', ' + height + ', ' + color + ');\n';
};

Arduino.forBlock['esp_panel_rgb565'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  generator.addFunction('espPanelRgb565', `static uint16_t espPanelRgb565(uint8_t red, uint8_t green, uint8_t blue) {
  return static_cast<uint16_t>(((red & 0xF8) << 8) | ((green & 0xFC) << 3) | (blue >> 3));
}`);
  const red = espPanelValue(block, generator, 'R', '0');
  const green = espPanelValue(block, generator, 'G', '0');
  const blue = espPanelValue(block, generator, 'B', '0');
  return ['espPanelRgb565(' + red + ', ' + green + ', ' + blue + ')', generator.ORDER_ATOMIC];
};

Arduino.forBlock['esp_panel_lcd_info'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const info = block.getFieldValue('INFO') || 'WIDTH';
  const methods = {
    WIDTH: 'getFrameWidth()',
    HEIGHT: 'getFrameHeight()',
    COLOR_BITS: 'getFrameColorBits()'
  };
  return [
    '(' + variable + '.getLCD() != nullptr ? ' + variable + '.getLCD()->' + methods[info] + ' : -1)',
    generator.ORDER_CONDITIONAL
  ];
};

Arduino.forBlock['esp_panel_touch_read'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  espPanelAddTouchHelper(generator);
  const variable = espPanelVariableName(block);
  const timeout = espPanelValue(block, generator, 'TIMEOUT', '0');
  return ['espPanelReadTouch(' + variable + '.getTouch(), ' + timeout + ')', generator.ORDER_ATOMIC];
};

Arduino.forBlock['esp_panel_touch_value'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  espPanelAddTouchHelper(generator);
  const value = block.getFieldValue('VALUE') || 'x';
  return ['esp_panel_last_touch_point.' + value, generator.ORDER_ATOMIC];
};

Arduino.forBlock['esp_panel_touch_transform'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const operation = block.getFieldValue('OP') || 'mirrorX';
  const state = block.getFieldValue('STATE') || 'true';
  return 'if (' + variable + '.getTouch() != nullptr) ' + variable + '.getTouch()->' + operation + '(' + state + ');\n';
};

Arduino.forBlock['esp_panel_touch_interrupt'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  return [
    '(' + variable + '.getTouch() != nullptr && ' + variable + '.getTouch()->isInterruptEnabled())',
    generator.ORDER_LOGICAL_AND
  ];
};

Arduino.forBlock['esp_panel_touch_button'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const index = espPanelValue(block, generator, 'INDEX', '0');
  const timeout = espPanelValue(block, generator, 'TIMEOUT', '0');
  return [
    '(' + variable + '.getTouch() != nullptr ? ' + variable + '.getTouch()->readButtonState(' +
      index + ', ' + timeout + ') : -1)',
    generator.ORDER_CONDITIONAL
  ];
};

Arduino.forBlock['esp_panel_backlight_set'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const brightness = espPanelValue(block, generator, 'BRIGHTNESS', '100');
  return 'if (' + variable + '.getBacklight() != nullptr) ' +
    variable + '.getBacklight()->setBrightness(' + brightness + ');\n';
};

Arduino.forBlock['esp_panel_backlight_switch'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  const state = block.getFieldValue('STATE') || 'on';
  return 'if (' + variable + '.getBacklight() != nullptr) ' +
    variable + '.getBacklight()->' + state + '();\n';
};

Arduino.forBlock['esp_panel_backlight_get'] = function(block, generator) {
  espPanelEnsureLibrary(generator);
  const variable = espPanelVariableName(block);
  return [
    '(' + variable + '.getBacklight() != nullptr ? ' +
      variable + '.getBacklight()->getBrightness() : -1)',
    generator.ORDER_CONDITIONAL
  ];
};
