import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module'; // Ajusta la ruta según tu estructura de carpetas
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Configuración de TypeORM, por ejemplo, la base de datos SQLite en memoria
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BooksModule,
    AuthorsModule
  ],
})
export class AppModule {}