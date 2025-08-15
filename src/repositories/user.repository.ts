import { User } from "@/entities/user.entity";
import AppDataSource from "@/database/connection";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";

export class UserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(input: User): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      anon_name: input.anon_name,
    });

    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    const user = new User();
    user.anon_name = input.anon_name;
    user.password_hash = await bcrypt.hash(input.password_hash, 10);
    user.phone_number = input.phone_number || "";
    user.is_active = true;

    return await this.userRepository.save(user);
  }
}
