import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { ApiTags, ApiBody } from "@nestjs/swagger"
import { LoginDto } from "./dto/login.dto"

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

