import React, { useEffect, useState } from 'react';
import { ReportsService } from '../services/reports.service';
import { DistributionChart } from '../components/DistributionChart';

const ScoreDistribution: React.FC = () => {
  const [subject, setSubject] = useState('toan');
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const subjectsList = [
    { id: 'toan', name: 'Math' },
    { id: 'ngu_van', name: 'Literature' },
    { id: 'ngoai_ngu', name: 'Foreign Language' },
    { id: 'vat_li', name: 'Physics' },
    { id: 'hoa_hoc', name: 'Chemistry' },
    { id: 'sinh_hoc', name: 'Biology' },
    { id: 'lich_su', name: 'History' },
    { id: 'dia_li', name: 'Geography' },
    { id: 'gdcd', name: 'Civic Education' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        }
      } catch (err) {
        console.error('Failed to fetch', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subject]);

  return (
    <div className="page-container glass-panel animate-fade-in">
      <div className="header-row">
        <div>
          <h1 className="page-title">Score Level Statistics</h1>
          <p className="page-subtitle">Distribution of scores across different brackets</p>
        </div>
        
        <select 
          className="premium-select"
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
        >
          {subjectsList.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <DistributionChart chartData={chartData} />
      )}
    </div>
  );
};

export default ScoreDistribution;
