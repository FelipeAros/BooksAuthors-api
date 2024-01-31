import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async create(author: Author): Promise<{ id: number; name: string }> {
    try {
      const createdAuthor = await this.authorsRepository.save(author);
      // Solo devuelve la información necesaria
      return { id: createdAuthor.id, name: createdAuthor.name };
    } catch (error) {
      throw new BadRequestException('No se ha podido crear el autor.');
    }
  }
}