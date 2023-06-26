const axios = require('axios')
const path = require('path');
const dbPath = path.join(__dirname, '../models/');
const db = require(dbPath);
const Notify = require('../errors/Notify')

module.exports = class CatalogFetcher {
	// Конструктор, куда мы передаем айди ресторана и его apiLogin для будущих вызовов функций
	constructor(restaurantApiId) {
		this.restaurantApiId = restaurantApiId
	}

	/**
	 * [Получаем товары и категории ресторана по его айди]
	 * @param {[Object]} req [Тело пришедшего запроса] 
	 * @param {[Object]} res [Ответ на пришедший запрос]
	 */
	async getProducts() {
		let resApiId = this.restaurantApiId

		// Находим в БД айди организации, к которой относится конкретный ресторан
		let organizationId = await db.restaurantApi.findOne({
			attributes: ['organizationId'],
			where: {
				id: resApiId
			}
		})

		// Получаем токен для обмена из БД
		let token = await db.restaurantApi.findOne({
			attributes: ['token'],
			where: {
				id: resApiId
			}
		})

		// Заполняем информацию, нужную для запроса (токен + айди организации)
		let body = {
			"organizationId": organizationId.organizationId,
		};

		// Отправляем запрос в айку
		let data = await axios.post('https://api-ru.iiko.services/api/1/nomenclature', body, {               
			headers: {
				Authorization: "Bearer " + token.token
			}
		})              

		

		await data.data.groups.forEach(async function (element) {
			var prefixCheck = (element.name[0] != '-' && element.name[0] != "@");
			if (element.parentGroup == process.env.IZBRAZZERIEGROUPID && prefixCheck) {                // Если категория относится к ресторану по parentGroup
				await db.category.upsert({                                              // то записываем её в БД со связью к ресторану
					id: element.id,
					name: element.name,
					restaurantId: 1
				})

			} else if (element.parentGroup == process.env.KONDITORY1GROUPID && prefixCheck) {
				await db.category.upsert({
					id: element.id,
					name: element.name,
					restaurantId: 3
				})

			} else if (element.parentGroup == process.env.SIBUMIGROUPID && prefixCheck) {
				await db.category.upsert({
					id: element.id,
					name: element.name,
					restaurantId: 2
				})
			} else if (element.parentGroup == process.env.KONDITORY2GROUPID && prefixCheck) {
				await db.category.upsert({
					id: element.id,
					name: element.name,
					restaurantId: 4
				})
			}

			var specialPrefixActive = element.name[0] == '@';
			var specialPrefixInactive = element.name[0] == '-' && element.name[1] == '@';
			// var categoryURL = "test";
			
			if (element.parentGroup == process.env.IZBRAZZERIEGROUPID && specialPrefixActive) { 
				await db.specialCategory.upsert({                                              
					id: element.id,
					name: element.name.split(']')[1],
					restaurantId: 1,
					isActive: true,
					URL: element.name.match(/\[([^\][]*)]/g)[0].slice(1, -1),
					isNested: false 
				})
			} else if (element.parentGroup == process.env.KONDITORY1GROUPID && specialPrefixActive) {
				await db.specialCategory.upsert({
					id: element.id,
					name: element.name.split(']')[1],
					restaurantId: 3,
					isActive: true,
					URL: element.name.match(/\[([^\][]*)]/g)[0].slice(1, -1), 
					isNested: false
				})

			} else if (element.parentGroup == process.env.SIBUMIGROUPID && specialPrefixActive) {
				await db.specialCategory.upsert({
					id: element.id,
					name: element.name.split(']')[1],
					restaurantId: 2,
					isActive: true,
					URL: element.name.match(/\[([^\][]*)]/g)[0].slice(1, -1),
					isNested: false, 

				})
			} else if (element.parentGroup == process.env.KONDITORY2GROUPID && specialPrefixActive) {
				await db.specialCategory.upsert({
					id: element.id,
					name: element.name.split(']')[1],
					restaurantId: 4,
					isActive: true,
					URL: element.name.match(/\[([^\][]*)]/g)[0].slice(1, -1),
					isNested: false 
				})
			}

			//------------------------------------------------------------------------------

			if (element.parentGroup == process.env.IZBRAZZERIEGROUPID && specialPrefixInactive) { 
				await db.specialCategory.upsert({                                              
					id: element.id,
					name: element.name.split(']')[1],
					restaurantId: 1,
					isActive: false,
					URL: element.name.match(/\[([^\][]*)]/g)[0].slice(1, -1),
					isNested: false 
				})

			} else if (element.parentGroup == process.env.KONDITORY1GROUPID && specialPrefixInactive) {
				await db.specialCategory.upsert({
					id: element.id,
					name: element.name.split(']')[1],
					restaurantId: 3,
					isActive: false,
					URL: element.name.match(/\[([^\][]*)]/g)[0].slice(1, -1),
					isNested: false 
				})

			} else if (element.parentGroup == process.env.SIBUMIGROUPID && specialPrefixInactive) {
				await db.specialCategory.upsert({
					id: element.id,
					name: element.name.split(']')[1],
					restaurantId: 2,
					isActive: false,
					URL: element.name.match(/\[([^\][]*)]/g)[0].slice(1, -1),
					isNested: false 
				})
			} else if (element.parentGroup == process.env.KONDITORY2GROUPID && specialPrefixInactive) {
				await db.specialCategory.upsert({
					id: element.id,
					name: element.name.split(']')[1],
					restaurantId: 4,
					isActive: false,
					URL: element.name.match(/\[([^\][]*)]/g)[0].slice(1, -1),
					isNested: false 
				})
			}
		})

		// Берем текущую категорию, которую только что записали в БД
		var tempCategories = await db.category.findAll({                                    
			attributes: ['id', 'restaurantId'],
		})

		var tempSpecialCategory = await db.specialCategory.findAll({
			attributes: ['id', 'restaurantId']
		})

		await data.data.products.forEach(async function (element) {                         
			var tempSpecialProducts = await db.specialProducts.findOne({
				attributes: ['id', 'product_json'],
				where: {
					product_json: {
						code: element.code
					}
				}
			})

			const notify = new Notify();

			// Если такой итерируемый товар уже есть в БД, то перезаписываем его данные
			if (tempSpecialProducts) {                                                             
				tempSpecialCategory.forEach(category => {
					if (tempSpecialProducts.product_json.parentGroup == category.id) {
						db.specialProducts.upsert({
							id: tempSpecialProducts.id,
							product_json: element,
							specialCategoryId: category.id,
							isOnStop: false,
							cost_per_gram: element.name[0] == '+' ? true : false 
						}).catch(err => { notify.logError(err) })
					}
				})

			// Если такой товар к нам пришел впервые, то добавляем его в БД
			} else {                                                                        
				if (element.parentGroup != "819e2688-a852-455e-8ed8-02b4e47deba0" && element.parentGroup != null && element.parentGroup != "3571924f-a2ef-4595-83df-61af86c1c2f0" && element.parentGroup != "13a7aa9a-b4c5-43bd-8755-1d2303519d51" && element.parentGroup != "2420bea5-453d-4982-8c35-5783413b909c" && element.parentGroup != "37bc09cd-66e1-4e0b-a7c3-e68503e9f01d" && element.parentGroup != "46ebfd71-5200-4584-8866-15d86ae4349b" && element.parentGroup != "79ff876c-3838-49c7-8d23-71d8e0809d2f" && element.parentGroup != "de0fefed-0add-49fd-9b15-5f0b3c6fabec" && element.parentGroup != "95d4842c-977b-45be-b3f0-d40542858a27" && element.parentGroup != "8b49e54b-571f-4e3f-ad12-481167140453" && element.parentGroup != "8ea9147e-36a9-4d08-bd8d-0cf4c7e39151" && element.parentGroup != "bee8c40d-557d-47c2-8bb1-3341e05f9473" && element.parentGroup != "090b7f0f-5cf6-48ce-af53-292bf7311421" && element.parentGroup != "74ec6b37-60ea-454c-a613-44d82cc232b6" && element.parentGroup != "dbc9cd7a-105a-4798-9bf4-eeb8c55974bb" && element.parentGroup != "b20707f6-cc2b-491d-a25b-d739e64b9b31" && element.parentGroup != "b20707f6-cc2b-491d-a25b-d739e64b9b31" && element.parentGroup != "a70e473c-84e0-43b4-99ec-6669650eb659" && element.parentGroup != "854e9100-43c4-4a41-96b5-df3ade1bf6c5" && element.parentGroup != "6d14f671-086e-4401-b0c0-18a071ac59d7" && element.parentGroup != "2719fa61-6e8f-4a12-93bd-10e893494f30" && element.parentGroup != "f966be72-fbf9-470a-8f8a-055048e9a12c" && element.parentGroup != "91eae6b9-18ae-4854-b01f-cbc7140c18fc" && element.parentGroup != "07fdbe8e-4526-4e14-a741-12ab261181f8")
					await db.specialProducts.upsert({
						product_json: element,
						specialCategoryId: element.parentGroup == "dc1d6920-dd8e-434b-a44b-ddaa2357b186" ? "27943af2-bdd7-445b-87ed-6c5953999840" : element.parentGroup,
						isOnStop: false,
						cost_per_gram: element.name[0] == '+' ? true : false 
					}).catch(err => { console.log('ОШИБКА ЗАПИСИ В БД') })
			}
		})

		// -------------------------------------------------------------------------

		// Пытаемся найти текущий итерируемый товар в БД
		await data.data.products.forEach(async function (element) {                         
			var tempProducts = await db.products.findOne({
				attributes: ['id', 'product_json'],
				where: {
					product_json: {
						code: element.code
					}
				}
			})

			const notify = new Notify();

			// Если такой итерируемый товар уже есть в БД, то перезаписываем его данные
			if (tempProducts) {                                                             
				tempCategories.forEach(category => {
					if (tempProducts.product_json.parentGroup == category.id) {
						db.products.upsert({
							id: tempProducts.id,
							product_json: element,
							categoryId: category.id,
							isOnStop: false,
							cost_per_gram: element.name[0] == '+' ? true : false 
						}).catch(err => { notify.logError(err) })
					}
				})

			// Если такой товар к нам пришел впервые, то добавляем его в БД
			} else {                                                                        
				if (element.parentGroup != "819e2688-a852-455e-8ed8-02b4e47deba0" && element.parentGroup != null && element.parentGroup != "3571924f-a2ef-4595-83df-61af86c1c2f0" && element.parentGroup != "13a7aa9a-b4c5-43bd-8755-1d2303519d51" && element.parentGroup != "2420bea5-453d-4982-8c35-5783413b909c" && element.parentGroup != "37bc09cd-66e1-4e0b-a7c3-e68503e9f01d" && element.parentGroup != "46ebfd71-5200-4584-8866-15d86ae4349b" && element.parentGroup != "79ff876c-3838-49c7-8d23-71d8e0809d2f" && element.parentGroup != "de0fefed-0add-49fd-9b15-5f0b3c6fabec" && element.parentGroup != "95d4842c-977b-45be-b3f0-d40542858a27" && element.parentGroup != "8b49e54b-571f-4e3f-ad12-481167140453" && element.parentGroup != "8ea9147e-36a9-4d08-bd8d-0cf4c7e39151" && element.parentGroup != "bee8c40d-557d-47c2-8bb1-3341e05f9473" && element.parentGroup != "090b7f0f-5cf6-48ce-af53-292bf7311421" && element.parentGroup != "74ec6b37-60ea-454c-a613-44d82cc232b6" && element.parentGroup != "dbc9cd7a-105a-4798-9bf4-eeb8c55974bb" && element.parentGroup != "b20707f6-cc2b-491d-a25b-d739e64b9b31" && element.parentGroup != "b20707f6-cc2b-491d-a25b-d739e64b9b31" && element.parentGroup != "a70e473c-84e0-43b4-99ec-6669650eb659" && element.parentGroup != "854e9100-43c4-4a41-96b5-df3ade1bf6c5" && element.parentGroup != "6d14f671-086e-4401-b0c0-18a071ac59d7" && element.parentGroup != "2719fa61-6e8f-4a12-93bd-10e893494f30" && element.parentGroup != "f966be72-fbf9-470a-8f8a-055048e9a12c" && element.parentGroup != "91eae6b9-18ae-4854-b01f-cbc7140c18fc" && element.parentGroup != "07fdbe8e-4526-4e14-a741-12ab261181f8")
					await db.products.upsert({
						product_json: element,
						categoryId: element.parentGroup == "dc1d6920-dd8e-434b-a44b-ddaa2357b186" ? "27943af2-bdd7-445b-87ed-6c5953999840" : element.parentGroup,
						isOnStop: false,
						cost_per_gram: element.name[0] == '+' ? true : false 
					}).catch(err => { console.log('ОШИБКА ЗАПИСИ В БД') })
			}
		})
	}

	/**
	 * [Получаем стоп-лист товаров для всех ресторанов и перезаписываем БД]
	 */
	async getStopList() {
		// Получаем айди апи ресторана для поиска айди организации
		let resApiId = this.restaurantApiId                                                         

		let organizationId = await db.restaurantApi.findOne({
			attributes: ['organizationId'],
			where: {
				id: resApiId
			}
		})

		// Получаем токен для обмена из БД
		let token = await db.restaurantApi.findOne({
			attributes: ['token'],
			where: {
				id: resApiId
			}
		})

		// Заполняем информацию, нужную для запроса (токен + айди организации)
		let body = {
			"organizationIds": [organizationId.organizationId],
		};

		try {
			// Отправляем запрос в айку
			let data = await axios.post('https://api-ru.iiko.services/api/1/stop_lists', body, {
				headers: {
					Authorization: "Bearer " + token.token
				}
			})

			const notify = new Notify();
			
			await data.data.terminalGroupStopLists.forEach(async function (element) {
				element.items.forEach(element => {
					element.items.forEach(async function (element) {
						if (element.balance <= 0) {
							let tempProduct = await db.products.findOne({
								attributes: ['id', 'product_json'],
								where: {
									product_json: {
										id: element.productId
									}
								}
							})

							let tempSpecialProduct = await db.specialProducts.findOne({
								attributes: ['id', 'product_json'],
								where: {
									product_json: {
										id: element.productId
									}
								}
							})

							if (tempProduct) {
								await db.products.update({ isOnStop: true }, { where: { product_json: { id: element.productId } } })
									// .then(console.log("Stop-list updated!"))
									.catch(err => { notify.logError(err) })
							}

							if (tempSpecialProduct) {
								await db.specialProducts.update({ isOnStop: true }, { where: { product_json: { id: element.productId } } })
									// .then(console.log("Stop-list updated!"))
									.catch(err => { notify.logError(err) })
							}
						}
					})
				})
			})
			console.log("Stop-list fully updated");
			
		} catch (err) {
			console.log(err);
		}
	}
}
