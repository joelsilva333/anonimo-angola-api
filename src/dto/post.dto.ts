import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  text: string;
}
