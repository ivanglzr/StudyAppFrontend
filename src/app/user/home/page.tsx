import { StatsContainer } from "@/components/home/StatsContainer";

import { getStats } from "@/services/stats/stats.service";

export default async function HomePage() {
  const stats = await getStats();

  if (!stats) return <p>There isn&apos;t any stats</p>;

  return <StatsContainer stats={stats} />;
}
