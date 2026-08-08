import { apiClient } from '../../../config/axios';

export interface ScoreDistributionStats {
  '>=8': number;
  '6-8': number;
  '4-6': number;
  '<4': number;
}

export interface ScoreDistributionResponse {
  [subject: string]: ScoreDistributionStats;
}

export interface TopStudent {
  sbd: string;
  toan: number | null;
  vat_li: number | null;
  hoa_hoc: number | null;
  total_score: number;
}

export const ReportsService = {
  getTopGroupA: async (): Promise<TopStudent[]> => {
    const response = await apiClient.get('/reports/top-group-a');
    return response.data.data;
  },

  getScoreDistribution: async (subject: string): Promise<ScoreDistributionResponse> => {
    const response = await apiClient.get('/reports/score-distribution', {
      params: { subject }
    });
    return response.data.data;
  }
};
