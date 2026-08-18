function mimoEnsureLibrary(generator) {
  generator.addLibrary('AilyMiMo', '#include <AilyMiMo.h>');
}

function mimoVariable(block, fieldName, fallback) {
  const field = block.getField(fieldName || 'VAR');
  return field ? field.getText() : fallback;
}

function mimoValue(generator, block, name, fallback) {
  return generator.valueToCode(block, name, generator.ORDER_ATOMIC) || fallback;
}

function mimoAttachRenameMonitor(block, varName, typeName) {
  if (block._varMonitorAttached) return;
  block._varMonitorAttached = true;
  block._varLastName = varName;
  registerVariableToBlockly(varName, typeName);

  const field = block.getField('VAR');
  if (!field) return;
  const originalFinishEditing = field.onFinishEditing_;
  field.onFinishEditing_ = function(newName) {
    if (typeof originalFinishEditing === 'function') {
      originalFinishEditing.call(this, newName);
    }
    const workspace = block.workspace ||
      (typeof Blockly !== 'undefined' && Blockly.getMainWorkspace &&
        Blockly.getMainWorkspace());
    const oldName = block._varLastName;
    if (workspace && newName && newName !== oldName) {
      renameVariableInBlockly(block, oldName, newName, typeName);
      block._varLastName = newName;
    }
  };
}

function mimoAddObject(block, generator, varName, typeName, cppType) {
  mimoEnsureLibrary(generator);
  mimoAttachRenameMonitor(block, varName, typeName);
  registerVariableToBlockly(varName, typeName);
  generator.addObject('mimo_' + typeName + '_' + varName,
    cppType + ' ' + varName + ';');
}

Arduino.forBlock['mimo_init'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'mimo';
  const apiKey = mimoValue(generator, block, 'API_KEY', '""');
  const plan = block.getFieldValue('PLAN') || 'PAYG';
  const baseUrl = plan === 'TOKEN_PLAN' ?
    'https://token-plan-cn.xiaomimimo.com/v1' :
    'https://api.xiaomimimo.com/v1';
  mimoAddObject(block, generator, varName, 'MiMoClient', 'AilyMiMo');
  return varName + '.begin(String(' + apiKey + '), "' + baseUrl + '");\n';
};

Arduino.forBlock['mimo_set_ca_certificate'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const cert = mimoValue(generator, block, 'CERT', '""');
  mimoEnsureLibrary(generator);
  return name + '.setCACertificate(String(' + cert + '));\n';
};

Arduino.forBlock['mimo_set_model'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const model = block.getFieldValue('MODEL') || 'mimo-v2.5';
  mimoEnsureLibrary(generator);
  return name + '.setModel("' + model + '");\n';
};

Arduino.forBlock['mimo_set_system_prompt'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const prompt = mimoValue(generator, block, 'PROMPT', '""');
  mimoEnsureLibrary(generator);
  return name + '.setSystemPrompt(String(' + prompt + '));\n';
};

Arduino.forBlock['mimo_set_generation'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const maxTokens = mimoValue(generator, block, 'MAX_TOKENS', '1024');
  const thinking = block.getFieldValue('THINKING') || 'enabled';
  const temperature = mimoValue(generator, block, 'TEMPERATURE', '1.0');
  const topP = mimoValue(generator, block, 'TOP_P', '0.95');
  mimoEnsureLibrary(generator);
  return name + '.setGeneration(' + maxTokens + ', "' + thinking + '", ' +
    temperature + ', ' + topP + ');\n';
};

Arduino.forBlock['mimo_set_json_mode'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const enabled = mimoValue(generator, block, 'ENABLED', 'true');
  mimoEnsureLibrary(generator);
  return name + '.setJsonMode(' + enabled + ');\n';
};

Arduino.forBlock['mimo_clear_messages'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  mimoEnsureLibrary(generator);
  return name + '.clearMessages();\n';
};

Arduino.forBlock['mimo_add_user_message'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const value = mimoValue(generator, block, 'TEXT', '""');
  mimoEnsureLibrary(generator);
  return name + '.addUserMessage(String(' + value + '));\n';
};

Arduino.forBlock['mimo_add_assistant_message'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const value = mimoValue(generator, block, 'TEXT', '""');
  mimoEnsureLibrary(generator);
  return name + '.addAssistantMessage(String(' + value + '));\n';
};

