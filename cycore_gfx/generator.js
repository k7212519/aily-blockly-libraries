'use strict';

function cycoreGfxValue(block, generator, name, fallback) {
  return generator.valueToCode(block, name, generator.ORDER_ATOMIC) || fallback;
}

function cycoreGfxSafeId(block, suffix) {
  const raw = block && block.id ? String(block.id) : String(suffix || 'image');
  return raw.replace(/[^A-Za-z0-9_]/g, '_');
}

function cycoreGfxSetWarning(block, message) {
  if (block && typeof block.setWarningText === 'function') {
    block.setWarningText(message || null);
  }
}

function cycoreGfxEnsureCore(generator) {
  generator.addLibrary('cycore_gfx_spi', '#include <SPI.h>');
  generator.addLibrary('cycore_gfx_adafruit_gfx', '#include <Adafruit_GFX.h>');
  generator.addLibrary('cycore_gfx_st7789', '#include <Adafruit_ST7789.h>');
  generator.addLibrary('cycore_gfx_heap_caps', '#include <esp_heap_caps.h>');
  generator.addLibrary('cycore_gfx_pgmspace', '#include <pgmspace.h>');
  generator.addLibrary('cycore_gfx_new', '#include <new>');
  generator.addLibrary('cycore_gfx_string', '#include <string.h>');

  generator.addObject('cycore_gfx_core_objects', String.raw`
struct CycoreGfxImage {
  const uint16_t *data;
  uint16_t width;
  uint16_t height;
};

class CycoreGfxCanvas16 : public GFXcanvas16 {
 public:
  CycoreGfxCanvas16(uint16_t width, uint16_t height)
      : GFXcanvas16(width, height, false) {
    const size_t bytes = (size_t)width * (size_t)height * sizeof(uint16_t);
    buffer = (uint16_t *)heap_caps_calloc(1, bytes,
                                         MALLOC_CAP_SPIRAM | MALLOC_CAP_8BIT);
    if (!buffer) {
      buffer = (uint16_t *)heap_caps_calloc(1, bytes, MALLOC_CAP_8BIT);
    }
    buffer_owned = false;
  }

  ~CycoreGfxCanvas16() {
    if (buffer) {
      heap_caps_free(buffer);
      buffer = nullptr;
    }
  }

  bool valid() const { return buffer != nullptr; }
};

SPIClass cycoreGfxSpi(HSPI);
Adafruit_ST7789 *cycoreGfxDisplay = nullptr;
CycoreGfxCanvas16 *cycoreGfxCanvas = nullptr;
bool cycoreGfxReady = false;
int8_t cycoreGfxBacklightPin = -1;
const CycoreGfxImage cycoreGfxEmptyImage = {nullptr, 0, 0};
`);

  generator.addFunction('cycore_gfx_core_functions', String.raw`
static void cycoreGfxDeleteCanvas() {
  if (cycoreGfxCanvas) {
    delete cycoreGfxCanvas;
    cycoreGfxCanvas = nullptr;
  }
}

static bool cycoreGfxCreateCanvas() {
  cycoreGfxDeleteCanvas();
  if (!cycoreGfxDisplay) return false;
  cycoreGfxCanvas = new (std::nothrow)
      CycoreGfxCanvas16(cycoreGfxDisplay->width(), cycoreGfxDisplay->height());
  if (!cycoreGfxCanvas || !cycoreGfxCanvas->valid()) {
    cycoreGfxDeleteCanvas();
    return false;
  }
  cycoreGfxCanvas->setRotation(0);
  cycoreGfxCanvas->fillScreen(0x0000);
  return true;
}

static bool cycoreGfxBegin(uint16_t panelWidth, uint16_t panelHeight,
                           uint8_t rotation, uint32_t spiFrequency,
                           int8_t sck, int8_t mosi, int8_t rst,
                           int8_t dc, int8_t cs, int8_t bl) {
  cycoreGfxReady = false;
  cycoreGfxDeleteCanvas();
  if (cycoreGfxDisplay) {
    delete cycoreGfxDisplay;
    cycoreGfxDisplay = nullptr;
  }
  cycoreGfxSpi.end();

  if (!cycoreGfxSpi.begin(sck, -1, mosi, -1)) return false;
  cycoreGfxDisplay = new (std::nothrow)
      Adafruit_ST7789(&cycoreGfxSpi, cs, dc, rst);
  if (!cycoreGfxDisplay) {
    cycoreGfxSpi.end();
    return false;
  }

  cycoreGfxDisplay->init(panelWidth, panelHeight);
  cycoreGfxDisplay->setSPISpeed(spiFrequency);
  cycoreGfxDisplay->setRotation(rotation & 3);

  cycoreGfxBacklightPin = bl;
  if (cycoreGfxBacklightPin >= 0) {
    pinMode(cycoreGfxBacklightPin, OUTPUT);
    digitalWrite(cycoreGfxBacklightPin, HIGH);
  }

  cycoreGfxReady = cycoreGfxCreateCanvas();
  return cycoreGfxReady;
}

static bool cycoreGfxSetRotation(uint8_t rotation) {
  if (!cycoreGfxDisplay) {
    cycoreGfxReady = false;
    return false;
  }
  cycoreGfxReady = false;
  cycoreGfxDisplay->setRotation(rotation & 3);
  cycoreGfxReady = cycoreGfxCreateCanvas();
  return cycoreGfxReady;
}

static bool cycoreGfxSetFrequency(uint32_t spiFrequency) {
  if (!cycoreGfxDisplay) return false;
  cycoreGfxDisplay->setSPISpeed(spiFrequency);
  return true;
}

static void cycoreGfxSetBacklight(bool enabled) {
  if (cycoreGfxBacklightPin >= 0) {
    digitalWrite(cycoreGfxBacklightPin, enabled ? HIGH : LOW);
  }
}

static bool cycoreGfxPresent() {
  if (!cycoreGfxReady || !cycoreGfxDisplay || !cycoreGfxCanvas ||
      !cycoreGfxCanvas->getBuffer()) return false;
  const uint16_t width = cycoreGfxCanvas->width();
  const uint16_t height = cycoreGfxCanvas->height();
  cycoreGfxDisplay->startWrite();
  cycoreGfxDisplay->setAddrWindow(0, 0, width, height);
  cycoreGfxDisplay->writePixels(cycoreGfxCanvas->getBuffer(),
                                (uint32_t)width * height, true, false);
  cycoreGfxDisplay->endWrite();
  return true;
}

static bool cycoreGfxPresentRegion(int32_t x, int32_t y,
                                   int32_t width, int32_t height) {
  if (!cycoreGfxReady || !cycoreGfxDisplay || !cycoreGfxCanvas ||
      !cycoreGfxCanvas->getBuffer() || width <= 0 || height <= 0) return false;

  int32_t right = x + width;
  int32_t bottom = y + height;
  const int32_t canvasWidth = cycoreGfxCanvas->width();
  const int32_t canvasHeight = cycoreGfxCanvas->height();
  if (right <= 0 || bottom <= 0 || x >= canvasWidth || y >= canvasHeight) {
    return false;
  }
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (right > canvasWidth) right = canvasWidth;
  if (bottom > canvasHeight) bottom = canvasHeight;
  width = right - x;
  height = bottom - y;
  if (width <= 0 || height <= 0) return false;

  uint16_t *buffer = cycoreGfxCanvas->getBuffer();
  cycoreGfxDisplay->startWrite();
  cycoreGfxDisplay->setAddrWindow((uint16_t)x, (uint16_t)y,
                                  (uint16_t)width, (uint16_t)height);
  for (int32_t row = 0; row < height; ++row) {
    cycoreGfxDisplay->writePixels(
        buffer + (y + row) * canvasWidth + x, (uint32_t)width, true, false);
  }
  cycoreGfxDisplay->endWrite();
  return true;
}

static void cycoreGfxBlit(int32_t x, int32_t y,
                          const CycoreGfxImage &image) {
  if (!cycoreGfxReady || !cycoreGfxCanvas || !cycoreGfxCanvas->getBuffer() ||
      !image.data || image.width == 0 || image.height == 0) return;

  int32_t sourceX = 0;
  int32_t sourceY = 0;
  int32_t copyWidth = image.width;
  int32_t copyHeight = image.height;
  if (x < 0) {
    sourceX = -x;
    copyWidth += x;
    x = 0;
  }
  if (y < 0) {
    sourceY = -y;
    copyHeight += y;
    y = 0;
  }
  if (x + copyWidth > cycoreGfxCanvas->width()) {
    copyWidth = cycoreGfxCanvas->width() - x;
  }
  if (y + copyHeight > cycoreGfxCanvas->height()) {
    copyHeight = cycoreGfxCanvas->height() - y;
  }
  if (copyWidth <= 0 || copyHeight <= 0) return;

  uint16_t *destination = cycoreGfxCanvas->getBuffer();
  const int32_t stride = cycoreGfxCanvas->width();
  for (int32_t row = 0; row < copyHeight; ++row) {
    const uint16_t *source = image.data +
        (sourceY + row) * image.width + sourceX;
    uint16_t *target = destination + (y + row) * stride + x;
    memcpy_P(target, source, (size_t)copyWidth * sizeof(uint16_t));
  }
}
`);
}

