#include <ArduinoJson.h>

const size_t capacityOut = JSON_OBJECT_SIZE(3) + JSON_OBJECT_SIZE(4);
const size_t capacityIn = JSON_OBJECT_SIZE(2) + 30;
String msg, output;
char inputString[101];
uint8_t inputStringLength = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  msg = "";
  output ="";
  if (Serial.available()) {
    delay(10);
    while (Serial.available() > 0) {
      msg += (char)Serial.read();
    }
    Serial.flush();
  }
  if (msg != "") {

    handleMessage(msg);
  }

  delay(500);

}

void turnRgbOn(DynamicJsonDocument* returnObject, int rgb) {
  (*returnObject)["success"] = true;
}

void setTemperature(DynamicJsonDocument* returnObject, int requestedTemperature) {
  (*returnObject)["success"] = true;
}

void turnUvOn(DynamicJsonDocument* returnObject) {
  (*returnObject)["success"] = true;
}

void turnOff(DynamicJsonDocument* returnObject) {
  (*returnObject)["success"] = true;
}

void getState(DynamicJsonDocument* returnObject) {
  (*returnObject)["success"] = true;
  JsonObject state = (*returnObject).createNestedObject("state");
  state["temperature"] = 19;
  state["humidity"] = 60;
  state["lightState"] = "ON";
  state["rgb"] = "0x121212";
}

void noActionReceived(DynamicJsonDocument* returnObject) {
  (*returnObject)["success"] = false;
  (*returnObject)["error"] = "No action received";
}

void wrongActionReceived(DynamicJsonDocument* returnObject, String action, int value) {
  (*returnObject)["success"] = false;
  String err = "Wrong action,value : ";
  err += action;
  err += ",";
  err += value;
  (*returnObject)["error"] = err;
}

void handleMessage(String m) {
  DynamicJsonDocument incomingObject(capacityIn);
  DeserializationError err = deserializeJson(incomingObject, m);
  DynamicJsonDocument returnObject(capacityOut);
  if (err) {
    returnObject["success"] = false;
    returnObject["error"] = err.c_str();
  } else {
    const char* action = incomingObject["action"];
    const int value = incomingObject["value"];
    if (action == "") {
      noActionReceived(&returnObject);
    } else if (strcmp(action,"set_temperature") == 0  && value != 0) {
      setTemperature(&returnObject, value);
    } else if (strcmp(action,"set_uv") == 0) {
      turnUvOn(&returnObject);
    } else if (strcmp(action,"set_rgb") == 0 && value != 0) {
      turnRgbOn(&returnObject, value);
    } else if (strcmp(action,"set_off") == 0) {
      turnOff(&returnObject);
    } else if (strcmp(action,"get_state") == 0) {
      getState(&returnObject);
    } else {
      wrongActionReceived(&returnObject, action, value);
    }
  }
  serializeJson(returnObject, Serial);
  Serial.write('\n');
  delay(100);
}
