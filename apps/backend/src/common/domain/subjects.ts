export abstract class Subject {
  constructor(public readonly code: string, public readonly name: string) {}
}

export class MathSubject extends Subject { constructor() { super('toan', 'Math'); } }
export class LiteratureSubject extends Subject { constructor() { super('ngu_van', 'Literature'); } }
export class ForeignLanguageSubject extends Subject { constructor() { super('ngoai_ngu', 'Foreign Language'); } }
export class PhysicsSubject extends Subject { constructor() { super('vat_li', 'Physics'); } }
export class ChemistrySubject extends Subject { constructor() { super('hoa_hoc', 'Chemistry'); } }
export class BiologySubject extends Subject { constructor() { super('sinh_hoc', 'Biology'); } }
export class HistorySubject extends Subject { constructor() { super('lich_su', 'History'); } }
export class GeographySubject extends Subject { constructor() { super('dia_li', 'Geography'); } }
export class CivicEducationSubject extends Subject { constructor() { super('gdcd', 'Civic Education'); } }

export abstract class SubjectGroup {
  constructor(public readonly name: string, public readonly subjects: Subject[]) {}

  getSubjectCodes(): string[] {
    return this.subjects.map(subject => subject.code);
  }

  getSqlSelectSum(alias: string = 'total_score'): string {
    const sumExpression = this.getSubjectCodes().map(code => `"${code}"`).join(' + ');
    return `(${sumExpression}) as ${alias}`;
  }

  getSqlWhereNotNull(): string {
    return this.getSubjectCodes().map(code => `"${code}" IS NOT NULL`).join(' AND ');
  }
}

export class GroupA extends SubjectGroup {
  constructor() {
    super('A', [new MathSubject(), new PhysicsSubject(), new ChemistrySubject()]);
  }
}

export class GroupB extends SubjectGroup {
  constructor() {
    super('B', [new MathSubject(), new ChemistrySubject(), new BiologySubject()]);
  }
}

export class GroupC extends SubjectGroup {
  constructor() {
    super('C', [new LiteratureSubject(), new HistorySubject(), new GeographySubject()]);
  }
}

export class GroupD1 extends SubjectGroup {
  constructor() {
    super('D1', [new MathSubject(), new LiteratureSubject(), new ForeignLanguageSubject()]);
  }
}

export class SubjectGroupFactory {
  static create(groupName: string): SubjectGroup {
    switch (groupName.toUpperCase()) {
      case 'A': return new GroupA();
      case 'B': return new GroupB();
      case 'C': return new GroupC();
      case 'D1': return new GroupD1();
      default: throw new Error(`Group ${groupName} is not supported.`);
    }
  }
}

export class SubjectFactory {
  static getAllSubjects(): Subject[] {
    return [
      new MathSubject(), new LiteratureSubject(), new ForeignLanguageSubject(),
      new PhysicsSubject(), new ChemistrySubject(), new BiologySubject(),
      new HistorySubject(), new GeographySubject(), new CivicEducationSubject()
    ];
  }
}
