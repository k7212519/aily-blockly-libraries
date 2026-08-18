# EPUB阅读器

EPUB电子书阅读器库，支持ZIP解压、HTML解析、自动分页，配合TFT屏幕显示。全局对象 `epubReader`。

## Library Info
- **Name**: @aily-project/lib-epub-reader
- **Version**: 1.0.0

## Block Definitions

| Block Type | Connection | Parameters (block.json order) | ABS Format | Generated Code |
|------------|------------|--------------------------|------------|----------------|
| `epub_reader_open` | Statement | PATH(input_value), CHARS_PER_LINE(input_value), LINES_PER_PAGE(input_value) | `epub_reader_open(text("/book.epub"), math_number(25), math_number(13))` | `epubReader.open("value", 1, 1);` |
| `epub_reader_is_open` | Value | (none) | `epub_reader_is_open()` | `epubReader.isOpen()` |
| `epub_reader_get_page` | Value | (none) | `epub_reader_get_page()` | `(epubReader.getPageText(epubPageBuf, sizeof(epubPageBuf)), String(epubPageBuf))` |
| `epub_reader_get_page_num` | Value | (none) | `epub_reader_get_page_num()` | `epubReader.getPageNum()` |
| `epub_reader_next` | Statement | (none) | `epub_reader_next()` | `epubReader.nextPage();` |
| `epub_reader_prev` | Statement | (none) | `epub_reader_prev()` | `epubReader.prevPage();` |
| `epub_reader_has_next` | Value | (none) | `epub_reader_has_next()` | `epubReader.hasNext()` |
| `epub_reader_has_prev` | Value | (none) | `epub_reader_has_prev()` | `epubReader.hasPrev()` |
| `epub_reader_render_page` | Statement | X(input_value), Y(input_value) | `epub_reader_render_page(math_number(2), math_number(20))` | `epubRenderPage(1, 1);` |
| `epub_reader_close` | Statement | (none) | `epub_reader_close()` | `epubReader.close();` |
| `epub_reader_load_font_size` | Statement | SIZE(dropdown) | `epub_reader_load_font_size(16)` | `epubFontSize = 16; ↵ tft.loadFont(cnfont16_data);` |
| `epub_reader_font_height` | Value | (none) | `epub_reader_font_height()` | `tft.fontHeight()` |
| `epub_reader_get_chapter` | Value | (none) | `epub_reader_get_chapter()` | `epubReader.getChapter()` |
| `epub_reader_get_chapter_count` | Value | (none) | `epub_reader_get_chapter_count()` | `epubReader.getChapterCount()` |
| `epub_reader_scan_books` | Statement | DIR(input_value) | `epub_reader_scan_books(text("value"))` | `epubScanBooks("value");` |
| `epub_reader_book_count` | Value | (none) | `epub_reader_book_count()` | `epubBookCount` |
| `epub_reader_book_name` | Value | INDEX(input_value) | `epub_reader_book_name(math_number(0))` | `epubBookNames[1]` |
| `epub_reader_book_path` | Value | INDEX(input_value) | `epub_reader_book_path(math_number(0))` | `epubBookPaths[1]` |
| `epub_reader_show_bookshelf` | Statement | SEL(input_value) | `epub_reader_show_bookshelf(math_number(0))` | `epubShowBookshelf(1);` |
| `epub_reader_show_page` | Statement | (none) | `epub_reader_show_page()` | `epubShowPage();` |
| `epub_reader_goto_chapter` | Value | INDEX(input_value) | `epub_reader_goto_chapter(math_number(0))` | `epubReader.gotoChapter(1)` |
| `epub_reader_chapter_title_at` | Value | INDEX(input_value) | `epub_reader_chapter_title_at(math_number(0))` | `String(epubReader.getChapterTitleByIndex(1))` |
| `epub_reader_save_pos` | Statement | PATH(input_value) | `epub_reader_save_pos(text("value"))` | `epubReader.savePosition("value");` |
| `epub_reader_load_pos` | Value | PATH(input_value) | `epub_reader_load_pos(text("value"))` | `epubReader.loadPosition("value")` |
| `epub_reader_show_toc` | Statement | SEL(input_value) | `epub_reader_show_toc(math_number(0))` | `epubShowToc(1);` |

## Parameter Options

| Parameter | Values | Description |
|-----------|--------|-------------|
| SIZE | 16, 24, 32 | epub_reader_load_font_size |

## ABS Examples

### Complete EPUB Reader
```
arduino_global()

arduino_setup()
    tftscr_init()
    tftscr_fill_screen(tftscr_color(TFT_BLACK))
    tftscr_set_text_color(tftscr_color(TFT_WHITE))
    tftscr_set_text_size(2)
    xueersi_esp32_sd_init()
    xueersi_esp32_button_setup()
    epub_reader_open(text("/book.epub"), math_number(25), math_number(13))
    controls_if(epub_reader_is_open())
        @DO0:
            epub_reader_render_page(math_number(2), math_number(20))

arduino_loop()

xueersi_esp32_button_on_event(DOWN, CLICK)
    @DO:
        epub_reader_next()
        tftscr_fill_screen(tftscr_color(TFT_BLACK))
        epub_reader_render_page(math_number(2), math_number(20))

xueersi_esp32_button_on_event(UP, CLICK)
    @DO:
        epub_reader_prev()
        tftscr_fill_screen(tftscr_color(TFT_BLACK))
        epub_reader_render_page(math_number(2), math_number(20))
```

## Notes

1. **全局对象**: 库自动声明全局对象 `epubReader`，无需手动创建
2. **依赖**: 需要先初始化SD卡（`xueersi_esp32_sd_init`）和TFT屏幕（`tftscr_init`）
3. **PSRAM**: 需要PSRAM支持，EPUB解析时使用PSRAM存储解压数据
4. **内存**: 大文件解析时占用约2-3倍文件大小的PSRAM
5. **编码**: 自动处理UTF-8编码和常见HTML实体转义
