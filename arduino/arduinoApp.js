
var socket = io.connect('http://54.213.241.18:80');

socket.emit('arduino');

(function (socket) {
 
	socket.on('arduinoDown', function (data) {

		serialPort.write("0", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});
		serialPort.write("5", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});

	});

	socket.on('arduinoUp', function (data) {

		serialPort.write("0", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});
		serialPort.write("4", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});

	});

	socket.on('arduinoRight', function (data) {

		serialPort.write("1", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});
		serialPort.write("3", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});

	});

	socket.on('arduinoLeft', function (data) {

		serialPort.write("1", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});
		serialPort.write("2", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});

	});
})(socket);