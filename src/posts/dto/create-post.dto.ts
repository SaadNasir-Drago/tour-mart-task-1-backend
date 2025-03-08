import { IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreatePostDto {
  @ApiProperty({ example: "My First Blog Post" })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({ example: "This is the content of my first blog post..." })
  @IsNotEmpty()
  @IsString()
  content: string
}

