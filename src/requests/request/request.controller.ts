import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrismaRequestService } from '../prisma-requests/prisma-requests.service';
import { Request as RequestModel } from '@prisma/client';
import { MailService } from './../../mail/mail.service';
import { AuthGuard } from '../../auth/auth.guards';

interface RequestQuery {
  status?: string;
  created_at?: Date;
}

@Controller('requests')
export class RequestController {
  constructor(
    private readonly requestService: PrismaRequestService,
    private readonly mailService: MailService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getRequests(
    @Query() query: { status?: string; date?: string },
  ): Promise<RequestModel[]> {
    let queryFrorDb: RequestQuery = {};
    if (query.status) queryFrorDb.status = query.status;
    // if (query.date) queryFrorDb.created_at = new Date(query.date)
    return this.requestService.requests({
      where: query,
    });
  }

  @Post()
  async createRequest(
    @Body() postData: { email: string; name: string; message: string },
  ): Promise<RequestModel> {
    return this.requestService.createRequest({
      email: postData.email,
      name: postData.name,
      status: 'Active',
      message: postData.message,
      created_at: new Date(),
    });
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateRequest(
    @Body() postData: { id: number; comment: string },
  ): Promise<RequestModel> {
    let request = await this.requestService.request({
      id: postData.id,
    });

    await this.mailService.sendUserConfirmation(
      request.email,
      request.id,
      postData.comment,
    );

    return this.requestService.updateRequest({
      where: { id: postData.id },
      data: {
        comment: postData.comment,
        status: 'Resolved',
        updated_at: new Date(),
      },
    });
  }
}
