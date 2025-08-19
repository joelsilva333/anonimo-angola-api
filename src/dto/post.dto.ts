import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  text!: string;
}

export class UpdatePostDTO {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  status?: "active" | "deleted" | "flagged";
}
