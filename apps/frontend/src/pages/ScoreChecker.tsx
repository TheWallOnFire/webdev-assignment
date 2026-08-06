import React, { useState } from 'react';
import { StudentScore } from '@g-scores/types';
import { ScoresService } from '../services/scores.service';

const ScoreChecker: React.FC = () => {
  const [sbd, setSbd] = useState('');
  const [score, setScore] = useState<StudentScore | null>(null);
  const [error, setError] = useState('');

  const fetchScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setScore(null);
    try {
      const data = await ScoresService.getScoreBySbd(sbd);
      setScore(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch score');
    }
  };

  return (
    <div className="score-container">
      <h1>G-Scores Score Checker</h1>
      <form onSubmit={fetchScore}>
        <input 
          type="text" 
          placeholder="Enter Registration Number (SBD)" 
          value={sbd}
          onChange={(e) => setSbd(e.target.value)}
          required
        />
        <button type="submit">Check Score</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {score && (
        <div className="score-results">
          <h2>Results for {score.sbd}</h2>
          <p>Toan: {score.toan ?? 'N/A'}</p>
          <p>Ngu Van: {score.ngu_van ?? 'N/A'}</p>
          <p>Ngoai Ngu: {score.ngoai_ngu ?? 'N/A'} {score.ma_ngoai_ngu ? `(${score.ma_ngoai_ngu})` : ''}</p>
          <p>Vat Li: {score.vat_li ?? 'N/A'}</p>
          <p>Hoa Hoc: {score.hoa_hoc ?? 'N/A'}</p>
          <p>Sinh Hoc: {score.sinh_hoc ?? 'N/A'}</p>
          <p>Lich Su: {score.lich_su ?? 'N/A'}</p>
          <p>Dia Li: {score.dia_li ?? 'N/A'}</p>
          <p>GDCD: {score.gdcd ?? 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default ScoreChecker;
