import { Line, LineChart, ResponsiveContainer, YAxis, CartesianGrid, Area } from 'recharts';

interface PricePoint {
  timestamp: number;
  price: number;
}

interface SimpleLineChartProps {
  data: PricePoint[];
  color: string;
}

export const SimpleLineChart = ({ data, color }: SimpleLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.15} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke="rgba(255,255,255,0.05)" 
        />
        <YAxis hide domain={['auto', 'auto']} />
        <Area
          type="monotone"
          dataKey="price"
          stroke="none"
          fill={`url(#gradient-${color})`}
          fillOpacity={1}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          dot={false}
          strokeWidth={1.5}
          animationDuration={300}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
