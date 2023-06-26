const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')
class restaurantApi extends Model {}

// Таблица продуктов ресторана

restaurantApi.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	apiLogin: {
		type: DataTypes.STRING,
	},
	name: {
		type: DataTypes.STRING
	},
	organizationId: {
		type: DataTypes.STRING
	},
	token: {
		type: DataTypes.TEXT
	}
}, {
	sequelize: sequelize,
	timestamps: false,
	tableName: 'restaurantApi'
})

module.exports = restaurantApi
