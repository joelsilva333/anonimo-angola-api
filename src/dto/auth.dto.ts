import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class AuthLoginDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  anon_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  password: string;
}
