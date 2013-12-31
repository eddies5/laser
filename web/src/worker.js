
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
			});

			socket.on('right', function (data) {
				console.log('right');
			});

			socket.on('up', function (data) {
				console.log('up');
			});

			socket.on('down', function (data) {
				console.log('down');
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
	this._sockets.push(socket);
	this._jobs.create('client', {}).save();
};

/**
 * Export the constructor.
 */

module.exports = Worker;
