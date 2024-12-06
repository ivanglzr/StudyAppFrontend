import { Header } from "@/components/header/Header";
import { LearnedFlashcardsChart } from "@/components/home/LearnedFlashcardsChart";
import { StudyTimeChart } from "@/components/home/StudyTimeChart";

import { IStats } from "@/interfaces/stats.interfaces";

interface Props {
  stats: IStats;
}

export function StatsContainer({ stats }: Props) {
  return (
    <>
      <Header>
        <h1>Stats</h1>
      </Header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StudyTimeChart subjectsStats={stats.subjectsStats} />
        <LearnedFlashcardsChart
          subjectsFlashcardsStats={
            stats.flashcardsStats.subjectsFlashcardsStats
          }
        />
      </div>
    </>
  );
}
