import { Header } from "@/components/header/Header";

import { getStats } from "@/services/stats/stats.service";
import { ChartsContainer } from "./ChartsContainer";

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
