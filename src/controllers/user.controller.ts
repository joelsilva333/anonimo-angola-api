import { Response, Request } from "express";
import { UserRepository } from "@/repositories/user.repository";
import { UserService } from "@/service/user.service";
import { validate } from "class-validator";
import { UpdateUserDTO } from "@/dto/user.dto";
import { plainToInstance } from "class-transformer";

class UserController {
  private userRepository: UserRepository;
  private userService: UserService;

  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService();
  }

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const dto = plainToInstance(UpdateUserDTO, req.body);

      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Erro de validação",
          details: errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        });
      }

      const updatedUser = await this.userService.update(id, dto);

      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        user: {
          id: updatedUser.id,
          anon_name: updatedUser.anon_name,
          phone_number: updatedUser.phone_number,
          is_active: updatedUser.is_active,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);

      return res.status(200).json({
        id: user.id,
        anon_name: user.anon_name,
        phone_number: user.phone_number,
        is_active: user.is_active,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  };

  getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.id;
      const user = await this.userRepository.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json({
        id: user.id,
        anon_name: user.anon_name,
        phone_number: user.phone_number,
        is_active: user.is_active,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao buscar usuário" });
    }
  };

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.userService.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  };
}

export default new UserController();