function cycoreGfxDrawCall(block, generator, method, names, fallbacks) {
  cycoreGfxEnsureCore(generator);
  const args = names.map(function(name, index) {
    return cycoreGfxValue(block, generator, name, fallbacks[index]);
  });
  return 'if (cycoreGfxReady && cycoreGfxCanvas) cycoreGfxCanvas->' +
      method + '(' + args.join(', ') + ');\n';
}

function cycoreGfxRgb565(r, g, b) {
  return (((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3)) & 0xFFFF;
}

function cycoreGfxPixel(value) {
  if (Array.isArray(value)) {
    if (value.length < 3) throw new Error('RGB数组至少需要3个分量');
    return cycoreGfxRgb565(Number(value[0]), Number(value[1]), Number(value[2]));
  }
  if (typeof value === 'string') {
    const text = value.trim();
    if (/^#[0-9a-f]{6}$/i.test(text)) {
      return cycoreGfxRgb565(parseInt(text.slice(1, 3), 16),
          parseInt(text.slice(3, 5), 16), parseInt(text.slice(5, 7), 16));
    }
    if (/^0x[0-9a-f]+$/i.test(text)) {
      const digits = text.slice(2);
      const parsed = parseInt(digits, 16);
      return digits.length <= 4 ? parsed & 0xFFFF :
          cycoreGfxRgb565((parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255);
    }
    if (/^[0-9]+$/.test(text)) value = Number(text);
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    const pixel = Math.round(value);
    if (pixel >= 0 && pixel <= 0xFFFF) return pixel;
    if (pixel >= 0 && pixel <= 0xFFFFFF) {
      return cycoreGfxRgb565((pixel >> 16) & 255, (pixel >> 8) & 255, pixel & 255);
    }
  }
  throw new Error('不支持的像素格式');
}

function cycoreGfxParseBitmap(text) {
  const input = JSON.parse(String(text || '').trim());
  let width;
  let height;
  let pixels;
  if (Array.isArray(input)) {
    if (!input.length || !Array.isArray(input[0]) || !input[0].length) {
      throw new Error('二维像素数组不能为空');
    }
    height = input.length;
    width = input[0].length;
    if (!input.every(function(row) { return Array.isArray(row) && row.length === width; })) {
      throw new Error('二维像素数组的每一行必须等宽');
    }
    pixels = input.reduce(function(all, row) { return all.concat(row); }, []);
  } else if (input && typeof input === 'object') {
    width = Number(input.width);
    height = Number(input.height);
    pixels = input.pixels;
    if (Array.isArray(pixels) && pixels.length && Array.isArray(pixels[0]) &&
        pixels.length === height) {
      pixels = pixels.reduce(function(all, row) { return all.concat(row); }, []);
    }
  }
  width = Math.floor(width);
  height = Math.floor(height);
  if (!Number.isFinite(width) || !Number.isFinite(height) ||
      width < 1 || height < 1 || width > 320 || height > 320) {
    throw new Error('图像宽高必须在1到320之间');
  }
  if (!Array.isArray(pixels) || pixels.length !== width * height) {
    throw new Error('像素数量必须等于width×height');
  }
  return {width: width, height: height, pixels: pixels.map(cycoreGfxPixel)};
}

function cycoreGfxDeclareImage(generator, block, bitmap) {
  const name = 'cycoreGfxImage_' + cycoreGfxSafeId(block, 'bitmap');
  const rows = [];
  for (let y = 0; y < bitmap.height; ++y) {
    rows.push('  ' + bitmap.pixels.slice(y * bitmap.width, (y + 1) * bitmap.width)
        .map(function(pixel) { return '0x' + pixel.toString(16).padStart(4, '0').toUpperCase(); })
        .join(', '));
  }
  generator.addObject(name, 'static const uint16_t ' + name + '_pixels[] PROGMEM = {\n' +
      rows.join(',\n') + '\n};\n' +
      'static const CycoreGfxImage ' + name + ' = {' + name + '_pixels, ' +
      bitmap.width + ', ' + bitmap.height + '};');
  return name;
}

function cycoreGfxFieldImageData(block, width, height) {
  let value = block.getFieldValue('IMAGE_PREVIEW');
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed && (trimmed[0] === '{' || trimmed[0] === '[')) {
      try { value = JSON.parse(trimmed); } catch (error) { /* use cache key */ }
    }
  }

  const metadata = value && typeof value === 'object' ? value : null;
  let cached = metadata &&
      (Array.isArray(metadata.pixels) || metadata.imageElement || metadata.processedSizes) ?
      metadata : null;
  const keys = [];
  if (typeof value === 'string' && value) keys.push(value);
  if (metadata) {
    ['filePath', 'path', 'fileName', 'name'].forEach(function(key) {
      if (metadata[key]) keys.push(metadata[key]);
    });
  }
  if (typeof window !== 'undefined' && window.tftImageCache) {
    for (let i = 0; i < keys.length; ++i) {
      const hit = window.tftImageCache[keys[i]] ||
          window.tftImageCache[String(keys[i]).toLowerCase()] || null;
      if (hit) {
        cached = hit;
        break;
      }
    }
  }
  if (!cached) return null;

  if (Array.isArray(cached.pixels)) {
    const sourceWidth = Number(cached.width || width);
    const sourceHeight = Number(cached.height || height);
    const flat = cached.pixels.length && Array.isArray(cached.pixels[0]) ?
        cached.pixels.reduce(function(all, row) { return all.concat(row); }, []) : cached.pixels;
    if (flat.length === sourceWidth * sourceHeight) {
      const source = flat.map(cycoreGfxPixel);
      return cycoreGfxResizePixels(source, sourceWidth, sourceHeight, width, height);
    }
  }

  if (cached.imageElement && typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', {willReadFrequently: true});
    if (context) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, width, height);
      const image = cached.imageElement;
      const sourceRatio = image.width / image.height;
      const targetRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;
      if (sourceRatio > targetRatio) {
        drawHeight = width / sourceRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * sourceRatio;
        offsetX = (width - drawWidth) / 2;
      }
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      const rgba = context.getImageData(0, 0, width, height).data;
      const pixels = [];
      for (let index = 0; index < rgba.length; index += 4) {
        pixels.push(cycoreGfxRgb565(rgba[index], rgba[index + 1], rgba[index + 2]));
      }
      return pixels;
    }
  }

  if (cached.processedSizes) {
    const sizes = Object.keys(cached.processedSizes).map(Number)
        .filter(function(size) { return Number.isFinite(size) && size > 0; });
    if (sizes.length) {
      const sourceSize = sizes.reduce(function(best, current) {
        return Math.abs(current - Math.max(width, height)) <
            Math.abs(best - Math.max(width, height)) ? current : best;
      }, sizes[0]);
      const source = cached.processedSizes[sourceSize].map(cycoreGfxPixel);
      if (source.length === sourceSize * sourceSize) {
        return cycoreGfxResizePixels(source, sourceSize, sourceSize, width, height);
      }
    }
  }
  return null;
}

