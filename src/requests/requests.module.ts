import { Module } from '@nestjs/common';
import { RequestController } from './request/request.controller';
import { PrismaRequestService } from './prisma-requests/prisma-requests.service';
import { PrismaService } from 'src/requests/prisma.service';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MailModule, AuthModule],
  controllers: [RequestController],
  providers: [PrismaService, PrismaRequestService],
})
export class RequestsModule {}
