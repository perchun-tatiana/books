import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { BookService } from '../prisma-books/prisma-books.service';
import { Book as BookModel } from '@prisma/client';
import { AuthGuard, AuthGuardAdmin } from '../../auth/auth.guards';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(): Promise<BookModel[]> {
    return this.bookService.books({});
  }

  @Get(':id')
  async getBook(@Param() params: any): Promise<BookModel> {
    return this.bookService.book({
      id: parseInt(params.id),
    });
  }

  @UseGuards(AuthGuardAdmin)
  @Post()
  async createBook(
    @Body() postData: { title: string; author: string; genres: string },
  ): Promise<BookModel> {
    return this.bookService.createBook({
      title: postData.title,
      author: postData.author,
      genres: postData.genres,
      publicationDate: new Date(),
    });
  }

  @UseGuards(AuthGuardAdmin)
  @Put()
  async updateBook(
    @Body()
    postData: {
      id: number;
      title: string;
      author: string;
      genres: string;
    },
  ): Promise<BookModel> {
    return this.bookService.updateBook({
      where: { id: postData.id },
      data: {
        title: postData.title,
        author: postData.author,
        genres: postData.genres,
      },
    });
  }

  @UseGuards(AuthGuardAdmin)
  @Delete(':id')
  async deleteBook(@Param() params: any): Promise<BookModel> {
    return this.bookService.deleteBook({
      id: parseInt(params.id),
    });
  }
}
