import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum ValidSubjects {
  TOAN = 'toan',
  NGU_VAN = 'ngu_van',
  NGOAI_NGU = 'ngoai_ngu',
  VAT_LI = 'vat_li',
  HOA_HOC = 'hoa_hoc',
  SINH_HOC = 'sinh_hoc',
  LICH_SU = 'lich_su',
  DIA_LI = 'dia_li',
  GDCD = 'gdcd',
}

export class ScoreDistributionQueryDto {
  @ApiProperty({ required: false, description: 'Filter by a specific subject (e.g., toan, ngu_van)' })
  @IsOptional()
  @IsEnum(ValidSubjects, { message: 'Invalid subject provided' })
  subject?: string;
}

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
