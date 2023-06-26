const path = require('path');
const dbPath = path.join(__dirname, '../models/');
const db = require(dbPath);
const Sequelize = require('sequelize')

class getSpecialHeaderController {
	async loadSpecialCategory(req, res) {
        let categories = await db.specialCategory.findAll({
            attributes: ['name', 'URL', 'id'],
            where: {
                isActive: true,
            },
            raw: true
        })


        let result = {}
        categories.map(el => {
            result[el.name] = el
        })
        let ress = Object.values(result)
        res.send(JSON.stringify(ress))
	}
}

module.exports = new getSpecialHeaderController()
