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
	var _arduinoSocket;
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

				socket.on('arduino', function (data) {
					console.log('arduino now connected');
					_arduinoSocket = socket;
				});

				socket.on('requestControl', function (data) {
					console.log('creating new control job');
					socket.first = false;
					_worker.addJob(socket.id, data.donationAmount);
				});
				
				// Explanation of the conditionals below:
				// if (NODE_ENV == 'production') {
				// 	if (_arduinoSocket != undefined && socket.first) {
				// 		console.log('right');
				// 			_arduinoSocket.emit('arduinoRight');
				// 	}
				// } else if (socket.first) {
				// 	console.log('right');
				// }
				// I just combined the two nested conditionals. If we're not running
				// production then all we have to check for is if this socket is first

				socket.on('left', function (data) {
					if (process.env.NODE_ENV == 'production' && _arduinoSocket != undefined && socket.first) {
						console.log('left');
						_arduinoSocket.emit('arduinoLeft');
					} else if (socket.first) {
						console.log('left');
					}
				});


				socket.on('right', function (data) {
					if (process.env.NODE_ENV == 'production' && _arduinoSocket != undefined && socket.first) {
						console.log('right');
						_arduinoSocket.emit('arduinoRight');
					} else if (socket.first) {
						console.log('right');
					}
				});

				socket.on('up', function (data) {
					if (process.env.NODE_ENV == 'production' && _arduinoSocket != undefined && socket.first) {
						console.log('up');
						_arduinoSocket.emit('arduinoUp');
					} else if (socket.first) {
						console.log('up');
					}
				});

				socket.on('down', function (data) {
					if (process.env.NODE_ENV == 'production' && _arduinoSocket != undefined && socket.first) {
						console.log('down');
						_arduinoSocket.emit('arduinoDown');
					} else if (socket.first) {
						console.log('down');
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
