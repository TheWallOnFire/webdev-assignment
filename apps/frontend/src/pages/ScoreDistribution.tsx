import React, { useEffect, useState } from 'react';
import { ReportsService } from '../features/reports/services/reports.service';
import { SUBJECTS_LIST } from '../config/constants';
import { DistributionChart } from '../features/reports/components/DistributionChart';
import { PercentageChart } from '../features/reports/components/PercentageChart';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';

import axios from 'axios';

interface ChartDataPoint {
  name: string;
  count: number;
}



export default function ScoreDistribution() {
  const [subject, setSubject] = useState('toan');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await ReportsService.getScoreDistribution(subject);

        if (data && data[subject]) {
          const stats = data[subject];
          setChartData([
            { name: '>= 8', count: stats['>=8'] },
            { name: '6 - 8', count: stats['6-8'] },
            { name: '4 - 6', count: stats['4-6'] },
            { name: '< 4', count: stats['<4'] },
          ]);
        } else {
          setChartData([]);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch score distribution.');
        } else {
          setError('An unexpected error occurred.');
        }
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100 mb-1">Score Distribution</h1>
          <p className="text-sm text-slate-400">Analyze the distribution of scores across different brackets</p>
        </div>
        
        <div className="flex items-center gap-3">
          <label htmlFor="subject-select" className="sr-only">Select Subject</label>
          <select 
            id="subject-select"
            className="bg-background border border-white/10 text-sm text-slate-200 rounded-md px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer min-w-[200px]"
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
          >
            {SUBJECTS_LIST.map(s => (
              <option key={s.id} value={s.id} className="bg-background text-slate-200">{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 min-h-[400px] flex flex-col justify-center relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
            <Spinner />
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {!error && chartData.length > 0 && (
          <div className="flex flex-col">
            <DistributionChart chartData={chartData} />
            <div className="h-px bg-white/5 my-8 w-full" />
            <PercentageChart chartData={chartData} />
          </div>
        )}

        {!error && !loading && chartData.length === 0 && (
          <div className="text-center text-slate-500 flex flex-col items-center">
            <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm">No data available for this subject.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
