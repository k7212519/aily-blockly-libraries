// Ensure k10 object is initialized
function ensureK10(generator) {
  generator.addLibrary('unihiker_k10', '#include "unihiker_k10.h"');
  generator.addVariable('k10', 'UNIHIKER_K10 k10;');
  generator.addSetupBegin('k10_begin', 'k10.begin();');
}

// ========== 按键轮询 ==========
Arduino.forBlock['k10_button_pressed'] = function(block, generator) {
  var button = block.getFieldValue('BUTTON');
  ensureK10(generator);
  return ['(k10.' + button + '->isPressed())', generator.ORDER_ATOMIC];
};

// ========== 按键回调（hat block）==========
Arduino.forBlock['k10_button_callback'] = function(block, generator) {
  var button = block.getFieldValue('BUTTON');
  var handlerCode = generator.statementToCode(block, 'HANDLER') || '';
  var callbackName = 'onK10_' + button + '_Pressed';

  ensureK10(generator);

  // Forward declare and define callback function
  generator.addVariable(callbackName + '_decl', 'void ' + callbackName + '();');
  var functionDef = 'void ' + callbackName + '() {\n' + handlerCode + '}\n';
  generator.addFunction(callbackName, functionDef);

  // Register callback in setup
  generator.addSetupEnd(callbackName + '_reg', 'k10.' + button + '->setPressedCallback(' + callbackName + ');');

  return '';
};
