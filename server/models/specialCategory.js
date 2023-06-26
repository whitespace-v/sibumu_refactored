const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db');
class specialCategory extends Model {}

// Таблица для специальных временных категорий, которые выгружаются в хедер
specialCategory.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }, 
    isActive: {
        type: DataTypes.BOOLEAN
    },
    isNested: {
        type: DataTypes.BOOLEAN
    },
    URL: {
        type: DataTypes.STRING
    }}, {
        sequelize: sequelize,
        timestamps: false,
        tableName: 'specialCategory'
})

module.exports = specialCategory