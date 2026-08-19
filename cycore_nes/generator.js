'use strict';

function cycoreNesEnsure(generator) {
  generator.addLibrary('cycore_nes', '#include <CycoreNES.h>');
  generator.addSetupBegin('cycore_nes_serial', 'Serial.begin(115200);');
}

function cycoreNesValue(block, generator, name, fallback) {
  return generator.valueToCode(block, name, generator.ORDER_ATOMIC) || fallback;
}

function cycoreNesWarning(block, message) {
  if (block && typeof block.setWarningText === 'function') block.setWarningText(message || null);
}

function cycoreNesSafeId(block) {
  return String(block && block.id ? block.id : 'rom').replace(/[^A-Za-z0-9_]/g, '_');
}

function cycoreNesCppString(value) {
  return JSON.stringify(String(value || ''));
}

function cycoreNesDecodeBase64(value) {
  if (typeof atob === 'function') {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; ++i) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
  if (typeof Buffer !== 'undefined') return Uint8Array.from(Buffer.from(value, 'base64'));
  throw new Error('当前环境不能解码ROM数据');
}

function cycoreNesEmbeddedRom(block) {
  const raw = block.getFieldValue('ROM');
  if (!raw) throw new Error('尚未选择.nes文件');
  const metadata = typeof raw === 'string' ? JSON.parse(raw) : raw;
  const fileName = String(metadata.fileName || '').replace(/^.*[\\/]/, '')
      .replace(/[^A-Za-z0-9._ -]/g, '_');
  if (!fileName || !/\.nes$/i.test(fileName)) throw new Error('文件名必须以.nes结尾');
  const bytes = cycoreNesDecodeBase64(String(metadata.base64 || ''));
  if (bytes.length < 16 || bytes[0] !== 0x4E || bytes[1] !== 0x45 ||
      bytes[2] !== 0x53 || bytes[3] !== 0x1A) {
    throw new Error('不是有效的iNES ROM');
  }
  if (bytes.length > 1792 * 1024) throw new Error('单个ROM不能超过1.75MB');
  if (Number(metadata.size) !== bytes.length) throw new Error('ROM数据长度不一致，请重新选择');
  return {fileName: fileName, bytes: bytes};
}

Arduino.forBlock['cycore_nes_flash_begin'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return 'CycoreNES.beginFlash(' +
      (block.getFieldValue('FORMAT') === 'FALSE' ? 'false' : 'true') + ');\n';
};

Arduino.forBlock['cycore_nes_display_begin'] = function(block, generator) {
  cycoreNesEnsure(generator);
  const landscape = block.getFieldValue('SIZE') === '240X320_LANDSCAPE';
  const panelHeight = landscape ? '320' : '240';
  const rotation = landscape ? '1' : '0';
  const frequency = block.getFieldValue('FREQUENCY') || '32000000';
  return 'CycoreNES.beginDisplay(240, ' + panelHeight + ', ' + rotation + ', ' +
      frequency + ', ' +
      ['SCK', 'MOSI', 'RST', 'DC', 'CS', 'BL'].map(function(name) {
        const defaults = {SCK: '12', MOSI: '11', RST: '17', DC: '18', CS: '10', BL: '21'};
        return cycoreNesValue(block, generator, name, defaults[name]);
      }).join(', ') + ');\n';
};

Arduino.forBlock['cycore_nes_buttons'] = function(block, generator) {
  cycoreNesEnsure(generator);
  const defaults = {UP: '1', DOWN: '2', LEFT: '4', RIGHT: '5', A: '6', B: '7'};
  return 'CycoreNES.setButtonPins(' +
      ['UP', 'DOWN', 'LEFT', 'RIGHT', 'A', 'B'].map(function(name) {
        return cycoreNesValue(block, generator, name, defaults[name]);
      }).join(', ') + ');\n';
};

Arduino.forBlock['cycore_nes_audio'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return 'CycoreNES.setAudioPins(' +
      cycoreNesValue(block, generator, 'BCK', '38') + ', ' +
      cycoreNesValue(block, generator, 'WS', '39') + ', ' +
      cycoreNesValue(block, generator, 'DOUT', '40') + ');\n';
};

Arduino.forBlock['cycore_nes_embed_rom'] = function(block, generator) {
  cycoreNesEnsure(generator);
  try {
    const rom = cycoreNesEmbeddedRom(block);
    const name = 'cycoreNesRom_' + cycoreNesSafeId(block);
    const rows = [];
    for (let offset = 0; offset < rom.bytes.length; offset += 16) {
      rows.push('  ' + Array.from(rom.bytes.subarray(offset, offset + 16))
          .map(function(byte) { return '0x' + byte.toString(16).padStart(2, '0').toUpperCase(); })
          .join(', '));
    }
    generator.addObject(name, 'static const uint8_t ' + name + '[] PROGMEM = {\n' +
        rows.join(',\n') + '\n};');
    cycoreNesWarning(block, null);
    return 'CycoreNES.installEmbeddedRom(' + cycoreNesCppString(rom.fileName) + ', ' +
        name + ', sizeof(' + name + '));\n';
  } catch (error) {
    cycoreNesWarning(block, '预置ROM无效：' + error.message);
    return '';
  }
};

Arduino.forBlock['cycore_nes_wifi_upload'] = function(block, generator) {
  cycoreNesEnsure(generator);
  const ssid = block.getFieldValue('SSID') || 'Cycore-NES';
  const password = block.getFieldValue('PASSWORD') || '';
  const seconds = Math.max(0, Math.min(3600, Number(block.getFieldValue('TIMEOUT')) || 0));
  return 'CycoreNES.runWifiUploader(' + cycoreNesCppString(ssid) + ', ' +
      cycoreNesCppString(password) + ', ' + Math.round(seconds * 1000) + 'UL);\n';
};

Arduino.forBlock['cycore_nes_refresh'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return 'CycoreNES.refreshGames();\n';
};

Arduino.forBlock['cycore_nes_game_count'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return ['CycoreNES.gameCount()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['cycore_nes_game_name'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return ['CycoreNES.gameName(' + cycoreNesValue(block, generator, 'INDEX', '0') + ')',
    generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['cycore_nes_game_path'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return ['CycoreNES.gamePath(' + cycoreNesValue(block, generator, 'INDEX', '0') + ')',
    generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['cycore_nes_browser'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return ['CycoreNES.browse()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['cycore_nes_start'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return 'CycoreNES.startGame(String(' +
      cycoreNesValue(block, generator, 'PATH', '""') + '));\n';
};

Arduino.forBlock['cycore_nes_delete'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return 'CycoreNES.deleteGame(String(' +
      cycoreNesValue(block, generator, 'PATH', '""') + '));\n';
};

Arduino.forBlock['cycore_nes_flash_info'] = function(block, generator) {
  cycoreNesEnsure(generator);
  const methods = {TOTAL: 'flashTotalBytes', USED: 'flashUsedBytes', FREE: 'flashFreeBytes'};
  const method = methods[block.getFieldValue('INFO')] || methods.TOTAL;
  return ['CycoreNES.' + method + '()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['cycore_nes_last_error'] = function(block, generator) {
  cycoreNesEnsure(generator);
  return ['CycoreNES.lastError()', generator.ORDER_FUNCTION_CALL];
};
