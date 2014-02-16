
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

function Worker (jobs, kue) {
	this._processing = false;
	this._jobs = jobs;
	this._kue = kue;
	this._sockets = [];
	this._socketHash = {};
	this._curr_socket = null;

	/**
	 * Processes kue jobs
	 *
	 * @api privileged
	 */

	this.processClients = function () {
		console.log('Worker processing');
		var me = this;

		// Find ID of first job on priority queue
		this._kue.Job.rangeByType ('job', 'failed', 0, 0, 'asc', function (err, selectedJobs) {
    		selectedJobs.forEach(function (job) {
    			this._curr_socket = job.data['socket_id'];
    		});
		});

		this._jobs.process('client', function (job, done) {
			//var socket = me._sockets.shift();
			var socket = me._socketHash[me._curr_socket];
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

/**
* Create new Kue Job, and link Job to Socket ID
*
*/
Worker.prototype.addClient = function(socket) {
	console.log('creating job');

	// this needs to block
	socket.on('amnt', function (data) {
		console.log(data.amnt);
	});

	this._sockets.push(socket);
	var socket_id = socket.id;
	this._socketHash[socket_id] = socket;
	this._jobs.create('client', {'socket_id':socket_id}).save();
};

Worker.prototype.updateHash = function(id, socket) {
	this._socketHash[id] = socket;
	// TODO: Add some sort of error checking here - does the id already exist?, etc
}

/**
 * Export the constructor.
 */

module.exports = Worker;
