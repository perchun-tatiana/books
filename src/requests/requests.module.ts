import { Module } from '@nestjs/common';
import { RequestController } from './request/request.controller';
import { PrismaRequestService } from './prisma-requests/prisma-requests.service';
import { PrismaService } from 'src/requests/prisma.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [RequestController],
  providers: [PrismaService, PrismaRequestService],
})
export class RequestsModule {}
