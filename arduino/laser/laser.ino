/**
 * Laser Sketch
 * Written by Eddie
 * 01/24/2014
 * 
 * char 2, left - 50
 * char 3, right - 51
 * char 4, up - 52
 * char 5, down - 53
 */
 
 #include <Servo.h>
 
 char tiltChannel = 48;
 char panChannel = 49;
 char left = 50;
 char right = 51;
 char up = 52;
 char down = 53;
 
 Servo servoTilt;
 Servo servoPan;
 
 int tiltDeg = 90;
 int panDeg = 90;
 
 char serialChar = 0;
 
 void setup () {
   servoTilt.attach(2);
   servoPan.attach(3);
   
   servoTilt.write(tiltDeg);
   servoPan.write(panDeg);
   
   Serial.begin(9600);
 }
 
 void loop () {
   while (Serial.available() <= 0);
   serialChar = Serial.read();
   Serial.print("Pan/Tilt: " + serialChar);
   if (serialChar == tiltChannel) {
     while (Serial.available() <= 0);
     serialChar = Serial.read(); // get up/down
     Serial.print("\tDirection: " + serialChar);
     if (serialChar == up) { // up
       if (0 <= tiltDeg && tiltDeg <= 180) {
         servoTilt.write(tiltDeg -= 10);
       }
     } else if (serialChar == down) { // down
       if (0 <= tiltDeg && tiltDeg <= 180) {
         servoTilt.write(tiltDeg += 10);
       }
     }
     Serial.print("\tTiltDeg: " + tiltDeg);
   } else if (serialChar == panChannel) {
     while (Serial.available() <= 0);
     serialChar = Serial.read(); // get left/right
     Serial.print("\tDirection: " + serialChar);
     if (serialChar == left) { // left
       if (0 <= panDeg && panDeg <= 180) {
         servoPan.write(panDeg -= 10);
       }
     } else if (serialChar == right) { // right
       if (0 <= panDeg && panDeg <= 180) {
         servoPan.write(panDeg += 10);
       }
     }
   }
 }
 
