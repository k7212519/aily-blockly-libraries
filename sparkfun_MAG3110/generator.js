// SparkFun MAG3110 三轴磁力计代码生成器

// 通用库管理函数
function ensureLibrary(generator, libraryKey, libraryCode) {
  if (!generator.libraries_) {
    generator.libraries_ = {};
  }
  if (!generator.libraries_[libraryKey]) {
    generator.addLibrary(libraryKey, libraryCode);
  }
}

function ensureMAG3110Libraries(generator) {
  ensureLibrary(generator, 'wire', '#include <Wire.h>');
  ensureLibrary(generator, 'sparkfun_mag3110', '#include <SparkFun_MAG3110.h>');
}

// 添加读取原始磁场值的辅助函数
function ensureReadMagHelper(generator, varName) {
  var funcName = '_mag3110_read_' + varName;
  generator.addVariable(funcName + '_x', 'int ' + funcName + '_x = 0;');
  generator.addVariable(funcName + '_y', 'int ' + funcName + '_y = 0;');
  generator.addVariable(funcName + '_z', 'int ' + funcName + '_z = 0;');
  generator.addFunction(funcName, 'void ' + funcName + '() {\n  ' + varName + '.readMag(&' + funcName + '_x, &' + funcName + '_y, &' + funcName + '_z);\n}\n');
}

// 添加读取微特斯拉值的辅助函数
function ensureReadMicroTeslaHelper(generator, varName) {
  var funcName = '_mag3110_ut_' + varName;
  generator.addVariable(funcName + '_x', 'float ' + funcName + '_x = 0;');
  generator.addVariable(funcName + '_y', 'float ' + funcName + '_y = 0;');
  generator.addVariable(funcName + '_z', 'float ' + funcName + '_z = 0;');
  generator.addFunction(funcName, 'void ' + funcName + '() {\n  ' + varName + '.readMicroTeslas(&' + funcName + '_x, &' + funcName + '_y, &' + funcName + '_z);\n}\n');
}

// ==================== 初始化 ====================
Arduino.forBlock['mag3110_init'] = function(block, generator) {
  // 变量重命名监听器
  if (!block._mag3110VarMonitorAttached) {
    block._mag3110VarMonitorAttached = true;
    block._mag3110VarLastName = block.getFieldValue('VAR') || 'mag';
    registerVariableToBlockly(block._mag3110VarLastName, 'MAG3110');
    var varField = block.getField('VAR');
    if (varField) {
      var originalFinishEditing = varField.onFinishEditing_;
      varField.onFinishEditing_ = function(newName) {
        if (typeof originalFinishEditing === 'function') {
          originalFinishEditing.call(this, newName);
        }
        var workspace = block.workspace || (typeof Blockly !== 'undefined' && Blockly.getMainWorkspace && Blockly.getMainWorkspace());
        var oldName = block._mag3110VarLastName;
        if (workspace && newName && newName !== oldName) {
          renameVariableInBlockly(block, oldName, newName, 'MAG3110');
          block._mag3110VarLastName = newName;
        }
      };
    }
  }

  var varName = block.getFieldValue('VAR') || 'mag';
  var wire = block.getFieldValue('WIRE') || 'Wire';

  ensureMAG3110Libraries(generator);

  // 添加MAG3110对象
  generator.addObject(varName, 'MAG3110 ' + varName + ';');

  // Wire初始化
  var wireBeginKey = 'wire_' + wire + '_begin';
  var isAlreadyInitialized = false;
  if (generator.setupCodes_) {
    if (generator.setupCodes_[wireBeginKey]) {
      isAlreadyInitialized = true;
    }
  }
  if (!isAlreadyInitialized) {
    var pinComment = '';
    try {
      var pins = null;
      var customPins = window['customI2CPins'];
      if (customPins && customPins[wire]) {
        pins = customPins[wire];
      } else {
        var boardConfig = window['boardConfig'];
        if (boardConfig && boardConfig.i2cPins && boardConfig.i2cPins[wire]) {
          pins = boardConfig.i2cPins[wire];
        }
      }
      if (pins) {
        var sdaPin = pins.find(function(pin) { return pin[0] === 'SDA'; });
        var sclPin = pins.find(function(pin) { return pin[0] === 'SCL'; });
        if (sdaPin && sclPin) {
          pinComment = '  // ' + wire + ': SDA=' + sdaPin[1] + ', SCL=' + sclPin[1] + '\n  ';
        }
      }
    } catch (e) {}
    if (wire !== 'Wire') {
      generator.addSetup(wireBeginKey, pinComment + wire + '.begin();\n');
    } else {
      generator.addSetup(wireBeginKey, pinComment + 'Wire.begin();\n');
    }
  }

  // 生成初始化代码
  var code = varName + '.initialize();\n';
  code += varName + '.start();\n';
  return code;
};

