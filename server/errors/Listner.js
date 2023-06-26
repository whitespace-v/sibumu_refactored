const axios = require('axios')
const nodemailer = require('nodemailer')
const { products, database, items, delivery, restaurant, restaurantApi } = require('../models')
const { Op } = require('sequelize')
const Notify = require('../errors/Notify')

/**
 * Listens to the answer from iiko.
 * If the response is successful, then nothing happens.
 * Otherwise sends an email to the manager with the content of the order.
 * @param {Number} maxCallbacks [Maximum requests before receiving a meaningful response]
 * @param {Number} iikoOrderId [Id of the iiko order]
 * @param {Number} itemsId [Id of the items]
 */
class Listner {
	#timer = 0;
	#interval;
	#maxCallbacks;
	#id;
	#itemsId;
	#record;
	#inited = false;

	constructor(maxCallbacks, iikoOrderId, itemsId) {
		this.#maxCallbacks = maxCallbacks
		this.#id = iikoOrderId;
		this.#itemsId = itemsId;
	}

	/**
	 * Fetch iiko deliveries and check answer
	 */
	async fetch() {
		!this.#inited && await this.#init()
		var method = this.#intervalFunction.bind(this);
		this.#interval = setInterval(method, 4000)
	}

	/**
	 * Real fetch function
	 */
	async #intervalFunction() {
		if (this.#timer == this.#maxCallbacks)
			clearInterval()

		let response = await axios.post('https://api-ru.iiko.services/api/1/deliveries/by_id', {
			organizationId: this.#record.restaurant.restaurantApi.organizationId,
			orderIds: [this.#id]
		}, {
			headers: {
				Authorization: "Bearer " + this.#record.restaurant.restaurantApi.token,
			}
		})

		if (response.data.orders[0].creationStatus === 'Success') {
			Notify.log('success', `order ${this.#id} send sent to iiko.`)
				items.upsert({id: this.#itemsId, iikoStatus: 'SUCCESS'})
			clearInterval(this.#interval)
		} else if (response.data.orders[0].creationStatus === 'Error') {
			Notify.log('error', `order ${this.#id} failed. Redirrect problem to manager.`)
			Notify.log('error-log', response.data.orders[0])
			items.upsert({id: this.#itemsId, iikoStatus: 'ERROR'})
			clearInterval(this.#interval)
		}
		this.#timer++;
	}

	/**
	 * Send email on failure
	 */
	async #init() {
		const api = await items.findOne({
			attributes: ['id', 'items'],
			where: { id: this.#itemsId },
			include: [{
				model: restaurant,
				attributes: ['id', 'name'],
				include: {
					model: restaurantApi,
					attributes: ['token', 'organizationId']
				}
			},
			{
				model: delivery,
				attributes: ['id', 'metadata'],
			}]
		})
		this.#record = api.toJSON()
		this.#inited = true;
	}

}

module.exports = Listner
