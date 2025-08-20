import { AuthLoginDTO } from "@/dto/auth.dto";
import { CreateUserDTO } from "@/dto/user.dto";
import { User } from "@/entities/user.entity";
import { UserRepository } from "@/repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(input: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByAnonName(
      input.anon_name
    );

    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    const user = new User();
    user.anon_name = input.anon_name;
    user.password_hash = await bcrypt.hash(input.password, 10);
    user.phone_number = input.phone_number || "";

    return await this.userRepository.create(user);
  }

  async login(
    input: AuthLoginDTO
  ): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.userRepository.findByAnonName(input.anon_name);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const validPassword = await bcrypt.compare(
      input.password,
      user.password_hash
    );

    if (!validPassword) {
      throw new Error("Senha incorreta");
    }

    user.last_login_at = new Date();

    await this.userRepository.update(user);

    const token = jwt.sign(
      { id: user.id, anon_name: user.anon_name },
      process.env.JWT_SECRET as string,
      { expiresIn: "12h" }
    );

    return {
      user: {
        id: user.id,
        anon_name: user.anon_name,
        phone_number: user.phone_number,
        is_active: user.is_active,
        created_at: user.created_at,
        last_login_at: user.last_login_at,
      },
      token,
    };
  }
}
