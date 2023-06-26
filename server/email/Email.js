const nodemailer = require('nodemailer')
const Notify = require('../errors/Notify')

class Email {
	#transporter;

	constructor() {
		this.#transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: false,
			ignoreTLS: true,
			auth: {
				user: process.env.MAIL_USER_AUTH,
				pass: process.env.MAIL_PASSWORD
			},
			tls: { rejectUnauthorized: false }
		});
	}

	async sendEmail(content, subject, recipient = 'delivery@iz-brasserie.ru') {
		let info = await this.#transporter.sendMail({
			subject,
			from: process.env.MAIL_USER,
			to: recipient,
			html: content
		})
		Notify.log('email', `Message sent ${info.messageId}`)
	}
}

module.exports = Email
