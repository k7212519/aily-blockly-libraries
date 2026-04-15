/**
 * ES8311 Audio Codec Library - Blockly Code Generator
 * Supports: Init, Record, Play, Volume, Mic Gain, Save WAV
 */

// ==================== ES8311 Init ====================
Arduino.forBlock['es8311_init'] = function(block, generator) {
  // Variable rename listener
  if (!block._es8311VarMonitorAttached) {
    block._es8311VarMonitorAttached = true;
    block._es8311VarLastName = block.getFieldValue('VAR') || 'es8311';
    registerVariableToBlockly(block._es8311VarLastName, 'ES8311');
    const varField = block.getField('VAR');
    if (varField) {
      const originalFinishEditing = varField.onFinishEditing_;
      varField.onFinishEditing_ = function(newName) {
        if (typeof originalFinishEditing === 'function') {
          originalFinishEditing.call(this, newName);
        }
        const workspace = block.workspace || (typeof Blockly !== 'undefined' && Blockly.getMainWorkspace && Blockly.getMainWorkspace());
        const oldName = block._es8311VarLastName;
        if (workspace && newName && newName !== oldName) {
          renameVariableInBlockly(block, oldName, newName, 'ES8311');
          block._es8311VarLastName = newName;
        }
      };
    }
  }

  const varName = block.getFieldValue('VAR') || 'es8311';
  const wire = block.getFieldValue('WIRE') || 'Wire';
  const sampleRate = block.getFieldValue('SAMPLE_RATE') || '16000';

  const sda = generator.valueToCode(block, 'SDA', generator.ORDER_ATOMIC) || '41';
  const scl = generator.valueToCode(block, 'SCL', generator.ORDER_ATOMIC) || '42';
  const mclk = generator.valueToCode(block, 'MCLK', generator.ORDER_ATOMIC) || '46';
  const bclk = generator.valueToCode(block, 'BCLK', generator.ORDER_ATOMIC) || '39';
  const lrck = generator.valueToCode(block, 'LRCK', generator.ORDER_ATOMIC) || '2';
  const din = generator.valueToCode(block, 'DIN', generator.ORDER_ATOMIC) || '38';
  const dout = generator.valueToCode(block, 'DOUT', generator.ORDER_ATOMIC) || '40';
  const recordSeconds = generator.valueToCode(block, 'RECORD_SECONDS', generator.ORDER_ATOMIC) || '3';

  // Libraries
  generator.addLibrary('Wire', '#include <Wire.h>');
  generator.addLibrary('driver_i2s', '#include "driver/i2s.h"');
  generator.addLibrary('FS', '#include <FS.h>');
  generator.addLibrary('SPIFFS', '#include <SPIFFS.h>');
  generator.addLibrary('SD', '#include <SD.h>');
  ensureSerialBegin('Serial', generator, 115200);

  // Global variables
  generator.addObject('es8311_addr_' + varName, 'uint8_t ' + varName + '_addr = 0x18;');
  generator.addObject('es8311_buf_' + varName, 'int16_t* ' + varName + '_audioBuf = nullptr;');
  generator.addObject('es8311_samples_' + varName, 'size_t ' + varName + '_audioSamples = ' + sampleRate + ' * ' + recordSeconds + ';');
  generator.addObject('es8311_has_rec_' + varName, 'bool ' + varName + '_hasRecording = false;');

  // Register helper: es8311 write register
  const esWriteRegFunc = 'bool ' + varName + '_writeReg(uint8_t reg, uint8_t val) {\n' +
    '  ' + wire + '.beginTransmission(' + varName + '_addr);\n' +
    '  ' + wire + '.write(reg);\n' +
    '  ' + wire + '.write(val);\n' +
    '  return (' + wire + '.endTransmission() == 0);\n' +
    '}\n';
  generator.addFunction(varName + '_writeReg', esWriteRegFunc, true);

  // Register helper: es8311 read register
  const esReadRegFunc = 'bool ' + varName + '_readReg(uint8_t reg, uint8_t &val) {\n' +
    '  ' + wire + '.beginTransmission(' + varName + '_addr);\n' +
    '  ' + wire + '.write(reg);\n' +
    '  if (' + wire + '.endTransmission(false) != 0) return false;\n' +
    '  if (' + wire + '.requestFrom((int)' + varName + '_addr, 1) != 1) return false;\n' +
    '  val = ' + wire + '.read();\n' +
    '  return true;\n' +
    '}\n';
  generator.addFunction(varName + '_readReg', esReadRegFunc, true);

  // Register helper: init ES8311 registers
  const initRegsFunc = 'bool ' + varName + '_initRegs() {\n' +
    '  delay(20);\n' +
    '  if (!' + varName + '_writeReg(0x44, 0x08)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x44, 0x08)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x01, 0x30)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x02, 0x00)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x03, 0x10)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x16, 0x24)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x04, 0x10)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x05, 0x00)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x0B, 0x00)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x0C, 0x00)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x10, 0x1F)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x11, 0x7F)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x00, 0x80)) return false;\n' +
    '  uint8_t reg00 = 0;\n' +
    '  if (!' + varName + '_readReg(0x00, reg00)) return false;\n' +
    '  reg00 &= 0xBF;\n' +
    '  if (!' + varName + '_writeReg(0x00, reg00)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x01, 0x3F)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x09, 0x0C)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x0A, 0x0C)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x17, 0xBF)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x0E, 0x02)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x12, 0x00)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x14, 0x1A)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x0D, 0x01)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x15, 0x40)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x37, 0x08)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x45, 0x00)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x44, 0x58)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x31, 0x00)) return false;\n' +
    '  if (!' + varName + '_writeReg(0x32, 0xBF)) return false;\n' +
    '  return true;\n' +
    '}\n';
  generator.addFunction(varName + '_initRegs', initRegsFunc, true);

  // Register helper: init I2S
  const initI2SFunc = 'bool ' + varName + '_initI2S() {\n' +
    '  i2s_driver_uninstall(I2S_NUM_0);\n' +
    '  i2s_config_t cfg = {};\n' +
    '  cfg.mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_TX | I2S_MODE_RX);\n' +
    '  cfg.sample_rate = ' + sampleRate + ';\n' +
    '  cfg.bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT;\n' +
    '  cfg.channel_format = I2S_CHANNEL_FMT_ONLY_LEFT;\n' +
    '  cfg.communication_format = I2S_COMM_FORMAT_STAND_I2S;\n' +
    '  cfg.intr_alloc_flags = ESP_INTR_FLAG_LEVEL1;\n' +
    '  cfg.dma_buf_count = 8;\n' +
    '  cfg.dma_buf_len = 256;\n' +
    '  cfg.use_apll = false;\n' +
    '  cfg.tx_desc_auto_clear = true;\n' +
    '  cfg.fixed_mclk = ' + sampleRate + ' * 256;\n' +
    '  if (i2s_driver_install(I2S_NUM_0, &cfg, 0, nullptr) != ESP_OK) return false;\n' +
    '  i2s_pin_config_t pins = {};\n' +
    '  pins.mck_io_num = ' + mclk + ';\n' +
    '  pins.bck_io_num = ' + bclk + ';\n' +
    '  pins.ws_io_num = ' + lrck + ';\n' +
    '  pins.data_out_num = ' + din + ';\n' +
    '  pins.data_in_num = ' + dout + ';\n' +
    '  if (i2s_set_pin(I2S_NUM_0, &pins) != ESP_OK) return false;\n' +
    '  if (i2s_set_clk(I2S_NUM_0, ' + sampleRate + ', I2S_BITS_PER_SAMPLE_16BIT, I2S_CHANNEL_MONO) != ESP_OK) return false;\n' +
    '  i2s_zero_dma_buffer(I2S_NUM_0);\n' +
    '  return true;\n' +
    '}\n';
  generator.addFunction(varName + '_initI2S', initI2SFunc, true);

  // Register helper: record
  const recordFunc = 'bool ' + varName + '_record() {\n' +
    '  const size_t totalBytes = ' + varName + '_audioSamples * sizeof(int16_t);\n' +
    '  size_t offset = 0;\n' +
    '  Serial.printf("[REC] start, bytes=%u\\n", (unsigned)totalBytes);\n' +
    '  while (offset < totalBytes) {\n' +
    '    size_t want = totalBytes - offset;\n' +
    '    if (want > 2048) want = 2048;\n' +
    '    size_t got = 0;\n' +
    '    esp_err_t err = i2s_read(I2S_NUM_0, (uint8_t*)' + varName + '_audioBuf + offset, want, &got, portMAX_DELAY);\n' +
    '    if (err != ESP_OK) {\n' +
    '      Serial.printf("[REC] i2s_read error=%d\\n", (int)err);\n' +
    '      return false;\n' +
    '    }\n' +
    '    if (got == 0) continue;\n' +
    '    offset += got;\n' +
    '  }\n' +
    '  ' + varName + '_hasRecording = true;\n' +
    '  Serial.println("[REC] done");\n' +
    '  return true;\n' +
    '}\n';
  generator.addFunction(varName + '_record', recordFunc, true);

  // Register helper: play
  const playFunc = 'bool ' + varName + '_play() {\n' +
    '  if (!' + varName + '_hasRecording) {\n' +
    '    Serial.println("[PLAY] no recording yet");\n' +
    '    return false;\n' +
    '  }\n' +
    '  const size_t totalBytes = ' + varName + '_audioSamples * sizeof(int16_t);\n' +
    '  size_t offset = 0;\n' +
    '  Serial.printf("[PLAY] start, bytes=%u\\n", (unsigned)totalBytes);\n' +
    '  while (offset < totalBytes) {\n' +
    '    size_t want = totalBytes - offset;\n' +
    '    if (want > 2048) want = 2048;\n' +
    '    size_t sent = 0;\n' +
    '    esp_err_t err = i2s_write(I2S_NUM_0, (uint8_t*)' + varName + '_audioBuf + offset, want, &sent, portMAX_DELAY);\n' +
    '    if (err != ESP_OK) {\n' +
    '      Serial.printf("[PLAY] i2s_write error=%d\\n", (int)err);\n' +
    '      return false;\n' +
    '    }\n' +
    '    offset += sent;\n' +
    '  }\n' +
    '  Serial.println("[PLAY] done");\n' +
    '  return true;\n' +
    '}\n';
  generator.addFunction(varName + '_play', playFunc, true);

  // Register helper: fill WAV header
  const wavHeaderFunc = 'void ' + varName + '_fillWavHeader(uint8_t *hdr, uint32_t dataBytes) {\n' +
    '  const uint32_t sampleRate = ' + sampleRate + ';\n' +
    '  const uint16_t channels = 1;\n' +
    '  const uint16_t bitsPerSample = 16;\n' +
    '  const uint32_t byteRate = sampleRate * channels * (bitsPerSample / 8);\n' +
    '  const uint16_t blockAlign = channels * (bitsPerSample / 8);\n' +
    '  const uint32_t riffSize = 36 + dataBytes;\n' +
    '  memcpy(hdr + 0, "RIFF", 4);\n' +
    '  hdr[4] = (uint8_t)(riffSize & 0xFF);\n' +
    '  hdr[5] = (uint8_t)((riffSize >> 8) & 0xFF);\n' +
    '  hdr[6] = (uint8_t)((riffSize >> 16) & 0xFF);\n' +
    '  hdr[7] = (uint8_t)((riffSize >> 24) & 0xFF);\n' +
    '  memcpy(hdr + 8, "WAVE", 4);\n' +
    '  memcpy(hdr + 12, "fmt ", 4);\n' +
    '  hdr[16] = 16; hdr[17] = 0; hdr[18] = 0; hdr[19] = 0;\n' +
    '  hdr[20] = 1;  hdr[21] = 0;\n' +
    '  hdr[22] = channels; hdr[23] = 0;\n' +
    '  hdr[24] = (uint8_t)(sampleRate & 0xFF);\n' +
    '  hdr[25] = (uint8_t)((sampleRate >> 8) & 0xFF);\n' +
    '  hdr[26] = (uint8_t)((sampleRate >> 16) & 0xFF);\n' +
    '  hdr[27] = (uint8_t)((sampleRate >> 24) & 0xFF);\n' +
    '  hdr[28] = (uint8_t)(byteRate & 0xFF);\n' +
    '  hdr[29] = (uint8_t)((byteRate >> 8) & 0xFF);\n' +
    '  hdr[30] = (uint8_t)((byteRate >> 16) & 0xFF);\n' +
    '  hdr[31] = (uint8_t)((byteRate >> 24) & 0xFF);\n' +
    '  hdr[32] = (uint8_t)(blockAlign & 0xFF);\n' +
    '  hdr[33] = (uint8_t)((blockAlign >> 8) & 0xFF);\n' +
    '  hdr[34] = bitsPerSample;\n' +
    '  hdr[35] = 0;\n' +
    '  memcpy(hdr + 36, "data", 4);\n' +
    '  hdr[40] = (uint8_t)(dataBytes & 0xFF);\n' +
    '  hdr[41] = (uint8_t)((dataBytes >> 8) & 0xFF);\n' +
    '  hdr[42] = (uint8_t)((dataBytes >> 16) & 0xFF);\n' +
    '  hdr[43] = (uint8_t)((dataBytes >> 24) & 0xFF);\n' +
    '}\n';
  generator.addFunction(varName + '_fillWavHeader', wavHeaderFunc, true);

  // Register helper: save WAV to filesystem
  const saveWavFunc = 'bool ' + varName + '_saveWav(const char* path) {\n' +
    '  if (!' + varName + '_hasRecording) {\n' +
    '    Serial.println("[WAV] no recording yet");\n' +
    '    return false;\n' +
    '  }\n' +
    '  fs::FS* fs = nullptr;\n' +
    '  if (SPIFFS.begin(true)) fs = &SPIFFS;\n' +
    '  else if (SD.begin()) fs = &SD;\n' +
    '  if (!fs) {\n' +
    '    Serial.println("[WAV] no FS available");\n' +
    '    return false;\n' +
    '  }\n' +
    '  File f = fs->open(path, FILE_WRITE);\n' +
    '  if (!f) {\n' +
    '    Serial.printf("[WAV] open failed: %s\\n", path);\n' +
    '    return false;\n' +
    '  }\n' +
    '  uint32_t dataBytes = (uint32_t)(' + varName + '_audioSamples * sizeof(int16_t));\n' +
    '  uint8_t hdr[44] = {0};\n' +
    '  ' + varName + '_fillWavHeader(hdr, dataBytes);\n' +
    '  if (f.write(hdr, sizeof(hdr)) != sizeof(hdr)) { f.close(); return false; }\n' +
    '  const uint8_t* src = (const uint8_t*)' + varName + '_audioBuf;\n' +
    '  size_t left = dataBytes;\n' +
    '  while (left > 0) {\n' +
    '    size_t chunk = left > 2048 ? 2048 : left;\n' +
    '    if (f.write(src, chunk) != chunk) { f.close(); return false; }\n' +
    '    src += chunk;\n' +
    '    left -= chunk;\n' +
    '  }\n' +
    '  f.close();\n' +
    '  Serial.printf("[WAV] saved: %s\\n", path);\n' +
    '  return true;\n' +
    '}\n';
  generator.addFunction(varName + '_saveWav', saveWavFunc, true);

  // Wire initialization with I2C de-duplication
  const wireBeginKey = 'wire_' + wire + '_begin';
  if (!generator.setupCodes_ || !generator.setupCodes_[wireBeginKey]) {
    generator.addSetupBegin(wireBeginKey, wire + '.begin(' + sda + ', ' + scl + ', 400000);\n');
  }

  // Generate init code
  let code = '';
  code += '// Scan ES8311 I2C address\n';
  code += 'bool _found18 = false, _found30 = false;\n';
  code += wire + '.beginTransmission(0x18); _found18 = (' + wire + '.endTransmission() == 0);\n';
  code += wire + '.beginTransmission(0x30); _found30 = (' + wire + '.endTransmission() == 0);\n';
  code += 'if (_found18) ' + varName + '_addr = 0x18;\n';
  code += 'else if (_found30) ' + varName + '_addr = 0x30;\n';
  code += 'else { Serial.println("ES8311 not found on I2C!"); return; }\n';
  code += 'Serial.printf("ES8311 found at 0x%02X\\n", ' + varName + '_addr);\n';
  code += '\n';
  code += '// Allocate audio buffer\n';
  code += varName + '_audioBuf = (int16_t*)malloc(' + varName + '_audioSamples * sizeof(int16_t));\n';
  code += 'if (!' + varName + '_audioBuf) { Serial.println("Audio buffer alloc failed!"); return; }\n';
  code += '\n';
  code += '// Init ES8311 registers\n';
  code += 'if (!' + varName + '_initRegs()) { Serial.println("ES8311 init failed!"); return; }\n';
  code += 'Serial.println("ES8311 init OK");\n';
  code += '\n';
  code += '// Init I2S\n';
  code += 'if (!' + varName + '_initI2S()) { Serial.println("I2S init failed!"); return; }\n';
  code += 'Serial.println("ES8311 I2S init OK");\n';

  return code;
};

