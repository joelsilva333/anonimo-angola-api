import { User } from "@/entities/user.entity"
import { Response, Request } from "express"
import bcrypt from "bcrypt"
import { UserRepository } from "@/repositories/user.repository"

class UserController {
	private userRepository: UserRepository

	constructor() {
		this.userRepository = new UserRepository()
	}

	createUser = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { anon_name, password, phone_number } = req.body

			if (!anon_name || !password) {
				return res
					.status(400)
					.json({ error: "Nome anônimo e password são obrigatórios" })
			}

			const user = new User()
			user.anon_name = anon_name
			user.password_hash = await bcrypt.hash(password, 10)
			user.is_active = true
			user.phone_number = phone_number || ""

			const userDb = await this.userRepository.create(user)

			if (!userDb) {
				return res.status(400).json({ error: "Erro ao criar usuário" })
			}

			return res.status(201).json({
				message: "Usuário criado com sucesso",
				user: {
					id: userDb.id,
					anon_name: userDb.anon_name,
					phone_number: userDb.phone_number,
					is_active: userDb.is_active,
					created_at: userDb.created_at,
				},
			})
		} catch (error) {
			console.error(error)
			return res.status(500).json({
				error:
					error instanceof Error ? error.message : "Erro interno do servidor",
			})
		}
	}

	getUser = async (req: Request, res: Response): Promise<Response> => {
		try {
			const userId = req.params.id
			const user = await this.userRepository.findById(userId)

			if (!user) {
				return res.status(404).json({ error: "Usuário não encontrado" })
			}

			return res.status(200).json({
				id: user.id,
				anon_name: user.anon_name,
				phone_number: user.phone_number,
				is_active: user.is_active,
			})
		} catch (error) {
			console.error(error)
			return res
				.status(500)
				.json({ error: "Ocorreu um erro ao buscar usuário" })
		}
	}

	getAllUsers = async (req: Request, res: Response): Promise<Response> => {
		try {
			const users = await this.userRepository.findAll()
			return res.status(200).json(users)
		} catch (error) {
			console.error(error)
			return res
				.status(500)
				.json({ error: "Ocorreu um erro ao buscar usuários" })
		}
	}
}

export default new UserController()
