import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sector,
} from 'recharts';

interface PercentageChartProps {
  chartData: Array<{ name: string; count: number }>;
}

const GRADIENTS = [
  { id: 'grad-0', start: '#60a5fa', end: '#2563eb' }, // Blue
  { id: 'grad-1', start: '#34d399', end: '#059669' }, // Emerald
  { id: 'grad-2', start: '#fbbf24', end: '#d97706' }, // Amber
  { id: 'grad-3', start: '#f87171', end: '#dc2626' }, // Red
];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        fill="#f8fafc"
        className="font-semibold text-lg"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 15}
        dy={8}
        textAnchor="middle"
        fill="#94a3b8"
        className="text-sm"
      >
        {value.toLocaleString()}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 15}
        fill={fill}
      />
    </g>
  );
};

export function PercentageChart({ chartData }: PercentageChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const total = chartData.reduce((acc, curr) => acc + curr.count, 0);
  if (total === 0) return null;

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="w-full h-full mt-8">
      <h3 className="text-center text-slate-300 font-medium mb-6">
        Percentage Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <defs>
            {GRADIENTS.map((grad) => (
              <linearGradient
                key={grad.id}
                id={grad.id}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={grad.start} />
                <stop offset="100%" stopColor={grad.end} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            // @ts-ignore - activeIndex is valid but might not be correctly
            // typed in this recharts version
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            label={({ name, percent }) =>
              `${name}: ${((percent || 0) * 100).toFixed(1)}%`
            }
            labelLine={{ stroke: '#475569', strokeWidth: 1 }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#${GRADIENTS[index % GRADIENTS.length].id})`}
                style={{ outline: 'none' }}
                className={
                  'transition-all duration-300 hover:brightness-110 ' +
                  'cursor-pointer border-2 border-[#0f172a]'
                }
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '6px',
              color: '#f8fafc',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            itemStyle={{ color: '#f8fafc', fontWeight: 500 }}
            formatter={(value: any) => [
              Number(value).toLocaleString(),
              'Students',
            ]}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
