import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity("comments")
export class Comment {
 @PrimaryGeneratedColumn("uuid")
id: string;

  @Column({ type: "text" })
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  post: Post;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @Column({
    type: "enum",
    enum: ["active", "deleted", "flagged"],
    default: "active",
  })
  status: "active" | "deleted" | "flagged";
}
