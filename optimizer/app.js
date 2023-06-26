import express from 'express'
import path from 'path';
import axios from 'axios'
import bmp from 'sharp-bmp';
import sharp from 'sharp';

const dirname = path.resolve(path.dirname(''));
const app = express()
app.use(express.json({ limit: '25mb' }))

const PORT = 80;


/**
  * Оптимизирует изображения, скачивая их
	* с iiko и сохраняя в директорию images
	* 
	* @async
	* @param {String} ссылка на изображение в iiko
	* @param {String} айди товара
	* @return {Boolean} успех операции
  */
async function optimize(url, filename) {
	// Скачать изображение с сервера iiko
	if (!url.length) {
		return true
	}
	const filetype = url.split('.').pop()
	try {
		const image = await axios.get(url, {
			responseType: "arraybuffer",
		})
		// Перевод изображения в тип буфера, для последующей передачи в библиотеку
		const bufferizedImage = Buffer.from(image.data, 'binary')
		// Оптимизация и сохранение изображения
		if (filetype == 'bmp') {
			await bmp.sharpFromBmp(bufferizedImage)
			.rotate()
			.resize({fit: sharp.fit.cover, width: 620, height: 620})
			.jpeg({ progressive: true })
			.toFile('./images/' + filename + '.jpeg')
		} else {
			await sharp(bufferizedImage)
			.rotate()
			.resize({fit: sharp.fit.cover, width: 620, height: 620})
			.jpeg({progressive: true})
			.toFile('./images/' + filename + '.jpeg')
		}
		
		console.log(new Date(), 'SUCCESS: ', filename, ' writed')
	} catch (error) {
		console.log(new Date(), "ERROR: ", error)
		return false
	}
	return true
}

app.post('/upload', async (req, res) => {
	const { images } = req.body;
	if (!images || !images.length) {
		res.sendStatus(400).json({ message: "empty images" })
	}



	for (let image of images) {
		await optimize(image.link, image.productId)
	}

	res.sendStatus(200)
})

app.get('/get/:id', (req, res) => {
	const productId = req.params.id

	res.sendFile(dirname + '/images/' + productId + '.jpeg', (err) => {
		if (err) {
			res.sendFile(dirname + '/empty-product.jpg', (error) => {
				if (error) {
					console.log(error)
					res.sendStatus(204)
				}
			})
		}

	})

})

app.listen(PORT, () => {
	console.log(`Working on ${PORT}`);
})
