import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() book: Book): Promise<{ id: number; title: string }> {
    const createdBook = await this.booksService.create(book);
    return createdBook;
  }

  @Get('average-pages-per-chapter')
  async getAveragePagesPerChapter(): Promise<{ id: number; averagePagesPerChapter: number }> {
    const result = await this.booksService.calculateAveragePagesPerChapter();
    return result;
  }
}
