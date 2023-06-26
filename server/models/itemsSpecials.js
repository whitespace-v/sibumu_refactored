const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
class itemsSpecials extends Model {}


// Общая таблица для заказа

itemsSpecials.init({
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

module.exports = itemsSpecials
