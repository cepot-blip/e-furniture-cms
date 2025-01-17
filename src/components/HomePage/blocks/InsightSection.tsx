import React from 'react';

import { AiOutlineDollar } from 'react-icons/ai';
import { LuUsers } from 'react-icons/lu';
import { CiCreditCard1 } from 'react-icons/ci';
import { MdOutlineShowChart } from 'react-icons/md';
import ContentCard from '@/components/core/ContentCard';

function InsightSection() {
  return (
    <section className="flex flex-row flex-wrap items-stretch justify-start gap-5">
      <ContentCard
        title="Sales Growth"
        content="$45,231.89"
        note="+20% growth"
        icon={<AiOutlineDollar className="text-xl" />}
      />
      <ContentCard
        title="Active Users"
        content="+2350"
        note="-10% growth"
        icon={<LuUsers className="text-xl" />}
      />
      <ContentCard
        title="Completed Transactions"
        content="+12,234"
        note="+200% get new transactions"
        icon={<CiCreditCard1 className="text-xl" />}
      />
      <ContentCard
        title="User Engagement"
        content="+15,234"
        note="+200% get new users"
        icon={<MdOutlineShowChart className="text-xl" />}
      />
    </section>
  );
}

export default InsightSection;
