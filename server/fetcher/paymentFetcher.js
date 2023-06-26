const axios = require('axios')
const qs = require('qs')

class PaymentFetcher {
	async registerOrder(id, price, url) {
		let response = await axios.request({
			url: 'https://securepayments.sberbank.ru/payment/rest/register.do',
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: qs.stringify({
				"userName": process.env.PAYMENT_LOGIN,
				"password": process.env.PAYMENT_PASSWORD,
				"orderNumber": id,
				"amount": price * 100,
				"currency": "643",
				"language": "ru",
				"returnUrl": process.env.PAYMENT_RETURN + `/${url}`
			})
		})
			console.log(response)
		return {url: response.data.formUrl, id: response.data.orderId}
	}

	async getOrderStatus(id) {
		let response = await axios.request({
			url: 'https://securepayments.sberbank.ru/payment/rest/getOrderStatusExtended.do',
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: qs.stringify({
				"userName": process.env.PAYMENT_LOGIN,
				"password": process.env.PAYMENT_PASSWORD,
				"orderId": id,
				"language": "ru",
			})			
		})
		return {status: response.data.orderStatus}
	}

}

module.exports = new PaymentFetcher()
