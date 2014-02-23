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
					_worker.addJob(socket.id, data.donationAmount);
				});

				socket.on('left', function (data) {
					console.log('left');
					if (_arduinoSocket != undefined){
						_arduinoSocket.emit('arduinoLeft');
					}
				});

				socket.on('right', function (data) {
					console.log('right');
					if (_arduinoSocket != undefined){
						_arduinoSocket.emit('arduinoRight');
					}
				});

				socket.on('up', function (data) {
					console.log('up');
					if (_arduinoSocket != undefined){
						_arduinoSocket.emit('arduinoUp');
					}
				});

				socket.on('down', function (data) {
					console.log('down');
					if (_arduinoSocket != undefined){
						_arduinoSocket.emit('arduinoDown');
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
