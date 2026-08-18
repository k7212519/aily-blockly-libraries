(function() {
  const Arduino = window.Arduino || window['Arduino'];
  if (!Arduino) return;

  Arduino.tjcFrameEvents = Arduino.tjcFrameEvents || {};

  function q(value) {
    return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  function serialValue(block) {
    return block.getFieldValue('SERIAL') || 'Serial';
  }

  // Keep the stable serial value while showing the board's RX/TX pins in Blockly.
  function stripPinInfo(displayName) {
    return String(displayName || '')
      .replace(/\(RX:[^)]*TX:[^)]+\)/g, '')
      .replace(/\((?:UART\d+|SoftwareSerial)\s+RX:[^)]*TX:[^)]+\)/g, '')
      .trim();
  }

  function serialOptionsWithPins(boardConfig) {
    if (!boardConfig) return [];
    const ports = boardConfig.serialPortOriginal || boardConfig.serialPort || [];
    const pins = boardConfig.serialPins || {};
    return ports.map(function(option) {
      const display = Array.isArray(option) ? option[0] : option;
      const value = Array.isArray(option) ? option[1] : option;
      const pinSet = pins[value];
      if (!Array.isArray(pinSet)) return [stripPinInfo(display), value];
      const rx = pinSet.find(function(pin) { return pin[0] === 'RX'; });
      const tx = pinSet.find(function(pin) { return pin[0] === 'TX'; });
      if (!rx || !tx) return [stripPinInfo(display), value];
      return [stripPinInfo(display) + '(RX:' + rx[1] + ', TX:' + tx[1] + ')', value];
    });
  }

  function updateTjcSerialField(block, boardConfig) {
    if (!block || !block.getField || !boardConfig) return;
    const field = block.getField('SERIAL');
    if (!field) return;
    const options = serialOptionsWithPins(boardConfig);
    if (!options.length) return;
    const current = field.getValue();
    field.menuGenerator_ = options;
    field.getOptions = function() { return options; };
    if (options.some(function(option) { return option[1] === current; })) {
      field.setValue(current);
    } else {
      field.setValue(options[0][1]);
    }
  }

  function updateAllTjcSerialFields() {
    if (typeof Blockly === 'undefined' || !Blockly.getMainWorkspace) return;
    const workspace = Blockly.getMainWorkspace();
    const boardConfig = window['boardConfig'];
    if (!workspace || !boardConfig) return;
    workspace.getAllBlocks().forEach(function(block) {
      updateTjcSerialField(block, boardConfig);
      if (block.render) block.render();
    });
  }

  function installTjcSerialPinListener() {
    if (typeof Blockly === 'undefined' || !Blockly.getMainWorkspace) return;
    const workspace = Blockly.getMainWorkspace();
    if (!workspace || workspace._tjcSerialPinListenerAttached) return;
    workspace._tjcSerialPinListenerAttached = true;
    workspace.addChangeListener(function(event) {
      if (event.type === Blockly.Events.FINISHED_LOADING ||
          event.type === Blockly.Events.BLOCK_CREATE) {
        setTimeout(updateAllTjcSerialFields, 0);
      }
    });
    setTimeout(updateAllTjcSerialFields, 0);
  }

  window.updateTjcSerialPorts = updateAllTjcSerialFields;
  installTjcSerialPinListener();
  setTimeout(installTjcSerialPinListener, 200);

  function ensureSerial(generator, port, baud) {
    port = port || 'Serial';
    baud = baud || '9600';
    // addSetupBegin deduplicates by key while rebuilding the current program.
    // Do not keep a module-level initialized-port Set across generations.
    generator.addSetupBegin('tjc_serial_begin_' + port, port + '.begin(' + baud + ');', true);
  }

  function ensureTjcHelper(generator) {
    generator.addFunction('tjc_send_command',
      'void tjc_send_command(Stream &port, const String &command) {\n' +
      '  port.print(command);\n' +
      '  port.write((uint8_t)0xFF);\n' +
      '  port.write((uint8_t)0xFF);\n' +
      '  port.write((uint8_t)0xFF);\n' +
      '}\n');
  }

  function registerRename(block, fieldName, type, fallback) {
    const field = block.getField(fieldName);
    if (!field || block._tjcRenameAttached) return;
    block._tjcRenameAttached = true;
    block._tjcLastName = block.getFieldValue(fieldName) || fallback;
    if (typeof registerVariableToBlockly === 'function') registerVariableToBlockly(block._tjcLastName, type);
    const original = field.onFinishEditing_;
    field.onFinishEditing_ = function(newName) {
      if (typeof original === 'function') original.call(this, newName);
      const workspace = block.workspace || (Blockly.getMainWorkspace && Blockly.getMainWorkspace());
      if (workspace && newName && newName !== block._tjcLastName && typeof renameVariableInBlockly === 'function') {
        renameVariableInBlockly(block, block._tjcLastName, newName, type);
        block._tjcLastName = newName;
      }
    };
  }

  function valueCode(block, generator, name, fallback) {
    return generator.valueToCode(block, name, generator.ORDER_ATOMIC) || fallback;
  }

  function commandBlock(block, generator, command) {
    const port = serialValue(block);
    ensureSerial(generator, port, '9600');
    ensureTjcHelper(generator);
    return 'tjc_send_command(' + port + ', String(' + command + '));\n';
  }

  function assignmentCommand(target, value) {
    const trimmed = String(value).trim();
    if (/^"(?:[^"\\]|\\.)*"$/.test(trimmed)) {
      return 'String("' + target + '=\\\"") + String(' + trimmed + ') + String("\\\"")';
    }
    return 'String("' + target + '=") + String(' + trimmed + ')';
  }

  // The serial-screen protocol requires text properties to be enclosed in
  // double quotes.  VALUE may be a literal, a String expression, or a
  // variable, so type inference from generated C++ is intentionally avoided.
  function textAssignmentCommand(target, value) {
    return 'String("' + target + '=\\\"") + String(' + String(value).trim() + ') + String("\\\"")';
  }

  Arduino.forBlock['tjc_begin_hardware'] = function(block, generator) {
    const port = serialValue(block);
    const speed = block.getFieldValue('SPEED') || '115200';
    ensureSerial(generator, port, speed);
    return '';
  };

  Arduino.forBlock['tjc_begin_software'] = function(block, generator) {
    registerRename(block, 'VAR', 'Serial', 'TJCSerial');
    const name = block.getFieldValue('VAR') || 'TJCSerial';
    const speed = block.getFieldValue('SPEED') || '115200';
    const rx = block.getFieldValue('RX') || '8';
    const tx = block.getFieldValue('TX') || '9';
    generator.addLibrary('SoftwareSerial', '#include <SoftwareSerial.h>');
    generator.addObject('tjc_' + name, 'SoftwareSerial ' + name + '(' + rx + ', ' + tx + ');');
    generator.addSetupBegin('tjc_serial_begin_' + name, name + '.begin(' + speed + ');');
    return '';
  };

  Arduino.forBlock['tjc_clear_startup'] = function(block, generator) {
    const port = serialValue(block);
    ensureSerial(generator, port, '9600');
    return 'while (' + port + '.available() > 0) { ' + port + '.read(); }\n';
  };

  Arduino.forBlock['tjc_set_brightness'] = function(block, generator) {
    const value = valueCode(block, generator, 'VALUE', '80');
    return commandBlock(block, generator, 'String("dim=") + String(' + value + ')');
  };

  Arduino.forBlock['tjc_page'] = function(block, generator) {
    const page = valueCode(block, generator, 'PAGE', '"main"');
    return commandBlock(block, generator, 'String("page ") + String(' + page + ')');
  };

  Arduino.forBlock['tjc_set_variable'] = function(block, generator) {
    const target = q(block.getFieldValue('TARGET') || 'sys0');
    const value = valueCode(block, generator, 'VALUE', '0');
    return commandBlock(block, generator, assignmentCommand(target, value));
  };

  Arduino.forBlock['tjc_set_property'] = function(block, generator) {
    const component = q(block.getFieldValue('COMPONENT') || 'p0');
    const property = q(block.getFieldValue('PROPERTY') || 'val');
    const value = valueCode(block, generator, 'VALUE', '0');
    const target = component + '.' + property;
    const command = property === 'txt'
      ? textAssignmentCommand(target, value)
      : assignmentCommand(target, value);
    return commandBlock(block, generator, command);
  };

  Arduino.forBlock['tjc_send_command'] = function(block, generator) {
    const command = valueCode(block, generator, 'COMMAND', '""');
    return commandBlock(block, generator, command);
  };

  Arduino.forBlock['tjc_set_bkcmd'] = function(block, generator) {
    const mode = block.getFieldValue('MODE') || '2';
    return commandBlock(block, generator, 'String("bkcmd=") + String(' + mode + ')');
  };

  function parserNames(port) {
    const id = String(port).replace(/[^a-zA-Z0-9_]/g, '_');
    return {id: id, ready: 'tjc_' + id + '_frame_ready', type: 'tjc_' + id + '_frame_type', payload: 'tjc_' + id + '_frame_payload', len: 'tjc_' + id + '_frame_len', buffer: 'tjc_' + id + '_rx_buffer'};
  }

  function ensureParser(block, generator) {
    const port = serialValue(block);
    const n = parserNames(port);
    ensureSerial(generator, port, '9600');
    generator.addVariable(n.ready, 'bool ' + n.ready + ' = false;');
    generator.addVariable(n.type, 'uint8_t ' + n.type + ' = 0;');
    generator.addVariable(n.payload, 'uint8_t ' + n.payload + '[64];');
    generator.addVariable(n.len, 'size_t ' + n.len + ' = 0;');
    generator.addVariable(n.buffer, 'String ' + n.buffer + ';');
    generator.addLoopBegin(
      'while (' + port + '.available() > 0) {\n' +
      '  uint8_t b = (uint8_t)' + port + '.read();\n' +
      '  ' + n.buffer + ' += (char)b;\n' +
      '  int end = ' + n.buffer + '.indexOf("\\xFF\\xFF\\xFF");\n' +
      '  if (end >= 0) {\n' +
      '    ' + n.type + ' = ' + n.buffer + '[0];\n' +
      '    ' + n.len + ' = (size_t)max(0, min(end - 1, 64));\n' +
      '    for (size_t i = 0; i < ' + n.len + '; ++i) ' + n.payload + '[i] = (uint8_t)' + n.buffer + '[i + 1];\n' +
      '    ' + n.ready + ' = true;\n' +
      '    ' + n.buffer + '.remove(0, end + 3);\n' +
      '  }\n' +
      '}\n',
      'tjc_parser_' + n.id
    );
    return n;
  }

  Arduino.forBlock['tjc_enable_frame_parser'] = function(block, generator) {
    ensureParser(block, generator);
    return '';
  };

  Arduino.forBlock['tjc_frame_event'] = function(block, generator) {
    const n = ensureParser(block, generator);
    const type = block.getFieldValue('TYPE') || 'ANY';
    const body = generator.statementToCode(block, 'HANDLER') || '';
    const condition = type === 'ANY' ? n.ready : '(' + n.ready + ' && ' + n.type + ' == 0x' + type + ')';
    generator.addLoopBegin('if (' + condition + ') {\n' + body + '}\n', 'tjc_event_' + n.id + '_' + type + '_' + block.id);
    return '';
  };

  Arduino.forBlock['tjc_frame_type'] = function(block, generator) {
    const n = ensureParser(block, generator);
    return [n.type, generator.ORDER_ATOMIC];
  };

  Arduino.forBlock['tjc_frame_available'] = function(block, generator) {
    const n = ensureParser(block, generator);
    return [n.ready, generator.ORDER_ATOMIC];
  };
})();
