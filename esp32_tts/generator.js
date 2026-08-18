Arduino.esp32TtsGetVariableName = function(block) {
  const varField = block.getField('VAR');
  return varField ? varField.getText() : 'tts';
};

Arduino.esp32TtsI2sVariableName = function(varName) {
  return varName + '_i2s';
};

Arduino.forBlock['esp32_tts_init'] = function(block, generator) {
  const variableType = 'ESP32TTS';

  if (!block._varMonitorAttached) {
    block._varMonitorAttached = true;
    block._varLastName = block.getFieldValue('VAR') || 'tts';
    registerVariableToBlockly(block._varLastName, variableType);
    const varField = block.getField('VAR');
    if (varField) {
      const originalFinishEditing = varField.onFinishEditing_;
      varField.onFinishEditing_ = function(newName) {
        if (typeof originalFinishEditing === 'function') {
          originalFinishEditing.call(this, newName);
        }
        const workspace = block.workspace || (typeof Blockly !== 'undefined' && Blockly.getMainWorkspace && Blockly.getMainWorkspace());
        const oldName = block._varLastName;
        if (workspace && newName && newName !== oldName) {
          renameVariableInBlockly(block, oldName, newName, variableType);
          block._varLastName = newName;
        }
      };
    }
  }

  const varName = block.getFieldValue('VAR') || 'tts';
  const i2sName = Arduino.esp32TtsI2sVariableName(varName);
  const model = block.getFieldValue('MODEL') || '0';
  const bclk = generator.valueToCode(block, 'BCLK', generator.ORDER_ATOMIC) || '5';
  const lrclk = generator.valueToCode(block, 'LRCLK', generator.ORDER_ATOMIC) || '6';
  const dout = generator.valueToCode(block, 'DOUT', generator.ORDER_ATOMIC) || '7';
  const mclk = generator.valueToCode(block, 'MCLK', generator.ORDER_ATOMIC) || '-1';

  const boardConfig = typeof window !== 'undefined' ? window['boardConfig'] : null;
  const boardCore = boardConfig && boardConfig.core ? String(boardConfig.core).toLowerCase() : '';
  if (boardCore && boardCore.indexOf('esp32') === -1) {
    generator.addMacro('ESP32_TTS_BOARD_HINT', '#warning "ESP32TTS requires an ESP32-S3 board"');
  }
  generator.addMacro(
    'ESP32_TTS_TARGET_GUARD',
    '#if !defined(CONFIG_IDF_TARGET_ESP32S3) && !defined(ARDUINO_ESP32S3_DEV)\n' +
    '#error "ESP32TTS requires an ESP32-S3 target"\n' +
    '#endif'
  );
  generator.addMacro('ESP32_TTS_USE_STANDARD_VOICE', '#define ESP32_TTS_USE_STANDARD_VOICE ' + model);
  generator.addLibrary('ESP32_TTS_I2S', '#include <ESP_I2S.h>');
  generator.addLibrary('ESP32_TTS', '#include <ESP32TTS.h>');
  generator.addObject('ESP32_TTS_' + varName, 'I2SClass ' + i2sName + ';\nESP32TTS ' + varName + ';');
  registerVariableToBlockly(varName, variableType);
  ensureSerialBegin('Serial', generator);

  let code = '';
  code += i2sName + '.setPins(' + bclk + ', ' + lrclk + ', ' + dout + ', -1, ' + mclk + ');\n';
  code += 'if (!' + i2sName + '.begin(I2S_MODE_STD, ESP32TTS::sampleRate, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_MONO, I2S_STD_SLOT_LEFT)) {\n';
  code += '  Serial.println("ESP32TTS: I2S initialization failed");\n';
  code += '} else if (!' + varName + '.begin()) {\n';
  code += '  Serial.printf("ESP32TTS initialization failed: %s\\n", ' + varName + '.lastErrorMessage());\n';
  code += '}\n';
  return code;
};

Arduino.forBlock['esp32_tts_speak'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  const i2sName = Arduino.esp32TtsI2sVariableName(varName);
  const value = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '""';
  ensureSerialBegin('Serial', generator);
  return 'if (!' + varName + '.speak(String(' + value + ').c_str(), ' + i2sName + ')) {\n' +
    '  Serial.printf("ESP32TTS speak failed: %s\\n", ' + varName + '.lastErrorMessage());\n' +
    '}\n';
};

Arduino.forBlock['esp32_tts_speak_pinyin'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  const i2sName = Arduino.esp32TtsI2sVariableName(varName);
  const value = generator.valueToCode(block, 'PINYIN', generator.ORDER_ATOMIC) || '""';
  ensureSerialBegin('Serial', generator);
  return 'if (!' + varName + '.speakPinyin(String(' + value + ').c_str(), ' + i2sName + ')) {\n' +
    '  Serial.printf("ESP32TTS pinyin failed: %s\\n", ' + varName + '.lastErrorMessage());\n' +
    '}\n';
};

Arduino.forBlock['esp32_tts_speak_money'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  const i2sName = Arduino.esp32TtsI2sVariableName(varName);
  const yuan = generator.valueToCode(block, 'YUAN', generator.ORDER_ATOMIC) || '0';
  const jiao = generator.valueToCode(block, 'JIAO', generator.ORDER_ATOMIC) || '0';
  const fen = generator.valueToCode(block, 'FEN', generator.ORDER_ATOMIC) || '0';
  const mode = block.getFieldValue('MODE') || 'ESP32TTSPayMode::NumberOnly';
  ensureSerialBegin('Serial', generator);
  return 'if (!' + varName + '.speakMoney(' + yuan + ', ' + jiao + ', ' + fen + ', ' + mode + ', ' + i2sName + ')) {\n' +
    '  Serial.printf("ESP32TTS money failed: %s\\n", ' + varName + '.lastErrorMessage());\n' +
    '}\n';
};

Arduino.forBlock['esp32_tts_set_speed'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  const speed = block.getFieldValue('SPEED') || '3';
  ensureSerialBegin('Serial', generator);
  return 'if (!' + varName + '.setSpeed(' + speed + ')) {\n' +
    '  Serial.printf("ESP32TTS speed failed: %s\\n", ' + varName + '.lastErrorMessage());\n' +
    '}\n';
};

Arduino.forBlock['esp32_tts_get_speed'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  return [varName + '.speed()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['esp32_tts_is_ready'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  return [varName + '.isReady()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['esp32_tts_is_speaking'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  return [varName + '.isSpeaking()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['esp32_tts_last_error'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  return ['static_cast<uint8_t>(' + varName + '.lastError())', generator.ORDER_ATOMIC];
};

Arduino.forBlock['esp32_tts_last_error_message'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  return ['String(' + varName + '.lastErrorMessage())', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['esp32_tts_stop'] = function(block) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  return varName + '.stop();\n';
};

Arduino.forBlock['esp32_tts_end'] = function(block, generator) {
  const varName = Arduino.esp32TtsGetVariableName(block);
  ensureSerialBegin('Serial', generator);
  return 'if (!' + varName + '.end()) {\n' +
    '  Serial.printf("ESP32TTS end failed: %s\\n", ' + varName + '.lastErrorMessage());\n' +
    '}\n';
};
