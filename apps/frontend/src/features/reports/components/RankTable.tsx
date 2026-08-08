import React from 'react';
import { TopStudent } from '../services/reports.service';

interface RankTableProps {
  students: TopStudent[];
  subjectFilter?: 'all' | 'toan' | 'vat_li' | 'hoa_hoc';
}

const getRowStyle = (index: number) => {
  switch (index) {
    case 0: return 'bg-gradient-to-r from-yellow-500/10 to-transparent hover:from-yellow-500/20 border-l-2 border-yellow-500';
    case 1: return 'bg-gradient-to-r from-slate-300/10 to-transparent hover:from-slate-300/20 border-l-2 border-slate-300';
    case 2: return 'bg-gradient-to-r from-orange-500/10 to-transparent hover:from-orange-500/20 border-l-2 border-orange-500';
    default: return 'hover:bg-white/5 border-l-2 border-transparent';
  }
};

const getRankContent = (index: number) => {
  switch (index) {
    case 0: return <span className="text-xl" title="1st Place">🥇</span>;
    case 1: return <span className="text-xl" title="2nd Place">🥈</span>;
    case 2: return <span className="text-xl" title="3rd Place">🥉</span>;
    default: return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 text-slate-400 text-xs font-semibold">
        {index + 1}
      </span>
    );
  }
};

const getScoreStyle = (score: number | string | null, isTotal = false) => {
  if (!score) return 'text-slate-500';
  const numScore = Number(score);
  
  if (isTotal) {
    return 'font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 text-lg';
  }
  
  if (numScore >= 9) return 'text-emerald-400 font-medium';
  if (numScore >= 8) return 'text-blue-400 font-medium';
  return 'text-slate-300';
};

export function RankTable({ students, subjectFilter = 'all' }: RankTableProps) {
  const sortedStudents = [...students].sort((a, b) => {
    if (subjectFilter === 'all') return Number(b.total_score) - Number(a.total_score);
    return Number(b[subjectFilter] || 0) - Number(a[subjectFilter] || 0);
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-md shadow-2xl">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-slate-400 uppercase bg-black/40 border-b border-white/10">
          <tr>
            <th scope="col" className="px-6 py-5 font-semibold tracking-wider w-20 text-center">Rank</th>
            <th scope="col" className="px-6 py-5 font-semibold tracking-wider">ID Number</th>
            {(subjectFilter === 'all' || subjectFilter === 'toan') && <th scope="col" className="px-6 py-5 font-semibold tracking-wider text-right">Math</th>}
            {(subjectFilter === 'all' || subjectFilter === 'vat_li') && <th scope="col" className="px-6 py-5 font-semibold tracking-wider text-right">Physics</th>}
            {(subjectFilter === 'all' || subjectFilter === 'hoa_hoc') && <th scope="col" className="px-6 py-5 font-semibold tracking-wider text-right">Chemistry</th>}
            <th scope="col" className="px-6 py-5 font-semibold tracking-wider text-right">Total Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-200">
          {sortedStudents.map((student, index) => (
            <tr key={student.id} className={`transition-all duration-300 group ${getRowStyle(index)}`}>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {getRankContent(index)}
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-slate-300">{student.id}</td>
              {(subjectFilter === 'all' || subjectFilter === 'toan') && (
                <td className={`px-6 py-4 text-right tabular-nums ${getScoreStyle(student.toan)}`}>
                  {student.toan}
                </td>
              )}
              {(subjectFilter === 'all' || subjectFilter === 'vat_li') && (
                <td className={`px-6 py-4 text-right tabular-nums ${getScoreStyle(student.vat_li)}`}>
                  {student.vat_li}
                </td>
              )}
              {(subjectFilter === 'all' || subjectFilter === 'hoa_hoc') && (
                <td className={`px-6 py-4 text-right tabular-nums ${getScoreStyle(student.hoa_hoc)}`}>
                  {student.hoa_hoc}
                </td>
              )}
              <td className={`px-6 py-4 text-right tabular-nums ${getScoreStyle(student.total_score, true)}`}>
                {Number(student.total_score).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
