// ==================== 自定义函数库 - 代码生成器 ====================
// 块定义在 block.json，扩展和代码生成器全部在此文件
//
// 架构说明：
//   ① 工具函数（i18n / 名称处理 / UI 按钮）
//   ② Registry（注册/注销函数，下拉选项）
//   ③ 工具箱同步（dirty flag + debounce）
//   ④ 函数定义块 Mutator（管理参数增删）
//   ⑤ 函数调用块 Mutator（同步参数数量与标签）
//   ⑥ 扩展注册 + 动态块定义
//   ⑦ 唯一的事件监听器（BLOCK_DELETE / BLOCK_CREATE / FINISHED_LOADING）
//   ⑧ 代码生成器（含 monitorKey 变量注册，参考 lib-dht 模式）

// 防止重复加载
if (typeof window !== 'undefined' && window.__customFunctionLibLoaded__ &&
    typeof Blockly !== 'undefined' && Blockly.Extensions.isRegistered('function_params_mutator')) {
  // 已加载过，跳过
} else {

if (typeof window !== 'undefined') {
  window.__customFunctionLibLoaded__ = true;
  // 每次加载清空 registry，由 FINISHED_LOADING 重新注册
  window.customFunctionRegistry = {};
}

// ==================== ① 工具函数 ====================

function _getFuncI18n() {
  return (typeof window !== 'undefined' && window.__BLOCKLY_LIB_I18N__)
    ? window.__BLOCKLY_LIB_I18N__['@aily-project/lib-core-functions'] || {}
    : {};
}
function _getFuncExtI18n(extName) {
  var ext = _getFuncI18n().extensions;
  return (ext && ext[extName]) || {};
}
function _getBlocklyMsgI18n() { return _getFuncExtI18n('blockly_msg'); }
function _getCallI18n() { return _getFuncExtI18n('custom_function_call'); }
function _getCallRetI18n() { return _getFuncExtI18n('custom_function_call_return'); }
function _getParamsMutI18n() { return _getFuncExtI18n('function_params_mutator'); }

function _applyBlocklyMsgI18n() {
  var m = _getBlocklyMsgI18n();
  Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE = "function_name";
  Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE = "function_name";
  Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = m.PROCEDURES_DEFNORETURN_TITLE || "定义函数";
  Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = m.PROCEDURES_DEFRETURN_TITLE || "定义带返回函数";
  Blockly.Msg.PROCEDURES_DEFNORETURN_DO = m.PROCEDURES_DEFNORETURN_DO || "执行";
  Blockly.Msg.PROCEDURES_DEFRETURN_RETURN = m.PROCEDURES_DEFRETURN_RETURN || "返回";
  Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL = "";
  Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL = "";
  Blockly.Msg.PROCEDURES_IFRETURN_CONDITION = m.PROCEDURES_IFRETURN_CONDITION || "如果";
  Blockly.Msg.PROCEDURES_IFRETURN_VALUE = m.PROCEDURES_IFRETURN_VALUE || "返回值";
}
_applyBlocklyMsgI18n();

// 参数类型选项
var _PARAM_TYPE_OPTIONS_FALLBACK = [
  ['int8_t (8位整型)', 'int8_t'],
  ['int16_t (16位整型)', 'int16_t'],
  ['int32_t (32位整型)', 'int32_t'],
  ['int64_t (64位整型)', 'int64_t'],
  ['uint8_t (8位无符号整型)', 'uint8_t'],
  ['uint16_t (16位无符号整型)', 'uint16_t'],
  ['uint32_t (32位无符号整型)', 'uint32_t'],
  ['uint64_t (64位无符号整型)', 'uint64_t'],
  ['---', '---'],
  ['int (整型)', 'int'],
  ['long (长整型)', 'long'],
  ['float (浮点型)', 'float'],
  ['double (双精度浮点型)', 'double'],
  ['unsigned int (无符号整型)', 'unsigned int'],
  ['unsigned long (无符号长整型)', 'unsigned long'],
  ['---', '---'],
  ['bool (布尔型)', 'bool'],
  ['char (字符型)', 'char'],
  ['byte (字节型)', 'byte'],
  ['String (字符串型)', 'String'],
  ['void* (指针)', 'void*'],
  ['size_t (大小类型)', 'size_t'],
  ['unsigned char (无符号字符型)', 'unsigned char'],
  ['---', '---'],
  ['int* (整型指针)', 'int*'],
  ['float* (浮点指针)', 'float*'],
  ['char* (字符指针)', 'char*'],
  ['byte* (字节指针)', 'byte*'],
  ['uint8_t* (无符号8位指针)', 'uint8_t*'],
  ['const char* (常量字符指针)', 'const char*'],
  ['---', '---'],
  ['int& (整型引用)', 'int&'],
  ['float& (浮点引用)', 'float&'],
  ['String& (字符串引用)', 'String&']
];
function getParamTypeOptions() {
  var i18nOpts = _getParamsMutI18n().param_type_options;
  return i18nOpts || _PARAM_TYPE_OPTIONS_FALLBACK;
}

// +/- 按钮
var plusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
  '9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMT' +
  'ggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNz' +
  'FjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MW' +
  'MwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS' +
  '44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';
var minusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw' +
  'MC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPS' +
  'JNMTggMTFoLTEyYy0xLjEwNCAwLTIgLjg5Ni0yIDJzLjg5NiAyIDIgMmgxMmMxLjEwNCAw' +
  'IDItLjg5NiAyLTJzLS44OTYtMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K';

function createPlusField() {
  return new Blockly.FieldImage(plusImage, 15, 15, '+', function() {
    var block = this.getSourceBlock();
    if (block && typeof block.plus === 'function') block.plus();
  });
}

function createMinusField(index) {
  return new Blockly.FieldImage(minusImage, 15, 15, '-', function() {
    var block = this.getSourceBlock();
    if (block && typeof block.minus === 'function') block.minus(index);
  });
}

function convertToPinyin(text) {
  try {
    if (typeof window !== 'undefined' && window['pinyinPro']) {
      var pinyinFn = window['pinyinPro'].pinyin;
      return pinyinFn(text, { toneType: 'none' }).replace(/\s+/g, '_');
    }
  } catch (e) {}
  return text;
}

function sanitizeName(name) {
  return name;
}

// ==================== ② Registry ====================

function registerFunction(funcName, params, returnType) {
  if (typeof window === 'undefined' || !funcName) return;
  // 深拷贝参数列表
  window.customFunctionRegistry[funcName] = {
    name: funcName,
    params: (params || []).map(function(p) { return { type: p.type, name: p.name }; }),
    returnType: returnType || 'void'
  };
  // 同步更新已有调用块的标签
  syncCallBlocksParams(funcName);
}

function unregisterFunction(funcName) {
  if (typeof window === 'undefined' || !funcName) return;
  delete window.customFunctionRegistry[funcName];
}

// 从调用块获取函数名（FieldVariable 的 getValue 返回变量 ID，需要从变量模型获取名称）
function getCallBlockFuncName(block) {
  var field = block.getField('FUNC_NAME');
  if (field && typeof field.getVariable === 'function') {
    var v = field.getVariable();
    return v ? v.name : '';
  }
  return block.getFieldValue('FUNC_NAME') || '';
}

function syncCallBlocksParams(funcName) {
  var workspace = Blockly.getMainWorkspace();
  if (!workspace) return;
  var funcDef = window.customFunctionRegistry ? window.customFunctionRegistry[funcName] : null;
  var newCount = (funcDef && funcDef.params) ? funcDef.params.length : 0;
  var blocks = workspace.getBlocksByType('custom_function_call', false)
    .concat(workspace.getBlocksByType('custom_function_call_return', false));
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    var selected = getCallBlockFuncName(block);
    if (selected === funcName && block.updateShape_) {
      block.updateShape_(newCount);
    }
  }
}

