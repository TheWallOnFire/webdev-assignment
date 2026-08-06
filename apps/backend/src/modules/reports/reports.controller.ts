import { Controller, Get, Query, NotImplementedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TopGroupAResponseDto, ScoreDistributionResponseDto } from './reports.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  
  @Get('top-group-a')
  @ApiOperation({ summary: 'Top 10 Group A Students', description: 'Retrieves the top 10 students with the highest total scores in Group A (Toán, Vật lí, Hóa học).' })
  @ApiResponse({ status: 200, description: 'Successful response', type: TopGroupAResponseDto })
  async getTopGroupA() {
    // TODO: Implement getTopGroupA
    throw new NotImplementedException();
  }

  @Get('score-distribution')
  @ApiOperation({ summary: 'Score Reporting Summary', description: 'Provides a summary report showing the distribution of scores (e.g., number of students at each score level per subject).' })
  @ApiQuery({ name: 'subject', required: false, type: String, description: 'Filter by a specific subject (e.g., toan, ngu_van).' })
  @ApiResponse({ status: 200, description: 'Successful response', type: ScoreDistributionResponseDto })
  async getScoreDistribution(@Query('subject') subject?: string) {
    // TODO: Implement getScoreDistribution
    throw new NotImplementedException();
  }
}
