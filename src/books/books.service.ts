import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Author } from '../authors/author.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(Author) // Inyectar el repositorio de autores
    private readonly authorsRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Book[]> {
    return Promise.resolve(this.books);
  }

  async create(bookData: { title: string, chapters: number, pages: number, authors: { name: string }[] }): Promise<{ id: number; title: string }> {
    const book = this.booksRepository.create(bookData);

    // Guardar autores en memoria
    const savedAuthors = await Promise.all(bookData.authors.map(authorData => this.authorsRepository.create(authorData)));
    book.authors = savedAuthors;

    // Agregar el libro a la lista en memoria
    this.books.push(book);

    return { id: book.id, title: book.title };
  }

  async calculateAveragePagesPerChapter(): Promise<{ id: number; averagePagesPerChapter: number }> {
    if (this.books.length === 0) {
      throw new BadRequestException('No hay libros disponibles para calcular el promedio.');
    }

    // Calcular el promedio de páginas por capítulo en memoria
    const totalChapters = this.books.reduce((acc, book) => acc + book.chapters, 0);
    const totalPages = this.books.reduce((acc, book) => acc + book.pages, 0);

    const averagePagesPerChapter = parseFloat((totalPages / totalChapters).toFixed(2));

    return { id: 1, averagePagesPerChapter }; // Puedes proporcionar cualquier ID aquí
  }
}
