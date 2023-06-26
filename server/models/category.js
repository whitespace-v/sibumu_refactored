const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db')
class category extends Model {}

// Таблица продуктов ресторана

category.init({
        id: {
                type: DataTypes.STRING,
                primaryKey: true,
        },
        name: {
                type: DataTypes.STRING,
        },
        guid: {
            type: DataTypes.STRING
        }},{
        	sequelize: sequelize,
        	timestamps: false,
            tableName: 'category'
})

module.exports = category