// ==================== 数据就绪 ====================
Arduino.forBlock['mag3110_data_ready'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  return [varName + '.dataReady()', generator.ORDER_FUNCTION_CALL];
};

// ==================== 读取原始轴值 ====================
Arduino.forBlock['mag3110_read_axis'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  var axis = block.getFieldValue('AXIS') || 'X';

  ensureMAG3110Libraries(generator);
  ensureReadMagHelper(generator, varName);

  var funcName = '_mag3110_read_' + varName;
  return ['(' + funcName + '(), ' + funcName + '_' + axis.toLowerCase() + ')', generator.ORDER_FUNCTION_CALL];
};

// ==================== 读取微特斯拉 ====================
Arduino.forBlock['mag3110_read_microtesla'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  var axis = block.getFieldValue('AXIS') || 'X';

  ensureMAG3110Libraries(generator);
  ensureReadMicroTeslaHelper(generator, varName);

  var funcName = '_mag3110_ut_' + varName;
  return ['(' + funcName + '(), ' + funcName + '_' + axis.toLowerCase() + ')', generator.ORDER_FUNCTION_CALL];
};

// ==================== 读取航向角 ====================
Arduino.forBlock['mag3110_read_heading'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  return [varName + '.readHeading()', generator.ORDER_FUNCTION_CALL];
};

// ==================== 进入校准模式 ====================
Arduino.forBlock['mag3110_enter_cal_mode'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  return varName + '.enterCalMode();\n';
};

// ==================== 执行校准步骤 ====================
Arduino.forBlock['mag3110_calibrate'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  return varName + '.calibrate();\n';
};

// ==================== 是否已校准 ====================
Arduino.forBlock['mag3110_is_calibrated'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  return [varName + '.isCalibrated()', generator.ORDER_FUNCTION_CALL];
};

// ==================== 是否正在校准 ====================
Arduino.forBlock['mag3110_is_calibrating'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  return [varName + '.isCalibrating()', generator.ORDER_FUNCTION_CALL];
};

// ==================== 读取芯片温度 ====================
Arduino.forBlock['mag3110_read_temperature'] = function(block, generator) {
  var varField = block.getField('VAR');
  var varName = varField ? varField.getText() : 'mag';
  return ['(int8_t)' + varName + '.readRegister(0x0F)', generator.ORDER_FUNCTION_CALL];
};

// ==================== 扩展注册 ====================
function addMAG3110PinInfoExtensions() {
  if (typeof Blockly === 'undefined' || !Blockly.Extensions) return;
  try {
    var extensionName = 'mag3110_init_pin_info';
    if (!Blockly.Extensions.isRegistered || !Blockly.Extensions.isRegistered(extensionName)) {
      Blockly.Extensions.register(extensionName, function() {
        // 引脚信息扩展占位
      });
    }
  } catch (e) {}
}

if (typeof Blockly !== 'undefined') {
  addMAG3110PinInfoExtensions();
}
