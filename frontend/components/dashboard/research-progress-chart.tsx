'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Card } from '@/components/ui/card';

const data = [
  { week: 'Week 1', completed: 12, inProgress: 8, planned: 15 },
  { week: 'Week 2', completed: 18, inProgress: 10, planned: 14 },
  { week: 'Week 3', completed: 22, inProgress: 12, planned: 13 },
  { week: 'Week 4', completed: 28, inProgress: 9, planned: 10 },
  { week: 'Week 5', completed: 35, inProgress: 14, planned: 12 },
  { week: 'Week 6', completed: 41, inProgress: 11, planned: 8 },
];

const chartConfig = {
  completed: {
    label: 'Completed',
    color: 'var(--chart-1)',
  },
  inProgress: {
    label: 'In Progress',
    color: 'var(--chart-2)',
  },
  planned: {
    label: 'Planned',
    color: 'var(--chart-3)',
  },
};

export function ResearchProgressChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Research Progress</h3>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="week" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <ChartTooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Bar
              dataKey="completed"
              fill="var(--color-completed)"
              radius={[8, 8, 0, 0]}
              name="Completed"
            />
            <Bar
              dataKey="inProgress"
              fill="var(--color-inProgress)"
              radius={[8, 8, 0, 0]}
              name="In Progress"
            />
            <Bar
              dataKey="planned"
              fill="var(--color-planned)"
              radius={[8, 8, 0, 0]}
              name="Planned"
            />
          </BarChart>
        </ChartContainer>
      </Card>
    </motion.div>
  );
}
