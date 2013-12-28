
/**
 * Worker constructor.
 *
 * @param {jobs} Job from kue
 * @api public
 */

function Worker (jobs) {
	var _processing = false;
	var _jobs = jobs;

	/**
	 * Processes kue jobs
	 *
	 * @api privileged
	 */

	this.processJobs = function () {
		console.log('Worker processing');
	};
}

/**
 * Begins processing kue jobs
 *
 * @api public
 */

Worker.prototype.start = function () {
	if (!this._processing) {
		this._processing = true;
		this.processJobs();
	}
};

/**
 * Export the constructor.
 */

module.exports = Worker;
