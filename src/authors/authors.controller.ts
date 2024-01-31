import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() author: Author): Promise<{ id: number; name: string }> {
    const createdAuthor = await this.authorsService.create(author);
    return createdAuthor;
  }
}