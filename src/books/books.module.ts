import { Module } from '@nestjs/common';
import { BookController } from './book/book.controller';
import { BookService } from './prisma-books/prisma-books.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [BookController],
  providers: [PrismaService, BookService],
})
export class BooksModule {}
