var Worker = require('./worker.js');

/**
 * Stream constructor.
 *
 * @param {io} io from socket.io
 * @api public
 */

function Stream (io) {
	this._worker;
	this._io = io;
	setupIO();
	setupWorker();

	/**
	 * Creates a worker.
	 *
	 * @api private
	 */

	function setupWorker() {
		this._worker = Worker();
	};

	/**
	 * Listens for connections on io.
	 *
	 * @api private
	 */

	function setupIO() {
		this._io.sockets.on('connection', function (socket) {
			console.log('socket connection made');
		});

		this._io.sockets.on('disconnect', function () {
			console.log('socket disconnected');
		});
	};
}

/**
 * Export the constructor.
 */

module.exports = Stream;
