'use strict';

// _varMonitorAttached: nrf24l01AttachVariable implements the rename listener.

function nrf24l01EnsureLibrary(generator) {
  generator.addLibrary('nrf24l01_rf24', '#include <RF24.h>');
}

function nrf24l01Variable(block) {
  var field = block.getField('VAR');
  return field ? field.getText() : (block.getFieldValue('VAR') || 'radio');
}

function nrf24l01Identifier(value) {
  return String(value || 'radio').replace(/[^A-Za-z0-9_]/g, '_');
}

function nrf24l01AttachVariable(block) {
  if (block._nrf24l01VariableAttached) return;
  block._nrf24l01VariableAttached = true;
  block._nrf24l01LastName = block.getFieldValue('VAR') || 'radio';
  if (typeof registerVariableToBlockly === 'function') {
    registerVariableToBlockly(block._nrf24l01LastName, 'RF24');
  }
  var field = block.getField('VAR');
  if (!field) return;
  var originalFinish = field.onFinishEditing_;
  field.onFinishEditing_ = function(newName) {
    if (typeof originalFinish === 'function') originalFinish.call(this, newName);
    if (newName && newName !== block._nrf24l01LastName && typeof renameVariableInBlockly === 'function') {
      renameVariableInBlockly(block, block._nrf24l01LastName, newName, 'RF24');
      block._nrf24l01LastName = newName;
    }
  };
}

function nrf24l01EnsureState(generator, varName) {
  var id = nrf24l01Identifier(varName);
  generator.addVariable(
    'nrf24l01_last_send_' + id,
    'bool _nrf24l01_last_send_' + id + ' = false;'
  );
  generator.addVariable(
    'nrf24l01_received_pipe_' + id,
    'uint8_t _nrf24l01_received_pipe_' + id + ' = 0;'
  );
}

function nrf24l01EnsureAddressHelpers(generator) {
  generator.addFunction(
    'nrf24l01_copy_address',
    'void _nrf24l01_copy_address(const String& address, uint8_t* output) {\n' +
    '  for (uint8_t i = 0; i < 5; ++i) {\n' +
    "    output[i] = (i < address.length()) ? (uint8_t)address[i] : (uint8_t)'0';\n" +
    '  }\n' +
    '}\n'
  );
  generator.addFunction(
    'nrf24l01_set_tx_address',
    'void _nrf24l01_set_tx_address(RF24& radio, const String& address) {\n' +
    '  uint8_t bytes[5];\n' +
    '  _nrf24l01_copy_address(address, bytes);\n' +
    '  radio.stopListening(bytes);\n' +
    '}\n'
  );
  generator.addFunction(
    'nrf24l01_set_rx_address',
    'void _nrf24l01_set_rx_address(RF24& radio, uint8_t pipe, const String& address) {\n' +
    '  uint8_t bytes[5];\n' +
    '  _nrf24l01_copy_address(address, bytes);\n' +
    '  radio.openReadingPipe(pipe, bytes);\n' +
    '}\n'
  );
}

function nrf24l01EnsurePayloadHelpers(generator) {
  generator.addFunction(
    'nrf24l01_send_text',
    'bool _nrf24l01_send_text(RF24& radio, const String& text) {\n' +
    '  char payload[32] = {0};\n' +
    '  uint8_t length = (uint8_t)min((size_t)31, text.length());\n' +
    '  memcpy(payload, text.c_str(), length);\n' +
    '  radio.stopListening();\n' +
    '  return radio.write(payload, length + 1);\n' +
    '}\n'
  );
  generator.addFunction(
    'nrf24l01_send_number',
    'bool _nrf24l01_send_number(RF24& radio, float value) {\n' +
    '  radio.stopListening();\n' +
    '  return radio.write(&value, sizeof(value));\n' +
    '}\n'
  );
  generator.addFunction(
    'nrf24l01_read_text',
    'String _nrf24l01_read_text(RF24& radio) {\n' +
    '  uint8_t length = radio.getDynamicPayloadSize();\n' +
    '  if (length < 1 || length > 32) {\n' +
    '    radio.flush_rx();\n' +
    '    return String("");\n' +
    '  }\n' +
    '  char payload[33] = {0};\n' +
    '  radio.read(payload, length);\n' +
    '  payload[length] = 0;\n' +
    '  return String(payload);\n' +
    '}\n'
  );
  generator.addFunction(
    'nrf24l01_read_number',
    'float _nrf24l01_read_number(RF24& radio) {\n' +
    '  uint8_t length = radio.getDynamicPayloadSize();\n' +
    '  if (length == sizeof(float)) {\n' +
    '    float value = 0.0f;\n' +
    '    radio.read(&value, sizeof(value));\n' +
    '    return value;\n' +
    '  }\n' +
    '  if (length > 0 && length <= 32) {\n' +
    '    uint8_t discard[32];\n' +
    '    radio.read(discard, length);\n' +
    '  } else {\n' +
    '    radio.flush_rx();\n' +
    '  }\n' +
    '  return 0.0f;\n' +
    '}\n'
  );
}

