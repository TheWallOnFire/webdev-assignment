import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('scores/:sbd')
  async getScore(@Param('sbd') sbd: string) {
    const score = await this.appService.getScoreBySbd(sbd);
    if (!score) {
      throw new NotFoundException({ status: 'error', message: 'Student not found' });
    }
    return {
      status: 'success',
      data: score,
    };
  }
}
