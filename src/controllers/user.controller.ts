import AppDataSource from "@/database/connection";
import { User } from "@/entities/user.entity";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { UserRepository } from "@/repositories/user.repository";

class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { anon_name, password, phone_number } = req.body;

      if (!anon_name || !password) {
        return res
          .status(400)
          .json({ error: "Nome anônimo e password são obrigatórios" });
      }

      const user = new User();
      user.anon_name = anon_name;
      user.password_hash = await bcrypt.hash(password, 10);
      user.is_active = true;
      user.phone_number = phone_number || "";

      const userDb = await this.userRepository.create(user);

      if (!userDb) {
        return res.status(400).json({ error: "Erro ao criar usuário" });
      }

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: {
          id: userDb.id,
          anon_name: userDb.anon_name,
          phone_number: userDb.phone_number,
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao criar usuário" });
    }
  };
}

export default new UserController();
