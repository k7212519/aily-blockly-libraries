Arduino.forBlock['pca9685_create'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var addr = block.getFieldValue('ADDR');

  generator.addLibrary('#include <Adafruit_PWMServoDriver.h>', '#include <Adafruit_PWMServoDriver.h>');
  generator.addLibrary('#include <Wire.h>', '#include <Wire.h>');
  generator.addVariable('Adafruit_PWMServoDriver ' + varName, 'Adafruit_PWMServoDriver ' + varName + '(' + addr + ');');

  return '';
};

Arduino.forBlock['pca9685_begin'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);

  return varName + '.begin();\n';
};

Arduino.forBlock['pca9685_set_pwm_freq'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var freq = generator.valueToCode(block, 'FREQ', Arduino.ORDER_ATOMIC) || '50';

  return varName + '.setPWMFreq(' + freq + ');\n';
};

Arduino.forBlock['pca9685_set_pwm'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var channel = block.getFieldValue('CHANNEL');
  var on = generator.valueToCode(block, 'ON', Arduino.ORDER_ATOMIC) || '0';
  var off = generator.valueToCode(block, 'OFF', Arduino.ORDER_ATOMIC) || '0';

  return varName + '.setPWM(' + channel + ', ' + on + ', ' + off + ');\n';
};

Arduino.forBlock['pca9685_set_servo_angle'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var channel = block.getFieldValue('CHANNEL');
  var angle = generator.valueToCode(block, 'ANGLE', Arduino.ORDER_ATOMIC) || '90';

  var funcName = 'pca9685_angle_to_pulse';
  var funcDef =
    'int ' + funcName + '(int angle) {\n' +
    '  int pulse = map(angle, 0, 180, SERVOMIN, SERVOMAX);\n' +
    '  return pulse;\n' +
    '}\n';

  generator.addMacro('#define SERVOMIN 150', '#define SERVOMIN 150');
  generator.addMacro('#define SERVOMAX 600', '#define SERVOMAX 600');
  generator.addFunction(funcName, funcDef);

  return varName + '.setPWM(' + channel + ', 0, ' + funcName + '(' + angle + '));\n';
};

Arduino.forBlock['pca9685_set_pin'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var channel = block.getFieldValue('CHANNEL');
  var value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';

  return varName + '.setPin(' + channel + ', ' + value + ');\n';
};

Arduino.forBlock['pca9685_write_microseconds'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var channel = block.getFieldValue('CHANNEL');
  var microseconds = generator.valueToCode(block, 'MICROSECONDS', Arduino.ORDER_ATOMIC) || '1500';

  return varName + '.writeMicroseconds(' + channel + ', ' + microseconds + ');\n';
};

Arduino.forBlock['pca9685_sleep'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);

  return varName + '.sleep();\n';
};

Arduino.forBlock['pca9685_wakeup'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);

  return varName + '.wakeup();\n';
};

Arduino.forBlock['pca9685_set_oscillator_freq'] = function(block, generator) {
  var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var freq = block.getFieldValue('FREQ');

  return varName + '.setOscillatorFrequency(' + freq + ');\n';
};