function generateUniqueFunctionName(workspace, baseName, excludeBlockId) {
  if (!workspace) return baseName;
  var existing = new Set();
  var defs = workspace.getBlocksByType('custom_function_def', false);
  for (var i = 0; i < defs.length; i++) {
    if (defs[i].id !== excludeBlockId) {
      var n = defs[i].getFieldValue('FUNC_NAME');
      if (n) existing.add(n);
    }
  }
  if (!existing.has(baseName)) return baseName;
  var counter = 1;
  while (existing.has(baseName + counter)) counter++;
  return baseName + counter;
}

// ==================== ③ 工具箱同步 ====================

var _functionToolboxDirty = false;
var _syncToolboxInProgress = false;
var _lastSyncedToolboxKey = null;
var _syncToolboxTimer = null;

function scheduleSyncFunctionCallsToToolbox() {
  _functionToolboxDirty = true;
  _lastSyncedToolboxKey = null;
  if (_syncToolboxTimer) clearTimeout(_syncToolboxTimer);
  _syncToolboxTimer = setTimeout(function() {
    syncFunctionCallsToToolbox();
    _syncToolboxTimer = null;
  }, 50);
}

function syncFunctionCallsToToolbox() {
  if (_syncToolboxInProgress) return;
  var workspace = Blockly.getMainWorkspace();
  if (!workspace) return;
  var toolboxDef = workspace.options.languageTree;
  if (!toolboxDef) return;

  // 找到"自定义函数"分类
  var funcCategory = null;
  for (var ci = 0; ci < toolboxDef.contents.length; ci++) {
    var cat = toolboxDef.contents[ci];
    if (cat.name === '自定义函数' ||
        (cat.contents && cat.contents.some(function(it) { return it.type === 'custom_function_def'; }))) {
      funcCategory = cat;
      break;
    }
  }
  if (!funcCategory || !funcCategory.contents) return;

  var registry = window.customFunctionRegistry || {};

  // 安全网：清理 registry 中不存在对应定义块的残留条目
  var defBlocks = workspace.getBlocksByType('custom_function_def', false);
  var definedNames = {};
  for (var di2 = 0; di2 < defBlocks.length; di2++) {
    var dn = defBlocks[di2].getFieldValue('FUNC_NAME');
    if (dn) definedNames[dn] = true;
  }
  var regKeys = Object.keys(registry);
  for (var ri = 0; ri < regKeys.length; ri++) {
    if (!definedNames[regKeys[ri]]) {
      delete registry[regKeys[ri]];
    }
  }
  var funcNames = Object.keys(registry);

  // 构建期望状态用于对比
  var expected = [];
  for (var fi = 0; fi < funcNames.length; fi++) {
    var fn = funcNames[fi];
    var fd = registry[fn];
    var pc = fd.params ? fd.params.length : 0;
    var pInfo = fd.params ? fd.params.map(function(p) { return p.name + ':' + p.type; }) : [];
    expected.push({ t: 'custom_function_call', f: fn, p: pc, i: pInfo });
    if (fd.returnType && fd.returnType !== 'void') {
      expected.push({ t: 'custom_function_call_return', f: fn, p: pc, i: pInfo });
    }
  }
  var newKey = JSON.stringify(expected);
  if (newKey === _lastSyncedToolboxKey) { _functionToolboxDirty = false; return; }
  _lastSyncedToolboxKey = newKey;

  // 移除旧的动态调用块
  funcCategory.contents = funcCategory.contents.filter(function(item) {
    return item.type !== 'custom_function_call' && item.type !== 'custom_function_call_return';
  });

  if (funcNames.length > 0) {
    // 插入位置：在"函数调用"标签之后，或在"返回"标签之前
    var insertIndex = funcCategory.contents.findIndex(function(item) {
      return item.kind === 'label' && item.text && item.text.indexOf('函数调用') !== -1;
    });
    if (insertIndex === -1) {
      insertIndex = funcCategory.contents.findIndex(function(item) {
        return item.kind === 'label' && item.text && item.text.indexOf('返回') !== -1;
      });
      if (insertIndex === -1) insertIndex = funcCategory.contents.length;
    } else {
      insertIndex++;
    }

    var callBlocks = [];
    for (var fi2 = 0; fi2 < funcNames.length; fi2++) {
      var fname = funcNames[fi2];
      var fdef = registry[fname];
      var paramCount = fdef.params ? fdef.params.length : 0;
      var paramsCopy = fdef.params
        ? fdef.params.map(function(p) { return { type: p.type, name: p.name }; })
        : [];

      // FieldVariable 需要通过变量 ID 引用（与变量库 addVariableToToolbox 模式一致）
      var funcVar = workspace.getVariable(fname, 'FUNC');
      if (!funcVar) {
        // 确保 FUNC 变量存在
        registerVariableToBlockly(fname, 'FUNC');
        funcVar = workspace.getVariable(fname, 'FUNC');
      }
      var funcNameRef = funcVar
        ? { id: funcVar.getId(), name: fname, type: 'FUNC' }
        : { name: fname, type: 'FUNC' };
      callBlocks.push({
        kind: 'block', type: 'custom_function_call',
        fields: { FUNC_NAME: funcNameRef },
        extraState: { extraCount: paramCount, params: paramsCopy }
      });
      if (fdef.returnType && fdef.returnType !== 'void') {
        callBlocks.push({
          kind: 'block', type: 'custom_function_call_return',
          fields: { FUNC_NAME: funcNameRef },
          extraState: { extraCount: paramCount, params: paramsCopy }
        });
      }
    }
    funcCategory.contents.splice.apply(funcCategory.contents, [insertIndex, 0].concat(callBlocks));
  }

  _functionToolboxDirty = false;
  _syncToolboxInProgress = true;
  try {
    workspace.updateToolbox(toolboxDef);
  } catch (e) {
    console.warn('[syncFunctionCallsToToolbox] updateToolbox error:', e);
  } finally {
    _syncToolboxInProgress = false;
  }
}

