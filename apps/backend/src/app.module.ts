import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ScoresModule } from './modules/scores/scores.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [PrismaModule, ScoresModule, ReportsModule],
})
export class AppModule {}
