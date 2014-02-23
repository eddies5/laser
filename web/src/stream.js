var Worker = require('./worker.js');

/**
 * Stream constructor.
 *
 * @param {io} io from socket.io
 * @api public
 */

function Stream (io, jobs) {
	var _worker;
	var _io = io;
	var _jobs = jobs;
	setupIO();
	setupWorker();

	/**
	 * Creates a worker.
	 *
	 * @api private
	 */

	function setupWorker () {
		_worker = new Worker(_jobs);
		_worker.start();
	};

	/**
	 * Listens for connections on io.
	 *
	 * @api private
	 */

	function setupIO () {
		_io.sockets.on('connection', function (socket) {
			console.log('socket connection made');
			_worker.addClient(socket);

			(function (socket) {

				//TODO(jessica) : pass in donation amount for priority
				socket.on('requestControl', function (data) {
					console.log('creating new control job');
					_worker.addJob(socket.id, data.donationAmount);
				});

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
					_worker.updateHash(socket.id);
				});


			})(socket);
			
		});
	};
}

/**
 * Export the constructor.
 */

module.exports = Stream;
