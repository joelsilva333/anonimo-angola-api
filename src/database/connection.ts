import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5433,
	username: "admin",
	password: "admin",
	database: "anonimo_angola",
	logging: true,
	synchronize: true,
	entities: [__dirname + "/../**/*.entity.ts"],
	migrations: [__dirname + "/../migrations/*.ts"],
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