function cycoreGfxResizePixels(source, sourceWidth, sourceHeight, width, height) {
  const result = new Array(width * height);
  for (let y = 0; y < height; ++y) {
    const sourceY = Math.min(sourceHeight - 1, Math.floor(y * sourceHeight / height));
    for (let x = 0; x < width; ++x) {
      const sourceX = Math.min(sourceWidth - 1, Math.floor(x * sourceWidth / width));
      result[y * width + x] = source[sourceY * sourceWidth + sourceX];
    }
  }
  return result;
}

Arduino.forBlock['cycore_gfx_init'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  const height = block.getFieldValue('SIZE') === '240X320' ? '320' : '240';
  return 'cycoreGfxBegin(240, ' + height + ', 0, 32000000, ' +
      cycoreGfxValue(block, generator, 'SCK', '12') + ', ' +
      cycoreGfxValue(block, generator, 'MOSI', '11') + ', ' +
      cycoreGfxValue(block, generator, 'RST', '17') + ', ' +
      cycoreGfxValue(block, generator, 'DC', '18') + ', ' +
      cycoreGfxValue(block, generator, 'CS', '10') + ', ' +
      cycoreGfxValue(block, generator, 'BL', '21') + ');\n';
};

Arduino.forBlock['cycore_gfx_ready'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  return ['cycoreGfxReady', generator.ORDER_ATOMIC];
};

