import { apiClient } from '../../../config/axios';
import { StudentScore } from '@g-scores/types';

export const ScoresService = {
  getScoreBySbd: async (sbd: string): Promise<StudentScore> => {
    const response = await apiClient.get(`/scores/${sbd}`);
    return response.data.data;
  }
};