// ==================== ④ 函数定义块 Mutator ====================

var functionParamsMutator = {
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('paramcount', (this.params_ || []).length);
    container.setAttribute('returntype', this.getFieldValue('RETURN_TYPE') || 'void');
    return container;
  },

  domToMutation: function(xmlElement) {
    var count = parseInt(xmlElement.getAttribute('paramcount'), 10) || 0;
    this.params_ = [];
    for (var i = 0; i < count; i++) {
      this.params_.push({ type: 'int', name: 'param' + i });
    }
    this.paramCount_ = count;
    this.updateShape_();
    var rt = xmlElement.getAttribute('returntype') || 'void';
    this.updateReturnInput_(rt);
  },

  saveExtraState: function() {
    return {
      paramCount: (this.params_ || []).length,
      returnType: this.getFieldValue('RETURN_TYPE') || 'void',
      params: (this.params_ || []).map(function(p) { return { type: p.type, name: p.name }; })
    };
  },

  loadExtraState: function(state) {
    if (state.params && state.params.length > 0) {
      this.params_ = state.params.map(function(p, i) {
        return { type: p.type || 'int', name: p.name || 'param' + i };
      });
    } else {
      var count = state.paramCount || 0;
      this.params_ = [];
      for (var i = 0; i < count; i++) {
        this.params_.push({ type: 'int', name: 'param' + i });
      }
    }
    this.paramCount_ = this.params_.length;
    this.updateShape_();
    if (state.returnType) this.updateReturnInput_(state.returnType);

    // 加载阶段创建变量（但不刷新工具箱，FINISHED_LOADING 负责）
    if (this.workspace && !this.workspace.isFlyout) {
      for (var pi = 0; pi < this.params_.length; pi++) {
        var pn = this.params_[pi].name;
        if (pn && !this.workspace.getVariable(pn)) {
          this.workspace.createVariable(pn, '');
        }
      }
    }
  },

  updateReturnInput_: function(returnType) {
    var hasReturn = this.getInput('RETURN');
    if (returnType === 'void') {
      if (hasReturn) this.removeInput('RETURN');
    } else {
      if (!hasReturn) {
        this.appendValueInput('RETURN')
          .appendField(_getParamsMutI18n().return_label || '返回');
      }
    }
  },

  // 每次全量重建参数输入（简单可靠，无增量同步陷阱）
  updateShape_: function() {
    var i = 0;
    while (this.getInput('PARAM' + i)) { this.removeInput('PARAM' + i); i++; }
    for (var j = 0; j < this.params_.length; j++) {
      this.addParamInput_(j, this.params_[j]);
    }
  },

  addParamInput_: function(index, param) {
    var block = this;
    var input = this.appendDummyInput('PARAM' + index);
    var typeDropdown = new Blockly.FieldDropdown(getParamTypeOptions, function(newValue) {
      block.params_[index].type = newValue;
      block.updateFunctionRegistry_();
    });
    typeDropdown.setValue(param.type || 'int');
    var nameField = new Blockly.FieldTextInput(param.name || 'param' + index);
    input.appendField('  ')
      .appendField(typeDropdown, 'PARAM_TYPE' + index)
      .appendField(nameField, 'PARAM_NAME' + index)
      .appendField(createMinusField(index), 'MINUS' + index);
    // 保持 PARAM 在 STACK 之前
    var stackIndex = this.inputList.findIndex(function(inp) { return inp.name === 'STACK'; });
    if (stackIndex > 0) {
      var paramInput = this.inputList.pop();
      this.inputList.splice(stackIndex, 0, paramInput);
    }
  },

  plus: function() {
    var newParam = { type: 'int', name: 'param' + this.paramCount_ };
    this.params_.push(newParam);
    this.addParamInput_(this.params_.length - 1, newParam);
    this.paramCount_++;
    // 使用 registerVariableToBlockly（与 lib-dht 一致）
    if (this.workspace && newParam.name) {
      registerVariableToBlockly(newParam.name, undefined);
      // 延迟添加到变量工具箱，避免与函数工具箱同步冲突
      var self = this;
      var pName = newParam.name;
      setTimeout(function() {
        if (typeof addVariableToToolbox === 'function') {
          addVariableToToolbox(self, pName);
        }
      }, 100);
    }
    this.updateFunctionRegistry_();
    scheduleSyncFunctionCallsToToolbox();
  },

  minus: function(index) {
    if (this.params_.length <= 0) return;
    var deleted = this.params_[index];
    this.params_.splice(index, 1);
    this.paramCount_ = this.params_.length;
    this.updateShape_();
    this.updateFunctionRegistry_();
    scheduleSyncFunctionCallsToToolbox();
  },

  // 从字段读取最新值并注册到 registry
  updateFunctionRegistry_: function() {
    if (!this.workspace || this.workspace.isFlyout) return;
    var funcName = this.getFieldValue('FUNC_NAME') || 'myFunction';
    var returnType = this.getFieldValue('RETURN_TYPE') || 'void';
    // 同步参数字段值到 params_ 数组
    var params = this.params_ || [];
    for (var i = 0; i < params.length; i++) {
      var nf = this.getField('PARAM_NAME' + i);
      if (nf) { var v = nf.getValue(); if (v) params[i].name = v; }
      var tf = this.getField('PARAM_TYPE' + i);
      if (tf) { var t = tf.getValue(); if (t) params[i].type = t; }
    }
    registerFunction(funcName, params, returnType);
  }
};

