import { Controller, Get, Param, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ScoresService } from './scores.service';
import { ScoreResponseDto, ScoreCheckerParamDto } from './scores.dto';

@ApiTags('scores')
@Controller('scores')
@UseInterceptors(CacheInterceptor)
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get(':sbd')
  @CacheTTL(86400)
  @ApiOperation({ summary: 'Search student score', description: 'Retrieves the score of a student using their unique Registration Number (SBD).' })
  @ApiParam({ name: 'sbd', type: String, description: 'The unique Registration Number of the student.' })
  @ApiResponse({ status: 200, description: 'Successful response', type: ScoreResponseDto })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async getScore(@Param() params: ScoreCheckerParamDto) {
    const score = await this.scoresService.getScoreBySbd(params.sbd);
    if (!score) {
      throw new NotFoundException({ status: 'error', message: 'Student not found' });
    }
    return score;
  }
}
