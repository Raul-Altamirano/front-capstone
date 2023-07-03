#include <ArduinoJson.h>
#include <map>
#include <string.h>
/*
 * WebSocketClient.ino
 *
 *  Created on: 24.05.2015
 *
 */
#include <Arduino.h>


#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#ifdef __cplusplus
extern "C" {
#endif
uint8_t temprature_sens_read();
#ifdef __cplusplus
}
#endif
uint8_t temprature_sens_read();

enum state {
    DEVICE = 1,
};

#ifdef DEBUG_ESP_PORT
#define DEBUG_MSG(...) DEBUG_ESP_PORT( __VA_ARGS__)
#else 
#define DEBUG_MSG(...)
#endif
#define DEBUG_ESP_PORT Serial

const char* ssid= "sanz";
const char* password = "12345678";

WiFiMulti WiFiMulti;
WebSocketsClient webSocket;
SocketIOclient socketIO;
//WebSocketsClient socketIO;
#define USE_SERIAL Serial

void hexdump(const void *mem, uint32_t len, uint8_t cols = 16) {
	const uint8_t* src = (const uint8_t*) mem;
	USE_SERIAL.printf("\n[HEXDUMP] Address: 0x%08X len: 0x%X (%d)", (ptrdiff_t)src, len, len);
	for(uint32_t i = 0; i < len; i++) {
		if(i % cols == 0) {
			USE_SERIAL.printf("\n[0x%0hola8X] 0x%08X: ", (ptrdiff_t)src, i);
		}
		USE_SERIAL.printf("%02X ", *src);
		src++;
	}
	USE_SERIAL.printf("\n");
}

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
        {
            char * sptr = NULL;
            int id = strtol((char *)payload, &sptr, 10);
            USE_SERIAL.printf("[IOc] get event: %s id: %d\n", payload, id);
            if(id) {
                payload = (uint8_t *)sptr;
            }
            DynamicJsonDocument doc(1024);
            DeserializationError error = deserializeJson(doc, payload, length);
            if(error) {
                USE_SERIAL.print(F("deserializeJson() failed: "));
                USE_SERIAL.println(error.c_str());
                return;
            }
            
            String eventName = doc[0];

            const char* char_eventName = eventName.c_str();
            char eventExpeted[] = "device";


            int result = strcmp(char_eventName, eventExpeted);

            if(result == 0){
              
            JsonObject data = doc[1];
            const char* temp = data["roomTemp"];
            USE_SERIAL.printf("[IOc] event name: %s\n", eventName.c_str());
            Serial.printf("[IOc] event value: %s\n", temp);

            }

            // switch(event){

            // case DEVICE:
            // USE_SERIAL.printf("LLamando a funcion device");
            // break;

            // }

            // Message Includes a ID for a ACK (callback)
            if(id) {
                // creat JSON message for Socket.IO (ack)
                DynamicJsonDocument docOut(1024);
                JsonArray array = docOut.to<JsonArray>();
                
                // add payload (parameters) for the ack (callback function)
                JsonObject param1 = array.createNestedObject();
                param1["now"] = millis();

                // JSON to String (serializion)
                String output;
                output += id;
                serializeJson(docOut, output);

                // Send event        
                socketIO.send(sIOtype_ACK, output);
            }
        }
            break;
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }

}


void setup() {

	// USE_SERIAL.begin(921600);
	USE_SERIAL.begin(115200);
 delay(10);

     // initialization:

      USE_SERIAL.print("hola//////////////////////");

	//Serial.setDebugOutput(true);
	USE_SERIAL.setDebugOutput(true);

	USE_SERIAL.println();
	USE_SERIAL.println();
	USE_SERIAL.println();

	for(uint8_t t = 4; t > 0; t--) {
		USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
		USE_SERIAL.flush();
		delay(500);
	}

// WiFiMulti.addAP(ssid, password);
//WiFiMulti.addAP("sanz", "12345678");
  //WiFiMulti.addAP("SSID", "pasword");

    WiFiMulti.addAP(ssid, password);

    Serial.println();
    Serial.println();
    Serial.print("Waiting for WiFi... ");

    while(WiFiMulti.run() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }

socketIO.setExtraHeaders("Authorization: 1234567890");
socketIO.begin("http://ec2-3-144-7-137.us-east-2.compute.amazonaws.com", 3000, "/socket.io/?EIO=4");


	// event handler
//socketIO.onEvent(webSocketEvent);
  socketIO.onEvent(socketIOEvent);

	// use HTTP Basic Authorization this is optional remove if not needed
	//webSocket.setAuthorization("user", "Password");

	// try ever 5000 again if connection has failed
	//webSocket.setReconnectInterval(3000);

}
unsigned long messageTimestamp = 0;

void loop() {
//	webSocket.loop();
socketIO.loop();
        
    uint64_t now = millis();
     if(now - messageTimestamp > 1500) {

        messageTimestamp = now;

        // creat JSON message for Socket.IO (event)
        DynamicJsonDocument doc(2048);
        // JsonObject array = doc.to<JsonObject>();
        
        // add evnet name
        // socket.on('device',void())
        // array.add("roomTemp");

        // add payload (parameters) for the event
        // JsonObject param1 = array.createNestedObject();
        uint32_t sensor = (temprature_sens_read() - 32) / 1.8;
        Serial.println(sensor);
        //param1["roomTemp"] = sensor;


doc.add("roomTemp");

JsonObject doc_1 = doc.createNestedObject();
doc_1["roomTemp"] = sensor;

JsonArray doc_1_devices = doc_1.createNestedArray("devices");

JsonObject doc_1_devices_0 = doc_1_devices.createNestedObject();
doc_1_devices_0["name"] = "Refrigerados";
doc_1_devices_0["status"] = "on";
doc_1_devices_0["temperature"] = "8";
doc_1_devices_0["icon"] = "assets/images/fridge.png";

JsonObject doc_1_devices_1 = doc_1_devices.createNestedObject();
doc_1_devices_1["name"] = "Air Conditioner";
doc_1_devices_1["status"] = "on";
doc_1_devices_1["temperature"] = "16";
doc_1_devices_1["icon"] = "assets/images/air-conditioner.png";

JsonObject doc_1_devices_2 = doc_1_devices.createNestedObject();
doc_1_devices_2["name"] = "Washing Machine";
doc_1_devices_2["status"] = "on";
doc_1_devices_2["temperature"] = "22";
doc_1_devices_2["icon"] = "assets/images/washing-machine.png";

//serializeJson(doc, output);







        // JSON to String (serializion)
        String output;
        serializeJson(doc, output);

        // Send event        
        socketIO.sendEVENT(output);

        // Print JSON for debugging
        USE_SERIAL.println(output);
        Serial.print((temprature_sens_read() - 32) / 1.8);
        Serial.println(" C");
    }

}

void device() {
USE_SERIAL.println("Evento device recobido");
}

