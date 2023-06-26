const axios = require('axios')
const path = require('path');
const {Op} = require('sequelize')
const dbPath = path.join(__dirname, '../models/');
const db = require(dbPath);


// Класс, используемый для загрузки меню в зависимости от айди ресторана
class getProducts {
	async loadProducts(req, res) {
		try {
			// Получаем айди ресторана
			const restaurantId = req.params.id

			// Массив товаров и категорий для отправки
			let dataToSend = [];

			// Берем все категории нужного ресторана
			let categories = await db.category.findAll({
				attributes: ['id', 'name'],
				where: {
					restaurantId: restaurantId,
					name: {
							[Op.notLike]: '-%'
					},
					// name: {
					// 	[Op.notLike]: '%Новый%'
					// },
					// name: {
					// 	[Op.notLike]: '%- Закуски рыбные (сакана)%'
					// }
				}
			})

			// Перебираем все категории ресторана и ищем продукты, которые относятся к этой категории
			categories.forEach(async function (category) {
				let productsArray = []
				let products = await db.products.findAll({
					attributes: ['id', 'product_json', 'cost_per_gram'],
					where: {
						categoryId: category.id,
						isOnStop: false,
					}
				})

				// Приводим объект товара к нужному для выгрузки виду
				products.forEach(element => { 
					if(element.product_json.name[0] == '+') {
						// Вырезаем префикс плюса из названия блюда
						element.product_json.name = element.product_json.name.substring(2, element.product_json.name.lenght)
					}				

					// Товары с префиксом "-" не должны загружаться в каталог
					if(element.product_json.name[0] != '-') {
						var tempObj = {
							id: element.id,
							iiko_id: element.product_json.id,
							name: element.product_json.name,
							description: "Состав: рыба, рис", // Описание используется только в карточке товара, тут заглушка                                                       
							prise: element.product_json.sizePrices[0].price.currentPrice,
							availability: 500,
							img_elem: element.product_json.imageLinks == (null || undefined) ? "" : element.product_json.imageLinks[0], 
							img_png_elem: element.product_json.imageLinks == (null || undefined) ? "" : element.product_json.imageLinks[0], 
							gramm: element.cost_per_gram
						}

						productsArray.push(tempObj);
					}
				})

				// Добавляем массив таких товаров в поле объекта категории
				let categoryObj = {                                                                             
					id: category.id,
					text_button: category.name,
					products: productsArray
				}

				// Добавляем категорию с товарами в массив для отправки
				dataToSend.push(categoryObj)
			})

			// Костыль асинхронности - создаем задержку, дабы массив заполнился товарами и категориями
			setTimeout(() => {
				res.send(JSON.stringify(dataToSend))
				return 1;
			}, 500);
			
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = new getProducts()
