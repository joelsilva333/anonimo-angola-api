<<<<<<< HEAD
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
import { Answer } from "@/entities/answer.entity"
import { Post } from "@/entities/post.entity"
import { User } from "@/entities/user.entity"
import { Comment } from "@/entities/comment.entity"
import { Report } from "@/entities/report.entity"

dotenv.config()

=======
import "reflect-metadata"
import { DataSource } from "typeorm"

>>>>>>> 989e6e21931ad32faf80972468d660c97ea13fd9
const isProd = process.env.NODE_ENV === "production"

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "5432", 10),
	username: process.env.DB_USER,
<<<<<<< HEAD
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: true,
	synchronize: !isProd,
=======
	password: `${process.env.DB_PASSWORD}`,
	database: process.env.DB_NAME,
	logging: true,
	synchronize: !isProd,
	migrationsRun: true,
>>>>>>> 989e6e21931ad32faf80972468d660c97ea13fd9
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: false }
			: false,
<<<<<<< HEAD
	entities: [User, Post, Comment, Answer, Report],
	migrations: [
		isProd
			? `${process.cwd()}/dist/migrations/*.js`
			: `${process.cwd()}/src/migrations/*.ts`,
=======
	entities: [
		isProd
			? __dirname + "/../**/*.entity.js"
			: __dirname + "/../**/*.entity.ts",
	],
	migrations: [
		isProd
			? __dirname + "/../migrations/*.js"
			: __dirname + "/../migrations/*.ts",
>>>>>>> 989e6e21931ad32faf80972468d660c97ea13fd9
	],
	subscribers: [],
})

AppDataSource.initialize()
	.then(() => {
<<<<<<< HEAD
		console.log("Banco de dados conectado com sucesso")
	})
	.catch((err) => {
		console.error("Erro durante a conexão:", err)
=======
		console.log("Conexão bem sucedida com o banco de dados")
	})
	.catch((err) => {
		console.error("Erro ao conectar com o banco de dados", err)
>>>>>>> 989e6e21931ad32faf80972468d660c97ea13fd9
	})

export default AppDataSource
