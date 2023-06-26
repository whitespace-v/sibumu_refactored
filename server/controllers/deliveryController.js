const { delivery, items, products,
	user, category, restaurant,
	restaurantApi, database, specialProducts, specialCategory, itemsSpecials } = require('./../models')

const DeliveryEmail = require('../email/DeliveryEmail')
const apiFetcher = require('./../fetcher/apiFetcher')
const paymentFetcher = require('./../fetcher/paymentFetcher')
const apiError = require('./../errors/ApiError')
const Notify = require('./../errors/Notify')
const format = require('date-format');


class deliveryController {
	async create(req, res, next) {
		// Ошибка если тело пустое
		if (req.body.length == 0) {
			next(apiError.badRequest('No body'))
		}

		// Переменные с тела
		let { metadata, data } = req.body

		// Массив айди апишек ресторана
		let restorauntIds = await restaurantApi.findAll({
			attributes: ['id'],
			raw: true
		})

		// Объект, в котором будут лежать рассортированные по айкам и кассам товары
		let deliveryItems = {};

		// Инициализация массива пустыми объектами
		for (let index in restorauntIds) {
			let id = restorauntIds[index].id
			deliveryItems[id] = {}
		}

		// Инклюды запроса ниже
		const include = {
			model: category,
			attributes: ['id'],
			include: {
				model: restaurant,
				attributes: ['id', 'terminalGroupId'],
				include: {
					model: restaurantApi,
					attributes: ['id']
				}
			}
		}

		const includeSpecials = {
			model: specialCategory,
			attributes: ['id'],
			include: {
				model: restaurant,
				attributes: ['id', 'terminalGroupId'],
				include: {
					model: restaurantApi,
					attributes: ['id']
				}
			}
		}

		for (let index in data) {
			// Находим товар
			let item;

			if (data[index].special) {
				item = await specialProducts.findOne({
					attributes: ['id', 'product_json'],
					where: { 'id': data[index].id },
					include: includeSpecials,
				})
			} else {
				item = await products.findOne({
					attributes: ['id', 'product_json'],
					where: { 'id': data[index].id },
					include: include,
				})
			}
			// Получаем его в читаемом виде
			let parsedItem = JSON.parse(JSON.stringify(item))
			let product = parsedItem.product_json
			if (data[index].special) {
				item.category = item.specialCategory
			}
			// Айди айки, к которой привязан данный продукт
			let apiId = item.category.restaurant.restaurantApi.id
			// Айди кассы, к которому принадлежит данный продукт
			let terminalId = item.category.restaurant.terminalGroupId
			// Количество продукта
			let amount = data.find(item => item.id == parsedItem.id)
			// Цена
			let price = parsedItem.product_json.sizePrices[0].price.currentPrice;

			// Инициализация массива, если он до этого не был инициализирован
			if (deliveryItems[apiId][terminalId] == undefined)
				deliveryItems[apiId][terminalId] = {}

			if (data[index].special) {
				if (!deliveryItems[apiId][terminalId]["special"]) {
					deliveryItems[apiId][terminalId]["special"] = []
				}
				deliveryItems[apiId][terminalId]["special"].push({
					productId: product.id,
					amount: amount.count,
					type: "Product",
					price: price,
				})
			} else {
				if (!deliveryItems[apiId][terminalId]["nonspecial"]) {
					deliveryItems[apiId][terminalId]["nonspecial"] = []
				}
				deliveryItems[apiId][terminalId]["nonspecial"].push({
					productId: product.id,
					amount: amount.count,
					type: "Product",
					price: price,
				})
			}


		}

		console.log(deliveryItems[1])

		// Создание пользователя для последующей работы с почтой
		let userInfo = await user.upsert({ email: metadata.customer.email.toLowerCase(), mailSubscription: req.body.emailSubscription })
		let parsedUser = JSON.parse(JSON.stringify(userInfo))

		if (metadata.completeBefore) {
				let date = new Date(metadata.completeBefore)
				metadata.completeBefore = format.asString('yyyy-mm-dd hh:mm:ss.SSS', date)
		}

		// Создание заказа
		let order = await delivery.create({
			urlId: '',
			metadata: metadata,
			userId: parsedUser[0].id
		})

		let parsedOrder = JSON.parse(JSON.stringify(order))

		// Итоговая сумма заказа, которая потом уйдет в эквайринг
		let totalSum = 0;

		for (const key in deliveryItems) {
			for (const subkey in deliveryItems[key]) {
				if (deliveryItems[key][subkey].length <= 0)
					continue

				const terminal = await restaurant.findOne({
					attributes: ['id'],
					where: { terminalGroupId: subkey },
					raw: true
				})

				console.log(deliveryItems[key][subkey])

				if (deliveryItems[key][subkey]["special"] && deliveryItems[key][subkey]["special"].length > 0) {
					await itemsSpecials.create({
						items: deliveryItems[key][subkey]["special"],
						deliveryId: parsedOrder.id,
						restaurantId: terminal.id,
						// terminalGroupId: subkey
					})
					totalSum += deliveryItems[key][subkey]["special"]
						.reduce((accum, curr) => accum + curr.price * curr.amount, 0)
				}

				if (deliveryItems[key][subkey]["nonspecial"] && deliveryItems[key][subkey]["nonspecial"].length > 0) {
					await items.create({
						items: deliveryItems[key][subkey]["nonspecial"],
						deliveryId: parsedOrder.id,
						restaurantId: terminal.id,
						// terminalGroupId: subkey
					})
					totalSum += deliveryItems[key][subkey]["nonspecial"]
						.reduce((accum, curr) => accum + curr.price * curr.amount, 0)
				}
			}
		}
		let deliveryEmail = new DeliveryEmail(parsedOrder.id)
		setTimeout(() => {
			deliveryEmail.send()
		}, 30000)

		if (metadata.payment == 'SITE') {
			let ret = await paymentFetcher.registerOrder(parsedOrder.id, totalSum, parsedOrder.urlId)
			await delivery.upsert({ id: parsedOrder.id, paymentId: ret.id, paymentStatus: 0 })
			res.json({ url: ret.url })
		} else {
			const fetcher = new apiFetcher(parsedOrder.id)
			fetcher.createDelivery()
			res.json({ url: process.env.PAYMENT_RETURN + parsedOrder.urlId })
		}
	}


