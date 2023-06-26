const axios = require('axios')
const { database, products } = require('../models')
const Notify = require('../errors/Notify')


class imageFetcher {
	async #getItems() {
		let items =
			await products.findAll({
				attributes: ["product_json"],
				raw: true
			})
		items = items.map(item => { return { ...item.product_json } })

		return {
			images: items.map(item => {
				return {
					productId: item.id, link: item.imageLinks.length > 0 ?
						item.imageLinks[0] : ""
				}
			})
		}
	}

	async synchronize() {
		const { images } = await this.#getItems()

		const result = this.#splitIntoChunk(images, 10);

		// TOOD: убрать хардкод ссылок на картинки
		for (let image of result) {
			await axios.post('https://images.iz-brasserie.ru/upload', {
				images: image
			}, {timeout: 600000})
		}
	}

	#splitIntoChunk(arr, chunk) {

		let temp = []

		while (arr.length > 0) {
			temp.push(arr.splice(0, chunk))
		}
		return temp;
	}

}

module.exports = imageFetcher
