import React, { useState, useMemo } from 'react';
import { useScore } from '../hooks/useScore';
import { StudentScore } from '@g-scores/types';

const getSubjectsList = (score: StudentScore) => [
  { label: 'Toán', value: score.toan },
  { label: 'Ngữ Văn', value: score.ngu_van },
  { label: `Ngoại Ngữ ${score.ma_ngoai_ngu ? `(${score.ma_ngoai_ngu})` : ''}`, value: score.ngoai_ngu },
  { label: 'Vật Lí', value: score.vat_li },
  { label: 'Hóa Học', value: score.hoa_hoc },
  { label: 'Sinh Học', value: score.sinh_hoc },
  { label: 'Lịch Sử', value: score.lich_su },
  { label: 'Địa Lí', value: score.dia_li },
  { label: 'GDCD', value: score.gdcd }
];

export default function ScoreChecker() {
  const [sbd, setSbd] = useState('');
  const { score, error, isLoading, fetchScore } = useScore();

  const handleFetchScore = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSbd = sbd.trim();
    if (trimmedSbd) {
      fetchScore(trimmedSbd);
    }
  };

  const displayedSubjects = useMemo(() => {
    return score ? getSubjectsList(score) : [];
  }, [score]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 mb-1">User Registration</h1>
        </div>

        <form onSubmit={handleFetchScore} className="flex flex-col gap-2">
          <label htmlFor="sbd-input" className="text-sm text-slate-300">Registration Number:</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
            id="sbd-input"
            type="text"
            placeholder="Enter registration number"
            value={sbd}
            onChange={(e) => setSbd(e.target.value)}
            required
            pattern="\d+"
            maxLength={8}
            title="Registration number must contain only digits"
            className="flex-1 bg-background border border-white/10 rounded-md px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !sbd.trim()}
            className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-md bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
      </div>

      {!score && (
        <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">Detailed Scores</h2>
          <p className="text-sm text-slate-400">Detailed view of search scores here!</p>
        </div>
      )}

      {score && (
        <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
          <div className="border-b border-white/5 pb-4 mb-6 flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Student Results</p>
              <h2 className="text-xl font-semibold text-slate-200">SBD: <span className="text-primary">{score.sbd}</span></h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayedSubjects.map((subject, idx) => (
              <div key={idx} className="p-4 rounded-md bg-white/5 border border-white/5">
                <p className="text-slate-400 text-xs mb-1">{subject.label}</p>
                <p className="text-xl font-medium text-slate-200">{subject.value ?? '--'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}