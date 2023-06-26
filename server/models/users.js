const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
class user extends Model {}

// Таблица пользователей
user.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		unique: true
	},
	mailSubscription: {
		type: DataTypes.BOOLEAN
	},
}, {
	sequelize: sequelize,
	timestamps: true,
})

module.exports = user