Arduino.forBlock['cycore_gfx_dimension'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  const method = block.getFieldValue('DIMENSION') === 'HEIGHT' ? 'height()' : 'width()';
  return ['(cycoreGfxDisplay ? cycoreGfxDisplay->' + method + ' : 0)', generator.ORDER_ATOMIC];
};

Arduino.forBlock['cycore_gfx_set_rotation'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  return 'cycoreGfxSetRotation(' + (block.getFieldValue('ROTATION') || '0') + ');\n';
};

Arduino.forBlock['cycore_gfx_set_frequency'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  return 'cycoreGfxSetFrequency(' +
      (block.getFieldValue('FREQUENCY') || '32000000') + ');\n';
};

Arduino.forBlock['cycore_gfx_invert'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  const enabled = block.getFieldValue('INVERT') === 'TRUE' ? 'true' : 'false';
  return 'if (cycoreGfxDisplay) cycoreGfxDisplay->invertDisplay(' + enabled + ');\n';
};

Arduino.forBlock['cycore_gfx_backlight'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  return 'cycoreGfxSetBacklight(' +
      (block.getFieldValue('STATE') === 'FALSE' ? 'false' : 'true') + ');\n';
};

Arduino.forBlock['cycore_gfx_present'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  return 'cycoreGfxPresent();\n';
};

