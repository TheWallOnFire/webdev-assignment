import { apiClient } from '../../../config/axios';
import { StudentScore } from '@g-scores/types';

export const ScoresService = {
  getScoreById: async (
    id: string
  ): Promise<StudentScore & { id: string }> => {
    const response = await apiClient.get(`/scores/${id}`);
    const data = response.data.data;
    return { ...data, id: data.sbd };
  },
};
