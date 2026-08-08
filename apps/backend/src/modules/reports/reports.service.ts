import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SubjectGroupFactory, SubjectFactory, Subject } from '../../common/domain/subjects';

export interface TopGroupAResult {
  sbd: string;
  total_score: number;
  [subjectCode: string]: string | number;
}

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getTopGroupA() {
      const group = SubjectGroupFactory.create('A');
      const codes = group.getSubjectCodes();
      
      const selectFields = ['sbd', ...codes].join(', ');
      const sumExpression = codes.join(' + ');
      const whereCondition = codes.map(code => `${code} IS NOT NULL`).join(' AND ');

      const topStudents = await this.prisma.$queryRawUnsafe<TopGroupAResult[]>(`
        SELECT ${selectFields}, (${sumExpression}) as total_score
        FROM "student_scores"
        WHERE ${whereCondition}
        ORDER BY total_score DESC
        LIMIT 10;
      `);
      
      return topStudents;
  }

  async getScoreDistribution(subjectParam?: string) {
      const allSubjects: Subject[] = SubjectFactory.getAllSubjects();
      const subjectsToAnalyze = subjectParam 
        ? allSubjects.filter(s => s.code === subjectParam)
        : allSubjects;

      const distributionResult: Record<string, Record<string, number>> = {};

      if (subjectsToAnalyze.length === 0) return distributionResult;

      const selectParts = subjectsToAnalyze.map(subject => `
        COUNT(CASE WHEN ${subject.code} >= 8 THEN 1 END)::int AS "${subject.code}_ge_8",
        COUNT(CASE WHEN ${subject.code} >= 6 AND ${subject.code} < 8 THEN 1 END)::int AS "${subject.code}_from_6_to_8",
        COUNT(CASE WHEN ${subject.code} >= 4 AND ${subject.code} < 6 THEN 1 END)::int AS "${subject.code}_from_4_to_6",
        COUNT(CASE WHEN ${subject.code} < 4 THEN 1 END)::int AS "${subject.code}_lt_4"
      `).join(', ');

      const results = await this.prisma.$queryRawUnsafe<Record<string, number>[]>(`
        SELECT ${selectParts} FROM "student_scores"
      `);

      const row = results[0] || {};

      for (const subject of subjectsToAnalyze) {
        distributionResult[subject.code] = {
          ">=8": row[`${subject.code}_ge_8`] || 0,
          "6-8": row[`${subject.code}_from_6_to_8`] || 0,
          "4-6": row[`${subject.code}_from_4_to_6`] || 0,
          "<4": row[`${subject.code}_lt_4`] || 0,
        };
      }

      return distributionResult;
  }
}
