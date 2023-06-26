const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
const crypto = require('crypto')
class delivery extends Model {}


// Общая таблица для заказа

delivery.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	urlId: {
		type: DataTypes.STRING,
		unique: true,
		set() {
			this.setDataValue('urlId', crypto.randomBytes(25).toString('hex'))
		}
	},
	paymentId: {
		type: DataTypes.STRING,
	},
	paymentStatus: {
			type: DataTypes.BOOLEAN
	},
	metadata: {
		type: DataTypes.JSONB,
	},
}, {
	sequelize: sequelize,
	timestamps: true,
})

module.exports = delivery
