import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { PostsModule } from "./posts/posts.module"
import { User } from "./users/entities/user.entity"
import { Post } from "./posts/entities/post.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "postgres"),
        password: configService.get("DB_PASSWORD", "postgres"),
        database: configService.get("DB_DATABASE", "blog"),
        entities: [User, Post],
        synchronize: configService.get("NODE_ENV") !== "production",
      }),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}

