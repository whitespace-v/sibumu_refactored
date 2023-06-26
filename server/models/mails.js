const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db')
class mails extends Model {}

// Таблица отправленных писем

mails.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        from: {
            type: DataTypes.STRING,
        },
        to: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        }},{
        	sequelize: sequelize,
        	timestamps: true,
            tableName: 'mails'
})

module.exports = mails