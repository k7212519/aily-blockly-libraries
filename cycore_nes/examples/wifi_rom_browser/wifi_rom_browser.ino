#include <CycoreNES.h>

// Preset ROMs selected in Blockly generate installEmbeddedRom() calls before
// this point. This plain Arduino example demonstrates the optional WiFi path.
void setup() {
  Serial.begin(115200);
  CycoreNES.beginFlash(true);
  CycoreNES.beginDisplay(240, 240, 0, 32000000, 12, 11, 17, 18, 10, 21);
  CycoreNES.setButtonPins(1, 2, 4, 5, 6, 7);

  // Wait until the upload page's Done button is pressed. Use a non-zero third
  // argument for a timeout, for example 60000UL for one minute.
  CycoreNES.runWifiUploader("Cycore-NES", "12345678", 0);

  const String selected = CycoreNES.browse();
  if (selected.length()) CycoreNES.startGame(selected);
}

void loop() {}