Arduino.forBlock['cycore_gfx_present_region'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  return 'cycoreGfxPresentRegion(' +
      ['X', 'Y', 'WIDTH', 'HEIGHT'].map(function(name) {
        return cycoreGfxValue(block, generator, name, '0');
      }).join(', ') + ');\n';
};

Arduino.forBlock['cycore_gfx_frame'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  return generator.statementToCode(block, 'DRAW') + 'cycoreGfxPresent();\n';
};

Arduino.forBlock['cycore_gfx_fill_screen'] = function(block, generator) {
  return cycoreGfxDrawCall(block, generator, 'fillScreen', ['COLOR'], ['0x0000']);
};

Arduino.forBlock['cycore_gfx_clear'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  return 'if (cycoreGfxReady && cycoreGfxCanvas) cycoreGfxCanvas->fillScreen(0x0000);\n';
};

Arduino.forBlock['cycore_gfx_color'] = function(block, generator) {
  const hex = (block.getFieldValue('COLOR') || '#ffffff').replace('#', '');
  const value = cycoreGfxRgb565(parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16));
  return ['0x' + value.toString(16).padStart(4, '0').toUpperCase(), generator.ORDER_ATOMIC];
};

Arduino.forBlock['cycore_gfx_rgb565'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  const r = cycoreGfxValue(block, generator, 'R', '0');
  const g = cycoreGfxValue(block, generator, 'G', '0');
  const b = cycoreGfxValue(block, generator, 'B', '0');
  return ['(uint16_t)((((uint16_t)(' + r + ') & 0xF8) << 8) | ' +
      '(((uint16_t)(' + g + ') & 0xFC) << 3) | ((uint16_t)(' + b + ') >> 3))',
      generator.ORDER_ATOMIC];
};

Arduino.forBlock['cycore_gfx_set_text_color'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  const foreground = cycoreGfxValue(block, generator, 'COLOR', '0xFFFF');
  const background = cycoreGfxValue(block, generator, 'BACKGROUND', '0x0000');
  const args = block.getFieldValue('MODE') === 'OPAQUE' ?
      foreground + ', ' + background : foreground;
  return 'if (cycoreGfxReady && cycoreGfxCanvas) cycoreGfxCanvas->setTextColor(' + args + ');\n';
};

Arduino.forBlock['cycore_gfx_set_text_size'] = function(block, generator) {
  return cycoreGfxDrawCall(block, generator, 'setTextSize', ['SIZE'], ['1']);
};

Arduino.forBlock['cycore_gfx_draw_text'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  const x = cycoreGfxValue(block, generator, 'X', '0');
  const y = cycoreGfxValue(block, generator, 'Y', '0');
  const text = cycoreGfxValue(block, generator, 'TEXT', '""');
  return 'if (cycoreGfxReady && cycoreGfxCanvas) { cycoreGfxCanvas->setCursor(' + x +
      ', ' + y + '); cycoreGfxCanvas->print(' + text + '); }\n';
};

