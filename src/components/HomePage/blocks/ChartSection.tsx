'use client';

import { InformationCard } from '@/components/core';
import { lilacColor, mainColor } from '@/helpers/colors';
import React from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';

const data = [
  {
    name: '2020',
    views: '500',
  },
  {
    name: '2021',
    views: '280',
  },
  {
    name: '2022',
    views: '200',
  },
  {
    name: '2023',
    views: '600',
  },
  {
    name: '2024',
    views: '300',
  },
  {
    name: '2025',
    views: '100',
  },
  {
    name: '2025',
    views: '50',
  },
  {
    name: '2026',
    views: '400',
  },
  {
    name: '2027',
    views: '300',
  },
  {
    name: '2028',
    views: '100',
  },
  {
    name: '2029',
    views: '50',
  },
  {
    name: '2030 L',
    views: '400',
  },
];

const pieData = [
  {
    name: 'Group A',
    value: 400,
  },
  {
    name: 'Group B',
    value: 500,
  },
  {
    name: 'Group C',
    value: 150,
  },
  {
    name: 'Group D',
    value: 340,
  },
];

const pieData2 = [
  {
    name: 'Group A',
    value: 200,
  },
  {
    name: 'Group B',
    value: 173,
  },
  {
    name: 'Group C',
    value: 300,
  },
  {
    name: 'Group D',
    value: 340,
  },
];

function ChartSection() {
  return (
    <section className="flex flex-row flex-wrap justify-between items-stretch gap-5 min-h-48">
      <InformationCard
        title="Sales Distribution Across Products"
        description="Percentage share of sales across various products or regions"
        containerClassName="flex-1"
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              fill={lilacColor}
              innerRadius={60}
              label
            />
            <Pie
              data={pieData2}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              fill={mainColor}
              outerRadius={50}
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </InformationCard>
      <InformationCard
        title="Yearly Sales Growth"
        description="Visual representation of product demand fluctuations by year"
        containerClassName="flex-1"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="views"
              fill={mainColor}
              activeBar={<Rectangle fill="pink" stroke="blue" />}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </InformationCard>
    </section>
  );
}

export default ChartSection;