var functionParamsHelper = function() {
  this.params_ = [];
  this.paramCount_ = 0;
  var block = this;

  // 挂载 + 按钮
  var paramsInput = this.getInput('PARAMS_TITLE');
  if (paramsInput) {
    paramsInput.insertFieldAt(0, createPlusField(), 'PLUS');
  }

  // 返回类型变化时更新 registry + 工具箱
  var returnTypeField = this.getField('RETURN_TYPE');
  if (returnTypeField) {
    var origValidator = returnTypeField.getValidator();
    returnTypeField.setValidator(function(newValue) {
      if (typeof origValidator === 'function') origValidator.call(this, newValue);
      setTimeout(function() {
        block.updateReturnInput_(block.getFieldValue('RETURN_TYPE') || 'void');
        block.updateFunctionRegistry_();
        scheduleSyncFunctionCallsToToolbox();
      }, 0);
      return newValue;
    });
  }
};

// ==================== ⑤ 函数调用块 Mutator ====================

var functionCallSyncMutator = {
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('inputs', this.extraCount_ || 0);
    return container;
  },

  domToMutation: function(xmlElement) {
    var count = parseInt(xmlElement.getAttribute('inputs'), 10) || 0;
    this.updateShape_(count);
  },

  saveExtraState: function() {
    var funcName = getCallBlockFuncName(this);
    var funcDef = window.customFunctionRegistry ? window.customFunctionRegistry[funcName] : null;
    var result = { extraCount: this.extraCount_ || 0 };
    if (funcDef && funcDef.params && funcDef.params.length > 0) {
      result.params = funcDef.params.map(function(p) { return { type: p.type, name: p.name }; });
    }
    return result;
  },

  loadExtraState: function(state) {
    if (state.params && state.params.length > 0) {
      this._savedParams = state.params;
    }
    this.updateShape_(state.extraCount || 0);
  },

  updateShape_: function(targetCount) {
    if (typeof targetCount === 'number') this.extraCount_ = targetCount;
    if (this.getInput('PARAMS_PLACEHOLDER')) this.removeInput('PARAMS_PLACEHOLDER');

    // 统计当前已有的 INPUT 数量
    var currentCount = 0;
    while (this.getInput('INPUT' + currentCount)) currentCount++;

    if (currentCount === this.extraCount_) {
      // 数量一致：只更新标签，保留连接
      for (var u = 0; u < currentCount; u++) {
        var inp = this.getInput('INPUT' + u);
        if (inp && inp.fieldRow.length > 0) {
          inp.fieldRow[0].setValue(this.getInputLabel_(u));
        }
      }
    } else {
      // 数量变化：需要保存连接、重建、恢复连接
      var savedConnections = [];
      for (var s = 0; s < currentCount; s++) {
        var sinp = this.getInput('INPUT' + s);
        savedConnections.push(sinp && sinp.connection ? sinp.connection.targetBlock() : null);
      }
      var i = 0;
      while (this.getInput('INPUT' + i)) { this.removeInput('INPUT' + i); i++; }
      for (var j = 0; j < this.extraCount_; j++) {
        this.appendValueInput('INPUT' + j)
          .appendField(this.getInputLabel_(j));
        // 恢复连接
        if (savedConnections[j]) {
          var ninp = this.getInput('INPUT' + j);
          if (ninp && ninp.connection && savedConnections[j].outputConnection) {
            ninp.connection.connect(savedConnections[j].outputConnection);
          }
        }
      }
    }
    if (this.extraCount_ === 0) {
      var funcName = getCallBlockFuncName(this);
      if (!funcName) {
        this.appendDummyInput('PARAMS_PLACEHOLDER')
          .appendField(_getCallI18n().select_function || '(请先选择函数)');
      } else {
        this.appendDummyInput('PARAMS_PLACEHOLDER')
          .appendField(_getCallI18n().no_params || '(无参数)');
      }
    }
  },

  getInputLabel_: function(index) {
    var funcName = getCallBlockFuncName(this);
    var funcDef = window.customFunctionRegistry ? window.customFunctionRegistry[funcName] : null;
    if (funcDef && funcDef.params && funcDef.params[index]) {
      var p = funcDef.params[index];
      return p.name + ' (' + p.type + ')';
    }
    if (this._savedParams && this._savedParams[index]) {
      var sp = this._savedParams[index];
      return sp.name + ' (' + sp.type + ')';
    }
    return (_getCallI18n().param_label || '参数') + (index + 1);
  },

  updateFromRegistry_: function() {
    var funcName = getCallBlockFuncName(this);
    var funcDef = window.customFunctionRegistry
      ? window.customFunctionRegistry[funcName] : null;
    if (funcDef && funcDef.params) {
      this._savedParams = funcDef.params.map(function(p) { return { type: p.type, name: p.name }; });
      this.extraCount_ = funcDef.params.length;
    } else {
      this.extraCount_ = 0;
    }
    this.updateShape_();
  }
};

