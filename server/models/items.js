const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
class items extends Model {}


// Общая таблица для заказа

items.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	items: {
		type: DataTypes.JSONB,
	},
	iikoStatus: {
		type: DataTypes.STRING
	}
}, {
	sequelize: sequelize,
	timestamps: true,
})

module.exports = items
