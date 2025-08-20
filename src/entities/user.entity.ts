import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export type UserRole = "user" | "admin";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  anon_name: string;

  @Column()
  password_hash: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "timestamp", nullable: true })
  last_login_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  phone_number: string;

  @Column({
    type: "enum",
    enum: ["user", "admin"],
    default: "user",
  })
  role: UserRole;
}
