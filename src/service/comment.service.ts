import { CreateCommentDTO } from "@/dto/comment.dto";
import { Comment } from "@/entities/comment.entity";
import { CommentRepository } from "@/repositories/comment.repository";
import { PostRepository } from "@/repositories/post.repository";
import leoProfanity from "leo-profanity";

export class CommentService {
  private commentRepository: CommentRepository;
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.commentRepository = new CommentRepository();
  }

  async create(postId: string, input: CreateCommentDTO): Promise<Comment> {
    const post = await this.postRepository.findByPostId(postId);

    if (!post) {
      throw new Error("Post não encontrado");
    }

    const comment = new Comment();

    comment.post = post;
    comment.text = leoProfanity.clean(input.text);
    comment.created_at = new Date();
    comment.status = "active";

    return this.commentRepository.create(comment);
  }
}
