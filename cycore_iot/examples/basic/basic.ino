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
    // This local container can also be created and published in a FreeRTOS
    // task. publish() only queues the message; cycoreIoT.loop() sends it.
    CycoreIoT::Telemetry telemetry(cycoreIoT);
    telemetry.add("uptime", millis() / 1000.0);
    telemetry.add("online", true);
    telemetry.publish();
  }
}