Arduino.forBlock['mimo_chat'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const prompt = mimoValue(generator, block, 'PROMPT', '""');
  mimoEnsureLibrary(generator);
  return [name + '.chat(String(' + prompt + '))', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_chat_with_tools'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const tools = mimoValue(generator, block, 'TOOLS', '"[]"');
  const prompt = mimoValue(generator, block, 'PROMPT', '""');
  mimoEnsureLibrary(generator);
  return [name + '.chatWithTools(String(' + prompt + '), String(' + tools + '))',
    generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_continue_tool'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const result = mimoValue(generator, block, 'RESULT', '""');
  mimoEnsureLibrary(generator);
  return [name + '.continueTool(String(' + result + '))',
    generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_when_tool_called'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const toolName = mimoValue(generator, block, 'NAME', '""');
  const handler = generator.statementToCode(block, 'HANDLER') || '';
  mimoEnsureLibrary(generator);
  return 'if (' + name + '.hasToolCall() && ' + name + '.toolName() == String(' +
    toolName + ')) {\n' + handler + '}\n';
};

Arduino.forBlock['mimo_tool_arguments'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  mimoEnsureLibrary(generator);
  return [name + '.toolArguments()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_web_search'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const prompt = mimoValue(generator, block, 'PROMPT', '""');
  const force = mimoValue(generator, block, 'FORCE', 'false');
  const maxKeyword = mimoValue(generator, block, 'MAX_KEYWORD', '3');
  const limit = mimoValue(generator, block, 'LIMIT', '1');
  const country = mimoValue(generator, block, 'COUNTRY', '"China"');
  const region = mimoValue(generator, block, 'REGION', '""');
  const city = mimoValue(generator, block, 'CITY', '""');
  mimoEnsureLibrary(generator);
  const code = name + '.webSearch(String(' + prompt + '), ' + force + ', ' +
    maxKeyword + ', ' + limit + ', String(' + country + '), String(' +
    region + '), String(' + city + '))';
  return [code, generator.ORDER_ATOMIC];
};

function mimoMediaValue(block, generator, method, extra) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const dataName = method.indexOf('Url') > -1 ? 'URL' : 'DATA';
  const data = mimoValue(generator, block, dataName, '""');
  const prompt = mimoValue(generator, block, 'PROMPT', '""');
  const args = ['String(' + data + ')'];
  if (dataName === 'DATA') {
    args.push('String(' + mimoValue(generator, block, 'MIME', '""') + ')');
  }
  args.push('String(' + prompt + ')');
  if (extra) args.push.apply(args, extra(block, generator));
  mimoEnsureLibrary(generator);
  return [name + '.' + method + '(' + args.join(', ') + ')',
    generator.ORDER_ATOMIC];
}

Arduino.forBlock['mimo_image_url'] = function(block, generator) {
  return mimoMediaValue(block, generator, 'imageUrl');
};
Arduino.forBlock['mimo_image_base64'] = function(block, generator) {
  return mimoMediaValue(block, generator, 'imageBase64');
};
Arduino.forBlock['mimo_audio_url'] = function(block, generator) {
  return mimoMediaValue(block, generator, 'audioUrl');
};
Arduino.forBlock['mimo_audio_base64'] = function(block, generator) {
  return mimoMediaValue(block, generator, 'audioBase64');
};

function mimoVideoExtra(block, generator) {
  return [mimoValue(generator, block, 'FPS', '2'),
    '"' + (block.getFieldValue('RESOLUTION') || 'default') + '"'];
}
Arduino.forBlock['mimo_video_url'] = function(block, generator) {
  return mimoMediaValue(block, generator, 'videoUrl', mimoVideoExtra);
};
Arduino.forBlock['mimo_video_base64'] = function(block, generator) {
  return mimoMediaValue(block, generator, 'videoBase64', mimoVideoExtra);
};

Arduino.forBlock['mimo_asr_base64'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const data = mimoValue(generator, block, 'DATA', '""');
  const mime = mimoValue(generator, block, 'MIME', '"audio/wav"');
  const language = block.getFieldValue('LANGUAGE') || 'auto';
  mimoEnsureLibrary(generator);
  return [name + '.transcribeBase64(String(' + data + '), String(' + mime +
    '), "' + language + '")', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_tts_preset'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const text = mimoValue(generator, block, 'TEXT', '""');
  const style = mimoValue(generator, block, 'STYLE', '""');
  const voice = block.getFieldValue('VOICE') || 'mimo_default';
  const format = block.getFieldValue('FORMAT') || 'wav';
  mimoEnsureLibrary(generator);
  return [name + '.synthesizePreset(String(' + text + '), String(' + style +
    '), "' + voice + '", "' + format + '")', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_speaker_init_i2s'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'speaker';
  const bclk = mimoValue(generator, block, 'BCLK', '39');
  const lrc = mimoValue(generator, block, 'LRC', '40');
  const din = mimoValue(generator, block, 'DIN', '38');
  mimoAddObject(block, generator, varName, 'MiMoSpeaker', 'AilyMiMoSpeaker');
  return varName + '.beginI2S(' + bclk + ', ' + lrc + ', ' + din + ');\n';
};

Arduino.forBlock['mimo_speaker_tone'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'speaker');
  const freq = mimoValue(generator, block, 'FREQ', '880');
  const ms = mimoValue(generator, block, 'MS', '180');
  mimoEnsureLibrary(generator);
  return name + '.playTone(' + freq + ', ' + ms + ');\n';
};

Arduino.forBlock['mimo_tts_speak_i2s'] = function(block, generator) {
  const client = mimoVariable(block, 'CLIENT', 'mimo');
  const speaker = mimoVariable(block, 'SPEAKER', 'speaker');
  const text = mimoValue(generator, block, 'TEXT', '""');
  const style = mimoValue(generator, block, 'STYLE', '"快速清楚朗读。"');
  const voice = block.getFieldValue('VOICE') || 'mimo_default';
  mimoEnsureLibrary(generator);
  return client + '.speakPreset(' + speaker + ', String(' + text +
    '), String(' + style + '), "' + voice + '");\n';
};

Arduino.forBlock['mimo_es8311_init'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'es8311';
  const sda = mimoValue(generator, block, 'SDA', '8');
  const scl = mimoValue(generator, block, 'SCL', '9');
  const address = block.getFieldValue('ADDRESS') || '0';
  const mck = mimoValue(generator, block, 'MCK', '16');
  const bck = mimoValue(generator, block, 'BCK', '4');
  const ws = mimoValue(generator, block, 'WS', '5');
  const dout = mimoValue(generator, block, 'DOUT', '6');
  const din = mimoValue(generator, block, 'DIN', '7');
  const duration = mimoValue(generator, block, 'DURATION', '5');
  const paEn = mimoValue(generator, block, 'PA_EN', '-1');
  mimoAddObject(block, generator, varName, 'MiMoES8311', 'AilyMiMoES8311');
  return varName + '.begin(Wire, ' + sda + ', ' + scl + ', ' + address +
    ', ' + mck + ', ' + bck + ', ' + ws + ', ' + dout + ', ' + din +
    ', ' + duration + ', ' + paEn + ');\n';
};

Arduino.forBlock['mimo_es8311_set_volume'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'es8311');
  const volume = mimoValue(generator, block, 'VOLUME', '75');
  mimoEnsureLibrary(generator);
  return name + '.setVolume(' + volume + ');\n';
};

Arduino.forBlock['mimo_es8311_set_mic_gain'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'es8311');
  const gain = mimoValue(generator, block, 'GAIN', '4');
  mimoEnsureLibrary(generator);
  return name + '.setMicGain(' + gain + ');\n';
};

Arduino.forBlock['mimo_es8311_tone'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'es8311');
  const freq = mimoValue(generator, block, 'FREQ', '880');
  const ms = mimoValue(generator, block, 'MS', '180');
  mimoEnsureLibrary(generator);
  return name + '.playTone(' + freq + ', ' + ms + ');\n';
};

Arduino.forBlock['mimo_es8311_record'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'es8311');
  const seconds = mimoValue(generator, block, 'SECONDS', '3');
  mimoEnsureLibrary(generator);
  return [name + '.recordWavBase64(' + seconds + ')', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_es8311_transcribe'] = function(block, generator) {
  const client = mimoVariable(block, 'CLIENT', 'mimo');
  const audio = mimoVariable(block, 'AUDIO', 'es8311');
  const seconds = mimoValue(generator, block, 'SECONDS', '3');
  const language = block.getFieldValue('LANGUAGE') || 'auto';
  mimoEnsureLibrary(generator);
  return [client + '.transcribeES8311(' + audio + ', ' + seconds +
    ', "' + language + '")', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_tts_speak_es8311'] = function(block, generator) {
  const client = mimoVariable(block, 'CLIENT', 'mimo');
  const audio = mimoVariable(block, 'AUDIO', 'es8311');
  const text = mimoValue(generator, block, 'TEXT', '""');
  const style = mimoValue(generator, block, 'STYLE', '"快速清楚朗读。"');
  const voice = block.getFieldValue('VOICE') || 'mimo_default';
  mimoEnsureLibrary(generator);
  return client + '.speakPreset(' + audio + ', String(' + text +
    '), String(' + style + '), "' + voice + '");\n';
};

Arduino.forBlock['mimo_es8311_end'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'es8311');
  mimoEnsureLibrary(generator);
  return name + '.end();\n';
};

Arduino.forBlock['mimo_tts_voice_design'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const description = mimoValue(generator, block, 'DESCRIPTION', '""');
  const text = mimoValue(generator, block, 'TEXT', '""');
  const optimize = mimoValue(generator, block, 'OPTIMIZE', 'true');
  const format = block.getFieldValue('FORMAT') || 'wav';
  mimoEnsureLibrary(generator);
  return [name + '.synthesizeVoiceDesign(String(' + description + '), String(' +
    text + '), ' + optimize + ', "' + format + '")', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_tts_voice_clone'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const sample = mimoValue(generator, block, 'SAMPLE', '""');
  const mime = mimoValue(generator, block, 'MIME', '"audio/wav"');
  const text = mimoValue(generator, block, 'TEXT', '""');
  const style = mimoValue(generator, block, 'STYLE', '""');
  const format = block.getFieldValue('FORMAT') || 'wav';
  mimoEnsureLibrary(generator);
  return [name + '.synthesizeVoiceClone(String(' + sample + '), String(' + mime +
    '), String(' + text + '), String(' + style + '), "' + format + '")',
    generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_camera_init_profile'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'camera';
  const profile = block.getFieldValue('PROFILE') || 'ESP32S3_RGB565';
  const frameSize = block.getFieldValue('FRAME_SIZE') || 'FRAMESIZE_QVGA';
  const quality = mimoValue(generator, block, 'QUALITY', '12');
  mimoAddObject(block, generator, varName, 'MiMoCamera', 'AilyMiMoCamera');
  return varName + '.beginProfile("' + profile + '", ' + frameSize + ', ' +
    quality + ');\n';
};

Arduino.forBlock['mimo_camera_init_custom'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'camera';
  const frameSize = block.getFieldValue('FRAME_SIZE') || 'FRAMESIZE_QVGA';
  const quality = mimoValue(generator, block, 'QUALITY', '12');
  const pin = function(name, fallback) {
    return mimoValue(generator, block, name, fallback);
  };
  const pins = [pin('PWDN', '-1'), pin('RESET', '-1'), pin('XCLK', '10'),
    pin('SIOD', '40'), pin('SIOC', '39'), pin('Y9', '48'), pin('Y8', '11'),
    pin('Y7', '12'), pin('Y6', '14'), pin('Y5', '16'), pin('Y4', '18'),
    pin('Y3', '17'), pin('Y2', '15'), pin('VSYNC', '38'), pin('HREF', '47'),
    pin('PCLK', '13')];
  mimoAddObject(block, generator, varName, 'MiMoCamera', 'AilyMiMoCamera');
  return varName + '.beginCustom(AilyMiMoCameraPins{' + pins.join(', ') + '}, ' +
    frameSize + ', ' + quality + ');\n';
};

Arduino.forBlock['mimo_camera_capture'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'camera');
  mimoEnsureLibrary(generator);
  return [name + '.captureBase64()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_camera_ask'] = function(block, generator) {
  const client = mimoVariable(block, 'CLIENT', 'mimo');
  const camera = mimoVariable(block, 'CAMERA', 'camera');
  const prompt = mimoValue(generator, block, 'PROMPT', '"Describe this image"');
  mimoEnsureLibrary(generator);
  return [client + '.imageBase64(' + camera + '.captureBase64(), "image/jpeg", ' +
    'String(' + prompt + '))', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_camera_end'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'camera');
  mimoEnsureLibrary(generator);
  return name + '.end();\n';
};

Arduino.forBlock['mimo_mic_init_i2s'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'microphone';
  const bclk = mimoValue(generator, block, 'BCLK', '41');
  const ws = mimoValue(generator, block, 'WS', '42');
  const data = mimoValue(generator, block, 'DATA', '2');
  const rate = mimoValue(generator, block, 'RATE', '16000');
  const channel = block.getFieldValue('CHANNEL') || 'LEFT';
  const right = channel === 'RIGHT' ? 'true' : 'false';
  const gain = mimoValue(generator, block, 'GAIN', '4');
  mimoAddObject(block, generator, varName, 'MiMoMicrophone',
    'AilyMiMoMicrophone');
  return varName + '.beginI2S(' + bclk + ', ' + ws + ', ' + data + ', ' +
    rate + ', ' + right + ', ' + gain + ');\n';
};

Arduino.forBlock['mimo_mic_init_i2s_preset'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'microphone';
  const model = block.getFieldValue('MODEL') || 'COMMON_I2S';
  const bclk = mimoValue(generator, block, 'BCLK', '41');
  const ws = mimoValue(generator, block, 'WS', '42');
  const data = mimoValue(generator, block, 'DATA', '2');
  const rate = mimoValue(generator, block, 'RATE', '16000');
  mimoAddObject(block, generator, varName, 'MiMoMicrophone',
    'AilyMiMoMicrophone');
  return varName + '.beginPreset("' + model + '", ' + bclk + ', ' + ws +
    ', ' + data + ', ' + rate + ');\n';
};

Arduino.forBlock['mimo_mic_init_pdm'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'microphone';
  const clk = mimoValue(generator, block, 'CLK', '42');
  const data = mimoValue(generator, block, 'DATA', '41');
  const rate = mimoValue(generator, block, 'RATE', '16000');
  mimoAddObject(block, generator, varName, 'MiMoMicrophone',
    'AilyMiMoMicrophone');
  return varName + '.beginPDM(' + clk + ', ' + data + ', ' + rate + ');\n';
};

Arduino.forBlock['mimo_mic_record'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'microphone');
  const seconds = mimoValue(generator, block, 'SECONDS', '3');
  mimoEnsureLibrary(generator);
  return [name + '.recordWavBase64(' + seconds + ')', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_mic_transcribe'] = function(block, generator) {
  const client = mimoVariable(block, 'CLIENT', 'mimo');
  const mic = mimoVariable(block, 'MIC', 'microphone');
  const seconds = mimoValue(generator, block, 'SECONDS', '3');
  const language = block.getFieldValue('LANGUAGE') || 'auto';
  mimoEnsureLibrary(generator);
  return [client + '.transcribeMicrophone(' + mic + ', ' + seconds +
    ', "' + language + '")', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_mic_analyze'] = function(block, generator) {
  const client = mimoVariable(block, 'CLIENT', 'mimo');
  const mic = mimoVariable(block, 'MIC', 'microphone');
  const seconds = mimoValue(generator, block, 'SECONDS', '3');
  const prompt = mimoValue(generator, block, 'PROMPT', '"Describe this audio"');
  mimoEnsureLibrary(generator);
  return [client + '.audioBase64(' + mic + '.recordWavBase64(' + seconds +
    '), "audio/wav", String(' + prompt + '))', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_mic_end'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'microphone');
  mimoEnsureLibrary(generator);
  return name + '.end();\n';
};

Arduino.forBlock['mimo_ok'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  mimoEnsureLibrary(generator);
  return [name + '.ok()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_last_reasoning'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  mimoEnsureLibrary(generator);
  return [name + '.lastReasoning()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_last_error'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  mimoEnsureLibrary(generator);
  return [name + '.lastError()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_http_status'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  mimoEnsureLibrary(generator);
  return [name + '.httpStatus()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_token_usage'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  const metric = block.getFieldValue('METRIC') || 'TOTAL';
  const method = metric === 'PROMPT' ? 'promptTokens' :
    (metric === 'COMPLETION' ? 'completionTokens' : 'totalTokens');
  mimoEnsureLibrary(generator);
  return [name + '.' + method + '()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_raw_response'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'mimo');
  mimoEnsureLibrary(generator);
  return [name + '.lastResponse()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_camera_ready'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'camera');
  mimoEnsureLibrary(generator);
  return [name + '.ready()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_camera_error'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'camera');
  mimoEnsureLibrary(generator);
  return [name + '.lastError()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_mic_ready'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'microphone');
  mimoEnsureLibrary(generator);
  return [name + '.ready()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_mic_error'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'microphone');
  mimoEnsureLibrary(generator);
  return [name + '.lastError()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_speaker_ready'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'speaker');
  mimoEnsureLibrary(generator);
  return [name + '.ready()', generator.ORDER_ATOMIC];
};
Arduino.forBlock['mimo_speaker_error'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'speaker');
  mimoEnsureLibrary(generator);
  return [name + '.lastError()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_es8311_ready'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'es8311');
  mimoEnsureLibrary(generator);
  return [name + '.ready()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_es8311_error'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'es8311');
  mimoEnsureLibrary(generator);
  return [name + '.lastError()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['mimo_es8311_sound_level'] = function(block, generator) {
  const name = mimoVariable(block, 'VAR', 'es8311');
  mimoEnsureLibrary(generator);
  return [name + '.soundLevel()', generator.ORDER_ATOMIC];
};
