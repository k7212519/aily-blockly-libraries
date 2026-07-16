function cycoreIoTEnsure(generator) {
  generator.addLibrary('cycore_iot', '#include <CycoreIoT.h>');
  generator.addObject('cycore_iot_client', 'CycoreIoT cycoreIoT;');
  generator.addLoopEnd('cycore_iot_loop', 'cycoreIoT.loop();');
}

function cycoreIoTSafeName(text) {
  return String(text || 'widget').replace(/[^a-zA-Z0-9_]/g, '_');
}

Arduino.forBlock['cycore_iot_begin'] = function(block, generator) {
  cycoreIoTEnsure(generator);
  const ssid = generator.valueToCode(block, 'SSID', generator.ORDER_ATOMIC) || '"Your WiFi SSID"';
  const wifiPassword = generator.valueToCode(block, 'WIFI_PASSWORD', generator.ORDER_ATOMIC) || '"Your WiFi Password"';
  const deviceCode = generator.valueToCode(block, 'DEVICE_CODE', generator.ORDER_ATOMIC) || '"Device Code"';
  return `cycoreIoT.begin(${ssid}, ${wifiPassword}, ${deviceCode});\n`;
};

Arduino.forBlock['cycore_iot_on_connected'] = function(block, generator) {
  cycoreIoTEnsure(generator);
  const statements = generator.statementToCode(block, 'DO');
  generator.addFunction('cycore_iot_connected_callback', `void cycoreIoTConnected() {\n${statements}}\n`);
  generator.addSetupEnd('cycore_iot_on_connected', 'cycoreIoT.onConnected(cycoreIoTConnected);');
  return '';
};

Arduino.forBlock['cycore_iot_on_disconnected'] = function(block, generator) {
  cycoreIoTEnsure(generator);
  const statements = generator.statementToCode(block, 'DO');
  generator.addFunction('cycore_iot_disconnected_callback', `void cycoreIoTDisconnected() {\n${statements}}\n`);
  generator.addSetupEnd('cycore_iot_on_disconnected', 'cycoreIoT.onDisconnected(cycoreIoTDisconnected);');
  return '';
};

Arduino.forBlock['cycore_iot_is_online'] = function(block, generator) { cycoreIoTEnsure(generator); return ['cycoreIoT.connected()', generator.ORDER_FUNCTION_CALL]; };
Arduino.forBlock['cycore_iot_reconnect'] = function(block, generator) { cycoreIoTEnsure(generator); return 'cycoreIoT.reconnect();\n'; };

Arduino.forBlock['cycore_iot_on_control'] = function(block, generator) {
  cycoreIoTEnsure(generator);
  const key = block.getFieldValue('KEY') || 'control_1';
  const kind = block.getFieldValue('KIND') || 'button';
  const statements = generator.statementToCode(block, 'DO');
  const functionName = `cycore_${kind}_${cycoreIoTSafeName(key)}_callback`;
  generator.addFunction(functionName, `void ${functionName}(const CycoreCommand &command) {\n${statements}}\n`);
  generator.addSetupEnd(`cycore_iot_control_${kind}_${key}`, `cycoreIoT.on("${key}", ${functionName});`);
  return '';
};

Arduino.forBlock['cycore_iot_current_action'] = function() { return ['command.action', Arduino.ORDER_MEMBER]; };
Arduino.forBlock['cycore_iot_current_bool'] = function() { return ['command.boolValue', Arduino.ORDER_MEMBER]; };
Arduino.forBlock['cycore_iot_current_number'] = function() { return ['command.numberValue', Arduino.ORDER_MEMBER]; };
Arduino.forBlock['cycore_iot_current_text'] = function() { return ['command.textValue', Arduino.ORDER_MEMBER]; };
Arduino.forBlock['cycore_iot_current_axis'] = function(block) { return [`command.${block.getFieldValue('AXIS') || 'x'}`, Arduino.ORDER_MEMBER]; };
Arduino.forBlock['cycore_iot_current_color'] = function(block) { return [`command.${block.getFieldValue('CHANNEL') || 'r'}`, Arduino.ORDER_MEMBER]; };

Arduino.forBlock['cycore_iot_report_number'] = function(block, generator) {
  cycoreIoTEnsure(generator); const key = block.getFieldValue('KEY') || 'value'; const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || '0';
  return `cycoreIoT.report("${key}", (double)(${value}));\n`;
};
Arduino.forBlock['cycore_iot_report_text'] = function(block, generator) {
  cycoreIoTEnsure(generator); const key = block.getFieldValue('KEY') || 'text'; const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || '""';
  return `cycoreIoT.report("${key}", String(${value}));\n`;
};
Arduino.forBlock['cycore_iot_report_bool'] = function(block, generator) {
  cycoreIoTEnsure(generator); const key = block.getFieldValue('KEY') || 'enabled'; const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || 'false';
  return `cycoreIoT.report("${key}", (bool)(${value}));\n`;
};
Arduino.forBlock['cycore_iot_report_color'] = function(block, generator) {
  cycoreIoTEnsure(generator); const key = block.getFieldValue('KEY') || 'color';
  const r = generator.valueToCode(block, 'R', generator.ORDER_ATOMIC) || '0', g = generator.valueToCode(block, 'G', generator.ORDER_ATOMIC) || '0', b = generator.valueToCode(block, 'B', generator.ORDER_ATOMIC) || '0';
  return `cycoreIoT.reportColor("${key}", ${r}, ${g}, ${b});\n`;
};
Arduino.forBlock['cycore_iot_batch_begin'] = function(block, generator) { cycoreIoTEnsure(generator); return 'cycoreIoT.beginTelemetry();\n'; };
Arduino.forBlock['cycore_iot_batch_add'] = function(block, generator) {
  cycoreIoTEnsure(generator); const key = block.getFieldValue('KEY') || 'sensor'; const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || '0';
  return `cycoreIoT.addTelemetry("${key}", ${value});\n`;
};
Arduino.forBlock['cycore_iot_batch_publish'] = function(block, generator) { cycoreIoTEnsure(generator); return 'cycoreIoT.publishTelemetry();\n'; };
Arduino.forBlock['cycore_iot_notify_event'] = function(block, generator) {
  cycoreIoTEnsure(generator); const key = block.getFieldValue('KEY') || 'event'; const event = block.getFieldValue('EVENT') || 'triggered'; const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || '""';
  return `cycoreIoT.notifyEvent("${key}", "${event}", String(${value}));\n`;
};

Arduino.forBlock['cycore_iot_connection_state'] = function(block, generator) { cycoreIoTEnsure(generator); return ['cycoreIoT.connectionState()', generator.ORDER_FUNCTION_CALL]; };
Arduino.forBlock['cycore_iot_last_error'] = function(block, generator) { cycoreIoTEnsure(generator); return ['cycoreIoT.lastError()', generator.ORDER_FUNCTION_CALL]; };
Arduino.forBlock['cycore_iot_debug'] = function(block, generator) {
  cycoreIoTEnsure(generator); const text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '""';
  generator.addSetupBegin('cycore_iot_serial', 'Serial.begin(115200);'); return `Serial.println(${text});\n`;
};
