import React from 'react';

interface RankTableProps {
  students: any[];
}

export const RankTable: React.FC<RankTableProps> = ({ students }) => {
  return (
    <div className="table-responsive">
      <table className="premium-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>SBD</th>
            <th>Math</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.sbd}>
              <td>
                <span className={`rank-badge rank-${index + 1}`}>{index + 1}</span>
              </td>
              <td>{student.sbd}</td>
              <td>{student.toan}</td>
              <td>{student.vat_li}</td>
              <td>{student.hoa_hoc}</td>
              <td className="highlight-score">{Number(student.total_score).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
