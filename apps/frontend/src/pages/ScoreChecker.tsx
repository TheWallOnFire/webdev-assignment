import React, { useState } from 'react';
import { useScore } from '../hooks/useScore';
import { StudentScore } from '@g-scores/types';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';

const getSubjectsList = (score: StudentScore) => [
  { label: 'Math', value: score.toan },
  { label: 'Literature', value: score.ngu_van },
  {
    label: `Foreign Language ${
      score.ma_ngoai_ngu ? `(${score.ma_ngoai_ngu})` : ''
    }`,
    value: score.ngoai_ngu,
  },
  { label: 'Physics', value: score.vat_li },
  { label: 'Chemistry', value: score.hoa_hoc },
  { label: 'Biology', value: score.sinh_hoc },
  { label: 'History', value: score.lich_su },
  { label: 'Geography', value: score.dia_li },
  { label: 'Civic Education', value: score.gdcd },
];

type SortOption = 'default' | 'high-to-low' | 'low-to-high';

export default function ScoreChecker() {
  const [id, setId] = useState('');
  const { score, error, isLoading, fetchScore } = useScore();

  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleFetchScore = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedSubjects([]);
    setSortOption('default');
    fetchScore(id.trim());
  };

  const handleSubjectToggle = (label: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(label)) return prev.filter((s) => s !== label);
      if (prev.length >= 3) return prev;
      return [...prev, label];
    });
  };

  let displayedSubjects = score ? getSubjectsList(score) : [];

  if (sortOption === 'high-to-low') {
    displayedSubjects.sort(
      (a, b) => (Number(b.value) || 0) - (Number(a.value) || 0)
    );
  } else if (sortOption === 'low-to-high') {
    displayedSubjects.sort((a, b) => {
      const valA =
        a.value === null || a.value === undefined ? Infinity : Number(a.value);
      const valB =
        b.value === null || b.value === undefined ? Infinity : Number(b.value);
      return valA - valB;
    });
  }

  const selectedTotal = displayedSubjects
    .filter((s) => selectedSubjects.includes(s.label))
    .reduce((sum, s) => sum + (Number(s.value) || 0), 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 mb-1">
            Search Scores
          </h1>
        </div>

        <form onSubmit={handleFetchScore} className="flex flex-col gap-2">
          <label htmlFor="id-input" className="text-sm text-slate-300">
            Registration Number:
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="id-input"
              type="text"
              placeholder="Enter registration number"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              pattern="\d+"
              maxLength={8}
              title="Registration number must contain only digits"
              className={
                'flex-1 bg-background border border-white/10 rounded-md ' +
                'px-4 py-2 text-sm text-slate-200 placeholder-slate-500 ' +
                'focus:outline-none focus:border-primary focus:ring-1 ' +
                'focus:ring-primary transition-all'
              }
            />
            <button
              type="submit"
              disabled={isLoading || !id.trim()}
              className={
                'bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-md ' +
                'text-sm font-medium transition-all disabled:opacity-50 ' +
                'disabled:cursor-not-allowed flex items-center justify-center ' +
                'min-w-[120px]'
              }
            >
              {isLoading ? (
                <div className="scale-75">
                  <Spinner />
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6">
            <ErrorMessage message={error} />
          </div>
        )}
      </div>

      {score ? (
        <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
          <div
            className={
              'border-b border-white/5 pb-4 mb-6 flex flex-col sm:flex-row ' +
              'sm:items-end justify-between gap-4'
            }
          >
            <div>
              <p
                className={
                  'text-xs text-slate-500 uppercase tracking-wider mb-1'
                }
              >
                Student Results
              </p>
              <h2 className="text-xl font-semibold text-slate-200">
                ID:{' '}
                <span className="text-primary">
                  {(score as any).id || score.sbd}
                </span>
              </h2>
            </div>
            <div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className={
                  'bg-background border border-white/10 text-sm text-slate-200 ' +
                  'rounded-md px-3 py-2 outline-none focus:border-primary ' +
                  'focus:ring-1 focus:ring-primary transition-all cursor-pointer'
                }
              >
                <option value="default">Default Order</option>
                <option value="high-to-low">Score: High to Low</option>
                <option value="low-to-high">Score: Low to High</option>
              </select>
            </div>
          </div>

          <div className="mb-4 text-sm text-slate-400">
            Select up to 3 subjects to calculate their total score.
          </div>

          <div className="space-y-3">
            {displayedSubjects.map((subject) => {
              const isSelected = selectedSubjects.includes(subject.label);
              const isDisabled = !isSelected && selectedSubjects.length >= 3;
              const hasScore =
                subject.value !== null && subject.value !== undefined;

              return (
                <div
                  key={subject.label}
                  className={
                    `flex justify-between items-center p-4 rounded-md border ` +
                    `transition-all ${
                      isSelected
                        ? 'bg-primary/5 border-primary/30'
                        : 'bg-white/5 border-white/5'
                    }`
                  }
                >
                  <label
                    className={
                      `flex items-center gap-3 cursor-pointer ` +
                      `${
                        isDisabled || !hasScore
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`
                    }
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled || !hasScore}
                      onChange={() => handleSubjectToggle(subject.label)}
                      className={
                        'w-4 h-4 rounded border-slate-600 bg-slate-800 ' +
                        'text-primary focus:ring-primary focus:ring-offset-slate-900'
                      }
                    />
                    <span className="text-slate-300 font-medium">
                      {subject.label}
                    </span>
                  </label>
                  <span className="text-lg font-semibold text-slate-200">
                    {subject.value ?? '--'}
                  </span>
                </div>
              );
            })}

            {selectedSubjects.length > 0 && (
              <div
                className={
                  'flex justify-between items-center p-4 rounded-md ' +
                  'bg-emerald-500/10 border border-emerald-500/20 mt-6'
                }
              >
                <span
                  className={
                    'text-emerald-400 font-bold uppercase tracking-wider text-sm'
                  }
                >
                  Selected Total (Max 3)
                </span>
                <span className="text-2xl font-bold text-emerald-400">
                  {selectedTotal.toFixed(2)}
                </span>
              </div>
            )}

            <div
              className={
                'flex justify-between items-center p-4 rounded-md bg-primary/10 ' +
                'border border-primary/20 mt-6'
              }
            >
              <span
                className={
                  'text-primary font-bold uppercase tracking-wider text-sm'
                }
              >
                Overall Average Score
              </span>
              <span className="text-2xl font-bold text-primary">
                {(() => {
                  const validScores = getSubjectsList(score)
                    .filter((s) => s.value !== null && s.value !== undefined)
                    .map((s) => Number(s.value))
                    .filter((val) => !isNaN(val));
                  if (validScores.length === 0) return '--';
                  const avg =
                    validScores.reduce((a, b) => a + b, 0) / validScores.length;
                  return avg.toFixed(2);
                })()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            Detailed Scores
          </h2>
          <p className="text-sm text-slate-400">
            Results will be displayed here once a valid registration number is
            submitted.
          </p>
        </div>
      )}
    </div>
  );
}