import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ScoresService {

  constructor(private prisma: PrismaService) {}

  async getScoreBySbd(sbd: string) {
    return this.prisma.studentScore.findUnique({
      where: { sbd },
    });
  }
}
