import { User } from "@/entities/user.entity";
import bcrypt from "bcrypt";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserDTO, UpdateUserDTO } from "@/dto/user.dto";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(input: CreateUserDTO): Promise<User> {
    if (!input.anon_name || input.anon_name.trim().length === 0) {
      throw new Error("Nome de usuário não pode estar vazio");
    }

    if (!input.password) {
      throw new Error("Senha obrigatória");
    }

    const existingUser = await this.userRepository.findByAnonName(
      input.anon_name
    );
    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    if (input.phone_number) {
      const existingPhone = await this.userRepository.findByPhoneNumber(
        input.phone_number
      );
      if (existingPhone) {
        throw new Error("Número de telefone já em uso");
      }
    }

    const user = new User();
    user.anon_name = input.anon_name;
    user.password_hash = await bcrypt.hash(input.password, 10);
    user.phone_number = input.phone_number || "";
    user.role = "user";

    return await this.userRepository.create(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async find(): Promise<
    {
      id: string;
      anon_name: string;
      phone_number: string;
      is_active: boolean;
    }[]
  > {
    const users = await this.userRepository.findAll();

    return users.map((user) => ({
      id: user.id,
      anon_name: user.anon_name,
      phone_number: user.phone_number,
      is_active: user.is_active,
    }));
  }

  async update(id: string, input: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (input.anon_name && input.anon_name !== user.anon_name) {
      const existingUser = await this.userRepository.findByAnonName(
        input.anon_name
      );
      if (existingUser) {
        throw new Error("Este nome de usuário já está em uso");
      }
      user.anon_name = input.anon_name;
    }

    if (input.password_hash) {
      user.password_hash = await bcrypt.hash(input.password_hash, 10);
    }

    user.is_active = input.is_active ?? user.is_active;
    user.phone_number = input.phone_number || user.phone_number;

    return await this.userRepository.update(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.userRepository.delete(id);
  }
}
