import React from 'react';
import { TopStudent } from '../services/reports.service';

interface RankTableProps {
  students: TopStudent[];
}

export function RankTable({ students }: RankTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/5 bg-secondary/20">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-400 uppercase bg-black/20 border-b border-white/5">
          <tr>
            <th className="px-6 py-4 font-medium">Rank</th>
            <th className="px-6 py-4 font-medium">SBD</th>
            <th className="px-6 py-4 font-medium text-right">Math</th>
            <th className="px-6 py-4 font-medium text-right">Physics</th>
            <th className="px-6 py-4 font-medium text-right">Chemistry</th>
            <th className="px-6 py-4 font-medium text-right text-primary">Total Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-300">
          {students.map((student, index) => (
            <tr key={student.sbd} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-500' : 
                  index === 1 ? 'bg-slate-300/20 text-slate-300' : 
                  index === 2 ? 'bg-orange-500/20 text-orange-500' : 
                  'bg-white/10 text-slate-400'
                }`}>
                  {index + 1}
                </span>
              </td>
              <td className="px-6 py-4 font-medium">{student.sbd}</td>
              <td className="px-6 py-4 text-right">{student.toan}</td>
              <td className="px-6 py-4 text-right">{student.vat_li}</td>
              <td className="px-6 py-4 text-right">{student.hoa_hoc}</td>
              <td className="px-6 py-4 text-right font-bold text-primary">
                {Number(student.total_score).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
