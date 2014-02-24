var config = {}

config.appServer = {};
config.webSocket = {};
config.streamServer = {};


config.appServer.port = 8080;
config.appServer.host = process.env.APP_HOST || '127.0.0.1';

config.webSocket.port = 3050;

config.streamServer.port = 3075;
config.streamServer.host = process.env.STREAM_HOST || '127.0.0.1';

config.arduinoSerialPort = process.env.ARDUINO_PORT || '/dev/tty.usbmodem641';
config.kuePort = 3000;


module.exports = config;