var functionCallSyncHelper = function() {
  var block = this;
  if (this.extraCount_ === undefined) this.extraCount_ = 0;
  this.hasInitialized_ = false;

  var funcField = this.getField('FUNC_NAME');
  if (!funcField) return;

  // FieldVariable 变量选择变化时同步参数
  funcField.setValidator(function(newValue) {
    if (block.workspace && block.workspace.isFlyout) return newValue;
    if (!block.hasInitialized_) {
      block.hasInitialized_ = true;
      setTimeout(function() { if (block.updateShape_) block.updateShape_(); }, 0);
      return newValue;
    }
    setTimeout(function() { if (block.updateFromRegistry_) block.updateFromRegistry_(); }, 0);
    return newValue;
  });
};

// ==================== ⑥ 扩展注册 + 动态块定义 ====================

if (Blockly.Extensions.isRegistered('function_params_mutator')) {
  Blockly.Extensions.unregister('function_params_mutator');
}
Blockly.Extensions.registerMutator(
  'function_params_mutator',
  functionParamsMutator,
  functionParamsHelper
);

// 动态定义调用块（FieldVariable 引用 FUNC 类型变量，与 lib-dht 的 field_variable 模式一致）
Blockly.Blocks['custom_function_call'] = {
  init: function() {
    var ci = _getCallI18n();
    this.appendDummyInput()
      .appendField(ci.call_label || '调用函数')
      .appendField(new Blockly.FieldVariable(null, null, ['FUNC'], 'FUNC'), 'FUNC_NAME');
    this.appendDummyInput('PARAMS_PLACEHOLDER');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip(function() {
      return _getCallI18n().tooltip || '调用一个自定义函数，参数会根据函数定义自动同步';
    });
    Object.assign(this, functionCallSyncMutator);
    functionCallSyncHelper.call(this);
  }
};

Blockly.Blocks['custom_function_call_return'] = {
  init: function() {
    var cri = _getCallRetI18n();
    var ci = _getCallI18n();
    this.appendDummyInput()
      .appendField(cri.call_label || ci.call_label || '调用函数')
      .appendField(new Blockly.FieldVariable(null, null, ['FUNC'], 'FUNC'), 'FUNC_NAME');
    this.appendDummyInput('PARAMS_PLACEHOLDER');
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip(function() {
      return _getCallRetI18n().tooltip || '调用一个有返回值的自定义函数';
    });
    Object.assign(this, functionCallSyncMutator);
    functionCallSyncHelper.call(this);
  }
};

// 注册图标
if (typeof window !== 'undefined') {
  window.__ailyBlockDefinitionsMap = window.__ailyBlockDefinitionsMap || new Map();
  window.__ailyBlockDefinitionsMap.set('custom_function_call', 'fa-light fa-function');
  window.__ailyBlockDefinitionsMap.set('custom_function_call_return', 'fa-light fa-function');
}

// ==================== ⑦ 唯一的事件监听器 ====================

