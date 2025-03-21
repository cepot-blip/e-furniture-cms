'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
  Area,
} from 'recharts';

import ContentCard from '@/components/core/ContentCard';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { lilacColor, mainColor } from '@/helpers/colors';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

export default function ArtileInsightSection() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-full rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex flex-row gap-3 flex-wrap h-full items-stretch justify-center p-6">
          <ContentCard
            title="Top Product"
            content="10.000"
            note="Lorem ipsum"
          />
          <ContentCard
            title="Most Viewed Product"
            content="20.000"
            note="Lorem"
          />
          <ContentCard title="Underated Product" content="500" note="ipsum" />
          <ContentCard
            title="Overated Product"
            content="20.400"
            note="ipsum ipsum"
          />
          <ContentCard
            title="Popular Product"
            content="10.400"
            note="ipsum ipsum"
          />
          <ContentCard
            title="Unpopular Product"
            content="20.200"
            note="ipsum ipsum"
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full flex-col items-center justify-center p-6 gap-3">
              <p className="font-bold text-xl self-start">Pages</p>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke={mainColor}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke={lilacColor} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full flex-col items-center justify-center p-6 gap-3">
              <p className="font-bold text-xl self-start">Trends</p>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke={lilacColor}
                    fill={mainColor}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
