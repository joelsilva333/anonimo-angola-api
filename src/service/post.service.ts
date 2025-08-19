import { CreatePostDTO } from "@/dto/post.dto";
import { Post } from "@/entities/post.entity";
import { PostInterface } from "@/interfaces/post.interface";
import { PostRepository } from "@/repositories/post.repository";
import { UserRepository } from "@/repositories/user.repository";

export class PostService {
  private postRepository: PostRepository;
  private userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.userRepository = new UserRepository();
  }

  async create(input: CreatePostDTO, id: string): Promise<Post> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const post = new Post();

    post.user = user;
    post.text = input.text;
    post.created_at = new Date();
    post.status = "active";

    return await this.postRepository.create(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }

  async findById(id: string): Promise<PostInterface> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error("Postagem não encontrada");
    }

    return {
      id: post.id,
      user: post.user.anon_name,
      text: post.text,
      created_at: post.created_at,
      status: post.status,
    };
  }

  async findAllByUserId(userId: string): Promise<Post[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return await this.postRepository.findAllByUserId(userId);
  }
}
