import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TopGroupAResponseDto, ScoreDistributionResponseDto, ScoreDistributionQueryDto } from './reports.dto';
import { ReportsService } from './reports.service';

import { CACHE_TTL_ONE_DAY } from '../../common/constants';

@ApiTags('reports')
@Controller('reports')
@UseInterceptors(CacheInterceptor)
export class ReportsController {
  
  constructor(private readonly reportsService: ReportsService) {}

  @Get('top-group-a')
  @CacheTTL(CACHE_TTL_ONE_DAY)
  @ApiOperation({ summary: 'Top 10 Group A Students', description: 'Retrieves the top 10 students with the highest total scores in Group A (Toán, Vật lí, Hóa học).' })
  @ApiResponse({ status: 200, description: 'Successful response', type: TopGroupAResponseDto })
  async getTopGroupA() {
    return this.reportsService.getTopGroupA();
  }

  @Get('score-distribution')
  @CacheTTL(CACHE_TTL_ONE_DAY)
  @ApiOperation({ summary: 'Score Reporting Summary', description: 'Provides a summary report showing the distribution of scores (e.g., number of students at each score level per subject).' })
  @ApiQuery({ name: 'subject', required: false, type: String, description: 'Filter by a specific subject (e.g., toan, ngu_van).' })
  @ApiResponse({ status: 200, description: 'Successful response', type: ScoreDistributionResponseDto })
  async getScoreDistribution(@Query() query: ScoreDistributionQueryDto) {
    return this.reportsService.getScoreDistribution(query.subject);
  }
}
