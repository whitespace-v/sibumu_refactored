const {Sequelize} = require('sequelize')

console.log(process.env.DB)

// Подключение к базе данных

module.exports = new Sequelize(process.env.DB,process.env.DBUSER,process.env.DBPASS, {
		host: process.env.DBADDR,
		port: process.env.DBPORT,
		dialect: "postgres",
		// logging: logSqlWithTime,
		logging: false,
		// logging: true,
		define: {
				timestamps: false
		}
})

function logSqlWithTime (sql, queryObject) {  
  console.log('SQL:', (new Date()).toLocaleString(), '||', sql)
}
