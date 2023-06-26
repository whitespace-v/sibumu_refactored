const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db');
class specialProducts extends Model {}

// Таблица товаров, которые относятся к специальной категории
specialProducts.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isOnStop: {
        type: DataTypes.BOOLEAN
    },
    product_json: {
        type: DataTypes.JSONB
    },
    cost_per_gram: {
        type: DataTypes.BOOLEAN
    }}, {
        sequelize: sequelize,
        timestamps: false,
        tableName: 'specialProducts'
})

module.exports = specialProducts