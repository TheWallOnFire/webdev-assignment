import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CoreSubject } from './domain/subject.analyzer';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(private prisma: PrismaService) {}

  async getTopGroupA() {
    // Group A is Math (toan) + Physics (vat_li) + Chemistry (hoa_hoc)
    try {
      // Using Raw SQL for maximum performance over 1M rows
      const topStudents = await this.prisma.$queryRaw`
        SELECT sbd, toan, vat_li, hoa_hoc, (toan + vat_li + hoa_hoc) as total_score
        FROM "student_scores"
        WHERE toan IS NOT NULL AND vat_li IS NOT NULL AND hoa_hoc IS NOT NULL
        ORDER BY total_score DESC
        LIMIT 10;
      `;
      
      return topStudents;
    } catch (error) {
      this.logger.error('Error fetching Top 10 Group A students', error);
      throw error;
    }
  }

  async getScoreDistribution(subjectParam?: string) {
    try {
      let subjectsToAnalyze = ['toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd'];
      
      if (subjectParam) {
        const subjectObj = new CoreSubject(subjectParam, subjectParam);
        subjectObj.validate(); // OOP Validation
        subjectsToAnalyze = [subjectObj.dbColumn];
      }

      const distributionResult: Record<string, Record<string, number>> = {};

      for (const subject of subjectsToAnalyze) {
        // Raw SQL for efficient aggregation
        const stats: any = await this.prisma.$queryRawUnsafe(`
          SELECT 
            COUNT(CASE WHEN "${subject}" >= 8 THEN 1 END) as ">=8",
            COUNT(CASE WHEN "${subject}" >= 6 AND "${subject}" < 8 THEN 1 END) as "6-8",
            COUNT(CASE WHEN "${subject}" >= 4 AND "${subject}" < 6 THEN 1 END) as "4-6",
            COUNT(CASE WHEN "${subject}" < 4 THEN 1 END) as "<4"
          FROM "student_scores"
          WHERE "${subject}" IS NOT NULL;
        `);

        // Convert BigInt returns from PostgreSQL COUNT() to standard JS Numbers
        distributionResult[subject] = {
          ">=8": Number(stats[0]['>=8']),
          "6-8": Number(stats[0]['6-8']),
          "4-6": Number(stats[0]['4-6']),
          "<4": Number(stats[0]['<4']),
        };
      }

      return distributionResult;
    } catch (error) {
      this.logger.error('Error calculating score distribution', error);
      throw error;
    }
  }
}
