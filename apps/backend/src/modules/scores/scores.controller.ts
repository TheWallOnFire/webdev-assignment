import { Controller, Get, Param, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ScoresService } from './scores.service';
import { ScoreResponseDto, ScoreCheckerParamDto } from './scores.dto';

import { CACHE_TTL_ONE_DAY } from '../../common/constants';

@ApiTags('scores')
@Controller('scores')
@UseInterceptors(CacheInterceptor)
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get(':sbd')
  @CacheTTL(CACHE_TTL_ONE_DAY)
  @ApiOperation({ summary: 'Search student score', description: 'Retrieves the score of a student using their unique Registration Number (SBD).' })
  @ApiResponse({ status: 200, description: 'Successful response', type: ScoreResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation Error (e.g. invalid SBD format)' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async getScore(@Param() params: ScoreCheckerParamDto) {
    const score = await this.scoresService.getScoreBySbd(params.sbd);
    if (!score) {
      throw new NotFoundException('Student not found');
    }
    return score;
  }
}
