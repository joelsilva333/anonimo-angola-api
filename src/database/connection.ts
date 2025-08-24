import { DataSource } from "typeorm"
import * as dotenv from "dotenv"

dotenv.config()

const isProd = process.env.NODE_ENV === "production"

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "5432", 10),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: true,
	synchronize: !isProd,
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: false }
			: false,
	entities: [
		isProd ? `${__dirname}/../entities/*.js` : `${__dirname}/../entities/*.ts`,
	],
	migrations: [
		isProd
			? `${process.cwd()}/dist/migrations/*.js`
			: `${process.cwd()}/src/migrations/*.ts`,
	],
	subscribers: [],
})

AppDataSource.initialize()
	.then(() => {
		console.log("Banco de dados conectado com sucesso")
	})
	.catch((err) => {
		console.error("Erro durante a conexão:", err)
	})

export default AppDataSource