// ==================== ES8311 Record ====================
Arduino.forBlock['es8311_record'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'es8311';

  generator.addLibrary('driver_i2s', '#include "driver/i2s.h"');
  ensureSerialBegin('Serial', generator, 115200);

  return varName + '_record();\n';
};

// ==================== ES8311 Play ====================
Arduino.forBlock['es8311_play'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'es8311';

  generator.addLibrary('driver_i2s', '#include "driver/i2s.h"');
  ensureSerialBegin('Serial', generator, 115200);

  return varName + '_play();\n';
};

// ==================== ES8311 Set Volume ====================
Arduino.forBlock['es8311_set_volume'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'es8311';
  const volume = generator.valueToCode(block, 'VOLUME', generator.ORDER_ATOMIC) || '191';

  generator.addLibrary('Wire', '#include <Wire.h>');
  ensureSerialBegin('Serial', generator, 115200);

  // Generate inline volume set
  let code = '';
  code += 'if (' + varName + '_writeReg(0x32, (uint8_t)(' + volume + '))) {\n';
  code += '  Serial.printf("[VOL] DAC set to %d\\n", (int)(' + volume + '));\n';
  code += '} else {\n';
  code += '  Serial.println("[VOL] set failed");\n';
  code += '}\n';

  return code;
};

