// nofrendo generator.js v36 - Separated browser + launch + esp_restart on exit
function ensureNofrendoControlApi(generator) {
  generator.addLibrary('nofrendo_h', '#include <nofrendo.h>');
  generator.addVariable('nofrendo_control_api', [
    'extern "C" {',
    '  void nes_i2s_set_pins(int bck, int ws, int dout);',
    '  extern int g_nes_volume;',
    '  void nes_volume_save(int vol);',
    '  extern int g_nes_scanline;',
    '  void nes_scanline_save(int mode);',
    '  extern int g_nes_fullscreen;',
    '  void nes_fullscreen_save(int mode);',
    '  extern int g_nes_speed;',
    '  void nes_speed_save(int mode);',
    '  extern int g_nes_overclock;',
    '  void nes_overclock_save(int mode);',
    '  extern int g_nes_color;',
    '  void nes_color_save(int mode);',
    '  void nes_color_rebuild(void);',
    '  uint32_t nes_play_time_get(void);',
    '  void nes_flush_sram(void);',
    '}'
  ].join('\n'));
}

Arduino.forBlock['nofrendo_browser'] = function(block, generator) {
  generator.addLibrary('esp_wifi', '#include <esp_wifi.h>');
  generator.addLibrary('nofrendo_h', '#include <nofrendo.h>');
  generator.addLibrary('FS', '#include <FS.h>');
  generator.addLibrary('SD', '#include <SD.h>');
  generator.addLibrary('SPI', '#include <SPI.h>');
  generator.addLibrary('esp_heap', '#include <esp_heap_caps.h>');
  generator.addLibrary('nofrendo_zip_h', '#include "nofrendo_zip.h"');
  generator.addLibrary('vector', '#include <vector>');
  generator.addLibrary('u8g2_lib', '#include "U8g2_for_TFT_eSPI.h"');
  generator.addLibrary('stdarg', '#include <stdarg.h>');
  generator.addLibrary('cstring', '#include <string.h>');
  generator.addLibrary('algorithm', '#include <algorithm>');
  generator.addLibrary('utility', '#include <utility>');
  generator.addVariable('nofrendo_fp_extern', 'extern "C" FILE *_nofrendo_preloaded_fp;');
  generator.addVariable('nofrendo_buf_extern', 'extern "C" uint8_t *_nofrendo_preloaded_buf;');
  generator.addVariable('nofrendo_exit_flag', 'extern "C" volatile bool _nofrendo_request_exit;');
  generator.addVariable('nes_exit_buf', 'extern "C" jmp_buf _nes_exit_buf;');
  generator.addVariable('osd_force_cleanup', 'extern "C" void osd_force_cleanup(void);');
  generator.addVariable('nes_rtc_flag', 'RTC_DATA_ATTR int _nes_return_from_game=0;');
  generator.addVariable('nes_rom_vector', 'std::vector<String> _nes_rom_list;');
  generator.addVariable('nes_scan_active', 'bool _nes_scan_active=false;');
  generator.addVariable('nes_scan_total', 'int _nes_scan_total=0;');
  generator.addVariable('nes_save_sel', 'int _nes_save_sel=-1;');
  generator.addVariable('nes_save_top', 'int _nes_save_top=0;');
  generator.addVariable('nes_history', 'std::vector<String> _nes_history;');
  generator.addVariable('nes_u8g2_obj', 'U8g2_for_TFT_eSPI _nes_u8g2;');
  generator.addVariable('nes_gb2312_extern', 'extern const uint8_t chinese_city_gb2312[];');
  generator.addVariable('nes_browser_cancelled', 'bool _nes_browser_cancelled=false;');
  ensureSerialBegin('Serial', generator);

  var H = [];
  H.push('void _nes_u8g2_init(){_nes_u8g2.begin(tft);_nes_u8g2.setFont(chinese_city_gb2312);}');
  H.push('void _nes_print(int x,int y,const char* s,uint16_t fg,uint16_t bg){_nes_u8g2.setFont(chinese_city_gb2312);_nes_u8g2.setFontMode(0);_nes_u8g2.setForegroundColor(fg);_nes_u8g2.setBackgroundColor(bg);_nes_u8g2.setCursor(x,y);_nes_u8g2.print(s);}');
  H.push('int _nes_printf(int x,int y,uint16_t fg,uint16_t bg,const char* fmt,...){va_list args;va_start(args,fmt);char buf[128];vsnprintf(buf,sizeof(buf),fmt,args);va_end(args);_nes_u8g2.setFont(chinese_city_gb2312);_nes_u8g2.setFontMode(0);_nes_u8g2.setForegroundColor(fg);_nes_u8g2.setBackgroundColor(bg);_nes_u8g2.setCursor(x,y);_nes_u8g2.print(buf);return strlen(buf);}');
  H.push('bool _nes_load_index(){File idx=SD.open("/roms/nes/.nes_idx",FILE_READ);if(!idx)return false;_nes_rom_list.reserve(128);while(idx.available()){String line=idx.readStringUntil(\'\\n\');line.trim();if(line.length()>0)_nes_rom_list.push_back(line);}idx.close();Serial.printf("[NES] index loaded: %d ROMs\\n",_nes_rom_list.size());return _nes_rom_list.size()>0;}');
  H.push('void _nes_save_index(){File idx=SD.open("/roms/nes/.nes_idx",FILE_WRITE);if(!idx){Serial.println("[NES] index save failed");return;}for(size_t i=0;i<_nes_rom_list.size();i++)idx.println(_nes_rom_list[i]);idx.close();Serial.printf("[NES] index saved: %d ROMs\\n",_nes_rom_list.size());}');
  H.push('void _nes_scan_recursive(File dir, String basePath){File f=dir.openNextFile();while(f){if(f.isDirectory()){String dn=f.name();if(dn=="System Volume Information"||dn=="LOST.DIR"||dn.startsWith(".")){f.close();f=dir.openNextFile();continue;}String np=basePath+dn+"/";_nes_scan_recursive(f,np);f.close();}else{String n=f.name();String l=n;l.toLowerCase();if(l.endsWith(".nes")||l.endsWith(".zip")){_nes_rom_list.push_back(basePath+n);_nes_scan_total++;}f.close();if(_nes_scan_total%50==0&&_nes_scan_total>0){tft.fillRect(150,130,80,16,TFT_NAVY);_nes_printf(150,142,TFT_WHITE,TFT_NAVY,"%d",_nes_scan_total);}}f=dir.openNextFile();if(_nes_scan_total%20==0)delay(1);}}');
  H.push('void _nes_scan_start(){_nes_rom_list.clear();_nes_rom_list.reserve(128);_nes_scan_total=0;tft.fillRect(0,0,320,240,TFT_NAVY);_nes_print(100,110,"\u6b63\u5728\u626b\u63cf...",TFT_YELLOW,TFT_NAVY);_nes_print(100,142,"\u5df2\u627e\u5230:",TFT_WHITE,TFT_NAVY);File dir1=SD.open("/roms/nes");if(dir1){_nes_scan_recursive(dir1,"/roms/nes/");dir1.close();}if(_nes_rom_list.empty()){File dir2=SD.open("/");if(dir2){_nes_scan_recursive(dir2,"/");dir2.close();}}_nes_save_index();Serial.printf("[NES] scan done, total %d ROMs\\n",_nes_rom_list.size());}');
  H.push('void _nes_draw_menu(int romCount,int selIdx,int topOff,int prevSel,int prevTop,int prevCount){bool firstDraw=(prevSel<0&&prevTop<0);bool pageChanged=(!firstDraw)&&(topOff!=prevTop);bool countChanged=(romCount!=prevCount);int _sbX=306,_sbY=18,_sbW=8,_sbH=200;tft.startWrite();if(firstDraw){tft.fillRect(0,0,320,240,TFT_NAVY);}if(firstDraw||countChanged||pageChanged){tft.fillRect(0,0,320,16,TFT_NAVY);int _pgmax=topOff+12;if(_pgmax>romCount)_pgmax=romCount;_nes_printf(5,14,TFT_YELLOW,TFT_NAVY,"\u6e38\u620f\u5217\u8868 (%d/%d)",_pgmax,romCount);}if(firstDraw){tft.drawLine(0,15,320,15,0x4208);_nes_print(5,232,"\u4e0a\u4e0b:\u9009\u62e9 \u5de6\u53f3:\u7ffb\u9875 A:\u5f00\u59cb B:\u8fd4\u56de A+B:\u91cd\u626b",0x7BEF,TFT_NAVY);}for(int i=0;i<12;i++){int idx=topOff+i;int ypos=30+i*16;if(idx>=romCount){if(firstDraw||pageChanged)tft.fillRect(0,ypos-12,304,16,TFT_NAVY);continue;}bool sel=(idx==selIdx);bool wasSel=(firstDraw||pageChanged)?false:(prevTop+i==prevSel);bool needRedraw=(firstDraw||pageChanged)||(sel!=wasSel)||(idx>=prevCount);if(!needRedraw)continue;const String& _fp=_nes_rom_list[idx];int sl=_fp.lastIndexOf(\'/\');const char* _dn=(sl>=0)?_fp.c_str()+sl+1:_fp.c_str();int hr=_nes_hist_rank(_fp);uint16_t bgc=sel?TFT_GREEN:TFT_NAVY;uint16_t fgc=sel?TFT_BLACK:TFT_LIGHTGREY;if(sel){tft.fillRoundRect(0,ypos-12,304,16,4,bgc);tft.drawRoundRect(0,ypos-12,304,16,4,TFT_WHITE);}else{tft.fillRect(0,ypos-12,304,16,bgc);}_nes_u8g2.setFont(chinese_city_gb2312);_nes_u8g2.setFontMode(0);_nes_u8g2.setForegroundColor(fgc);_nes_u8g2.setBackgroundColor(bgc);_nes_u8g2.setCursor(8,ypos);_nes_u8g2.printf("%d.",idx+1);if(hr>=0){tft.fillCircle(2,ypos-4,2,sel?TFT_RED:0xFD20);}_nes_u8g2.setCursor(44,ypos);int _mw=256;int _nw=_nes_u8g2.getUTF8Width(_dn);if(_nw<=_mw){_nes_u8g2.print(_dn);}else{String _tr=_dn;while(_tr.length()>1&&_nes_u8g2.getUTF8Width((_tr+"...").c_str())>_mw){int p=_tr.length()-1;while(p>0&&(uint8_t)_tr[p]>=0x80&&(uint8_t)_tr[p]<0xC0)p--;_tr.remove(p);}_nes_u8g2.printf("%s...",_tr.c_str());}}if(firstDraw||pageChanged||countChanged){tft.fillRect(_sbX,_sbY,_sbW,_sbH,0x2104);if(romCount>12){int _th=_sbH*12/romCount;if(_th<8)_th=8;int _ty=_sbY+_sbH*topOff/romCount;tft.fillRect(_sbX,_ty,_sbW,_th,0x8410);}else{tft.fillRect(_sbX,_sbY,_sbW,_sbH,0x8410);}}tft.endWrite();}');
  H.push('void _nes_launch_info(const char* path,uint8_t* buf){uint8_t _prg=buf[4],_chr=buf[5];uint8_t _mp=(buf[6]>>4)|(buf[7]&0xF0);unsigned _ps=(unsigned)ESP.getFreePsram()/1024;const char* _fn=path;for(const char* _p=path;*_p;_p++)if(*_p==\'/\')_fn=_p+1;tft.fillScreen(TFT_NAVY);tft.fillRoundRect(16,18,288,204,10,0x3186);tft.drawRoundRect(16,18,288,204,10,0x4208);tft.drawLine(16,50,304,50,0x4208);_nes_print(128,40,"\u6e38\u620f\u4fe1\u606f",TFT_YELLOW,0x3186);_nes_print(30,68,"ROM:",0x7BEF,0x3186);String _fns=_fn;if(_nes_u8g2.getUTF8Width(_fn)>200){_fns=_fn;while(_fns.length()>1&&_nes_u8g2.getUTF8Width((_fns+"...").c_str())>200){int _pp=_fns.length()-1;while(_pp>0&&(uint8_t)_fns[_pp]>=0x80&&(uint8_t)_fns[_pp]<0xC0)_pp--;_fns.remove(_pp);}_nes_printf(72,68,TFT_WHITE,0x3186,"%s...",_fns.c_str());}else{_nes_print(72,68,_fn,TFT_WHITE,0x3186);}_nes_printf(30,92,TFT_LIGHTGREY,0x3186,"PRG:  %d (%dKB)",_prg,_prg*16);_nes_printf(30,114,TFT_LIGHTGREY,0x3186,"CHR:  %d (%dKB)",_chr,_chr*8);_nes_printf(30,136,TFT_LIGHTGREY,0x3186,"Mapper: %d",_mp);_nes_printf(30,158,TFT_LIGHTGREY,0x3186,"PSRAM: %dKB",_ps);tft.drawRoundRect(28,183,264,10,3,0x4208);for(int _b=0;_b<=260;_b+=4){tft.fillRect(30,185,_b,6,0x8410);delay(44);}}');
  H.push('void _nes_load_history(){_nes_history.clear();_nes_history.reserve(32);File hf=SD.open("/roms/nes/.nes_history",FILE_READ);if(!hf)return;while(hf.available()){String line=hf.readStringUntil(\'\\n\');line.trim();if(line.length()>0)_nes_history.push_back(line);}hf.close();Serial.printf("[NES] history loaded: %d entries\\n",_nes_history.size());}');
  H.push('int _nes_hist_rank(const String& path){for(size_t i=0;i<_nes_history.size();i++){if(_nes_history[i]==path)return (int)i;}return -1;}');
  H.push('void _nes_save_history(const String& path){for(auto it=_nes_history.begin();it!=_nes_history.end();){if(*it==path)it=_nes_history.erase(it);else it++;}_nes_history.insert(_nes_history.begin(),path);if(_nes_history.size()>30)_nes_history.resize(30);File hf=SD.open("/roms/nes/.nes_history",FILE_WRITE);if(!hf)return;for(size_t i=0;i<_nes_history.size();i++)hf.println(_nes_history[i]);hf.close();Serial.printf("[NES] history saved: %d entries\\n",_nes_history.size());}');
  H.push('void _nes_sort_by_history(){std::vector<std::pair<int,String>> tmp;for(size_t i=0;i<_nes_rom_list.size();i++){int r=_nes_hist_rank(_nes_rom_list[i]);tmp.push_back({r,_nes_rom_list[i]});}std::sort(tmp.begin(),tmp.end(),[](const std::pair<int,String>&a,const std::pair<int,String>&b){if(a.first<0&&b.first<0)return a.second<b.second;if(a.first<0)return false;if(b.first<0)return true;return a.first<b.first;});for(size_t i=0;i<_nes_rom_list.size();i++)_nes_rom_list[i]=std::move(tmp[i].second);Serial.println("[NES] sorted by history");}');
  H.push('String _nes_browser(){');
  H.push('  Serial.println("[NES] u8g2 init...");_nes_u8g2_init();');
  H.push('  Serial.println("[NES] SD reinit...");digitalWrite(5,HIGH);SD.end();delay(50);');
  H.push('  bool _sdok=SD.begin(22,TFT_eSPI::getSPIinstance());Serial.printf("[NES] SD ok=%d\\n",_sdok);');
  H.push('  if(!_sdok){tft.fillScreen(TFT_RED);_nes_print(20,120,"SD\u5361\u521d\u59cb\u5316\u5931\u8d25!",TFT_WHITE,TFT_RED);while(1)delay(1000);}');
  H.push('  pinMode(2,INPUT_PULLUP);pinMode(13,INPUT_PULLUP);pinMode(27,INPUT_PULLUP);pinMode(35,INPUT);pinMode(12,INPUT_PULLUP);pinMode(34,INPUT);');
  H.push('  _nes_rom_list.clear();bool hasCache=_nes_load_index();');
  H.push('  if(!hasCache){Serial.println("[NES] no cache, starting scan");_nes_scan_start();}');
  H.push('  _nes_load_history();_nes_sort_by_history();');
  H.push('  int selIdx=0;int topOff=0;int prevSel=-1;int prevTop=-1;int prevCount=-1;');
  H.push('  if(_nes_save_sel>=0){selIdx=_nes_save_sel;topOff=_nes_save_top;}');
  H.push('  while(digitalRead(2)==LOW||digitalRead(13)==LOW||digitalRead(27)==LOW||digitalRead(35)==LOW||digitalRead(34)==LOW||digitalRead(12)==LOW)delay(10);');
  H.push('  while(true){');
  H.push('    int romCount=_nes_rom_list.size();');
  H.push('    if(romCount>0&&selIdx>=romCount)selIdx=romCount-1;if(selIdx<0)selIdx=0;');
  H.push('    if(selIdx<topOff)topOff=(selIdx/12)*12;');
  H.push('    if(selIdx>=topOff+12)topOff=(selIdx/12)*12;if(topOff<0)topOff=0;');
  H.push('    if(selIdx!=prevSel||topOff!=prevTop||romCount!=prevCount){');
  H.push('      _nes_draw_menu(romCount,selIdx,topOff,prevSel,prevTop,prevCount);');
  H.push('      prevSel=selIdx;prevTop=topOff;prevCount=romCount;}');
  H.push('    delay(20);');
  H.push('    if(romCount==0){tft.fillScreen(TFT_RED);_nes_print(20,90,"\u672a\u627e\u5230\u6e38\u620f!",TFT_WHITE,TFT_RED);_nes_print(10,130,"\u8bf7\u5c06.nes\u653e\u5165/roms/nes/",TFT_WHITE,TFT_RED);_nes_browser_cancelled=true;return String("");}');
  H.push('    if(digitalRead(34)==LOW&&digitalRead(12)==LOW){');
  H.push('      while(digitalRead(34)==LOW||digitalRead(12)==LOW)delay(10);');
  H.push('      _nes_scan_start();selIdx=0;topOff=0;prevSel=-1;prevTop=-1;prevCount=-1;continue;}');
  H.push('    if(digitalRead(12)==LOW&&digitalRead(34)==HIGH){while(digitalRead(12)==LOW)delay(10);_nes_browser_cancelled=true;return String("");}');
  H.push('    if(digitalRead(2)==LOW){while(digitalRead(2)==LOW)delay(10);selIdx--;if(selIdx<0)selIdx=romCount-1;}');
  H.push('    if(digitalRead(13)==LOW){while(digitalRead(13)==LOW)delay(10);selIdx++;if(selIdx>=romCount)selIdx=0;}');
  H.push('    if(digitalRead(27)==LOW){while(digitalRead(27)==LOW)delay(10);selIdx-=12;if(selIdx<0)selIdx=0;}');
  H.push('    if(digitalRead(35)==LOW){while(digitalRead(35)==LOW)delay(10);selIdx+=12;if(selIdx>=romCount)selIdx=romCount-1;}');
  H.push('    if(digitalRead(34)==LOW){');
  H.push('      delay(300);');
  H.push('      if(selIdx>=romCount)selIdx=romCount-1;if(selIdx<0)selIdx=0;');
  H.push('      _nes_save_sel=selIdx;_nes_save_top=topOff;');
  H.push('      const String& chosen=_nes_rom_list[selIdx];_nes_save_history(chosen);');
  H.push('      _nes_browser_cancelled=false;return chosen;}');
  H.push('  }');
  H.push('}');
  generator.addFunction('_nes_helpers', H.join('\n'), true);

  return ['_nes_browser()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['nofrendo_start'] = function(block, generator) {
  const romPath = generator.valueToCode(block, 'ROM_PATH', generator.ORDER_ATOMIC) || '""';

  generator.addLibrary('i2s_audio_h', '#include "i2s_audio.h"');
  generator.addLibrary('driver_i2s_h', '#include <driver/i2s.h>');
  generator.addLibrary('esp_task_wdt_h', '#include <esp_task_wdt.h>');
  generator.addLibrary('setjmp_h', '#include <setjmp.h>');
  var lines = [];
  lines.push('// ===NES launch===');
  lines.push('i2s_audio_stop();i2s_driver_uninstall(I2S_NUM_0);delay(50);');
  lines.push('{');
  lines.push('  const char* _romPath=' + romPath + '.c_str();');
  lines.push('  Serial.printf("[NES] launching: %s\\n",_romPath);');
  lines.push('  String _chosenLower=_romPath;_chosenLower.toLowerCase();bool isZip=_chosenLower.endsWith(".zip");');
  lines.push('  File _nf=SD.open(_romPath);');
  lines.push('  if(!_nf||_nf.size()==0){tft.fillScreen(TFT_RED);_nes_print(40,100,"\u6253\u5f00\u5931\u8d25!",TFT_WHITE,TFT_RED);delay(2000);}');
  lines.push('  else{');
  lines.push('    size_t _nfs=_nf.size();');
  lines.push('    uint8_t *_nfb=(uint8_t*)heap_caps_malloc(_nfs,MALLOC_CAP_SPIRAM|MALLOC_CAP_8BIT);');
  lines.push('    if(!_nfb){tft.fillScreen(TFT_RED);_nes_print(40,100,"\u5185\u5b58\u4e0d\u8db3!",TFT_WHITE,TFT_RED);delay(3000);}');
  lines.push('    else{');
  lines.push('      _nf.read(_nfb,_nfs);_nf.close();');
  lines.push('      if(isZip){');
  lines.push('        uint8_t *_unzipped=NULL;uint32_t _uzsize=0;');
  lines.push('        int zr=zip_extract_nes(&_unzipped,&_uzsize,_nfb,_nfs);');
  lines.push('        free(_nfb);');
  lines.push('        if(zr!=0||!_unzipped){tft.fillScreen(TFT_RED);_nes_print(40,80,"ZIP\u89e3\u538b\u5931\u8d25!",TFT_WHITE,TFT_RED);delay(5000);}');
  lines.push('        else{_nfb=_unzipped;_nfs=_uzsize;');
  lines.push('          _nofrendo_preloaded_fp=fmemopen(_nfb,_nfs,"rb");_nofrendo_preloaded_buf=_nfb;');
  lines.push('          _nes_launch_info(_romPath,_nfb);');
  lines.push('          Serial.println("[NES] launching nofrendo_main...");_nofrendo_request_exit=false;');
  lines.push('          SD.mkdir("/roms/nes/saves");esp_wifi_deinit();esp_task_wdt_deinit();');
  lines.push('          char _pathBuf[128];strncpy(_pathBuf,_romPath,127);_pathBuf[127]=0;');
  lines.push('          char *_na[2];_na[0]=_pathBuf;_na[1]=NULL;');
  lines.push('          if(setjmp(_nes_exit_buf)==0){nofrendo_main(1,_na);}');
  lines.push('          Serial.println("[NES] exited, force cleanup...");');
  lines.push('          osd_force_cleanup();');
  lines.push('          _nes_return_from_game=1;_nofrendo_preloaded_buf=NULL;_nofrendo_preloaded_fp=NULL;if(_nfb){free(_nfb);_nfb=NULL;}');
  lines.push('          tft.fillScreen(TFT_BLACK);SD.end();delay(50);SD.begin(22,TFT_eSPI::getSPIinstance());');
  lines.push('          esp_task_wdt_config_t wdt_cfg={.timeout_ms=5000,.idle_core_mask=0x3,.trigger_panic=true};esp_task_wdt_init(&wdt_cfg);');
  lines.push('        }');
  lines.push('      } else{');
  lines.push('        _nofrendo_preloaded_fp=fmemopen(_nfb,_nfs,"rb");_nofrendo_preloaded_buf=_nfb;');
  lines.push('        _nes_launch_info(_romPath,_nfb);');
  lines.push('        Serial.println("[NES] launching nofrendo_main...");_nofrendo_request_exit=false;');
  lines.push('        SD.mkdir("/roms/nes/saves");esp_wifi_deinit();esp_task_wdt_deinit();');
  lines.push('        char _pathBuf[128];strncpy(_pathBuf,_romPath,127);_pathBuf[127]=0;');
  lines.push('        char *_na[2];_na[0]=_pathBuf;_na[1]=NULL;');
  lines.push('        if(setjmp(_nes_exit_buf)==0){nofrendo_main(1,_na);}');
  lines.push('        Serial.println("[NES] exited, force cleanup...");');
  lines.push('        osd_force_cleanup();');
  lines.push('        _nes_return_from_game=1;_nofrendo_preloaded_buf=NULL;_nofrendo_preloaded_fp=NULL;if(_nfb){free(_nfb);_nfb=NULL;}');
  lines.push('        tft.fillScreen(TFT_BLACK);SD.end();delay(50);SD.begin(22,TFT_eSPI::getSPIinstance());');
  lines.push('        esp_task_wdt_config_t wdt_cfg={.timeout_ms=5000,.idle_core_mask=0x3,.trigger_panic=true};esp_task_wdt_init(&wdt_cfg);');
  lines.push('      }');
  lines.push('    }');
  lines.push('  }');
  lines.push('}');
  return lines.join('\n') + '\n';
};

Arduino.forBlock['nofrendo_find_rom'] = function(block, generator) {
  generator.addLibrary('SD', '#include <SD.h>');
  generator.addLibrary('SPI', '#include <SPI.h>');
  generator.addFunction('nofrendo_find_rom', 'String nofrendo_find_rom_file(){File root=SD.open("/");if(!root)return String("");File file=root.openNextFile();while(file){if(!file.isDirectory()){String n=file.name();String l=n;l.toLowerCase();if(l.endsWith(".nes")){String p="/"+n;file.close();return p;}}file=root.openNextFile();}return String("");}', true);
  return ['nofrendo_find_rom_file()', generator.ORDER_ATOMIC];
};

Arduino.forBlock['nes_audio_config'] = function(block, generator) {
  const bck = generator.valueToCode(block, 'BCK', generator.ORDER_ATOMIC) || '25';
  const ws = generator.valueToCode(block, 'WS', generator.ORDER_ATOMIC) || '32';
  const dout = generator.valueToCode(block, 'DOUT', generator.ORDER_ATOMIC) || '33';
  ensureNofrendoControlApi(generator);
  return `nes_i2s_set_pins(${bck}, ${ws}, ${dout});\n`;
};

Arduino.forBlock['nes_volume_set'] = function(block, generator) {
  const volume = generator.valueToCode(block, 'VOL', generator.ORDER_ATOMIC) || '4';
  ensureNofrendoControlApi(generator);
  return `g_nes_volume = constrain(${volume}, 0, 8);\nnes_volume_save(g_nes_volume);\n`;
};

Arduino.forBlock['nes_volume_get'] = function(block, generator) {
  ensureNofrendoControlApi(generator);
  return ['g_nes_volume', generator.ORDER_ATOMIC];
};

Arduino.forBlock['nes_scanline_set'] = function(block, generator) {
  const mode = block.getFieldValue('MODE') || '0';
  ensureNofrendoControlApi(generator);
  return `g_nes_scanline = ${mode};\nnes_scanline_save(g_nes_scanline);\n`;
};

Arduino.forBlock['nes_scanline_get'] = function(block, generator) {
  ensureNofrendoControlApi(generator);
  return ['g_nes_scanline', generator.ORDER_ATOMIC];
};

Arduino.forBlock['nes_fullscreen_set'] = function(block, generator) {
  const mode = block.getFieldValue('MODE') || '0';
  ensureNofrendoControlApi(generator);
  return `g_nes_fullscreen = ${mode};\nnes_fullscreen_save(g_nes_fullscreen);\n`;
};

Arduino.forBlock['nes_fullscreen_get'] = function(block, generator) {
  ensureNofrendoControlApi(generator);
  return ['g_nes_fullscreen', generator.ORDER_ATOMIC];
};

Arduino.forBlock['nes_speed_set'] = function(block, generator) {
  const speed = block.getFieldValue('SPEED') || '0';
  ensureNofrendoControlApi(generator);
  return `g_nes_speed = ${speed};\nnes_speed_save(g_nes_speed);\n`;
};

Arduino.forBlock['nes_speed_get'] = function(block, generator) {
  ensureNofrendoControlApi(generator);
  return ['g_nes_speed', generator.ORDER_ATOMIC];
};

Arduino.forBlock['nes_overclock_set'] = function(block, generator) {
  const frequencyIndex = block.getFieldValue('FREQ') || '1';
  const frequencies = { '0': 240, '1': 260, '2': 267, '3': 280 };
  const frequency = frequencies[frequencyIndex] || 260;
  ensureNofrendoControlApi(generator);
  return `g_nes_overclock = ${frequencyIndex};\nnes_overclock_save(g_nes_overclock);\nsetCpuFrequencyMhz(${frequency});\n`;
};

Arduino.forBlock['nes_overclock_get'] = function(block, generator) {
  ensureNofrendoControlApi(generator);
  return ['g_nes_overclock', generator.ORDER_ATOMIC];
};

Arduino.forBlock['nes_color_set'] = function(block, generator) {
  const color = block.getFieldValue('COLOR') || '0';
  ensureNofrendoControlApi(generator);
  return `g_nes_color = ${color};\nnes_color_save(g_nes_color);\nnes_color_rebuild();\n`;
};

Arduino.forBlock['nes_color_get'] = function(block, generator) {
  ensureNofrendoControlApi(generator);
  return ['g_nes_color', generator.ORDER_ATOMIC];
};

Arduino.forBlock['nes_playtime_get'] = function(block, generator) {
  ensureNofrendoControlApi(generator);
  return ['nes_play_time_get()', generator.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['nes_flush_sram'] = function(block, generator) {
  ensureNofrendoControlApi(generator);
  return 'nes_flush_sram();\n';
};
