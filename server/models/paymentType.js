const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
class paymentType extends Model {}

// Таблица для типов оплаты заказа

paymentType.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	code: {
		type: DataTypes.STRING
	},
	apiId: {
		type: DataTypes.STRING
	},
	response: {
		type: DataTypes.JSONB
	},
}, {
	sequelize: sequelize,
	timestamps: true,
})

module.exports = paymentType
