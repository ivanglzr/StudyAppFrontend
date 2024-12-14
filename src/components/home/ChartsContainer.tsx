import { LearnedFlashcardsChart } from "@/components/home/LearnedFlashcardsChart";
import { StudyTimeChart } from "@/components/home/StudyTimeChart";

import { IStats } from "@/interfaces/stats.interfaces";

interface Props {
  stats: IStats | undefined;
}

export function ChartsContainer({ stats }: Props) {
  if (!stats) return <span>You don't have stats and I don't know why</span>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StudyTimeChart subjectsStats={stats.subjectsStats} />
      <LearnedFlashcardsChart
        subjectsFlashcardsStats={stats.flashcardsStats.subjectsFlashcardsStats}
      />
    </div>
  );
}
