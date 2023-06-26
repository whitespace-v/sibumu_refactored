const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
class restaurant extends Model {}

// Таблица трех ресторанов. 

restaurant.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	name: {
		type: DataTypes.STRING,
	},
	terminalGroupId: {
		type: DataTypes.STRING
	}
}, {
	sequelize: sequelize,
	timestamps: false,
	tableName: 'restaurant'
})

module.exports = restaurant
