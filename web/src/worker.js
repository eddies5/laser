
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
	this._socketHash = {};

	/**
	 * Processes kue jobs
	 *
	 * @api privileged
	 */

	this.processClients = function () {
		console.log('Worker processing');
		var me = this;

		this._jobs.process('client', function (job, done) {

			var socket = me._socketHash[job.data.socket_id];

			setTimeout(function () {
				console.log('time up');
				//if id not in hash, socket has been disconnected before timeout
				if (job.data.socket_id in me._socketHash){
					socket.emit('timeUp', {});
				}
				done();
			}, 3000);

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

/**
* Open socket connection
*
*/
Worker.prototype.addClient = function(socket) {
	console.log('Creating socket connection');
	var socket_id = socket.id;
	this._socketHash[socket_id] = socket;
};

/**
* Create new job object, and post to kue
*
*/
Worker.prototype.addJob = function(socketID) {
	console.log('Creating new job');
	this._jobs.create('client', {'socket_id':socketID}).save();
};

Worker.prototype.updateHash = function(id, socket, del) {
	if (del === undefined){
		del = false;
	}
	if (del){
		delete this._socketHash[job.data.socket_id]
	}
	this._socketHash[id] = socket;
	// TODO: Add some sort of error checking here - does the id already exist?, etc
}


/**
 * Export the constructor.
 */

module.exports = Worker;