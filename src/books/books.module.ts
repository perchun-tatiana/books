import { Module } from '@nestjs/common';
import { BookController } from './book/book.controller';
import { BookService } from './prisma-books/prisma-books.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../auth/prisma-users/prisma-users.service';

@Module({
  imports: [AuthModule],
  controllers: [BookController],
  providers: [PrismaService, BookService, UserService],
})
export class BooksModule {}
