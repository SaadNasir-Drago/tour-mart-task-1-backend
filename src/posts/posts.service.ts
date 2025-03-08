import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Post } from "./entities/post.entity"
import type { CreatePostDto } from "./dto/create-post.dto"
import type { UpdatePostDto } from "./dto/update-post.dto"

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      authorId: userId,
    })
    return this.postsRepository.save(post)
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ["author"],
      order: { createdAt: "DESC" },
    })
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ["author"],
    })

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }

    return post
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<Post> {
    const post = await this.findOne(id)

    if (post.authorId !== userId) {
      throw new ForbiddenException("You can only update your own posts")
    }

    Object.assign(post, updatePostDto)
    return this.postsRepository.save(post)
  }

  async remove(id: string, userId: string): Promise<void> {
    const post = await this.findOne(id)

    if (post.authorId !== userId) {
      throw new ForbiddenException("You can only delete your own posts")
    }

    await this.postsRepository.remove(post)
  }

  async findByUser(userId: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { authorId: userId },
      relations: ["author"],
      order: { createdAt: "DESC" },
    })
  }
}

