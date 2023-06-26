const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
class products extends Model {}

// Таблица продуктов ресторана

products.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	isOnStop: {
		type: DataTypes.BOOLEAN
	},
	product_json: {
		type: DataTypes.JSONB,
	},
	cost_per_gram: {
		type: DataTypes.BOOLEAN
	}
}, {
	sequelize: sequelize,
	timestamps: false,
	tableName: 'products'
})

module.exports = products
