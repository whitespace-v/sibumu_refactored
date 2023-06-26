const axios = require('axios')
const { delivery, items, restaurantApi, restaurant, itemsSpecials } = require('./../models')
const Listner = require('../errors/Listner')
const Notify = require('../errors/Notify')


class apiFetcher {
	#id;
	#record;
	#inited = false;


	constructor(id) {
		this.#id = id;
	}

	async init() {
		const api = await delivery.findOne({
			attributes: ['id', 'metadata'],
			where: { id: this.#id },
			include: [{
				model: items,
				attributes: ['id', 'items'],
				include: {
					model: restaurant,
					attributes: ['id', 'terminalGroupId'],
					include: {
						model: restaurantApi,
						attributes: ['token', 'organizationId']
					}
				}
			}, {
				model: itemsSpecials,
				attributes: ['id', 'items'],
				include: {
					model: restaurant,
					attributes: ['id', 'terminalGroupId'],
					include: {
						model: restaurantApi,
						attributes: ['token', 'organizationId']
					}
				}
			}]
		})

		this.#record = api.toJSON()
		if (this.#record.items.length < 0) {
			this.#record.items = this.#record.itemsSpecials
		} else {
			this.#record.itemsSpecials.length && this.#record.itemsSpecials.forEach(special => {
				const index = this.#record.items.findIndex(nonspecial =>
					nonspecial.restaurant.terminalGroupId === special.restaurant.terminalGroupId
				)
				if (index != -1) {
					this.#record.items[index].items = this.#record.items[index].items.concat(special.items)
				}
			})
		}

		this.#inited = true;
	}

	async createDelivery() {
		!this.#inited && await this.init()

		const metadata = this.#record.metadata;

		this.#record.items.length > 0 && this.#record.items.forEach(async item => {
			const sum = item.items.reduce((accum, curr) => accum + curr.price * curr.amount, 0)
			const { token, organizationId } = item.restaurant.restaurantApi

			let type;

			switch (metadata.payment) {
				case "CASH":
					type = "Cash"
					break;
				case "BNCUR":
					type = "Card"
					break;
				case "SITE":
					type = "Card"
					break;
				default:
					type = "Cash"
			}

			const paymentType = await this.getPaymentTypes(metadata.payment, organizationId, token)

			const body = {
				organizationId,
				terminalGroupId: item.restaurant.terminalGroupId,
				order: {
					...metadata,
					externalNumber: this.#record.id,
					payments: [
						{
							paymentTypeKind: type,
							sum: sum,
							paymentTypeId: paymentType.id,
							paymentTypeName: paymentType.name
						}
					],
					items: item.items,
				}
			}

			// FIXME: этому тут точно не место
			await delivery.upsert({
				id: this.#id,
				metadata: body
			})

			let response =
				await axios.post(
					'https://api-ru.iiko.services/api/1/deliveries/create',
					body,
					{
						headers: {
							Authorization: "Bearer " + item.restaurant.restaurantApi.token,
							Timeout: 60
						}
					})


			const infoId = response.data.orderInfo.id;
			const listner = new Listner(10, infoId, item.id)
			listner.fetch()

		})

	}

	async getPaymentTypes(code, id, token) {
		let body = {
			organizationIds: [id]
		}

		let response = await axios.post('https://api-ru.iiko.services/api/1/payment_types', body, {
			headers: {
				Authorization: "Bearer " + token,
			}
		})

		let data = response.data.paymentTypes;

		let result = data.find(element => element.code == code)

		return { id: result.id, name: result.name }
	}
}

module.exports = apiFetcher
