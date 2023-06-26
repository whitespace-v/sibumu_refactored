const axios = require('axios')

/**
	 * Implementation of various ways to send error notifications
	 */
class Notify {
	#api = process.env.ERROR_API;
	#repeat = true;
	#name = 'Из Бразери';

	/**
			 * Send error log chunk in telegram bot
			 * @param {string} body - error body
			 * @param {boolean} [repeat] - send another notification after first
			 */
	async sendTelegram(body, repeat) {
		if (this.#api == undefined || this.#repeat == false)
			return

		axios.post(this.#api, {
			error: body,
			name: this.#name,
			date: (new Date()).toLocaleString()
		})

		if (repeat != undefined) {
			this.#repeat = repeat
		}
	}

	/**
		 * Log error in console
		 * @param {string} error - error
		 * @param {boolean} [repeat] - log after first
		 */
	logError(error, repeat) {
		if (this.#repeat == false)
			return

		console.error('ERROR:', (new Date()).toLocaleString(), '||', error)


		if (repeat != undefined) {
			this.#repeat = repeat
		}
	}

	static log(status, msg) {
		status = (status + ':').toUpperCase()
		console.log(status, (new Date()).toLocaleString(), '||', msg)
	}
}

module.exports = Notify
