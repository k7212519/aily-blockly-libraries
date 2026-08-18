'use strict';

const U8G2_ROBOT_EYES_TYPE = 'U8g2RobotEyes';

function u8g2RobotEyesSafeIdentifier(value, fallback) {
  let name = String(value || fallback || 'eyes').replace(/[^A-Za-z0-9_]/g, '_');
  if (!name) name = fallback || 'eyes';
  if (/^[0-9]/.test(name)) name = '_' + name;
  return name;
}

function u8g2RobotEyesFieldVariable(block) {
  const field = block.getField('VAR');
  const value = field && typeof field.getText === 'function'
    ? field.getText()
    : block.getFieldValue('VAR');
  return u8g2RobotEyesSafeIdentifier(value, 'eyes');
}

function u8g2RobotEyesValue(block, generator, inputName, fallback) {
  return generator.valueToCode(block, inputName, generator.ORDER_ATOMIC) || fallback;
}

function u8g2RobotEyesEnsureLibrary(generator, style) {
  const selectedStyle = style || 'U8G2_ROBOT_EYES_STYLE_SQUARE';
  generator.addLibrary(
    'U8g2RobotEyes',
    '#define U8G2_ROBOT_EYES_STYLE ' + selectedStyle + '\n' +
    '#include <U8g2RobotEyes.h>'
  );
}

function u8g2RobotEyesRegisterVariable(name) {
  if (typeof registerVariableToBlockly === 'function') {
    registerVariableToBlockly(name, U8G2_ROBOT_EYES_TYPE);
  }
}

function u8g2RobotEyesAttachRenameMonitor(block) {
  if (block._u8g2RobotEyesVarMonitorAttached) return;
  block._u8g2RobotEyesVarMonitorAttached = true;
  block._u8g2RobotEyesVarLastName = block.getFieldValue('VAR') || 'eyes';
  u8g2RobotEyesRegisterVariable(block._u8g2RobotEyesVarLastName);

  const varField = block.getField('VAR');
  if (!varField) return;
  const originalFinishEditing = varField.onFinishEditing_;
  varField.onFinishEditing_ = function(newName) {
    if (typeof originalFinishEditing === 'function') {
      originalFinishEditing.call(this, newName);
    }
    const workspace = block.workspace || (
      typeof Blockly !== 'undefined' &&
      Blockly.getMainWorkspace &&
      Blockly.getMainWorkspace()
    );
    const oldName = block._u8g2RobotEyesVarLastName;
    if (
      workspace &&
      newName &&
      newName !== oldName &&
      typeof renameVariableInBlockly === 'function'
    ) {
      renameVariableInBlockly(block, oldName, newName, U8G2_ROBOT_EYES_TYPE);
      block._u8g2RobotEyesVarLastName = newName;
    }
  };
}

Arduino.forBlock['u8g2_robot_eyes_init'] = function(block, generator) {
  u8g2RobotEyesAttachRenameMonitor(block);

  const rawName = block.getFieldValue('VAR') || 'eyes';
  const varName = u8g2RobotEyesSafeIdentifier(rawName, 'eyes');
  const displayName = u8g2RobotEyesSafeIdentifier(
    block.getFieldValue('DISPLAY'),
    'u8g2'
  );
  const style = block.getFieldValue('STYLE') || 'U8G2_ROBOT_EYES_STYLE_SQUARE';
  const width = u8g2RobotEyesValue(block, generator, 'WIDTH', '128');
  const height = u8g2RobotEyesValue(block, generator, 'HEIGHT', '64');
  const fps = u8g2RobotEyesValue(block, generator, 'FPS', '40');
  const autoUpdate = block.getFieldValue('AUTO_UPDATE') === 'TRUE';

  u8g2RobotEyesEnsureLibrary(generator, style);
  u8g2RobotEyesRegisterVariable(rawName);
  generator.addObject(
    'u8g2_robot_eyes_object_' + varName,
    'U8g2RobotEyes ' + varName + '(' + displayName + ');'
  );
  if (autoUpdate) {
    generator.addLoopBegin(
      'u8g2_robot_eyes_update_' + varName,
      varName + '.update();'
    );
  }

  return varName + '.begin(' + width + ', ' + height + ', ' + fps + ');\n';
};

Arduino.forBlock['u8g2_robot_eyes_set_expression'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  const expression = block.getFieldValue('EXPRESSION') || 'NEUTRAL';
  const duration = u8g2RobotEyesValue(block, generator, 'DURATION', '280');
  return varName + '.setExpression(U8g2RobotEyes::' + expression + ', ' + duration + ');\n';
};

Arduino.forBlock['u8g2_robot_eyes_blink'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  const duration = u8g2RobotEyesValue(block, generator, 'DURATION', '180');
  return varName + '.blink(' + duration + ');\n';
};

Arduino.forBlock['u8g2_robot_eyes_set_gaze'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  const x = u8g2RobotEyesValue(block, generator, 'X', '0');
  const y = u8g2RobotEyesValue(block, generator, 'Y', '0');
  const duration = u8g2RobotEyesValue(block, generator, 'DURATION', '180');
  return varName + '.setGaze(' + x + ', ' + y + ', ' + duration + ');\n';
};

Arduino.forBlock['u8g2_robot_eyes_center_gaze'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  const duration = u8g2RobotEyesValue(block, generator, 'DURATION', '180');
  return varName + '.centerGaze(' + duration + ');\n';
};

Arduino.forBlock['u8g2_robot_eyes_set_auto_blink'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  const enabled = u8g2RobotEyesValue(block, generator, 'ENABLED', 'true');
  const interval = u8g2RobotEyesValue(block, generator, 'INTERVAL', '3200');
  const variation = u8g2RobotEyesValue(block, generator, 'VARIATION', '1800');
  return varName + '.setAutoBlink(' + enabled + ', ' + interval + ', ' + variation + ');\n';
};

Arduino.forBlock['u8g2_robot_eyes_set_idle'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  const enabled = u8g2RobotEyesValue(block, generator, 'ENABLED', 'true');
  const interval = u8g2RobotEyesValue(block, generator, 'INTERVAL', '1800');
  return varName + '.setIdle(' + enabled + ', ' + interval + ');\n';
};

Arduino.forBlock['u8g2_robot_eyes_render'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  const mode = block.getFieldValue('MODE') || 'UPDATE';
  const methods = {
    UPDATE: 'update',
    DRAW: 'draw',
    DRAW_TO_BUFFER: 'drawToBuffer'
  };
  return varName + '.' + (methods[mode] || methods.UPDATE) + '();\n';
};

Arduino.forBlock['u8g2_robot_eyes_expression'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  return ['(uint8_t)' + varName + '.expression()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['u8g2_robot_eyes_is_animating'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  return [varName + '.isAnimating()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['u8g2_robot_eyes_style'] = function(block, generator) {
  const varName = u8g2RobotEyesFieldVariable(block);
  return ['(uint8_t)' + varName + '.eyeStyle()', generator.ORDER_ATOMIC];
};
