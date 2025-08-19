import { CreatePostDTO } from "@/dto/post.dto";
import { PostService } from "@/service/post.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";

class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const dto = plainToInstance(CreatePostDTO, req.body);

      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Validation error",
          details: errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        });
      }

      const post = await this.postService.create(dto, id);

      return res.status(201).json({
        id: post.id,
        user: post.user.anon_name,
        text: post.text,
        created_at: post.created_at,
        status: post.status,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const posts = await this.postService.findAll();

      return res.status(200).json(
        posts.map((post) => ({
          id: post.id,
          user: post.user.anon_name,
          text: post.text,
          created_at: post.created_at,
          status: post.status,
        }))
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const post = await this.postService.findById(id);

      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  getAllByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params;
      const posts = await this.postService.findAllByUserId(userId);

      return res.status(200).json(
        posts.map((post) => ({
          id: post.id,
          user: post.user.anon_name,
          text: post.text,
          created_at: post.created_at,
          status: post.status,
        }))
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };
}

export default new PostController();
