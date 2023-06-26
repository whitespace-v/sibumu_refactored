const path = require('path');
const dbPath = path.join(__dirname, '../models/');
const db = require(dbPath);

class SpecialProductCardController {
    async loadProduct(req, res) {
        const productId = req.params.id

        try {
            // Берем товар из БД по айди
            let productData = await db.specialProducts.findOne({
                attributes: ['id', 'product_json', 'cost_per_gram'],
                where: {
                    isOnStop: false,
                    id: productId
                }
            })

            // Убираем префикс "+" из названия блюда
            if (productData.dataValues.product_json.name[0] == '+') {
                productData.dataValues.product_json.name = productData.dataValues.product_json.name.substring(2, productData.dataValues.product_json.name.lenght)
            }

            productData.special = true

            res.send(JSON.stringify(productData))
            return 1;
        } catch (err) {
            console.log(err)
            return 0;
        }
    }
}

module.exports = new SpecialProductCardController()