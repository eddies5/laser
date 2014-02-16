
if ('production' == process.env.NODE_ENV) {
	var SerialPort = require('serialport').SerialPort;
	var serialPort = new SerialPort("/dev/tty.usbmodem641", {
		baudrate: 9600
	});
}

/**
 * Worker constructor.
 *
 * @param {jobs} Job from kue
 * @api public
 */

function Worker (jobs) {
	this._processing = false;
	this._jobs = jobs;
	this._sockets = [];

	/**
	 * Processes kue jobs
	 *
	 * @api privileged
	 */

	this.processClients = function () {
		console.log('Worker processing');
		var me = this;
		this._jobs.process('client', function (job, done) {
			var socket = me._sockets.shift();
			console.log('processing job');

			socket.on('left', function (data) {
				console.log('left');
				if ('production' == process.env.NODE_ENV) {
					serialPort.write("1", function (err, results) {
						console.log('err: ' + err);
						console.log('results: ' + results);
					});
					serialPort.write("2", function (err, results) {
						console.log('err: ' + err);
						console.log('results: ' + results);
					});
				}
			});

			socket.on('right', function (data) {
				console.log('right');
				if ('production' == process.env.NODE_ENV) {
					serialPort.write("1", function (err, results) {
						console.log('err: ' + err);
						console.log('results: ' + results);
					});
					serialPort.write("3", function (err, results) {
						console.log('err: ' + err);
						console.log('results: ' + results);
					});
				}
			});

			socket.on('up', function (data) {
				console.log('up');
				if ('production' == process.env.NODE_ENV) {
					serialPort.write("0", function (err, results) {
						console.log('err: ' + err);
						console.log('results: ' + results);
					});
					serialPort.write("4", function (err, results) {
						console.log('err: ' + err);
						console.log('results: ' + results);
					});
				}
			});

			socket.on('down', function (data) {
				console.log('down');
				if ('production' == process.env.NODE_ENV) {
					serialPort.write("0", function (err, results) {
						console.log('err: ' + err);
						console.log('results: ' + results);
					});
					serialPort.write("5", function (err, results) {
						console.log('err: ' + err);
						console.log('results: ' + results);
					});
				}
			});

			socket.on('disconnect', function () {
				console.log('socket disconnected');
				done();
			});

			setTimeout(function () {
				console.log('time up');
				socket.emit('timeUp', {});
				done();
			}, 10000);

		});
	};
}

/**
 * Begins processing kue jobs
 *
 * @api public
 */

Worker.prototype.start = function () {
	if (this._processing === false) {
		this._processing = true;
		this.processClients();
	}
};

Worker.prototype.addClient = function(socket) {
	console.log('creating job');

	// this needs to block
	socket.on('amnt', function (data) {
		console.log(data.amnt);
	});

	this._sockets.push(socket);
	this._jobs.create('client', {}).save();
};

/**
 * Export the constructor.
 */

module.exports = Worker;
