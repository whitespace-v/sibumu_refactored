const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
class deliveryResponse extends Model {}


// Общая таблица для заказа

deliveryResponse.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	response: {
		type: DataTypes.JSONB,
	},
}, {
	sequelize: sequelize,
	timestamps: true,
})

module.exports = deliveryResponse
