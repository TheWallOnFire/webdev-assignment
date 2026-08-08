import React, { useEffect, useState } from 'react';
import { ReportsService, TopStudent } from '../features/reports/services/reports.service';
import { RankTable } from '../features/reports/components/RankTable';

import axios from 'axios';

export default function TopGroupA() {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchTop = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await ReportsService.getTopGroupA();
        if (!ignore) {
          setStudents(data || []);
        }
      } catch (err) {
        if (!ignore) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || 'Failed to fetch Top 10 students.');
          } else {
            setError('An unexpected error occurred.');
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchTop();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
        <div className="mb-8 border-b border-white/5 pb-6 flex flex-col sm:flex-row sm:items-center items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-100 mb-1">Top 10 Group A Students</h1>
            <p className="text-sm text-slate-400">The highest scoring students in Math, Physics, and Chemistry</p>
          </div>
        </div>

        <div className="relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 flex items-start gap-3 w-full max-w-md mx-auto mb-6">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {!error && students.length > 0 && (
            <RankTable students={students} />
          )}

          {!error && !loading && students.length === 0 && (
            <div className="text-center text-slate-500 py-12 flex flex-col items-center">
              <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-sm">No students found for this ranking.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
