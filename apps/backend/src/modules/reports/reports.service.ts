import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SubjectGroupFactory, SubjectFactory, Subject } from '../../common/domain/subjects';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(private prisma: PrismaService) {}

  async getTopGroupA() {
    try {
      const groupA = SubjectGroupFactory.create('A');
      const subjectCodes = groupA.getSubjectCodes();
      const subjectCols = subjectCodes.map(code => `"${code}"`).join(', ');
      const sumExpr = subjectCodes.map(code => `"${code}"`).join(' + ');
      const whereExpr = subjectCodes.map(code => `"${code}" IS NOT NULL`).join(' AND ');

      const topStudents = await this.prisma.$queryRaw<Record<string, any>[]>`
        SELECT sbd, ${Prisma.raw(subjectCols)}, (${Prisma.raw(sumExpr)}) as total_score
        FROM "student_scores"
        WHERE ${Prisma.raw(whereExpr)}
        ORDER BY total_score DESC
        LIMIT 10;
      `;
      
      return topStudents;
    } catch (error) {
      this.logger.error('Error fetching Top 10 Group A students', error);
      throw new InternalServerErrorException('System error occurred while processing Top 10 Group A.');
    }
  }

  async getScoreDistribution(subjectParam?: string) {
    try {
      let subjectsToAnalyze: Subject[] = SubjectFactory.getAllSubjects();
      
      if (subjectParam) {
        subjectsToAnalyze = subjectsToAnalyze.filter(s => s.code === subjectParam);
      }

      const selectCases = subjectsToAnalyze.map(subject => `
        COUNT(CASE WHEN "${subject.code}" >= 8 THEN 1 END) as "${subject.code}_ge_8",
        COUNT(CASE WHEN "${subject.code}" >= 6 AND "${subject.code}" < 8 THEN 1 END) as "${subject.code}_6_to_8",
        COUNT(CASE WHEN "${subject.code}" >= 4 AND "${subject.code}" < 6 THEN 1 END) as "${subject.code}_4_to_6",
        COUNT(CASE WHEN "${subject.code}" < 4 THEN 1 END) as "${subject.code}_lt_4"
      `).join(',');

      const statsArray = await this.prisma.$queryRaw<Record<string, number>[]>`
        SELECT ${Prisma.raw(selectCases)}
        FROM "student_scores";
      `;

      const stats = statsArray[0];
      const distributionResult: Record<string, Record<string, number>> = {};

      for (const subject of subjectsToAnalyze) {
        distributionResult[subject.code] = {
          ">=8": Number(stats[`${subject.code}_ge_8`]) || 0,
          "6-8": Number(stats[`${subject.code}_6_to_8`]) || 0,
          "4-6": Number(stats[`${subject.code}_4_to_6`]) || 0,
          "<4": Number(stats[`${subject.code}_lt_4`]) || 0,
        };
      }

      return distributionResult;
    } catch (error) {
      this.logger.error('Error calculating score distribution', error);
      throw new InternalServerErrorException('System error occurred while processing score distribution.');
    }
  }
}
