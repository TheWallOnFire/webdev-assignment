import React, { useEffect, useState } from 'react';
import { ReportsService } from '../services/reports.service';
import { RankTable } from '../components/RankTable';

const TopGroupA: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const data = await ReportsService.getTopGroupA();
        setStudents(data);
      } catch (err) {
        console.error('Failed to fetch', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTop();
  }, []);

  return (
    <div className="page-container glass-panel animate-fade-in">
      <h1 className="page-title">Top 10 Group A Students</h1>
      <p className="page-subtitle">The highest scoring students in Math, Physics, and Chemistry</p>
      
      {loading ? (
        <div className="loader"></div>
      ) : (
        <RankTable students={students} />
      )}
    </div>
  );
};

export default TopGroupA;
