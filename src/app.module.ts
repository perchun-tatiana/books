import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guards';
import { PrismaService } from './prisma/prisma.service';
import { MailModule } from "./mail/mail.module";
@Module({
  imports: [
    BooksModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, PrismaService],
})
export class AppModule {}
