import { ApiProperty } from '@nestjs/swagger';

export class TopGroupADataDto {
  @ApiProperty({ example: '01000005' })
  sbd!: string;

  @ApiProperty({ example: 9.0 })
  toan!: number;

  @ApiProperty({ example: 9.5 })
  vat_li!: number;

  @ApiProperty({ example: 9.0 })
  hoa_hoc!: number;

  @ApiProperty({ example: 27.5 })
  total_score!: number;
}

export class TopGroupAResponseDto {
  @ApiProperty({ example: 'success' })
  status!: string;

  @ApiProperty({ type: [TopGroupADataDto] })
  data!: TopGroupADataDto[];
}

export class ScoreDistributionResponseDto {
  @ApiProperty({ example: 'success' })
  status!: string;

  @ApiProperty({
    example: {
      toan: {
        ">=8": 1500,
        "6-8": 3000,
        "4-6": 2000,
        "<4": 500
      }
    }
  })
  data!: Record<string, Record<string, number>>;
}