Arduino.forBlock['nrf24l01_init'] = function(block, generator) {
  nrf24l01AttachVariable(block);
  nrf24l01EnsureLibrary(generator);
  var varName = block.getFieldValue('VAR') || 'radio';
  var ce = block.getFieldValue('CE') || '7';
  var csn = block.getFieldValue('CSN') || '8';
  generator.addObject(
    'nrf24l01_object_' + nrf24l01Identifier(varName),
    'RF24 ' + varName + '(' + ce + ', ' + csn + ');'
  );
  nrf24l01EnsureState(generator, varName);
  if (typeof registerVariableToBlockly === 'function') {
    registerVariableToBlockly(varName, 'RF24');
  }
  return varName + '.begin();\n' +
    varName + '.setAddressWidth(5);\n' +
    varName + '.enableDynamicPayloads();\n';
};

Arduino.forBlock['nrf24l01_set_radio_parameters'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  var varName = nrf24l01Variable(block);
  var channel = generator.valueToCode(block, 'CHANNEL', generator.ORDER_ATOMIC) || '76';
  var dataRate = block.getFieldValue('DATA_RATE') || 'RF24_1MBPS';
  var paLevel = block.getFieldValue('PA_LEVEL') || 'RF24_PA_LOW';
  return varName + '.setChannel((uint8_t)(' + channel + '));\n' +
    varName + '.setDataRate(' + dataRate + ');\n' +
    varName + '.setPALevel(' + paLevel + ');\n';
};

Arduino.forBlock['nrf24l01_set_retries'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  var varName = nrf24l01Variable(block);
  var delay = generator.valueToCode(block, 'DELAY', generator.ORDER_ATOMIC) || '5';
  var count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC) || '15';
  return varName + '.setRetries((uint8_t)(' + delay + '), (uint8_t)(' + count + '));\n';
};

Arduino.forBlock['nrf24l01_set_auto_ack'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  var varName = nrf24l01Variable(block);
  var enabled = generator.valueToCode(block, 'ENABLED', generator.ORDER_ATOMIC) || 'true';
  return varName + '.setAutoAck((bool)(' + enabled + '));\n';
};

Arduino.forBlock['nrf24l01_open_writing_pipe'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  nrf24l01EnsureAddressHelpers(generator);
  var varName = nrf24l01Variable(block);
  var address = generator.valueToCode(block, 'ADDRESS', generator.ORDER_ATOMIC) || '"1Node"';
  return '_nrf24l01_set_tx_address(' + varName + ', String(' + address + '));\n';
};

Arduino.forBlock['nrf24l01_open_reading_pipe'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  nrf24l01EnsureAddressHelpers(generator);
  var varName = nrf24l01Variable(block);
  var pipe = block.getFieldValue('PIPE') || '1';
  var address = generator.valueToCode(block, 'ADDRESS', generator.ORDER_ATOMIC) || '"2Node"';
  return '_nrf24l01_set_rx_address(' + varName + ', ' + pipe + ', String(' + address + '));\n';
};

Arduino.forBlock['nrf24l01_set_listening'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  var varName = nrf24l01Variable(block);
  return varName + (block.getFieldValue('MODE') === 'STOP' ? '.stopListening();\n' : '.startListening();\n');
};

Arduino.forBlock['nrf24l01_send_text'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  nrf24l01EnsurePayloadHelpers(generator);
  var varName = nrf24l01Variable(block);
  var id = nrf24l01Identifier(varName);
  var value = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '""';
  nrf24l01EnsureState(generator, varName);
  return '_nrf24l01_last_send_' + id + ' = _nrf24l01_send_text(' + varName + ', String(' + value + '));\n';
};

Arduino.forBlock['nrf24l01_send_number'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  nrf24l01EnsurePayloadHelpers(generator);
  var varName = nrf24l01Variable(block);
  var id = nrf24l01Identifier(varName);
  var value = generator.valueToCode(block, 'NUMBER', generator.ORDER_ATOMIC) || '0';
  nrf24l01EnsureState(generator, varName);
  return '_nrf24l01_last_send_' + id + ' = _nrf24l01_send_number(' + varName + ', (float)(' + value + '));\n';
};

Arduino.forBlock['nrf24l01_available'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  var varName = nrf24l01Variable(block);
  var id = nrf24l01Identifier(varName);
  nrf24l01EnsureState(generator, varName);
  return [varName + '.available(&_nrf24l01_received_pipe_' + id + ')', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['nrf24l01_read_text'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  nrf24l01EnsurePayloadHelpers(generator);
  return ['_nrf24l01_read_text(' + nrf24l01Variable(block) + ')', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['nrf24l01_read_number'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  nrf24l01EnsurePayloadHelpers(generator);
  return ['_nrf24l01_read_number(' + nrf24l01Variable(block) + ')', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['nrf24l01_last_send_succeeded'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  var varName = nrf24l01Variable(block);
  var id = nrf24l01Identifier(varName);
  nrf24l01EnsureState(generator, varName);
  return ['_nrf24l01_last_send_' + id, generator.ORDER_ATOMIC];
};

Arduino.forBlock['nrf24l01_received_pipe'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  var varName = nrf24l01Variable(block);
  var id = nrf24l01Identifier(varName);
  nrf24l01EnsureState(generator, varName);
  return ['_nrf24l01_received_pipe_' + id, generator.ORDER_ATOMIC];
};

Arduino.forBlock['nrf24l01_is_chip_connected'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  return [nrf24l01Variable(block) + '.isChipConnected()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['nrf24l01_set_power_mode'] = function(block, generator) {
  nrf24l01EnsureLibrary(generator);
  var varName = nrf24l01Variable(block);
  return varName + (block.getFieldValue('MODE') === 'DOWN' ? '.powerDown();\n' : '.powerUp();\n');
};
