const path = require('path');
const dbPath = path.join(__dirname, './models/');
const db = require(dbPath);

module.exports = class Initializer {

	async #createApi() {
		db.restaurantApi.upsert({
			id: 1,
			name: 'IzBrazzerie',
			apiLogin: process.env.IZBRAZZERIEAPILOGIN,
			organizationId: process.env.IZBRAZZERIEORGANIZATIONID
		})

		db.restaurantApi.upsert({
			id: 2,
			name: 'Sibumi',
			apiLogin: process.env.SIBUMIAPILOGIN,
			organizationId: process.env.SIBUMIORGANIZATIONID
		})

	}

	async #createRestoraunt() {
		db.restaurant.upsert({
			id: 1,
			name: 'IzBrazzerie',
			restaurantApiId: 1,
			terminalGroupId: process.env.IZBRAZERIETERMINALID
		})

		db.restaurant.upsert({
			id: 2,
			name: 'Sibumi',
			restaurantApiId: 2,
			terminalGroupId: process.env.SIBUMITERMINALID
		})

		db.restaurant.upsert({
			id: 3,
			name: 'Konditory1',
			restaurantApiId: 1,
			terminalGroupId: process.env.KONDITORY1TERMINALID
		})

		db.restaurant.upsert({
			id: 4,
			name: 'Konditory2',
			restaurantApiId: 2
		})
	}

	async initialize() {
		await this.#createApi()
		await this.#createRestoraunt()
	}
}
