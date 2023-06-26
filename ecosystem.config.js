module.exports = {
		apps: [{
				name: 'Sibumi frontend',
				script: 'cd client; npm start',
				env_production: {
						NODE_ENV: "production"
				},
				env_development: {
						NODE_ENV: "development"
				}
		},{
				name: 'Sibumi backend',
				script: 'cd server; npm start',
				env_production: {
						NODE_ENV: "production"
				},
				env_development: {
						NODE_ENV: "development"
				}
		}],

}
