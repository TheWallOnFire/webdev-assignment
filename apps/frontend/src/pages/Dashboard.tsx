import React, { useEffect, useState } from 'react';
import { ReportsService, TopStudent } from '../features/reports/services/reports.service';
import { RankTable } from '../features/reports/components/RankTable';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';

import axios from 'axios';

export default function Dashboard() {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [top10Subject, setTop10Subject] = useState<'all' | 'toan' | 'vat_li' | 'hoa_hoc'>('all');

  useEffect(() => {
    const fetchTop = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await ReportsService.getTopGroupA();
        setStudents(data || []);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch Top 10 students.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTop();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
        <div className="mb-8 border-b border-white/5 pb-6 flex flex-col sm:flex-row sm:items-center items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-100 mb-1">Dashboard</h1>
            <p className="text-sm text-slate-400">See the list of top 10 best student</p>
          </div>
          <select 
            className="bg-background border border-white/10 text-sm text-slate-200 rounded-md px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer min-w-[140px]"
            value={top10Subject}
            onChange={(e) => setTop10Subject(e.target.value as any)}
          >
            <option value="all">All Subjects</option>
            <option value="toan">Math Only</option>
            <option value="vat_li">Physics Only</option>
            <option value="hoa_hoc">Chemistry Only</option>
          </select>
        </div>

        <div className="relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
              <Spinner />
            </div>
          )}

          {error && <ErrorMessage message={error} />}

          {!error && students.length > 0 && (
            <RankTable students={students} subjectFilter={top10Subject} />
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