const cycoreGfxShapeBlocks = {
  cycore_gfx_draw_pixel: ['drawPixel', ['X', 'Y', 'COLOR'], ['0', '0', '0xFFFF']],
  cycore_gfx_draw_line: ['drawLine', ['X0', 'Y0', 'X1', 'Y1', 'COLOR'], ['0', '0', '0', '0', '0xFFFF']],
  cycore_gfx_draw_fast_h_line: ['drawFastHLine', ['X', 'Y', 'LENGTH', 'COLOR'], ['0', '0', '0', '0xFFFF']],
  cycore_gfx_draw_fast_v_line: ['drawFastVLine', ['X', 'Y', 'LENGTH', 'COLOR'], ['0', '0', '0', '0xFFFF']],
  cycore_gfx_draw_rect: ['drawRect', ['X', 'Y', 'WIDTH', 'HEIGHT', 'COLOR'], ['0', '0', '0', '0', '0xFFFF']],
  cycore_gfx_fill_rect: ['fillRect', ['X', 'Y', 'WIDTH', 'HEIGHT', 'COLOR'], ['0', '0', '0', '0', '0xFFFF']],
  cycore_gfx_draw_round_rect: ['drawRoundRect', ['X', 'Y', 'WIDTH', 'HEIGHT', 'RADIUS', 'COLOR'], ['0', '0', '0', '0', '0', '0xFFFF']],
  cycore_gfx_fill_round_rect: ['fillRoundRect', ['X', 'Y', 'WIDTH', 'HEIGHT', 'RADIUS', 'COLOR'], ['0', '0', '0', '0', '0', '0xFFFF']],
  cycore_gfx_draw_circle: ['drawCircle', ['X', 'Y', 'RADIUS', 'COLOR'], ['0', '0', '0', '0xFFFF']],
  cycore_gfx_fill_circle: ['fillCircle', ['X', 'Y', 'RADIUS', 'COLOR'], ['0', '0', '0', '0xFFFF']],
  cycore_gfx_draw_triangle: ['drawTriangle', ['X0', 'Y0', 'X1', 'Y1', 'X2', 'Y2', 'COLOR'], ['0', '0', '0', '0', '0', '0', '0xFFFF']],
  cycore_gfx_fill_triangle: ['fillTriangle', ['X0', 'Y0', 'X1', 'Y1', 'X2', 'Y2', 'COLOR'], ['0', '0', '0', '0', '0', '0', '0xFFFF']]
};

Object.keys(cycoreGfxShapeBlocks).forEach(function(type) {
  Arduino.forBlock[type] = function(block, generator) {
    const spec = cycoreGfxShapeBlocks[type];
    return cycoreGfxDrawCall(block, generator, spec[0], spec[1], spec[2]);
  };
});

Arduino.forBlock['cycore_gfx_bitmap_data'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  try {
    const bitmap = cycoreGfxParseBitmap(block.getFieldValue('DATA'));
    const name = cycoreGfxDeclareImage(generator, block, bitmap);
    cycoreGfxSetWarning(block, null);
    return [name, generator.ORDER_ATOMIC];
  } catch (error) {
    cycoreGfxSetWarning(block, '图像数据无效：' + error.message);
    return ['cycoreGfxEmptyImage', generator.ORDER_ATOMIC];
  }
};

Arduino.forBlock['cycore_gfx_draw_image'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  const image = cycoreGfxValue(block, generator, 'IMAGE', 'cycoreGfxEmptyImage');
  return 'cycoreGfxBlit(' + cycoreGfxValue(block, generator, 'X', '0') + ', ' +
      cycoreGfxValue(block, generator, 'Y', '0') + ', ' + image + ');\n';
};

Arduino.forBlock['cycore_gfx_image_file'] = function(block, generator) {
  cycoreGfxEnsureCore(generator);
  const width = Math.max(1, Math.min(320, Number(block.getFieldValue('WIDTH')) || 32));
  const height = Math.max(1, Math.min(320, Number(block.getFieldValue('HEIGHT')) || 32));
  try {
    const pixels = cycoreGfxFieldImageData(block, width, height);
    if (!pixels || pixels.length !== width * height) {
      cycoreGfxSetWarning(block, '图片尚未加载或无法读取，请重新选择本地图片');
      return '';
    }
    const name = cycoreGfxDeclareImage(generator, block,
        {width: width, height: height, pixels: pixels});
    cycoreGfxSetWarning(block, null);
    return 'cycoreGfxBlit(' + (Number(block.getFieldValue('X')) || 0) + ', ' +
        (Number(block.getFieldValue('Y')) || 0) + ', ' + name + ');\n';
  } catch (error) {
    cycoreGfxSetWarning(block, '图片转换失败：' + error.message);
    return '';
  }
};
