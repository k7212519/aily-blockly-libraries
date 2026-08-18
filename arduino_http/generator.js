Arduino.forBlock['wifi_connect'] = function(block, generator) {
  var ssid = block.getFieldValue('SSID');
  var pass = block.getFieldValue('PASS');
  generator.addLibrary('#include <WiFi101.h>', '#include <WiFi101.h>');
  return 'WiFi.begin("' + ssid + '", "' + pass + '");\n';
};

Arduino.forBlock['wifi_ssid'] = function(block, generator) {
  // 返回当前连接的WiFi网络名称
  return ['WiFi.SSID()', generator.ORDER_NONE];
};

Arduino.forBlock['wifi_localip'] = function(block, generator) {
  // 返回设备的本地IP地址
  return ['WiFi.localIP()', generator.ORDER_NONE];
};

Arduino.forBlock['http_get'] = function(block, generator) {
  var url = block.getFieldValue('URL');
  generator.addLibrary('#include <ArduinoHttpClient.h>', '#include <ArduinoHttpClient.h>');
  // 注意：需要在代码其他部分创建WiFiClient对象，例如：WiFiClient wifiClient;
  // 同时需要根据目标主机和端口创建HttpClient对象，例如：HttpClient client(wifiClient, host, port);
  var code = 'client.beginRequest();\n';
  code += 'client.get("' + url + '");\n';
  code += 'client.endRequest();\n';
  return code;
};

Arduino.forBlock['http_post'] = function(block, generator) {
  var url = block.getFieldValue('URL');
  var contentType = block.getFieldValue('TYPE');
  var postData = block.getFieldValue('DATA');
  generator.addLibrary('#include <ArduinoHttpClient.h>', '#include <ArduinoHttpClient.h>');
  // 注意：需要在代码其他部分创建WiFiClient对象及HttpClient对象
  var code = 'client.beginRequest();\n';
  code += 'client.post("' + url + '", "' + contentType + '", "' + postData + '");\n';
  code += 'client.endRequest();\n';
  return code;
};

Arduino.forBlock['analog_read'] = function(block, generator) {
  var pin = block.getFieldValue('PIN');
  var code = 'analogRead(' + pin + ')';
  return [code, generator.ORDER_ATOMIC];
};