if (typeof Blockly !== 'undefined') {
  var workspace = Blockly.getMainWorkspace && Blockly.getMainWorkspace();
  if (workspace) {
    // 工具箱分类切换时，如果 dirty 就刷新
    workspace.addChangeListener(function(event) {
      if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT && _functionToolboxDirty) {
        var tb = workspace.getToolbox();
        if (tb) {
          var sel = tb.getSelectedItem();
          if (sel && (sel.name_ === '自定义函数' ||
              (sel.toolboxItemDef_ && sel.toolboxItemDef_.contents &&
               sel.toolboxItemDef_.contents.some(function(c) { return c.type === 'custom_function_def'; })))) {
            syncFunctionCallsToToolbox();
          }
        }
      }

      // 函数定义块被删除
      if (event.type === Blockly.Events.BLOCK_DELETE) {
        if (event.oldJson && event.oldJson.type === 'custom_function_def') {
          var funcName = event.oldJson.fields && event.oldJson.fields.FUNC_NAME;
          if (funcName) {
            unregisterFunction(funcName);
            scheduleSyncFunctionCallsToToolbox();
          }
        }
      }

      // 块创建（用户操作，非加载恢复）
      if (event.type === Blockly.Events.BLOCK_CREATE && event.recordUndo) {
        setTimeout(function() {
          var block = workspace.getBlockById(event.blockId);
          if (!block) return;

          if (block.type === 'custom_function_def') {
            var curName = block.getFieldValue('FUNC_NAME') || 'myFunction';
            var unique = generateUniqueFunctionName(workspace, curName, block.id);
            if (unique !== curName) block.getField('FUNC_NAME').setValue(unique);
            block._funcLastName = block.getFieldValue('FUNC_NAME') || 'myFunction';
            if (block.updateFunctionRegistry_) {
              block.updateFunctionRegistry_();
              scheduleSyncFunctionCallsToToolbox();
            }
            // 注册函数名为 FUNC 类型变量（与 lib-dht 的 DHT 类型一致）
            registerVariableToBlockly(block._funcLastName, 'FUNC');
            var createFn = block._funcLastName;
            setTimeout(function() {
              if (typeof addVariableToToolbox === 'function') {
                addVariableToToolbox(block, createFn);
              }
            }, 100);
          }

          if (block.type === 'custom_function_call' || block.type === 'custom_function_call_return') {
            var fn = getCallBlockFuncName(block);
            if (fn && block.updateFromRegistry_) {
              block.hasInitialized_ = true;
              block.updateFromRegistry_();
            }
          }
        }, 0);
      }

      // 工作区加载完成
      if (event.type === Blockly.Events.FINISHED_LOADING) {
        setTimeout(function() {
          _applyBlocklyMsgI18n();

          // 注册所有函数定义到 registry
          var defs = workspace.getBlocksByType('custom_function_def', false);
          for (var di = 0; di < defs.length; di++) {
            var defBlock = defs[di];
            if (defBlock.updateFunctionRegistry_) defBlock.updateFunctionRegistry_();
            // 注册函数名为 FUNC 类型变量（与 lib-dht 的 DHT 类型一致）
            var fn = defBlock.getFieldValue('FUNC_NAME');
            if (fn) registerVariableToBlockly(fn, 'FUNC');
            // 注册参数变量
            var params = defBlock.params_ || [];
            for (var pi = 0; pi < params.length; pi++) {
              if (params[pi].name && !workspace.getVariable(params[pi].name)) {
                workspace.createVariable(params[pi].name, '');
              }
            }
          }

          // 刷新所有调用块（FieldVariable 通过变量 ID 自动关联，只需同步参数）
          var calls = workspace.getBlocksByType('custom_function_call', false)
            .concat(workspace.getBlocksByType('custom_function_call_return', false));
          for (var ci2 = 0; ci2 < calls.length; ci2++) {
            var callBlock = calls[ci2];
            callBlock.hasInitialized_ = true;
            if (callBlock.updateFromRegistry_) callBlock.updateFromRegistry_();
            if (callBlock.render) callBlock.render();
          }

          // 同步工具箱
          syncFunctionCallsToToolbox();

          // 延迟添加函数名+参数变量到工具箱
          requestAnimationFrame(function() {
            for (var di2 = 0; di2 < defs.length; di2++) {
              var db = defs[di2];
              // 函数名添加到变量工具箱
              var fn2 = db.getFieldValue('FUNC_NAME');
              if (fn2 && typeof addVariableToToolbox === 'function') {
                addVariableToToolbox(db, fn2);
              }
              // 参数添加到变量工具箱
              var pp = db.params_ || [];
              for (var pi2 = 0; pi2 < pp.length; pi2++) {
                if (typeof addVariableToToolbox === 'function') {
                  addVariableToToolbox(db, pp[pi2].name);
                }
              }
            }
          });
        }, 100);
      }
    });
  }
}

// ==================== ⑧ 代码生成器 ====================

