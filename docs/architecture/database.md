# Database Schema Architecture

The database is powered by **PostgreSQL** and modeled using **Prisma ORM**. It is designed to efficiently store the 2024 National High School Exam scores.

## `student_scores` Table

| Column Name      | Data Type | Constraints          | Description                               |
|------------------|-----------|----------------------|-------------------------------------------|
| `sbd`            | String    | `@id @unique`        | Registration Number (Số Báo Danh) - PK    |
| `toan`           | Float     | Optional (`?`)       | Math score                                |
| `ngu_van`        | Float     | Optional (`?`)       | Literature score                          |
| `ngoai_ngu`      | Float     | Optional (`?`)       | Foreign Language score                    |
| `vat_li`         | Float     | Optional (`?`)       | Physics score                             |
| `hoa_hoc`        | Float     | Optional (`?`)       | Chemistry score                           |
| `sinh_hoc`       | Float     | Optional (`?`)       | Biology score                             |
| `lich_su`        | Float     | Optional (`?`)       | History score                             |
| `dia_li`         | Float     | Optional (`?`)       | Geography score                           |
| `gdcd`           | Float     | Optional (`?`)       | Civic Education score                     |
| `ma_ngoai_ngu`   | String    | Optional (`?`)       | Foreign Language Code (e.g., N1 for Eng)  |

### Notes on Data Modeling:
- **Nullability**: All score columns are inherently optional (Nullable/`Float?`) since students do not take every single exam subject.
- **SBD as String**: SBD is stored as a string because registration numbers often begin with `0` (e.g., `01000001`), and treating them as integers would strip the leading zeroes, causing data loss.
- **Indexing**: Given the heavy read-access patterns for endpoints like "Top 10 Group A Students," composite indexing might be considered in the future across `toan`, `vat_li`, and `hoa_hoc` if performance becomes a bottleneck on standard queries.
