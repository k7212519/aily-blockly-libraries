function ensureK10(generator) {
  generator.addLibrary('unihiker_k10', '#include "unihiker_k10.h"');
  generator.addVariable('k10', 'UNIHIKER_K10 k10;');
  generator.addSetupBegin('k10_begin', 'k10.begin();');
}

// ========== 获取加速度 ==========
Arduino.forBlock['k10_get_accelerometer'] = function(block, generator) {
  var axis = block.getFieldValue('AXIS');
  ensureK10(generator);
  return ['(k10.getAccelerometer' + axis + '())', generator.ORDER_ATOMIC];
};

// ========== 获取运动强度 ==========
Arduino.forBlock['k10_get_strength'] = function(block, generator) {
  ensureK10(generator);
  return ['(k10.getStrength())', generator.ORDER_ATOMIC];
};