// 函数定义（含 monitorKey 变量注册，参考 lib-dht 模式）
Arduino.forBlock['custom_function_def'] = function(block) {
  // ──── monitorKey：一次性初始化名称监听 ────
  var monitorKey = '_funcMonitor_' + block.id;
  if (!block[monitorKey]) {
    block[monitorKey] = true;
    block._funcLastName = block.getFieldValue('FUNC_NAME') || 'myFunction';

    // 初次注册（函数名注册为变量 + registry，与 lib-dht 一致）
    if (block.workspace && !block.workspace.isFlyout) {
      block.updateFunctionRegistry_();
      scheduleSyncFunctionCallsToToolbox();
      registerVariableToBlockly(block._funcLastName, 'FUNC');
      var initFuncName = block._funcLastName;
      var selfBlock = block;
      setTimeout(function() {
        if (typeof addVariableToToolbox === 'function') {
          addVariableToToolbox(selfBlock, initFuncName);
        }
      }, 100);
    }

    // 函数名 onFinishEditing_（与 lib-dht 的 renameVariableInBlockly 模式完全一致）
    var funcNameField = block.getField('FUNC_NAME');
    if (funcNameField) {
      var origFuncFinish = funcNameField.onFinishEditing_;
      funcNameField.onFinishEditing_ = function(newName) {
        if (typeof origFuncFinish === 'function') origFuncFinish.call(this, newName);
        if (!block.workspace || block.workspace.isFlyout) return;
        var oldName = block._funcLastName;
        var cleanName = (newName || '').trim() || 'myFunction';
        if (cleanName !== oldName) {
          // 1. 更新 registry
          unregisterFunction(oldName);
          block._funcLastName = cleanName;
          // 注意：onFinishEditing_ 在 Blockly 的 setValue() 之前触发，
          // 此时 getFieldValue('FUNC_NAME') 仍返回旧值！
          // 所以不能调用 updateFunctionRegistry_()，必须直接用 cleanName 注册。
          var curParams = block.params_ || [];
          // 同步参数字段（参数字段不在编辑中，getValue 是正确的）
          for (var pi2 = 0; pi2 < curParams.length; pi2++) {
            var pnf = block.getField('PARAM_NAME' + pi2);
            if (pnf) { var pv = pnf.getValue(); if (pv) curParams[pi2].name = pv; }
            var ptf = block.getField('PARAM_TYPE' + pi2);
            if (ptf) { var pt = ptf.getValue(); if (pt) curParams[pi2].type = pt; }
          }
          registerFunction(cleanName, curParams, block.getFieldValue('RETURN_TYPE') || 'void');
          // 2. renameVariableInBlockly 自动同步所有 FieldVariable 引用（与 lib-dht 一致）
          renameVariableInBlockly(block, oldName, cleanName, 'FUNC');
          scheduleSyncFunctionCallsToToolbox();
        }
      };
    }
  }

  // 参数名 onFinishEditing_：每次代码生成时检查（参数字段会被 updateShape_ 重建）
  var params = block.params_ || [];
  for (var pi = 0; pi < params.length; pi++) {
    (function(index) {
      var paramField = block.getField('PARAM_NAME' + index);
      if (paramField && !paramField.__funcParamMonitor__) {
        paramField.__funcParamMonitor__ = true;
        block['_paramLastName' + index] = paramField.getValue() || params[index].name || 'param' + index;

        var origParamFinish = paramField.onFinishEditing_;
        paramField.onFinishEditing_ = function(newName) {
          if (typeof origParamFinish === 'function') origParamFinish.call(this, newName);
          if (!block.workspace || block.workspace.isFlyout) return;
          var oldName = block['_paramLastName' + index];
          var cleanName = (newName || '').trim() || 'param' + index;
          if (cleanName !== oldName) {
            block.params_[index].name = cleanName;
            // 使用 renameVariableInBlockly（与 lib-dht 一致）
            renameVariableInBlockly(block, oldName, cleanName, undefined);
            block['_paramLastName' + index] = cleanName;
            // 注意：onFinishEditing_ 在 setValue() 之前触发，
            // getFieldValue('PARAM_NAME'+index) 仍返回旧值。
            // 直接用 _funcLastName + 已更新的 params_ 注册，避免 updateFunctionRegistry_ 覆盖。
            var curFuncName = block._funcLastName || block.getFieldValue('FUNC_NAME') || 'myFunction';
            registerFunction(curFuncName, block.params_ || [], block.getFieldValue('RETURN_TYPE') || 'void');
          }
        };
      }
    })(pi);
  }

  // ──── 代码生成 ────
  var originalName = block.getFieldValue('FUNC_NAME') || 'myFunction';
  var funcName = sanitizeName(originalName);
  var returnType = block.getFieldValue('RETURN_TYPE') || 'void';

  var paramStrings = params.map(function(p) { return p.type + ' ' + sanitizeName(p.name); });

  var branch = Arduino.statementToCode(block, 'STACK') || '';
  var returnStatement = '';
  if (returnType !== 'void') {
    var returnValue = Arduino.valueToCode(block, 'RETURN', Arduino.ORDER_NONE) || '';
    if (returnValue) returnStatement = Arduino.INDENT + 'return ' + returnValue + ';\n';
  }

  var comment = '';
  if (originalName !== funcName) comment = '// 函数: ' + originalName + '\n';

  var code = comment +
    returnType + ' ' + funcName + '(' + paramStrings.join(', ') + ') {\n' +
    branch + returnStatement + '}\n';

  Arduino.definitions_['%' + funcName] = code;
  if (typeof Arduino.addFunction === 'function') Arduino.addFunction(funcName, code);
  return null;
};

// 返回语句
Arduino.forBlock['custom_function_return'] = function(block) {
  var value = Arduino.valueToCode(block, 'VALUE', Arduino.ORDER_NONE) || '0';
  return 'return ' + value + ';\n';
};

Arduino.forBlock['custom_function_return_void'] = function(block) {
  return 'return;\n';
};

// 函数调用（无返回值）
Arduino.forBlock['custom_function_call'] = function(block) {
  var originalName = getCallBlockFuncName(block) || 'myFunction';
  if (!originalName) return '// 未选择函数\n';
  var funcName = sanitizeName(originalName);
  var args = [];
  var i = 0;
  while (block.getInput('INPUT' + i)) {
    args.push(Arduino.valueToCode(block, 'INPUT' + i, Arduino.ORDER_NONE) || '0');
    i++;
  }
  return funcName + '(' + args.join(', ') + ');\n';
};

