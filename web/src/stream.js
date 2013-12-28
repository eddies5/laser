var Worker = require('./worker.js');

/**
 * Stream constructor.
 *
 * @param {io} io from socket.io
 * @api public
 */

function Stream (io) {
	var _worker;
	var _io = io;
	setupIO();
	setupWorker();

	/**
	 * Creates a worker.
	 *
	 * @api private
	 */

	function setupWorker() {
		_worker = Worker();
	};

	/**
	 * Listens for connections on io.
	 *
	 * @api private
	 */

	function setupIO() {
		_io.sockets.on('connection', function (socket) {
			console.log('socket connection made');
		});
	};
}

/**
 * Export the constructor.
 */

module.exports = Stream;
