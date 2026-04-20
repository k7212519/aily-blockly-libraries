function ensureK10(generator) {
  generator.addLibrary('unihiker_k10', '#include "unihiker_k10.h"');
  generator.addVariable('k10', 'UNIHIKER_K10 k10;');
  generator.addSetupBegin('k10_begin', 'k10.begin();');
}

function ensureASR(generator) {
  ensureK10(generator);
  generator.addLibrary('asr', '#include "asr.h"');
  generator.addVariable('asr', 'ASR asr;');
}

// ========== 初始化语音识别 ==========
Arduino.forBlock['k10_asr_init'] = function(block, generator) {
  ensureASR(generator);
  generator.addSetupBegin('asr_init', 'asr.asrInit(CONTINUOUS, ZH, 10);');
  generator.addSetupBegin('asr_wait', 'while(asr._asrState == 0){delay(100);}');
  return '';
};

// ========== 添加语音命令 ==========
Arduino.forBlock['k10_asr_add_command'] = function(block, generator) {
  var id = generator.valueToCode(block, 'ID', generator.ORDER_ATOMIC) || '0';
  var keyword = generator.valueToCode(block, 'KEYWORD', generator.ORDER_ATOMIC) || '""';
  ensureASR(generator);
  return 'asr.addASRCommand(' + id + ', ' + keyword + ');\n';
};

// ========== 语音是否唤醒 ==========
Arduino.forBlock['k10_asr_is_wakeup'] = function(block, generator) {
  ensureASR(generator);
  return ['asr.isWakeUp()', generator.ORDER_ATOMIC];
};

// ========== 识别到命令 ==========
Arduino.forBlock['k10_asr_is_detected'] = function(block, generator) {
  var id = generator.valueToCode(block, 'ID', generator.ORDER_ATOMIC) || '0';
  ensureASR(generator);
  return ['asr.isDetectCmdID(' + id + ')', generator.ORDER_ATOMIC];
};

// ========== 语音合成播报 ==========
Arduino.forBlock['k10_asr_speak'] = function(block, generator) {
  var text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '""';
  ensureASR(generator);
  return 'asr.speak(' + text + ');\n';
};

// ========== 设置播报速度 ==========
Arduino.forBlock['k10_asr_set_speed'] = function(block, generator) {
  var speed = block.getFieldValue('SPEED');
  ensureASR(generator);
  return 'asr.setAsrSpeed(' + speed + ');\n';
};
