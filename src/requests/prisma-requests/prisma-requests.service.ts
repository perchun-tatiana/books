import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/requests/prisma.service';
import { Request, Prisma } from '@prisma/client';

@Injectable()
export class PrismaRequestService {
  constructor(private prisma: PrismaService) {}

  async request(
    requestWhereUniqueInput: Prisma.RequestWhereUniqueInput,
  ): Promise<Request | null> {
    return this.prisma.request.findUnique({
      where: requestWhereUniqueInput,
    });
  }

  async requests(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RequestWhereUniqueInput;
    where?: Prisma.RequestWhereInput;
    orderBy?: Prisma.RequestOrderByWithRelationInput;
  }): Promise<Request[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.request.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRequest(data: Prisma.RequestCreateInput): Promise<Request> {
    return this.prisma.request.create({
      data,
    });
  }

  async updateRequest(params: {
    where: Prisma.RequestWhereUniqueInput;
    data: Prisma.RequestUpdateInput;
  }): Promise<Request> {
    const { where, data } = params;
    return this.prisma.request.update({
      data,
      where,
    });
  }

  async deleteRequest(where: Prisma.RequestWhereUniqueInput): Promise<Request> {
    return this.prisma.request.delete({
      where,
    });
  }
}