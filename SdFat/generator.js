// _varMonitorAttached: object names are registered and renamed by sdfatAttach.
function sdfatEnsure(generator) {
  generator.addLibrary('sdfat_include', '#include <SdFat.h>');
}

function sdfatName(block, field, fallback) {
  var item = block.getField(field);
  return item ? item.getText() : (block.getFieldValue(field) || fallback);
}

function sdfatAttachVariable(block, fieldName, typeName, fallback) {
  var key = '_sdfat_' + fieldName + '_attached';
  if (block[key]) return;
  block[key] = true;
  var lastKey = key + '_last';
  block[lastKey] = block.getFieldValue(fieldName) || fallback;
  if (typeof registerVariableToBlockly === 'function') registerVariableToBlockly(block[lastKey], typeName);
  var field = block.getField(fieldName);
  if (!field) return;
  var original = field.onFinishEditing_;
  field.onFinishEditing_ = function(newName) {
    if (typeof original === 'function') original.call(this, newName);
    if (newName && newName !== block[lastKey] && typeof renameVariableInBlockly === 'function') {
      renameVariableInBlockly(block, block[lastKey], newName, typeName);
      block[lastKey] = newName;
    }
  };
}

Arduino.forBlock['sdfat_init'] = function(block, generator) {
  sdfatEnsure(generator);
  sdfatAttachVariable(block, 'VAR', 'SdFs', 'sd');
  var name = block.getFieldValue('VAR') || 'sd';
  var cs = block.getFieldValue('CS') || 'SS';
  var mhz = generator.valueToCode(block, 'MHZ', generator.ORDER_ATOMIC) || '25';
  generator.addObject('sdfat_' + name, 'SdFs ' + name + ';');
  generator.addSetupBegin('sdfat_begin_' + name, 'while (!' + name + '.begin(' + cs + ', SD_SCK_MHZ(' + mhz + '))) { delay(100); }');
  return '';
};

Arduino.forBlock['sdfat_file_open'] = function(block, generator) {
  sdfatEnsure(generator);
  sdfatAttachVariable(block, 'FILE', 'FsFile', 'sdFile');
  var file = block.getFieldValue('FILE') || 'sdFile';
  var sd = sdfatName(block, 'SD', 'sd');
  var path = generator.valueToCode(block, 'PATH', generator.ORDER_ATOMIC) || '"/data.txt"';
  var mode = block.getFieldValue('MODE') || 'O_RDONLY';
  generator.addObject('sdfat_file_' + file, 'FsFile ' + file + ';');
  return file + ' = ' + sd + '.open(' + path + ', ' + mode + ');\n';
};

Arduino.forBlock['sdfat_file_write'] = function(block, generator) {
  sdfatEnsure(generator);
  var file = sdfatName(block, 'FILE', 'sdFile');
  var op = block.getFieldValue('OP') || 'print';
  var data = generator.valueToCode(block, 'DATA', generator.ORDER_NONE) || '""';
  return file + '.' + op + '(' + data + ');\n';
};

Arduino.forBlock['sdfat_file_control'] = function(block, generator) {
  sdfatEnsure(generator);
  var file = sdfatName(block, 'FILE', 'sdFile');
  var op = block.getFieldValue('OP') || 'seek';
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || '0';
  return file + '.' + op + '(' + ((op === 'flush' || op === 'close') ? '' : value) + ');\n';
};

Arduino.forBlock['sdfat_file_read'] = function(block, generator) {
  sdfatEnsure(generator);
  var file = sdfatName(block, 'FILE', 'sdFile');
  var data = block.getFieldValue('DATA') || 'read';
  var expressions = {
    read: file + '.read()',
    line: file + '.readStringUntil(\'\\n\')',
    string: file + '.readString()',
    available: file + '.available()',
    size: file + '.fileSize()',
    position: file + '.curPosition()',
    open: '(bool)' + file
  };
  return [expressions[data] || expressions.read, generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['sdfat_fs_operation'] = function(block, generator) {
  sdfatEnsure(generator);
  var sd = sdfatName(block, 'SD', 'sd');
  var op = block.getFieldValue('OP') || 'mkdir';
  var path = generator.valueToCode(block, 'PATH', generator.ORDER_ATOMIC) || '"/data"';
  return sd + '.' + op + '(' + path + ');\n';
};

Arduino.forBlock['sdfat_exists'] = function(block, generator) {
  sdfatEnsure(generator);
  var sd = sdfatName(block, 'SD', 'sd');
  var path = generator.valueToCode(block, 'PATH', generator.ORDER_ATOMIC) || '"/data.txt"';
  return [sd + '.exists(' + path + ')', generator.ORDER_FUNCTION_CALL];
};
