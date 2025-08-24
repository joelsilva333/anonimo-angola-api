import "module-alias/register"
import "reflect-metadata"

import dotenv from "dotenv"
dotenv.config()

import { setupSwagger } from "./swagger"

import express from "express"
import cors from "cors"
import path from "path"
import "./database/connection"
import routes from "./routes"

const PORT = process.env.PORT || 8080

const app = express()

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/public", express.static(path.join(__dirname, "../public")))

app.use(routes)
setupSwagger(app)

app.listen(PORT, () => {
	console.log(`Swagger docs: https://anonimo-angola-api.onrender.com/api-docs`)
})
