import { BadRequestException } from '@nestjs/common';

// OOP approach: Abstract base class for Subject analysis
export abstract class SubjectAnalyzer {
  protected constructor(public subjectName: string, public dbColumn: string) {}
  
  abstract validate(): void;
}

export class CoreSubject extends SubjectAnalyzer {
  constructor(name: string, column: string) {
    super(name, column);
  }
  
  validate() {
    const validColumns = ['toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd'];
    if (!validColumns.includes(this.dbColumn)) {
      throw new BadRequestException(`Invalid subject provided: ${this.subjectName}`);
    }
  }
}
