// _varMonitorAttached: object names are registered and renamed by ethernetAttach.
function ethernetEnsure(generator) {
  generator.addLibrary('ethernet_include', '#include <Ethernet.h>');
  generator.addLibrary('ethernet_udp_include', '#include <EthernetUdp.h>');
}

function ethernetName(block, field, fallback) {
  var item = block.getField(field);
  return item ? item.getText() : (block.getFieldValue(field) || fallback);
}

function ethernetAttach(block, fieldName, typeName, fallback) {
  var key = '_ethernet_' + fieldName + '_attached';
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

Arduino.forBlock['ethernet_init'] = function(block, generator) {
  ethernetEnsure(generator);
  var mac = generator.valueToCode(block, 'MAC', generator.ORDER_ATOMIC) || '"DE:AD:BE:EF:FE:ED"';
  var mode = block.getFieldValue('MODE') || 'dhcp';
  var ip = generator.valueToCode(block, 'IP', generator.ORDER_ATOMIC) || '"192.168.1.177"';
  generator.addVariable('ethernet_mac', 'byte _ailyEthernetMac[6];');
  generator.addFunction('ethernet_parse_mac', 'void _ailyEthernetParseMac(String value, byte out[6]) {\n  for (uint8_t i = 0; i < 6; i++) out[i] = (byte)strtoul(value.substring(i * 3, i * 3 + 2).c_str(), nullptr, 16);\n}\nIPAddress _ailyEthernetIP(String value) {\n  IPAddress result;\n  result.fromString(value);\n  return result;\n}');
  generator.addSetupBegin('ethernet_mac_parse', '_ailyEthernetParseMac(' + mac + ', _ailyEthernetMac);');
  var begin = mode === 'static' ? 'Ethernet.begin(_ailyEthernetMac, _ailyEthernetIP(' + ip + '));' : 'Ethernet.begin(_ailyEthernetMac);';
  generator.addSetupBegin('ethernet_begin', begin);
  generator.addLoopBegin('ethernet_maintain', 'Ethernet.maintain();');
  return '';
};

Arduino.forBlock['ethernet_network_info'] = function(block, generator) {
  ethernetEnsure(generator);
  var info = block.getFieldValue('INFO') || 'localIP';
  var map = {localIP:'Ethernet.localIP()',gatewayIP:'Ethernet.gatewayIP()',subnetMask:'Ethernet.subnetMask()',dnsServerIP:'Ethernet.dnsServerIP()',link:'(Ethernet.linkStatus() == LinkON)',hardware:'(Ethernet.hardwareStatus() != EthernetNoHardware)'};
  return [map[info] || map.localIP, generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['ethernet_client_create'] = function(block, generator) {
  ethernetEnsure(generator); ethernetAttach(block, 'VAR', 'EthernetClient', 'ethClient');
  var name = block.getFieldValue('VAR') || 'ethClient';
  generator.addObject('ethernet_client_' + name, 'EthernetClient ' + name + ';');
  return '';
};
Arduino.forBlock['ethernet_client_connect'] = function(block, generator) {
  ethernetEnsure(generator); var name = ethernetName(block,'VAR','ethClient');
  var host = generator.valueToCode(block,'HOST',generator.ORDER_ATOMIC) || '"example.com"';
  var port = generator.valueToCode(block,'PORT',generator.ORDER_ATOMIC) || '80';
  return [name + '.connect(' + host + ', ' + port + ')', generator.ORDER_FUNCTION_CALL];
};
Arduino.forBlock['ethernet_client_write'] = function(block, generator) {
  ethernetEnsure(generator); var name=ethernetName(block,'VAR','ethClient'); var op=block.getFieldValue('OP')||'print'; var data=generator.valueToCode(block,'DATA',generator.ORDER_NONE)||'""';
  return name + '.' + op + '(' + data + ');\n';
};
Arduino.forBlock['ethernet_client_data'] = function(block, generator) {
  ethernetEnsure(generator); var name=ethernetName(block,'VAR','ethClient'); var data=block.getFieldValue('DATA')||'available';
  var map={available:name+'.available()',read:name+'.read()',line:name+'.readStringUntil(\'\\n\')',connected:name+'.connected()'};
  return [map[data]||map.available,generator.ORDER_FUNCTION_CALL];
};
Arduino.forBlock['ethernet_client_stop'] = function(block, generator) { ethernetEnsure(generator); return ethernetName(block,'VAR','ethClient') + '.stop();\n'; };
Arduino.forBlock['ethernet_server_create'] = function(block, generator) {
  ethernetEnsure(generator); ethernetAttach(block,'VAR','EthernetServer','ethServer'); var name=block.getFieldValue('VAR')||'ethServer'; var port=generator.valueToCode(block,'PORT',generator.ORDER_ATOMIC)||'80';
  generator.addObject('ethernet_server_'+name,'EthernetServer '+name+'('+port+');'); generator.addSetupBegin('ethernet_server_begin_'+name,name+'.begin();'); return '';
};
Arduino.forBlock['ethernet_server_accept'] = function(block, generator) { ethernetEnsure(generator); return [ethernetName(block,'VAR','ethServer')+'.accept()',generator.ORDER_FUNCTION_CALL]; };
Arduino.forBlock['ethernet_udp_create'] = function(block, generator) {
  ethernetEnsure(generator); ethernetAttach(block,'VAR','EthernetUDP','ethUdp'); var name=block.getFieldValue('VAR')||'ethUdp'; var port=generator.valueToCode(block,'PORT',generator.ORDER_ATOMIC)||'8888';
  generator.addObject('ethernet_udp_'+name,'EthernetUDP '+name+';'); generator.addSetupBegin('ethernet_udp_begin_'+name,name+'.begin('+port+');'); return '';
};
Arduino.forBlock['ethernet_udp_send'] = function(block, generator) {
  ethernetEnsure(generator); var name=ethernetName(block,'VAR','ethUdp'); var data=generator.valueToCode(block,'DATA',generator.ORDER_NONE)||'""'; var host=generator.valueToCode(block,'HOST',generator.ORDER_ATOMIC)||'"192.168.1.100"'; var port=generator.valueToCode(block,'PORT',generator.ORDER_ATOMIC)||'8888';
  return name+'.beginPacket('+host+', '+port+');\n'+name+'.print('+data+');\n'+name+'.endPacket();\n';
};
Arduino.forBlock['ethernet_udp_data'] = function(block, generator) { ethernetEnsure(generator); var name=ethernetName(block,'VAR','ethUdp'); var data=block.getFieldValue('DATA')||'parsePacket'; return [name+'.'+data+'()',generator.ORDER_FUNCTION_CALL]; };
