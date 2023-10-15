export const swaggerOptions = {
	definition: {
		openapi: '3.0.1',
		info: {
			title: 'Upsoon API',
			version: '1.0.0',
			description: 'Upsoon API Information',
		},
		servers: [
			{
				url: 'https://upsoona.up.railway.app',
			},
			{
				url: 'http://api-uat.upsoon.com',
			},
			{
				url: 'http://api-preprod.upsoon.com',
			},
			{
				url: 'http://api.upsoon.com',
			},
		]
	},
	apis: ['./src/routers/*.js'],	
}