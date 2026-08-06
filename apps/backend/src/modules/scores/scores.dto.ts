import { ApiProperty } from '@nestjs/swagger';

export class ScoreDataDto {
  @ApiProperty({ example: '01000001', description: 'Student registration number (SBD)' })
  sbd!: string;

  @ApiProperty({ example: 8.4, nullable: true, description: 'Math score' })
  toan!: number | null;

  @ApiProperty({ example: 6.75, nullable: true, description: 'Literature score' })
  ngu_van!: number | null;

  @ApiProperty({ example: 8.0, nullable: true, description: 'Foreign language score' })
  ngoai_ngu!: number | null;

  @ApiProperty({ example: 6.0, nullable: true, description: 'Physics score' })
  vat_li!: number | null;

  @ApiProperty({ example: 5.25, nullable: true, description: 'Chemistry score' })
  hoa_hoc!: number | null;

  @ApiProperty({ example: 5.0, nullable: true, description: 'Biology score' })
  sinh_hoc!: number | null;

  @ApiProperty({ example: null, nullable: true, description: 'History score' })
  lich_su!: number | null;

  @ApiProperty({ example: null, nullable: true, description: 'Geography score' })
  dia_li!: number | null;

  @ApiProperty({ example: null, nullable: true, description: 'Civic education score' })
  gdcd!: number | null;

  @ApiProperty({ example: 'N1', nullable: true, description: 'Foreign language code' })
  ma_ngoai_ngu!: string | null;
}

export class ScoreResponseDto {
  @ApiProperty({ example: 'success' })
  status!: string;

  @ApiProperty({ type: ScoreDataDto })
  data!: ScoreDataDto;
}
