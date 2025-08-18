import { CreatePostDTO } from "@/dto/post.dto";
import { Post } from "@/entities/post.entity";
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
}
