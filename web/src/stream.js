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
		});
	};
}

/**
 * Export the constructor.
 */

module.exports = Stream;
