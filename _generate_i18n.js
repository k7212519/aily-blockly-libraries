/**
 * Script to generate i18n files for libraries that don't have them.
 * 
 * For each library without an i18n folder:
 * 1. Reads block.json to extract block types, messages, tooltips, and dropdown args
 * 2. Reads toolbox.json to extract the toolbox name
 * 3. Scans generator.js for extension registrations
 * 4. Generates zh_cn.json from the Chinese block.json content
 * 5. Generates the other 10 language files with the same structure (as placeholders)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const LANGUAGES = ['zh_cn', 'en', 'zh_hk', 'ja', 'ko', 'de', 'fr', 'es', 'pt', 'ru', 'ar'];

// Fields that do NOT need translation in args0 (they get null in i18n)
const NO_TRANSLATE_TYPES = [
  'input_value', 'input_statement', 'input_dummy',
  'field_input', 'field_number', 'field_variable',
  'field_colour', 'field_angle', 'field_image',
  'field_checkbox', 'field_date', 'field_label'
];

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(f => {
    if (f.startsWith('.') || f === 'node_modules' || f === 'scripts_git_action') return false;
    return fs.statSync(path.join(srcPath, f)).isDirectory();
  });
}

function readJsonSafe(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    // Handle trailing commas (common in hand-edited JSON)
    content = content.replace(/,\s*([}\]])/g, '$1');
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}

function processArgs0(args0) {
  if (!args0 || !Array.isArray(args0)) return undefined;
  
  const result = [];
  let hasTranslatable = false;
  
  for (const arg of args0) {
    if (!arg || typeof arg !== 'object') {
      result.push(null);
      continue;
    }
    
    // field_dropdown with options need translation
    if (arg.type === 'field_dropdown' && arg.options) {
      if (typeof arg.options === 'string') {
        // Template like "${board.digitalPins}" - keep as-is
        result.push({ options: arg.options });
        hasTranslatable = true;
      } else if (Array.isArray(arg.options)) {
        result.push({ options: arg.options });
        hasTranslatable = true;
      } else {
        result.push(null);
      }
    } else {
      result.push(null);
    }
  }
  
  return hasTranslatable ? result : undefined;
}

function extractBlockI18n(block) {
  const entry = {};
  
  if (block.message0) {
    entry.message0 = block.message0;
  }
  
  if (block.tooltip) {
    entry.tooltip = block.tooltip;
  }
  
  const args0 = processArgs0(block.args0);
  if (args0) {
    entry.args0 = args0;
  }
  
  return entry;
}

function getToolboxName(toolboxJson) {
  if (!toolboxJson) return null;
  
  // toolbox.json can be an object with "name" at root level
  if (toolboxJson.name) return toolboxJson.name;
  
  // Or it could be an array - check for category kind
  if (Array.isArray(toolboxJson)) {
    for (const item of toolboxJson) {
      if (item.kind === 'category' && item.name) return item.name;
    }
  }
  
  return null;
}

function findExtensionsInBlocks(blocks) {
  const extensions = new Set();
  if (!Array.isArray(blocks)) return extensions;
  
  for (const block of blocks) {
    if (block.extensions && Array.isArray(block.extensions)) {
      block.extensions.forEach(ext => extensions.add(ext));
    }
  }
  return extensions;
}

function scanGeneratorForExtensionKeys(generatorPath, extensions) {
  // We can't reliably parse JS to extract extension translation keys,
  // so we'll just note the extensions exist but won't add them to i18n
  // unless we can parse them
  return {};
}

function generateI18nForLibrary(libDir) {
  const blockJsonPath = path.join(libDir, 'block.json');
  const toolboxJsonPath = path.join(libDir, 'toolbox.json');
  
  const blocks = readJsonSafe(blockJsonPath);
  const toolbox = readJsonSafe(toolboxJsonPath);
  
  if (!blocks && !toolbox) {
    // No block.json and no toolbox.json - skip
    return null;
  }
  
  const i18nData = {};
  
  // 1. Extract toolbox_name
  const toolboxName = getToolboxName(toolbox);
  if (toolboxName) {
    i18nData.toolbox_name = toolboxName;
  }
  
  // 2. Extract block translations
  if (blocks && Array.isArray(blocks)) {
    for (const block of blocks) {
      if (block.type) {
        const blockI18n = extractBlockI18n(block);
        if (Object.keys(blockI18n).length > 0) {
          i18nData[block.type] = blockI18n;
        }
      }
    }
  }
  
  return i18nData;
}

function main() {
  const dirs = getDirectories(ROOT);
  let created = 0;
  let skipped = 0;
  let noData = 0;
  
  for (const dir of dirs) {
    const libDir = path.join(ROOT, dir);
    const i18nDir = path.join(libDir, 'i18n');
    
    // Skip if i18n already exists
    if (fs.existsSync(i18nDir)) {
      skipped++;
      continue;
    }
    
    // Skip if no block.json exists
    const blockJsonPath = path.join(libDir, 'block.json');
    if (!fs.existsSync(blockJsonPath)) {
      console.log(`[SKIP] ${dir}: no block.json`);
      noData++;
      continue;
    }
    
    const i18nData = generateI18nForLibrary(libDir);
    
    if (!i18nData || Object.keys(i18nData).length === 0) {
      console.log(`[SKIP] ${dir}: no translatable content`);
      noData++;
      continue;
    }
    
    // Create i18n directory
    fs.mkdirSync(i18nDir, { recursive: true });
    
    // Write all 11 language files with the same content
    // (zh_cn is the primary content, others are placeholders with same Chinese text)
    for (const lang of LANGUAGES) {
      const langFile = path.join(i18nDir, `${lang}.json`);
      fs.writeFileSync(langFile, JSON.stringify(i18nData, null, 2) + '\n', 'utf8');
    }
    
    const blockCount = Object.keys(i18nData).filter(k => k !== 'toolbox_name' && k !== 'extensions').length;
    console.log(`[CREATED] ${dir}: ${blockCount} blocks, toolbox_name: ${i18nData.toolbox_name || 'N/A'}`);
    created++;
  }
  
  console.log(`\n--- Summary ---`);
  console.log(`Created i18n: ${created}`);
  console.log(`Already had i18n: ${skipped}`);
  console.log(`No data/skipped: ${noData}`);
  console.log(`Total dirs: ${dirs.length}`);
}

main();
