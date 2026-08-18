#include <CycoreIoT.h>

CycoreIoT cycoreIoT;

void reportTask(void *parameter) {
  while (true) {
    CycoreIoT::Telemetry telemetry(cycoreIoT);
    telemetry.add("uptime", millis() / 1000.0);
    telemetry.add("free_heap", ESP.getFreeHeap());
    telemetry.publish();  // Queues data; does not access MQTT directly.
    vTaskDelay(pdMS_TO_TICKS(5000));
  }
}

void setup() {
  cycoreIoT.begin("Your WiFi SSID", "Your WiFi Password", "Device Code");
  xTaskCreate(reportTask, "iot-report", 4096, nullptr, 1, nullptr);
}

void loop() {
  // MQTT and Wi-Fi processing have one owner and stay in the Arduino task.
  cycoreIoT.loop();
  delay(1);
}
