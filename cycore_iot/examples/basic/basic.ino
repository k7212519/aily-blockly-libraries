#include <CycoreIoT.h>

CycoreIoT cycoreIoT;

void onLedCommand(const CycoreCommand &command) {
  digitalWrite(2, command.boolValue ? HIGH : LOW);
}

void setup() {
  pinMode(2, OUTPUT);
  Serial.begin(115200);
  cycoreIoT.on("led", onLedCommand);
  cycoreIoT.begin("Your WiFi SSID", "Your WiFi Password", "Device Code");
}

void loop() {
  cycoreIoT.loop();
  static unsigned long lastReport = 0;
  if (millis() - lastReport >= 5000) {
    lastReport = millis();
    cycoreIoT.report("uptime", millis() / 1000.0);
  }
}
