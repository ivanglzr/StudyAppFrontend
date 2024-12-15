import { Header } from "@/common/components/header";

import { getStats } from "@/stats/services";
import { ChartsContainer } from "@/stats/components";

export async function StatsContainer() {
  const stats = await getStats();

  return (
    <>
      <Header>
        <h1>Stats</h1>
      </Header>
      <ChartsContainer stats={stats} />
    </>
  );
}
