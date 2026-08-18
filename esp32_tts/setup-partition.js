const fs = require('fs');
const path = require('path');

const packageName = '@aily-project/lib-esp32-tts';

function findProjectRoot() {
  const initCwd = process.env.INIT_CWD;
  if (initCwd && fs.existsSync(path.join(initCwd, 'package.json'))) {
    return initCwd;
  }

  let dir = process.cwd();
  while (dir && dir !== path.dirname(dir)) {
    const packagePath = path.join(dir, 'package.json');
    if (fs.existsSync(packagePath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        if (pkg.name !== packageName) return dir;
      } catch (error) {
        return dir;
      }
    }
    dir = path.dirname(dir);
  }
  return null;
}

function installPartitionTable(projectRoot) {
  const source = path.join(__dirname, 'partitions.csv');
  const target = path.join(projectRoot, 'partitions.csv');
  if (!fs.existsSync(source)) return;

  if (fs.existsSync(target)) {
    const current = fs.readFileSync(target, 'utf8');
    const required = fs.readFileSync(source, 'utf8');
    if (current !== required) {
      console.warn('[esp32-tts] partitions.csv already exists; keeping the project file. Ensure its app partition is at least 4.1 MiB.');
    }
    return;
  }

  fs.copyFileSync(source, target);
  console.log('[esp32-tts] installed the bundled 8 MB partition table.');
}

function configureProject(projectRoot) {
  const packagePath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(packagePath)) return;

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (pkg.name === packageName) return;

  const projectConfig = pkg.projectConfig || {};
  const desired = {
    FlashSize: '8M',
    PartitionScheme: 'custom'
  };
  let changed = false;

  for (const [key, value] of Object.entries(desired)) {
    if (projectConfig[key] !== value) {
      projectConfig[key] = value;
      changed = true;
    }
  }

  if (!changed && pkg.projectConfig) return;
  pkg.projectConfig = projectConfig;
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('[esp32-tts] configured ESP32-S3 8 MB flash with the custom partition table.');
}

try {
  const projectRoot = findProjectRoot();
  if (projectRoot) {
    installPartitionTable(projectRoot);
    configureProject(projectRoot);
  }
} catch (error) {
  console.warn('[esp32-tts] setup skipped:', error.message);
}
