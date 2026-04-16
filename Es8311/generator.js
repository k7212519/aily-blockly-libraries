/**
 * ES8311 Audio Codec Library Generator
 * 基于 ES8311Audio 类库，ESP32 I2S 音频录音与播放
 */
'use strict';

// 板卡适配机制
function isESP32Core() {
  const boardConfig = window['boardConfig'];
  return boardConfig && boardConfig.core && boardConfig.core.indexOf('esp32') > -1;
}

// ES8311 Init Block
Arduino.forBlock['es8311_init'] = function(block, generator) {
  const ES8311_TYPE = 'ES8311';
  // 变量重命名监听器
  if (!block._varMonitorAttached) {
    block._varMonitorAttached = true;
    block._varLastName = block.getFieldValue('VAR') || 'audio';
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
          renameVariableInBlockly(block, oldName, newName, ES8311_TYPE);
          block._varLastName = newName;
        }
      };
    }
  }

  const varName = block.getFieldValue('VAR') || 'audio';
  const wire = block.getFieldValue('WIRE') || 'Wire';
  const address = block.getFieldValue('ADDRESS') || '0x18';

  // 添加库引用
  generator.addLibrary('Wire', '#include <Wire.h>');
  generator.addLibrary('ES8311Audio', '#include <ES8311Audio.h>');

  // 注册变量
  registerVariableToBlockly(varName, ES8311_TYPE);

  // 声明对象
  generator.addObject(varName, 'ES8311Audio ' + varName + ';');

  // Wire 初始化
  generator.addSetup('wire_' + wire + '_begin', wire + '.begin();');

  // Serial初始化（用于调试输出）
  ensureSerialBegin('Serial', generator);

  // I2C初始化代码
  let code = varName + '.beginI2C(' + wire + ', ' + address + ');\n';
  return code;
};

// ES8311 I2S Config Block (I2S引脚配置 + 录音时长)
Arduino.forBlock['es8311_i2s_config'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'audio';
  const mck = block.getFieldValue('MCK') || '46';
  const bck = block.getFieldValue('BCK') || '39';
  const ws = block.getFieldValue('WS') || '2';
  const dout = block.getFieldValue('DOUT') || '38';
  const din = block.getFieldValue('DIN') || '40';
  const duration = generator.valueToCode(block, 'DURATION', generator.ORDER_ATOMIC) || '5';

  generator.addLibrary('ES8311Audio', '#include <ES8311Audio.h>');

  let code = varName + '.beginI2S(' + mck + ', ' + bck + ', ' + ws + ', ' + dout + ', ' + din + ', ' + duration + ');\n';
  return code;
};

// ES8311 Record Block
Arduino.forBlock['es8311_record'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  return varName + '.record();\n';
};

// ES8311 Play Block
Arduino.forBlock['es8311_play'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  return varName + '.play();\n';
};

// ES8311 Has Recording Block
Arduino.forBlock['es8311_has_recording'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  return [varName + '.hasRecording()', generator.ORDER_FUNCTION_CALL];
};

// ES8311 Set Volume Block
Arduino.forBlock['es8311_set_volume'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  var volume = block.getFieldValue('VOLUME');
  return varName + '.setVolume(' + volume + ');\n';
};

// ES8311 Set Mic Gain Block
Arduino.forBlock['es8311_set_mic_gain'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  const gain = block.getFieldValue('GAIN') || '0';
  return varName + '.setMicGain(' + gain + ');\n';
};

// ES8311 Stop Block
Arduino.forBlock['es8311_stop'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  return varName + '.stop();\n';
};

// ES8311 Sound Detected Block
Arduino.forBlock['es8311_sound_detected'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  var threshold = block.getFieldValue('THRESHOLD');
  return [varName + '.soundDetected(' + threshold + ')', generator.ORDER_FUNCTION_CALL];
};

// ES8311 Mute Block
Arduino.forBlock['es8311_mute'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  const mode = block.getFieldValue('MODE') || '0';
  return varName + '.mute(' + mode + ');\n';
};

// ES8311 Play Tone Block
Arduino.forBlock['es8311_play_tone'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  var freq = block.getFieldValue('FREQ');
  var duration = block.getFieldValue('DURATION');
  return varName + '.playTone(' + freq + ', ' + duration + ');\n';
};

// ES8311 ALC Enable Block
Arduino.forBlock['es8311_alc_enable'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  const enable = block.getFieldValue('ENABLE') || 'true';
  return varName + '.alcEnable(' + enable + ');\n';
};

// ES8311 Record Slot Block
Arduino.forBlock['es8311_record_slot'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  const slot = block.getFieldValue('SLOT') || '0';
  return varName + '.recordSlot(' + slot + ');\n';
};

// ES8311 Play Slot Block
Arduino.forBlock['es8311_play_slot'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  const slot = block.getFieldValue('SLOT') || '0';
  return varName + '.playSlot(' + slot + ');\n';
};

// ES8311 Play Loop Block
Arduino.forBlock['es8311_play_loop'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'audio';
  return varName + '.playLoop();\n';
};