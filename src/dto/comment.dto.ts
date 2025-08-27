import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDTO {
  @IsNotEmpty({ message: "Texto do comentário não pode ser vazio" })
  @IsString()
  text: string;
}

export class UpdateCommentDTO {
  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  status: "active" | "deleted" | "flagged";
}
