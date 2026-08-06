import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ScoresService {
  private readonly logger = new Logger(ScoresService.name);

  constructor(private prisma: PrismaService) {}

  async getScoreBySbd(sbd: string) {
    try {
      return await this.prisma.studentScore.findUnique({
        where: { sbd },
      });
    } catch (error) {
      this.logger.error(`Database error while fetching score for SBD: ${sbd}`, error);
      throw new InternalServerErrorException('An unexpected error occurred while fetching the score.');
    }
  }
}
