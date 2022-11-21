#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>

#define FIREBASE_HOST "tce-it-default-rtdb.firebaseio.com" 
#define FIREBASE_AUTH "HpUe3VYna3eix9Py0hQbyyU8nNpnCHAkXperrWqW"
#define WIFI_SSID "துஜ"
#define WIFI_PASSWORD "Jaga@123"

const int trigPin = 12;
const int echoPin = 14;
const int tempePin= A0;

long duration;
float distance;
int tempeValue;
float millivolts;
float celsius;
float cm;
int heightOfTank = 8;
float levelInPercent;

FirebaseData firebaseData;
FirebaseJson json;

void setup() {
  Serial.begin(9600); 
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP : ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  tempeValue = analogRead(tempePin);
  
  //distance = duration * 0.034/2;
  cm = duration * 0.017;
  distance = heightOfTank - cm;
  millivolts = (tempeValue/1024.0) * 3300; 
  celsius = millivolts/10;
  levelInPercent = (distance/heightOfTank)*100;

  Serial.print("Distance : ");
  Serial.print(distance);
  Serial.println(" feet");
  Serial.print("Temperature : ");
  Serial.print(celsius);
  Serial.println(" `C");

  if (Firebase.setFloat(firebaseData, "/SixthSemester/IOT-MAD-EDP/WaterQualityMonitor/UserId/Level", distance)) {
    Serial.println("Uploaded ==> " + firebaseData.dataPath());
  }
  else {
    Serial.println("Fail to Upload ==> " + firebaseData.errorReason());
  }
  if (Firebase.setFloat(firebaseData, "/SixthSemester/IOT-MAD-EDP/WaterQualityMonitor/UserId/LevelInPercent", levelInPercent)) {
    Serial.println("Uploaded ==> " + firebaseData.dataPath());
  }
  else {
    Serial.println("Fail to Upload ==> " + firebaseData.errorReason());
  }
  if (Firebase.setFloat(firebaseData, "/SixthSemester/IOT-MAD-EDP/WaterQualityMonitor/UserId/Temperature", celsius)) {
    Serial.println("Uploaded ==> " + firebaseData.dataPath());
  }
  else {
    Serial.println("Fail to Upload ==> " + firebaseData.errorReason());
  }

  Serial.println("--------------------------");
  delay(10000);
}
