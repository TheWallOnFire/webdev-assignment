import { useState, useCallback } from 'react';
import { ScoresService } from '../features/scores/services/scores.service';
import { StudentScore } from '@g-scores/types';

import axios from 'axios';

export const useScore = () => {
  const [score, setScore] = useState<StudentScore | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchScore = useCallback(async (id: string) => {
    setError('');
    setScore(null);
    setIsLoading(true);
    try {
      const data = await ScoresService.getScoreById(id);
      setScore(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            'Failed to fetch score. Please verify the registration number.'
        );
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { score, error, isLoading, fetchScore };
};
