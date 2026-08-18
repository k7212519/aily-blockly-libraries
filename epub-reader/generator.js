Arduino.forBlock['epub_reader_open'] = function(block, generator) {
  const path = generator.valueToCode(block, 'PATH', generator.ORDER_ATOMIC) || '"/book.epub"';
  const charsPerLine = generator.valueToCode(block, 'CHARS_PER_LINE', generator.ORDER_ATOMIC) || '25';
  const linesPerPage = generator.valueToCode(block, 'LINES_PER_PAGE', generator.ORDER_ATOMIC) || '13';

  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addLibrary('SD', '#include <SD.h>');
  generator.addObject('epubReader', 'EpubReader epubReader;');

  return 'epubReader.open(' + path + ', ' + charsPerLine + ', ' + linesPerPage + ');\n';
};

Arduino.forBlock['epub_reader_is_open'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return ['epubReader.isOpen()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_get_page'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addObject('epubPageBuf', 'static char epubPageBuf[4096];');
  return ['(epubReader.getPageText(epubPageBuf, sizeof(epubPageBuf)), String(epubPageBuf))', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_get_page_num'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return ['epubReader.getPageNum()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_next'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return 'epubReader.nextPage();\n';
};

Arduino.forBlock['epub_reader_prev'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return 'epubReader.prevPage();\n';
};

Arduino.forBlock['epub_reader_has_next'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return ['epubReader.hasNext()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_has_prev'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return ['epubReader.hasPrev()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_render_page'] = function(block, generator) {
  const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';

  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addLibrary('TFT_eSPI', '#include <TFT_eSPI.h>');
  generator.addObject('epubReader', 'EpubReader epubReader;');

  let renderFn = '';
  renderFn += 'void epubRenderPage(int startX, int startY) {\n';
  renderFn += '  static char pageBuf[4096];\n';
  renderFn += '  int pageLen = epubReader.getPageText(pageBuf, sizeof(pageBuf));\n';
  renderFn += '  int lineHeight = tft.fontHeight();\n';
  renderFn += '  if (lineHeight < 8) lineHeight = 16;\n';
  renderFn += '  int yPos = startY;\n';
  renderFn += '  int pos = 0;\n';
  renderFn += '  while (pos < pageLen) {\n';
  renderFn += '    static char lineBuf[256];\n';
  renderFn += '    int lineLen = 0;\n';
  renderFn += '    int widthOnLine = 0;\n';
  renderFn += '    while (pos < pageLen) {\n';
  renderFn += '      char c = pageBuf[pos];\n';
  renderFn += '      if (c == \'\\n\') { pos++; break; }\n';
  renderFn += '      uint8_t uc = (uint8_t)c;\n';
  renderFn += '      int cw = 1;\n';
  renderFn += '      if (uc >= 0x80) cw = 2;\n';
  renderFn += '      if (widthOnLine + cw > 30) break;\n';
  renderFn += '      int cb = 1;\n';
  renderFn += '      if ((uc & 0xE0) == 0xC0) cb = 2;\n';
  renderFn += '      else if ((uc & 0xF0) == 0xE0) cb = 3;\n';
  renderFn += '      else if ((uc & 0xF8) == 0xF0) cb = 4;\n';
  renderFn += '      for (int k = 0; k < cb && pos < pageLen && lineLen < 255; k++) {\n';
  renderFn += '        lineBuf[lineLen++] = pageBuf[pos++];\n';
  renderFn += '      }\n';
  renderFn += '      widthOnLine += cw;\n';
  renderFn += '    }\n';
  renderFn += '    lineBuf[lineLen] = 0;\n';
  renderFn += '    tft.setCursor(startX, yPos);\n';
  renderFn += '    tft.print(lineBuf);\n';
  renderFn += '    yPos += lineHeight;\n';
  renderFn += '    if (yPos > tft.height() - lineHeight) break;\n';
  renderFn += '  }\n';
  renderFn += '}\n';
  generator.addFunction('epubRenderPage', renderFn);

  return 'epubRenderPage(' + x + ', ' + y + ');\n';
};

Arduino.forBlock['epub_reader_close'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return 'epubReader.close();\n';
};

Arduino.forBlock['epub_reader_load_font_size'] = function(block, generator) {
  const size = block.getFieldValue('SIZE');
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addLibrary('TFT_eSPI', '#include <TFT_eSPI.h>');
  generator.addMacro('SMOOTH_FONT', '#define SMOOTH_FONT');
  generator.addObject('epubReader', 'EpubReader epubReader;');
  generator.addLibrary('CNFONT', '#include "cnfont' + size + '_font.h"');
  generator.addObject('epubFontSize', 'int epubFontSize = ' + size + ';');
  return 'epubFontSize = ' + size + ';\ntft.loadFont(cnfont' + size + '_data);\n';
};

Arduino.forBlock['epub_reader_font_height'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addLibrary('TFT_eSPI', '#include <TFT_eSPI.h>');
  generator.addMacro('SMOOTH_FONT', '#define SMOOTH_FONT');
  return ['tft.fontHeight()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_get_chapter'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return ['epubReader.getChapter()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_get_chapter_count'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return ['epubReader.getChapterCount()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_scan_books'] = function(block, generator) {
  const dir = generator.valueToCode(block, 'DIR', generator.ORDER_ATOMIC) || '"/books"';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  let scanFn = '';
  scanFn += 'void epubScanBooks(const char* dir) {\n';
  scanFn += '  epubBookCount = 0;\n';
  scanFn += '  const char* dirs[] = {dir, "/", nullptr};\n';
  scanFn += '  for (int d = 0; dirs[d] && epubBookCount == 0; d++) {\n';
  scanFn += '    File root = SD.open(dirs[d]);\n';
  scanFn += '    if (!root || !root.isDirectory()) {\n';
  scanFn += '      Serial.printf("[EPUB] Cannot open: %s\\n", dirs[d]);\n';
  scanFn += '      if (root) root.close();\n';
  scanFn += '      continue;\n';
  scanFn += '    }\n';
  scanFn += '    Serial.printf("[EPUB] Scanning: %s\\n", dirs[d]);\n';
  scanFn += '    while (epubBookCount < 32) {\n';
  scanFn += '      File entry = root.openNextFile();\n';
  scanFn += '      if (!entry) break;\n';
  scanFn += '      if (entry.isDirectory()) { entry.close(); continue; }\n';
  scanFn += '      String name = entry.name();\n';
  scanFn += '      String path = entry.path();\n';
  scanFn += '      entry.close();\n';
  scanFn += '      String lower = name; lower.toLowerCase();\n';
  scanFn += '      if (lower.endsWith(".epub")) {\n';
  scanFn += '        epubBookPaths[epubBookCount] = path;\n';
  scanFn += '        epubBookNames[epubBookCount] = name;\n';
  scanFn += '        Serial.printf("[EPUB] Found: %s\\n", path.c_str());\n';
  scanFn += '        epubBookCount++;\n';
  scanFn += '      }\n';
  scanFn += '    }\n';
  scanFn += '    root.close();\n';
  scanFn += '  }\n';
  scanFn += '  Serial.printf("[EPUB] Total found: %d\\n", epubBookCount);\n';
  scanFn += '}\n';
  generator.addFunction('epubScanBooks', scanFn);
  return 'epubScanBooks(' + dir + ');\n';
};

Arduino.forBlock['epub_reader_book_count'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addObject('epubBookCount', 'int epubBookCount = 0;');
  return ['epubBookCount', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_book_name'] = function(block, generator) {
  const idx = generator.valueToCode(block, 'INDEX', generator.ORDER_ATOMIC) || '0';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addObject('epubBookNames', 'String epubBookNames[32];');
  return ['epubBookNames[' + idx + ']', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_book_path'] = function(block, generator) {
  const idx = generator.valueToCode(block, 'INDEX', generator.ORDER_ATOMIC) || '0';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addObject('epubBookPaths', 'String epubBookPaths[32];');
  return ['epubBookPaths[' + idx + ']', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_show_bookshelf'] = function(block, generator) {
  const sel = generator.valueToCode(block, 'SEL', generator.ORDER_ATOMIC) || '0';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addLibrary('TFT_eSPI', '#include <TFT_eSPI.h>');
  generator.addMacro('SMOOTH_FONT', '#define SMOOTH_FONT');
  generator.addObject('epubBookCount', 'int epubBookCount = 0;');
  generator.addObject('epubBookNames', 'String epubBookNames[32];');

  let fn = '';
  fn += 'void epubShowBookshelf(int sel) {\n';
  fn += '  tft.fillScreen(TFT_BLACK);\n';
  fn += '  tft.setTextColor(TFT_CYAN, TFT_BLACK);\n';
  fn += '  tft.setCursor(0, 0);\n';
  fn += '  tft.print("Books: "); tft.print(epubBookCount);\n';
  fn += '  int lh = tft.fontHeight();\n';
  fn += '  if (lh < 8) lh = 16;\n';
  fn += '  int maxShow = (tft.height() - lh) / lh;\n';
  fn += '  if (maxShow > epubBookCount) maxShow = epubBookCount;\n';
  fn += '  if (maxShow > 32) maxShow = 32;\n';
  fn += '  for (int i = 0; i < maxShow; i++) {\n';
  fn += '    int y = (i + 1) * lh;\n';
  fn += '    if (i == sel) {\n';
  fn += '      tft.fillRect(0, y, tft.width(), lh, TFT_GREEN);\n';
  fn += '      tft.setTextColor(TFT_BLACK, TFT_GREEN);\n';
  fn += '    } else {\n';
  fn += '      tft.fillRect(0, y, tft.width(), lh, TFT_BLACK);\n';
  fn += '      tft.setTextColor(TFT_WHITE, TFT_BLACK);\n';
  fn += '    }\n';
  fn += '    tft.setCursor(0, y);\n';
  fn += '    tft.print(epubBookNames[i]);\n';
  fn += '  }\n';
  fn += '}\n';
  generator.addFunction('epubShowBookshelf', fn);

  return 'epubShowBookshelf(' + sel + ');\n';
};

Arduino.forBlock['epub_reader_goto_chapter'] = function(block, generator) {
  const idx = generator.valueToCode(block, 'INDEX', generator.ORDER_ATOMIC) || '0';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addObject('epubReader', 'EpubReader epubReader;');
  return ['epubReader.gotoChapter(' + idx + ')', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_chapter_title_at'] = function(block, generator) {
  const idx = generator.valueToCode(block, 'INDEX', generator.ORDER_ATOMIC) || '0';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  return ['String(epubReader.getChapterTitleByIndex(' + idx + '))', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_save_pos'] = function(block, generator) {
  const path = generator.valueToCode(block, 'PATH', generator.ORDER_ATOMIC) || '""';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addObject('epubReader', 'EpubReader epubReader;');
  return 'epubReader.savePosition(' + path + ');\n';
};

Arduino.forBlock['epub_reader_load_pos'] = function(block, generator) {
  const path = generator.valueToCode(block, 'PATH', generator.ORDER_ATOMIC) || '""';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addObject('epubReader', 'EpubReader epubReader;');
  return ['epubReader.loadPosition(' + path + ')', generator.ORDER_ATOMIC];
};

Arduino.forBlock['epub_reader_show_toc'] = function(block, generator) {
  const sel = generator.valueToCode(block, 'SEL', generator.ORDER_ATOMIC) || '0';
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addLibrary('TFT_eSPI', '#include <TFT_eSPI.h>');
  generator.addMacro('SMOOTH_FONT', '#define SMOOTH_FONT');
  generator.addObject('epubReader', 'EpubReader epubReader;');

  let fn = '';
  fn += 'void epubShowToc(int sel) {\n';
  fn += '  tft.fillScreen(TFT_BLACK);\n';
  fn += '  int lh = tft.fontHeight();\n';
  fn += '  if (lh < 8) lh = 16;\n';
  fn += '  int cjk10 = tft.textWidth("\\xe4\\xb8\\x80\\xe4\\xba\\x8c\\xe4\\xb8\\x89\\xe5\\x9b\\x9b\\xe4\\xba\\x94\\xe5\\x85\\xad\\xe4\\xb8\\x83\\xe5\\x85\\xab\\xe4\\xb9\\x9d\\xe5\\x8d\\x81");\n';
  fn += '  int cjkW = (cjk10 + 5) / 10;\n';
  fn += '  if (cjkW < 4) cjkW = 16;\n';
  fn += '  int halfW = (cjkW + 1) / 2;\n';
  fn += '  int maxShow = (tft.height() - lh) / lh;\n';
  fn += '  if (maxShow < 1) maxShow = 1;\n';
  fn += '  int totalChapters = epubReader.getChapterCount();\n';
  fn += '  int topItem = (sel / maxShow) * maxShow;\n';
  fn += '  if (topItem < 0) topItem = 0;\n';
  fn += '  tft.setTextColor(TFT_CYAN, TFT_BLACK);\n';
  fn += '  tft.setCursor(0, 0);\n';
  fn += '  tft.print("TOC "); tft.print(totalChapters); tft.print(" chapters");\n';
  fn += '  for (int i = 0; i < maxShow; i++) {\n';
  fn += '    int idx = topItem + i;\n';
  fn += '    if (idx >= totalChapters) break;\n';
  fn += '    int y = (i + 1) * lh;\n';
  fn += '    if (idx == sel) {\n';
  fn += '      tft.fillRect(0, y, tft.width(), lh, TFT_BLUE);\n';
  fn += '      tft.setTextColor(TFT_WHITE, TFT_BLUE);\n';
  fn += '    } else {\n';
  fn += '      tft.fillRect(0, y, tft.width(), lh, TFT_BLACK);\n';
  fn += '      tft.setTextColor(TFT_WHITE, TFT_BLACK);\n';
  fn += '    }\n';
  fn += '    tft.setCursor(0, y);\n';
  fn += '    const char* ttl = epubReader.getChapterTitleByIndex(idx);\n';
  fn += '    Serial.printf("[EPUB TOC] idx=%d title=[%s]\\n", idx, ttl ? ttl : "(null)");\n';
  fn += '    String entry = String(idx + 1) + ". " + String(ttl ? ttl : "");\n';
  fn += '    int maxChars = tft.width() / halfW;\n';
  fn += '    if (maxChars < 1) maxChars = 20;\n';
  fn += '    if (entry.length() > maxChars) entry = entry.substring(0, maxChars);\n';
  fn += '    tft.print(entry);\n';
  fn += '  }\n';
  fn += '  tft.setTextColor(TFT_YELLOW, TFT_BLACK);\n';
  fn += '  tft.setCursor(0, tft.height() - lh);\n';
  fn += '  tft.print("A:Read B:Back");\n';
  fn += '}\n';
  generator.addFunction('epubShowToc', fn);

  return 'epubShowToc(' + sel + ');\n';
};

Arduino.forBlock['epub_reader_show_page'] = function(block, generator) {
  generator.addLibrary('EpubReader', '#include <EpubReader.h>');
  generator.addLibrary('TFT_eSPI', '#include <TFT_eSPI.h>');
  generator.addMacro('SMOOTH_FONT', '#define SMOOTH_FONT');
  generator.addObject('epubReader', 'EpubReader epubReader;');

  let fn = '';
  fn += 'void epubShowPage() {\n';
  fn += '  tft.fillScreen(TFT_BLACK);\n';
  fn += '  int lh = tft.fontHeight();\n';
  fn += '  if (lh < 8) lh = 16;\n';
  fn += '  // Measure actual pixel width of CJK chars\n';
  fn += '  int cjk10 = tft.textWidth("\\xe4\\xb8\\x80\\xe4\\xba\\x8c\\xe4\\xb8\\x89\\xe5\\x9b\\x9b\\xe4\\xba\\x94\\xe5\\x85\\xad\\xe4\\xb8\\x83\\xe5\\x85\\xab\\xe4\\xb9\\x9d\\xe5\\x8d\\x81");\n';
  fn += '  int cjkW = (cjk10 + 5) / 10;\n';
  fn += '  if (cjkW < 4) cjkW = 16;\n';
  fn += '  int halfW = (cjkW + 1) / 2;\n';
  fn += '  int cpl = tft.width() / halfW;\n';
  fn += '  Serial.printf("[EPUB] screen=%dx%d cjkW=%d halfW=%d cpl=%d\\n", tft.width(), tft.height(), cjkW, halfW, cpl);\n';
  fn += '  int lpp = (tft.height() - lh * 2) / lh;\n';
  fn += '  if (cpl < 1) cpl = 1;\n';
  fn += '  if (lpp < 1) lpp = 1;\n';
  fn += '  int indent = 4;\n';
  fn += '  epubReader.recalcLayout(cpl, lpp);\n';
  fn += '  tft.setTextColor(TFT_CYAN, TFT_BLACK);\n';
  fn += '  tft.setCursor(0, 0);\n';
  fn += '  String header = "Ch" + String(epubReader.getChapter()) + "/" + String(epubReader.getChapterCount());\n';
  fn += '  const char* title = epubReader.getChapterTitle();\n';
  fn += '  if (title && title[0]) {\n';
  fn += '    header += " " + String(title);\n';
  fn += '    if (header.length() > cpl) header = header.substring(0, cpl);\n';
  fn += '  }\n';
  fn += '  tft.print(header);\n';
  fn += '  static char pageBuf[4096];\n';
  fn += '  int pageLen = epubReader.getPageText(pageBuf, sizeof(pageBuf));\n';
  fn += '  int pos = 0;\n';
  fn += '  int yPos = lh;\n';
  fn += '  int maxBodyY = tft.height() - lh;\n';
  fn += '  bool newPara = false;\n';
  fn += '  while (pos < pageLen && yPos <= maxBodyY - lh) {\n';
  fn += '    static char lineBuf[512];\n';
  fn += '    int lineLen = 0;\n';
  fn += '    int widthOnLine = newPara ? indent : 0;\n';
  fn += '    int renderIndent = newPara ? indent : 0;\n';
  fn += '    while (pos < pageLen) {\n';
  fn += '      char c = pageBuf[pos];\n';
  fn += '      if (c == 0x02) { pos++; newPara = true; break; }\n';
  fn += '      if (c == \'\\n\') { pos++; newPara = false; break; }\n';
  fn += '      if (c == \'\\r\') { pos++; continue; }\n';
  fn += '      uint8_t uc = (uint8_t)c;\n';
  fn += '      int cw = 1;\n';
  fn += '      if (uc >= 0x80) cw = 2;\n';
  fn += '      if (widthOnLine + cw > cpl) { newPara = false; break; }\n';
  fn += '      int cb = 1;\n';
  fn += '      if ((uc & 0xE0) == 0xC0) cb = 2;\n';
  fn += '      else if ((uc & 0xF0) == 0xE0) cb = 3;\n';
  fn += '      else if ((uc & 0xF8) == 0xF0) cb = 4;\n';
  fn += '      for (int k = 0; k < cb && pos < pageLen && lineLen < 511; k++) {\n';
  fn += '        lineBuf[lineLen++] = pageBuf[pos++];\n';
  fn += '      }\n';
  fn += '      widthOnLine += cw;\n';
  fn += '    }\n';
  fn += '    lineBuf[lineLen] = 0;\n';
  fn += '    if (lineLen > 0) {\n';
  fn += '      tft.setTextColor(TFT_WHITE, TFT_BLACK);\n';
  fn += '      tft.setCursor(renderIndent * halfW, yPos);\n';
  fn += '      tft.print(lineBuf);\n';
  fn += '      yPos += lh;\n';
  fn += '    }\n';
  fn += '  }\n';
  fn += '  int totalPages = epubReader.getNumPages();\n';
  fn += '  int curPage = epubReader.getPageNum();\n';
  fn += '  tft.setTextColor(TFT_YELLOW, TFT_BLACK);\n';
  fn += '  tft.setCursor(0, tft.height() - lh);\n';
  fn += '  String footer = String(curPage) + "/" + String(totalPages);\n';
  fn += '  if (epubReader.hasNext()) footer += "  >>";\n';
  fn += '  int fw = tft.textWidth(footer);\n';
  fn += '  tft.setCursor(tft.width() - fw, tft.height() - lh);\n';
  fn += '  tft.print(footer);\n';
  fn += '}\n';
  generator.addFunction('epubShowPage', fn);

  return 'epubShowPage();\n';
};
