import bcrypt from "bcrypt"
import { UserRepository } from "@/repositories/user.repository"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

class AuthController {
	private userRepository: UserRepository

	constructor() {
		this.userRepository = new UserRepository()
	}

	login = async (req: Request, res: Response): Promise<Response> => {
		const { anon_name, password } = req.body

		console.log("Senha digitada:", password)

		if (!anon_name || !password) {
			return res
				.status(400)
				.json({ error: "Nome anônimo e palavra-passe são necessários" })
		}
		const user = await this.userRepository.findByAnonName(anon_name)

		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado" })
		}

		console.log("Hash no banco:", user.password_hash)

		const validPassword = await bcrypt.compare(password, user.password_hash)
		const test = await bcrypt.compare("bestrapper333@", user.password_hash)

		console.log("Senha válida teste:", test)

		if (!validPassword) {
			return res.status(401).json({ error: "Senha inválida" })
		}

		const token = jwt.sign(
			{ id: user.id, anon_name: user.anon_name },
			process.env.JWT_SECRET as string,
			{ expiresIn: "12h" }
		)

		return res.status(200).json({
			message: "Sessão iniciada com sucesso",
			user: {
				id: user.id,
				username: anon_name,
				phone_number: user.phone_number,
				is_active: user.is_active,
			},
			token,
		})
	}
}

export default new AuthController()
