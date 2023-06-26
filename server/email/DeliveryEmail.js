const Email = require('./Email')
const { delivery, items, itemsSpecials, restaurant, restaurantApi, products, database } = require('../models')

class DeliveryEmail extends Email {
	#id;
	#record;
	#inited = false;

	constructor(id) {
		super();
		this.#id = id;
	}

	async send() {
		await this.#init();
		let message = await this.#prepare()
		this.sendEmail(message, 'Новый заказ с сайта')
	}

	async #init() {
		if (this.#inited) return

		let response = await delivery.findOne({
			attributes: ['id', ['metadata', 'info']],
			where: { id: this.#id },
			include: [{
				model: items,
				attributes: ['id', 'items', 'iikoStatus'],
				include: {
					model: restaurant,
					attributes: ['name'],
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

		this.#record = response.toJSON()

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

	async #prepare() {
		let filteredItems = {}

		for (let item of this.#record.items) {
			let name = item.restaurant.name;
			if (item.iikoStatus == 'ERROR') {
				name += ' - ОШИБКА'
			}

			filteredItems[name] = await this.#getItemNames(item.items)
		}

		const info = this.#record.info.order;
		const wrap = this.#wrapBlock;

		let html = '<h1> Информация о покупателе:</h1>'

		html += wrap('p', 'Покупатель: ' + info.customer.name + ' ' + info.customer.surname)
		html += wrap('p', 'Номер телефона: ' + info.phone)
		html += wrap('p', 'Почта: ' + info.customer.email)
		info.payments
			&& info.payments.length > 0
			&& (html += wrap('p', 'Сумма оплаты: ' + info.payments[0].sum))

		info.payments
			&& info.payments.length > 0
			&& (html += wrap('p', 'Тип оплаты: ' + info.payments[0].paymentTypeName))

		info.completeBefore
			&& (html += wrap('p', 'Выполнить до: ' + info.completeBefore))

		switch (delivery.orderServiceType) {
			case 'DeliveryByClient':
				html += wrap('p', 'Самовывоз')
				break;
			case 'DeliveryByCourier':
				html += wrap('p', 'Доставка')
		}

		if (info.deliveryPoint) {
			html += wrap('h2', 'Адрес доставки:')
			const delivery = info.deliveryPoint.address
			html += wrap('p', 'Улица: ' + delivery.street.name)
			html += wrap('p', 'Дом: ' + delivery.house)
			delivery.entrance && (html += wrap('p', 'Подъезд: ' + delivery.entrance))
			delivery.floor && (html += wrap('p', 'Этаж: ' + delivery.floor))
			delivery.flat && (html += wrap('p', 'Квартира: ' + delivery.flat))
		}


		html += '<h1>Блюда:</h1>'

		for (let key in filteredItems) {
			html += wrap('h2', key)
			html += '<ul>'
			filteredItems[key].forEach(item => {
				html += wrap('li', `${item.name} - ${item.amount} шт.`)
			})
			html += '</ul>';
		}

		return html

	}
	async #getItemNames(initialItems) {
		let items = [...initialItems]
		if (!items.length) return

		for (let item of items) {
			let itemRecord = await products.findOne({
				attributes: [[database.json('product_json.name'), 'name']],
				where: {
					product_json: {
						id: item.productId
					}
				},
				raw: true
			})
			item.name = itemRecord.name
		}

		return items

	}

	#wrapBlock(block, str) {
		return `<${block}>${str}</${block}>`
	}


}

module.exports = DeliveryEmail
