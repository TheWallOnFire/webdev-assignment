import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ScoresService } from './scores.service';
import { ScoreResponseDto } from './scores.dto';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get(':sbd')
  @ApiOperation({ summary: 'Score Checker', description: 'Retrieves the exam scores for a specific student based on their Registration Number (SBD).' })
  @ApiParam({ name: 'sbd', type: String, description: 'The unique Registration Number of the student.' })
  @ApiResponse({ status: 200, description: 'Successful response', type: ScoreResponseDto })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async getScore(@Param('sbd') sbd: string) {
    const score = await this.scoresService.getScoreBySbd(sbd);
    if (!score) {
      throw new NotFoundException({ status: 'error', message: 'Student not found' });
    }
    return score;
  }
}
