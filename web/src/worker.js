
/**
 * Worker constructor.
 *
 * @param {jobs} Job from kue
 * @api public
 */

function Worker (jobs) {
	this._processing = false;
	this._jobs = jobs;
}

/**
 * Begins processing kue jobs
 *
 * @api public
 */

Worker.prototype.start = function() {
	if (!this._processing) {
		this._processing = true;
		this.processJobs();
	}
};

/**
 * Processes kue jobs
 *
 * @api private
 */

Worker.prototype.processJobs = function() {
	console.log('Worker processing');
};

/**
 * Export the constructor.
 */

module.exports = Worker;