	async get(req, res, next) {
		let { id } = req.params
		Notify.log('id', id)

		if (id == undefined) {
			next(apiError.badRequest('Id is undefiend'))
		}

		let del = await delivery.findOne({
			where: { 'urlId': id },
			attributes: ['id', 'paymentId', 'paymentStatus'],
			include: [{
				model: items,
				attributes: ['id', 'items']
			}, {
				model: itemsSpecials,
				attributes: ['id', 'items']
			}]
		})

		let parsedDel = JSON.parse(JSON.stringify(del))

		if (parsedDel == null || parsedDel.length <= 0) {
			console.log('err')
			next(apiError.badRequest('Order does not exist'))
		}

		if (parsedDel.paymentStatus == false) {
			const { status } = await paymentFetcher.getOrderStatus(parsedDel.paymentId);
			if (status == 2) {
				Notify.log('SUCCESS', 'Payment is successful. Updating database and send order in iiko')
				delivery.upsert({ id: parsedDel.id, paymentStatus: 1 })
				const fetcher = new apiFetcher(parsedDel.id)
				await fetcher.createDelivery()
			} else {
				Notify.log('ERROR', 'Payment is not successful')
			}
		}

		let litems = parsedDel.items
		let lspecials = parsedDel.itemsSpecials
		let lproducts = []

		litems.length && litems.forEach(element => {
			lproducts.push(...element.items.map(element => {
				return {
					id: element.productId,
					count: element.amount,
					price: element.price,
					sum: element.amount * element.price,
					special: false
				}
			}
			))
		})

		lspecials.length && lspecials.forEach(element => {
			lproducts.push(...element.items.map(element => {
				return {
					id: element.productId,
					count: element.amount,
					price: element.price,
					sum: element.amount * element.price,
					special: true
				}
			}
			))
		})


		for (let index in lproducts) {
			let prod;
			if (lproducts[index].special) {
				prod = await specialProducts.findOne({
					attributes: [[database.json('product_json.imageLinks'), 'img'], [database.json('product_json.name'), 'name']],
					where: {
						product_json: {
							id: lproducts[index].id
						}
					},
					raw: true
				})
			} else {
				prod = await products.findOne({
					attributes: [[database.json('product_json.imageLinks'), 'img'], [database.json('product_json.name'), 'name']],
					where: {
						product_json: {
							id: lproducts[index].id
						}
					},
					raw: true
				})
			}

			prod.img = prod.img.slice(2, -2)
			lproducts[index].img = prod.img
			lproducts[index].name = prod.name

		}

		let sum = lproducts.reduce((acc, cur) => acc + cur.price * cur.count, 0)

		res.json({ items: lproducts, sum: sum, id: parsedDel.id })
	}
}

module.exports = new deliveryController()