// 函数调用（有返回值）
Arduino.forBlock['custom_function_call_return'] = function(block) {
  var originalName = getCallBlockFuncName(block) || 'myFunction';
  if (!originalName) return ['0 /* 未选择函数 */', Arduino.ORDER_ATOMIC];
  var funcName = sanitizeName(originalName);
  var args = [];
  var i = 0;
  while (block.getInput('INPUT' + i)) {
    args.push(Arduino.valueToCode(block, 'INPUT' + i, Arduino.ORDER_NONE) || '0');
    i++;
  }
  return [funcName + '(' + args.join(', ') + ')', Arduino.ORDER_FUNCTION_CALL];
};

// ==================== Blockly 内置过程块 (保留兼容) ====================

Arduino.forBlock['procedures_defreturn'] = function(block) {
  var originalName = block.getFieldValue('NAME');
  var processedName = originalName;
  if (/[\u4e00-\u9fa5]/.test(originalName)) processedName = convertToPinyin(originalName);
  var funcName = Arduino.getProcedureName(processedName);
  var xfix1 = '';
  if (Arduino.STATEMENT_PREFIX) xfix1 += Arduino.injectId(Arduino.STATEMENT_PREFIX, block);
  if (Arduino.STATEMENT_SUFFIX) xfix1 += Arduino.injectId(Arduino.STATEMENT_SUFFIX, block);
  if (xfix1) xfix1 = Arduino.prefixLines(xfix1, Arduino.INDENT);
  var loopTrap = '';
  if (Arduino.INFINITE_LOOP_TRAP) {
    loopTrap = Arduino.prefixLines(Arduino.injectId(Arduino.INFINITE_LOOP_TRAP, block), Arduino.INDENT);
  }
  var branch = '';
  if (block.getInput('STACK')) branch = Arduino.statementToCode(block, 'STACK');
  var returnType = 'void';
  var returnValue = '';
  if (block.getInput('RETURN')) {
    returnValue = Arduino.valueToCode(block, 'RETURN', Arduino.ORDER_NONE) || '';
    if (returnValue) {
      if (returnValue.includes('"') || returnValue.includes("'") || returnValue.includes('String(')) {
        returnType = 'String';
      } else if (returnValue === 'true' || returnValue === 'false' ||
        returnValue.includes(' == ') || returnValue.includes(' != ') ||
        returnValue.includes(' < ') || returnValue.includes(' > ')) {
        returnType = 'boolean';
      } else if (returnValue.includes('.') || /\d+\.\d+/.test(returnValue)) {
        returnType = 'float';
      } else if (/^-?\d+$/.test(returnValue) || returnValue.includes('int(')) {
        returnType = 'int';
      } else if (returnValue.includes('char(') || (returnValue.length === 3 &&
        returnValue.startsWith("'") && returnValue.endsWith("'"))) {
        returnType = 'char';
      } else {
        returnType = 'int';
      }
    }
  }
  var xfix2 = '';
  if (branch && returnValue) xfix2 = xfix1;
  if (returnValue) returnValue = Arduino.INDENT + 'return ' + returnValue + ';\n';
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    var origVar = variables[i];
    var typePattern = /^(int|float|double|long|short|byte|boolean|char|String|void|\w+\*?)\s+(\w+)$/;
    var match = origVar.match(typePattern);
    if (match) { args[i] = origVar; }
    else { args[i] = 'int ' + Arduino.getVariableName(origVar); }
  }
  var code = '// Custom Function: ' + originalName + '\n' +
    returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
    xfix1 + loopTrap + branch + xfix2 + returnValue + '}';
  code = Arduino.scrub_(block, code);
  Arduino.definitions_['%' + funcName] = code;
  Arduino.addFunction(funcName, code);
  return null;
};

Arduino.forBlock['procedures_defnoreturn'] = Arduino.forBlock['procedures_defreturn'];

Arduino.forBlock['procedures_callreturn'] = function(block) {
  var originalName = block.getFieldValue('NAME');
  var processedName = originalName;
  if (/[\u4e00-\u9fa5]/.test(originalName)) processedName = convertToPinyin(originalName);
  var funcName = Arduino.getProcedureName(processedName);
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Arduino.valueToCode(block, 'INPUT' + i, Arduino.ORDER_NONE) || 'NULL';
  }
  return [funcName + '(' + args.join(', ') + ')', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['procedures_callnoreturn'] = function(block) {
  var tuple = Arduino.forBlock['procedures_callreturn'](block, Arduino);
  return tuple[0] + ';\n';
};

Arduino.forBlock['procedures_ifreturn'] = function(block) {
  var condition = Arduino.valueToCode(block, 'CONDITION', Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (Arduino.STATEMENT_SUFFIX) {
    code += Arduino.prefixLines(Arduino.injectId(Arduino.STATEMENT_SUFFIX, block), Arduino.INDENT);
  }
  if (block.hasReturnValue_) {
    var value = Arduino.valueToCode(block, 'VALUE', Arduino.ORDER_NONE) || 'null';
    code += Arduino.INDENT + 'return ' + value + ';\n';
  } else {
    code += Arduino.INDENT + 'return;\n';
  }
  code += '}\n';
  return code;
};

} // 结束防止重复加载的 if-else 块