// ==================== ES8311 Set Mic Gain ====================
Arduino.forBlock['es8311_set_mic_gain'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'es8311';
  const gain = generator.valueToCode(block, 'GAIN', generator.ORDER_ATOMIC) || '4';

  generator.addLibrary('Wire', '#include <Wire.h>');
  ensureSerialBegin('Serial', generator, 115200);

  let code = '';
  code += '{\n';
  code += '  uint8_t _step = (uint8_t)(' + gain + ');\n';
  code += '  if (_step > 8) _step = 8;\n';
  code += '  uint8_t reg16 = 0;\n';
  code += '  if (' + varName + '_readReg(0x16, reg16)) {\n';
  code += '    reg16 = (uint8_t)((reg16 & 0xF0) | (_step & 0x0F));\n';
  code += '    if (' + varName + '_writeReg(0x16, reg16)) {\n';
  code += '      Serial.printf("[GAIN] ADC PGA step=%u\\n", _step);\n';
  code += '    } else {\n';
  code += '      Serial.println("[GAIN] write failed");\n';
  code += '    }\n';
  code += '  } else {\n';
  code += '    Serial.println("[GAIN] read failed");\n';
  code += '  }\n';
  code += '}\n';

  return code;
};

// ==================== ES8311 Save WAV ====================
Arduino.forBlock['es8311_save_wav'] = function(block, generator) {
  const varField = block.getField('VAR');
  const varName = varField ? varField.getText() : 'es8311';
  const path = generator.valueToCode(block, 'PATH', generator.ORDER_ATOMIC) || '"/rec_001.wav"';

  generator.addLibrary('FS', '#include <FS.h>');
  generator.addLibrary('SPIFFS', '#include <SPIFFS.h>');
  generator.addLibrary('SD', '#include <SD.h>');
  ensureSerialBegin('Serial', generator, 115200);

  return varName + '_saveWav(' + path + ');\n';
};
