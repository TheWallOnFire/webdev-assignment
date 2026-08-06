import axios from 'axios';
import { StudentScore } from '@g-scores/types';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const ScoresService = {
  getScoreBySbd: async (sbd: string): Promise<StudentScore> => {
    const response = await axios.get(`${baseUrl}/scores/${sbd}`);
    return response.data.data;
  }
};
