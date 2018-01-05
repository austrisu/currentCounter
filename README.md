# Current Counter

Software used: Espruino web IDE, ArduinoIDE, picocom
Hardware used: NodeMCU with ESP8266-12, Atmega328

In this project I tried to establish connection between arduino and esp8266 (in this case NodeMCU) and send data to remote server. NOdeMCU runs Espruino and Atmega runs C with arduino libraries

## Working principle

Arduino reads sensor data via analog or digital pins. Red data are send wia I2C/wire protocol to NodeMCU.Red sensor data are in reverse order sent to NodeMCU adn in NodeMCU reversed in proper order. 

Recieved data is sent to any destination for now via http GET request.

## FUrther work

NodeMCU code should be altered so it can send sensor reading via MQTT to such IoT clauds as ThingSpeak or Google IoT
