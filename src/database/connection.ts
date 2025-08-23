import "reflect-metadata"
import { DataSource } from "typeorm"

const isProd = process.env.NODE_ENV === "production"

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "5432", 10),
	username: process.env.DB_USER,
	password: `${process.env.DB_PASSWORD}`,
	database: process.env.DB_NAME,
	logging: true,
	synchronize: !isProd,
	entities: [__dirname + "/../**/*.entity.{ts,js}"],
	migrations: [__dirname + "/../migrations/*.{ts,js}"],
	subscribers: [],
})

AppDataSource.initialize()
	.then(() => {
		console.log("Conexão bem sucedida com o banco de dados")
	})
	.catch((err) => {
		console.error("Erro ao conectar com o banco de dados", err)
	})

export default AppDataSource
