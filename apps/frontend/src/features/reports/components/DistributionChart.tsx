import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface DistributionChartProps {
  chartData: Array<{ name: string; count: number }>;
}

export function DistributionChart({ chartData }: DistributionChartProps) {
  return (
    <div className="w-full h-full mt-4">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip 
            cursor={{ fill: '#1e293b' }}
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#3b82f6', fontWeight: 500 }}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={60} animationDuration={1000}>
            <LabelList dataKey="count" position="top" fill="#cbd5e1" fontSize={12} fontWeight={500} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
