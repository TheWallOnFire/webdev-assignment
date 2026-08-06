import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const ReportsService = {
  getTopGroupA: async (): Promise<any[]> => {
    const response = await axios.get(`${baseUrl}/reports/top-group-a`);
    return response.data.data;
  },

  getScoreDistribution: async (subject: string): Promise<any> => {
    const response = await axios.get(`${baseUrl}/reports/score-distribution?subject=${subject}`);
    return response.data.data;
  }
};
