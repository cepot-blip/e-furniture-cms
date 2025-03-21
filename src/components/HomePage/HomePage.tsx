import { Input } from '../ui/input';

import InsightSection from './blocks/InsightSection';
import TableSection from './blocks/TableSection';
import TopUsersComponent from './blocks/TopUsersComponent';
import ChartSection from './blocks/ChartSection';

import { InformationCard, Title } from '../core';

function HomePage() {
  return (
    <main className="p-5 space-y-5">
      <section className="flex flex-row justify-between items-center gap-4">
        <Title text="Dashboard" />
        <Input className="max-w-sm" placeholder="Search" />
      </section>
      <InsightSection />

      <section className="flex flex-row items-stretch justify-between gap-3 flex-wrap">
        <InformationCard
          title="Top Penjualan"
          description="Tahun ini"
          containerClassName="w-8/12"
        >
          <TableSection />
        </InformationCard>
        <InformationCard
          title="Top Users"
          description="Dengan pembelian terbanyak"
          containerClassName="flex-1"
        >
          <TopUsersComponent />
        </InformationCard>
      </section>

      <ChartSection />
    </main>
  );
}

export default HomePage;
