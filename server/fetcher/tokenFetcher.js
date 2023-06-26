const axios = require('axios')
const path = require('path');
const dbPath = path.join(__dirname, '../models/');
const db = require(dbPath);

module.exports = class TokenFetcher {
	// Конструктор, куда мы передаем айди ресторана и его apiLogin для будущих вызовов функций
	constructor(restaurantId, apiLogin) {
		this.restaurantId = restaurantId
		this.apiLogin = apiLogin
	}

	/**
	 * [Получаем Token для обмена с IIKO и записываем его в БД]
	 * @param {[Object]} req [Тело пришедшего запроса] 
	 * @param {[Object]} res [Ответ на пришедший запрос]
	 */
	async getToken() {
		let body = {
			apiLogin: this.apiLogin
		};

		let resId = this.restaurantId
		let apiLogin = this.apiLogin

		try {
			let data = await axios.post('https://api-ru.iiko.services/api/1/access_token', body) // Отправка запроса
			return await db.restaurantApi.update({ token: data.data.token }, { where: { apiLogin: apiLogin } })   // Обновление данных в БД

		} catch (err) {
			console.log(err);
		}
	}
}
