// Импорты библиотек
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const schedule = require('node-schedule')

// Переменные
const PORT = process.env.PORT || 9000

// Импорты локальных модулей
const { database } = require('./models')
const router = require('./routes')
//const iikoRouter = require('./routes/iiko');
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const tokenFetcher = require('./fetcher/tokenFetcher')
const catalogFetcher = require('./fetcher/catalogFetcher');
const Initializer = require('./initializer')
const ImageFetcher = require('./fetcher/imageFetcher');



// Настройки экспресса
const app = express()
app.use(cors())
app.use(express.json())
// Роуты
// app.use('/api', router)
// app.use('/test', router);

app.use('/', router);

// Роуты IIKO
//app.use('/iiko', iikoRouter);

// Мидлвари

// Мидлварь ошибок идёт всегда последней
app.use(errorHandler)

// Создаем три фетчера для каждого из ресторанов
// Фетчеры объединяют в себе логику получения apiLogin для ресторана и запрос нового токена
const izBrazzerieFetcher = new tokenFetcher(1, process.env.IZBRAZZERIEAPILOGIN)
const sibumiFetcher = new tokenFetcher(2, process.env.SIBUMIAPILOGIN)

const izBrazzerieCatalogFetcher = new catalogFetcher(1);
const sibumiCatalogFetcher = new catalogFetcher(2);

async function getProducts() {
	await izBrazzerieCatalogFetcher.getProducts();
	await sibumiCatalogFetcher.getProducts();
}

async function getStopList() {
	await izBrazzerieCatalogFetcher.getStopList();
	await sibumiCatalogFetcher.getStopList();
}

async function getTokens() {
	await izBrazzerieFetcher.getToken()
	await sibumiFetcher.getToken()
}



// Синхронизация с бд и старт сервера
!async function () {
	await database.authenticate()
	await database.sync()
	app.listen(PORT, () => console.log(`Sibumi started on port ${PORT}`))

	var initializer = new Initializer();
	await initializer.initialize()
	await getTokens()

	// Обновление данных в базе данных при запуске сервера
	await getProducts()
	await getStopList()

	// С интервалом в 5 минут, опрашиваем IIKO для получения токенов ресторанов
	setInterval(async () => {
		await getTokens()
		console.log('Updated IIKO Tokens!')
	}, 500000);
	setInterval(async () => {
		await getProducts()
		await getStopList()
		console.log("Updated IIKO Products!")
	}, 800000);
}()

if (process.env.NODE_ENV == "production") {
	const imageSynchronization = schedule.scheduleJob('0 3/9 * * *', () => {
		const imageFetcher = new ImageFetcher()
		imageFetcher.synchronize();
	})
}


