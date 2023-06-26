// Booking controller
const {mails} = require('./../models');
const nodemailer = require('nodemailer')

// Класс для отправки сообщений
class bookingController {

    // Получаем данные с формы
    async create(req, res, next) {
        if (req.body.length == 0) {
			next(apiError.badRequest('No body'))
		}

        // console.log(req.body.dataToSend)
        // Данные от клиента
		let data = req.body.dataToSend
        let restaurantName;
        switch (data.place) {
            case 1:
                restaurantName = "Сибуми";
                break;
            case 2:
                restaurantName = "Браззери";
                break;
            case 3:
                restaurantName = "Кондитория на пограничной";
                break;
            case 4:
                restaurantName = "Кондитория на Адмирала Кузнецова";
                break
            default:
                break;
        }
        // Сообщение
        let message = {
            from: process.env.MAIL_USER,
            to: "delivery@iz-brasserie.ru",  // Поменять
            html: `<h3>Заявка на резервацию столика от</h3>
            <br><br><strong>Имя: ${data.name}</strong>
            <br><br><strong>Фамилия: ${data.surname}</strong>
            <br><br><strong>Телефон: ${data.phone}</strong>
            <br><br><strong>Email: ${data.email}</strong>
            <br><br><strong>На время: ${data.time}</strong>
            <br><br><strong>В ресторан: ${restaurantName}</strong>`    // На данный момент айди не передается
        }

        let transporter = await nodemailer.createTransport({
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

        let newMessage = transporter.sendMail({
            from: message.from,
            to: message.to,
            subject: "Резервация столика",
            html: message.html
        })

        console.log("Message sent: %s (new order)", newMessage.messageId);

        let status = await mails.create({
            from: message.from,
            to: message.to,
            content: message.html
        })
        
        if(status) console.log("Saved new message!");
        res.send(200);
    }
}

module.exports = new bookingController()
