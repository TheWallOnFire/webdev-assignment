import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getScoreBySbd(sbd: string) {
    return this.prisma.studentScore.findUnique({
      where: { sbd },
    });
  }
}
